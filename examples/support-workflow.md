# Example: Customer Support Workflow

**Domain:** Product support case management  
**Application:** Multi-channel support platform  
**Conformance Level:** Level 4 (Bundled Quipu)

---

## The Case File Is the Quipu

In traditional support systems, a case file is a container — a folder holding tickets, emails, chat logs, internal notes, and status changes in separate tabs or panels. The agent switches between "Customer Messages," "Internal Notes," "Activity Log," and "Linked Articles" to piece together what happened.

In Quipu Architecture, **the case file is the primary cord.** Every interaction — customer message, agent response, system escalation, internal note, knowledge base lookup, SLA trigger, resolution attempt — is a knot on a single timeline. The case file doesn't *contain* a history; it *is* the history. Open the case and you see the full chronological narrative. Filter by pendant cord type and you isolate one dimension (e.g., only customer-facing messages, or only internal deliberation).

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | Case creation |
| `customer` | Customer | 💬 | First customer message or interaction |
| `agent` | Agent Response | 🎧 | First agent reply |
| `internal` | Internal Notes | 🔒 | First internal-only note or discussion |
| `escalation` | Escalation | 🔺 | First escalation event |
| `knowledge` | Knowledge Base | 📖 | First KB article linked or consulted |
| `diagnostic` | Diagnostics | 🔧 | First diagnostic action (log pull, test, repro attempt) |
| `sla` | SLA | ⏱️ | First SLA threshold event |
| `resolution` | Resolution | ✅ | First resolution proposal or closure |

---

## Sample Timeline: Case #4892

**Customer:** Maria Chen, Enterprise tier  
**Product:** CloudSync Pro — file synchronisation platform  
**Issue:** Selective sync silently dropping files in shared team folders

```
#1  [⚙️ System]       Case #4892 created via web form
                       Priority: High (Enterprise tier, data integrity issue)
                       → entityRefs: [customer:maria_chen READ, product:cloudsync_pro READ]

#2  [💬 Customer]      Maria: "Files are disappearing from our shared Marketing
                       folder. We've lost 3 client presentations this week. 
                       This is affecting live projects."
                       → Pendant cord "Customer" appears

#3  [⚙️ System]       Auto-tagged: data_loss, selective_sync, shared_folders
                       SLA clock started: 4hr response (Enterprise)
                       → entityRefs: [sla:enterprise_4hr CREATED]

#4  [🎧 Agent]        Agent Tomás (Tier 1) assigned
                       → Pendant cord "Agent Response" appears

#5  [🎧 Agent]        Tomás to Maria: "I understand this is urgent — losing
                       client presentations is serious. Let me investigate
                       immediately. Can you confirm which OS versions your
                       team is running?"
                       → entityRefs: [customer:maria_chen READ]

#6  [💬 Customer]      Maria: "Mix of Windows 11 and macOS Sonoma. The
                       Marketing team is 8 people. It seems to only happen
                       when someone edits a file while another person has
                       it open."

#7  [🔧 Diagnostics]   Tomás pulled sync logs for Marketing folder
                       → Pendant cord "Diagnostics" appears
                       → entityRefs: [diagnostic:sync_log_4892 CREATED]
                       Result: 14 sync conflict events in last 7 days,
                       all involving concurrent edits on .pptx files

#8  [🔧 Diagnostics]   Tomás ran conflict resolution trace
                       → parentEventId: #7
                       → entityRefs: [diagnostic:sync_log_4892 ENRICHED]
                       Result: Conflict resolver defaulting to "last write wins"
                       but failing silently when both clients are on v3.8.2

#9  [📖 Knowledge]     Tomás searched KB: "selective sync conflict resolution"
                       → Pendant cord "Knowledge Base" appears
                       Found: KB-2891 "Known issue: concurrent edit conflict
                       in v3.8.x on shared folders"
                       → entityRefs: [kb:KB-2891 READ]

#10 [🔒 Internal]      Tomás note: "This matches KB-2891. The fix is in v3.9.0
                       which ships next week. Customer is Enterprise tier and
                       has lost client deliverables — may need interim workaround
                       or early access to patch."
                       → Pendant cord "Internal Notes" appears

#11 [🎧 Agent]         Tomás to Maria: "I've identified the issue. It's a known
                       conflict resolution bug in your current version when two
                       people edit the same file simultaneously. A fix ships in
                       our next release. In the meantime, I can enable a
                       server-side lock feature for your shared folders —
                       it'll prevent simultaneous edits but protect your files.
                       Would that work as an interim solution?"

#12 [💬 Customer]      Maria: "Yes, please enable that immediately. But we also
                       need to recover the lost files if possible."

#13 [🔺 Escalation]    Tomás escalated to Tier 2 (Data Recovery)
                       → Pendant cord "Escalation" appears
                       Reason: Customer requesting file recovery, requires
                       backend access
                       → entityRefs: [case:4892 UPDATED]

#14 [⚙️ System]        Agent Priya (Tier 2, Data Recovery) assigned

#15 [🔧 Diagnostics]   Priya queried server-side version history
                       → entityRefs: [diagnostic:recovery_trace_4892 CREATED]
                       Result: 3 .pptx files recoverable from server snapshots
                       (24hr, 48hr, 72hr retention)

#16 [🔒 Internal]      Priya note: "All 3 files recoverable. The 72hr snapshot
                       has the pre-corruption version of the oldest file.
                       Restoring to a staging folder first so customer can
                       verify before we push to production."

#17 [🔧 Diagnostics]   Priya restored 3 files to staging folder
                       → parentEventId: #15
                       → entityRefs: [diagnostic:recovery_trace_4892 ENRICHED]

#18 [🎧 Agent]         Priya to Maria: "I've recovered all 3 presentations.
                       They're in a 'Recovered Files' folder in your Marketing
                       shared drive. Can you verify they're the right versions?"

#19 [💬 Customer]      Maria: "Checked — all 3 are correct. Thank you! When
                       does the permanent fix ship?"

#20 [🎧 Agent]         Tomás to Maria: "The fix is in v3.9.0, releasing March 17.
                       I've also enabled the server-side file locking for your
                       account as an interim measure. You'll see a lock icon
                       when a teammate has a file open. I'll follow up after
                       the release to confirm everything is resolved."

#21 [⏱️ SLA]           SLA check: first response delivered in 22 minutes
                       (target: 4 hours). Resolution delivered in 3.4 hours.
                       → Pendant cord "SLA" appears
                       → entityRefs: [sla:enterprise_4hr UPDATED]
                       Status: ✅ Within SLA

#22 [✅ Resolution]     Interim resolution: server-side file locking enabled,
                       3 files recovered. Permanent fix: v3.9.0 (March 17).
                       Follow-up scheduled.
                       → Pendant cord "Resolution" appears
                       → entityRefs: [case:4892 UPDATED]
                       Status: Resolved (pending permanent fix)

--- One week later ---

#23 [⚙️ System]        v3.9.0 released

#24 [🎧 Agent]         Tomás to Maria: "v3.9.0 is now live. The conflict
                       resolution fix is included. Your team should update
                       and I'll disable the file locking once you confirm
                       everything's working."

#25 [💬 Customer]      Maria: "Updated across the team. No issues in 3 days.
                       You can disable the locking. Thank you — this was
                       handled really well."

#26 [✅ Resolution]     Permanent resolution confirmed. File locking disabled.
                       Case closed.
                       → entityRefs: [case:4892 UPDATED, kb:KB-2891 UPDATED]
                       → KB-2891 updated: added customer confirmation of fix

#27 [⚙️ System]        Case #4892 closed. Total duration: 10 days.
                       Customer satisfaction: ⭐⭐⭐⭐⭐ (5/5)
```

