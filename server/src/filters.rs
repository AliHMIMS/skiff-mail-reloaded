//! Translation between Skiff mail filters and Gmail filters.
//!
//! A Skiff filter is a condition tree (AND/OR/NOT over FROM/TO/RECIPIENT/SUBJECT/BODY "contains" tests)
//! plus actions. It becomes one Gmail filter whose criteria is a Gmail search query. Subject/body values
//! arrive encrypted with a per-filter session key the client seals to the server's key.

use std::collections::HashMap;

use anyhow::{Context, Result, anyhow, bail};
use serde_json::{Value as Json, json};

use crate::crypto;
use crate::google::{FilterAction, FilterCriteria, GmailFilter};
use crate::store::Label;

pub const SUBJECT_DATAGRAM: &str = "filter.subject";
pub const BODY_DATAGRAM: &str = "filter.body";

fn quoted(value: &str) -> String {
    let clean: String = value.chars().filter(|c| !matches!(c, '"' | '(' | ')' | '{' | '}')).collect();
    format!("\"{}\"", clean.trim())
}

/// Turn a Skiff condition tree into a Gmail search query, decrypting subject/body values with `session_key`.
pub fn to_gmail_query(node: &Json, session_key: Option<&str>) -> Result<String> {
    let kind = node["filterType"].as_str().unwrap_or_default();
    let children = || -> Result<Vec<String>> {
        node["subFilter"].as_array().into_iter().flatten().map(|c| to_gmail_query(c, session_key)).collect()
    };
    let value = || -> Result<String> {
        let data = node["serializedData"].as_str().unwrap_or_default();
        Ok(match kind {
            "SUBJECT" | "BODY" => {
                let key = session_key.context("this filter's text can't be read by the server; edit and save it again")?;
                let datagram = if kind == "SUBJECT" { SUBJECT_DATAGRAM } else { BODY_DATAGRAM };
                crypto::decrypt_string_field(datagram, data, key)?
            }
            _ => data.to_string(),
        })
    };
    Ok(match kind {
        "AND" => children()?.iter().map(|c| format!("({c})")).collect::<Vec<_>>().join(" "),
        "OR" => format!("({})", children()?.join(" OR ")),
        "NOT" => format!("-({})", children()?.join(" ")),
        "FROM" => format!("from:{}", quoted(&value()?)),
        "TO" => format!("to:{}", quoted(&value()?)),
        "CC" => format!("cc:{}", quoted(&value()?)),
        "BCC" => format!("bcc:{}", quoted(&value()?)),
        "RECIPIENT" => {
            let v = quoted(&value()?);
            format!("(to:{v} OR cc:{v} OR bcc:{v})")
        }
        "SUBJECT" => format!("subject:{}", quoted(&value()?)),
        "BODY" => quoted(&value()?),
        other => bail!("unsupported filter condition {other}"),
    })
}

/// Skiff filter actions -> Gmail label changes. `gmail_label_ids` maps Gmail label names to ids.
pub fn to_gmail_action(actions: &[Json], labels: &[Label], gmail_label_ids: &HashMap<String, String>) -> Result<FilterAction> {
    let mut out = FilterAction::default();
    for a in actions {
        let data = a["serializedData"].as_str().unwrap_or_default();
        match a["actionType"].as_str().unwrap_or_default() {
            "APPLY_LABEL" => {
                let label = labels.iter().find(|l| l.label_id == data).ok_or_else(|| anyhow!("unknown label"))?;
                let id = gmail_label_ids.get(&label.gmail_name).ok_or_else(|| anyhow!("label {} not found in Gmail", label.name))?;
                out.add_label_ids.push(id.clone());
            }
            "APPLY_SYSTEM_LABEL" => match data {
                "ARCHIVE" => out.remove_label_ids.push("INBOX".into()),
                "TRASH" => out.add_label_ids.push("TRASH".into()),
                "SPAM" => out.add_label_ids.push("SPAM".into()),
                "INBOX" => {} // incoming mail already lands in the inbox
                other => bail!("moving to {other} isn't supported by Gmail filters"),
            },
            "MARK_AS_READ" => out.remove_label_ids.push("UNREAD".into()),
            _ => {} // DONT_NOTIFY: nothing to do server-side
        }
    }
    if out.add_label_ids.is_empty() && out.remove_label_ids.is_empty() {
        bail!("a Gmail filter needs at least one action (label, move, archive, or mark as read)");
    }
    Ok(out)
}

/// Build the Gmail filter for a Skiff create/update request.
pub fn to_gmail_filter(
    req: &Json,
    session_key: Option<&str>,
    labels: &[Label],
    gmail_label_ids: &HashMap<String, String>,
) -> Result<GmailFilter> {
    let query = to_gmail_query(&req["filter"], session_key)?;
    let actions = req["actions"].as_array().cloned().unwrap_or_default();
    Ok(GmailFilter {
        id: None,
        criteria: FilterCriteria { query: Some(query), ..Default::default() },
        action: to_gmail_action(&actions, labels, gmail_label_ids)?,
    })
}

