//! GraphQL handlers implementing the Skiff mail API on top of the Gmail-backed store.

use std::{
    collections::{HashMap, HashSet},
    sync::Arc,
    time::{Duration, Instant},
};

use anyhow::{Context, Result, anyhow, bail};
use lettre::message::{Attachment, Mailbox, MultiPart, SinglePart, header::ContentType};
use serde_json::{Value as Json, json};
use sha2::{Digest, Sha256};

use crate::crypto::{self, AttachmentMetadata, datagram};
use crate::filters;
use crate::gmail::{self, Action, FOLDER_ALL, FOLDER_SPAM, FOLDER_TRASH, Gmail};
use crate::google::{Google, Vacation};
use crate::gql::{Call, Handlers, coded};
use crate::mail::{self, Recipient};
use crate::srp;
use crate::store::{EmailRow, Label, Session, Store, User};

pub const SESSION_COOKIE: &str = "mymail_session";
const SESSION_MAX_AGE: Duration = Duration::from_secs(30 * 24 * 3600);
const SRP_CHALLENGE_TTL: Duration = Duration::from_secs(600);

pub struct App {
    pub store: Arc<Store>,
    pub gmail: Option<Gmail>,
    pub google: Option<Arc<Google>>,
    pub server_public_key: String,
    pub server_secret_key: String,
    pub public_url: String,
    pub display_name: String,
    /// username -> (b, created); reusable until expiry because the client replays step-2 requests.
    srp_challenges: std::sync::Mutex<HashMap<String, (String, Instant)>>,
    /// Thread summaries for listing/counting, rebuilt only when the store's generation changes.
    threads_cache: std::sync::Mutex<Option<(u64, Arc<Vec<ThreadView>>)>>,
    pub sync_now: tokio::sync::Notify,
}

impl App {
    pub fn new(
        store: Arc<Store>,
        gmail: Option<Gmail>,
        google: Option<Arc<Google>>,
        public_url: String,
        display_name: String,
    ) -> Result<Self> {
        let server_secret_key = match store.kv_get("server_secret_key")? {
            Some(sk) => sk,
            None => {
                let (_, sk) = crypto::generate_keypair();
                store.kv_set("server_secret_key", &sk)?;
                sk
            }
        };
        Ok(Self {
            server_public_key: crypto::public_key_of(&server_secret_key)?,
            server_secret_key,
            store,
            gmail,
            google,
            public_url: public_url.trim_end_matches('/').to_string(),
            display_name,
            srp_challenges: Default::default(),
            threads_cache: Default::default(),
            sync_now: Default::default(),
        })
    }

    pub fn recipient<'a>(&'a self, user: &'a User) -> Recipient<'a> {
        Recipient { user_public_key: &user.public_key, server_secret_key: &self.server_secret_key }
    }

    fn gmail(&self) -> Result<&Gmail> {
        self.gmail.as_ref().ok_or_else(|| anyhow!("Gmail is not configured on the server (GMAIL_ADDRESS / GMAIL_APP_PASSWORD)"))
    }

    /// The Google client, if Google has been connected (needed for filters and the vacation responder).
    pub fn google(&self) -> Result<&Google> {
        match &self.google {
            Some(g) if Google::is_connected(&self.store) => Ok(g),
            Some(_) => Err(coded(
                "BAD_REQUEST",
                format!("Connect your Google account first: open {}/graphql/oauth/start", self.public_url),
            )),
            None => Err(coded("BAD_REQUEST", "Google OAuth isn't configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)")),
        }
    }

    pub fn session_user(&self, token: Option<&str>) -> Result<(Session, User)> {
        let token = token.ok_or_else(|| coded("NOT_AUTHORIZED", "not logged in"))?;
        let session = self
            .store
            .session(token, SESSION_MAX_AGE.as_millis() as i64)?
            .ok_or_else(|| coded("NOT_AUTHORIZED", "session expired"))?;
        let user = self.store.user_by_id(&session.user_id)?.ok_or_else(|| coded("NOT_AUTHORIZED", "unknown user"))?;
        Ok((session, user))
    }

    fn mail_address(&self, user: &User) -> String {
        self.gmail.as_ref().map(|g| g.address.clone()).unwrap_or_else(|| user.username.clone())
    }
}

type C = Call<App>;

fn auth(c: &C) -> Result<(Session, User)> {
    c.state.session_user(c.request.session_token.as_deref())
}

fn s<'a>(v: &'a Json, key: &str) -> &'a str {
    v.get(key).and_then(Json::as_str).unwrap_or_default()
}

fn strings(v: &Json, key: &str) -> Vec<String> {
    v.get(key)
        .and_then(Json::as_array)
        .map(|a| a.iter().filter_map(|x| x.as_str().map(str::to_string)).collect())
        .unwrap_or_default()
}

/// Dates arrive as epoch-ms numbers (our own cursors) or ISO strings (serialised JS Dates).
fn parse_date(v: Option<&Json>) -> Option<i64> {
    match v? {
        Json::Number(n) => n.as_i64().or_else(|| n.as_f64().map(|f| f as i64)),
        Json::String(s) => s
            .parse::<i64>()
            .ok()
            .or_else(|| chrono::DateTime::parse_from_rfc3339(s).ok().map(|d| d.timestamp_millis())),
        _ => None,
    }
}

// ---------------------------------------------------------------------------
// Users & auth

fn user_json(app: &App, u: &User) -> Json {
    let address = app.mail_address(u);
    let display_name = if u.display_name.is_empty() { app.display_name.clone() } else { u.display_name.clone() };
    json!({
        "userID": u.user_id,
        "username": u.username,
        "publicKey": { "key": u.public_key, "signature": u.public_key_signature },
        "signingPublicKey": u.signing_public_key,
        "publicData": { "displayName": display_name, "displayPictureData": {} },
        "rootOrgID": u.root_org_id,
        "rootOrganization": { "orgID": u.root_org_id, "name": display_name },
        "emailAliases": [address],
        "defaultEmailAlias": address,
        "createdAt": 0,
        "hasTemporaryPassword": false,
        "onboardedWorkspaceMigration": true,
        "storageUsed": "0",
        "subscriptionInfo": { "subscriptionPlan": "Pro" },
        "skemailStorageUsage": { "attachmentUsageBytes": 0, "messageUsageBytes": 0 },
        "paidUpStatus": { "paidUp": true },
        "quickAliases": [],
        "accountTags": [],
        "mfaTypes": [],
        "anonymousSubdomains": [],
    })
}

