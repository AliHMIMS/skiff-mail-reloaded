//! mymail-server: a Rust backend that lets the Skiff Mail web client read and send Gmail.
//!
//! Usage:
//!   mymail-server serve                 run the API (reads config from the environment / .env)
//!   mymail-server create-user <email>   create or reset the login account (prompts for a password)
//!   mymail-server check-gmail           verify the Gmail IMAP credentials
//!   mymail-server import-eml <file>     import a local .eml (testing aid)

mod account;
mod api;
mod crypto;
mod events;
mod filters;
mod gmail;
mod google;
mod gql;
mod mail;
mod proxy;
mod srp;
mod store;

use std::{path::PathBuf, sync::Arc, time::Duration};

use anyhow::{Context, Result, bail};
use async_graphql::{BatchRequest, BatchResponse, dynamic::Schema};
use async_graphql_axum::{GraphQLBatchRequest, GraphQLResponse};
use axum::{
    Router,
    extract::{DefaultBodyLimit, Path, Query, State},
    http::{HeaderMap, StatusCode, header},
    response::{IntoResponse, Redirect, Response},
    routing::{get, post},
};

use crate::api::App;
use crate::gql::{CodedError, RequestData};

struct Config {
    listen: String,
    data_dir: PathBuf,
    public_url: String,
    gmail_address: Option<String>,
    gmail_app_password: Option<String>,
    sync_days: i64,
    display_name: String,
    google_client: Option<(String, String)>,
    /// Gmail push via Pub/Sub: topic name and the secret token expected on the push endpoint.
    pubsub_topic: Option<String>,
    push_token: Option<String>,
}

/// Load KEY=VALUE lines from `.env` next to the binary's working directory (real env vars win).
fn load_dotenv() {
    let Ok(text) = std::fs::read_to_string(".env") else { return };
    for line in text.lines().map(str::trim).filter(|l| !l.is_empty() && !l.starts_with('#')) {
        if let Some((k, v)) = line.split_once('=') {
            let (k, v) = (k.trim(), v.trim().trim_matches('"'));
            if std::env::var_os(k).is_none() {
                // SAFETY: called at startup before any threads are spawned.
                unsafe { std::env::set_var(k, v) };
            }
        }
    }
}

impl Config {
    fn from_env() -> Self {
        let var = |k: &str| std::env::var(k).ok().filter(|v| !v.is_empty());
        Self {
            listen: var("LISTEN").unwrap_or_else(|| "127.0.0.1:4201".into()),
            data_dir: var("DATA_DIR").map(PathBuf::from).unwrap_or_else(|| "data".into()),
            public_url: var("PUBLIC_URL").unwrap_or_else(|| "http://localhost:4201".into()),
            gmail_address: var("GMAIL_ADDRESS"),
            gmail_app_password: var("GMAIL_APP_PASSWORD"),
            sync_days: var("SYNC_DAYS").and_then(|d| d.parse().ok()).unwrap_or(90),
            display_name: var("DISPLAY_NAME").unwrap_or_default(),
            google_client: var("GOOGLE_CLIENT_ID").zip(var("GOOGLE_CLIENT_SECRET")),
            pubsub_topic: var("GMAIL_PUBSUB_TOPIC"),
            push_token: var("GMAIL_PUSH_TOKEN"),
        }
    }

    fn open_app(&self) -> Result<App> {
        std::fs::create_dir_all(&self.data_dir)?;
        let store = Arc::new(store::Store::open(&self.data_dir.join("mymail.db"))?);
        let google = match &self.google_client {
            Some((id, secret)) => Some(Arc::new(google::Google::new(id.clone(), secret.clone(), &self.public_url)?)),
            None => None,
        };
        let gmail = match &self.gmail_address {
            Some(a) if self.gmail_app_password.is_some() || google.is_some() => Some(gmail::Gmail::new(
                a.to_lowercase(),
                self.gmail_app_password.clone(),
                self.sync_days,
                google.clone().map(|g| (g, store.clone())),
            )),
            _ => None,
        };
        App::new(store, gmail, google, self.public_url.clone(), self.display_name.clone(), self.data_dir.clone())
    }
}

fn session_token(headers: &HeaderMap) -> Option<String> {
    headers
        .get_all(header::COOKIE)
        .iter()
        .filter_map(|v| v.to_str().ok())
        .flat_map(|v| v.split(';'))
        .filter_map(|kv| kv.trim().split_once('='))
        .find(|(k, _)| *k == api::SESSION_COOKIE)
        .map(|(_, v)| v.to_string())
        .filter(|v| !v.is_empty())
}

