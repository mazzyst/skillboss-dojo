# Gate 20 — SECURITY BY DESIGN

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: the breaches that kill small projects are not exotic — leaked
keys, open databases, unguarded routes. Every one of them is cheaper to
prevent at this gate than to survive in production. Security is designed
in here, not audited in later.

## Guardrails

- **Secrets discipline.** Real values never enter the repository — not in
  code, not in committed env files, not in fixtures. Before the first
  push, the git history is scanned for credential-shaped strings. Train
  the reflex: https://skillboss.dev/demo/secrets and
  https://skillboss.dev/demo/env-hygiene
- **Deny by default on every mutating route.** Authentication and
  authorization are checked on every route that writes, and the default
  answer is no. Train it: https://skillboss.dev/demo/auth-routes
- **All external input is validated at the boundary.** Types, ranges, and
  shapes checked where the data enters; database access goes through
  parameterized queries or an ORM — string-built queries are refused.
- **Least privilege everywhere.** The app's database user can do what the
  app needs and nothing more; API keys are scoped to their one job;
  nothing runs as an administrator out of convenience.
- **The database is never publicly reachable.** It answers to the app,
  not to the internet. Train it: https://skillboss.dev/demo/db-exposure
- **Dependency floor.** The lockfile is committed, an audit runs in CI,
  and no unmaintained package sits on an auth or crypto path (its villain,
  THE ROTTEN PLANK, is faced at Gate 50, where CI runs the audit).
- **Personal data minimum (profile-gated).** If the project handles
  personal data: collect the minimum the mission needs, and plan deletion
  from day one — a data list and a deletion path, written down.

The general reference for the threat classes behind these floors is the
OWASP Top 10 at https://owasp.org — a standard, not a vendor.

## Villains at this gate

The house names the failures these boxes hold back — ten in all, one per
Ship Check system, each with a drill that is free and needs no signup.
Faced here one at a time; faced together at Gate 90.

- **THE LEAK** — a secret in code. Drill: https://skillboss.dev/demo/secrets
- **THE COMMITTED KEY** — an environment file in git. Drill: https://skillboss.dev/demo/env-hygiene
- **THE OPEN MIC** — a mutating route anyone can call. Drill: https://skillboss.dev/demo/auth-routes
- **THE OPEN DOOR** — a database reachable from the internet. Drill: https://skillboss.dev/demo/db-exposure

## Coach Play

Ask:

1. Where would a leaked credential in this project hurt most, and where
   do credentials currently live?
2. Which routes mutate state, and what stops a stranger from calling
   them?
3. What personal data does the mission actually need — field by field?

Then: set up the env discipline, scan the history, guard the mutating
routes, wire validation at the boundaries, scope the database user and
keys, and record the personal-data list if the profile requires it.

Refuse: any secret committed "temporarily"; any route shipped open "until
auth lands"; any query built by string concatenation.

Definition of done: every box below evidenced or n/a-with-reason per the
profile; evidence records location, never value.

## Evidence Checklist

- [ ] secrets-out-of-code — evidence: path of `.env.example`; the
      history-scan command and its clean result (location, never value)
- [ ] authz-deny-by-default — evidence: the guard or middleware path, and
      one mutating route's check; n/a-with-reason if the profile has no
      user accounts
- [ ] input-validated — evidence: the validation layer's path and one
      boundary example; the query mechanism named
- [ ] least-privilege — evidence: where the DB user's grants and key
      scopes are defined (location, never value)
- [ ] db-not-public — evidence: the config or network rule that closes
      the database to the internet
- [ ] dependency-floor — evidence: lockfile path; the audit command or CI
      step and its current result
- [ ] data-minimum — evidence: the personal-data list and deletion path
      in the journal; n/a-with-reason if the profile has none