---

## Pendant Cord Views

### Customer-Facing View: [💬 Customer] + [🎧 Agent]

This is what the customer sees in their portal — only the conversation, stripped of internal notes, diagnostics, and escalations:

```
#2   Maria: "Files are disappearing..."
#5   Tomás: "I understand this is urgent..."
#6   Maria: "Mix of Windows 11 and macOS Sonoma..."
#11  Tomás: "I've identified the issue..."
#12  Maria: "Yes, please enable that immediately..."
#18  Priya: "I've recovered all 3 presentations..."
#19  Maria: "Checked — all 3 are correct..."
#20  Tomás: "The fix is in v3.9.0..."
#24  Tomás: "v3.9.0 is now live..."
#25  Maria: "Updated across the team. No issues..."
```

Ten events. Clean narrative. The customer sees a coherent story of their problem being understood, diagnosed, and resolved — without any of the internal machinery.

### Internal Investigation View: [🔧 Diagnostics] + [🔒 Internal] + [📖 Knowledge]

This is what a team lead reviewing the case sees — only the technical investigation:

```
#7   Sync logs pulled: 14 conflict events in 7 days
  #8   └─ Conflict resolution trace: v3.8.2 silent failure
#9   KB search: found KB-2891 (known issue)
#10  Tomás: "Matches KB-2891. Fix in v3.9.0. Need interim solution."
     ─ ─ ─ 4 other events ─ ─ ─
#15  Server-side version history: 3 files recoverable
#16  Priya: "All 3 recoverable. Restoring to staging first."
  #17  └─ Restored 3 files to staging
```

Seven events. The diagnostic narrative — from log pull to root cause to recovery — without any customer conversation or SLA noise.

### Escalation Audit: [🔺 Escalation] + [⏱️ SLA]

This is what quality assurance reviews:

```
     ─ ─ ─ 12 other events ─ ─ ─
#13  Escalated to Tier 2 (Data Recovery)
     ─ ─ ─ 7 other events ─ ─ ─
#21  SLA: 22min first response (target: 4hr) ✅
     3.4hr resolution (within target) ✅
```

Two events. Instant audit trail.

---

## Sub-Action Discovery

Clicking `[🔧 Diagnostics]` reveals sub-action buttons:

```
[ 🔧 Diagnostics (4) ▾ ]
  [ Sync Logs (2) ] [ Recovery (2) ]
```

