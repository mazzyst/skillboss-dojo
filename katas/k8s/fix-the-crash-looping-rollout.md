# Fix the crash-looping rollout

**Hall:** Containers & Kubernetes · **Blanks:** 3 · **Par:** 2m00s

Prod pods restart forever and the service sends traffic to dead containers. Repair the probes.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
containers:
  - name: api
    ______________:            # restart the container when this fails
      httpGet: { path: /health, port: 8080 }
      initialDelaySeconds: ______   # let the app boot before judging it
    ______________:            # gate TRAFFIC, do not restart
      httpGet: { path: /ready, port: 8080 }
```

## The pool

`0` · `1` · `30` · `healthCheck` · `livenessProbe` · `readinessProbe` · `restartPolicy` · `startupProbe` · `terminationGracePeriodSeconds`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The probe whose failure RESTARTS the container.
2. Judging a JVM at second one guarantees a loop. Give boot time its window.
3. The probe that controls whether the SERVICE sends you requests.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `livenessProbe` |
| 2 | `30` |
| 3 | `readinessProbe` |

**Why it matters**

1. **`livenessProbe`** — Liveness answers "is this process beyond saving?" — kubelet restarts the container when it fails.
2. **`30`** — An initial delay covers startup: probing before the app can answer manufactures the very crash-loop you are fixing.
3. **`readinessProbe`** — Readiness gates traffic only: a not-ready pod is removed from endpoints but NOT restarted — the two probes answer different questions.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
