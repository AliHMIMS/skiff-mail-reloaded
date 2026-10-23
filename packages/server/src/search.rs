//! Full-text mail search: an SQLite FTS5 index of each message's plaintext, filled on import (and backfilled
//! for mail stored before it existed), queried by the `searchEmails` GraphQL field.

use std::collections::HashSet;

use anyhow::Result;
use serde_json::Value as Json;

use crate::crypto::{self, AttachmentMetadata, datagram};
use crate::gmail::FOLDER_ALL;
use crate::mail::{self, Recipient};
use crate::store::{EmailRow, SearchHit, Store};

/// The searchable text of one message, in FTS column order.
#[derive(Clone, Debug, Default)]
pub struct SearchDoc {
    pub subject: String,
    pub body: String,
    pub sender: String,
    pub recipients: String,
    pub attachments: String,
}

fn address_text(a: &Json) -> String {
    let address = a.get("address").and_then(Json::as_str).unwrap_or_default();
    let name = a.get("name").and_then(Json::as_str).unwrap_or_default();
    format!("{address} {name}")
}

impl SearchDoc {
    pub fn new(e: &EmailRow, body: &str, attachment_names: impl IntoIterator<Item = String>) -> Self {
        let list = |v: &Json| v.as_array().map(|a| a.iter().map(address_text).collect::<Vec<_>>().join("\n"));
        Self {
            subject: e.subject.clone(),
            body: body.to_string(),
            sender: address_text(&e.from),
            recipients: [&e.to, &e.cc, &e.bcc].into_iter().filter_map(list).collect::<Vec<_>>().join("\n"),
            attachments: attachment_names.into_iter().collect::<Vec<_>>().join("\n"),
        }
    }

    /// Recover the text of a stored (encrypted) message.
    fn decrypt(e: &EmailRow, to: &Recipient<'_>) -> Result<Self> {
        let key = mail::open_session_key(&e.encrypted_session_key, to)?;
        let body = crypto::decrypt_string_field(datagram::MAIL_TEXT, &e.encrypted_text, &key)?;
        let names = e
            .attachments
            .iter()
            .filter_map(|a| AttachmentMetadata::decrypt(&a.encrypted_metadata, &key).ok())
            .map(|m| m.filename);
        let mut doc = Self::new(e, &body, names);
        doc.subject = crypto::decrypt_string_field(datagram::MAIL_SUBJECT, &e.encrypted_subject, &key)?;
        Ok(doc)
    }
}

/// Index every stored message that isn't indexed yet. Runs in batches so other store users get the lock in between.
pub fn backfill(store: &Store, to: &Recipient<'_>) -> Result<usize> {
    let mut n = 0;
    loop {
        let batch = store.unindexed_emails(200)?;
        if batch.is_empty() {
            return Ok(n);
        }
        for e in &batch {
            // index what we can read even if the body doesn't decrypt, so the message isn't retried forever
            let doc = SearchDoc::decrypt(e, to).unwrap_or_else(|err| {
                tracing::warn!("indexing {} without its content: {err:#}", e.id);
                SearchDoc::new(e, "", [])
            });
            store.index_email(&e.id, &doc)?;
        }
        n += batch.len();
    }
}

/// FTS columns: (column, name the client uses for it, BM25 weight).
const COLUMNS: [(&str, &str, f64); 5] = [
    ("subject", "subject", 3.0),
    ("body", "content", 1.0),
    ("sender", "from", 2.0),
    ("recipients", "to", 1.0),
    ("attachments", "attachments", 1.0),
];

/// At most this many words are taken from each part of a query.
const MAX_TERMS: usize = 12;
pub const MAX_RESULTS: usize = 1000;

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Sort {
    Relevance,
    Oldest,
    Newest,
}

#[derive(Debug, Default)]
pub struct Query {
    /// Words to find.
    pub text: String,
    /// Client column names (`subject`, `content`, `from`, `to`, `attachments`) to find `text` in; empty means all.
    pub fields: Vec<String>,
    /// Words that must appear in the sender / the recipients.
    pub from: String,
    pub to: String,
    /// Only messages created at or after this (epoch ms).
    pub after: Option<i64>,
    /// Include Trash and Spam (Gmail leaves them out unless asked).
    pub include_deleted: bool,
}

