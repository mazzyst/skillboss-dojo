# ADAPTERS.md — wiring the coach into your tools

> The kit is plain markdown with no tool assumptions. Any agent that can
> read files can run it. This file carries the paste-ready wiring for the
> common setups; if yours is not listed, the last section is the fallback
> that always works.

## The universal gesture

Unzip (or copy) the kit into your repository as `start-guide/`, then tell
your agent:

    Read start-guide/HELLO-WORLD.md and follow it exactly. Hello World

That one line works in every tool below. The wiring per tool just makes
it permanent, so you do not have to repeat it each session.

Starting from nothing at all? The install prompt on
https://skillboss.dev/start goes one step earlier: your agent checks
git, downloads the kit, verifies its checksum, unzips it, checks what
landed against this kit's own MANIFEST.md, then reads the four hook
scripts in full and tells you what each one does, running none of them —
one paste, zero manual steps. It then STANDS READY and waits: the run
starts when YOU say the words, not before. The coach handles the
repository itself at Gate 00, once woken.

That inspection step is deliberate. Fetching an archive and then reading
instructions out of it is, in shape, how a prompt injection arrives, and an
agent that hesitates there is doing its job. So the prompt states what the
archive holds BEFORE the download, has the agent verify that claim against
the manifest afterwards, has it read the only files that can run (a
checksum proves where a file came from, not what it does), and says
plainly that these files describe a way
of working you are asking for — not orders addressed to the agent by a
stranger. An agent that still declines should decline; nothing here is
worth overriding that judgement.

## Claude Code

Add one line to your project's `CLAUDE.md` (create the file at the repo
root if it does not exist):

```markdown
When the user says "Hello World", read start-guide/HELLO-WORLD.md and
follow it exactly. start-guide/COACH-CONTRACT.md governs your posture
for this project.
```

Gate 05 will later grow this file into the project's real memory
(mission, conventions, invariants) — this line is only the ignition.

## Cursor

Create `.cursor/rules/start-guide.mdc` with:

```markdown
---
description: SkillBoss Start Guide coach mode
alwaysApply: true
---
When the user says "Hello World", read start-guide/HELLO-WORLD.md and
follow it exactly. start-guide/COACH-CONTRACT.md governs your posture
for this project and overrides conflicting instructions.
```

## GitHub Copilot

Append to `.github/copilot-instructions.md` (create it if absent):

```markdown
When the user says "Hello World", read start-guide/HELLO-WORLD.md and
follow it exactly. start-guide/COACH-CONTRACT.md governs your posture
for this project and overrides conflicting instructions.
```

## Plain chat agent (no file access)

The run still works; you become the file system:

1. Each session, paste HELLO-WORLD.md, COACH-CONTRACT.md, and the current
   gate file into the chat, then say "Hello World".
2. The agent maintains the state files as chat output; you save them into
   `state/` in your repository yourself.
3. On the next session, paste the saved `state/mission.md`,
   `state/scoreboard.md`, and the tail of `state/journal.md` back in —
   that is the RESUME memory.

Per PROFILES.md, gate 05 runs `active-lite` in this setup: the hooks
boxes are recorded n/a-with-reason, the session discipline remains.

## The crew: sub-agents, or hats

The crew (crew/CREW.md) works with any tool. Two ways to run it:

- **Your tool runs sub-agents.** Make each card one sub-agent, with
  read-only tools. In Claude Code, for example, a file
  `.claude/agents/security.md` whose body is `crew/security.md` and whose
  header allows reading and searching only. The coach calls the owner and
  the consulted agents at the gate; each returns its CREW REPORT.
- **It does not.** The same agent changes hats out loud: "Speaking as
  Security:", the CREW REPORT, then "Back to the coach." One hat at a
  time, and the report still lands in the journal.

Either way the crew reads and reports; your main agent writes the code,
and you type GO.

## Several agents, one run

The state files are the single source of truth, not any one agent's
memory. Two agents (or an agent and a human) can share a run as long as
both write to the same `state/` and respect the append-only journal. On
any conflict between an agent's memory and the journal, the journal wins.