#[derive(Clone)]
struct Http {
    app: Arc<App>,
    schema: Schema,
    images: Arc<proxy::ImageProxy>,
    push_token: Option<Arc<str>>,
}

async fn graphql(State(http): State<Http>, headers: HeaderMap, req: GraphQLBatchRequest) -> Response {
    let data = RequestData { session_token: session_token(&headers), ..Default::default() };
    let res = match req.into_inner().data(data.clone()) {
        BatchRequest::Single(r) => BatchResponse::Single(http.schema.execute(r).await),
        BatchRequest::Batch(rs) => {
            let mut out = Vec::with_capacity(rs.len());
            for r in rs {
                out.push(http.schema.execute(r).await);
            }
            BatchResponse::Batch(out)
        }
    };
    let mut response = GraphQLResponse::from(res).into_response();
    for cookie in data.set_cookies.lock().unwrap().iter() {
        if let Ok(v) = cookie.parse() {
            response.headers_mut().append(header::SET_COOKIE, v);
        }
    }
    response
}

/// Plain-text download responses. Never 403: the client treats 403 as a Cloudflare challenge.
fn text_response(result: Result<String>) -> Response {
    match result {
        Ok(body) => {
            ([(header::CONTENT_TYPE, "text/plain; charset=utf-8"), (header::CACHE_CONTROL, "private, no-store")], body)
                .into_response()
        }
        Err(e) => {
            let status = match e.downcast_ref::<CodedError>().map(|c| c.code) {
                Some("NOT_AUTHORIZED") => StatusCode::UNAUTHORIZED,
                Some("NOT_FOUND") => StatusCode::NOT_FOUND,
                _ => {
                    tracing::warn!("download failed: {e:#}");
                    StatusCode::BAD_GATEWAY
                }
            };
            (status, e.to_string()).into_response()
        }
    }
}

async fn attachment(State(http): State<Http>, headers: HeaderMap, Path(id): Path<String>) -> Response {
    text_response(api::attachment_download(&http.app, session_token(&headers).as_deref(), &id).await)
}

async fn raw_mime(State(http): State<Http>, headers: HeaderMap, Path(id): Path<String>) -> Response {
    text_response(api::raw_mime_download(&http.app, session_token(&headers).as_deref(), &id).await)
}

