# Example: Project Management

**Domain:** Cross-functional product development project  
**Application:** Project management platform  
**Conformance Level:** Level 4 (Bundled Quipu)

---

## The Project Is the Quipu

In traditional project management tools, work is fragmented by design. Tasks live in a board or Gantt chart. Discussions live in comments threads attached to individual tasks. Documents live in a linked drive. Decisions live in meeting notes. Risks live in a register. Status updates live in weekly reports. The project manager spends half their time not managing the project but reconstructing its narrative — stitching together what happened, why, and what it means for what comes next.

In Quipu Architecture, **the project is the primary cord.** Every task completion, decision, blocker, scope change, stakeholder communication, risk event, and milestone is a knot on a single timeline. The project's story unfolds chronologically. The PM doesn't write a status report — they select pendant cords and the report composes itself. A new team member doesn't read a briefing document — they scroll the timeline and filter by the cords relevant to their role.

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | Project created |
| `task` | Tasks | ✅ | First task created, assigned, or completed |
| `decision` | Decisions | ⚖️ | First decision or approval event |
| `blocker` | Blockers | 🚫 | First impediment or dependency issue |
| `scope` | Scope | 📐 | First scope change, feature request, or cut |
| `stakeholder` | Stakeholder | 📣 | First client or executive communication |
| `risk` | Risks | ⚠️ | First risk identified or materialised |
| `milestone` | Milestones | 🏁 | First milestone reached or missed |
| `resource` | Resources | 👥 | First team change, allocation, or capacity event |
| `retrospective` | Retrospective | 🔄 | First sprint retro, lessons learned, or process change |

---

## Sample Timeline: Project ATLAS

**Project:** ATLAS — Customer-facing analytics dashboard  
**Team:** 6 engineers, 1 designer, 1 PM  
**Duration shown:** Sprint 3 of 8 (critical mid-project period)  
**Client:** Meridian Financial Group

