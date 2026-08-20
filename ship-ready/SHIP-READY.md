# SHIP-READY.md — the SkillBoss launch floor

> This is a briefing and a floor, not a security guarantee. Nothing here inspects your app; the checks are heuristics you and your agent apply yourselves. SkillBoss backs builders, never apps.

## How to use this file

Paste this whole file into your coding agent (Claude Code, Cursor,
Copilot — whichever builds with you) and say:

> Apply this floor to my project. Change what is missing, list what you changed, and tell me plainly what you could not verify.

Your agent does the work. This file carries the judgment: ten systems
that decide whether your launch survives its first week. Each one says
why it matters, what the floor is, and where to train the reflex.

---

## 1. SECRETS — holds back THE LEAK

A key your agent hardcoded is compromised the moment it lands in git — deleting the line later does not un-expose it, history keeps every version. In one October 2025 scan of 5,600 vibe-coded apps, more than 400 were serving live secrets in production.

```
RULES FOR MY AGENT — secrets
- No credential, API key, or token ever appears in source code,
  client-side config, or git history.
- Every secret loads from an environment variable, server-side only.
- Install a pre-commit secret scan (gitleaks or equivalent) so the
  next hardcoded key is blocked before it enters history.
- If a secret was EVER committed: rotate it at its source first,
  clean the code second. The delete is not the fix.
```

Train the reflex: https://skillboss.dev/demo/secrets

## 2. ENV FILES — holds back THE COMMITTED KEY

The .env file is where secrets belong — and one of the most-committed files in agent-built repos. One ignore rule and one committed template prevent the entire class.

```
.gitignore — make sure these lines exist:
  .env
  .env.*
  !.env.example

.env.example — commit THIS instead (names only, values empty):
  DATABASE_URL=
  JWT_SECRET=
  # …every variable the app needs, so a fresh clone knows what to set.
```

Train the reflex: https://skillboss.dev/demo/env-hygiene

## 3. AUTH — holds back THE OPEN MIC

Agents scaffold the happy path: routes that write data but never ask who is calling. Any mutating route without a server-side identity check makes the public internet your admin panel.

```
RULES FOR MY AGENT — auth
- List every route that creates, updates, or deletes data.
- Each one verifies identity SERVER-SIDE (session or token) — a check
  that only lives in the UI is not a check.
- Ownership: a user can only mutate rows that belong to them.
- Admin actions sit behind an explicit role check, never behind an
  unlisted URL.
```

Train the reflex: https://skillboss.dev/demo/auth-routes

## 4. DATABASE — holds back THE OPEN DOOR

Client-side database queries without row-level security let anyone read anyone. A published 2026 sample of 1,645 Lovable-built apps found roughly seven in ten with RLS disabled.

```
CHECK — database
- Row-Level Security is ON for every table the browser can reach
  (Supabase and friends), with policies per table, not hopes.
- The database port is not reachable from the public internet.
- The client ships the restricted key — never the service/admin key.
- Prove the policies with a second, non-owner account before launch.
```

Train the reflex: https://skillboss.dev/demo/db-exposure

## 5. BACKUPS — holds back THE LOST WEEKEND

A backup that has never been restored is a hope, not a backup. The first restore must not happen on the night everything depends on it.

```
RUNBOOK — backups
- Automatic backups ON, daily at minimum; you know where they live.
- Retention floor: 7 daily + 4 weekly.
- RESTORE DRILL, once, now: restore one backup into a scratch
  environment, time it, and write down what surprised you.
```

Train the reflex: https://skillboss.dev/demo/backups

## 6. HEALTH — holds back THE SILENT CRASH

Without a health endpoint and an uptime ping, your users are your monitoring: the app that went down at 02:00 gets discovered at 09:00, by a customer.

```
CONTRACT — health
- GET /healthz returns 200 with { "status": "ok" } (ideally plus the
  running commit).
- An external uptime service pings it every minute and alerts you.
- The endpoint checks a real dependency (database reachable), not
  just that the process exists.
```

Train the reflex: https://skillboss.dev/demo/health

## 7. ERRORS — holds back THE 3AM PAGE

Errors that only exist in a browser console belong to nobody. Wire an error tracker before shipping, or the first crash report you get is a one-star review.

```
CHECK — errors
- An error-monitoring service is wired, server AND client, before
  launch, tagged with the release/commit.
- Unhandled exceptions and rejected promises are captured.
- Alerts reach a channel you actually read.
- No secrets and no user PII inside error payloads.
```

Train the reflex: https://skillboss.dev/demo/error-monitoring

## 8. RATE LIMITS — holds back THE FLOOD

Login, signup, and every public POST are free compute for whoever finds them. Without limits, one script can lock accounts, fill your database, or run your bill up overnight.

```
RULES FOR MY AGENT — rate limits
- Auth endpoints (login, signup, reset): strict per-IP limits with
  backoff.
- Every public POST: a sane per-IP ceiling per minute.
- Over the limit → 429, logged; sustained bursts raise an alert.
```

Train the reflex: https://skillboss.dev/demo/rate-limiting

## 9. DEPENDENCIES — holds back THE ROTTEN PLANK

The agent freezes whatever version was current the day it scaffolded. A lockfile nobody ever checks is a museum of known vulnerabilities.

```
CHECK — dependencies
- A lockfile is committed and installs are reproducible.
- One command runs the vulnerability check; it runs before every
  release.
- Critical advisories block the ship; the rest get dated TODOs, not
  silence.
```

Train the reflex: https://skillboss.dev/demo/dependencies

## 10. COSTS — holds back THE BILL SHOCK

Serverless bills fail open: with no limit, the incident IS the invoice. A spend alert costs nothing and turns a four-digit surprise into a warning.

```
CHECK — costs
- A billing alert exists on EVERY paid service: hosting, database,
  AI APIs.
- Hard caps where the platform offers them; alerts at 50% and 90%
  where it does not.
- You can say, today, what a normal month costs.
```

Train the reflex: https://skillboss.dev/demo/cost-guardrails

---

The floor is free, forever. When the ten systems are in place, run them
again the week you ship — the room is at https://skillboss.dev/launch
