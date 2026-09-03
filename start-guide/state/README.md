# state/ — the run's living record

The three `.template.md` files here are blank forms. The coach copies
each one to its real name (drop `.template`) at wake-up — into `state/`
at the REPOSITORY ROOT, beside `start-guide/`, never inside it: the hooks
read `state/scoreboard.md` from the root — and fills the COPIES as the
run advances. The templates themselves are never edited —
they are the blank the next run starts from.

| Template | Becomes | Holds |
|---|---|---|
| mission.template.md | mission.md | Intake answers, computed profile, the "will NOT do" list |
| journal.template.md | journal.md | Append-only decision log and gate reports |
| scoreboard.template.md | scoreboard.md | Gate states, evidence pointers, current run belt |

Rules (from COACH-CONTRACT.md rule 9):

- The journal is append-only and dated; corrections are new entries.
- The mission changes only through the RE-SCOPE ritual.
- The scoreboard is regenerated whole from the journal, never patched.
- On any conflict between an agent's memory and these files, the files
  win.

Two files here are NOT yours to write: `run-screen.md` and
`run-screen.html`, both rendered from the scoreboard by the `post-commit`
hook after every commit. Never edit them, never commit them (the hook
installer gitignores both). Open `run-screen.md` as a tab beside your
code — your editor reloads it on every commit.

Commit the filled copies to your repository. The run's record is worth
more than the run's memory: it survives sessions, machines, agents — and
it is what Gate 90's evidence review reads.
