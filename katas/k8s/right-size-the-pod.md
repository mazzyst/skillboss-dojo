# Right-size the pod

**Hall:** Containers & Kubernetes · **Blanks:** 3 · **Par:** 2m00s

Pods get OOM-killed at peak while the cluster sits half idle. Set the resource contract properly.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
containers:
  - name: api
    resources:
      ________:                    # what the scheduler sets aside on the node
        cpu: 250m
        memory: 256Mi
      ______:                      # the hard ceiling the kernel enforces
        memory: 512Mi
hpa:
  minReplicas: 2
  targetAverageUtilization: ______  # leave headroom for the spike, never aim at full
```

## The pool

`10` · `100` · `70` · `ceilings` · `guarantees` · `limits` · `quotas` · `requests` · `reservations`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. What the scheduler sets aside — the guarantee, not the ceiling.
2. The line the kernel enforces — memory past it is an OOM kill.
3. High enough to be efficient, low enough to absorb a spike before scale-up lands.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `requests` |
| 2 | `limits` |
| 3 | `70` |

**Why it matters**

1. **`requests`** — Requests are what scheduling and bin-packing count: too low and pods land on starved nodes, too high and the cluster idles.
2. **`limits`** — Limits cap consumption: exceeding the memory limit OOM-kills the container. Setting them tells you WHERE the ceiling is instead of finding it at peak.
3. **`70`** — Targeting ~70% keeps a buffer: new replicas take time to start, and a target at full capacity means the spike arrives before the help does.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
