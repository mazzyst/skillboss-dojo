---
name: skillboss-devops-check
description: Use when the user wants a pre-ship review of their repository's operational hygiene — secrets, env files, auth coverage, database exposure, backups, health checks, error monitoring, rate limiting, dependencies, and cost guardrails. Runs the Ship Check 10 against the current repo and produces an honest, four-state report. A heuristic review, not an audit.
---

# skillboss-devops-check — the Ship Check 10

Version 0.1 · from the [SkillBoss Dojo](https://github.com/mazzyst/skillboss-dojo) · CC BY-SA 4.0

You are running a pre-ship hygiene review. The agent does the looking; this
skill supplies the judgment. Ten checks, each mapping to a documented breach
class. This is not a scanner and must not behave like one: no new tools, no
dependencies — only the repo in front of you, your own search and read
capabilities, and your ecosystem's built-in commands.

## When to invoke

- The user is about to deploy, launch, or share an app.
- The user asks "is this safe to ship?", "review my repo", or installs this
  skill and asks to run it.
- After large agent-generated changes, before they go live.

## Ground rules (read before checking)

1. **Never guess.** Every check ends in exactly one of four states:
   - `PASS` — you found positive evidence the practice is in place.
   - `ATTENTION` — you found concrete evidence of the problem (quote it:
     file and line).
   - `CAN'T VERIFY` — the evidence isn't in the repo. Output the specific
     question the user must answer instead. **Never convert uncertainty
     into a warning.**
   - `N/A` — the check doesn't apply to this stack (say why in one line).
2. **A false alarm costs more than a miss.** If a finding depends on an
   assumption about the user's stack, ask; don't flag.
3. **Read the user's stack first.** Identify the language, framework,
   hosting hints (Dockerfiles, IaC, platform config files) before running
   the checks, and adapt the file patterns accordingly.
4. **Never send code, secrets, or findings anywhere.** The review stays in
   the conversation.

## The Ship Check 10

### 1. Are there secrets in your code — or your history?

**Look for:** hardcoded API keys, tokens, passwords, and connection strings
in source files (common shapes: `sk-`, `AKIA`, `ghp_`, `AIza`, long base64
or hex literals assigned to names containing `key`, `secret`, `token`,
`password`); the same in committed config (`config.json`, `settings.py`,
YAML); and in git history — check whether files like `.env` or key files
were *ever* committed (`git log --all --diff-filter=A -- '*.env' '*.pem'`),
because a secret deleted in a later commit is still in the history and must
be rotated, not just removed.
**Why:** hardcoded secrets are the #1 vibe-app breach class — 28.65M new
secrets hit public commits in 2025 (GitGuardian), and AI-assisted commits
leak at roughly double the baseline rate (3.2% vs 1.5%).
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/secrets -->

### 2. Is `.env` ignored — and is there a `.env.example`?

**Look for:** a `.gitignore` that actually covers every env file present
(`.env`, `.env.local`, `.env.production`, …) — test each real env file
against it, don't just read the pattern; a committed `.env.example` (or
equivalent template) listing variable *names* with placeholder values so
the next person — or the next agent — knows what to configure without
being handed the real values; and no real values inside the example file.
**Why:** 60%+ of vibe-coded apps tested in Q1 2026 exposed API keys or
database credentials — most of those leaks start as an env file that was
never ignored.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/env-hygiene -->

### 3. Does every mutating route check who's asking?

**Look for:** every route/handler that creates, updates, or deletes data
(POST/PUT/PATCH/DELETE, RPC mutations, server actions). For each, positive
evidence of an auth check — middleware, guard, decorator, session check, or
row-level security — *on that route*, not just somewhere in the app. List
any mutating route where you can't find one. Pay special attention to
"internal" or "admin" endpoints and to client-visible IDs used as the only
gate.
**Why:** a 1,072-app scan found 172 apps allowing unauthenticated data
deletion, and Base44's breach was an auth bypass via a public app ID — the
route existed, the check didn't.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/auth-routes -->

### 4. Can the public internet reach your database?

