//! SQLite persistence: users, sessions, synced (already encrypted) Gmail messages, labels and drafts.

use std::{collections::HashMap, path::Path, sync::Mutex};

use anyhow::Result;
use rusqlite::{Connection, OptionalExtension, Row, params};
use serde::{Deserialize, Serialize};
use serde_json::Value as Json;

pub use crate::search::SearchDoc;

pub struct Store {
    conn: Mutex<Connection>,
    /// Change notifications for connected clients (see `events.rs`).
    events: tokio::sync::broadcast::Sender<Change>,
    /// Bumped on every change to mail or labels; lets callers cache derived data.
    generation: std::sync::atomic::AtomicU64,
}

/// Something clients should refresh.
#[derive(Clone, Debug)]
pub enum Change {
    Thread(String),
    Labels,
    Drafts,
}

#[derive(Clone, Debug)]
pub struct User {
    pub user_id: String,
    pub username: String,
    pub salt: String,
    pub verifier: String,
    pub encrypted_user_data: String,
    pub encrypted_document_data: Option<String>,
    pub public_key: String,
    pub public_key_signature: String,
    pub signing_public_key: String,
    pub root_org_id: String,
    pub display_name: String,
}

#[derive(Clone, Debug)]
pub struct Session {
    pub token: String,
    pub user_id: String,
    pub cache_key: String,
}