fn session_cookie(token: &str, max_age: u64) -> String {
    format!("{SESSION_COOKIE}={token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age={max_age}")
}

async fn login_srp(c: C) -> Result<Json> {
    let req = &c.args["request"];
    let username = s(req, "username").trim().to_lowercase();
    let user = c.state.store.user_by_name(&username)?;
    match req.get("step").and_then(Json::as_i64) {
        Some(1) => {
            let b = crypto::random_bytes::<32>();
            let Some(user) = user else {
                // don't reveal whether the account exists
                let fake_salt = hex::encode(Sha256::digest(format!("{}{username}", c.state.server_secret_key)));
                let (_, big_b) = srp::server_ephemeral(&hex::encode(b), b)?;
                return Ok(json!({ "salt": fake_salt, "serverEphemeralPublic": big_b }));
            };
            let (b_hex, big_b) = srp::server_ephemeral(&user.verifier, b)?;
            let mut challenges = c.state.srp_challenges.lock().unwrap_or_else(|p| p.into_inner());
            challenges.retain(|_, (_, t)| t.elapsed() < SRP_CHALLENGE_TTL);
            challenges.insert(username, (b_hex, Instant::now()));
            Ok(json!({ "salt": user.salt, "serverEphemeralPublic": big_b }))
        }
        Some(2) => {
            let failure = json!({ "status": "AUTH_FAILURE" });
            let Some(user) = user else { return Ok(failure) };
            let b_hex = {
                let challenges = c.state.srp_challenges.lock().unwrap_or_else(|p| p.into_inner());
                match challenges.get(&username) {
                    Some((b, t)) if t.elapsed() < SRP_CHALLENGE_TTL => b.clone(),
                    _ => return Ok(failure),
                }
            };
            let Ok(server_proof) = srp::verify_session(
                &b_hex,
                s(req, "clientEphemeralPublic"),
                &user.salt,
                s(req, "username"),
                &user.verifier,
                s(req, "clientSessionProof"),
            ) else {
                tracing::warn!("failed login for {username}");
                return Ok(failure);
            };
            let session = Session {
                token: hex::encode(crypto::random_bytes::<32>()),
                user_id: user.user_id.clone(),
                cache_key: crypto::b64(&crypto::random_bytes::<32>()),
            };
            c.state.store.insert_session(&session)?;
            c.request.set_cookies.lock().unwrap().push(session_cookie(&session.token, SESSION_MAX_AGE.as_secs()));
            tracing::info!("login for {username}");
            let mut out = user_json(&c.state, &user);
            let extra = json!({
                "status": "AUTHENTICATED",
                "serverSessionProof": server_proof,
                "publicKey": { "key": user.public_key, "signature": user.public_key_signature },
                "encryptedUserData": user.encrypted_user_data,
                "encryptedDocumentData": user.encrypted_document_data,
                "cacheKey": session.cache_key,
                "mfaTypes": [],
            });
            out.as_object_mut().unwrap().extend(extra.as_object().unwrap().clone());
            Ok(out)
        }
        _ => Err(coded("BAD_REQUEST", "unknown SRP step")),
    }
}

// ---------------------------------------------------------------------------
// Threads

struct ThreadView {
    thread_id: String,
    emails: Vec<EmailRow>,
    system_labels: Vec<&'static str>,
    user_labels: Vec<Label>,
    read: bool,
    emails_updated_at: i64,
    sent_updated_at: Option<i64>,
    content_updated_at: i64,
    has_attachments: bool,
}

fn is_sent(e: &EmailRow) -> bool {
    e.gm_labels.iter().any(|l| l == "\\Sent")
}

fn build_thread(thread_id: String, mut emails: Vec<EmailRow>, labels_by_gmail: &HashMap<String, Label>) -> ThreadView {
    emails.sort_by_key(|e| e.created_at);
    let live: Vec<&EmailRow> = emails.iter().filter(|e| e.folder == FOLDER_ALL).collect();
    let mut system_labels = Vec::new();
    if live.is_empty() {
        if emails.iter().all(|e| e.folder == FOLDER_SPAM) {
            system_labels.push("SPAM");
        } else {
            system_labels.push("TRASH");
        }
    } else {
        let inbox = live.iter().any(|e| e.gm_labels.iter().any(|l| l == "\\Inbox"));
        if inbox {
            system_labels.push("INBOX");
        }
        if live.iter().any(|e| is_sent(e)) {
            system_labels.push("SENT");
        }
        if !inbox && live.iter().any(|e| !is_sent(e)) {
            system_labels.push("ARCHIVE");
        }
    }
    let mut user_labels: Vec<Label> = live
        .iter()
        .flat_map(|e| &e.gm_labels)
        .filter_map(|l| labels_by_gmail.get(l).cloned())
        .collect();
    user_labels.sort_by(|a, b| a.label_id.cmp(&b.label_id));
    user_labels.dedup_by(|a, b| a.label_id == b.label_id);
    ThreadView {
        thread_id,
        read: emails.iter().all(|e| e.seen),
        emails_updated_at: emails.iter().map(|e| e.created_at).max().unwrap_or_default(),
        sent_updated_at: emails.iter().filter(|e| is_sent(e)).map(|e| e.created_at).max(),
        content_updated_at: emails.iter().map(|e| e.updated_at.max(e.created_at)).max().unwrap_or_default(),
        has_attachments: emails.iter().any(|e| !e.attachments.is_empty()),
        system_labels,
        user_labels,
        emails,
    }
}

fn labels_by_gmail(store: &Store) -> Result<HashMap<String, Label>> {
    Ok(store.labels()?.into_iter().map(|l| (l.gmail_name.clone(), l)).collect())
}

