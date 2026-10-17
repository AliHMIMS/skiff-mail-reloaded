# Skiff Mail Web App

React app built with [Vite](https://vite.dev). Workspace libraries in `../libs` are compiled from source.

## Dev Setup

Requires Node 22 and pnpm 12.

```bash
pnpm install
SKEMAIL_API_BASE_URL=https://mail.example.com pnpm build   # ~15 s, outputs dist
pnpm dev                                                    # http://localhost:4200/mail/inbox
```

`SKEMAIL_API_BASE_URL` points the app at a [mymail-server](../server) instance.

Lint, format and type-check from the repo root (`pnpm lint`, `pnpm format`, `pnpm typecheck`).
