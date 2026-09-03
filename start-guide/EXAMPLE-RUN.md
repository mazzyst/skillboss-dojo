# EXAMPLE-RUN.md — one run, filled in

> A worked example of the record a run leaves behind. It is NOT part of
> the wake-up load and it is NOT a template to paste: consult it when you
> are about to write your first Gate Report, or when the human asks what
> a filled record actually looks like. Everything below is invented. The
> project does not exist; the point is the SHAPE, not the content.

The kit repeats "no box checked without evidence" in every gate file and
never once shows you a written one. That gap is what this file closes.
Read the Gate Report first, then the evidence pairs at the end — those
two sections carry the whole lesson.

## The project

TALLY, invented for this file: a small tool a freelancer runs to remind
their clients about unpaid invoices. Two people, a boring stack, real
client email addresses in the database, no card payments. It is the
smallest project that still has something to lose.

## state/mission.md (excerpt)

```
MISSION
TALLY reminds a freelancer's clients about unpaid invoices, so chasing
payment stops being a thing the freelancer does by hand on a Sunday.

SHIPPED means
Ana can import her invoice list, and TALLY emails a reminder on the
schedule she set, from her own domain. By the end of October.

WILL NOT DO
- no payment collection: we send reminders, money never touches us
- no accounting features, ever - one thing well
- no client-facing login; the client receives an email, that is all
- no SMS in v1, however often it gets asked for

PROFILE
deploy-target: PaaS
containers: no          -> gate 60 waived-by-profile
                           (revisit when: a container enters the stack)
user-accounts: yes
payments: no            -> gate 20 keeps every box; the payment-specific
                           question is simply not asked
personal-data: yes
team: small team
```

The "will NOT do" list is the part people skip. It is also the only part
that settles an argument three weeks later.

## state/journal.md (four consecutive entries)

A decision, a gate that HELD, the waiver that unblocked it, and the same
gate closing. That cycle is the normal shape of a gate. A gate that
passes on the first pass is the exception, not the target.

```
2026-09-14 - DECISION: where reminder schedules live
context: schedules must survive a restart and be editable by Ana. We
  have Postgres already and no queue.
options: a cron table in Postgres polled every minute; a hosted queue
  (new vendor, new bill); in-memory timers (lost on restart).
choice: the Postgres table. Boring, already backed up, and one less
  system to rehearse at gate 70. Revisit if polling cost shows up.
```

```
GATE REPORT - 20-SECURITY                        date: 2026-09-21
boxes: [x] secrets-out-of-code
           evidence: .env.example at repo root lists SMTP_PASSWORD with
           an empty value; `git log -S SMTP_PASSWORD -- .env` returns
           nothing; the real value lives in the host's config panel
       [x] history-scanned
           evidence: `gitleaks detect --no-banner` over full history,
           exit 0, output trimmed in this entry's attachment
       [x] input-validation
           evidence: src/http/schema.ts validates every request body;
           src/http/schema.test.ts covers the three reject cases
       [ ] authz-on-every-route
           status: OPEN - GET /invoices/:id checks that the caller is
           signed in, never that the invoice is theirs. Found by reading
           src/http/routes.ts line 88.
waivers: none
risks accepted by human: none
cost: 3 sessions, tokens unknown - DECLARED by the coach, not measured
verdict: HOLD (1 box open)
```

Read the open box again. It names the file, the line, and what is
missing. "Authz needs work" would have been worth nothing in three
weeks; this one can be fixed by someone who was not in the room.

```
2026-09-22 - WAIVER: SKIP dependency-floor because we are two people on
a two-week deadline and every dependency is pinned already; I will add
the audit step at gate 50 where CI can run it for me
```

```
GATE REPORT - 20-SECURITY                        date: 2026-09-23
boxes: [x] authz-on-every-route
           evidence: src/http/routes.ts line 88 now loads the invoice
           and compares owner_id to the session; two tests in
           src/http/routes.authz.test.ts cover own-invoice and
           other-invoice, both green in `npm test`
       [ ] dependency-floor
           status: WAIVED 2026-09-22, quoted verbatim above; revisit
           at gate 50, where CI can run the audit
waivers: 1 (dependency-floor)
risks accepted by human: an unaudited dependency tree until gate 50
cost: 1 session, tokens unknown - DECLARED by the coach, not measured
verdict: GO-READY
```

Ana typed GO. Only then did the scoreboard change.

## state/scoreboard.md (the rows that resulted)

An excerpt: the rows these entries touched, regenerated from the journal
above and never hand-patched. The gates not shown are still OPEN and
unchanged. Every Evidence cell points BACK at a journal date - that
direction is the whole discipline.

```
| Gate               | State  | Since      | Evidence               |
|--------------------|--------|------------|------------------------|
| 00-kickoff         | PASSED | 2026-09-12 | journal 2026-09-12     |
| 05-agent-workbench | PASSED | 2026-09-13 | journal 2026-09-13     |
| 10-architecture    | PASSED | 2026-09-19 | journal 2026-09-19     |
| 20-security        | PASSED | 2026-09-23 | journal 2026-09-23     |
| 40-tests           | OPEN   | -          | -                      |
| 60-docker          | WAIVED | 2026-09-12 | profile: no containers |
```

Run belt after that GO: ORANGE. Five gates faced out of ten - four passed,
one waived by profile - plus one box waived by Ana. The record says all
of that out loud, which is worth more than a clean-looking scoreboard
that leaves it out.

The run screen renders this same file after the next commit. It is a
picture of the scoreboard, and the scoreboard is a picture of the
journal. Nothing ever flows the other way.

## Evidence that counts, and evidence that does not

The single most common failure is a box checked with a sentence instead
of a fact. The left column can be verified by someone who was not there.
The right column cannot be verified at all.

| Counts | Does not count |
|---|---|
| `.env.example` at repo root lists the key with an empty value | "secrets are in environment variables" |
| `gitleaks detect` over full history, exit 0 | "I did not commit any secret" |
| src/http/routes.ts line 88 compares owner_id to the session | "authorization is handled" |
| `npm test` green, 41 tests, output trimmed into the entry | "the tests pass" |
| the restore rehearsal's journal entry, with its date | "we have backups" |
| `unknown` in the tokens column | "roughly 200k tokens, I think" |

Three rules behind that table:

- **Location, never value.** Evidence says WHERE a secret lives, never
  what it is. A journal is committed to a repository; treat every line
  as public.
- **A command needs its output.** The command alone proves you knew
  which command to run. Trimmed output proves you ran it.
- **`unknown` is a real answer.** An invented figure is worse than an
  absent one, because it looks like evidence. This is why the cost lines
  above say tokens unknown: the kit has no telemetry and cannot see a
  bill, so a number there would be a guess wearing a fact's clothes.

## What this example is not

It is not a target to match. TALLY closed a gate in two passes with one
waiver; your run may take five passes and three waivers and still be a
better run, because the record will say what actually happened.

It is not proof of anything about TALLY either. The record shows that
the questions were faced and answered on a date, by a named human. It
says nothing about whether the app is safe - no record can, and this kit
never claims otherwise.
