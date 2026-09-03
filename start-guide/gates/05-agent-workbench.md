# Gate 05 — AGENT WORKBENCH

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: this project is being built with an AI agent, and an agent
without memory, rules, and guardrails amplifies mistakes as fast as it
amplifies progress. At this gate, the coach installs itself into the
project — memory files, rules, hooks, and the working discipline that
makes agent output safe to trust.

## Guardrails

- **The project has a memory file.** A `CLAUDE.md` or `AGENTS.md` at the
  repo root, written from `state/mission.md`: the mission, the will-NOT-do
  list, the stack conventions, and the project's invariants. Short enough
  to be read every session; updated only through the RE-SCOPE ritual, so
  it never drifts from the mission.
- **Repeatable workflows become rules, not folklore.** Anything the agent
  must do the same way every time (test command, commit style, review
  steps) is written into the memory file or the tool's rules format (see
  ADAPTERS.md) — never re-explained from memory each session.
- **Open-source agent material is inspiration, never authority.** Skills,
  rule packs, and prompt collections from the ecosystem are read and
  adapted; they are not pasted in as-is, and they never override the
  project's own memory file.
- **Three rules stop depending on memory.** The kit ships working git
  hooks; install them now, from the repo root:

  ```sh
  sh start-guide/hooks/install.sh
  ```

  `pre-commit` catches an environment file staged, a credential-shaped
  string in the diff, and a dependency change; `pre-push` runs your one
  command and reports a red suite; `post-commit` renders the run screen
  (`state/run-screen.md` for the editor, `state/run-screen.html` for a
  browser) so the human can SEE the run without asking anyone —
  milestones and gates on one picture, refreshed by their own commits,
  offline, with no service anywhere. They start in warn mode by design —
  a hook that blocks on day one gets uninstalled on day two — and move to
  block once the human has seen one fire honestly. `hooks/ci-checks.yml`
  carries the same floor for CI, plus the history scan, and lands at
  Gate 50. Full details in `hooks/README.md`.
- **Session discipline.** The agent plans, the human approves, then the
  agent executes — in small, reviewable diffs. The human reads agent
  output the way they would read a junior developer's pull request. One
  subject per session; the `state/` files carry memory between sessions.
- **Secrets never enter the agent.** No credential is pasted into a
  prompt, a memory file, or a rules file. The agent runs with least
  privilege — development credentials only, never production. Every
  agent-authored commit is read by the human before it is pushed.

## Coach Play

Ask:

1. Which agent tool (or tools) will build this project? (decides the
   ADAPTERS.md wiring, and whether hooks are available)
2. What must the agent never do in this repository? (seeds the memory
   file's invariants)
3. What has the agent already gotten wrong here, if anything? (the first
   candidates for a blocking hook)

Then: write the memory file from the mission, wire the wake-up line per
ADAPTERS.md, run the hook installer, show the human one guard firing on a
harmless test so they trust it — stage a throwaway `.env` with an empty
value, watch check 1 fire, unstage it (a placeholder-looking secret is
filtered out by design and fires nothing), and record the session discipline in the
memory file.

Refuse: pasting any credential anywhere; adopting an external rule pack
wholesale; enabling a blocking hook the human has not asked for.

Definition of done: memory file committed, wiring in place, hooks (or
their n/a-with-reason record) on the scoreboard, discipline written down.

Further reading — standards, not vendors: the spec-driven method at
https://github.com/github/spec-kit (inspiration, never authority), the
agent-file convention at https://agents.md, configuration discipline at
https://12factor.net.

## Evidence Checklist

- [ ] memory-file — evidence: path of the committed `CLAUDE.md` or
      `AGENTS.md`, containing the mission and the will-NOT-do list
- [ ] wake-up-wired — evidence: path of the wiring file per ADAPTERS.md
      (memory-file line, rules stub, or instructions file)
- [ ] hooks-installed — evidence: the installer's output, plus
      `.git/hooks/pre-commit` and `.git/hooks/pre-push` present; or
      n/a-with-reason per the profile (no local git tooling)
- [ ] hook-seen-firing — evidence: the guard's warning on a deliberate
      harmless test (a throwaway `.env` with an empty value, staged then
      unstaged) — a guard nobody has seen work is a guard nobody trusts
- [ ] run-screen-open — evidence: `state/run-screen.md` exists after a
      commit and the human keeps it open as a tab beside their code (or
      `state/run-screen.html` in a browser, if they prefer one) — a screen
      outside the field of vision is a screen nobody reads
- [ ] no-secrets-in-agent-files — evidence: a search over the memory and
      rules files showing no credential-shaped strings (location, never
      value)
- [ ] session-discipline-recorded — evidence: the memory-file section
      stating plan-then-approve, small diffs, and human review of agent
      commits