async fn image_proxy(
    State(http): State<Http>,
    headers: HeaderMap,
    Query(params): Query<std::collections::HashMap<String, String>>,
) -> Response {
    if http.app.session_user(session_token(&headers).as_deref()).is_err() {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    let Some(url) = params.get("url") else { return StatusCode::BAD_REQUEST.into_response() };
    match http.images.fetch(url).await {
        Ok((content_type, body)) => (
            [
                (header::CONTENT_TYPE, content_type),
                (header::CACHE_CONTROL, "private, max-age=86400".to_string()),
                (header::X_CONTENT_TYPE_OPTIONS, "nosniff".to_string()),
                (header::CONTENT_SECURITY_POLICY, "default-src 'none'; style-src 'unsafe-inline'; sandbox".to_string()),
            ],
            body,
        )
            .into_response(),
        Err(e) => {
            tracing::debug!("image proxy: {url}: {e:#}");
            StatusCode::NOT_FOUND.into_response()
        }
    }
}

/// Start the one-time Google consent flow (must be logged in to the app).
async fn oauth_start(State(http): State<Http>, headers: HeaderMap) -> Response {
    let app = &http.app;
    let Ok((_, user)) = app.session_user(session_token(&headers).as_deref()) else {
        return oauth_page(StatusCode::UNAUTHORIZED, "Log in to the mail app first, then open this link again.");
    };
    let (Some(google), Some(gm)) = (&app.google, &app.gmail) else {
        return oauth_page(StatusCode::BAD_REQUEST, "Google OAuth isn't configured on the server.");
    };
    Redirect::to(&google.authorize_url(&user.user_id, &gm.address)).into_response()
}

async fn oauth_callback(
    State(http): State<Http>,
    headers: HeaderMap,
    Query(params): Query<std::collections::HashMap<String, String>>,
) -> Response {
    let app = &http.app;
    if let Some(err) = params.get("error") {
        return oauth_page(StatusCode::BAD_REQUEST, &format!("Google didn't grant access ({err})."));
    }
    let Ok((_, user)) = app.session_user(session_token(&headers).as_deref()) else {
        return oauth_page(StatusCode::UNAUTHORIZED, "Your mail session expired. Log in and start again.");
    };
    let (Some(google), Some(gm)) = (&app.google, &app.gmail) else {
        return oauth_page(StatusCode::BAD_REQUEST, "Google OAuth isn't configured on the server.");
    };
    let (state, code) =
        (params.get("state").cloned().unwrap_or_default(), params.get("code").cloned().unwrap_or_default());
    match google.complete(&app.store, &user.user_id, &state, &code, &gm.address).await {
        Ok(()) => {
            gm.reconnect().await; // switch IMAP to OAuth
            oauth_page(StatusCode::OK, "Google account connected. Filters and auto-reply now sync with Gmail.")
        }
        Err(e) => oauth_page(StatusCode::BAD_REQUEST, &format!("Couldn't connect Google: {e:#}")),
    }
}

async fn oauth_status(State(http): State<Http>) -> Response {
    let connected = google::Google::is_connected(&http.app.store);
    axum::Json(serde_json::json!({ "configured": http.app.google.is_some(), "connected": connected })).into_response()
}

fn oauth_page(status: StatusCode, message: &str) -> Response {
    let body = format!(
        "<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'>\
         <title>Google connection</title><body style='font-family:system-ui;max-width:32rem;margin:4rem auto;padding:0 1rem'>\
         <p>{}</p><p><a href='/mail/inbox'>Back to mail</a></p>",
        crate::mail::escape_html(message)
    );
    (status, [(header::CONTENT_TYPE, "text/html; charset=utf-8")], body).into_response()
}

async fn events_ws(State(http): State<Http>, headers: HeaderMap, ws: axum::extract::ws::WebSocketUpgrade) -> Response {
    let token = session_token(&headers);
    events::upgrade(http.app.clone(), headers, token, ws).await
}

/// Pub/Sub push endpoint: Gmail reports a mailbox change; run a quick sync right away.
/// Always answers quickly (Pub/Sub retries anything that isn't a 2xx).
async fn gmail_push(
    State(http): State<Http>,
    Query(params): Query<std::collections::HashMap<String, String>>,
) -> StatusCode {
    let given = params.get("token").map(String::as_bytes).unwrap_or_default();
    let expected = http.push_token.as_deref().map(str::as_bytes).unwrap_or_default();
    // constant-time comparison so the token can't be guessed byte by byte
    let matches = !expected.is_empty()
        && given.len() == expected.len()
        && given.iter().zip(expected).fold(0u8, |acc, (a, b)| acc | (a ^ b)) == 0;
    if !matches {
        return StatusCode::UNAUTHORIZED;
    }
    tracing::debug!("Gmail push notification");
    http.app.sync_now.notify_one();
    StatusCode::NO_CONTENT
}

/// Keep Gmail's push watch registered (it expires after 7 days; renew daily).
async fn watch_loop(app: Arc<App>, topic: String) {
    loop {
        let wait = match &app.google {
            Some(google) if google::Google::is_connected(&app.store) => match google.watch(&app.store, &topic).await {
                Ok(expiry) => {
                    let expires =
                        chrono::DateTime::from_timestamp_millis(expiry).map(|d| d.to_rfc3339()).unwrap_or_default();
                    tracing::info!("Gmail push notifications active (watch renewed, expires {expires})");
                    Duration::from_secs(24 * 3600)
                }
                Err(e) => {
                    tracing::warn!("Gmail push watch failed, retrying in 1h: {e:#}");
                    Duration::from_secs(3600)
                }
            },
            // not connected yet: check again soon
            _ => Duration::from_secs(300),
        };
        tokio::time::sleep(wait).await;
    }
}

/// Keep the local store in sync with Gmail. Changes reported over IMAP IDLE (and the app's own actions)
/// trigger a quick incremental sync; a full sync runs every few minutes to catch deletions and Trash/Spam
/// moves, and is the fallback whenever the quick path can't be used.
async fn sync_loop(app: Arc<App>) {
    const FULL_SYNC_EVERY: Duration = Duration::from_secs(180);
    let Some(gm) = app.gmail.as_ref() else {
        tracing::warn!("GMAIL_ADDRESS (and an app password or Google OAuth) not set: mail sync is disabled");
        return;
    };
    let mut backoff = Duration::from_secs(60);
    let mut full = true;
    let mut last_full = std::time::Instant::now();
    loop {
        let wait = match app.store.first_user() {
            Ok(Some(user)) => {
                let to = app.recipient(&user);
                let result = if full { gm.sync(&app.store, &to).await } else { gm.quick_sync(&app.store, &to).await };
                match result {
                    Ok(_) => {
                        backoff = Duration::from_secs(60);
                        if full {
                            last_full = std::time::Instant::now();
                        }
                        // quick syncs don't postpone the next full one
                        FULL_SYNC_EVERY.saturating_sub(last_full.elapsed())
                    }
                    Err(e) => {
                        tracing::error!("Gmail sync failed: {e:#}");
                        backoff = (backoff * 2).min(Duration::from_secs(900));
                        backoff
                    }
                }
            }
            Ok(None) => {
                tracing::info!("no account yet; run `mymail-server create-user <gmail address>`");
                Duration::from_secs(60)
            }
            Err(e) => {
                tracing::error!("store error: {e:#}");
                Duration::from_secs(60)
            }
        };
        full = tokio::select! {
            _ = tokio::time::sleep(wait) => true,
            // a short pause turns a burst of changes into one sync
            _ = app.sync_now.notified() => {
                tokio::time::sleep(Duration::from_millis(500)).await;
                false
            }
        };
    }
}

async fn serve(config: Config) -> Result<()> {
    let app = Arc::new(config.open_app()?);
    let schema = gql::build(include_str!("../schema.graphql"), api::handlers(), app.clone())?;
    tokio::spawn(sync_loop(app.clone()));
    // Gmail push (Pub/Sub) is the fastest change signal; IMAP IDLE below stays on as a backup
    if let Some(topic) = config.pubsub_topic.clone() {
        tokio::spawn(watch_loop(app.clone(), topic));
    }
    // Gmail pushes changes over IMAP IDLE; each one triggers an immediate sync
    let watcher = app.clone();
    tokio::spawn(async move {
        if let Some(gm) = watcher.gmail.as_ref() {
            gm.watch(|| watcher.sync_now.notify_one()).await;
        }
    });
    let router = Router::new()
        .route("/graphql", post(graphql))
        .route("/graphql/attachment/{id}", get(attachment))
        .route("/graphql/raw/{id}", get(raw_mime))
        .route("/graphql/health", get(|| async { "ok" }))
        .route("/image_proxy/", get(image_proxy))
        .route("/graphql/oauth/start", get(oauth_start))
        .route("/graphql/oauth/callback", get(oauth_callback))
        .route("/graphql/oauth/status", get(oauth_status))
        .route("/graphql/gmail/push", post(gmail_push))
        .route("/graphql/events", get(events_ws))
        .layer(DefaultBodyLimit::max(60 * 1024 * 1024))
        .with_state(Http {
            app,
            schema,
            images: Arc::new(proxy::ImageProxy::new()?),
            push_token: config.push_token.as_deref().map(Arc::from),
        });
    let listener =
        tokio::net::TcpListener::bind(&config.listen).await.with_context(|| format!("binding {}", config.listen))?;
    tracing::info!("listening on {} (public URL {})", config.listen, config.public_url);
    axum::serve(listener, router).await?;
    Ok(())
}

fn create_user(config: &Config, username: &str) -> Result<()> {
    let username = username.trim().to_lowercase();
    if !username.contains('@') {
        bail!("use your full Gmail address as the username");
    }
    let password = match std::env::var("MYMAIL_PASSWORD") {
        Ok(p) if !p.is_empty() => p,
        _ => {
            let p = rpassword::prompt_password("New password: ")?;
            if p != rpassword::prompt_password("Repeat password: ")? {
                bail!("passwords don't match");
            }
            p
        }
    };
    if password.len() < 10 {
        bail!("use at least 10 characters");
    }
    let app = config.open_app()?;
    let existing = app.store.user_by_name(&username)?;
    let acct = account::create(&password)?;
    app.store.insert_user(&store::User {
        user_id: existing.as_ref().map(|u| u.user_id.clone()).unwrap_or_else(|| uuid::Uuid::new_v4().to_string()),
        username: username.clone(),
        salt: acct.salt,
        verifier: acct.verifier,
        encrypted_user_data: acct.encrypted_user_data,
        encrypted_document_data: None,
        public_key: acct.public_key,
        public_key_signature: acct.public_key_signature,
        signing_public_key: acct.signing_public_key,
        root_org_id: existing
            .as_ref()
            .map(|u| u.root_org_id.clone())
            .unwrap_or_else(|| uuid::Uuid::new_v4().to_string()),
        display_name: String::new(),
    })?;
    if existing.is_some() {
        // new keys: previously synced mail was encrypted to the old key, so re-import it
        let n = app.store.all_emails()?.len();
        for e in app.store.all_emails()? {
            app.store.delete_email(&e.gm_msgid)?;
        }
        println!("Reset account {username} (cleared {n} cached messages; they will re-sync).");
    } else {
        println!("Created account {username}.");
    }
    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    load_dotenv();
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| "mymail_server=info,warn".into()),
        )
        .init();
    let config = Config::from_env();
    let args: Vec<String> = std::env::args().skip(1).collect();
    match args.first().map(String::as_str) {
        None | Some("serve") => serve(config).await,
        Some("create-user") => create_user(&config, args.get(1).context("usage: create-user <gmail address>")?),
        Some("check-gmail") => {
            let app = config.open_app()?;
            let gm = app.gmail.as_ref().context("set GMAIL_ADDRESS and GMAIL_APP_PASSWORD first")?;
            gm.check_login().await?;
            println!("Gmail IMAP login OK for {}", gm.address);
            Ok(())
        }
        Some("import-eml") => {
            // Testing aid: import a local .eml through the same encryption path Gmail messages take.
            let path = args.get(1).context("usage: import-eml <file.eml> [label...]")?;
            let app = config.open_app()?;
            let user = app.store.first_user()?.context("create a user first")?;
            let id = u64::from_str_radix(&hex::encode(&crypto::random_bytes::<6>()), 16)?;
            let mut labels: Vec<String> = args[2..].to_vec();
            if labels.is_empty() {
                labels.push("\\Inbox".into());
            }
            let meta = mail::GmailMeta {
                msgid: id,
                thrid: id,
                labels,
                seen: false,
                folder: gmail::FOLDER_ALL.into(),
                internal_date_ms: store::now_ms(),
            };
            let row = mail::import(&std::fs::read(path)?, &meta, &app.recipient(&user))?;
            app.store.insert_email(&row)?;
            println!("imported {} into thread {}", row.id, row.thread_id);
            Ok(())
        }
        Some(other) => {
            bail!("unknown command {other}; use serve | create-user <email> | check-gmail | import-eml <file>")
        }
    }
}