/// Thread state for every thread, built from email summaries (no encrypted content loaded) and cached
/// until mail or labels change. The app's search indexer pages through everything, so this is hot.
fn all_threads(app: &App) -> Result<Arc<Vec<ThreadView>>> {
    let generation = app.store.generation();
    if let Some((cached_gen, threads)) = app.threads_cache.lock().unwrap_or_else(|p| p.into_inner()).as_ref() {
        if *cached_gen == generation {
            return Ok(threads.clone());
        }
    }
    let labels = labels_by_gmail(&app.store)?;
    let mut groups: HashMap<String, Vec<EmailRow>> = HashMap::new();
    for e in app.store.email_summaries()? {
        groups.entry(e.thread_id.clone()).or_default().push(e);
    }
    let threads: Arc<Vec<ThreadView>> =
        Arc::new(groups.into_iter().map(|(id, emails)| build_thread(id, emails, &labels)).collect());
    *app.threads_cache.lock().unwrap_or_else(|p| p.into_inner()) = Some((generation, threads.clone()));
    Ok(threads)
}

fn load_thread(store: &Store, thread_id: &str) -> Result<Option<ThreadView>> {
    let emails = store.thread_emails(thread_id)?;
    if emails.is_empty() {
        return Ok(None);
    }
    Ok(Some(build_thread(thread_id.to_string(), emails, &labels_by_gmail(store)?)))
}

fn label_json(l: &Label) -> Json {
    json!({ "labelID": l.label_id, "labelName": l.name, "color": l.color, "variant": l.variant })
}

fn encrypted(data: &str) -> Json {
    json!({ "encryptedData": data })
}

fn email_json(app: &App, e: &EmailRow) -> Json {
    json!({
        "id": e.id,
        "threadID": e.thread_id,
        "createdAt": e.created_at,
        "from": e.from,
        "to": e.to,
        "cc": e.cc,
        "bcc": e.bcc,
        "replyTo": e.reply_to,
        "encryptedSessionKey": { "encryptedSessionKey": e.encrypted_session_key, "encryptedBy": { "key": app.server_public_key } },
        "encryptedSubject": encrypted(&e.encrypted_subject),
        "encryptedText": encrypted(&e.encrypted_text),
        "encryptedHtml": encrypted(&e.encrypted_html),
        "encryptedTextAsHtml": encrypted(&e.encrypted_text_as_html),
        "encryptedTextSnippet": encrypted(&e.encrypted_snippet),
        "attachmentMetadata": e.attachments.iter().map(|a| json!({
            "attachmentID": a.attachment_id,
            "encryptedData": encrypted(&a.encrypted_metadata),
        })).collect::<Vec<_>>(),
        "encryptedRawMimeUrl": format!("{}/graphql/raw/{}", app.public_url, e.id),
        "scheduleSendAt": null,
        "notificationsTurnedOffForSender": false,
    })
}

fn thread_json(app: &App, t: &ThreadView, user_id: &str, filtered: &HashSet<String>) -> Json {
    json!({
        "threadID": t.thread_id,
        "userID": user_id,
        "attributes": {
            "read": t.read,
            "systemLabels": t.system_labels,
            "userLabels": t.user_labels.iter().map(label_json).collect::<Vec<_>>(),
            "clientsideFiltersApplied": filtered.contains(&t.thread_id),
        },
        "emails": t.emails.iter().map(|e| email_json(app, e)).collect::<Vec<_>>(),
        "emailsUpdatedAt": t.emails_updated_at,
        "sentLabelUpdatedAt": t.sent_updated_at,
        "threadContentUpdatedAt": t.content_updated_at,
        "updatedAt": t.content_updated_at,
        "deletedAt": null,
        "permanentlyDeleted": false,
    })
}

/// Virtual label for the "All Mail" folder: everything except Trash and Spam, like Gmail.
const ALL_MAIL: &str = "ALL_MAIL";

fn thread_has_label(t: &ThreadView, label: &str) -> bool {
    if label == ALL_MAIL {
        return !t.system_labels.iter().any(|l| *l == "TRASH" || *l == "SPAM");
    }
    t.system_labels.contains(&label) || t.user_labels.iter().any(|l| l.label_id == label)
}

async fn mailbox(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let req = &c.args["request"];
    let empty = json!({ "threads": [], "pageInfo": { "hasNextPage": false } });
    // We don't run Skiff's client-side mail filters; report nothing pending for them.
    if req.get("clientsideFiltersApplied") == Some(&Json::Bool(false)) {
        return Ok(empty);
    }
    let label = req.get("label").and_then(Json::as_str);
    if matches!(label, Some("DRAFTS" | "SCHEDULE_SEND" | "IMPORTS" | "QUICK_ALIASES" | "VIRUS")) {
        return Ok(empty);
    }
    let limit = req.get("limit").and_then(Json::as_u64).unwrap_or(20).clamp(1, 100) as usize;
    let filters = &req["filters"];
    let all = all_threads(&c.state)?;
    let mut threads: Vec<&ThreadView> = all.iter().collect();
    threads.retain(|t| {
        label.is_none_or(|l| thread_has_label(t, l))
            && filters.get("read").and_then(Json::as_bool).is_none_or(|r| t.read == r)
            && filters.get("attachments").and_then(Json::as_bool).is_none_or(|a| t.has_attachments == a)
    });

    // sort key: the date the client paginates on
    let field = s(req, "updatedAtField");
    let key = |t: &ThreadView| -> i64 {
        match (label, field) {
            (Some("SENT"), _) => t.sent_updated_at.unwrap_or(t.emails_updated_at),
            (None, "THREAD_CONTENT_UPDATED_AT" | "UPDATED_AT") => t.content_updated_at,
            _ => t.emails_updated_at,
        }
    };
    let ascending = label.is_none() && s(req, "updatedAtOrderDirection") == "ASC";
    if let Some(last) = parse_date(req.get("lastUpdatedDate")) {
        threads.retain(|t| if ascending { key(t) > last } else { key(t) < last });
    }
    threads.sort_by(|a, b| {
        let ord = (key(a), &a.thread_id).cmp(&(key(b), &b.thread_id));
        if ascending { ord } else { ord.reverse() }
    });
    if let Some(cursor) = req.get("cursor").filter(|c| !c.is_null()) {
        let (cd, cid) = (parse_date(cursor.get("date")).unwrap_or_default(), s(cursor, "threadID").to_string());
        threads.retain(|t| {
            let pos = (key(t), t.thread_id.as_str()).cmp(&(cd, cid.as_str()));
            if ascending { pos.is_gt() } else { pos.is_lt() }
        });
    }
    let has_next = threads.len() > limit;
    threads.truncate(limit);
    let filtered = c.state.store.clientside_filtered()?;
    let mut page = Vec::with_capacity(threads.len());
    for t in threads.iter() {
        // summaries carry no content; load the full emails for the threads on this page
        if let Some(full) = load_thread(&c.state.store, &t.thread_id)? {
            page.push(thread_json(&c.state, &full, &user.user_id, &filtered));
        }
    }
    Ok(json!({
        "threads": page,
        "pageInfo": {
            "hasNextPage": has_next,
            "cursor": threads.last().map(|t| json!({ "threadID": t.thread_id, "date": key(t) })),
        },
    }))
}

