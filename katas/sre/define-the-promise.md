# Define the promise

**Hall:** SRE & Observability · **Blanks:** 3 · **Par:** 2m00s

The team argues about "slowness" with no shared number. Write the SLO everyone can hold.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
slo:
  sli: "p95 latency < 300ms, measured at the ____________"
  # where the user's request first arrives — not inside the pod
  window: ______ rolling             # outlives one bad hour and one lucky day
  target: 99.9%                      # a deliberate promise, not a wish
error_budget_policy:
  budget_left: ship features
  budget_spent: freeze risky ________, pay down reliability
```

## The pool

`1h` · `30d` · `5m` · `alerts` · `database` · `deploys` · `load balancer` · `pod` · `rollbacks`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Measure where the user's request first arrives — not inside the pod.
2. A window that outlives one bad hour and one lucky day.
3. When the budget is gone, the risky CHANGES pause — reliability work does not.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `load balancer` |
| 2 | `30d` |
| 3 | `deploys` |

**Why it matters**

1. **`load balancer`** — Measuring at the edge includes network, TLS and queueing — what users actually feel; a pod-side histogram flatters the number.
2. **`30d`** — A 30-day rolling window smooths blips into a trend and matches the cadence budgets are discussed on; an hour window whipsaws the policy.
3. **`deploys`** — The budget-spent clause trades feature velocity for stability: pausing risky releases is the enforcement that makes the SLO a contract, not a poster.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
