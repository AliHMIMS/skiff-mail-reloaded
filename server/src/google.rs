//! Google OAuth (one-time "Connect Google" consent, refresh-token storage) and the Gmail API calls the
//! IMAP protocol can't do: filters and the vacation responder. The same tokens also authenticate
//! IMAP/SMTP via XOAUTH2, so the app password becomes optional.

use std::{
    collections::HashMap,
    sync::Mutex,
    time::{Duration, Instant},
};

use anyhow::{Context, Result, anyhow, bail};
use reqwest::{Client, Method, Url};
use serde::{Deserialize, Serialize};
use serde_json::Value as Json;

use crate::store::Store;

const AUTH_URL: &str = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL: &str = "https://oauth2.googleapis.com/token";
const GMAIL_API: &str = "https://gmail.googleapis.com/gmail/v1/users/me";
/// Full mail access (IMAP/SMTP via XOAUTH2) + basic settings (filters, vacation responder).
const SCOPES: &str = "https://mail.google.com/ https://www.googleapis.com/auth/gmail.settings.basic";
const REFRESH_TOKEN_KEY: &str = "google_refresh_token";
const STATE_TTL: Duration = Duration::from_secs(600);

pub struct Google {
    client_id: String,
    client_secret: String,
    redirect_uri: String,
    http: Client,
    /// OAuth `state` values issued by /oauth/start, keyed to the app user who started the flow.
    states: Mutex<HashMap<String, (String, Instant)>>,
    access_token: tokio::sync::Mutex<Option<(String, Instant)>>,
}

#[derive(Deserialize)]
struct TokenResponse {
    access_token: String,
    expires_in: u64,
    refresh_token: Option<String>,
}

/// Gmail filter (users.settings.filters).
#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GmailFilter {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<String>,
    #[serde(default)]
    pub criteria: FilterCriteria,
    #[serde(default)]
    pub action: FilterAction,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FilterCriteria {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub from: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub to: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub subject: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub query: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub negated_query: Option<String>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FilterAction {
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub add_label_ids: Vec<String>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub remove_label_ids: Vec<String>,
}

/// Gmail vacation responder (users.settings.vacation).
#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Vacation {
    #[serde(default)]
    pub enable_auto_reply: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub response_subject: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub response_body_plain_text: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub response_body_html: Option<String>,
    #[serde(default)]
    pub restrict_to_contacts: bool,
    #[serde(default)]
    pub restrict_to_domain: bool,
}

impl Google {
    pub fn new(client_id: String, client_secret: String, public_url: &str) -> Result<Self> {
        let http = Client::builder()
            .tls_backend_preconfigured(crate::gmail::tls_client_config()?)
            .timeout(Duration::from_secs(30))
            .build()?;
        Ok(Self {
            client_id,
            client_secret,
            redirect_uri: format!("{public_url}/graphql/oauth/callback"),
            http,
            states: Default::default(),
            access_token: Default::default(),
        })
    }

    pub fn is_connected(store: &Store) -> bool {
        store.kv_get(REFRESH_TOKEN_KEY).ok().flatten().is_some()
    }

    /// URL of Google's consent page for `user_id`, who must be logged in to the app.
    pub fn authorize_url(&self, user_id: &str, login_hint: &str) -> String {
        let state = hex::encode(crate::crypto::random_bytes::<16>());
        let mut states = self.states.lock().unwrap_or_else(|p| p.into_inner());
        states.retain(|_, (_, t)| t.elapsed() < STATE_TTL);
        states.insert(state.clone(), (user_id.to_string(), Instant::now()));
        let mut url = Url::parse(AUTH_URL).expect("valid constant");
        url.query_pairs_mut()
            .append_pair("client_id", &self.client_id)
            .append_pair("redirect_uri", &self.redirect_uri)
            .append_pair("response_type", "code")
            .append_pair("scope", SCOPES)
            .append_pair("access_type", "offline")
            .append_pair("prompt", "consent")
            .append_pair("login_hint", login_hint)
            .append_pair("state", &state);
        url.into()
    }

    /// Finish the consent flow: exchange the code, check the Google account matches, keep the refresh token.
    pub async fn complete(
        &self,
        store: &Store,
        user_id: &str,
        state: &str,
        code: &str,
        expected_email: &str,
    ) -> Result<()> {
        let issued_to = self.states.lock().unwrap_or_else(|p| p.into_inner()).remove(state);
        match issued_to {
            Some((uid, t)) if uid == user_id && t.elapsed() < STATE_TTL => {}
            _ => bail!("this sign-in link expired; start again from /graphql/oauth/start"),
        }
        let tokens: TokenResponse = self
            .token_request(&[
                ("grant_type", "authorization_code"),
                ("code", code),
                ("redirect_uri", &self.redirect_uri),
            ])
            .await?;
        let refresh = tokens.refresh_token.ok_or_else(|| anyhow!("Google returned no refresh token"))?;
        *self.access_token.lock().await =
            Some((tokens.access_token, Instant::now() + Duration::from_secs(tokens.expires_in)));
        let profile = self.api(Method::GET, "/profile", None).await?;
        let email = profile["emailAddress"].as_str().unwrap_or_default();
        if !email.eq_ignore_ascii_case(expected_email) {
            *self.access_token.lock().await = None;
            bail!("you signed in to Google as {email}, but this server is set up for {expected_email}");
        }
        store.kv_set(REFRESH_TOKEN_KEY, &refresh)?;
        tracing::info!("Google account {email} connected");
        Ok(())
    }

