//! Gmail over IMAP (sync + label/flag/move actions) and SMTP (sending), authenticated with an app password.

use std::{
    collections::{HashMap, HashSet},
    sync::Arc,
    time::Duration,
};

use anyhow::{Context, Result, anyhow, bail};
use async_imap::{Session, types::Fetch};
use futures::TryStreamExt;
use lettre::{
    AsyncSmtpTransport, AsyncTransport, Tokio1Executor,
    transport::smtp::authentication::{Credentials, Mechanism},
};
use tokio::{net::TcpStream, sync::Mutex};
use tokio_rustls::{TlsConnector, client::TlsStream, rustls};

use crate::google::Google;
use crate::mail::{self, GmailMeta, Recipient};
use crate::store::{Label, Store};

type ImapSession = Session<TlsStream<TcpStream>>;

pub const FOLDER_ALL: &str = "all";
pub const FOLDER_TRASH: &str = "trash";
pub const FOLDER_SPAM: &str = "spam";

/// Run `$body` with a live IMAP session bound to `$s` (and folder names to `$f`),
/// reconnecting once if the connection had dropped.
macro_rules! imap {
    ($self:ident, |$s:ident, $f:ident| $body:block) => {{
        let mut guard = $self.session.lock().await;
        let mut outcome = None;
        for attempt in 0..2 {
            if guard.is_none() {
                *guard = Some($self.connect().await?);
            }
            let (session, folders) = guard.as_mut().expect("connected above");
            #[allow(unused_variables)]
            let ($s, $f): (&mut ImapSession, &Folders) = (session, folders);
            let result: Result<_> = async { $body }.await;
            match result {
                Err(e) if attempt == 0 => {
                    tracing::warn!("IMAP operation failed, reconnecting: {e:#}");
                    *guard = None;
                }
                other => {
                    outcome = Some(other);
                    break;
                }
            }
        }
        outcome.expect("loop always sets an outcome")
    }};
}

pub struct Gmail {
    pub address: String,
    app_password: Option<String>,
    /// Once Google is connected, IMAP/SMTP authenticate with OAuth (XOAUTH2) instead of the app password.
    oauth: Option<(Arc<Google>, Arc<Store>)>,
    sync_days: i64,
    session: Mutex<Option<(ImapSession, Folders)>>,
    /// Serialises full syncs.
    sync_lock: Mutex<()>,
}

#[derive(Clone, Debug)]
struct Folders {
    all: String,
    trash: String,
    spam: String,
}

impl Folders {
    fn name(&self, kind: &str) -> &str {
        match kind {
            FOLDER_TRASH => &self.trash,
            FOLDER_SPAM => &self.spam,
            _ => &self.all,
        }
    }
}

/// Where the last sync of All Mail left off: UIDVALIDITY, the highest UID seen, and the CONDSTORE mod-sequence.
struct Checkpoint {
    validity: u32,
    last_uid: u32,
    modseq: Option<u64>,
}

impl Checkpoint {
    fn of(mailbox: &async_imap::types::Mailbox) -> Self {
        Self {
            validity: mailbox.uid_validity.unwrap_or_default(),
            last_uid: mailbox.uid_next.unwrap_or(1).saturating_sub(1),
            modseq: mailbox.highest_modseq,
        }
    }

    fn load(store: &Store) -> Result<Option<Self>> {
        let Some(v) = store.kv_get("sync_all_checkpoint")? else { return Ok(None) };
        let parts: Vec<&str> = v.split(':').collect();
        Ok(match parts.as_slice() {
            [validity, last_uid, modseq] => {
                Some(Self { validity: validity.parse()?, last_uid: last_uid.parse()?, modseq: modseq.parse().ok() })
            }
            _ => None,
        })
    }

    fn save(&self, store: &Store) -> Result<()> {
        let modseq = self.modseq.map(|m| m.to_string()).unwrap_or_default();
        store.kv_set("sync_all_checkpoint", &format!("{}:{}:{modseq}", self.validity, self.last_uid))
    }
}

