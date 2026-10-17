//! Converting raw Gmail messages into the client's encrypted email shape.

use anyhow::{Context, Result};
use mail_parser::{Address, HeaderValue, MessageParser, MimeHeaders};
use serde_json::{Value as Json, json};
use sha2::{Digest, Sha256};

use crate::crypto::{self, AttachmentMetadata, datagram};
use crate::store::{AttachmentRef, EmailRow};

/// Message-IDs we generate for outgoing mail embed the client's email id so the sent copy synced back from
/// Gmail keeps that id (the client de-duplicates its optimistic reply by it).
const OWN_MESSAGE_ID_PREFIX: &str = "mymail-";

pub fn own_message_id(email_id: &str, from_address: &str) -> String {
    let domain = from_address.rsplit_once('@').map(|(_, d)| d).unwrap_or("localhost");
    format!("<{OWN_MESSAGE_ID_PREFIX}{email_id}@{domain}>")
}

/// Gmail-side facts about a message, from the IMAP FETCH.
pub struct GmailMeta {
    pub msgid: u64,
    pub thrid: u64,
    pub labels: Vec<String>,
    pub seen: bool,
    pub folder: String,
    pub internal_date_ms: i64,
}

/// Keys used to encrypt a message for the mailbox owner.
pub struct Recipient<'a> {
    pub user_public_key: &'a str,
    pub server_secret_key: &'a str,
}

fn addresses(addr: Option<&Address<'_>>) -> Json {
    Json::Array(
        addr.into_iter()
            .flat_map(|a| a.iter())
            .filter_map(|a| {
                let address = a.address()?.to_string();
                Some(json!({ "address": address, "name": a.name(), "blocked": false }))
            })
            .collect(),
    )
}

fn header_text_list(v: &HeaderValue<'_>) -> Vec<String> {
    match v {
        HeaderValue::Text(t) => vec![t.to_string()],
        HeaderValue::TextList(l) => l.iter().map(|t| t.to_string()).collect(),
        _ => vec![],
    }
}

fn angle(id: &str) -> String {
    if id.starts_with('<') { id.to_string() } else { format!("<{id}>") }
}

pub fn escape_html(s: &str) -> String {
    s.replace('&', "&amp;").replace('<', "&lt;").replace('>', "&gt;").replace('"', "&quot;")
}

pub fn text_to_html(text: &str) -> String {
    format!("<div>{}</div>", escape_html(text).replace("\r\n", "\n").replace('\n', "<br>"))
}

/// First 100 UTF-16 units of the whitespace-collapsed text, like the client's snippet.
fn snippet(text: &str) -> String {
    let collapsed = text.split_whitespace().collect::<Vec<_>>().join(" ");
    let mut out = String::new();
    let mut units = 0;
    for c in collapsed.chars() {
        units += c.len_utf16();
        if units > 100 {
            break;
        }
        out.push(c);
    }
    out
}

/// Session key for a message, boxed to the owner: (raw session key, encryptedSessionKey).
pub fn new_boxed_session_key(to: &Recipient<'_>) -> Result<(String, String)> {
    let key = crypto::new_session_key();
    let boxed = crypto::box_encrypt(key.as_bytes(), to.user_public_key, to.server_secret_key)?;
    Ok((key, boxed))
}

/// Recover a stored message's session key (the box is symmetric, so the server can open what it sealed).
pub fn open_session_key(encrypted_session_key: &str, to: &Recipient<'_>) -> Result<String> {
    let key = crypto::box_decrypt(encrypted_session_key, to.user_public_key, to.server_secret_key)?;
    String::from_utf8(key).context("session key is not utf-8")
}

