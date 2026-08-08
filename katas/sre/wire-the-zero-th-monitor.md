# Wire the zero-th monitor

**Hall:** SRE & Observability · **Blanks:** 3 · **Par:** 2m00s

A user just DM'd you: your app has been down for an hour. You had no idea — even though your agent wired a /health route that returns 200 when all is well. Add a scheduled check so you find out first next time.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
name: health-check
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Check health endpoint
        run: curl --____ https://my-app.example.com/____
      - name: Alert on failure
        if: ____
        run: echo "ALERT: health check failed" && exit 1
```

## The pool

`always()` · `api` · `fail` · `failure()` · `health` · `metrics` · `status` · `success()`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. By default, curl exits with code 0 even when the server returns an error status. You want the step to break the workflow whenever the server signals a problem — look for the flag name that matches that intent.
2. You need a dedicated URL path whose only job is to answer 'is the app alive?' — its name should make that purpose obvious to anyone reading the workflow.
3. This condition should make the alert step run only when the previous step did not succeed — GitHub Actions has a built-in function that expresses exactly that state.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `fail` |
| 2 | `health` |
| 3 | `failure()` |

**Why it matters**

1. **`fail`** — --fail tells curl to exit with a non-zero code when the server returns an HTTP error (4xx/5xx), so the workflow step fails and GitHub marks the run red. Without it, curl happily returns 0 on a 503 and your alert never fires.
2. **`health`** — The check must probe the route this app actually serves — the scenario says your agent wired /health, so that is the contract to test. Health-path conventions differ between apps (/status and /healthz are real ones you will meet elsewhere), which is why you read the app before guessing: probing a path it never registered returns 404 and the monitor cries wolf on every run. A path like / or /api can also return 200 while core services are broken; the dedicated health route answers only when the app is genuinely up.
3. **`failure()`** — failure() is the GitHub Actions built-in that evaluates to true when any earlier step in the job has failed. Using always() would fire the alert on every run, including healthy ones, flooding you with false alarms.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
