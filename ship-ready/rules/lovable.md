# Ship-ready rules — Lovable

> This is a briefing and a floor, not a security guarantee. Nothing here inspects your app; the checks are heuristics you and your agent apply yourselves. SkillBoss backs builders, never apps.

You are working on a Lovable-built project that must hold the ship-ready floor:
Treat every rule as a hard requirement unless the human overrides it.
When you cannot verify a rule from the code you can see, say so
plainly instead of assuming it holds.

## 1. SECRETS
- Secrets live in the platform secret store, never in generated source or client code.
- Ask the human to connect the project to GitHub early, then add a pre-commit secret scan (gitleaks or equivalent) there.
- If a key was ever generated into code, tell the human to rotate it at its source — the delete is not the fix.

## 2. ENV FILES
- Every configuration value the app needs is named in one place, values empty in the repo — a fresh export must know what to set.

## 3. AUTH
- Every generated mutation verifies the session server-side — generated UIs often check only in the component.
- Enforce ownership in the query (user id from the session), not in the page.

## 4. DATABASE
- Lovable projects ship on Supabase: Row Level Security must be ENABLED with explicit policies on every table the browser reaches — the historical default gap here is the single most exploited failure of this stack.
- Review every generated client-side query; anything reading another user’s rows without a policy is a leak, not a feature.
- Prove the policies with a second, non-owner account before sharing the app.

## 5. BACKUPS
- Confirm backups exist on the underlying database plan; remind the human to run one restore drill before launch.

## 6. HEALTH
- Add a /healthz endpoint (or a public status page) returning 200 with { "status": "ok" } and point an external uptime ping at it.

## 7. ERRORS
- Wire error monitoring before sharing the app publicly; generated apps fail silently in the browser by default.
- Keep keys and user PII out of error payloads.

## 8. RATE LIMITS
- Auth endpoints and every public POST get per-IP limits — generated scaffolds ship without any.

## 9. DEPENDENCIES
- Export the code to a git repository, commit the lockfile, and run the vulnerability check before every release.

## 10. COSTS
- A spend alert exists on the platform plan, the database, and every AI API the app calls.

---

Community floor — improvements and new stacks are welcome as pull requests. Free forever.

Brief the whole floor, one villain at a time: https://skillboss.dev/launch