async fn user_thread(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let filtered = c.state.store.clientside_filtered()?;
    Ok(load_thread(&c.state.store, s(&c.args, "threadID"))?
        .map(|t| thread_json(&c.state, &t, &user.user_id, &filtered))
        .unwrap_or(Json::Null))
}

async fn user_threads(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let filtered = c.state.store.clientside_filtered()?;
    let mut out = Vec::new();
    for id in strings(&c.args, "threadIDs") {
        if let Some(t) = load_thread(&c.state.store, &id)? {
            out.push(thread_json(&c.state, &t, &user.user_id, &filtered));
        }
    }
    Ok(Json::Array(out))
}

fn unread_count(threads: &[ThreadView], label: &str) -> usize {
    if label == ALL_MAIL {
        return 0; // no unread badge on All Mail (Gmail doesn't show one either)
    }
    threads.iter().filter(|t| !t.read && thread_has_label(t, label)).count()
}

async fn unread(c: C) -> Result<Json> {
    auth(&c)?;
    Ok(json!(unread_count(&all_threads(&c.state)?, s(&c.args, "label"))))
}

async fn unread_all_labels(c: C) -> Result<Json> {
    auth(&c)?;
    let threads = all_threads(&c.state)?;
    Ok(Json::Array(
        strings(&c.args, "labels").iter().map(|l| json!({ "label": l, "count": unread_count(&threads, l) })).collect(),
    ))
}

async fn num_mailbox_threads(c: C) -> Result<Json> {
    auth(&c)?;
    let label = s(&c.args, "label");
    Ok(json!(all_threads(&c.state)?.iter().filter(|t| thread_has_label(t, label)).count()))
}

async fn attachments(c: C) -> Result<Json> {
    auth(&c)?;
    let mut out = Vec::new();
    for id in strings(&c.args, "ids") {
        if let Some((email, att)) = c.state.store.email_by_attachment(&id)? {
            out.push(json!({
                "attachmentID": att.attachment_id,
                "downloadLink": format!("{}/graphql/attachment/{}", c.state.public_url, att.attachment_id),
                "encryptedSessionKey": { "encryptedSessionKey": email.encrypted_session_key, "encryptedBy": { "key": c.state.server_public_key } },
            }));
        }
    }
    Ok(Json::Array(out))
}

// ---------------------------------------------------------------------------
// Actions on threads (mirrored to Gmail)

fn thread_messages(store: &Store, thread_ids: &[String]) -> Result<Vec<EmailRow>> {
    let mut out = Vec::new();
    for id in thread_ids {
        out.extend(store.thread_emails(id)?);
    }
    Ok(out)
}

fn refs(emails: &[&EmailRow]) -> Vec<(String, String)> {
    emails.iter().map(|e| (e.folder.clone(), e.gm_msgid.clone())).collect()
}

async fn set_read_status(c: C) -> Result<Json> {
    auth(&c)?;
    let req = &c.args["request"];
    let read = req.get("read").and_then(Json::as_bool).unwrap_or(true);
    let ids = strings(req, "threadIDs");
    let emails = thread_messages(&c.state.store, &ids)?;
    let targets: Vec<&EmailRow> = emails.iter().filter(|e| e.seen != read).collect();
    c.state.gmail()?.apply(&refs(&targets), Action::Seen(read)).await?;
    for e in targets {
        c.state.store.update_email_state(&e.gm_msgid, &e.folder, &e.gm_labels, read)?;
    }
    Ok(json!({ "updatedThreadIDs": ids }))
}

async fn set_all_threads_read_status(c: C) -> Result<Json> {
    auth(&c)?;
    let req = &c.args["request"];
    let read = req.get("read").and_then(Json::as_bool).unwrap_or(true);
    let label = s(req, "label");
    let ids: Vec<String> = all_threads(&c.state)?
        .iter()
        .filter(|t| thread_has_label(t, label) && t.read != read)
        .map(|t| t.thread_id.clone())
        .collect();
    let emails = thread_messages(&c.state.store, &ids)?;
    let targets: Vec<&EmailRow> = emails.iter().filter(|e| e.seen != read).collect();
    c.state.gmail()?.apply(&refs(&targets), Action::Seen(read)).await?;
    for e in targets {
        c.state.store.update_email_state(&e.gm_msgid, &e.folder, &e.gm_labels, read)?;
    }
    Ok(json!(true))
}

