# Ship-ready rules — any stack

> This is a briefing and a floor, not a security guarantee. Nothing here inspects your app; the checks are heuristics you and your agent apply yourselves. SkillBoss backs builders, never apps.

You are building a project that must hold the ship-ready floor:
Treat every rule as a hard requirement unless the human overrides it.
When you cannot verify a rule from the code you can see, say so
plainly instead of assuming it holds.

## 1. SECRETS
- Never write a credential, API key, or token into source code, client-side config, or a commit.
- Load every secret from an environment variable, server-side only.
- Add a pre-commit secret scan (gitleaks or equivalent) if none exists.
- If a secret was ever committed, tell the human to rotate it at its source — the delete is not the fix.

## 2. ENV FILES
- Keep `.env` and `.env.*` in .gitignore, with `!.env.example` allowed back in.
- Maintain a committed `.env.example` naming every variable, values empty.

## 3. AUTH
- Every route that creates, updates, or deletes data verifies identity server-side — a UI-only check is not a check.
- Enforce ownership: a user mutates only rows that belong to them.
- Admin actions sit behind an explicit role check, never an unlisted URL.

## 4. DATABASE
- The database port is never reachable from the public internet.
- The client ships a restricted key — never the service or admin key.
- If the browser queries the database directly, row-level access rules exist per table and are proven with a second, non-owner account.

## 5. BACKUPS
- Automatic backups are on, daily at minimum, with 7 daily + 4 weekly retention.
- Remind the human to run one restore drill into a scratch environment before launch.

## 6. HEALTH
- Expose GET /healthz returning 200 with { "status": "ok" }, checking a real dependency.
- Tell the human to point an external uptime ping at it.

## 7. ERRORS
- Wire error monitoring on server and client before launch, tagged with the release.
- Capture unhandled exceptions and rejected promises; keep secrets and user PII out of payloads.

## 8. RATE LIMITS
- Auth endpoints get strict per-IP limits with backoff.
- Every public POST gets a sane per-IP ceiling; over the limit returns 429 and is logged.

## 9. DEPENDENCIES
- A lockfile is committed and installs are reproducible.
- Run the vulnerability check before every release; critical advisories block the ship.

## 10. COSTS
- A billing alert exists on every paid service — hosting, database, AI APIs.
- Prefer hard caps where the platform offers them; alerts at 50% and 90% where it does not.

---

Community floor — improvements and new stacks are welcome as pull requests. Free forever.

Brief the whole floor, one villain at a time: https://skillboss.dev/launch
