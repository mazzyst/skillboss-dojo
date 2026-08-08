# Split the monster story

**Hall:** Agile & Team Flow · **Blanks:** 3 · **Par:** 2m00s

One "story" has been in progress for three weeks: build the whole reporting module. Cut it so something ships this sprint.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
story: "Reporting module"
split_policy:
  axis: "________ slices"        # each cut crosses UI, API and storage
  first_slice: "export ONE report as CSV, hardcoded filters"
  each_slice: "independently ____________ and demoable"
  anti_pattern: "build all the ______ first — data, then services, then UI"
```

## The pool

`backlogs` · `billable` · `horizontal` · `layers` · `reusable` · `sprints` · `valuable` · `vertical`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Cut through every layer of the stack, not along them.
2. The V in the INVEST checklist — each piece must matter on its own.
3. The horizontal anti-pattern: databases, then services, then screens.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `vertical` |
| 2 | `valuable` |
| 3 | `layers` |

**Why it matters**

1. **`vertical`** — A vertical slice delivers a thin end-to-end path a user can touch; layer-by-layer cuts produce nothing usable until the very end.
2. **`valuable`** — Each slice must carry user value by itself (INVEST): that is what lets the team ship, learn, and re-prioritize after every sprint instead of betting three weeks blind.
3. **`layers`** — Building all the layers first is the horizontal split: weeks of "progress" with zero shippable outcome and every integration risk saved for last.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
