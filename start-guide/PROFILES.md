# PROFILES.md — how the intake shapes the run

> The kit adapts to the project, never the other way around. The intake
> answers (Gate 00) compute a profile; the profile decides, per gate,
> whether it runs in full, runs lighter, or is waived up front — always on
> the record, never silently.

## The three activation levels

- `active` — the gate runs in full: every guardrail, every checklist box.
- `active-lite` — the gate runs, but boxes the profile marks not
  applicable are recorded as `n/a-with-reason` instead of checked. The
  reason is written next to the box; "n/a" alone is not accepted.
- `waived-by-profile` — the gate is marked WAIVED on the scoreboard at
  intake time, with the profile reason and a "revisit when" note (the
  condition under which the gate must be reopened). A profile waiver still
  counts toward its run belt: the question was faced.

Two hard rules:

1. A profile can only waive DOWNWARD. It removes obligations the mission
   does not need; it never adds obligations the human did not accept.
2. A profile waiver is never silent. It appears on the scoreboard as
   WAIVED with its reason, exactly like a human waiver.

## Profile axes (from the Gate 00 intake)

| Axis | Values |
|---|---|
| Deploy target | PaaS / VPS / serverless / none-yet |
| Containers | yes / no |
| User accounts | yes / no |
| Payments | yes / no |
| Personal data | yes / no |
| Team | solo / small team |

## The activation matrix

| Gate | Default | Profile effects |
|---|---|---|
| 00-kickoff | active | Always active. No profile can waive the intake. |
| 05-agent-workbench | active | Always active — the kit presupposes an agent. `active-lite` for a plain chat agent with no file access: the hooks boxes become n/a-with-reason; the session-discipline boxes remain. |
| 10-architecture | active | Always active. Existing repo (not greenfield): the walking-skeleton box becomes "identify the existing skeleton" instead of "build one". |
| 20-security | active | No user accounts: the authn/authz boxes become n/a-with-reason; the secrets, input-validation, and dependency boxes remain mandatory. No personal data: the data-minimization box becomes n/a-with-reason. |
| 40-tests | active | Always active. |
| 50-cicd | active | Team solo with deploy target none-yet: `active-lite` — CI still required, branch protection recorded n/a-with-reason until a second contributor or a production target exists (revisit when: either arrives). |
| 60-docker | active | Containers no: `waived-by-profile` — reason "the stack does not use containers"; revisit when a container enters the stack (a Dockerfile, a compose file, a container-based deploy target). |
| 70-deployment | active | Deploy target none-yet: `active-lite` — the rollback-plan and backup boxes stay (they are decisions, not infrastructure); the rehearsal boxes are recorded n/a-with-reason; revisit when a deploy target is chosen — the gate reopens then. |
| 80-observability | active | Deploy target none-yet: `active-lite`, same rule as 70 — the health-endpoint contract is still designed; the alerting boxes wait for a target. |
| 90-ship | active | Always active. The final boss is never waived: even a project that pauses before shipping closes its run with the evidence review. |

## The SMALL RUN profile (a weekend project)

Ten gates is the right shape for something that will carry real users.
It is the wrong shape for a weekend build, and a run nobody finishes
protects nothing. So the intake asks one more question — *is this a
weekend-sized project or one that will carry real users?* — and a
weekend answer selects SMALL RUN:

| Gate | In a SMALL RUN |
|---|---|
| 00-kickoff | active — the mission still gets written |
| 05-agent-workbench | active — the hooks are the whole point of a short run |
| 20-security | active — secrets and authz are never weekend-optional |
| 70-deployment | active-lite — rollback plan and a backup decision; rehearsals deferred |
| 90-ship | active — the evidence review still closes the run |
| 10, 40, 50, 80 | active-lite — one box each: the skeleton runs, one smoke test, CI runs it, the app says whether it is up |
| 60-docker | per the containers axis, as usual |

A SMALL RUN is a REAL run: same evidence rule, same GO, same record. It
is smaller, not looser — and the coach says so at the start, in exactly
this shape (SCREENS.md):

```
SMALL RUN — <project>
in full     00-KICKOFF · 05-AGENT-WORKBENCH · 20-SECURITY · 90-SHIP
lite        70-DEPLOYMENT — rollback plan and a backup decision; rehearsals deferred
one box     10-ARCHITECTURE · 40-TESTS · 50-CICD · 80-OBSERVABILITY
60-DOCKER   per the containers axis, as usual
say         "full run" at any time — every box reopens. Smaller, not looser.
```

**Upgrading is one sentence.** The human says "full run" and every
active-lite gate reopens with its full box set, on the record. The coach
proposes the upgrade itself the day any of these becomes true: the first
real user, a second contributor, money changing hands, or personal data
entering the system.

## Recording the profile

At the end of the Gate 00 intake, the coach writes into
`state/mission.md`:

```
PROFILE
deploy-target: PaaS
containers: no          -> gate 60 waived-by-profile (revisit when: a container enters the stack)
user-accounts: yes
payments: no
personal-data: yes
team: solo
```

and mirrors every `waived-by-profile` line onto the scoreboard. From that
moment the run has exactly one shape, and every deviation from it is a
recorded waiver — the human's or the profile's, never the coach's.