/// Apply (add=true) or remove system/user labels on threads, in Gmail terms.
async fn modify_labels(c: C, add: bool) -> Result<Json> {
    auth(&c)?;
    let req = &c.args["request"];
    let ids = strings(req, "threadIDs");
    let system = strings(req, "systemLabels");
    let label_ids = strings(req, "userLabels");
    let all_labels = c.state.store.labels()?;
    let gmail_names: Vec<String> = all_labels
        .iter()
        .filter(|l| label_ids.contains(&l.label_id))
        .map(|l| l.gmail_name.clone())
        .collect();
    let gm = c.state.gmail()?;
    let store = &c.state.store;

    for thread_id in &ids {
        let emails = store.thread_emails(thread_id)?;
        let live: Vec<&EmailRow> = emails.iter().filter(|e| e.folder == FOLDER_ALL).collect();
        let dead: Vec<&EmailRow> = emails.iter().filter(|e| e.folder != FOLDER_ALL).collect();
        let all: Vec<&EmailRow> = emails.iter().collect();
        let mut moved_to: Option<(&str, bool)> = None; // (folder, inbox)
        let mut inbox_change: Option<bool> = None;
        for label in &system {
            match (label.as_str(), add) {
                ("TRASH", true) => {
                    gm.apply(&refs(&live), Action::MoveTo(FOLDER_TRASH)).await?;
                    gm.apply(&refs(&dead.iter().copied().filter(|e| e.folder == FOLDER_SPAM).collect::<Vec<_>>()), Action::MoveTo(FOLDER_TRASH)).await?;
                    moved_to = Some((FOLDER_TRASH, false));
                }
                ("SPAM", true) => {
                    gm.apply(&refs(&all), Action::MoveTo(FOLDER_SPAM)).await?;
                    moved_to = Some((FOLDER_SPAM, false));
                }
                ("ARCHIVE", true) | ("INBOX", false) => {
                    gm.apply(&refs(&dead), Action::MoveTo(FOLDER_ALL)).await?;
                    gm.apply(&refs(&live), Action::RemoveLabels(&["\\Inbox".to_string()])).await?;
                    if !dead.is_empty() {
                        moved_to = Some((FOLDER_ALL, false));
                    }
                    inbox_change = Some(false);
                }
                ("INBOX", true) | ("TRASH" | "SPAM", false) => {
                    gm.apply(&refs(&dead), Action::MoveTo("INBOX")).await?;
                    gm.apply(&refs(&live), Action::AddLabels(&["\\Inbox".to_string()])).await?;
                    if !dead.is_empty() {
                        moved_to = Some((FOLDER_ALL, true));
                    }
                    inbox_change = Some(true);
                }
                _ => {}
            }
        }
        if !gmail_names.is_empty() {
            let action = if add { Action::AddLabels(&gmail_names) } else { Action::RemoveLabels(&gmail_names) };
            gm.apply(&refs(&live), action).await?;
        }
        // mirror the change locally so the response (and next poll) reflect it before the resync
        for e in &emails {
            let mut labels = e.gm_labels.clone();
            let mut folder = e.folder.clone();
            if let Some((target, inbox)) = moved_to {
                folder = target.to_string();
                if inbox {
                    labels.push("\\Inbox".into());
                }
            }
            match inbox_change {
                Some(true) => labels.push("\\Inbox".into()),
                Some(false) => labels.retain(|l| l != "\\Inbox"),
                None => {}
            }
            if add {
                labels.extend(gmail_names.iter().cloned());
            } else {
                labels.retain(|l| !gmail_names.contains(l));
            }
            labels.sort();
            labels.dedup();
            store.update_email_state(&e.gm_msgid, &folder, &labels, e.seen)?;
        }
    }
    c.state.sync_now.notify_one();

    let mut updated = Vec::new();
    for id in &ids {
        if let Some(t) = load_thread(store, id)? {
            updated.push(json!({
                "threadID": t.thread_id,
                "systemLabels": t.system_labels,
                "userLabels": t.user_labels.iter().map(label_json).collect::<Vec<_>>(),
            }));
        }
    }
    Ok(json!({ "updatedThreads": updated }))
}

async fn delete_thread(c: C) -> Result<Json> {
    auth(&c)?;
    let ids = strings(&c.args["request"], "threadIDs");
    let emails = thread_messages(&c.state.store, &ids)?;
    let all: Vec<&EmailRow> = emails.iter().collect();
    c.state.gmail()?.apply(&refs(&all), Action::DeleteForever).await?;
    for e in &emails {
        c.state.store.delete_email(&e.gm_msgid)?;
    }
    Ok(Json::Null)
}

// ---------------------------------------------------------------------------
// Labels

const LABEL_VARIANTS: [&str; 2] = ["PLAIN", "FOLDER"];

async fn user_labels(c: C) -> Result<Json> {
    auth(&c)?;
    Ok(Json::Array(c.state.store.labels()?.iter().map(label_json).collect()))
}

async fn create_user_label(c: C) -> Result<Json> {
    auth(&c)?;
    let req = &c.args["request"];
    let name = s(req, "labelName").trim().to_string();
    if name.is_empty() {
        bail!(coded("BAD_REQUEST", "label name is required"));
    }
    c.state.gmail()?.create_label(&name).await?;
    let variant = s(req, "variant");
    let label = Label {
        label_id: gmail::label_id_for(&name),
        name: name.clone(),
        color: s(req, "color").to_string(),
        variant: if LABEL_VARIANTS.contains(&variant) { variant.to_string() } else { "PLAIN".into() },
        gmail_name: name,
    };
    c.state.store.upsert_label(&label)?;
    Ok(label_json(&label))
}

async fn edit_user_label(c: C) -> Result<Json> {
    auth(&c)?;
    let req = &c.args["request"];
    let id = s(req, "labelID");
    let mut label = c.state.store.labels()?.into_iter().find(|l| l.label_id == id).ok_or_else(|| coded("NOT_FOUND", "no such label"))?;
    if let Some(name) = req.get("labelName").and_then(Json::as_str).map(str::trim).filter(|n| !n.is_empty() && *n != label.name) {
        c.state.gmail()?.rename_label(&label.gmail_name, name).await?;
        label.name = name.to_string();
        label.gmail_name = name.to_string();
    }
    if let Some(color) = req.get("color").and_then(Json::as_str) {
        label.color = color.to_string();
    }
    if let Some(variant) = req.get("variant").and_then(Json::as_str).filter(|v| LABEL_VARIANTS.contains(v)) {
        label.variant = variant.to_string();
    }
    c.state.store.upsert_label(&label)?;
    c.state.sync_now.notify_one();
    Ok(label_json(&label))
}

async fn delete_user_label(c: C) -> Result<Json> {
    auth(&c)?;
    let id = s(&c.args["request"], "labelID");
    if let Some(label) = c.state.store.labels()?.into_iter().find(|l| l.label_id == id) {
        c.state.gmail()?.delete_label(&label.gmail_name).await?;
        c.state.store.delete_label(id)?;
        c.state.sync_now.notify_one();
    }
    Ok(Json::Null)
}

// ---------------------------------------------------------------------------
// Sending

/// Decrypted outgoing attachment.
struct OutAttachment {
    meta: AttachmentMetadata,
    bytes: Vec<u8>,
}

fn decode_attachment_content(content: &str) -> Result<Vec<u8>> {
    let b64 = match content.split_once("base64,") {
        Some((prefix, data)) if prefix.starts_with("data:") => data,
        _ => content,
    };
    crypto::unb64(b64)
}

