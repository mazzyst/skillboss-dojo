# Tame the shared state

**Hall:** Cloud & Infrastructure · **Blanks:** 3 · **Par:** 2m00s

Two engineers ran terraform apply at the same time and corrupted the state file. Never again.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
terraform {
  backend "s3" {
    bucket         = "tf-state-prod"
    key            = "network/terraform.tfstate"
    ______________ = "tf-locks"   # two applies must never interleave
    encrypt        = true
  }
}
# preview the diff and freeze it to a file
$ terraform ________ -out=tfplan
# ship EXACTLY the diff the reviewer read
$ terraform apply ______
```

## The pool

`dynamodb_table` · `lock_table` · `main.tf` · `output` · `plan` · `refresh` · `state_lock` · `tfplan` · `validate`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The backend needs a locking service — the bucket alone cannot serialize writers.
2. Preview the diff and freeze it to a file before anyone types apply.
3. Apply takes the frozen diff file — the one the reviewer actually read.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `dynamodb_table` |
| 2 | `plan` |
| 3 | `tfplan` |

**Why it matters**

1. **`dynamodb_table`** — The S3 backend takes a DynamoDB table for state locking: the second apply waits or fails cleanly instead of interleaving writes.
2. **`plan`** — plan -out captures the exact computed diff; reviewing a saved artifact beats trusting that nothing changed between review and apply.
3. **`tfplan`** — Applying the saved file guarantees the reviewed diff is what ships; a bare apply recomputes and may act on drift nobody saw.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