pub fn import(raw: &[u8], meta: &GmailMeta, to: &Recipient<'_>) -> Result<EmailRow> {
    let msg = MessageParser::default().parse(raw).context("unparseable message")?;
    let message_id = msg.message_id().map(angle).unwrap_or_default();
    let id = message_id
        .strip_prefix(&format!("<{OWN_MESSAGE_ID_PREFIX}"))
        .and_then(|rest| rest.split_once('@'))
        .map(|(id, _)| id.to_string())
        .unwrap_or_else(|| format!("gm{:x}", meta.msgid));

    let subject = msg.subject().unwrap_or_default().to_string();
    let has_html = msg.html_body_count() > 0 && msg.html_body.iter().any(|&i| msg.text_body.iter().all(|&t| t != i));
    let text = msg.body_text(0).map(|c| c.into_owned()).unwrap_or_default();
    let html = if has_html { msg.body_html(0).map(|c| c.into_owned()).unwrap_or_default() } else { String::new() };
    let text_as_html = if has_html { String::new() } else { text_to_html(&text) };

    let (key, encrypted_session_key) = new_boxed_session_key(to)?;
    let mut attachments = Vec::new();
    for (i, part) in msg.attachments().enumerate() {
        let content = part.contents();
        let content_type = part
            .content_type()
            .map(|c| format!("{}/{}", c.ctype(), c.subtype().unwrap_or("octet-stream")))
            .unwrap_or_else(|| "application/octet-stream".into());
        let filename = part.attachment_name().unwrap_or("attachment").to_string();
        let inline = part.content_disposition().is_some_and(|d| d.ctype().eq_ignore_ascii_case("inline"));
        let disposition = format!("{}; filename=\"{}\"", if inline { "inline" } else { "attachment" }, filename);
        let checksum = crypto::b64(&Sha256::digest(crypto::b64(content).as_bytes()));
        let metadata = AttachmentMetadata {
            content_type,
            content_disposition: disposition,
            filename,
            checksum,
            size: content.len() as i64,
            content_id: part.content_id().map(angle).unwrap_or_default(),
        };
        attachments.push(AttachmentRef {
            attachment_id: format!("{id}:{i}"),
            encrypted_metadata: metadata.encrypt(&key)?,
            part_index: i,
        });
    }

    let mut references = header_text_list(msg.references()).into_iter().map(|r| angle(&r)).collect::<Vec<_>>();
    if references.is_empty() {
        references = header_text_list(msg.in_reply_to()).into_iter().map(|r| angle(&r)).collect();
    }

    Ok(EmailRow {
        id,
        gm_msgid: meta.msgid.to_string(),
        thread_id: format!("{:x}", meta.thrid),
        message_id_header: message_id,
        references_header: references.join(" "),
        folder: meta.folder.clone(),
        gm_labels: meta.labels.clone(),
        seen: meta.seen,
        created_at: meta.internal_date_ms,
        updated_at: crate::store::now_ms(),
        from: addresses(msg.from()).get(0).cloned().unwrap_or_else(|| json!({"address": "unknown", "name": null})),
        to: addresses(msg.to()),
        cc: addresses(msg.cc()),
        bcc: addresses(msg.bcc()),
        reply_to: addresses(msg.reply_to()).get(0).cloned().unwrap_or(Json::Null),
        encrypted_subject: crypto::encrypt_string_field(datagram::MAIL_SUBJECT, &subject, &key)?,
        encrypted_text: crypto::encrypt_string_field(datagram::MAIL_TEXT, &text, &key)?,
        encrypted_html: crypto::encrypt_string_field(datagram::MAIL_HTML, &html, &key)?,
        encrypted_text_as_html: crypto::encrypt_string_field(datagram::MAIL_TEXT_AS_HTML, &text_as_html, &key)?,
        encrypted_snippet: crypto::encrypt_string_field(datagram::MAIL_TEXT, &snippet(&text), &key)?,
        encrypted_session_key,
        attachments,
        subject,
    })
}

/// Base64 content of the `part_index`-th attachment of a raw message.
pub fn attachment_content_b64(raw: &[u8], part_index: usize) -> Result<String> {
    let msg = MessageParser::default().parse(raw).context("unparseable message")?;
    let part = msg.attachments().nth(part_index).context("attachment not found")?;
    Ok(crypto::b64(part.contents()))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn imports_and_decrypts() {
        let (user_pk, user_sk) = crypto::generate_keypair();
        let (server_pk, server_sk) = crypto::generate_keypair();
        let raw = b"From: Alice <alice@example.com>\r\nTo: me@gmail.com\r\nSubject: Hi there\r\n\
Message-ID: <abc@example.com>\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=b\r\n\r\n\
--b\r\nContent-Type: text/plain\r\n\r\nHello <world> & co\r\n--b\r\nContent-Type: application/pdf\r\n\
Content-Disposition: attachment; filename=\"x.pdf\"\r\nContent-Transfer-Encoding: base64\r\n\r\nJVBERi0=\r\n--b--\r\n";
        let meta = GmailMeta { msgid: 255, thrid: 4096, labels: vec!["\\Inbox".into()], seen: false, folder: "all".into(), internal_date_ms: 1 };
        let to = Recipient { user_public_key: &user_pk, server_secret_key: &server_sk };
        let e = import(raw, &meta, &to).unwrap();
        assert_eq!(e.id, "gmff");
        assert_eq!(e.thread_id, "1000");
        assert_eq!(e.from["address"], "alice@example.com");
        // the user decrypts with their secret key and the server public key (encryptedBy)
        let key = String::from_utf8(crypto::box_decrypt(&e.encrypted_session_key, &server_pk, &user_sk).unwrap()).unwrap();
        assert_eq!(crypto::decrypt_string_field(datagram::MAIL_SUBJECT, &e.encrypted_subject, &key).unwrap(), "Hi there");
        assert!(crypto::decrypt_string_field(datagram::MAIL_TEXT_AS_HTML, &e.encrypted_text_as_html, &key).unwrap().contains("&lt;world&gt;"));
        assert_eq!(e.attachments.len(), 1);
        let meta = AttachmentMetadata::decrypt(&e.attachments[0].encrypted_metadata, &key).unwrap();
        assert_eq!((meta.filename.as_str(), meta.size), ("x.pdf", 5));
        assert_eq!(attachment_content_b64(raw, 0).unwrap(), "JVBERi0=");
    }

    #[test]
    fn own_message_ids_round_trip() {
        let (user_pk, _) = crypto::generate_keypair();
        let (_, server_sk) = crypto::generate_keypair();
        let mid = own_message_id("5f0c", "me@gmail.com");
        let raw = format!("From: me@gmail.com\r\nMessage-ID: {mid}\r\nSubject: s\r\n\r\nbody\r\n");
        let meta = GmailMeta { msgid: 1, thrid: 1, labels: vec![], seen: true, folder: "all".into(), internal_date_ms: 1 };
        let e = import(raw.as_bytes(), &meta, &Recipient { user_public_key: &user_pk, server_secret_key: &server_sk }).unwrap();
        assert_eq!(e.id, "5f0c");
    }
}
