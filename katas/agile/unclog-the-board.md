# Unclog the board

**Hall:** Agile & Team Flow · **Blanks:** 3 · **Par:** 2m00s

Everything is "in progress" and nothing ships. Fix the team flow policy.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
flow_policy:
  in_progress: { ________: 3 }        # stop starting, start finishing
  done_means: "______________________" # no partial credit
  daily_sync:
    timebox_minutes: ______            # standup, not status theater
    focus: "flow of work, not persons"
```

## The pool

`15` · `5` · `60` · `is merged to main` · `meets the Definition of Done` · `passes code review` · `story_points` · `velocity_target` · `wip_limit`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The lever that forces finishing before starting.
2. Not "code complete" — the shared, checkable bar.
3. Long enough to sync the plan, short enough to stay standing.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `wip_limit` |
| 2 | `meets the Definition of Done` |
| 3 | `15` |

**Why it matters**

1. **`wip_limit`** — A WIP limit caps parallel work so the team swarms to finish items; without it "in progress" becomes a parking lot.
2. **`meets the Definition of Done`** — The Definition of Done is the explicit team contract for "shippable"; anything less counts unfinished work as finished.
3. **`15`** — The daily sync is timeboxed to 15 minutes — a planning pulse for the day, not a status meeting that drifts.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
