# The ten traps

Copied from the SkillBoss source (`frontend/src/lib/ship-ready-content.ts`,
`SHIP_READY_SYSTEMS`, and `frontend/src/lib/system-boss-map.ts`) so the boss
skill works when it is copied alone into another project. A test in the
SkillBoss repository checks this table against the source.

A **trap** is a kind of mistake that hurts apps. Each has a slug (the short
name the boss file uses), the system it hits, its name, the SkillBoss boss
that trains against it, and a drill to practise on.

Three traps have no boss. That was decided on purpose: a blank is honest; a
forced pairing is a claim.

| Slug | System | Trap | Boss | Drill |
|---|---|---|---|---|
| `secrets` | SECRETS | THE LEAK | The Gatekeeper | https://skillboss.dev/demo/secrets |
| `env-hygiene` | ENV FILES | THE COMMITTED KEY | no boss (left blank at signature) | https://skillboss.dev/demo/env-hygiene |
| `auth-routes` | AUTH | THE OPEN MIC | The Gatekeeper | https://skillboss.dev/demo/auth-routes |
| `db-exposure` | DATABASE | THE OPEN DOOR | The Gatekeeper | https://skillboss.dev/demo/db-exposure |
| `backups` | BACKUPS | THE LOST WEEKEND | no boss (left blank at signature) | https://skillboss.dev/demo/backups |
| `health` | HEALTH | THE SILENT CRASH | The Firewatch | https://skillboss.dev/demo/health |
| `error-monitoring` | ERRORS | THE 3AM PAGE | The Firewatch | https://skillboss.dev/demo/error-monitoring |
| `rate-limiting` | RATE LIMITS | THE FLOOD | The Firewatch | https://skillboss.dev/demo/rate-limiting |
| `dependencies` | DEPENDENCIES | THE ROTTEN PLANK | no boss (left blank at signature) | https://skillboss.dev/demo/dependencies |
| `cost-guardrails` | COSTS | THE BILL SHOCK | The Nimbus | https://skillboss.dev/demo/cost-guardrails |

The boss file's `villain` field takes the slug, never the name.
