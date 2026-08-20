# Ship-Ready Starter Pack

An ops floor for AI-era builders: the judgment your coding agent needs
the week you start, and the week you ship. Not a boilerplate, not a
scanner — a set of rules and templates your OWN agent applies to
whatever stack your platform chose.

> This is a briefing and a floor, not a security guarantee. Nothing here inspects your app; the checks are heuristics you and your agent apply yourselves. SkillBoss backs builders, never apps.

![The Ship-Ready map — ten systems, ten villains](ship-ready-map.png)

## What is in the pack

- **`SHIP-READY.md`** — the floor. Paste it whole into your coding
  agent (Claude Code, Cursor, Copilot…) and let it apply the ten
  systems to your project.
- **`ci/secret-scan.yml`** — a ready-to-drop GitHub Actions workflow
  that blocks the next hardcoded key before it enters history.
- **`rules/`** — the same floor as agent rules, per stack: paste the
  file for YOUR stack into your agent as standing rules (Cursor rules,
  CLAUDE.md, Copilot instructions — same text works everywhere).
  Missing your stack? Community floor — send a pull request.
- **`INCIDENTS.md`** — the ledger: real incidents from the wave,
  blameless and cited, each mapped to the reflex that would have
  stopped it.

## The ten systems

| # | System | Holds back | Train it |
|---|---|---|---|
| 1 | SECRETS | THE LEAK | [drill](https://skillboss.dev/demo/secrets) |
| 2 | ENV FILES | THE COMMITTED KEY | [drill](https://skillboss.dev/demo/env-hygiene) |
| 3 | AUTH | THE OPEN MIC | [drill](https://skillboss.dev/demo/auth-routes) |
| 4 | DATABASE | THE OPEN DOOR | [drill](https://skillboss.dev/demo/db-exposure) |
| 5 | BACKUPS | THE LOST WEEKEND | [drill](https://skillboss.dev/demo/backups) |
| 6 | HEALTH | THE SILENT CRASH | [drill](https://skillboss.dev/demo/health) |
| 7 | ERRORS | THE 3AM PAGE | [drill](https://skillboss.dev/demo/error-monitoring) |
| 8 | RATE LIMITS | THE FLOOD | [drill](https://skillboss.dev/demo/rate-limiting) |
| 9 | DEPENDENCIES | THE ROTTEN PLANK | [drill](https://skillboss.dev/demo/dependencies) |
| 10 | COSTS | THE BILL SHOCK | [drill](https://skillboss.dev/demo/cost-guardrails) |

Prefer the guided room? The same ten systems live at https://skillboss.dev/launch —
brief, floor, and drill, one tap from your clipboard.

## The promise

The floor is free, forever. SkillBoss backs builders, never apps: the
only thing this pack claims is that you briefed yourself before you
shipped.
