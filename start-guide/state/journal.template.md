# state/journal.md — append-only

> Dated entries, newest at the bottom. Nothing here is ever edited or
> deleted; a correction is a new entry that says what it corrects. Gate
> Reports, decision records, waivers, parked asks, and RE-SCOPE deltas all
> land here, in the shapes below (defined once in SCREENS.md).

Entry shapes:

```
YYYY-MM-DD — DECISION: <title>
context: <two sentences>
options: <the real alternatives weighed>
choice: <what was chosen and why>
```

```
GATE REPORT — <gate id>              date: YYYY-MM-DD
boxes: [x] <box-id>   evidence: <path, command output, or URL — location, never value>
       [ ] <box-id>   status: OPEN — <what is missing>
waivers: <none, or SKIP lines quoted verbatim>
risks accepted by human: <none, or the list>
cost: <n sessions, ~n tokens - DECLARED by the coach, not measured; or unknown>
verdict: <GO-READY | HOLD (<n> box open)>
```

```
YYYY-MM-DD — WAIVER: SKIP <gate or box> because <reason, verbatim from the human>
```

```
YYYY-MM-DD — PARKED: <the ask, in the human's words> (revisit at gate NN)
```

```
YYYY-MM-DD — RE-SCOPE: <what changed in the mission, and the new GO>
```

---

<entries start here>
