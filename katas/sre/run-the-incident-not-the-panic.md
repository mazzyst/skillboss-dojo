# Run the incident, not the panic

**Hall:** SRE & Observability · **Blanks:** 3 · **Par:** 2m00s

Sev1: checkout is down, eight people are typing in the channel and nobody knows who decides. Give the incident a shape.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
incident_roles:
  ____________: owns decisions and delegation — does NOT debug
  ops_lead: hands on the system, executes the mitigation
  comms: posts updates every 15 min — stakeholders stay OUT of the channel
first_move: "________ the user impact, then find the root cause"
after_resolve:
  postmortem: ____________                  # causes and systems, never names
  timeline: from the channel log, with timestamps
```

## The pool

`blameless` · `confidential` · `diagnose` · `escalate` · `incident commander` · `manager-led` · `mitigate` · `scribe`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. One named role holds the decisions — and keeps their hands OFF the keyboard.
2. Stop the bleeding first — understanding can wait, users cannot.
3. The postmortem style that makes people tell the truth about what happened.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `incident commander` |
| 2 | `mitigate` |
| 3 | `blameless` |

**Why it matters**

1. **`incident commander`** — The incident commander coordinates: with decisions centralized and delegation explicit, eight helpers become a team instead of a mob. The IC who also debugs does neither well.
2. **`mitigate`** — Mitigation (rollback, failover, feature-flag off) restores service before diagnosis: root cause is for the postmortem, not for the outage window.
3. **`blameless`** — A blameless postmortem targets systems and safeguards, not individuals — the only conditions under which the real timeline surfaces and the same failure stops repeating.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
