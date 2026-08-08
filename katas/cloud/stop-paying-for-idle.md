# Stop paying for idle

**Hall:** Cloud & Infrastructure · **Blanks:** 3 · **Par:** 2m00s

The cloud bill doubled; the culprit is a fleet sized for Black Friday running all year. Right-size it without risking the peak.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
autoscaling_group:
  min_size: 2
  desired: "follow the ______, not the peak"      # scale on load, not fear
  policy: target_tracking on cpu 60%
workloads:
  batch_jobs: "run on ________ instances"          # interruption-tolerant = cheap
  baseline_247: "cover with ________ pricing"      # commit to what never turns off
  dev_envs: "stop nights and weekends — a schedule, not a memo"
```

## The pool

`burstable` · `calendar` · `dedicated` · `demand` · `on-demand` · `preemptions` · `reserved` · `spot`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The autoscaler exists precisely so capacity can track THIS.
2. Deep-discount capacity the cloud can reclaim — fine for work that can restart.
3. A pricing commitment for the floor that runs 24/7 anyway.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `demand` |
| 2 | `spot` |
| 3 | `reserved` |

**Why it matters**

1. **`demand`** — Sizing for demand and letting target-tracking add capacity under load is the whole point of elasticity; sizing for the yearly peak burns the difference every quiet hour.
2. **`spot`** — Spot instances cost a fraction of on-demand but can be interrupted; batch jobs that checkpoint and retry are exactly the workload that tolerates it.
3. **`reserved`** — Reserved/committed pricing trades flexibility you were not using for a steep discount on the always-on baseline; on-demand is for the variable part above it.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
