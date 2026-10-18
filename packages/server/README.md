# mymail-server

Rust backend for the Skiff Mail web client. It reads and sends mail through a Gmail or Google Workspace account.

```
browser (Skiff client) ──https/wss──> reverse proxy ──> mymail-server ──IMAP/SMTP/Gmail API──> Gmail
                                                              ▲
                                                Gmail push (Cloud Pub/Sub)
```

## How it works

- **GraphQL**: loads the client's own schema (`schema.graphql`). The mail operations are implemented in `src/api.rs`. Every other field returns a valid empty value, so unused Skiff features don't break the UI.
- **Encryption**: the client expects end-to-end-encrypted mail. Incoming mail is encrypted to the user's key in Skiff's wire format (`src/crypto.rs`, tested against vectors from the client's JS libraries). Outgoing mail is decrypted on the server and relayed over SMTP. The server, like Google, sees plaintext.
- **Login**: SRP. The password never leaves the browser. Accounts are created from the CLI.
- **Sessions**: the web client gets an HttpOnly cookie. Apps (`packages/mobile`) read the same session token from the login response's `jwt` field and send it as `Authorization: Bearer <token>` on every request, download, image proxy call and WebSocket.
- **Sync**: Gmail push (Pub/Sub) or IMAP IDLE triggers an incremental sync (new UIDs plus CONDSTORE changes, about 2 s). A full reconcile runs every 3 minutes. Bodies are stored encrypted in SQLite. Attachments and raw sources are fetched from Gmail on demand.
- **Live updates**: every change is broadcast over a WebSocket (`/graphql/events`) to all open clients. Cookie connections must come from `PUBLIC_URL`'s origin; bearer connections (apps) carry their own credential and skip that check.
- **Discovery**: `GET /graphql/info` (no login) returns `{server, version, publicUrl, features}`. The mobile app calls it to check that an address is a mymail-server before signing in.
- **Actions** map to Gmail:

  | App | Gmail |
  |---|---|
  | read/unread | `\Seen` |
  | archive | remove `\Inbox` |
  | trash/spam | move to Bin/Spam |
  | labels | Gmail labels |
  | filters | Gmail filters |
  | auto-reply | vacation responder |
- **Image proxy**: remote images in emails load through `/image_proxy/`. It serves logged-in users only, fetches public hosts only, and returns images only.

## Setup

```bash
cargo build --release && mkdir -p bin && cp target/release/mymail-server bin/
cp .env.example .env                         # fill in, chmod 600
./bin/mymail-server create-user you@example.com   # prompts for a password
./bin/mymail-server check-gmail
./bin/mymail-server serve
```

Proxy `/graphql*` (WebSocket included) and `/image_proxy/*` to `LISTEN`. Serve `packages/web/dist` at `/mail/`, with `Cache-Control: no-cache` on everything except `/mail/assets/*` (hashed, cache forever), so clients pick up new builds.

### Google OAuth (filters, auto-reply, XOAUTH2)

1. In Google Cloud, enable the Gmail API.
2. Create an OAuth client (Web). Use an Internal consent screen for Workspace accounts. The redirect URI is `https://<host>/graphql/oauth/callback`.
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
4. Log in to the app, then open `https://<host>/graphql/oauth/start`.

### Gmail push

1. Enable Cloud Pub/Sub and create a topic.
2. Give `gmail-api-push@system.gserviceaccount.com` the **Pub/Sub Publisher** role on it.
3. Add a push subscription to `https://<host>/graphql/gmail/push?token=<GMAIL_PUSH_TOKEN>`.
4. Set `GMAIL_PUBSUB_TOPIC`.

The watch is renewed daily. IMAP IDLE remains as a fallback.

## Commands

| Command | |
|---|---|
| `serve` | Run the API |
| `create-user <email>` | Create the login, or reset its password. New keys; mail re-syncs. |
| `check-gmail` | Test Gmail credentials |
| `import-eml <file>` | Import a local `.eml` (testing) |

## Build

```bash
cargo test --release
cargo build --release
```

Keep `target/`: rebuilds take about 1 minute instead of 10.

Outbound SMTP uses port 587 (STARTTLS), because many hosts block 465 and 25.

`vendor/` has two crates with small patches, marked `mymail-server patch`:

- **async-imap**: an `X-GM-THRID` accessor.
- **async-graphql**: null objects inside lists in dynamic schemas.
