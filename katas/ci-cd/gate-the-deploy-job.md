# Gate the deploy job

**Hall:** Pipelines & CI/CD · **Blanks:** 3 · **Par:** 2m00s

The deploy job sometimes runs before tests finish — and it leaks the token into logs. Wire the pipeline right.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
jobs:
  test:
    runs-on: ubuntu-latest
    steps: [ ./run-tests.sh ]
  deploy:
    ________: test              # never deploy untested code
    if: github.ref == 'refs/heads/main'
    steps:
      - run: ./deploy.sh
        env:
          TOKEN: ${{ ____________________ }}   # never a literal in YAML
    environment: ____________
```

## The pool

`depends_on` · `env.DEPLOY_TOKEN` · `needs` · `production` · `requires` · `runs-after` · `secrets.DEPLOY_TOKEN` · `staging` · `vars.DEPLOY_TOKEN`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The keyword that makes one job WAIT for another.
2. The store whose values are masked in logs and never committed.
3. Naming the target unlocks protection rules and approvals.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `needs` |
| 2 | `secrets.DEPLOY_TOKEN` |
| 3 | `production` |

**Why it matters**

1. **`needs`** — needs declares a dependency between jobs: deploy is queued only after test succeeds — ordering by luck is not a gate.
2. **`secrets.DEPLOY_TOKEN`** — Secrets are injected from the platform vault and masked in output; env literals end up in the repo and the logs.
3. **`production`** — Declaring the environment attaches its protection rules (reviewers, wait timers) and scopes environment secrets to it.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
