# hooks/ — the rules that do not depend on memory

> Gate 05 installs these. Everything else in this kit is judgment your
> agent applies; these three guards are judgment the machine applies, on
> every commit and every push, whether anyone remembers them or not.

Why they exist: an agent reading a long contract follows it most of the
time, not all of the time — and "most of the time" is not a floor for
secrets, for a red test suite, or for a dependency slipped in unnoticed.
Those three moved here, into code.

## Install (one command, from your repo root)

```sh
sh start-guide/hooks/install.sh
```

It copies the guards into `.git/hooks/` and makes them executable. Hooks
live per clone and never travel in a commit: every machine runs this
once. Existing hooks are never silently replaced — the installer says so
and backs them up with `--force`.

## What each one does

| Guard | Runs on | Catches |
|---|---|---|
| `pre-commit` | every commit | an environment file staged, a credential-shaped string in the diff, a dependency change worth a second look |
| `pre-push` | every push | a red test suite — it runs YOUR one command, the same one CI runs |
| `post-commit` | every commit | nothing — it RENDERS. It rewrites `state/run-screen.md` and `.html` from your scoreboard |
| `ci-checks.yml` | every push, in CI | the same floor plus the history scan, because a secret deleted from the latest commit is still alive in an old one |

## The run screen

`post-commit` is the odd one out: it guards nothing, it shows. After
every commit it renders `state/scoreboard.md` into TWO views — the
coach's NEXT line at the top, the map with its legend, gates faced and
milestones done, the run belt and its next rung, the ten villains marked
as their gates are faced, what each gate caught, the waivers with their
reasons, the parked asks — plus the one line that matters when product
and safety cross (two milestones done while security is still open).
Every block is omitted when its data is absent; every fixed string it
prints is defined in SCREENS.md.

**`state/run-screen.md` is the one to keep open.** It is a plain file:
open it as a tab beside your code, and your editor reloads it every time
the hook rewrites it. The markdown preview renders it properly, `cat`
prints it in a terminal, and it needs no configuration in VS Code,
Cursor, JetBrains or Zed. A dashboard in another window is a dashboard
you do not look at.

**`state/run-screen.html`** is the same data for a browser tab, if you
prefer one. It carries a refresh tag, so each commit updates what you
see, with no server anywhere.

Both are local files that work offline, forever, and make no network
request — read the source and check.

## FinOps: measured on one side, declared on the other

The screens carry a FinOps block, and it never mixes two natures.

**Measured** is computed by the hook from git alone: days elapsed,
commits, files tracked, and commits since the last gate passed. Nothing
leaves your machine to obtain any of it.

**Declared** comes from the Cost table the coach fills in your scoreboard
at each Gate Report — sessions and tokens as YOUR tool reports them. This
kit has no telemetry: it cannot see your usage or your bill, so every
declared figure is labelled as declared wherever it is shown, and the
coach writes `unknown` rather than estimating. Ratios and counts only,
never a percentage.

It is a rendering, never a record: the scoreboard is the truth, and the
installer gitignores the screen so your commits stay clean. If rendering
ever fails, it writes a page saying so and lets the commit stand — a
screen is a passenger, never a guard.

## Warn first, block later

Every guard starts in `MODE="warn"`: it prints, it does not stop you.
That is deliberate — a hook that blocks on day one gets uninstalled by
day two. Move one to `MODE="block"` once you have seen it fire honestly:
edit the line at the top of `.git/hooks/pre-commit` or
`.git/hooks/pre-push`, or set `START_GUIDE_HOOK_MODE=block` in your
environment to switch both at once.

## What they never do

- They never print a secret's value — only where it lives.
- They never send anything anywhere. No network call, no telemetry.
- They never claim your project is secure. They catch three specific
  mistakes; the rest of the run is still yours to walk.

## The check command

`pre-push` and the CI file both want ONE command that runs lint and
tests (Gate 50: one command to green). Point them at yours by creating
`scripts/check.sh`, or set `START_GUIDE_CHECK`. Without it, the hook
tries your ecosystem's conventional command and, failing that, says so
and lets the push through — a guard that guesses wrong is worse than a
guard that admits it does not know.