fn mailbox_of(v: &Json) -> Result<Mailbox> {
    let address = s(v, "address").parse().with_context(|| format!("invalid address {}", s(v, "address")))?;
    let name = v.get("name").and_then(Json::as_str).filter(|n| !n.is_empty()).map(str::to_string);
    Ok(Mailbox::new(name, address))
}

async fn send(c: C, reply: bool) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let app = &c.state;
    let msg = &c.args["message"];

    let ext = msg.get("externalEncryptedSessionKey").filter(|v| !v.is_null()).ok_or_else(|| {
        coded("BAD_REQUEST", "missing externalEncryptedSessionKey; the server can only relay through Gmail")
    })?;
    let session_key = String::from_utf8(crypto::box_decrypt(
        s(ext, "encryptedSessionKey"),
        s(&ext["encryptedBy"], "key"),
        &app.server_secret_key,
    )?)?;
    let field = |name: &str, dg: &str| -> Result<String> {
        match msg.get(name).map(|v| s(v, "encryptedData")).filter(|d| !d.is_empty()) {
            Some(data) => crypto::decrypt_string_field(dg, data, &session_key),
            None => Ok(String::new()),
        }
    };
    let text = field("encryptedText", datagram::MAIL_TEXT)?;
    let html = field("encryptedHtml", datagram::MAIL_HTML)?;
    let subject = match s(msg, "rawSubject") {
        "" => field("encryptedSubject", datagram::MAIL_SUBJECT)?,
        raw => raw.to_string(),
    };
    let mut atts = Vec::new();
    for a in msg.get("attachments").and_then(Json::as_array).into_iter().flatten() {
        let meta = AttachmentMetadata::decrypt(s(&a["encryptedMetadata"], "encryptedData"), &session_key)?;
        let content =
            crypto::decrypt_string_field(datagram::ATTACHMENT, s(&a["encryptedContent"], "encryptedFile"), &session_key)?;
        atts.push(OutAttachment { meta, bytes: decode_attachment_content(&content)? });
    }

    // Threading for replies/forwards.
    let replied = if reply { app.store.email(s(msg, "replyID"))? } else { None };
    let email_id = match s(msg, "customMessageID") {
        "" => uuid::Uuid::new_v4().to_string(),
        id => id.to_string(),
    };
    let from = &msg["from"];
    let message_id = mail::own_message_id(&email_id, s(from, "address"));

    let mut builder = lettre::Message::builder()
        .from(mailbox_of(from)?)
        .subject(subject)
        .message_id(Some(message_id.clone()))
        .date_now();
    for (key, add) in [("to", 0), ("cc", 1), ("bcc", 2)] {
        for r in msg.get(key).and_then(Json::as_array).into_iter().flatten() {
            let mb = mailbox_of(r)?;
            builder = match add {
                0 => builder.to(mb),
                1 => builder.cc(mb),
                _ => builder.bcc(mb),
            };
        }
    }
    if let Some(r) = &replied {
        if !r.message_id_header.is_empty() {
            builder = builder.in_reply_to(r.message_id_header.clone());
            let references = format!("{} {}", r.references_header, r.message_id_header);
            builder = builder.references(references.trim().to_string());
        }
    }

    let text_part = SinglePart::plain(if text.is_empty() { String::from(" ") } else { text });
    let (inline, files): (Vec<_>, Vec<_>) = atts.into_iter().partition(|a| {
        a.meta.content_disposition.to_ascii_lowercase().starts_with("inline") && !a.meta.content_id.is_empty()
    });
    let body = if html.is_empty() {
        MultiPart::mixed().singlepart(text_part)
    } else {
        let mut related = MultiPart::related().singlepart(SinglePart::html(html));
        for a in inline {
            let ct = ContentType::parse(&a.meta.content_type).unwrap_or(ContentType::parse("application/octet-stream")?);
            let cid = a.meta.content_id.trim_matches(|c| c == '<' || c == '>').to_string();
            related = related.singlepart(Attachment::new_inline(cid).body(a.bytes, ct));
        }
        MultiPart::mixed().multipart(MultiPart::alternative().singlepart(text_part).multipart(related))
    };
    let body = files.into_iter().fold(body, |body, a| {
        let ct = ContentType::parse(&a.meta.content_type).unwrap_or(ContentType::TEXT_PLAIN);
        body.singlepart(Attachment::new(a.meta.filename).body(a.bytes, ct))
    });
    let message = builder.multipart(body)?;
    tracing::info!("built outgoing message {email_id} ({} bytes)", message.formatted().len());
    let gm = app.gmail()?;
    gm.send(message).await?;
    tracing::info!("sent message {email_id}");

    // Gmail files the sent copy within a moment; find its conversation id, then import it.
    let mut thread_id = None;
    for _ in 0..8 {
        if let Ok(Some(t)) = gm.thread_of_message_id(&message_id).await {
            thread_id = Some(t);
            break;
        }
        tokio::time::sleep(Duration::from_millis(750)).await;
    }
    let thread_id = thread_id.or_else(|| replied.map(|r| r.thread_id)).unwrap_or_else(|| email_id.clone());
    let app2 = c.state.clone();
    tokio::spawn(async move {
        if let (Some(gm), Ok(Some(u))) = (app2.gmail.as_ref(), app2.store.user_by_id(&user.user_id)) {
            if let Err(e) = gm.sync(&app2.store, &app2.recipient(&u)).await {
                tracing::warn!("post-send sync failed: {e:#}");
            }
        }
    });
    Ok(json!({ "messageID": email_id, "threadID": thread_id }))
}

// ---------------------------------------------------------------------------
// Mail filters (Gmail filters via the Gmail API)

async fn gmail_label_maps(app: &App) -> Result<(HashMap<String, String>, HashMap<String, String>)> {
    let ids = app.google()?.label_ids(&app.store).await?;
    let names = ids.iter().map(|(name, id)| (id.clone(), name.clone())).collect();
    Ok((ids, names))
}