**Look for:** repo-side evidence only: database hosts or connection strings
in client-side code (anything bundled to the browser or mobile app);
IaC/firewall rules open to `0.0.0.0/0` on database ports; production
Docker/compose files publishing the DB port; database URLs with public
hostnames and no mention of network restriction. If the database is a
managed service and the network posture isn't in the repo, return
`CAN'T VERIFY` with this question: *"In your database dashboard, is public
network access disabled (or restricted to your app's addresses), and is
row-level security on if the client talks to the DB directly?"*
**Why:** Moltbook's production database was fully exposed three days after
launch — the breach class where one setting is the whole story.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/db-exposure -->

### 5. Do backups exist — and have you restored one, once?

**Look for:** backup configuration in the repo (IaC backup blocks, scheduled
dump jobs, platform config enabling point-in-time recovery) — that covers
"exist". "Restored once" is not verifiable from a repo: ask the user
directly — *"Have you ever actually restored a backup of this app's data,
even once, into a scratch environment?"* — and record their answer in the
report. `PASS` requires both: evidence backups run, and the user's yes.
**Why:** an untested backup is a hope, not a backup — the industry's
best-documented database-loss postmortems (GitLab 2017, public and
blameless) are stories of backup mechanisms that all failed silently at
restore time.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/backups -->

### 6. Would you know your app is down before a user tells you?

**Look for:** a health endpoint (`/health`, `/healthz`, `/api/health`, or
framework equivalent) that checks more than "process is up" — ideally it
touches the DB or critical dependency; plus evidence something *calls* it:
platform health-check config (Dockerfile `HEALTHCHECK`, compose, IaC,
platform settings files). An external uptime ping usually isn't in the
repo: if you find the endpoint but no caller, return `CAN'T VERIFY` with
*"Is any uptime monitor (even a free one) pinging your health endpoint?"*
**Why:** without a pulse, downtime is discovered by your users — the
cheapest check on this list to fix, and the one that buys back the most
sleep.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/health -->

### 7. Where do errors go when nobody's watching?

**Look for:** an error-monitoring integration wired into the app — an SDK
initialized in the entry point (with its DSN/key coming from env, not
hardcoded — cross-check with check 1), or platform-native error tracking
configured. `console.log` and unhandled-rejection silence are the
`ATTENTION` evidence here: an app whose only error channel is stdout on a
server nobody tails.
**Why:** unmonitored errors mean your users — or an attacker probing your
routes — know about failures before you do.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/error-monitoring -->

### 8. Can one script hammer your login all night?

**Look for:** rate limiting on authentication routes (login, signup,
password reset, token issuance) and on public unauthenticated POST
endpoints (contact forms, comment endpoints, anything that writes or sends
email/SMS/LLM calls): middleware, platform config, or gateway rules. Name
the specific unprotected routes if you find them; if rate limiting lives at
a proxy/CDN layer not represented in the repo, `CAN'T VERIFY` with *"Is
rate limiting configured at your proxy/CDN for the auth and public POST
routes?"*
**Why:** unthrottled auth is the credential-stuffing entry class, and an
unthrottled public POST that triggers paid work (email, LLM tokens) is a
bill someone else runs up for you.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/rate-limiting -->

### 9. Is your dependency tree pinned — and audited by its own tools?

**Look for:** a committed lockfile matching the manifest (`package-lock.json`
/ `yarn.lock` / `pnpm-lock.yaml`, `poetry.lock`, `Cargo.lock`, `go.sum`, …);
no floating wildcard versions (`*`, `latest`) in direct dependencies; then
run the ecosystem's **own** audit command if one exists (`npm audit`,
`pnpm audit`, `pip-audit` if already installed, `cargo audit` if already
installed — install nothing new) and report its summary counts verbatim.
Do not hunt CVEs yourself; that is a scanner's job and you'd do it badly.
**Why:** an unpinned tree means the app you tested is not the app you
deploy — the supply-chain breach class starts with "it resolved to a
different version in prod".
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/dependencies -->

### 10. Will you learn about a runaway bill from the invoice?

**Look for:** evidence of spend guardrails for every metered service the
repo uses (cloud provider, LLM APIs, email/SMS, serverless): budget alerts
in IaC, spend caps in platform config files, usage limits in API client
setup. These usually live in dashboards, not repos — expect `CAN'T VERIFY`
with the question list: *"For each of &lt;the metered services found in this
repo&gt;: is there a billing alert or hard cap set in its dashboard?"*
Finding the *absence* of any limit where the platform supports one in
config (e.g., an API client with no max-token/usage parameter) is
`ATTENTION` evidence.
**Why:** metered services fail open — without an alert, the first symptom
of a bug or an abuser is the invoice.
**Train it:** [skillboss.dev/demo](https://skillboss.dev/demo)<!-- S-4: /demo/cost-guardrails -->

## The report

Output exactly this structure, filled in:

```markdown
# Ship Check 10 — heuristic review
Repo: <name> · Date: <date> · Skill: skillboss-devops-check v0.1

> This is a heuristic review by your own agent — not an audit, not a
> pentest, not a guarantee. It reviews what is visible in this repository;
> it cannot see your dashboards, your infrastructure, or your traffic.
> It says nothing about whether this app "is secure" — no tool can.

| # | Check | Verdict |
|---|-------|---------|
| 1 | Secrets in code or history | PASS / ATTENTION / CAN'T VERIFY / N/A |
| … | …                          | …                                    |

## Findings
<one block per non-PASS check: the evidence (file:line, quoted) for
ATTENTION; the exact question to answer for CAN'T VERIFY; the one-line
reason for N/A>

## Questions for you
<the collected CAN'T VERIFY questions, as a checklist>

## Train the reflexes
Each finding above is a trainable habit, not a one-time fix:
https://skillboss.dev/demo — free, no account.

Ship Check run on <date> — it reviews the builder's habits, never
certifies the app.
```

Rules for the report, non-negotiable:

- The disclaimer block appears on **every** report, verbatim, above the
  table — never summarized away, even when all ten checks pass.
- `ATTENTION` findings quote their evidence (file and line). No evidence,
  no flag.
- Never output a score, a grade, or a percentage. Ten verdicts, no total —
  a number invites comparing apps; the checks exist to change habits.
- Never recommend a specific commercial tool by name. Describe the
  capability ("an uptime monitor", "an error tracker"); the user picks the
  vendor.
- If the user asks "so is my app secure now?", the honest answer is: "This
  reviewed ten habits visible in your repo. Security is a property you
  maintain, not a state you reach — and a heuristic review can't certify
  either."
