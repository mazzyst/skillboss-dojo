# Close the open bucket

**Hall:** Cloud & Infrastructure · **Blanks:** 3 · **Par:** 2m00s

Audit finding: the report bucket is world-readable. Lock it to the reporting role — and nothing more.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
{
  "Statement": [{
    "Effect": "________",
    "Principal": { "AWS": "arn:aws:iam::123456789012:role/____________" },
    "Action": "______________",
    "Resource": "arn:aws:s3:::reports/*"
  }]
}
```

## The pool

`Allow` · `Deny` · `admin` · `reporting-service` · `root` · `s3:*` · `s3:GetObject` · `s3:ListBucket` · `s3:PutObject`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. You are granting the ONE legitimate access, not blocking the world here.
2. The principal is the ROLE that needs the data — not a person, not root.
3. Least privilege: the reporting job only READS objects.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `Allow` |
| 2 | `reporting-service` |
| 3 | `s3:GetObject` |

**Why it matters**

1. **`Allow`** — Buckets are private by default once public access is blocked; the policy grants the single needed access — deny-by-default does the rest.
2. **`reporting-service`** — Scoping the principal to the workload role keeps access auditable and revocable; humans and root should never be in the data path.
3. **`s3:GetObject`** — s3:GetObject is the narrowest action that serves the need; s3:* or ListBucket would grant capability the job never uses.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
