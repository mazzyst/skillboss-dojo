# Roll out without a cliff

**Hall:** Containers & Kubernetes · **Blanks:** 3 · **Par:** 2m00s

Every deploy briefly drops traffic: all old pods die before the new ones are warm. Make the rollout seamless — and reversible.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
strategy:
  type: RollingUpdate
  rollingUpdate:
    ______________: 1        # extra pod allowed ABOVE the desired count
    maxUnavailable: 0        # never dip below capacity
lifecycle:
  # give the LB time to remove the pod BEFORE the process dies
  preStop: { exec: { command: ["sleep", "5"] } }
# something is wrong in prod — go back NOW, no rebuild:
$ kubectl rollout ________ deployment/api
$ kubectl rollout ________ deployment/api   # watch it converge
```

## The pool

`history` · `maxReady` · `maxSurge` · `replicas` · `restart` · `rollback` · `status` · `undo`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The knob that lets a NEW pod come up before an old one goes down.
2. The rollout verb that returns to the previous ReplicaSet.
3. The verb that WATCHES the rollout until it settles (or fails).

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `maxSurge` |
| 2 | `undo` |
| 3 | `status` |

**Why it matters**

1. **`maxSurge`** — maxSurge:1 with maxUnavailable:0 means capacity never drops: each new pod must be Ready before an old one is terminated.
2. **`undo`** — rollout undo re-points the Deployment at the previous revision — the fastest reversal, no image rebuild, no pipeline run.
3. **`status`** — rollout status blocks until the rollout converges and exits non-zero on failure — the difference between "I ran undo" and "the undo worked".

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