Clicking `[Sync Logs]` isolates just the log analysis events (#7, #8). Clicking `[Recovery]` isolates the file recovery events (#15, #17).

---

## Narrative Composition

An agent preparing a handoff shift-clicks `[💬 Customer]` + `[🔧 Diagnostics]` + `[🔺 Escalation]` to compose:

**Story:** "What the customer reported, what we found, and where it was escalated"

```
#2   Maria: "Files are disappearing..."
     ─ ─ ─ 4 other events ─ ─ ─
#7   Sync logs: 14 conflict events
  #8   └─ v3.8.2 silent failure identified
     ─ ─ ─ 3 other events ─ ─ ─
#12  Maria: "Yes, please enable that immediately..."
#13  Escalated to Tier 2 (Data Recovery)
     ─ ─ ─ 1 other event ─ ─ ─
#15  Server history: 3 files recoverable
     ─ ─ ─ 3 other events ─ ─ ─
#19  Maria: "All 3 are correct."
```

This composition tells a complete handoff story in 8 events that would otherwise require reading all 27.

---

## Entity Linkage

### Entity: kb:KB-2891 ("Concurrent edit conflict in v3.8.x")

```
Event History:
#9   READ       — Tomás found during investigation of Case #4892
#26  UPDATED    — Customer confirmation of fix added after v3.9.0 release

Linked Cases: [Case #4892] [Case #4710] [Case #5023]
Status: Resolved in v3.9.0
```

The KB article is a persistent entity in the knowledge graph. Every case that references it enriches it — adding customer confirmations, edge cases, workarounds. A support manager clicking on KB-2891 sees its full provenance across all cases, not just the current one.

### Entity: customer:maria_chen

```
Event History (across all cases):
Case #4892  — 10 interactions, resolved, 5/5 satisfaction
Case #4201  — 3 interactions, resolved, 4/5 satisfaction
Case #3887  — 6 interactions, resolved, 5/5 satisfaction

Tier: Enterprise
Total cases: 3
Avg resolution: 4.2 days
Sentiment trend: stable positive
```

The customer entity spans all quipus (cases). Any agent opening a new case for Maria immediately sees her history — not just a ticket count, but the full pendant-cord-filterable narrative of every past interaction.

---

## Quipu Bundle: Cross-Case Product Intelligence

A product manager creates a bundle to understand the scope of the sync conflict issue:

**Bundle:** "Selective Sync Conflict — All Cases"

```
Configuration:
  pendantCordTypes: ["diagnostic.*", "resolution"]
  entityFilter: { entityType: "kb", entityId: "KB-2891" }
  userIds: ["agent_tomas", "agent_priya", "agent_kenji", "agent_sara"]
  dateRange: { from: "2026-01-01", to: "2026-03-10" }
  accessLevel: "organisation"
```

**Bundle view:**

```
Jan 15  [🔧 Kenji]    Case #4710: First report — macOS only
Jan 22  [🔧 Sara]     Case #4710: Reproduced on Windows 11
Feb 3   [✅ Kenji]     Case #4710: Workaround deployed (version pinning)
Feb 18  [🔧 Tomás]    Case #4892: 14 conflict events, cross-platform
Feb 18  [🔧 Tomás]    Case #4892: Root cause confirmed — v3.8.2
Feb 19  [✅ Priya]     Case #4892: 3 files recovered, interim lock enabled
Mar 1   [🔧 Sara]     Case #5023: Same issue, 2-person team
Mar 2   [✅ Sara]      Case #5023: Interim lock enabled
Mar 7   [✅ Tomás]     Case #4892: Permanent fix confirmed (v3.9.0)
        ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
        Aggregate: 3 cases, 4 agents, 12 diagnostic events
        First report → permanent fix: 51 days
        Customers affected: 3 (est. 22 end users)
        All cases resolved post v3.9.0
```

This bundle — constructed by a product manager, not an engineer — tells the entire lifecycle of a bug across all support cases, all agents, and all customers. No agent had to write a summary. The quipus told the story themselves.

---

## Why Support Is a Natural Fit for Quipu

Customer support cases are inherently:

1. **Linear** — events happen in sequence (customer reports, agent investigates, system escalates, resolution delivered)
2. **Multi-actor** — customers, agents, systems, and managers all contribute to the same narrative
3. **Multi-type** — the case involves communication, diagnostics, knowledge lookup, escalation, and resolution — all interleaved
4. **Cross-referencing** — cases link to KB articles, customer profiles, product versions, and other cases
5. **Auditable** — SLA compliance, escalation patterns, and resolution quality need to be reviewable
6. **Bundleable** — product teams need cross-case views by issue type, product area, or customer tier

Traditional support platforms scatter this information across tabs, panels, and linked tickets. The agent's mental model is fragmented — they must reconstruct the narrative by jumping between views. Quipu Architecture keeps the narrative intact on a single cord, filterable by concern, linkable to persistent knowledge, and bundleable across cases for organisational intelligence.

The case file isn't a container. It's a quipu.