#[cfg(test)]
mod tests {
    use std::sync::Arc;

    #[tokio::test]
    async fn schema_builds_and_defaults_resolve() {
        let mut handlers = crate::gql::Handlers::<()>::default();
        handlers.on("Query.decryptionServicePublicKey", |_| async { Ok(serde_json::json!({"key": "abc"})) });
        let schema = crate::gql::build(include_str!("../schema.graphql"), handlers, Arc::new(())).unwrap();
        let res = schema
            .execute(
                "{ decryptionServicePublicKey currentUser { userID publicData { displayName } emailAliases } \
                 mailbox(request: {label: \"INBOX\"}) { threads { threadID } pageInfo { hasNextPage } } }",
            )
            .await;
        assert!(res.errors.is_empty(), "{:?}", res.errors);
        let data = res.data.into_json().unwrap();
        assert_eq!(data["decryptionServicePublicKey"]["key"], "abc");
        assert!(data["mailbox"].is_null(), "nullable root fields without a handler are null");
    }

    #[tokio::test]
    async fn null_objects_inside_lists_stay_null() {
        // the client treats a null entry as "external recipient"; an empty User would break sending
        let mut handlers = crate::gql::Handlers::<()>::default();
        handlers.on("Query.usersFromEmailAliasWithCatchall", |_| async { Ok(serde_json::json!([null])) });
        let schema = crate::gql::build(include_str!("../schema.graphql"), handlers, Arc::new(())).unwrap();
        let res =
            schema.execute("{ usersFromEmailAliasWithCatchall(emailAliases: [\"a@b.c\"]) { userID publicKey } }").await;
        assert!(res.errors.is_empty(), "{:?}", res.errors);
        assert_eq!(res.data.into_json().unwrap()["usersFromEmailAliasWithCatchall"], serde_json::json!([null]));
    }
}
