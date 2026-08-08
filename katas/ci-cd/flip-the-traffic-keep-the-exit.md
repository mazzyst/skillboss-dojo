# Flip the traffic, keep the exit

**Hall:** Pipelines & CI/CD · **Blanks:** 3 · **Par:** 2m00s

Deploys mean 10 minutes of downtime and rollback means a rebuild. Ship the blue-green way.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
strategy: blue_green
# blue is serving production right now
steps:
  - deploy the new build to ______        # the idle copy
  - run smoke tests against it directly
  - ______ traffic to it                  # the atomic moment
rollback: point traffic back — no rebuild, seconds not minutes
db_migrations: ________ only              # add columns, never drop or rename
# old and new code run side by side during the flip
```

## The pool

`additive` · `blue` · `canary` · `destructive` · `drain` · `green` · `manual` · `rebuild` · `switch`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Two identical environments; ship to the one NOT taking traffic.
2. The cutover is a router decision, not a redeploy.
3. Old code must keep running against the new schema mid-flip.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `green` |
| 2 | `switch` |
| 3 | `additive` |

**Why it matters**

1. **`green`** — With blue live, green is the idle twin: you deploy and verify there with zero user exposure before any traffic moves.
2. **`switch`** — Switching traffic at the load balancer makes the release atomic and reversible — the old environment stays warm as the instant exit.
3. **`additive`** — Additive migrations (add, never drop/rename) keep the schema valid for BOTH versions while they coexist — the expand half of expand-contract.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