/// One Gmail message, stored with its client-encrypted fields.
#[derive(Clone, Debug, Default)]
pub struct EmailRow {
    pub id: String,
    pub gm_msgid: String,
    pub thread_id: String,
    pub message_id_header: String,
    pub references_header: String,
    /// "all" | "trash" | "spam"
    pub folder: String,
    pub gm_labels: Vec<String>,
    pub seen: bool,
    pub created_at: i64,
    pub updated_at: i64,
    pub from: Json,
    pub to: Json,
    pub cc: Json,
    pub bcc: Json,
    pub reply_to: Json,
    pub encrypted_session_key: String,
    pub encrypted_subject: String,
    pub encrypted_text: String,
    pub encrypted_html: String,
    pub encrypted_text_as_html: String,
    pub encrypted_snippet: String,
    pub attachments: Vec<AttachmentRef>,
    pub subject: String,
    /// Plaintext to index for search; only set on freshly imported messages (never read back).
    pub search: Option<SearchDoc>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct AttachmentRef {
    pub attachment_id: String,
    pub encrypted_metadata: String,
    /// Index among the parsed message's attachments, used to re-fetch the content from Gmail.
    pub part_index: usize,
}

#[derive(Clone, Debug, Serialize)]
pub struct Label {
    pub label_id: String,
    pub name: String,
    pub color: String,
    pub variant: String,
    pub gmail_name: String,
}

const SCHEMA: &str = r#"
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, salt TEXT NOT NULL, verifier TEXT NOT NULL,
    encrypted_user_data TEXT NOT NULL, encrypted_document_data TEXT, public_key TEXT NOT NULL,
    public_key_signature TEXT NOT NULL, signing_public_key TEXT NOT NULL, root_org_id TEXT NOT NULL,
    display_name TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY, user_id TEXT NOT NULL, cache_key TEXT NOT NULL, created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS emails (
    id TEXT PRIMARY KEY, gm_msgid TEXT UNIQUE NOT NULL, thread_id TEXT NOT NULL, message_id_header TEXT NOT NULL,
    references_header TEXT NOT NULL, folder TEXT NOT NULL, gm_labels TEXT NOT NULL, seen INTEGER NOT NULL,
    created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, from_json TEXT NOT NULL, to_json TEXT NOT NULL,
    cc_json TEXT NOT NULL, bcc_json TEXT NOT NULL, reply_to_json TEXT NOT NULL, encrypted_session_key TEXT NOT NULL,
    encrypted_subject TEXT NOT NULL, encrypted_text TEXT NOT NULL, encrypted_html TEXT NOT NULL,
    encrypted_text_as_html TEXT NOT NULL, encrypted_snippet TEXT NOT NULL, attachments_json TEXT NOT NULL,
    subject TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS emails_thread ON emails(thread_id);
-- covering index for thread summaries, so listing threads never reads the large encrypted bodies
CREATE INDEX IF NOT EXISTS emails_summary ON emails(thread_id, gm_msgid, id, folder, gm_labels, seen, created_at, updated_at, attachments_json);
CREATE TABLE IF NOT EXISTS labels (
    label_id TEXT PRIMARY KEY, name TEXT NOT NULL, color TEXT NOT NULL, variant TEXT NOT NULL, gmail_name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS drafts (
    draft_id TEXT PRIMARY KEY, user_id TEXT NOT NULL, encrypted_key TEXT NOT NULL, encrypted_draft TEXT NOT NULL,
    updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS mail_filters (gmail_filter_id TEXT PRIMARY KEY, definition TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS threads_meta (thread_id TEXT PRIMARY KEY, clientside_filtered INTEGER NOT NULL DEFAULT 0);
-- full-text search: a contentless FTS5 index (no second copy of the text), keyed through emails_search because
-- the rowids of `emails` (TEXT primary key) aren't stable across VACUUM
CREATE VIRTUAL TABLE IF NOT EXISTS emails_fts USING fts5(
    subject, body, sender, recipients, attachments,
    content='', contentless_delete=1, tokenize='porter unicode61 remove_diacritics 2', prefix='2 3'
);
CREATE TABLE IF NOT EXISTS emails_search (fts_rowid INTEGER PRIMARY KEY, email_id TEXT UNIQUE NOT NULL);
CREATE TRIGGER IF NOT EXISTS emails_search_delete AFTER DELETE ON emails BEGIN
    DELETE FROM emails_fts WHERE rowid = (SELECT fts_rowid FROM emails_search WHERE email_id = old.id);
    DELETE FROM emails_search WHERE email_id = old.id;
END;
"#;

pub fn now_ms() -> i64 {
    chrono::Utc::now().timestamp_millis()
}

fn json_col(row: &Row, idx: &str) -> rusqlite::Result<Json> {
    let s: String = row.get(idx)?;
    Ok(serde_json::from_str(&s).unwrap_or(Json::Null))
}

fn email_from_row(row: &Row) -> rusqlite::Result<EmailRow> {
    Ok(EmailRow {
        id: row.get("id")?,
        gm_msgid: row.get("gm_msgid")?,
        thread_id: row.get("thread_id")?,
        message_id_header: row.get("message_id_header")?,
        references_header: row.get("references_header")?,
        folder: row.get("folder")?,
        gm_labels: serde_json::from_value(json_col(row, "gm_labels")?).unwrap_or_default(),
        seen: row.get("seen")?,
        created_at: row.get("created_at")?,
        updated_at: row.get("updated_at")?,
        from: json_col(row, "from_json")?,
        to: json_col(row, "to_json")?,
        cc: json_col(row, "cc_json")?,
        bcc: json_col(row, "bcc_json")?,
        reply_to: json_col(row, "reply_to_json")?,
        encrypted_session_key: row.get("encrypted_session_key")?,
        encrypted_subject: row.get("encrypted_subject")?,
        encrypted_text: row.get("encrypted_text")?,
        encrypted_html: row.get("encrypted_html")?,
        encrypted_text_as_html: row.get("encrypted_text_as_html")?,
        encrypted_snippet: row.get("encrypted_snippet")?,
        attachments: serde_json::from_value(json_col(row, "attachments_json")?).unwrap_or_default(),
        subject: row.get("subject")?,
        search: None,
    })
}

#[derive(Clone, Debug)]
pub struct SearchHit {
    pub email_id: String,
    pub thread_id: String,
    pub folder: String,
    pub created_at: i64,
    pub score: f64,
}

fn search_hit(row: &Row) -> rusqlite::Result<SearchHit> {
    Ok(SearchHit {
        email_id: row.get(0)?,
        thread_id: row.get(1)?,
        folder: row.get(2)?,
        created_at: row.get(3)?,
        score: row.get(4)?,
    })
}

fn index_email(db: &Connection, email_id: &str, doc: &SearchDoc) -> Result<()> {
    db.execute(
        "DELETE FROM emails_fts WHERE rowid = (SELECT fts_rowid FROM emails_search WHERE email_id = ?1)",
        [email_id],
    )?;
    db.execute("DELETE FROM emails_search WHERE email_id = ?1", [email_id])?;
    db.execute("INSERT INTO emails_search (email_id) VALUES (?1)", [email_id])?;
    db.execute(
        "INSERT INTO emails_fts (rowid, subject, body, sender, recipients, attachments)
         VALUES (last_insert_rowid(), ?1, ?2, ?3, ?4, ?5)",
        params![doc.subject, doc.body, doc.sender, doc.recipients, doc.attachments],
    )?;
    Ok(())
}

fn user_from_row(row: &Row) -> rusqlite::Result<User> {
    Ok(User {
        user_id: row.get("user_id")?,
        username: row.get("username")?,
        salt: row.get("salt")?,
        verifier: row.get("verifier")?,
        encrypted_user_data: row.get("encrypted_user_data")?,
        encrypted_document_data: row.get("encrypted_document_data")?,
        public_key: row.get("public_key")?,
        public_key_signature: row.get("public_key_signature")?,
        signing_public_key: row.get("signing_public_key")?,
        root_org_id: row.get("root_org_id")?,
        display_name: row.get("display_name")?,
    })
}

impl Store {
    pub fn open(path: &Path) -> Result<Self> {
        let conn = Connection::open(path)?;
        conn.pragma_update(None, "journal_mode", "WAL")?;
        conn.pragma_update(None, "synchronous", "NORMAL")?;
        conn.execute_batch(SCHEMA)?;
        Ok(Self {
            conn: Mutex::new(conn),
            events: tokio::sync::broadcast::channel(4096).0,
            generation: Default::default(),
        })
    }

    pub fn subscribe(&self) -> tokio::sync::broadcast::Receiver<Change> {
        self.events.subscribe()
    }

    pub fn generation(&self) -> u64 {
        self.generation.load(std::sync::atomic::Ordering::SeqCst)
    }

    fn emit(&self, change: Change) {
        if !matches!(change, Change::Drafts) {
            self.generation.fetch_add(1, std::sync::atomic::Ordering::SeqCst);
        }
        // no receivers is fine: nobody has the app open
        let _ = self.events.send(change);
    }

    fn db(&self) -> std::sync::MutexGuard<'_, Connection> {
        self.conn.lock().unwrap_or_else(|p| p.into_inner())
    }

    // -- kv ------------------------------------------------------------------

    pub fn kv_get(&self, key: &str) -> Result<Option<String>> {
        Ok(self.db().query_row("SELECT value FROM kv WHERE key = ?1", [key], |r| r.get(0)).optional()?)
    }

    pub fn kv_set(&self, key: &str, value: &str) -> Result<()> {
        self.db().execute(
            "INSERT INTO kv(key, value) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            [key, value],
        )?;
        Ok(())
    }

    // -- users & sessions ----------------------------------------------------

    pub fn insert_user(&self, u: &User) -> Result<()> {
        self.db().execute(
            "INSERT INTO users (user_id, username, salt, verifier, encrypted_user_data, encrypted_document_data,
                public_key, public_key_signature, signing_public_key, root_org_id, display_name)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
             ON CONFLICT(username) DO UPDATE SET salt = excluded.salt, verifier = excluded.verifier,
                encrypted_user_data = excluded.encrypted_user_data, encrypted_document_data = NULL,
                public_key = excluded.public_key, public_key_signature = excluded.public_key_signature,
                signing_public_key = excluded.signing_public_key",
            params![
                u.user_id,
                u.username,
                u.salt,
                u.verifier,
                u.encrypted_user_data,
                u.encrypted_document_data,
                u.public_key,
                u.public_key_signature,
                u.signing_public_key,
                u.root_org_id,
                u.display_name
            ],
        )?;
        Ok(())
    }

    pub fn user_by_name(&self, username: &str) -> Result<Option<User>> {
        Ok(self.db().query_row("SELECT * FROM users WHERE username = ?1", [username], user_from_row).optional()?)
    }

    pub fn user_by_id(&self, user_id: &str) -> Result<Option<User>> {
        Ok(self.db().query_row("SELECT * FROM users WHERE user_id = ?1", [user_id], user_from_row).optional()?)
    }

    /// The mailbox owner (this server syncs one Gmail account).
    pub fn first_user(&self) -> Result<Option<User>> {
        Ok(self.db().query_row("SELECT * FROM users ORDER BY rowid LIMIT 1", [], user_from_row).optional()?)
    }

    pub fn set_document_data(&self, user_id: &str, data: &str) -> Result<()> {
        self.db().execute("UPDATE users SET encrypted_document_data = ?2 WHERE user_id = ?1", [user_id, data])?;
        Ok(())
    }

    pub fn set_display_name(&self, user_id: &str, name: &str) -> Result<()> {
        self.db().execute("UPDATE users SET display_name = ?2 WHERE user_id = ?1", [user_id, name])?;
        Ok(())
    }

    pub fn insert_session(&self, s: &Session) -> Result<()> {
        self.db().execute(
            "INSERT INTO sessions (token, user_id, cache_key, created_at) VALUES (?1, ?2, ?3, ?4)",
            params![s.token, s.user_id, s.cache_key, now_ms()],
        )?;
        Ok(())
    }

    pub fn session(&self, token: &str, max_age_ms: i64) -> Result<Option<Session>> {
        Ok(self
            .db()
            .query_row(
                "SELECT token, user_id, cache_key FROM sessions WHERE token = ?1 AND created_at > ?2",
                params![token, now_ms() - max_age_ms],
                |r| Ok(Session { token: r.get(0)?, user_id: r.get(1)?, cache_key: r.get(2)? }),
            )
            .optional()?)
    }

    pub fn delete_session(&self, token: &str) -> Result<()> {
        self.db().execute("DELETE FROM sessions WHERE token = ?1", [token])?;
        Ok(())
    }

    // -- emails ---------------------------------------------------------------

    pub fn has_email(&self, gm_msgid: &str) -> Result<bool> {
        Ok(self
            .db()
            .query_row("SELECT 1 FROM emails WHERE gm_msgid = ?1", [gm_msgid], |_| Ok(()))
            .optional()?
            .is_some())
    }

    pub fn insert_email(&self, e: &EmailRow) -> Result<()> {
        let mut db = self.db();
        let tx = db.transaction()?;
        // what INSERT OR REPLACE would do, but as a real DELETE so the search index trigger runs
        tx.execute("DELETE FROM emails WHERE id = ?1 OR gm_msgid = ?2", [&e.id, &e.gm_msgid])?;
        tx.execute(
            "INSERT INTO emails (id, gm_msgid, thread_id, message_id_header, references_header, folder,
                gm_labels, seen, created_at, updated_at, from_json, to_json, cc_json, bcc_json, reply_to_json,
                encrypted_session_key, encrypted_subject, encrypted_text, encrypted_html, encrypted_text_as_html,
                encrypted_snippet, attachments_json, subject)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23)",
            params![
                e.id,
                e.gm_msgid,
                e.thread_id,
                e.message_id_header,
                e.references_header,
                e.folder,
                serde_json::to_string(&e.gm_labels)?,
                e.seen,
                e.created_at,
                e.updated_at,
                e.from.to_string(),
                e.to.to_string(),
                e.cc.to_string(),
                e.bcc.to_string(),
                e.reply_to.to_string(),
                e.encrypted_session_key,
                e.encrypted_subject,
                e.encrypted_text,
                e.encrypted_html,
                e.encrypted_text_as_html,
                e.encrypted_snippet,
                serde_json::to_string(&e.attachments)?,
                e.subject,
            ],
        )?;
        if let Some(doc) = &e.search {
            index_email(&tx, &e.id, doc)?;
        }
        tx.commit()?;
        drop(db);
        self.emit(Change::Thread(e.thread_id.clone()));
        Ok(())
    }

    // -- search ---------------------------------------------------------------

    pub fn index_email(&self, email_id: &str, doc: &SearchDoc) -> Result<()> {
        index_email(&self.db(), email_id, doc)
    }

    /// Emails missing from the search index (stored before it existed).
    pub fn unindexed_emails(&self, limit: usize) -> Result<Vec<EmailRow>> {
        Ok(self
            .db()
            .prepare("SELECT * FROM emails WHERE id NOT IN (SELECT email_id FROM emails_search) LIMIT ?1")?
            .query_map([limit as i64], email_from_row)?
            .collect::<rusqlite::Result<_>>()?)
    }

    /// Emails matching an FTS5 query, created at or after `after` (epoch ms), with their BM25 relevance
    /// (higher is better).
    pub fn search(&self, fts_query: &str, after: i64, weights: &[f64; 5]) -> Result<Vec<SearchHit>> {
        let sql = format!(
            "SELECT e.id, e.thread_id, e.folder, e.created_at, -bm25(emails_fts, {})
             FROM emails_fts JOIN emails_search s ON s.fts_rowid = emails_fts.rowid JOIN emails e ON e.id = s.email_id
             WHERE emails_fts MATCH ?1 AND e.created_at >= ?2",
            weights.map(|w| w.to_string()).join(", ")
        );
        Ok(self
            .db()
            .prepare(&sql)?
            .query_map(params![fts_query, after], search_hit)?
            .collect::<rusqlite::Result<_>>()?)
    }

    /// Every email created at or after `after`: what a search with filters but no words lists.
    pub fn emails_since(&self, after: i64) -> Result<Vec<SearchHit>> {
        Ok(self
            .db()
            .prepare("SELECT id, thread_id, folder, created_at, 0.0 FROM emails WHERE created_at >= ?1")?
            .query_map([after], search_hit)?
            .collect::<rusqlite::Result<_>>()?)
    }

    /// Which of `email_ids` match an FTS5 query.
    pub fn search_among(&self, fts_query: &str, email_ids: &[&str]) -> Result<std::collections::HashSet<String>> {
        Ok(self
            .db()
            .prepare(
                "SELECT s.email_id FROM emails_fts JOIN emails_search s ON s.fts_rowid = emails_fts.rowid
                 WHERE emails_fts MATCH ?1 AND s.email_id IN (SELECT value FROM json_each(?2))",
            )?
            .query_map(params![fts_query, serde_json::to_string(email_ids)?], |r| r.get(0))?
            .collect::<rusqlite::Result<_>>()?)
    }

    /// Update the mutable Gmail state of a message; bumps `updated_at` only when something changed.
    pub fn update_email_state(&self, gm_msgid: &str, folder: &str, labels: &[String], seen: bool) -> Result<bool> {
        let labels = serde_json::to_string(labels)?;
        let thread: Option<String> = self
            .db()
            .query_row(
                "UPDATE emails SET folder = ?2, gm_labels = ?3, seen = ?4, updated_at = ?5
                 WHERE gm_msgid = ?1 AND (folder != ?2 OR gm_labels != ?3 OR seen != ?4) RETURNING thread_id",
                params![gm_msgid, folder, labels, seen, now_ms()],
                |r| r.get(0),
            )
            .optional()?;
        let changed = thread.is_some();
        if let Some(t) = thread {
            self.emit(Change::Thread(t));
        }
        Ok(changed)
    }

    pub fn delete_emails_not_in(&self, folder: &str, keep: &std::collections::HashSet<String>) -> Result<usize> {
        let db = self.db();
        let rows: Vec<(String, String)> = db
            .prepare("SELECT gm_msgid, thread_id FROM emails WHERE folder = ?1")?
            .query_map([folder], |r| Ok((r.get(0)?, r.get(1)?)))?
            .collect::<rusqlite::Result<_>>()?;
        let mut n = 0;
        for (id, thread) in rows.iter().filter(|(id, _)| !keep.contains(id)) {
            n += db.execute("DELETE FROM emails WHERE gm_msgid = ?1 AND folder = ?2", [id, folder])?;
            self.emit(Change::Thread(thread.clone()));
        }
        Ok(n)
    }

    pub fn delete_email(&self, gm_msgid: &str) -> Result<()> {
        let thread: Option<String> = self
            .db()
            .query_row("DELETE FROM emails WHERE gm_msgid = ?1 RETURNING thread_id", [gm_msgid], |r| r.get(0))
            .optional()?;
        if let Some(t) = thread {
            self.emit(Change::Thread(t));
        }
        Ok(())
    }

    /// Every email without its (large) encrypted content: enough to compute thread state and ordering.
    pub fn email_summaries(&self) -> Result<Vec<EmailRow>> {
        Ok(self
            .db()
            .prepare(
                "SELECT id, gm_msgid, thread_id, '' AS message_id_header, '' AS references_header, folder, gm_labels,
                    seen, created_at, updated_at, 'null' AS from_json, '[]' AS to_json, '[]' AS cc_json, '[]' AS bcc_json,
                    'null' AS reply_to_json, '' AS encrypted_session_key, '' AS encrypted_subject, '' AS encrypted_text,
                    '' AS encrypted_html, '' AS encrypted_text_as_html, '' AS encrypted_snippet, attachments_json,
                    '' AS subject
                 FROM emails",
            )?
            .query_map([], email_from_row)?
            .collect::<rusqlite::Result<_>>()?)
    }

    pub fn all_emails(&self) -> Result<Vec<EmailRow>> {
        Ok(self
            .db()
            .prepare("SELECT * FROM emails")?
            .query_map([], email_from_row)?
            .collect::<rusqlite::Result<_>>()?)
    }

    pub fn thread_emails(&self, thread_id: &str) -> Result<Vec<EmailRow>> {
        Ok(self
            .db()
            .prepare("SELECT * FROM emails WHERE thread_id = ?1 ORDER BY created_at")?
            .query_map([thread_id], email_from_row)?
            .collect::<rusqlite::Result<_>>()?)
    }

    pub fn email(&self, id: &str) -> Result<Option<EmailRow>> {
        Ok(self.db().query_row("SELECT * FROM emails WHERE id = ?1", [id], email_from_row).optional()?)
    }

    pub fn email_by_attachment(&self, attachment_id: &str) -> Result<Option<(EmailRow, AttachmentRef)>> {
        // attachment ids are "<email id>:<part index>"
        let Some((email_id, _)) = attachment_id.rsplit_once(':') else { return Ok(None) };
        Ok(self.email(email_id)?.and_then(|e| {
            let att = e.attachments.iter().find(|a| a.attachment_id == attachment_id).cloned();
            att.map(|a| (e, a))
        }))
    }

    pub fn set_clientside_filtered(&self, thread_ids: &[String]) -> Result<()> {
        let db = self.db();
        for id in thread_ids {
            db.execute(
                "INSERT INTO threads_meta(thread_id, clientside_filtered) VALUES (?1, 1)
                 ON CONFLICT(thread_id) DO UPDATE SET clientside_filtered = 1",
                [id],
            )?;
        }
        Ok(())
    }

    pub fn clientside_filtered(&self) -> Result<std::collections::HashSet<String>> {
        Ok(self
            .db()
            .prepare("SELECT thread_id FROM threads_meta WHERE clientside_filtered = 1")?
            .query_map([], |r| r.get(0))?
            .collect::<rusqlite::Result<_>>()?)
    }

    // -- labels ---------------------------------------------------------------

    pub fn labels(&self) -> Result<Vec<Label>> {
        Ok(self
            .db()
            .prepare("SELECT label_id, name, color, variant, gmail_name FROM labels ORDER BY name")?
            .query_map([], |r| {
                Ok(Label {
                    label_id: r.get(0)?,
                    name: r.get(1)?,
                    color: r.get(2)?,
                    variant: r.get(3)?,
                    gmail_name: r.get(4)?,
                })
            })?
            .collect::<rusqlite::Result<_>>()?)
    }

    pub fn upsert_label(&self, l: &Label) -> Result<()> {
        self.db().execute(
            "INSERT INTO labels (label_id, name, color, variant, gmail_name) VALUES (?1, ?2, ?3, ?4, ?5)
             ON CONFLICT(label_id) DO UPDATE SET name = excluded.name, color = excluded.color,
                variant = excluded.variant, gmail_name = excluded.gmail_name",
            params![l.label_id, l.name, l.color, l.variant, l.gmail_name],
        )?;
        self.emit(Change::Labels);
        Ok(())
    }

    pub fn delete_label(&self, label_id: &str) -> Result<()> {
        self.db().execute("DELETE FROM labels WHERE label_id = ?1", [label_id])?;
        self.emit(Change::Labels);
        Ok(())
    }

    // -- mail filters (app-side definitions of Gmail filters created through the app) ----------

    pub fn filter_definitions(&self) -> Result<HashMap<String, Json>> {
        Ok(self
            .db()
            .prepare("SELECT gmail_filter_id, definition FROM mail_filters")?
            .query_map([], |r| Ok((r.get::<_, String>(0)?, r.get::<_, String>(1)?)))?
            .filter_map(|r| r.ok())
            .map(|(id, def)| (id, serde_json::from_str(&def).unwrap_or(Json::Null)))
            .collect())
    }

    pub fn put_filter_definition(&self, gmail_filter_id: &str, definition: &Json) -> Result<()> {
        self.db().execute(
            "INSERT OR REPLACE INTO mail_filters (gmail_filter_id, definition) VALUES (?1, ?2)",
            [gmail_filter_id, &definition.to_string()],
        )?;
        Ok(())
    }

    pub fn delete_filter_definition(&self, gmail_filter_id: &str) -> Result<()> {
        self.db().execute("DELETE FROM mail_filters WHERE gmail_filter_id = ?1", [gmail_filter_id])?;
        Ok(())
    }

    // -- drafts ---------------------------------------------------------------

    pub fn drafts(&self, user_id: &str) -> Result<Vec<Json>> {
        Ok(self
            .db()
            .prepare("SELECT draft_id, encrypted_key, encrypted_draft, updated_at FROM drafts WHERE user_id = ?1")?
            .query_map([user_id], |r| {
                Ok(serde_json::json!({
                    "draftID": r.get::<_, String>(0)?,
                    "encryptedKey": r.get::<_, String>(1)?,
                    "encryptedDraft": r.get::<_, String>(2)?,
                    "updatedAt": r.get::<_, i64>(3)?,
                }))
            })?
            .collect::<rusqlite::Result<_>>()?)
    }

    pub fn upsert_draft(&self, user_id: &str, draft_id: &str, key: &str, draft: &str) -> Result<()> {
        self.db().execute(
            "INSERT INTO drafts (draft_id, user_id, encrypted_key, encrypted_draft, updated_at) VALUES (?1, ?2, ?3, ?4, ?5)
             ON CONFLICT(draft_id) DO UPDATE SET encrypted_key = excluded.encrypted_key,
                encrypted_draft = excluded.encrypted_draft, updated_at = excluded.updated_at",
            params![draft_id, user_id, key, draft, now_ms()],
        )?;
        self.emit(Change::Drafts);
        Ok(())
    }

    pub fn delete_draft(&self, user_id: &str, draft_id: &str) -> Result<()> {
        self.db().execute("DELETE FROM drafts WHERE draft_id = ?1 AND user_id = ?2", [draft_id, user_id])?;
        self.emit(Change::Drafts);
        Ok(())
    }
}