```
#1  [⚙️ System]        Sprint 3 started. Velocity target: 34 points.
                        Focus: real-time data pipeline + chart rendering.
                        → entityRefs: [sprint:3 CREATED]

#2  [✅ Task]           Backend: Real-time WebSocket endpoint — STARTED
                        Assignee: Yuki. Estimate: 8 points.
                        → entityRefs: [feature:realtime_pipeline READ]

#3  [✅ Task]           Frontend: Chart component library — STARTED
                        Assignee: Carlos. Estimate: 5 points.
                        → entityRefs: [feature:chart_rendering READ]

#4  [✅ Task]           Design: Dashboard layout v2 — COMPLETED
                        Assignee: Amara. Delivered: interactive prototype.
                        Stakeholder review scheduled for Thursday.
                        → entityRefs: [deliverable:dashboard_v2_prototype CREATED]

#5  [🚫 Blocker]       Yuki: WebSocket library incompatible with current
                        auth middleware. Needs either library swap or
                        middleware refactor. Estimated delay: 2–3 days.
                        → Pendant cord "Blockers" appears
                        → entityRefs: [feature:realtime_pipeline READ]

#6  [⚖️ Decision]      PM Nina + Tech Lead Sami: Decided to swap WebSocket
                        library (Socket.io → ws) rather than refactor auth.
                        Rationale: lower risk, auth middleware used by
                        3 other services.
                        → Pendant cord "Decisions" appears
                        → parentEventId: #5

#7  [✅ Task]           Backend: WebSocket library swap — STARTED
                        Assignee: Yuki. Re-estimate: 3 points (was 0).
                        → parentEventId: #6
                        Sprint velocity impact: +3 points unplanned work.

#8  [📣 Stakeholder]   PM Nina: Sprint 3 mid-sprint update to Meridian.
                        "Real-time pipeline on track with minor library
                        adjustment. Dashboard prototype ready for review
                        Thursday. No impact to Sprint 4 timeline."
                        → Pendant cord "Stakeholder" appears

#9  [📐 Scope]         Meridian (VP Analytics, David): "Can we add
                        export-to-PDF for the dashboard charts? Our
                        compliance team needs it for quarterly reporting."
                        → Pendant cord "Scope" appears
                        → entityRefs: [feature:pdf_export CREATED]

#10 [📐 Scope]         PM Nina: Scoped PDF export — 8 points.
                        Cannot fit in Sprint 3 (velocity already stretched).
                        Proposed: Sprint 5, after core dashboard stable.
                        → parentEventId: #9
                        → entityRefs: [feature:pdf_export UPDATED]

#11 [⚖️ Decision]      Nina + David (Meridian): Agreed to Sprint 5 for
                        PDF export. David: "Acceptable if we can see a
                        mockup in Sprint 4."
                        → parentEventId: #10

#12 [✅ Task]           Backend: WebSocket library swap — COMPLETED
                        Yuki: "ws library working. Auth passthrough
                        confirmed. 1 day ahead of re-estimate."
                        → entityRefs: [feature:realtime_pipeline READ]

#13 [🚫 Blocker]       Carlos: Chart rendering performance issue.
                        >2,000 data points causes 4-second render lag.
                        Client data sets average 8,000 points.
                        → entityRefs: [feature:chart_rendering READ]

#14 [⚖️ Decision]      Sami: Implement data decimation (server-side
                        downsampling to 500 visible points with zoom
                        detail-on-demand). Carlos to prototype.
                        → parentEventId: #13

#15 [⚠️ Risk]          PM Nina: Risk identified — if decimation approach
                        doesn't work, we may need to switch chart library
                        (Recharts → D3 direct). Estimated impact: +1 sprint.
                        → Pendant cord "Risks" appears
                        → entityRefs: [feature:chart_rendering READ]

#16 [✅ Task]           Frontend: Data decimation prototype — COMPLETED
                        Carlos: "Decimation working. 8,000 points renders
                        in 120ms. Zoom detail loads in <200ms."
                        → parentEventId: #14
                        → entityRefs: [feature:chart_rendering UPDATED]

#17 [⚠️ Risk]          Risk resolved: chart library swap not needed.
                        Decimation approach validated.
                        → parentEventId: #15

#18 [📣 Stakeholder]   Meridian design review (Thursday). Attendees:
                        David (VP Analytics), Priya (Product), 2 analysts.
                        Feedback: "Love the layout. Want the KPI cards
                        at the top to be customisable per user."
                        → entityRefs: [deliverable:dashboard_v2_prototype READ,
                           feature:customisable_kpi_cards CREATED]

#19 [📐 Scope]         PM Nina: KPI card customisation scoped at 5 points.
                        Small enough for Sprint 4 if we defer the
                        notification badge feature.
                        → entityRefs: [feature:customisable_kpi_cards UPDATED]

#20 [⚖️ Decision]      Nina + Sami + David: KPI customisation IN for
                        Sprint 4. Notification badge DEFERRED to Sprint 6.
                        → parentEventId: #19

#21 [👥 Resource]      Amara (designer) out sick Friday. Dashboard
                        design specs for Sprint 4 may be delayed 1 day.
                        → Pendant cord "Resources" appears
                        Mitigation: Carlos can work from prototype specs;
                        Amara to review Monday.

#22 [🏁 Milestone]     Sprint 3 complete. Delivered: 31/34 points (91%).
                        Carried over: 3 points (chart a11y improvements).
                        Key outcomes: real-time pipeline operational,
                        chart rendering validated, dashboard reviewed.
                        → Pendant cord "Milestones" appears
                        → entityRefs: [sprint:3 UPDATED]

#23 [🔄 Retrospective] Sprint 3 retro. Key themes:
                        + Library swap decision was fast and effective
                        + Stakeholder review cadence working well
                        - Blocker identification could be earlier (Yuki
                          discovered WebSocket issue on day 2, should
                          have been caught in sprint planning)
                        Action: Add "dependency check" step to sprint
                        planning checklist.
                        → Pendant cord "Retrospective" appears
```

---

## Pendant Cord Views

### Executive Status Report: [🏁 Milestones] + [📣 Stakeholder] + [⚠️ Risk]

What the client sponsor needs — milestones, what they've been told, and what could go wrong:

```
#8   Mid-sprint update: on track, minor library adjustment
     ─ ─ ─ 9 other events ─ ─ ─
#15  Risk: chart library swap possible (+1 sprint)
     ─ ─ ─ 1 other event ─ ─ ─
#17  Risk resolved: decimation validated
#18  Design review: positive feedback, KPI customisation requested
     ─ ─ ─ 3 other events ─ ─ ─
#22  Sprint 3: 91% velocity, pipeline + charts delivered
```

Five events. Complete executive picture.

### Technical Debt & Decision Log: [⚖️ Decisions] + [🚫 Blockers]

For a new engineer joining mid-project — "why is the codebase shaped this way?":

```
#5   Blocker: WebSocket library ↔ auth middleware incompatibility
  #6   └─ Decision: swap Socket.io → ws (lower risk than auth refactor)
     ─ ─ ─ 6 other events ─ ─ ─
#13  Blocker: chart rendering >4s at 2,000+ data points
  #14  └─ Decision: server-side decimation (500 visible + zoom detail)
     ─ ─ ─ 5 other events ─ ─ ─
#20  Decision: KPI customisation IN (Sprint 4), notifications DEFERRED (Sprint 6)
```

Five events. The new engineer understands every architectural decision and what forced it — without reading Slack history or asking "why did we use ws instead of Socket.io?"

### Scope Change Narrative: [📐 Scope] + [⚖️ Decisions]

