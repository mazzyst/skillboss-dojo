---
name: skillboss-devops-check
description: Use when the user wants a pre-ship review of their repository's operational hygiene — secrets, env files, auth coverage, database exposure, backups, health checks, error monitoring, rate limiting, dependencies, and cost guardrails. Runs the Ship Check 10 against the current repo and produces an honest, four-state review in the conversation; on request, also writes an optional dated Pre-flight report (five statuses, 24 named checks) the builder may keep on skillboss.dev. A heuristic review, not an audit.
---

# skillboss-devops-check — the Ship Check 10

Version 0.3 · from the [SkillBoss Dojo](https://github.com/mazzyst/skillboss-dojo) · CC BY-SA 4.0

You are running a pre-ship hygiene review. The agent does the looking; this
skill supplies the judgment. Ten checks, each mapping to a documented
breach class — a way real apps have actually been broken. This is not a
scanner and must not behave like one: no new tools, no
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

   Absence counts as `ATTENTION` evidence only when you can quote the
   exact place the safeguard belongs and show it isn't there; evidence you
   simply can't see is `CAN'T VERIFY`.
2. **A false alarm costs more than a miss.** If a finding depends on an
   assumption about the user's stack, ask; don't flag.
3. **Read the user's stack first.** Identify the language, framework,
   hosting hints (Dockerfiles, IaC, platform config files) before running
   the checks, and adapt the file patterns accordingly.
4. **Never transmit project material to SkillBoss from the agent.** Never
   print a secret or copy source into findings. Report locations only.
   Write the optional report file (below) only when the builder asks; the
   builder decides whether to paste it into SkillBoss. Your agent sends
   nothing to SkillBoss. The review itself stays in the conversation.

## The Ship Check 10

### 1. Are there secrets in your code — or your history?

**Look for:** hardcoded API keys, tokens, passwords, and connection strings
in source files (common shapes: `sk-`, `AKIA`, `ghp_`, `AIza`, long base64
or hex literals assigned to names containing `key`, `secret`, `token`,
`password`); the same in committed config (`config.json`, `settings.py`,
YAML); and in git history — check whether files like `.env` or key files
were *ever* committed (`git log --all --diff-filter=A -- '*.env' '*.pem'`),
because a secret deleted in a later commit is still readable in the
history — revoke it where it was issued and generate a new one ("rotating"
it); deleting the file is not enough.
**Why:** hardcoded secrets are the most common way vibe-coded apps get
breached — 28.65M new
secrets hit public commits in 2025 (GitGuardian), and AI-assisted commits
leak at roughly double the baseline rate (3.2% vs 1.5%).
**Train it:** [skillboss.dev/demo/secrets](https://skillboss.dev/demo/secrets)

### 2. Is `.env` ignored — and is there a `.env.example`?

**Look for:** a `.gitignore` that actually covers every env file present
(`.env`, `.env.local`, `.env.production`, …) — test each real env file
against it, don't just read the pattern; a committed `.env.example` (or
equivalent template) listing variable *names* with placeholder values so
the next person — or the next agent — knows what to configure without
being handed the real values; and no real values inside the example file.
**Why:** a committed env file is the cheapest secret leak there is to
prevent — and among the hardest to undo, because deleting it from the code
leaves it readable in the history.
**Train it:** [skillboss.dev/demo/env-hygiene](https://skillboss.dev/demo/env-hygiene)

### 3. Does every route that changes data check who's asking?

**Look for:** every route/handler that creates, updates, or deletes data
(POST/PUT/PATCH/DELETE, RPC mutations, server actions). For each, positive
evidence of an auth check — middleware, guard, decorator, session check, or
row-level security — *on that route*, not just somewhere in the app. List
any mutating route where you can't find one. Pay special attention to
"internal" or "admin" endpoints and to client-visible IDs used as the only
gate.
**Why:** a 1,072-app scan found 172 apps allowing unauthenticated data
deletion (Symbiotic Security), and Base44's breach was an auth bypass via a
public app ID — the route existed, the check didn't.
**Train it:** [skillboss.dev/demo/auth-routes](https://skillboss.dev/demo/auth-routes)

### 4. Can the public internet reach your database?

**Look for:** repo-side evidence only: database hosts or connection strings
in client-side code (anything bundled to the browser or mobile app);
IaC/firewall rules open to `0.0.0.0/0` on database ports; production
Docker/compose files publishing the DB port; database URLs with public
hostnames and no mention of network restriction. If the database is a
managed service and the network posture isn't in the repo, return
`CAN'T VERIFY` with this question: *"In your database dashboard, is public
network access disabled (or restricted to your app's own addresses)? And
if your front end talks to the database directly, is row-level security —
the feature that limits each signed-in user to their own rows — turned
on?"*
**Why:** Moltbook's production database was fully exposed three days after
launch — the case where one setting is the whole story.
**Train it:** [skillboss.dev/demo/db-exposure](https://skillboss.dev/demo/db-exposure)

### 5. Do backups exist — and have you restored one, once?

**Look for:** backup configuration in the repo (IaC backup blocks, scheduled
dump jobs, platform config enabling point-in-time recovery) — that covers
"exist". If backups live in a managed database's dashboard rather than the
repo, `CAN'T VERIFY` with *"Does your database provider's dashboard show
backups actually running — and how far back do they go?"* "Restored once"
is never verifiable from a repo: ask the user directly — *"Have you ever
actually restored a backup of this app's data, even once, somewhere safe —
not your live app?"* — and record their answer in the report. `PASS`
requires both: evidence backups run, and the user's yes.
**Why:** an untested backup is a hope, not a backup. In the industry's
best-known database loss (GitLab, 2017 — they published the whole story),
five separate backup mechanisms had all been failing silently; nobody
found out until one was needed.
**Train it:** [skillboss.dev/demo/backups](https://skillboss.dev/demo/backups)

### 6. Would you know your app is down before a user tells you?

**Look for:** two things with opposite verifiability. If the app deploys
to a managed platform (platform config file, serverless routes), the
deployed root URL already answers "is it up" — the real question is
whether anything is *watching* and would tell you, and that watcher lives
outside the repo: `CAN'T VERIFY` with *"Is any uptime monitor (even a
free one) pinging your deployed app — and does it alert you?"* If the
repo runs its own long-lived server (Dockerfile, compose, a server entry
point), a health endpoint (`/health`, `/healthz`, or framework
equivalent — ideally one that touches the DB) belongs in the routes: its
absence there is quotable `ATTENTION`; if present, also look for what
calls it (Dockerfile `HEALTHCHECK`, IaC, platform settings).
**Why:** without a pulse, downtime is discovered by your users — the
cheapest check on this list to fix, and the one that buys back the most
sleep.
**Train it:** [skillboss.dev/demo/health](https://skillboss.dev/demo/health)

### 7. Where do errors go when nobody's watching?

**Look for:** an error-monitoring integration wired into the app — an SDK
initialized in the entry point (its key from env, not hardcoded —
cross-check with check 1), or platform error tracking configured in the
repo. If the app deploys to a platform that may capture errors outside the
repo, `CAN'T VERIFY` with *"Does your hosting dashboard collect your app's
errors — and does it alert you, or would you have to remember to look?"*
`ATTENTION` needs positive evidence errors go nowhere: quote the entry
point or handler where errors are only printed and nothing reports them.
**Why:** unmonitored errors mean your users learn about failures before
you do — and the failures nobody reports, you never learn about at all.
**Train it:** [skillboss.dev/demo/error-monitoring](https://skillboss.dev/demo/error-monitoring)

### 8. Can one script hammer your login all night?

**Look for:** rate limiting — anything capping how often one caller can
hit a route — in two places: authentication routes (login, signup,
password reset, token issuance) and public POST endpoints that trigger
work or cost (contact forms, comments, anything sending email/SMS or
calling an LLM). Evidence: middleware, platform config, or gateway rules.
Name the specific unprotected routes; if rate limiting lives at a
proxy/CDN layer not in the repo, `CAN'T VERIFY` with *"Is rate limiting
configured at your proxy or CDN for the login and public POST routes?"*
**Why:** an unprotected login form lets one script try thousands of stolen
passwords overnight (credential stuffing) — and an unthrottled public
endpoint that triggers paid work is a bill someone else runs up for you.
**Train it:** [skillboss.dev/demo/rate-limiting](https://skillboss.dev/demo/rate-limiting)

### 9. Will you deploy the exact code you tested?

**Look for:** a committed lockfile matching the manifest (`package-lock.json`
/ `yarn.lock` / `pnpm-lock.yaml`, `poetry.lock`, `Cargo.lock`, `go.sum`, …);
no floating wildcard versions (`*`, `latest`) in direct dependencies; then
run the ecosystem's **own** audit command if one exists (`npm audit`,
`pnpm audit`, `pip-audit` if already installed, `cargo audit` if already
installed — install nothing new) and report its summary counts verbatim.
Do not hunt CVEs yourself; that is a scanner's job and you'd do it badly.
**Why:** without a lockfile, the app you tested is not necessarily the app
you deploy — the next install can silently pull different versions than
the ones that worked.
**Train it:** [skillboss.dev/demo/dependencies](https://skillboss.dev/demo/dependencies)

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
**Train it:** [skillboss.dev/demo/cost-guardrails](https://skillboss.dev/demo/cost-guardrails)

## The report

Output exactly this structure, filled in:

```markdown
# Ship Check 10 — heuristic review
Repo: <name> · Date: <date> · Skill: skillboss-devops-check v0.2

> This is a heuristic review by your own agent — not an audit, not a
> pentest, not a guarantee. It reviews what is visible in this repository;
> it cannot see your dashboards, your infrastructure, or your traffic.
> It says nothing about whether this app "is secure" — no tool can.

| # | Check | Verdict |
|---|-------|---------|
| 1 | Secrets in code or history | PASS / ATTENTION / CAN'T VERIFY / N/A |
| … | …                          | … (for N/A, append the one-line reason) |

## What checked out
<one line per PASS: the evidence that earned it>

## What needs fixing
<one block per ATTENTION: the evidence (file:line, quoted) plus a
one-line plain-language first step>

## What I can't see from your repo
Worth a two-minute look in your dashboards:
<the collected CAN'T VERIFY questions, as a checklist, tagged with their
check numbers, ordered by blast radius — the item that would hurt most if
the answer is "no" comes first. Triage, not alarm: no bolding, no
adjectives, no severity labels — the ordering does the work. An ATTENTION
check may also contribute its dashboard question here>

## Fix first, then train the reflex
Fix the "needs fixing" items above first. Each one is also a reflex you
can train so it doesn't come back: https://skillboss.dev/demo — free, no
account.

Ship Check run on <date> — it reviews the builder's habits, never
certifies the app.
```

Keeping the review in this conversation is a complete outcome. The step
below is optional.

Rules for the report, non-negotiable:

- The disclaimer block appears on **every** report, verbatim, above the
  table — never summarized away, even when all ten checks pass.
- Omit any section with nothing in it.
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

## Optional: a dated record the builder can compare later

> Optional dated record: ask your agent to write `PREFLIGHT-REPORT.json`
> using the contract below. Read it yourself. To record it, sign in to your
> ship at https://skillboss.dev/hangar and paste its contents. SkillBoss
> stores what your agent reported and dates its receipt. Your agent sends
> nothing to SkillBoss. You can keep the review in this conversation.

This is a SEPARATE run, not a translation of the ten verdicts above. The
four verdicts are habits judged in prose; the report is 24 named checks,
each with its own status, and the house stores exactly what the file
says. Do not convert a `PASS` on a habit into `PASSED` on its checks: run
each check named below, on its own terms, and report only what you ran.
Where a check's method differs from the habit's — the dependency check
reads an existing audit report rather than running one, the backup check
reads retention configuration and never the builder's answer about a
restore — the check's own text wins for the report. A human's answer
("I restored once") stays a declaration in the conversation; it is not a
finding.

Write the report as a NEW file named `PREFLIGHT-REPORT.json` at the project
root. If a file with that name already exists, do not overwrite it: return
the JSON in the conversation and say so. Write to no other file. If you
cannot create a file, return the JSON as a fenced block instead. A check you
did not run is left out of the file; a check you ran and could not decide
is `UNKNOWN`. Neither is ever `PASSED`.

### Rules for the run

- **Read only.** Do not change a file, do not run a deploy or an apply,
  do not touch a provider console, do not move a git ref.
- **Never print, copy, or test a value.** A finding cites a LOCATION — a
  path, a path with a line number, or a short commit reference — and never
  the thing you found. A value that looks like a credential is refused at
  the door, before anything is sent.
- **Cite the line when there is one.** `path:line` for something you found
  inside a file; the bare path when the finding is the file itself. When
  what you found is an ABSENCE — no example env file, no ignore rule, no
  health route — cite where it would live: the path the check expects, or
  the directory that should hold it. A location is never a sentence.
- **Names, never values.** When a check needs the NAMES of environment
  variables, read them from the tracked example file when one exists. Only
  when there is none may you open an untracked env file, and then read
  what stands left of the `=` alone: never copy, quote or reason from what
  stands right of it. Cite the file as the location.
- **What the files cannot settle is `UNKNOWN`.** Where a check says that
  runtime evidence stays `UNKNOWN`, it means the files are all you read:
  report what they establish, and treat what only a running app could
  show — whether a handler fires, whether an event arrives — as out of
  reach. That absence is neither a pass nor a finding.
- **One entry per check you actually ran**, with its exact `ruleId` below.
- **Nothing else belongs in the file**: no date, no counts, no verdict, no
  sentence about whether the project is good. The house stamps the date it
  receives the file, and reports what you reported.

### The statuses

- `BLOCKED` — fix this before your first real week.
- `WARNING` — fix before real users.
- `PASSED` — you ran the check and found nothing at the floor it names.
- `UNKNOWN` — you ran the check and could not establish an answer.
- `NOT_SCANNED` — you did not run it. Leave the check out of the file and
  it is recorded that way; never invent a status to fill a gap.

### The checks

Use these ids exactly. An id that is not on this list is refused.

#### SECRETS

- `secrets.hardcoded-credential` — A credential-shaped value is committed in a tracked file.
  Why: A committed credential may remain available to everyone with repository access.
  Check (any stack): Read tracked files for credential-shaped values. Report file and line only; never print or test a value.
- `secrets.history-credential` — A credential-shaped value exists in git history.
  Why: Deleting a value from the current file does not remove it from earlier commits.
  Check (any stack): Inspect available git history without changing refs. Cite a short commit reference only; if history is incomplete, report UNKNOWN.
- `secrets.public-env-prefix` — A public env variable name looks like a secret.
  Why: Public-prefixed variables can be included in the browser bundle.
  Check (nextjs): Read public-prefixed variable names and their references in Next.js source. Report names as locations only, never variable values.
- `secrets.workflow-echoes-secret` — A workflow step prints a secret.
  Why: Workflow output can expose credentials to people who can read job logs.
  Check (github-actions): Read workflow steps for commands that print credentials. Cite the workflow path and line; never execute a step or retrieve a value.

#### ENV FILES

- `env.file-tracked` — An env file is tracked by git.
  Why: An env file in git can disclose project credentials.
  Check (any stack): Inspect the tracked-file list for env files, distinguishing example files from values. Cite paths only; do not display their contents.
- `env.no-ignore-rule` — .gitignore does not exclude env files.
  Why: Without an exclusion, a later commit can accidentally include an env file.
  Check (any stack): Read ignore patterns and their applicability to env filenames without creating files or changing the index. Report missing coverage as a location.
- `env.no-example` — No .env.example documents the variables.
  Why: An example file helps a builder identify configuration names without sharing values.
  Check (any stack): Look for a tracked .env.example documenting variable names. Report its absence without creating one or copying values.
- `env.image-copies-env` — The image build can copy env files.
  Why: Files included in an image can travel beyond the original repository.
  Check (docker): Read Dockerfile COPY instructions and .dockerignore patterns for env inclusion. Do not build or run an image; report relevant file locations.

#### AUTH

- `auth.mutating-route-unguarded` — A mutating API route has no identity check.
  Why: A route that changes data needs to establish who may perform that action.
  Check (nextjs): Read mutating Next.js routes and their identity-check wrappers. Trace source only; never call a route. Report UNKNOWN where coverage cannot be established.

#### DATABASE

- `db.public-network-access` — The database accepts public network access.
  Why: Public network settings can expose a database beyond its intended clients.
  Check (terraform, azure): Read Terraform or Azure configuration for database network exposure. Do not query a provider or connect to the database; report UNKNOWN if deployment settings are unavailable.
- `db.service-key-in-client` — A service or admin key is referenced in client code.
  Why: A privileged key referenced by browser code may escape the server boundary.
  Check (nextjs): Read client entry points and their imports for service or admin key references. Cite locations only; do not build the app or evaluate a key.

#### BACKUPS

- `backups.retention-below-floor` — Backup retention is below seven days.
  Why: A short retention window limits the recovery points available after a loss.
  Check (terraform, azure): Read declared Terraform or Azure backup retention and compare with seven days. Do not query the provider or run a restore; report UNKNOWN if the setting is unavailable.

#### HEALTH

- `health.no-endpoint` — No health endpoint or container health check.
  Why: A health signal gives an operator a place to begin checking an application.
  Check (nextjs, docker): Read route definitions and container health configuration. Do not call an endpoint or run the container; report only what the files establish.

#### ERRORS

- `errors.no-boundary-or-tracker` — No error boundary and no error tracker wired.
  Why: An error path without a boundary or tracker may leave a failure unnoticed.
  Check (nextjs): Read Next.js error boundaries and tracker initialization. Do not trigger an error or send an event; absent runtime evidence stays UNKNOWN.

#### RATE LIMITS

- `ratelimit.public-post-unlimited` — A public POST route has no rate limit.
  Why: An unrestricted write route can consume resources through repeated requests.
  Check (nextjs): Read public POST handlers and their rate-limit middleware. Do not send requests or test limits against a running service.
- `ratelimit.retry-without-backoff` — A retry loop has no backoff or attempt cap.
  Why: Repeated failures without a cap or delay can amplify load.
  Check (any stack): Read retry loops for attempt bounds and increasing delays. Cite the source; never exercise a remote failure to test the loop.

#### DEPENDENCIES

- `deps.no-lockfile` — No lockfile is committed.
  Why: A missing lockfile makes the installed dependency set less repeatable.
  Check (any stack): Inspect tracked dependency manifests and lockfile paths. Do not install packages or generate a lockfile.
- `deps.audit-advisories` — The package audit reports critical or high advisories.
  Why: Known high-severity dependency advisories deserve an explicit decision.
  Check (any stack): Read an existing package advisory report for critical or high entries. Do not run a network check or install packages; report UNKNOWN when no report is available.
- `deps.unpinned-actions` — A third-party action is not pinned to a commit.
  Why: A movable action reference can change what a workflow executes.
  Check (github-actions): Read third-party action references in workflows and check whether each names a full commit hash. Do not fetch or execute the action.
- `deps.floating-base-image` — The base image tag floats.
  Why: A floating image tag can select different bytes on a later build.
  Check (docker): Read base-image references for mutable tags and digest pins. Do not pull, build or run an image; cite Dockerfile locations.

#### COSTS

- `cost.no-owner-env-tags` — Resources carry no owner or environment tag.
  Why: Without owner and environment tags, a resource can be difficult to account for.
  Check (terraform, azure): Read declared Terraform or Azure resource tags for owner and environment. Do not query or change provider resources.
- `cost.nonprod-always-on` — Non-production compute runs without a schedule.
  Why: Idle non-production compute can keep incurring charges.
  Check (terraform, azure): Read non-production compute declarations and schedules. Do not query billing or start and stop resources; report UNKNOWN when scheduling is outside the available configuration.
- `cost.no-budget-alert` — No budget alert exists.
  Why: A budget notification gives a person an opportunity to respond to rising spend.
  Check (terraform, azure): Read Terraform or Azure budget-alert declarations and recipient references. Never query billing or send an alert; report UNKNOWN when settings live outside the available files.
- `cost.ai-calls-unbounded` — Model or API calls have no token, time, or quota cap.
  Why: Unbounded model calls can keep consuming time or a project budget.
  Check (nextjs): Read model or API call sites for token, timeout and quota bounds. Do not send a request, use credentials or infer runtime enforcement from a setting alone.

### The file

```json
{
  "schema": "skillboss.preflight-report/1",
  "tool": {
    "name": "your-agent",
    "version": "1"
  },
  "stack": [
    "nextjs",
    "github-actions"
  ],
  "findings": [
    {
      "ruleId": "secrets.hardcoded-credential",
      "status": "BLOCKED",
      "evidence": [
        {
          "location": "server/mailer.ts:31",
          "note": "assigned from a literal"
        }
      ]
    },
    {
      "ruleId": "env.file-tracked",
      "status": "PASSED"
    },
    {
      "ruleId": "deps.unpinned-actions",
      "status": "WARNING",
      "evidence": [
        {
          "location": ".github/workflows/deploy.yml:24"
        }
      ]
    },
    {
      "ruleId": "backups.retention-below-floor",
      "status": "UNKNOWN"
    }
  ]
}
```

Optional alongside `tool` and `stack`: `commit`, the full commit
reference of what you read. Everything else is refused — the file has no
date field, no counts and no place to put a conclusion.

Everything above comes from the SkillBoss source at the revision named in
the commit that published it; the rule ids, the five statuses and the
checks are the same the berth accepts. An id that is not on the list is
refused there.
