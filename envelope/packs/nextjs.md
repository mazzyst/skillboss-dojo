# nextjs pack

Issued: not yet
Rhythm: one issue a month, on the first Monday
Stack: `nextjs`

This pack is a draft. Its first issue is dated the day it holds its first
boss. The free quarter starts on that date.

## Bosses

None yet. The first ones come from the maker's own session with the boss
skill.

## Rules

One line per trap: where to look in a Next.js app. A location, never a
value.

- `secrets` — THE LEAK: every variable named `NEXT_PUBLIC_`, and every file the browser loads.
- `env-hygiene` — THE COMMITTED KEY: `.gitignore` at the root, and any tracked `.env` file besides `.env.example`.
- `auth-routes` — THE OPEN MIC: every route handler under `app/api/`, and every server action that writes data.
- `db-exposure` — THE OPEN DOOR: a database client imported by a client component, and the key it is given.
- `backups` — THE LOST WEEKEND: the database provider's backup settings, and the day you last tried a restore.
- `health` — THE SILENT CRASH: the route that says the app is up, and who calls it.
- `error-monitoring` — THE 3AM PAGE: `instrumentation.ts`, the error boundaries in `app/`, and where their errors go.
- `rate-limiting` — THE FLOOD: `middleware.ts`, and every route handler anyone can call without signing in.
- `dependencies` — THE ROTTEN PLANK: `package.json`, its lockfile, and the day they were last updated.
- `cost-guardrails` — THE BILL SHOCK: the hosting and model providers' spending settings; the free recipe `provider-hard-limit` walks you there.

## Log

A missed month is written as missed, never back-dated.

| Issue | What changed |
|---|---|
| not yet | draft: the rules, no boss |
