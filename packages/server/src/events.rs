//! Real-time updates over WebSocket (`/graphql/events`): every change to stored mail (Gmail push, sync, or
//! an action from any client) is broadcast to all of the user's open apps, which refresh just what changed.
//!
//! Server -> client messages (JSON):
//!   {"type":"changes","threadIDs":[...],"labels":bool,"drafts":bool}   batched every 250 ms
//!   {"type":"resync"}                                                     missed events; refresh everything

use std::{collections::BTreeSet, sync::Arc, time::Duration};

use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    http::{HeaderMap, StatusCode, header},
    response::{IntoResponse, Response},
};
use serde_json::json;
use tokio::sync::broadcast::error::RecvError;

use crate::api::App;
use crate::store::Change;

const BATCH: Duration = Duration::from_millis(250);
const PING_EVERY: Duration = Duration::from_secs(25);
const SESSION_CHECK_EVERY: Duration = Duration::from_secs(60);

/// How the socket's session token arrived.
pub enum Auth {
    /// The browser's cookie, which any site could make it send.
    Cookie(Option<String>),
    /// An explicit `Authorization` header (the mobile app), which other sites can't forge.
    Bearer(String),
}

/// Upgrade to a WebSocket for a logged-in user. Cookie logins must come from the app's own origin, so other
/// sites can't open a socket with the user's cookie; bearer logins carry their own proof.
pub async fn upgrade(app: Arc<App>, headers: HeaderMap, auth: Auth, ws: WebSocketUpgrade) -> Response {
    let token = match auth {
        Auth::Cookie(token) => {
            let origin = headers.get(header::ORIGIN).and_then(|o| o.to_str().ok()).unwrap_or_default();
            if origin != app.public_url {
                return StatusCode::FORBIDDEN.into_response();
            }
            token
        }
        Auth::Bearer(token) => Some(token),
    };
    if app.session_user(token.as_deref()).is_err() {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    ws.on_upgrade(move |socket| serve(app, token, socket))
}

async fn serve(app: Arc<App>, token: Option<String>, mut socket: WebSocket) {
    let mut changes = app.store.subscribe();
    let mut threads = BTreeSet::new();
    let (mut labels, mut drafts) = (false, false);
    let mut flush = tokio::time::interval(BATCH);
    let mut ping = tokio::time::interval(PING_EVERY);
    let mut session_check = tokio::time::interval(SESSION_CHECK_EVERY);
    loop {
        tokio::select! {
            change = changes.recv() => match change {
                Ok(Change::Thread(id)) => { threads.insert(id); }
                Ok(Change::Labels) => labels = true,
                Ok(Change::Drafts) => drafts = true,
                Err(RecvError::Lagged(_)) => {
                    threads.clear();
                    if send(&mut socket, json!({ "type": "resync" })).await.is_err() { return; }
                }
                Err(RecvError::Closed) => return,
            },
            _ = flush.tick() => {
                if threads.is_empty() && !labels && !drafts {
                    continue;
                }
                let msg = json!({ "type": "changes", "threadIDs": std::mem::take(&mut threads), "labels": labels, "drafts": drafts });
                (labels, drafts) = (false, false);
                if send(&mut socket, msg).await.is_err() { return; }
            }
            _ = ping.tick() => {
                if socket.send(Message::Ping(Default::default())).await.is_err() { return; }
            }
            _ = session_check.tick() => {
                // logging out (or the session expiring) ends the stream
                if app.session_user(token.as_deref()).is_err() {
                    let _ = socket.send(Message::Close(None)).await;
                    return;
                }
            }
            incoming = socket.recv() => match incoming {
                Some(Ok(Message::Close(_))) | None | Some(Err(_)) => return,
                _ => {} // pongs and anything else
            },
        }
    }
}

async fn send(socket: &mut WebSocket, msg: serde_json::Value) -> Result<(), axum::Error> {
    socket.send(Message::Text(msg.to_string().into())).await
}