async fn mail_filters(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let app = &c.state;
    let Ok(google) = app.google() else { return Ok(json!([])) };
    let gmail_filters = google.filters(&app.store).await?;
    let stored = app.store.filter_definitions()?;
    let labels = app.store.labels()?;
    let (_, label_names) = gmail_label_maps(app).await?;
    let mut out = Vec::new();
    for f in &gmail_filters {
        let id = f.id.clone().unwrap_or_default();
        if let Some(def) = stored.get(&id) {
            // created through the app: show exactly what was entered
            out.push(json!({
                "mailFilterID": id,
                "name": def["name"],
                "filter": def["filter"],
                "actions": def["actions"],
                "clientside": true,
                "encryptedSessionKey": def["encryptedSessionKey"],
                "encryptedByKey": def["encryptedByKey"],
            }));
        } else {
            let (key, boxed) = mail::new_boxed_session_key(&app.recipient(&user))?;
            out.push(filters::from_gmail_filter(f, &key, &boxed, &app.server_public_key, &labels, &label_names)?);
        }
    }
    Ok(Json::Array(out))
}

/// Create the Gmail filter for a create/update request and remember the app-side definition.
async fn save_filter(app: &App, user: &User, input: &Json) -> Result<()> {
    let google = app.google()?;
    // The client seals the filter's session key to the server (user secret key + server public key).
    let session_key = match input["encryptedByKey"].as_str() {
        Some(k) if k == app.server_public_key => Some(
            String::from_utf8(crypto::box_decrypt(s(input, "encryptedSessionKey"), &user.public_key, &app.server_secret_key)?)?,
        ),
        _ => None,
    };
    let (label_ids, _) = gmail_label_maps(app).await?;
    let gmail_filter = filters::to_gmail_filter(input, session_key.as_deref(), &app.store.labels()?, &label_ids)?;
    let created = google.create_filter(&app.store, &gmail_filter).await?;
    let id = created.id.ok_or_else(|| anyhow!("Gmail returned no filter id"))?;
    let definition = json!({
        "name": input["name"],
        "filter": input["filter"],
        "actions": input["actions"],
        "encryptedSessionKey": input["encryptedSessionKey"],
        "encryptedByKey": input["encryptedByKey"],
    });
    app.store.put_filter_definition(&id, &definition)
}

async fn create_mail_filter(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    save_filter(&c.state, &user, &c.args["input"]).await?;
    Ok(Json::Null)
}

async fn update_mail_filter(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let input = &c.args["input"];
    let old_id = s(input, "mailFilterID").to_string();
    // Gmail filters can't be edited in place: create the new one first, then remove the old one
    save_filter(&c.state, &user, input).await?;
    c.state.google()?.delete_filter(&c.state.store, &old_id).await?;
    c.state.store.delete_filter_definition(&old_id)?;
    Ok(Json::Null)
}

async fn delete_mail_filter(c: C) -> Result<Json> {
    auth(&c)?;
    let id = s(&c.args["input"], "mailFilterID").to_string();
    c.state.google()?.delete_filter(&c.state.store, &id).await?;
    c.state.store.delete_filter_definition(&id)?;
    Ok(Json::Null)
}

// ---------------------------------------------------------------------------
// Auto-reply (Gmail vacation responder)

async fn auto_reply(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let app = &c.state;
    let Ok(google) = app.google() else { return Ok(Json::Null) };
    let v = google.vacation(&app.store).await?;
    if !v.enable_auto_reply {
        return Ok(Json::Null);
    }
    let subject = v.response_subject.unwrap_or_default();
    let text = v.response_body_plain_text.clone().unwrap_or_default();
    let html = v.response_body_html.clone().unwrap_or_else(|| mail::text_to_html(&text));
    let (key, boxed) = mail::new_boxed_session_key(&app.recipient(&user))?;
    let enc = |dg: &str, v: &str| crypto::encrypt_string_field(dg, v, &key).map(|d| encrypted(&d));
    Ok(json!({
        "encryptedSubject": enc(datagram::MAIL_SUBJECT, &subject)?,
        "encryptedText": enc(datagram::MAIL_TEXT, &text)?,
        "encryptedHtml": enc(datagram::MAIL_HTML, &html)?,
        "encryptedTextAsHtml": enc(datagram::MAIL_TEXT_AS_HTML, &html)?,
        "encryptedSessionKey": { "encryptedSessionKey": boxed, "encryptedBy": { "key": app.server_public_key } },
    }))
}

async fn set_auto_reply(c: C) -> Result<Json> {
    let (_, user) = auth(&c)?;
    let app = &c.state;
    let req = &c.args["request"];
    // the client seals this copy of the session key for the server (user secret key + server public key)
    let key = String::from_utf8(crypto::box_decrypt(
        s(&req["encryptedSkiffSessionKey"], "encryptedSessionKey"),
        &user.public_key,
        &app.server_secret_key,
    )?)?;
    let field = |name: &str, dg: &str| crypto::decrypt_string_field(dg, s(&req[name], "encryptedData"), &key);
    let mut vacation = app.google()?.vacation(&app.store).await?;
    vacation.enable_auto_reply = true;
    vacation.response_subject = Some(field("encryptedSubject", datagram::MAIL_SUBJECT)?);
    vacation.response_body_plain_text = Some(field("encryptedText", datagram::MAIL_TEXT)?);
    vacation.response_body_html = Some(field("encryptedHtml", datagram::MAIL_HTML)?);
    app.google()?.set_vacation(&app.store, &vacation).await?;
    tracing::info!("Gmail vacation responder enabled");
    Ok(Json::Null)
}

async fn delete_auto_reply(c: C) -> Result<Json> {
    auth(&c)?;
    let app = &c.state;
    let google = app.google()?;
    let vacation = Vacation { enable_auto_reply: false, ..google.vacation(&app.store).await? };
    google.set_vacation(&app.store, &vacation).await?;
    tracing::info!("Gmail vacation responder disabled");
    Ok(Json::Null)
}

// ---------------------------------------------------------------------------

