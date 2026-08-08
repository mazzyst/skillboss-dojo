# Pick the next thing by evidence

**Hall:** Agile & Team Flow · **Blanks:** 3 · **Par:** 2m00s

Your agent shipped five features this week. Usage data shows two of them have zero clicks. Before the team commits to the next Sprint, you need a lightweight process to decide what actually goes in.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
# sprint-planning-checklist.md

## Before adding a story to the Sprint

- [ ] Check analytics: does the feature have real ____ data?
- [ ] Talk to at least one ____ user outside the team about how they use it today
- [ ] Write the acceptance criterion as a behavior change, not a UI change
- [ ] Estimate only stories the team has ____ to deliver this Sprint
## Outcome
- Sprint Goal reflects the ONE behavior the team wants to shift
```

## The pool

`capacity` · `commitment` · `deployment` · `feedback` · `internal` · `potential` · `real` · `usage` · `velocity`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Two features had zero interaction after shipping. The thing you should check for is whether anyone actually interacted with the feature — not whether it was built or deployed.
2. The scenario warns about building things nobody uses. Ask whose account of the product counts as evidence rather than politeness — and notice what the rest of the line already rules out.
3. Before committing to a list of stories, ask how much work the team can actually finish in the time available — not how much would be nice to have. The blank names that limit.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `usage` |
| 2 | `real` |
| 3 | `capacity` |

**Why it matters**

1. **`usage`** — 'usage' points to real interaction data (clicks, sessions, events). 'feedback' sounds good but is passive and easy to skip; 'deployment' only confirms the code shipped, not that anyone used it. The reflex is: if there is no interaction signal, you do not have evidence.
2. **`real`** — 'real' means an actual person who uses the product today. The line itself rules the near-misses out: 'outside the team' excludes internal users, who bias toward comfort over need, and 'how they use it today' excludes potential users, who have not felt the pain yet. One conversation like this beats a hundred survey responses from strangers.
3. **`capacity`** — 'capacity' is the bounded amount of work a team can genuinely complete in the Sprint. Estimating beyond it leaves stories half-finished and nothing shippable at the end. 'commitment' describes the pledge, not the constraint; 'velocity' is a historical average, not a guarantee for this Sprint.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