pub struct Hit {
    pub hit: SearchHit,
    /// (query word, client names of the fields it matched)
    pub matches: Vec<(String, Vec<&'static str>)>,
}

fn words(s: &str) -> Vec<String> {
    let mut seen = HashSet::new();
    s.split_whitespace()
        .filter(|w| w.chars().any(char::is_alphanumeric))
        .map(str::to_lowercase)
        .filter(|w| seen.insert(w.clone()))
        .take(MAX_TERMS)
        .collect()
}

/// One query word as an FTS5 string (punctuation inside it, as in addresses, makes it a phrase).
/// Longer plain words also match as prefixes.
fn phrase(word: &str) -> String {
    let quoted = format!("\"{}\"", word.replace('"', "\"\""));
    if word.chars().count() > 3 && word.chars().all(char::is_alphanumeric) { quoted + "*" } else { quoted }
}

fn group(words: &[String], op: &str) -> String {
    format!("({})", words.iter().map(|w| phrase(w)).collect::<Vec<_>>().join(&format!(" {op} ")))
}

fn column_filter(client_fields: &[&str]) -> String {
    let cols: Vec<&str> =
        COLUMNS.iter().filter(|(_, name, _)| client_fields.contains(name)).map(|(col, _, _)| *col).collect();
    format!("{{{}}}", cols.join(" "))
}

/// Run a search. `keep` filters by thread (labels). Results come back sorted, at most `limit` of them.
pub fn search(store: &Store, q: &Query, sort: Sort, limit: usize, keep: impl Fn(&str) -> bool) -> Result<Vec<Hit>> {
    let text = words(&q.text);
    let from = words(&q.from);
    let to = words(&q.to);
    let fields: Vec<&str> = q.fields.iter().map(String::as_str).collect();
    let after = q.after.unwrap_or(i64::MIN);

    let run = |op: &str| -> Result<Vec<SearchHit>> {
        let mut parts = Vec::new();
        if !text.is_empty() {
            let g = group(&text, op);
            parts.push(if fields.is_empty() { g } else { format!("{} : {g}", column_filter(&fields)) });
        }
        if !from.is_empty() {
            parts.push(format!("{} : {}", column_filter(&["from"]), group(&from, "AND")));
        }
        if !to.is_empty() {
            parts.push(format!("{} : {}", column_filter(&["to"]), group(&to, "AND")));
        }
        let hits = if parts.is_empty() {
            store.emails_since(after)?
        } else {
            store.search(&parts.join(" AND "), after, &COLUMNS.map(|(_, _, w)| w))?
        };
        Ok(hits.into_iter().filter(|h| (q.include_deleted || h.folder == FOLDER_ALL) && keep(&h.thread_id)).collect())
    };
    // prefer messages with every word; if there are none, widen to any word
    let mut hits = run("AND")?;
    if hits.is_empty() && text.len() > 1 {
        hits = run("OR")?;
    }

    match sort {
        Sort::Relevance => hits.sort_by(|a, b| b.score.total_cmp(&a.score).then(b.created_at.cmp(&a.created_at))),
        Sort::Newest => hits.sort_by_key(|h| std::cmp::Reverse(h.created_at)),
        Sort::Oldest => hits.sort_by_key(|h| h.created_at),
    }
    hits.truncate(limit.min(MAX_RESULTS));

    // which fields each word matched, for highlighting
    let ids: Vec<&str> = hits.iter().map(|h| h.email_id.as_str()).collect();
    let mut matched: Vec<(String, &'static str, HashSet<String>)> = Vec::new();
    if !ids.is_empty() {
        for word in text.iter().chain(&from).chain(&to) {
            for (col, name, _) in COLUMNS {
                let found = store.search_among(&format!("{{{col}}} : {}", phrase(word)), &ids)?;
                if !found.is_empty() {
                    matched.push((word.clone(), name, found));
                }
            }
        }
    }
    Ok(hits
        .into_iter()
        .map(|hit| {
            let mut matches: Vec<(String, Vec<&'static str>)> = Vec::new();
            for (word, field, found) in &matched {
                if !found.contains(&hit.email_id) {
                    continue;
                }
                match matches.iter_mut().find(|(w, _)| w == word) {
                    Some((_, fields)) => fields.push(field),
                    None => matches.push((word.clone(), vec![field])),
                }
            }
            Hit { hit, matches }
        })
        .collect())
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn email(id: &str, created_at: i64, subject: &str, body: &str, from: &str) -> EmailRow {
        let mut e = EmailRow {
            id: id.into(),
            gm_msgid: id.into(),
            thread_id: format!("t{id}"),
            folder: FOLDER_ALL.into(),
            created_at,
            subject: subject.into(),
            from: json!({ "address": from, "name": "Sender" }),
            to: json!([{ "address": "me@example.com", "name": null }]),
            cc: json!([]),
            bcc: json!([]),
            ..Default::default()
        };
        e.search = Some(SearchDoc::new(&e, body, ["invoice.pdf".to_string()]));
        e
    }

    fn store() -> (Store, std::path::PathBuf) {
        let dir = std::env::temp_dir().join(format!("mymail-search-{}", uuid::Uuid::new_v4()));
        std::fs::create_dir_all(&dir).unwrap();
        let store = Store::open(&dir.join("db")).unwrap();
        store
            .insert_email(&email("a", 1, "COD services", "We deliver cash on delivery orders", "ops@courier.ma"))
            .unwrap();
        store
            .insert_email(&email("b", 2, "Weekly report", "Our services improved; cod volume is up", "boss@shop.ma"))
            .unwrap();
        store.insert_email(&email("c", 3, "Lunch", "Pizza tomorrow?", "friend@example.com")).unwrap();
        (store, dir)
    }

    fn ids(hits: &[Hit]) -> Vec<&str> {
        hits.iter().map(|h| h.hit.email_id.as_str()).collect()
    }

    fn find(store: &Store, q: Query, sort: Sort) -> Vec<Hit> {
        search(store, &q, sort, 100, |_| true).unwrap()
    }

    #[test]
    fn finds_all_words_stemmed_and_ranks_subject_first() {
        let (store, dir) = store();
        let hits = find(&store, Query { text: "cod service".into(), ..Default::default() }, Sort::Relevance);
        assert_eq!(ids(&hits), ["a", "b"]);
        let a = &hits[0].matches;
        assert!(a.contains(&("cod".into(), vec!["subject"])));
        assert!(a.iter().any(|(w, f)| w == "service" && f.contains(&"subject")));
        let newest = find(&store, Query { text: "services".into(), ..Default::default() }, Sort::Newest);
        assert_eq!(ids(&newest), ["b", "a"]);
        std::fs::remove_dir_all(dir).unwrap();
    }

    #[test]
    fn falls_back_to_any_word_and_matches_prefixes() {
        let (store, dir) = store();
        let hits = find(&store, Query { text: "pizza services".into(), ..Default::default() }, Sort::Oldest);
        assert_eq!(ids(&hits), ["a", "b", "c"]);
        let hits = find(&store, Query { text: "deliv".into(), ..Default::default() }, Sort::Relevance);
        assert_eq!(ids(&hits), ["a"]);
        std::fs::remove_dir_all(dir).unwrap();
    }

    #[test]
    fn narrows_by_field_sender_date_and_folder() {
        let (store, dir) = store();
        let q = |text: &str, fields: &[&str]| Query {
            text: text.into(),
            fields: fields.iter().map(|f| f.to_string()).collect(),
            ..Default::default()
        };
        assert_eq!(ids(&find(&store, q("cod", &["subject"]), Sort::Oldest)), ["a"]);
        assert_eq!(ids(&find(&store, q("invoice", &["attachments"]), Sort::Oldest)), ["a", "b", "c"]);
        let from = Query { from: "boss@shop.ma".into(), ..Default::default() };
        assert_eq!(ids(&find(&store, from, Sort::Oldest)), ["b"]);
        let recent = Query { after: Some(2), ..Default::default() };
        assert_eq!(ids(&find(&store, recent, Sort::Oldest)), ["b", "c"]);
        let mut trashed = email("d", 4, "Old pizza", "", "x@example.com");
        trashed.folder = "trash".into();
        store.insert_email(&trashed).unwrap();
        assert_eq!(ids(&find(&store, q("pizza", &[]), Sort::Oldest)), ["c"]);
        let all = Query { include_deleted: true, ..q("pizza", &[]) };
        assert_eq!(ids(&find(&store, all, Sort::Oldest)), ["c", "d"]);
        std::fs::remove_dir_all(dir).unwrap();
    }

    #[test]
    fn deleting_or_replacing_an_email_updates_the_index() {
        let (store, dir) = store();
        store.delete_email("c").unwrap();
        assert!(find(&store, Query { text: "pizza".into(), ..Default::default() }, Sort::Oldest).is_empty());
        store.insert_email(&email("a", 1, "Renamed", "nothing here", "ops@courier.ma")).unwrap();
        let hits = find(&store, Query { text: "cod".into(), ..Default::default() }, Sort::Oldest);
        assert_eq!(ids(&hits), ["b"]);
        assert!(store.unindexed_emails(10).unwrap().is_empty());
        std::fs::remove_dir_all(dir).unwrap();
    }
}