pub fn handlers() -> Handlers<App> {
    let mut h = Handlers::<App>::default();

    h.on("Mutation.loginSrp", login_srp);
    h.on("Query.sessionCache", async |c: C| {
        let (session, _) = auth(&c)?;
        Ok(json!({ "cacheKey": session.cache_key, "alternativeCacheKeys": [] }))
    });
    h.on("Mutation.clearSessionCache", async |c: C| {
        if let Some(token) = &c.request.session_token {
            c.state.store.delete_session(token)?;
        }
        c.request.set_cookies.lock().unwrap().push(session_cookie("", 0));
        Ok(json!({ "status": "SUCCESS" }))
    });
    h.on("Query.currentUser", async |c: C| match auth(&c) {
        Ok((_, user)) => Ok(user_json(&c.state, &user)),
        Err(_) => Ok(Json::Null),
    });
    h.on("Query.user", async |c: C| {
        let (_, user) = auth(&c)?;
        let req = &c.args["request"];
        let matches = s(req, "userID") == user.user_id || s(req, "username").eq_ignore_ascii_case(&user.username);
        Ok(if matches { user_json(&c.state, &user) } else { Json::Null })
    });
    h.on("Query.usersFromEmailAliasWithCatchall", async |c: C| {
        // every recipient is external: mail leaves through Gmail
        Ok(Json::Array(vec![Json::Null; strings(&c.args, "emailAliases").len()]))
    });
    h.on("Query.decryptionServicePublicKey", async |c: C| Ok(json!({ "key": c.state.server_public_key })));
    h.on("Mutation.updateDocumentData", async |c: C| {
        let (_, user) = auth(&c)?;
        c.state.store.set_document_data(&user.user_id, s(&c.args["request"], "encryptedDocumentData"))?;
        Ok(json!({ "status": "SUCCESS" }))
    });
    h.on("Mutation.updateDisplayName", async |c: C| {
        let (_, user) = auth(&c)?;
        c.state.store.set_display_name(&user.user_id, s(&c.args["request"], "displayName"))?;
        Ok(json!({ "status": "SUCCESS" }))
    });
    h.on("Mutation.setDefaultEmailAlias", async |_c: C| Ok(json!(true)));
    h.on("Mutation.storeWorkspaceEvent", async |_c: C| Ok(json!(true)));

    h.on("Query.mailbox", mailbox);
    h.on("Query.userThread", user_thread);
    h.on("Query.userThreads", user_threads);
    h.on("Query.unread", unread);
    h.on("Query.unreadAllLabels", unread_all_labels);
    h.on("Query.numMailboxThreads", num_mailbox_threads);
    h.on("Query.attachments", attachments);
    h.on("Query.isCustomDomain", async |_c: C| Ok(json!(false)));
    h.on("Query.searchIndexProgress", async |c: C| {
        let n = all_threads(&c.state)?.len();
        Ok(json!({ "isIndexComplete": true, "numIndexableThreads": n, "numThreadsIndexed": n }))
    });
    h.on("Mutation.markThreadAsOpened", async |_c: C| Ok(Json::Null));
    h.on("Mutation.markThreadsAsClientsideFiltered", async |c: C| {
        auth(&c)?;
        c.state.store.set_clientside_filtered(&strings(&c.args["input"], "threadIDs"))?;
        Ok(Json::Null)
    });

    h.on("Mutation.setReadStatus", set_read_status);
    h.on("Mutation.setAllThreadsReadStatus", set_all_threads_read_status);
    h.on("Mutation.applyLabels", async |c: C| modify_labels(c, true).await);
    h.on("Mutation.removeLabels", async |c: C| modify_labels(c, false).await);
    h.on("Mutation.deleteThread", delete_thread);

    h.on("Query.userLabels", user_labels);
    h.on("Mutation.createUserLabel", create_user_label);
    h.on("Mutation.editUserLabel", edit_user_label);
    h.on("Mutation.deleteUserLabel", delete_user_label);

    h.on("Mutation.sendMessage", async |c: C| send(c, false).await);
    h.on("Mutation.replyToMessage", async |c: C| send(c, true).await);
    h.on("Mutation.unsendMessage", async |_c: C| -> Result<Json> {
        Err(coded("BAD_REQUEST", "Undo send isn't supported: the message was already handed to Gmail"))
    });

    h.on("Query.mailFilters", mail_filters);
    h.on("Mutation.createMailFilter", create_mail_filter);
    h.on("Mutation.updateMailFilter", update_mail_filter);
    h.on("Mutation.deleteMailFilter", delete_mail_filter);
    h.on("Query.autoReply", auto_reply);
    h.on("Mutation.setAutoReply", set_auto_reply);
    h.on("Mutation.deleteAutoReply", delete_auto_reply);

    h.on("Query.allDrafts", async |c: C| {
        let (_, user) = auth(&c)?;
        Ok(Json::Array(c.state.store.drafts(&user.user_id)?))
    });
    h.on("Mutation.createOrUpdateDraft", async |c: C| {
        let (_, user) = auth(&c)?;
        let r = &c.args["request"];
        c.state.store.upsert_draft(&user.user_id, s(r, "draftID"), s(r, "encryptedKey"), s(r, "encryptedDraft"))?;
        Ok(Json::Null)
    });
    h.on("Mutation.deleteDraft", async |c: C| {
        let (_, user) = auth(&c)?;
        c.state.store.delete_draft(&user.user_id, s(&c.args["request"], "draftID"))?;
        Ok(Json::Null)
    });
    h
}

/// Encrypted attachment content for the download link (fetched from Gmail on demand).
pub async fn attachment_download(app: &App, token: Option<&str>, attachment_id: &str) -> Result<String> {
    let (_, user) = app.session_user(token)?;
    let (email, att) = app.store.email_by_attachment(attachment_id)?.ok_or_else(|| coded("NOT_FOUND", "no such attachment"))?;
    let raw = app.gmail()?.fetch_raw(&email.folder, &email.gm_msgid).await?;
    let key = mail::open_session_key(&email.encrypted_session_key, &app.recipient(&user))?;
    let content = mail::attachment_content_b64(&raw, att.part_index)?;
    crypto::encrypt_string_field(datagram::ATTACHMENT, &content, &key)
}

/// Encrypted raw MIME for "view original"/headers.
pub async fn raw_mime_download(app: &App, token: Option<&str>, email_id: &str) -> Result<String> {
    let (_, user) = app.session_user(token)?;
    let email = app.store.email(email_id)?.ok_or_else(|| coded("NOT_FOUND", "no such email"))?;
    let raw = app.gmail()?.fetch_raw(&email.folder, &email.gm_msgid).await?;
    let key = mail::open_session_key(&email.encrypted_session_key, &app.recipient(&user))?;
    crypto::encrypt_string_field(datagram::RAW_MIME, &String::from_utf8_lossy(&raw), &key)
}

