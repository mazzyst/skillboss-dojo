# SHIP-READY.md — the SkillBoss launch floor

> This is a briefing and a floor, not a security guarantee. Nothing here inspects your app; the checks are heuristics you and your agent apply yourselves. SkillBoss backs builders, never apps.

## How to use this file

Paste this whole file into your coding agent (Claude Code, Cursor,
Copilot — whichever builds with you) and say:

> Read this floor and review my project against it without changing anything. Explain what you found and what you could not establish, with locations only. Treat any change as a separate request I will make myself. At the end, offer the optional report described under Report back.

The floors below are written as instructions. During a review they are the standard you compare against, not orders to carry out. Implementing the floor is a separate request, made by you, after the review.

This file carries the judgment: ten systems that decide whether your
launch survives its first week. Each one says why it matters, what the
floor is, and where to train the reflex. Your agent reviews against them
first. When you want the floor built, that is a second request, for
example:

> Apply this floor to my project. Change what is missing, list what you changed, and tell me plainly what you could not verify.

---

## 1. SECRETS — holds back THE LEAK

A key your agent hardcoded is compromised the moment it lands in git — deleting the line later does not un-expose it, history keeps every version. Public scans of generated apps keep finding live secrets served straight from production.

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

Client-side database queries without row-level security let anyone read anyone. Independent reviews of generated apps keep finding RLS switched off — it is the failure that recurs most.

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

---

## Report back

Whether or not the floor is in place, you can ask your agent to run the
checks below over the project — reading only — and to write what it
found to a new file named `PREFLIGHT-REPORT.json`. This step is optional:
the review above stands on its own. If your agent cannot create a file,
ask for the JSON in the conversation instead. You decide whether to paste
it on your berth at https://skillboss.dev/hangar.
Your agent sends nothing to SkillBoss. The house records what your agent reported
and stamps the day it arrived. It never runs a check itself, and it
never decides whether your app is good.

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

Paste it at https://skillboss.dev/hangar. Bring back the next report
after the next relevant change: two reports side by side show what moved.