    async fn token_request(&self, params: &[(&str, &str)]) -> Result<TokenResponse> {
        let mut form: Vec<(&str, &str)> = vec![("client_id", &self.client_id), ("client_secret", &self.client_secret)];
        form.extend_from_slice(params);
        let resp = self.http.post(TOKEN_URL).form(&form).send().await?;
        let status = resp.status();
        let body: Json = resp.json().await.unwrap_or_default();
        if !status.is_success() {
            bail!(
                "Google token request failed ({status}): {}",
                body["error_description"].as_str().or(body["error"].as_str()).unwrap_or("unknown error")
            );
        }
        Ok(serde_json::from_value(body)?)
    }

    /// A valid access token (refreshed when needed), or an error if Google was never connected.
    pub async fn access_token(&self, store: &Store) -> Result<String> {
        let mut cached = self.access_token.lock().await;
        if let Some((token, expires)) = cached.as_ref() {
            if *expires > Instant::now() + Duration::from_secs(60) {
                return Ok(token.clone());
            }
        }
        let refresh = store.kv_get(REFRESH_TOKEN_KEY)?.ok_or_else(|| anyhow!("Google is not connected"))?;
        let tokens = self.token_request(&[("grant_type", "refresh_token"), ("refresh_token", &refresh)]).await?;
        *cached = Some((tokens.access_token.clone(), Instant::now() + Duration::from_secs(tokens.expires_in)));
        Ok(tokens.access_token)
    }

    async fn api(&self, method: Method, path: &str, body: Option<Json>) -> Result<Json> {
        let token = self.access_token.lock().await.as_ref().map(|(t, _)| t.clone()).context("no access token")?;
        let mut req = self.http.request(method, format!("{GMAIL_API}{path}")).bearer_auth(token);
        if let Some(body) = body {
            req = req.json(&body);
        }
        let resp = req.send().await?;
        let status = resp.status();
        let text = resp.text().await?;
        if !status.is_success() {
            let msg = serde_json::from_str::<Json>(&text)
                .ok()
                .and_then(|j| j["error"]["message"].as_str().map(str::to_string));
            bail!("Gmail API {path} failed ({status}): {}", msg.unwrap_or(text));
        }
        Ok(if text.trim().is_empty() { Json::Null } else { serde_json::from_str(&text)? })
    }

    /// Authenticated Gmail API call (refreshes the token first if needed).
    async fn call(&self, store: &Store, method: Method, path: &str, body: Option<Json>) -> Result<Json> {
        self.access_token(store).await?;
        self.api(method, path, body).await
    }

    /// Gmail label name -> label id (user and system labels).
    pub async fn label_ids(&self, store: &Store) -> Result<HashMap<String, String>> {
        let res = self.call(store, Method::GET, "/labels", None).await?;
        Ok(res["labels"]
            .as_array()
            .into_iter()
            .flatten()
            .filter_map(|l| Some((l["name"].as_str()?.to_string(), l["id"].as_str()?.to_string())))
            .collect())
    }

    pub async fn filters(&self, store: &Store) -> Result<Vec<GmailFilter>> {
        let res = self.call(store, Method::GET, "/settings/filters", None).await?;
        Ok(serde_json::from_value(res["filter"].clone()).unwrap_or_default())
    }

    pub async fn create_filter(&self, store: &Store, filter: &GmailFilter) -> Result<GmailFilter> {
        let res = self.call(store, Method::POST, "/settings/filters", Some(serde_json::to_value(filter)?)).await?;
        Ok(serde_json::from_value(res)?)
    }

    pub async fn delete_filter(&self, store: &Store, id: &str) -> Result<()> {
        self.call(store, Method::DELETE, &format!("/settings/filters/{id}"), None).await?;
        Ok(())
    }

    /// Ask Gmail to publish mailbox changes to a Pub/Sub topic. Returns the watch expiry (epoch ms);
    /// Gmail requires renewing at least every 7 days.
    pub async fn watch(&self, store: &Store, topic: &str) -> Result<i64> {
        let res = self.call(store, Method::POST, "/watch", Some(serde_json::json!({ "topicName": topic }))).await?;
        Ok(res["expiration"].as_str().and_then(|e| e.parse().ok()).unwrap_or_default())
    }

    pub async fn vacation(&self, store: &Store) -> Result<Vacation> {
        Ok(serde_json::from_value(self.call(store, Method::GET, "/settings/vacation", None).await?)?)
    }

    pub async fn set_vacation(&self, store: &Store, vacation: &Vacation) -> Result<()> {
        self.call(store, Method::PUT, "/settings/vacation", Some(serde_json::to_value(vacation)?)).await?;
        Ok(())
    }
}
