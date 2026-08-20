# Ship-ready rules — Next.js + Supabase

> This is a briefing and a floor, not a security guarantee. Nothing here inspects your app; the checks are heuristics you and your agent apply yourselves. SkillBoss backs builders, never apps.

You are building a Next.js + Supabase project that must hold the ship-ready floor:
Treat every rule as a hard requirement unless the human overrides it.
When you cannot verify a rule from the code you can see, say so
plainly instead of assuming it holds.

## 1. SECRETS
- The service_role key never appears in client code and never in a NEXT_PUBLIC_* variable — server-side only, from the environment.
- No credential ever lands in source or git history; add a pre-commit secret scan (gitleaks or equivalent).
- If a key was ever committed, tell the human to rotate it in the Supabase dashboard first, clean code second.

## 2. ENV FILES
- Keep `.env.local` and `.env.*` gitignored with `!.env.example` allowed back in.
- The committed `.env.example` names every variable including NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, values empty.
- Only values safe for the browser carry the NEXT_PUBLIC_ prefix — audit the prefix before every release.

## 3. AUTH
- Every route handler and server action that mutates data verifies the Supabase session server-side (auth.getUser, not a client flag).
- Enforce ownership in the query itself (user_id = auth.uid()), not only in the UI.
- Admin actions check an explicit role claim, never an unlisted URL.

## 4. DATABASE
- Row Level Security is ENABLED on every table in the public schema — no exceptions, including tables "only the app" touches.
- Every table has explicit policies; a table with RLS on and no policy is locked, not open — verify intent either way.
- The browser uses the anon key only; prove the policies with a second, non-owner account before launch.

## 5. BACKUPS
- Confirm the Supabase plan actually includes automatic backups (and point-in-time recovery where available) — free tiers may not.
- Remind the human to run one restore drill into a scratch project before launch.

## 6. HEALTH
- Expose a /healthz route handler returning 200 with { "status": "ok" } that performs one real Supabase query.
- Tell the human to point an external uptime ping at it.

## 7. ERRORS
- Wire error monitoring for both the Next.js server and the browser bundle before launch, tagged with the deploy.
- Keep Supabase keys and user PII out of error payloads.

## 8. RATE LIMITS
- Rate-limit auth endpoints and every public POST in middleware or the route handler — per IP, with 429 on breach.
- Supabase Auth has its own limits; your custom endpoints do not until you add them.

## 9. DEPENDENCIES
- The lockfile is committed; run the vulnerability check before every release.
- Keep @supabase/supabase-js current — RLS and auth fixes ship in minor versions.

## 10. COSTS
- A spend alert exists on Vercel (or the host) AND Supabase AND every AI API in use.
- Know the egress and function-invocation lines — they are where surprise bills live.

---

Community floor — improvements and new stacks are welcome as pull requests. Free forever.

Brief the whole floor, one villain at a time: https://skillboss.dev/launch