/// An IMAP-level operation applied to a set of messages.
pub enum Action<'a> {
    Seen(bool),
    AddLabels(&'a [String]),
    RemoveLabels(&'a [String]),
    /// Move to another mailbox: "INBOX", or one of the FOLDER_* kinds.
    MoveTo(&'a str),
    DeleteForever,
}

/// SASL XOAUTH2 initial response.
struct XOAuth2(String);

impl async_imap::Authenticator for XOAuth2 {
    type Response = String;

    fn process(&mut self, _challenge: &[u8]) -> String {
        std::mem::take(&mut self.0)
    }
}

fn quote(s: &str) -> String {
    format!("\"{}\"", s.replace('\\', "\\\\").replace('"', "\\\""))
}

fn uid_set(uids: &[u32]) -> String {
    uids.iter().map(u32::to_string).collect::<Vec<_>>().join(",")
}

/// TLS client config with the ring provider and Mozilla's root store (shared with the image proxy).
pub fn tls_client_config() -> Result<rustls::ClientConfig> {
    let roots = rustls::RootCertStore { roots: webpki_roots::TLS_SERVER_ROOTS.to_vec() };
    Ok(rustls::ClientConfig::builder_with_provider(Arc::new(rustls::crypto::ring::default_provider()))
        .with_safe_default_protocol_versions()?
        .with_root_certificates(roots)
        .with_no_client_auth())
}

fn tls_connector() -> Result<TlsConnector> {
    Ok(TlsConnector::from(Arc::new(tls_client_config()?)))
}

impl Gmail {
    pub fn new(
        address: String,
        app_password: Option<String>,
        sync_days: i64,
        oauth: Option<(Arc<Google>, Arc<Store>)>,
    ) -> Self {
        Self {
            address,
            app_password: app_password.map(|p| p.replace(' ', "")),
            oauth,
            sync_days,
            session: Mutex::new(None),
            sync_lock: Mutex::new(()),
        }
    }

    async fn connect(&self) -> Result<(ImapSession, Folders)> {
        let host = "imap.gmail.com";
        let tcp = tokio::time::timeout(Duration::from_secs(20), TcpStream::connect((host, 993))).await??;
        let tls = tls_connector()?.connect(host.try_into()?, tcp).await?;
        let mut client = async_imap::Client::new(tls);
        client.read_response().await.context("no IMAP greeting")?;
        let mut session = match self.oauth_token().await {
            Some(token) => client
                .authenticate("XOAUTH2", XOAuth2(format!("user={}\x01auth=Bearer {token}\x01\x01", self.address)))
                .await
                .map_err(|(e, _)| anyhow!("Gmail IMAP OAuth login failed: {e}"))?,
            None => {
                let password = self
                    .app_password
                    .as_deref()
                    .ok_or_else(|| anyhow!("no Gmail credentials (connect Google or set GMAIL_APP_PASSWORD)"))?;
                client
                    .login(&self.address, password)
                    .await
                    .map_err(|(e, _)| anyhow!("Gmail IMAP login failed (check the app password): {e}"))?
            }
        };

        // Locate special-use folders; their names are localised.
        let names: Vec<_> = session.list(Some(""), Some("*")).await?.try_collect().await?;
        let mut folders =
            Folders { all: "[Gmail]/All Mail".into(), trash: "[Gmail]/Trash".into(), spam: "[Gmail]/Spam".into() };
        for n in &names {
            for attr in n.attributes() {
                let a = format!("{attr:?}");
                if a.contains("All") {
                    folders.all = n.name().to_string();
                } else if a.contains("Trash") {
                    folders.trash = n.name().to_string();
                } else if a.contains("Junk") {
                    folders.spam = n.name().to_string();
                }
            }
        }
        tracing::info!("connected to Gmail IMAP as {} ({folders:?})", self.address);
        Ok((session, folders))
    }

    /// A Google access token when OAuth is connected; falls back to the app password if refreshing fails.
    async fn oauth_token(&self) -> Option<String> {
        let (google, store) = self.oauth.as_ref()?;
        if !Google::is_connected(store) {
            return None;
        }
        match google.access_token(store).await {
            Ok(token) => Some(token),
            Err(e) if self.app_password.is_some() => {
                tracing::warn!("Google token refresh failed, using the app password: {e:#}");
                None
            }
            Err(e) => {
                tracing::error!("Google token refresh failed: {e:#}");
                None
            }
        }
    }

    /// Watch All Mail over a dedicated IMAP IDLE connection and call `on_change` whenever Gmail reports
    /// something (new mail, flags or labels changed elsewhere, messages removed). Runs forever.
    pub async fn watch(&self, on_change: impl Fn()) {
        const IDLE_FOR: Duration = Duration::from_secs(9 * 60);
        const RECONNECT_AFTER: Duration = Duration::from_secs(45 * 60);
        let mut backoff = Duration::from_secs(5);
        loop {
            let result: Result<()> = async {
                let (mut session, folders) = self.connect().await?;
                session.select(&folders.all).await?;
                tracing::info!("watching Gmail for changes (IMAP IDLE)");
                let started = std::time::Instant::now();
                backoff = Duration::from_secs(5);
                // reconnect periodically so OAuth logins always use a fresh token
                while started.elapsed() < RECONNECT_AFTER {
                    let mut idle = session.idle();
                    idle.init().await?;
                    let (wait, stop) = idle.wait_with_timeout(IDLE_FOR);
                    // Gmail's keepalives reset the library's timeout, so bound the wait ourselves too
                    let outcome = tokio::time::timeout(IDLE_FOR + Duration::from_secs(30), wait).await;
                    drop(stop);
                    session = idle.done().await?;
                    match outcome {
                        Ok(Ok(async_imap::extensions::idle::IdleResponse::NewData(_))) => {
                            tracing::debug!("Gmail reported a change");
                            on_change()
                        }
                        Ok(Err(e)) => return Err(e.into()),
                        _ => {} // timed out: re-issue IDLE
                    }
                }
                session.logout().await.ok();
                Ok(())
            }
            .await;
            if let Err(e) = result {
                tracing::warn!("Gmail IDLE connection dropped, retrying in {}s: {e:#}", backoff.as_secs());
                tokio::time::sleep(backoff).await;
                backoff = (backoff * 2).min(Duration::from_secs(300));
            }
        }
    }

    /// Drop the IMAP connection so the next operation re-authenticates (e.g. after connecting Google).
    pub async fn reconnect(&self) {
        *self.session.lock().await = None;
    }

    pub async fn check_login(&self) -> Result<()> {
        imap!(self, |s, _f| {
            s.noop().await?;
            Ok(())
        })
    }

    /// Bring the local store in line with Gmail for the configured time window.
    pub async fn sync(&self, store: &Store, to: &Recipient<'_>) -> Result<usize> {
        let _one_at_a_time = self.sync_lock.lock().await;
        let started = std::time::Instant::now();
        let since = (chrono::Utc::now() - chrono::Duration::days(self.sync_days)).format("%d-%b-%Y").to_string();

        // 1. metadata for every message in the window, per folder
        let (listing, checkpoint) = imap!(self, |s, folders| {
            let mut out: Vec<(String, u32, GmailMeta)> = Vec::new();
            let mut checkpoint = None;
            for kind in [FOLDER_ALL, FOLDER_TRASH, FOLDER_SPAM] {
                if kind == FOLDER_ALL {
                    checkpoint = Some(Checkpoint::of(&s.select_condstore(folders.name(kind)).await?));
                } else {
                    s.select(folders.name(kind)).await?;
                }
                let mut uids: Vec<u32> = s.uid_search(format!("SINCE {since}")).await?.into_iter().collect();
                uids.sort_unstable();
                for chunk in uids.chunks(500) {
                    let fetches: Vec<Fetch> = s
                        .uid_fetch(uid_set(chunk), "(UID X-GM-MSGID X-GM-THRID X-GM-LABELS FLAGS INTERNALDATE)")
                        .await?
                        .try_collect()
                        .await?;
                    out.extend(fetches.iter().filter_map(|f| Some((kind.to_string(), f.uid?, meta_of(f, kind)?))));
                }
            }
            Ok((out, checkpoint))
        })?;

        // 2. reconcile state of known messages, collect new ones (Gmail drafts are not mail yet)
        let listing: Vec<_> =
            listing.into_iter().filter(|(_, _, m)| !m.labels.iter().any(|l| l == "\\Draft")).collect();
        let mut keep = HashSet::new();
        let mut missing: HashMap<String, Vec<(u32, GmailMeta)>> = HashMap::new();
        for (kind, uid, meta) in listing {
            let msgid = meta.msgid.to_string();
            keep.insert(msgid.clone());
            if store.has_email(&msgid)? {
                store.update_email_state(&msgid, &kind, &meta.labels, meta.seen)?;
            } else {
                missing.entry(kind).or_default().push((uid, meta));
            }
        }
        for kind in [FOLDER_ALL, FOLDER_TRASH, FOLDER_SPAM] {
            store.delete_emails_not_in(kind, &keep)?;
        }
        self.ensure_labels(store, &missing)?;

        // 3. download, encrypt and store new messages
        let mut imported = 0;
        for (kind, items) in missing {
            imported += self.import_new(store, to, &kind, items).await?;
        }
        if let Some(cp) = checkpoint {
            cp.save(store)?;
        }
        if imported > 0 {
            tracing::info!("imported {imported} new messages from Gmail ({:.1}s)", started.elapsed().as_secs_f32());
        } else {
            tracing::debug!("sync finished in {:.1}s", started.elapsed().as_secs_f32());
        }
        Ok(imported)
    }

    /// Incremental sync after Gmail reports a change: only All Mail messages newer than the last checkpoint,
    /// plus flag/label changes since it (CONDSTORE). Falls back to a full sync when there's no usable
    /// checkpoint. Deletions and Trash/Spam moves are picked up by the periodic full sync.
    pub async fn quick_sync(&self, store: &Store, to: &Recipient<'_>) -> Result<usize> {
        let Some(previous) = Checkpoint::load(store)? else { return self.sync(store, to).await };
        let guard = self.sync_lock.lock().await;
        let started = std::time::Instant::now();
        let result = imap!(self, |s, folders| {
            let current = Checkpoint::of(&s.select_condstore(&folders.all).await?);
            if current.validity != previous.validity {
                return Ok(None);
            }
            const META: &str = "UID X-GM-MSGID X-GM-THRID X-GM-LABELS FLAGS INTERNALDATE";
            let new: Vec<Fetch> =
                s.uid_fetch(format!("{}:*", previous.last_uid + 1), format!("({META})")).await?.try_collect().await?;
            let changed: Vec<Fetch> = match previous.modseq {
                Some(ms) => s.uid_fetch("1:*", format!("({META}) (CHANGEDSINCE {ms})")).await?.try_collect().await?,
                None => Vec::new(),
            };
            let collect = |fetches: &[Fetch]| -> Vec<(u32, GmailMeta)> {
                fetches.iter().filter_map(|f| Some((f.uid?, meta_of(f, FOLDER_ALL)?))).collect()
            };
            Ok(Some((collect(&new), collect(&changed), current)))
        });
        let Some((new, changed, current)) = result? else {
            drop(guard);
            tracing::info!("Gmail All Mail was reset; running a full sync");
            return self.sync(store, to).await;
        };
        let mut missing = Vec::new();
        for (uid, meta) in new.into_iter().chain(changed) {
            if meta.labels.iter().any(|l| l == "\\Draft") {
                continue;
            }
            let msgid = meta.msgid.to_string();
            if store.has_email(&msgid)? {
                store.update_email_state(&msgid, FOLDER_ALL, &meta.labels, meta.seen)?;
            } else if uid > previous.last_uid {
                missing.push((uid, meta));
            }
        }
        let map = HashMap::from([(FOLDER_ALL.to_string(), missing)]);
        self.ensure_labels(store, &map)?;
        let missing = map.into_values().next().unwrap_or_default();
        let imported = self.import_new(store, to, FOLDER_ALL, missing).await?;
        current.save(store)?;
        tracing::debug!("quick sync: {imported} new in {:.1}s", started.elapsed().as_secs_f32());
        Ok(imported)
    }

    /// Download, encrypt and store new messages of one folder, newest first.
    async fn import_new(
        &self,
        store: &Store,
        to: &Recipient<'_>,
        kind: &str,
        mut items: Vec<(u32, GmailMeta)>,
    ) -> Result<usize> {
        let mut imported = 0;
        items.sort_by_key(|(_, m)| std::cmp::Reverse(m.internal_date_ms));
        for chunk in items.chunks(25) {
            let uids: Vec<u32> = chunk.iter().map(|(u, _)| *u).collect();
            let bodies: HashMap<u32, Vec<u8>> = imap!(self, |s, folders| {
                s.select(folders.name(kind)).await?;
                let fetches: Vec<Fetch> = s.uid_fetch(uid_set(&uids), "(UID BODY.PEEK[])").await?.try_collect().await?;
                Ok(fetches.iter().filter_map(|f| Some((f.uid?, f.body()?.to_vec()))).collect())
            })?;
            for (uid, meta) in chunk {
                let Some(raw) = bodies.get(uid) else { continue };
                match mail::import(raw, meta, to) {
                    Ok(row) => {
                        store.insert_email(&row)?;
                        imported += 1;
                    }
                    Err(e) => tracing::warn!("skipping Gmail message {}: {e:#}", meta.msgid),
                }
            }
        }
        Ok(imported)
    }

    fn ensure_labels(&self, store: &Store, new: &HashMap<String, Vec<(u32, GmailMeta)>>) -> Result<()> {
        let known: HashSet<String> = store.labels()?.into_iter().map(|l| l.gmail_name).collect();
        let names: HashSet<&String> =
            new.values().flatten().flat_map(|(_, m)| &m.labels).filter(|l| !l.starts_with('\\')).collect();
        for name in names.into_iter().filter(|n| !known.contains(*n)) {
            store.upsert_label(&Label {
                label_id: label_id_for(name),
                name: name.clone(),
                color: "blue".into(),
                variant: "PLAIN".into(),
                gmail_name: name.clone(),
            })?;
        }
        Ok(())
    }

    /// Fetch one raw message by Gmail message id from the given folder kind.
    pub async fn fetch_raw(&self, folder: &str, msgid: &str) -> Result<Vec<u8>> {
        imap!(self, |s, folders| {
            s.select(folders.name(folder)).await?;
            let uids: Vec<u32> = s.uid_search(format!("X-GM-MSGID {msgid}")).await?.into_iter().collect();
            let uid = *uids.first().ok_or_else(|| anyhow!("message no longer in Gmail"))?;
            let fetches: Vec<Fetch> = s.uid_fetch(uid.to_string(), "(UID BODY.PEEK[])").await?.try_collect().await?;
            fetches.first().and_then(|f| f.body()).map(<[u8]>::to_vec).ok_or_else(|| anyhow!("empty message body"))
        })
    }

    /// Apply an action to messages, given as (folder kind, Gmail msgid) pairs.
    pub async fn apply(&self, messages: &[(String, String)], action: Action<'_>) -> Result<()> {
        let mut by_folder: HashMap<&str, Vec<&str>> = HashMap::new();
        for (folder, msgid) in messages {
            by_folder.entry(folder.as_str()).or_default().push(msgid.as_str());
        }
        imap!(self, |s, folders| {
            for (kind, msgids) in &by_folder {
                s.select(folders.name(kind)).await?;
                let mut uids = Vec::new();
                for msgid in msgids {
                    uids.extend(s.uid_search(format!("X-GM-MSGID {msgid}")).await?);
                }
                if uids.is_empty() {
                    continue;
                }
                let set = uid_set(&uids);
                match &action {
                    Action::Seen(seen) => {
                        let op = if *seen { "+FLAGS.SILENT (\\Seen)" } else { "-FLAGS.SILENT (\\Seen)" };
                        s.uid_store(&set, op).await?.try_collect::<Vec<_>>().await?;
                    }
                    Action::AddLabels(labels) | Action::RemoveLabels(labels) => {
                        if *kind != FOLDER_ALL {
                            continue; // labels only apply to messages outside Trash/Spam
                        }
                        let sign = if matches!(action, Action::AddLabels(_)) { '+' } else { '-' };
                        let list = labels.iter().map(|l| if l.starts_with('\\') { l.clone() } else { quote(l) });
                        let op = format!("{sign}X-GM-LABELS.SILENT ({})", list.collect::<Vec<_>>().join(" "));
                        s.uid_store(&set, op).await?.try_collect::<Vec<_>>().await?;
                    }
                    Action::MoveTo(target) => {
                        let target = if *target == "INBOX" { "INBOX" } else { folders.name(target) };
                        if folders.name(kind) != target {
                            s.uid_mv(&set, target).await?;
                        }
                    }
                    Action::DeleteForever => {
                        if *kind != FOLDER_ALL {
                            s.uid_store(&set, "+FLAGS.SILENT (\\Deleted)").await?.try_collect::<Vec<_>>().await?;
                            s.uid_expunge(&set).await?.try_collect::<Vec<_>>().await?;
                        } else {
                            // Gmail: deleting from All Mail requires moving to Trash first
                            s.uid_mv(&set, &folders.trash).await?;
                        }
                    }
                }
            }
            Ok(())
        })
    }

    /// Gmail labels are IMAP mailboxes.
    pub async fn create_label(&self, name: &str) -> Result<()> {
        imap!(self, |s, _f| { Ok(s.create(name).await?) })
    }

    pub async fn rename_label(&self, from: &str, to: &str) -> Result<()> {
        imap!(self, |s, _f| { Ok(s.rename(from, to).await?) })
    }

    pub async fn delete_label(&self, name: &str) -> Result<()> {
        imap!(self, |s, _f| { Ok(s.delete(name).await?) })
    }

    /// Find the Gmail thread id of a message by its Message-ID header (used right after sending).
    pub async fn thread_of_message_id(&self, message_id: &str) -> Result<Option<String>> {
        let needle = message_id.trim_matches(|c| c == '<' || c == '>').to_string();
        imap!(self, |s, folders| {
            s.select(&folders.all).await?;
            let query = quote(&format!("rfc822msgid:{needle}"));
            let uids: Vec<u32> = s.uid_search(format!("X-GM-RAW {query}")).await?.into_iter().collect();
            let Some(uid) = uids.first() else { return Ok(None) };
            let fetches: Vec<Fetch> = s.uid_fetch(uid.to_string(), "(UID X-GM-THRID)").await?.try_collect().await?;
            Ok(fetches.first().and_then(|f| f.gmail_thr_id()).map(|t| format!("{t:x}")))
        })
    }

    pub async fn send(&self, message: lettre::Message) -> Result<()> {
        // port 587 + STARTTLS: many hosts (including this one) block outbound 465/25
        let (secret, mechanism) = match self.oauth_token().await {
            Some(token) => (token, Mechanism::Xoauth2),
            None => (
                self.app_password.clone().ok_or_else(|| anyhow!("no Gmail credentials for sending"))?,
                Mechanism::Plain,
            ),
        };
        let transport = AsyncSmtpTransport::<Tokio1Executor>::starttls_relay("smtp.gmail.com")?
            .credentials(Credentials::new(self.address.clone(), secret))
            .authentication(vec![mechanism])
            .timeout(Some(Duration::from_secs(60)))
            .build();
        let response = transport.send(message).await.context("Gmail SMTP send failed")?;
        if !response.is_positive() {
            bail!("Gmail SMTP rejected the message: {:?}", response.message().collect::<Vec<_>>());
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn unescapes_imap_labels() {
        assert_eq!(super::unescape("\\\\Inbox"), "\\Inbox");
        assert_eq!(super::unescape(r#"Say \"hi\""#), r#"Say "hi""#);
        assert_eq!(super::unescape("Plain"), "Plain");
    }
}

pub fn label_id_for(gmail_name: &str) -> String {
    use sha2::{Digest, Sha256};
    format!("gl{}", &hex::encode(Sha256::digest(gmail_name.as_bytes()))[..16])
}

fn unescape(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    let mut chars = s.chars();
    while let Some(c) = chars.next() {
        out.push(if c == '\\' { chars.next().unwrap_or(c) } else { c });
    }
    out
}

fn meta_of(f: &Fetch, kind: &str) -> Option<GmailMeta> {
    Some(GmailMeta {
        msgid: *f.gmail_msg_id()?,
        thrid: *f.gmail_thr_id()?,
        // labels arrive still IMAP-quoted-string escaped (e.g. `\\Inbox`)
        labels: f.gmail_labels().map(|l| l.iter().map(|s| unescape(s)).collect()).unwrap_or_default(),
        seen: f.flags().any(|fl| matches!(fl, async_imap::types::Flag::Seen)),
        folder: kind.to_string(),
        internal_date_ms: f.internal_date().map(|d| d.timestamp_millis()).unwrap_or_else(crate::store::now_ms),
    })
}