/// A Gmail filter created outside the app, shown in Skiff's shape. Subject/body values are encrypted
/// with a fresh session key sealed from the server to the user (`boxed_key`, `server_public_key`).
pub fn from_gmail_filter(
    f: &GmailFilter,
    session_key: &str,
    boxed_key: &str,
    server_public_key: &str,
    labels: &[Label],
    gmail_label_names: &HashMap<String, String>,
) -> Result<Json> {
    let enc = |datagram: &str, v: &str| crypto::encrypt_string_field(datagram, v, session_key);
    let mut conditions = Vec::new();
    let c = &f.criteria;
    if let Some(v) = &c.from {
        conditions.push(json!({ "filterType": "FROM", "filterField": "CONTAINS", "serializedData": v }));
    }
    if let Some(v) = &c.to {
        conditions.push(json!({ "filterType": "RECIPIENT", "filterField": "CONTAINS", "serializedData": v }));
    }
    if let Some(v) = &c.subject {
        conditions.push(json!({ "filterType": "SUBJECT", "filterField": "CONTAINS", "serializedData": enc(SUBJECT_DATAGRAM, v)? }));
    }
    if let Some(v) = &c.query {
        conditions.push(json!({ "filterType": "BODY", "filterField": "CONTAINS", "serializedData": enc(BODY_DATAGRAM, v)? }));
    }
    if let Some(v) = &c.negated_query {
        conditions.push(json!({ "filterType": "NOT", "subFilter": [{ "filterType": "BODY", "serializedData": enc(BODY_DATAGRAM, v)? }] }));
    }
    let mut actions = Vec::new();
    for id in &f.action.add_label_ids {
        match id.as_str() {
            "TRASH" | "SPAM" => actions.push(json!({ "actionType": "APPLY_SYSTEM_LABEL", "serializedData": id })),
            _ => {
                let label = gmail_label_names.get(id).and_then(|name| labels.iter().find(|l| &l.gmail_name == name));
                if let Some(l) = label {
                    actions.push(json!({ "actionType": "APPLY_LABEL", "serializedData": l.label_id }));
                }
            }
        }
    }
    for id in &f.action.remove_label_ids {
        match id.as_str() {
            "INBOX" => actions.push(json!({ "actionType": "APPLY_SYSTEM_LABEL", "serializedData": "ARCHIVE" })),
            "UNREAD" => actions.push(json!({ "actionType": "MARK_AS_READ" })),
            _ => {}
        }
    }
    Ok(json!({
        "mailFilterID": f.id,
        "name": null,
        "filter": { "filterType": "AND", "subFilter": conditions },
        "actions": actions,
        "clientside": true,
        "encryptedSessionKey": boxed_key,
        "encryptedByKey": server_public_key,
    }))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn builds_gmail_queries() {
        let key = crypto::new_session_key();
        let subj = crypto::encrypt_string_field(SUBJECT_DATAGRAM, "Invoice (Q3)", &key).unwrap();
        let tree = json!({
            "filterType": "OR",
            "subFilter": [
                { "filterType": "FROM", "filterField": "CONTAINS", "serializedData": "billing@example.com" },
                { "filterType": "SUBJECT", "filterField": "CONTAINS", "serializedData": subj },
                { "filterType": "NOT", "subFilter": [{ "filterType": "RECIPIENT", "serializedData": "me@x.com" }] }
            ]
        });
        assert_eq!(
            to_gmail_query(&tree, Some(&key)).unwrap(),
            "(from:\"billing@example.com\" OR subject:\"Invoice Q3\" OR -((to:\"me@x.com\" OR cc:\"me@x.com\" OR bcc:\"me@x.com\")))"
        );
        assert!(to_gmail_query(&tree, None).is_err(), "encrypted text needs the key");
    }

    #[test]
    fn maps_actions() {
        let labels = vec![Label {
            label_id: "gl1".into(),
            name: "Receipts".into(),
            color: "blue".into(),
            variant: "PLAIN".into(),
            gmail_name: "Receipts".into(),
        }];
        let ids = HashMap::from([("Receipts".to_string(), "Label_7".to_string())]);
        let actions = vec![
            json!({ "actionType": "APPLY_LABEL", "serializedData": "gl1" }),
            json!({ "actionType": "APPLY_SYSTEM_LABEL", "serializedData": "ARCHIVE" }),
            json!({ "actionType": "MARK_AS_READ" }),
        ];
        let a = to_gmail_action(&actions, &labels, &ids).unwrap();
        assert_eq!(a.add_label_ids, vec!["Label_7"]);
        assert_eq!(a.remove_label_ids, vec!["INBOX", "UNREAD"]);
        assert!(to_gmail_action(&[json!({ "actionType": "DONT_NOTIFY" })], &labels, &ids).is_err());
    }
}
