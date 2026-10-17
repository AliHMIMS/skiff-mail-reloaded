# Skiff Mail Reloaded

Self-hosted Skiff Mail for your Gmail. Based on the original [Skiff Mail](https://github.com/skiff-org/skiff-apps) web client. Skiff shut down in 2024 and never released its backend, so this repo adds one.

![skiff-mail-header](https://github.com/skiff-org/skiff-mail/assets/3527315/9b8b7ee9-9daa-4e4c-b6bc-9a869d574757)

## Welcome to Skiff Mail Reloaded!

The Skiff Mail client runs on your own server, backed by a Gmail or Google Workspace account. New mail arrives in seconds. Actions sync to Gmail and to every open client.

## How it works

The client is unchanged where possible. The server speaks the client's GraphQL API and encrypts mail to your key in Skiff's format. The browser decrypts it.

## What changed

### Not ported

| Feature                                           | Note                                               |
| ------------------------------------------------- | -------------------------------------------------- |
| Skiff accounts and signup                         | Logins are created with the server CLI             |
| Skiff-to-Skiff end-to-end encryption              | Mail goes through Gmail; the server sees plaintext |
| Aliases, quick aliases, custom domains, catch-all |                                                    |
| Scheduled send, undo send                         |                                                    |
| Mail import                                       | Gmail is the mailbox                               |
| Calendar, Pages, Drive                            | Mail only                                          |
| MFA, WebAuthn, wallet login                       |                                                    |
| In-app password change                            | `create-user` CLI                                  |
| Browser push notifications                        | Needed Skiff's push service                        |
| Billing and plans                                 | All limits lifted                                  |
| Mobile and desktop apps                           | Web only                                           |

### Added

| Feature                      | Note                                                     |
| ---------------------------- | -------------------------------------------------------- |
| Rust backend                 | The client's GraphQL API on Gmail: IMAP, SMTP, Gmail API |
| Gmail push                   | Cloud Pub/Sub; new mail on the server in ~3 s            |
| IMAP IDLE + incremental sync | CONDSTORE; fallback when push is down                    |
| Live updates                 | WebSocket; changes in one tab or device appear in all    |
| All Mail                     | Everything except Trash and Spam                         |
| Gmail filters                | The Skiff filter UI creates real Gmail filters           |
| Auto-reply                   | Gmail's vacation responder                               |
| Google OAuth                 | XOAUTH2 for IMAP and SMTP; app password optional         |
| Labels                       | Gmail labels as Skiff labels, both ways                  |
| Image proxy                  | Remote images in emails load through your server         |

### Optimized

Measured on a 2 vCPU / 4 GB server.

|                          | Original                                      | Reloaded                       |
| ------------------------ | --------------------------------------------- | ------------------------------ |
| Web build                | ~7 min (webpack 5, Babel, per-library builds) | ~15 s (Vite 8, Rolldown, Oxc)  |
| Build memory (peak)      | ~2.7 GB                                       | ~1.3 GB                        |
| Build output             | 48 MB                                         | 17 MB                          |
| Package manager          | Yarn 3 PnP                                    | pnpm 12                        |
| Linter                   | ESLint (airbnb-typescript)                    | oxlint, ~2.6 s for 1,400 files |
| Formatter                | Prettier                                      | oxfmt, ~0.7 s for 1,400 files  |
| Root dependencies        | 210                                           | 0                              |
| Web app dev dependencies | 119                                           | 38                             |
| Mailbox refresh          | Polling every 20 s                            | WebSocket push (60 s fallback) |
| Changes across clients   | Up to 20 s                                    | ~3 s                           |

## Getting started

1. Build and run the server: [server/README.md](server/README.md).
2. Build the web client: [skemail-web/README.md](skemail-web/README.md).
3. Put both behind HTTPS on one domain. The app is served at `/mail/`, and `/graphql*` and `/image_proxy/*` go to the server.

## License

[CC BY-NC-SA 4.0](LICENSE), same as the original Skiff apps.
