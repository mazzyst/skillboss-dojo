# Gate 80 — OBSERVABILITY

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: in production, what you cannot see, your users see for you. This
gate makes the system answer three questions — is it up, is it erroring,
is it slow — in under two minutes, before the first real incident asks
them for you.

## Guardrails

- **A health endpoint with a contract.** It reports the app's version and
  checks its real dependencies (database, critical services), and every
  deploy verifies it before declaring success. Train the reflex:
  https://skillboss.dev/demo/health
- **Structured logs.** One event per line, machine-parseable, with
  request context — and never a secret or personal data in a log line.
  Logs are the flight recorder; they must be readable after the crash and
  safe to hand to anyone debugging.
- **Unhandled errors reach a human.** An error-tracking channel exists so
  the builder learns about a crash before a user reports it. Train it:
  https://skillboss.dev/demo/error-monitoring
- **The three-questions test.** Up, erroring, slow — each answerable in
  under two minutes, from a dashboard, a status page, or two known
  commands. If answering requires archaeology, this gate holds.
- **Alert on symptoms, and every alert is actionable.** Users-facing
  symptoms (availability, error rate, latency) page; internal causes
  inform. An alert nobody acts on is deleted, not muted.
- **An external uptime check.** Something outside your infrastructure
  probes the health endpoint — the monitor must not share fate with the
  system it watches. Abuse-shaped load is part of what it will surface:
  https://skillboss.dev/demo/rate-limiting

Profile note: with no deploy target yet, active-lite — the health
contract and log discipline are designed now; the alerting and uptime
boxes wait for a target and are recorded n/a-with-reason.

## Villains at this gate

The house names the failures these boxes hold back — ten in all, one per
Ship Check system, each with a drill that is free and needs no signup.
Faced here one at a time; faced together at Gate 90.

- **THE SILENT CRASH** — an app that is down and nobody knows. Drill: https://skillboss.dev/demo/health
- **THE 3AM PAGE** — an error that reaches a user before a human. Drill: https://skillboss.dev/demo/error-monitoring
- **THE FLOOD** — abuse-shaped load with no limit. Drill: https://skillboss.dev/demo/rate-limiting

## Coach Play

Ask:

1. If the app went down right now, how would you find out — and how long
   would it take?
2. What was the last unhandled error in production, and where did it go?
3. Which log line would embarrass you in a screenshare? (secrets,
   personal data, noise)

Then: build the health endpoint to the contract, structure the logs and
sweep them for sensitive data, wire the error channel, set the
symptom alerts, and add the external check.

Refuse: a health endpoint that returns OK without checking dependencies;
logging a request body that carries credentials or personal data; an
alert channel that goes to a place nobody reads.

Definition of done: the three questions answerable in under two minutes,
with the evidence below.

## Evidence Checklist

- [ ] health-contract — evidence: the endpoint's path and a response
      showing version plus dependency checks; the deploy step that
      verifies it
- [ ] structured-logs — evidence: one real log line (redacted), and the
      logger configuration path
- [ ] no-sensitive-logs — evidence: the sweep over log statements for
      secrets and personal data, with its clean (or fixed) result
- [ ] errors-reach-human — evidence: where unhandled errors land, and one
      test event's arrival; n/a-with-reason per the profile
- [ ] three-questions-pass — evidence: the journal entry timing the three
      answers, each under two minutes
- [ ] external-uptime-check — evidence: the external monitor's target and
      interval; n/a-with-reason per the profile