For a product owner tracking feature evolution:

```
#9   Meridian requested PDF export for compliance
  #10  └─ Scoped at 8 points, proposed Sprint 5
  #11  └─ Agreed: Sprint 5, mockup in Sprint 4
     ─ ─ ─ 6 other events ─ ─ ─
#18  Design review: KPI card customisation requested
  #19  └─ Scoped at 5 points, trades against notification badge
  #20  └─ Agreed: KPI IN (Sprint 4), notifications DEFERRED (Sprint 6)
```

Six events. Every scope change is traceable: who requested it, when, what it cost, and what was traded. No "scope creep" — just documented scope evolution.

### Sprint Health: [✅ Tasks] + [🚫 Blockers] + [🏁 Milestones]

For the PM's own sprint retrospective preparation:

```
#2   WebSocket endpoint STARTED (Yuki, 8pts)
#3   Chart library STARTED (Carlos, 5pts)
#4   Dashboard layout COMPLETED (Amara)
#5   BLOCKER: WebSocket ↔ auth incompatibility
  #7   └─ Library swap STARTED (+3pts unplanned)
  #12  └─ Library swap COMPLETED (1 day ahead)
#13  BLOCKER: Chart rendering performance
  #16  └─ Decimation prototype COMPLETED (validated)
#22  Sprint complete: 31/34 points (91%)
```

Eight events. The sprint's full story: what was planned, what broke, how it was fixed, what was delivered.

---

## Sub-Action Discovery

Clicking `[✅ Tasks]` reveals:

```
[ ✅ Tasks (8) ▾ ]
  [ Started (3) ] [ Completed (4) ] [ Carried Over (1) ]
```

Clicking `[📐 Scope]` reveals:

```
[ 📐 Scope (3) ▾ ]
  [ Requested (2) ] [ Scoped (2) ] [ Deferred (1) ]
```

---

## Quipu Bundle: Portfolio Health

A Head of Engineering bundles all active projects:

**Bundle:** "Active Projects — Sprint 3 Performance"

```
Configuration:
  pendantCordTypes: ["milestone", "blocker", "risk"]
  dateRange: { from: "2026-02-24", to: "2026-03-07" }
  userIds: all PMs
  accessLevel: "organisation"
```

**Bundle view:**

```
Feb 25  [🏁 ATLAS]     Sprint 3: 91% velocity
Feb 25  [🚫 ATLAS]     2 blockers (both resolved in-sprint)
Feb 26  [🏁 BEACON]    Sprint 3: 78% velocity
Feb 26  [🚫 BEACON]    1 blocker (unresolved, carried to Sprint 4)
Feb 26  [⚠️ BEACON]    Risk: API partner delayed — potential 2-week slip
Feb 27  [🏁 CIPHER]    Sprint 3: 100% velocity
Mar 1   [🏁 DELTA]     Sprint 3: 65% velocity
Mar 1   [🚫 DELTA]     3 blockers (1 resolved, 2 carried)
Mar 1   [⚠️ DELTA]     Risk: key engineer departing — knowledge transfer needed
        ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
        Aggregate: 4 projects
        Avg velocity: 83.5%
        Projects at risk: 2 (BEACON, DELTA)
        Unresolved blockers: 3 (1 BEACON, 2 DELTA)
        Action: DELTA needs immediate PM attention (low velocity + departing engineer)
```

The Head of Engineering sees portfolio health in one view. No one wrote a rollup report. The quipus told the story.

---

## Narrative Composition: The "Why We're Late" Story

When a project slips, the PM shift-clicks `[🚫 Blockers]` + `[📐 Scope]` + `[👥 Resources]` + `[🏁 Milestones]` to compose:

**Story:** "What caused the delay"

This narrative — automatically composed from the timeline — shows every blocker, every scope change, every resource gap, and every milestone miss in sequence. It answers "why are we late?" with evidence, not opinion. The PM presents this in a stakeholder meeting and every claim is traceable to a timestamped event.

---

## Why Project Management Is a Natural Fit

Projects are inherently:

1. **Linear** — sprints, phases, and milestones unfold in sequence
2. **Multi-actor** — engineers, designers, PMs, stakeholders, clients, and leadership all contribute events
3. **Multi-audience** — the client sees milestones and scope decisions; engineers see blockers and technical decisions; leadership sees risks and velocity; new joiners need the decision log
4. **Decision-heavy** — every architectural choice, scope trade, and priority call is an event with context and rationale
5. **Retrospectively valuable** — "why did we make this decision?" is answerable by scrolling to the decision event and reading its parent blocker
6. **Bundleable** — portfolio health, cross-project risk patterns, and velocity trends emerge from bundles

The project is the quipu. The status report is a pendant cord view. The portfolio dashboard is a bundle.
