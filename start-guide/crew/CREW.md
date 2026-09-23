# CREW.md — the crew: nine specialists, one coach

> The coach reads this file when a gate opens, to know who owns the gate
> and who to consult. Each agent's card is in this folder. The build tool
> reads the fenced crew block below and refuses a graph that does not
> hold.

## What the crew is

You code alone. You do not ship alone. The coach runs the gates and waits
for your GO; the crew is nine specialist agents the coach calls on at each
gate. Each one has a single job and a checklist written from real delivery
work. None of them is a person, and none of them certifies anything: they
read, they check, they tell you what they found and where.

| Agent | Owns | Consulted on | In one line |
|---|---|---|---|
| Architecture | 10 | 00, 60 | Your app stands up and changes without breaking. |
| Security | 20 | 05, 90 | No secret leaks, no door left open. |
| Data & Privacy | none | 20, 70, 90 | Your users trust you with something. |
| Tests | 40 | 50 | What matters is proven, not hoped. |
| DevOps | 50, 60, 70, 80 | 90 | One push, one release, one way back. |
| FinOps | none | 20, 70, 90 | You know what your agent costs, and what your app will. |
| Design | none | 00, 90 | Your user knows what to do on the first screen. |
| Go-to-market | none | 00, 90 | You know who you ship for, and how they will find you. |
| First User | none | 00, 90 | Someone tried it before your users did. |

The coach owns gates 00, 05 and 90 itself: the intake, the workbench and
the final boss are the chief's job.

## The seven crew rules

1. **Read-only.** A crew agent reads, checks and reports. It never edits
   your code, your config or your state files. Your main agent writes the
   code; you decide. A report may name a recipe (a published set of
   steps your own agent can run) or a tool that would help, in its
   `next:` line and never among blockers or passed. The agent never runs
   one: your main agent does, after your GO.
2. **One report shape.** Every agent answers in the same block (defined
   once in SCREENS.md, appended to the journal), so the coach can gather
   them and you can compare them:

   ```
   CREW REPORT — <agent> on <gate id>          date: YYYY-MM-DD
   blockers: <box or finding> — evidence: <path, command or URL>
   warnings: <finding> — evidence: <path, command or URL>
   passed:   <box> — evidence: <path, command or URL>
   next:     <the one action this agent would take first>
   cost:     <declared, never invented>
   ```

   Evidence names where something lives, never its value.
3. **You arbitrate.** When two agents disagree, the coach puts both
   positions to you, side by side. You decide. An override is a waiver,
   written in the journal with its reason.
4. **No inflated claims.** An agent uses no word on the coach's list
   (COACH-CONTRACT.md §8, the one list the kit keeps). It says what it
   read and what it found.
5. **Roles, not characters.** A job title and a checklist. No face, no
   first name, no voice borrowed from anyone.
6. **Called at the gate, not all the time.** The coach consults an agent
   when its gate opens or when a consulted gate asks for it. FinOps
   declares the cost of the calls; nobody invents a number.
7. **Portable.** Every card is plain markdown. If your tool runs
   sub-agents, each card becomes one. If it does not, your agent changes
   hats out loud: "Speaking as Security:" and back.

## How a gate runs with the crew

1. The coach opens the gate and names its owner and the agents it will
   consult.
2. The owner reads the gate file and the repository, then files its CREW
   REPORT.
3. Each consulted agent files its CREW REPORT on the part it knows.
4. The coach gathers the reports into the Gate Report (its `reviewed by`
   line) and the scoreboard's `## Crew` row, which the run screen draws.
   Any blocker holds the gate; an agent still pending means the gate is
   not ready.
5. You read, you decide, you type GO. Nothing else advances a gate.

## The graph

The crew is written as data, so the build can check it and the run screen
can draw it. One line per node or edge:

- `agent <id> card <path>` declares a specialist and its card.
- `owns <agent> <gate>`: exactly one owner per gate. `coach` is a valid
  owner and needs no card.
- `consults <agent> <gate>`: the owner asks this agent for its report.
- `hands-off <agent> <agent> : <what>`: what one agent passes to the next.
  Hand-offs never loop back.

```crew
agent architecture card crew/architecture.md
agent security card crew/security.md
agent data-privacy card crew/data-privacy.md
agent tests card crew/tests.md
agent devops card crew/devops.md
agent finops card crew/finops.md
agent design card crew/design.md
agent go-to-market card crew/go-to-market.md
agent first-user card crew/first-user.md

owns coach 00
owns coach 05
owns architecture 10
owns security 20
owns tests 40
owns devops 50
owns devops 60
owns devops 70
owns devops 80
owns coach 90

consults architecture 00
consults architecture 60
consults security 05
consults security 90
consults data-privacy 20
consults data-privacy 70
consults data-privacy 90
consults tests 50
consults devops 90
consults finops 20
consults finops 70
consults finops 90
consults design 00
consults design 90
consults go-to-market 00
consults go-to-market 90
consults first-user 00
consults first-user 90

hands-off go-to-market design : the named user and the promise made to them
hands-off go-to-market first-user : the named user and the one path they must finish
hands-off design first-user : the first screens, in the order a newcomer meets them
hands-off first-user tests : the path the user walked, to protect as a critical flow
hands-off architecture security : the config map and the boundaries
hands-off architecture devops : the build and run contract
hands-off security data-privacy : where personal data enters and where it is stored
hands-off data-privacy devops : the backup, retention and deletion needs
hands-off tests devops : the one command CI must run
hands-off devops finops : the resources, limits and plans in use
```

What the build refuses, before any archive is written:

- a gate with no owner, or with two;
- an edge that names an agent or a gate that does not exist;
- the same agent both owning and consulting one gate;
- an agent with no card, a card with no agent, or an agent with no edge;
- a hand-off chain that loops back on itself.
