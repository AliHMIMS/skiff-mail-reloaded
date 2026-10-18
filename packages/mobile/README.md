# mobile

The Skiff Mail app for Android and iOS (React Native, Expo SDK 58). It isn't tied to one server: anyone installs it, enters their mymail-server's address, username and password, and their mail is there.

## Using it

1. Run mymail-server behind HTTPS ([packages/server](../server/README.md)). The app needs a server with `/graphql/info` and bearer sessions; older servers get "This server is too old for the app".
2. Open the app and enter the server address (`mail.example.com`, or the web app's URL; `/mail/…` is stripped), then the username and password from `create-user`.

The address must be HTTPS: release builds refuse plain HTTP, and the session token travels with every request.

## What it does

- Sign in with SRP, the same as the web client: the password never leaves the phone. It derives the key that unlocks the account's private keys, which are kept in the Android Keystore / iOS Keychain (`expo-secure-store`) with the session token.
- Mailboxes: Inbox, Sent, Archive, All Mail, Spam, Trash and Gmail labels, with unread counts, pull to refresh and paging.
- Threads: messages are decrypted on the phone. HTML is shown in a WebView under a CSP that blocks scripts, frames and every network load. Remote images stay hidden until you tap "Load images"; the app then fetches them through the server's image proxy and inlines them.
- Attachments: download, decrypt and open or share.
- Archive, trash, spam, move to inbox, delete forever, mark unread.
- Compose, reply, reply all, forward (plain text body; replies quote the original).
- Live updates over `/graphql/events`, reconnecting when the app returns to the foreground.

Not yet: push notifications, search, drafts, sending attachments, the rich-text editor, label editing.

## Development

From the repository root:

```bash
pnpm install
pnpm --filter mobile start        # Metro; open in Expo Go or a development build
pnpm --filter mobile test         # crypto shims against the reference libraries, URL handling
pnpm --filter mobile typecheck
pnpm --filter mobile bundle       # Android JS bundle into dist/, a quick check that everything resolves
```

Every native module the app uses ships in Expo Go, so a phone with Expo Go can run it without a native build.

### Building an APK

```bash
npx expo prebuild --platform android   # generates android/ (git-ignored; never edit it by hand)
cd android && ./gradlew assembleRelease
# android/app/build/outputs/apk/release/app-release.apk
```

On Windows, use `scripts/build-apk.ps1` instead: React Native's C++ builds fail once paths pass Windows' limit (CMake names object files after their full source path), and this repo's pnpm store paths do. The script:

- mirrors the source to a short folder (`E:\sm` by default) and installs it there with a flat (hoisted) node_modules;
- puts the app's own CMake build folder at `E:\sm-cxx` (`plugins/with-cmake-staging-dir.js`, active only when the script sets `MOBILE_CMAKE_STAGING_DIR`);
- builds and copies the APK to `packages/mobile/dist/skiff-mail.apk`.

```powershell
powershell -File packages/mobile/scripts/build-apk.ps1 -Architectures arm64-v8a
```

`react-native.config.js` keeps gesture-handler, Reanimated and Worklets out of the native build: expo-router depends on them, but nothing the app uses imports them. Remove an entry there before using one.

That APK is signed with the debug key. For releases, sign with your own keystore ([Expo: local production builds](https://docs.expo.dev/guides/local-app-production/)) or build with EAS.

## How the workspace libraries run on React Native

The app reuses `skiff-crypto`, `skiff-front-graphql`, `skiff-graphql` and `skiff-utils` from source, the same code the web client runs, so mail encrypts and decrypts identically. They were written for the browser, so:

- `metro.config.js` maps Node's `crypto` and `futoin-hkdf` to small shims on `@noble/hashes` (`src/shims`), and `argon2-browser` (WebAssembly, which Hermes lacks) to a pure-JS Argon2. `src/shims/shims.test.ts` checks each one byte for byte against the original library and against the server's SRP vectors.
- It also resolves React, React Native, Apollo and GraphQL from this package for every importer. pnpm gives the libraries web's React (19.3.1), and React Native needs exactly its own (19.3.0). `tsconfig.json` points TypeScript at the same Apollo copy.
- `src/polyfills.ts` (imported first by `index.ts`) installs `Buffer`, `process` and `crypto.getRandomValues` (`expo-crypto`) before tweetnacl picks its random source.
- `babel.config.js` lets TypeScript's transform remove `declare` class fields (in `skiff-graphql`) before Expo's Flow pass rejects them.
- The `@client` fields in the shared GraphQL documents (`decryptedSubject`, `decryptedHtml`, …) are computed by the type policies in `src/lib/apollo.ts`, ported from the web client's.

## Server contract

|                                                          |                                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `GET /graphql/info`                                      | Discovery: `{"server":"mymail-server","version","publicUrl","features":["bearer-auth","events"]}` |
| `POST /graphql`                                          | `loginSrp` step 2 returns the session token as `jwt`; afterwards `Authorization: Bearer <token>`  |
| `GET /graphql/events`                                    | WebSocket with the same header; bearer connections skip the browser Origin check                  |
| `GET /graphql/attachment/{id}`, `GET /image_proxy/?url=` | Same header                                                                                       |

Download links carry the server's `PUBLIC_URL`; the app rewrites them to the address it signed in with, so `PUBLIC_URL` doesn't have to match what the phone uses.
