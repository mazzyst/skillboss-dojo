# Page on burn, not on blips

**Hall:** SRE & Observability · **Blanks:** 3 · **Par:** 2m00s

On-call is drowning in alerts that auto-resolve in a minute. Make the page mean something.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
alert: ApiErrorBudgetBurn
expr: error_rate > 14.4 * slo_target   # fast-______ threshold
for: ______                             # sustained, not a blip
labels:
  severity: ________                    # wake a human ONLY for user pain
```

## The pool

`0s` · `1h` · `5m` · `burn` · `info` · `page` · `rate` · `spike` · `ticket`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. You alert on how fast the error BUDGET is being consumed.
2. Long enough to outlive a blip, short enough to catch a fire.
3. The severity that wakes someone — reserve it for user-visible pain.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `burn` |
| 2 | `5m` |
| 3 | `page` |

**Why it matters**

1. **`burn`** — Burn-rate alerting ties paging to the SLO: 14.4× burn means the monthly budget dies in ~2 days — that is worth a page.
2. **`5m`** — The for: duration requires the condition to HOLD before firing; instant alerts on spiky signals are the noise you are killing.
3. **`page`** — Paging severity is a contract: if it can wait for morning it is a ticket, not a page — alert fatigue is how real pages get missed.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
