# Quipu Architecture — Specification

**Version:** 1.0.0  
**Author:** Dr. Sean MacNiven  
**Date:** March 2026
**DOI:** *10.5281/zenodo.18941708*

---

## 1. Event Schema

Every action in a Quipu-compliant system produces an **event**. Events are the atomic unit of the architecture. They are immutable once created.

### 1.1 Core Event Structure

```typescript
interface QuipuEvent {
  // Identity
  id: string;                          // Unique event identifier
  timestamp: string;                   // ISO-8601, position on primary cord
  sequenceNumber: number;              // Monotonically increasing, guarantees ordering

  // Pendant Cord Assignment
  type: string;                        // Action type (e.g., "grading", "reference.extract", "calibration")
  typeLabel: string;                   // Human-readable label (e.g., "Reference Extraction")
  typeIcon?: string;                   // Icon identifier for the pendant cord filter button

  // Payload (The Knot)
  payload: Record<string, unknown>;    // Domain-specific event data
  summary: string;                     // One-line human-readable description

  // Lineage
  parentEventId?: string;              // Subsidiary cord — links to parent event
  initiatedBy: "user" | "system" | "agent";  // Who created this event
  agentId?: string;                    // If agent-initiated, which agent

  // Persistent Entity Links
  entityRefs?: EntityReference[];      // Links to persistent entities affected by this event

  // Aggregation
  metaEventId?: string;                // If this event has been aggregated into a meta-event
  childEventIds?: string[];            // If this IS a meta-event, its constituent events
  isExpanded?: boolean;                // UI state: whether a meta-event is showing its children
}
```

### 1.2 Entity Reference Structure

Events can link bidirectionally to persistent entities (knowledge graph nodes, statistical models, documents, etc.).

```typescript
interface EntityReference {
  entityType: string;                  // e.g., "reference", "rubric_criterion", "grader_belief"
  entityId: string;                    // Unique identifier in the persistent layer
  relationship: "created" | "updated" | "read" | "deleted" | "enriched";
  uri?: string;                        // Optional: deep link to the entity
}
```

### 1.3 Event Type Naming Convention

Event types use dot-separated hierarchical naming, enabling filtering at multiple levels of specificity:

```
grading                          → All grading events
grading.score                    → Score assignment events
grading.score.override           → Manual score override events
grading.feedback                 → Post-grade feedback events

reference                        → All reference events
reference.extract                → Reference extraction events
reference.enrich                 → Reference enrichment events
reference.enrich.annotation      → Specific annotation enrichments

calibration                      → All calibration events
calibration.rubric_feedback      → Per-rubric slider feedback
calibration.epistemic_query      → System-initiated calibration questions
calibration.voice_update         → Grading voice prior updates
```

Filtering on `reference` captures all events whose type starts with `reference.`. Filtering on `reference.enrich` captures only enrichment events. This mirrors the quipu's colour grouping — a broad colour captures a category; a specific shade captures a subcategory.

---

## 2. Primary Cord (Timeline)

### 2.1 Ordering Guarantee

Events are strictly ordered by `sequenceNumber`. The `timestamp` field records wall-clock time but is not used for ordering (clocks can drift; sequence numbers cannot). Two events can share a timestamp but never a sequence number.

### 2.2 Parallel Collapse Rule

When multiple background processes execute in parallel (e.g., an AI agent extracting references and scoring an essay simultaneously), their outputs are logged as **a single composite event** or as **sequential events with the same parent**. The user never sees simultaneous events on the primary cord.

**Option A — Composite Event:**
```typescript
{
  type: "agent.batch_complete",
  summary: "xRead extracted 12 references and scored 5 criteria",
  childEventIds: ["evt_ref_extract_001", "evt_score_001"],
  // The child events exist but are hidden unless the user expands this meta-event
}
```

**Option B — Sequential with Shared Parent:**
```typescript
// Event 1
{ sequenceNumber: 42, type: "reference.extract", parentEventId: "evt_request_001", ... }
// Event 2
{ sequenceNumber: 43, type: "grading.score", parentEventId: "evt_request_001", ... }
// Both belong to the same user request (evt_request_001)
```

Both options preserve the single-line property. The choice depends on whether the domain benefits from showing the sub-actions (Option B) or treating them as a unit (Option A).

### 2.3 Agentic AI Events

Quipu Architecture is designed as the native UI pattern for agentic AI workflows — applications where AI agents act autonomously or semi-autonomously alongside human users.

**Agent events are first-class citizens.** An agent's actions are logged on the same primary cord as the user's actions, using the same event schema. The `initiatedBy` field distinguishes the actor:

```typescript
// Human action
{ type: "grading.score", initiatedBy: "user", summary: "Manually scored Essay #4" }

// Agent action
{ type: "grading.score", initiatedBy: "agent", agentId: "xread-grading-v2", summary: "AI scored Essay #4" }

// System action
{ type: "sla.threshold", initiatedBy: "system", summary: "SLA 4hr warning triggered" }
```

**This unification solves five problems with current agentic AI interfaces:**

1. **Visibility:** The user can see exactly what the agent did, when, and in what sequence — without navigating to a separate "agent log" or "activity" panel.

2. **Interleaving:** Human and agent actions appear in their true chronological order. If the user corrected an agent's output, the correction appears immediately after the agent's event — the causal chain is preserved.

3. **Filtering:** The user can isolate agent actions by filtering on `initiatedBy: "agent"` (or by agent-specific pendant cord types). This answers "what has the AI done so far?" in one click.

4. **Auditability:** In regulated domains (medical, financial, legal, academic), the interleaved timeline provides a complete audit trail of human oversight over agent actions. Every agent decision and every human override is on the same cord.

5. **Emergent capability discovery:** When an agent gains a new tool or capability and uses it for the first time, a new pendant cord type appears dynamically. The user discovers what the agent can do by seeing it act — not by reading a feature list.

---

## 3. Pendant Cords (Action Type Filtering)

### 3.1 Dynamic Discovery Protocol

When the event stream receives an event whose `type` (at the top level, before the first dot) has not been seen before in the current session, the UI must:

1. Register the new pendant cord type
2. Generate a filter affordance (button, chip, or icon) in the pendant cord navigation area
3. Assign the affordance the event's `typeLabel` and `typeIcon`
4. Make the affordance immediately interactive

This is the "spontaneous button" behaviour. The UI does not predefine which pendant cords exist. They emerge from the event stream.

### 3.2 Filter Projection Protocol

When a user activates a pendant cord filter:

1. The timeline view **retains its chronological structure** but **hides events that do not match the filter**
2. Visible events remain anchored to their original position — they do not reflow to fill gaps
3. A **gap indicator** (e.g., a subtle dotted line or collapsed region marker) shows where hidden events exist between visible ones
4. The gap indicator may optionally show a count: "3 other events between these"
5. Clicking the gap indicator restores the hidden events (equivalent to pulling the string straight)

### 3.3 Multi-Filter Behaviour

Multiple pendant cord filters can be active simultaneously. When two or more filters are active:

- Events matching **any** active filter are shown (OR logic)
- The filter affordances visually indicate which are active
- Deactivating all filters restores the full timeline

Hierarchical filtering follows the dot-separated naming convention: activating `reference` shows all `reference.*` events. Activating `reference.enrich` shows only enrichment events within the reference category.

### 3.4 Sub-Action Discovery

When a user clicks a pendant cord filter button, the system inspects the filtered events for **sub-action types** (the next level in the dot-separated hierarchy). If sub-actions exist, they appear as secondary filter buttons nested beneath the parent.

**Example:** The user clicks `[📄 Grading]`. The timeline filters to show all grading events. The system discovers that grading events contain sub-types: `grading.score`, `grading.override`, `grading.citation_check`. These appear as secondary buttons:

```
[ 📄 Grading (12) ▾ ]
  [ Score (8) ] [ Override (2) ] [ Citation Check (2) ]
```

This is recursive — clicking `[Citation Check]` might reveal further sub-types if they exist. Sub-action buttons only appear when their parent pendant cord is active, maintaining the progressive disclosure principle: complexity emerges as the user explores, never before.

### 3.5 Narrative Composition (Multi-Select)

Users can **shift-click** multiple pendant cord filter buttons (at any level) to compose a custom cross-type projection. This enables the construction of **narrative views** — stories that span multiple action types.

**Interaction pattern:**
- Single click: toggle one pendant cord filter (standard behaviour)
- Shift-click: add a pendant cord filter to the current selection without deactivating others
- The resulting view shows events matching **any** of the selected types (OR logic), preserving chronological order

**Example:** A grader shift-clicks `[📚 References]` and `[🎯 Calibration]`. The timeline now shows: all reference extraction and enrichment events interleaved with all calibration feedback and belief update events — telling the story of "how my references and my calibration evolved together."

**Narrative Saving:** A multi-select composition can optionally be saved as a **named narrative** — a reusable filter preset. Saved narratives appear as additional pendant cord buttons with a distinct visual treatment (e.g., dashed border or custom icon). This enables users to define workflows like:

- "My Grading Flow" = `grading.score` + `calibration.rubric_feedback` + `calibration.epistemic_query`
- "Reference Deep Dive" = `reference.extract` + `reference.enrich` + `grading.citation_check`

Saved narratives are stored per-user and persist across sessions.

**Sequence pattern capture:** When recurring sequences of action types emerge (e.g., A-B-C-D repeated across multiple grading sessions), the system may suggest a named narrative automatically: "You often follow Grading → Calibration → Reference Check → Voice Update. Save this as a workflow?"

---

## 4. Subsidiary Cords (Event Nesting)

### 4.1 Parent-Child Relationships

Any event can be the parent of subsidiary events. A subsidiary event has a `parentEventId` pointing to its parent. Subsidiary events appear on the primary cord timeline (they have their own `sequenceNumber`) but can optionally be visually nested under their parent in the UI.

Use cases:
- An enrichment event is subsidiary to the extraction event it enriches
- A calibration feedback event is subsidiary to the grading event it rates
- An error or correction event is subsidiary to the event it corrects

### 4.2 Depth Limits

Subsidiary nesting should be limited to **3 levels** in the UI to prevent visual complexity overload. Deeper nesting can exist in the data model but should be flattened in the presentation layer.

---

## 5. Persistent Entity Layer

### 5.1 Bidirectional Linkage

Events reference persistent entities via `entityRefs`. Persistent entities maintain a reverse index of all events that have referenced them. This enables two navigation patterns:

- **Event → Entity:** "This event enriched Reference A. Click to see Reference A's full state."
- **Entity → Events:** "Reference A has been touched by 7 events. Click to see its history."

The entity-to-events view is itself a **pendant cord projection** — it filters the timeline to show only events linked to a specific entity.

### 5.2 Entity Types

Quipu Architecture does not prescribe the structure of persistent entities. They are domain-specific. Examples:

- **Academic grading:** References, rubric criteria, grader belief models, student profiles
- **Editorial workflow:** Manuscripts, reviewer assignments, revision requests
- **Research:** Literature entries, datasets, analysis notebooks

The only requirement is that entities have a unique `entityId` and `entityType` that events can reference.

---

## 6. Composable Aggregation

### 6.1 Meta-Event Formation

A sequence of related events can be aggregated into a meta-event. Meta-events are created either:

- **Automatically:** By pattern detection (e.g., three consecutive `reference.enrich` events within 60 seconds → aggregate into "Reference Enrichment Session")
- **Manually:** By user action (e.g., selecting multiple events and choosing "Group these")
- **By convention:** The application defines aggregation rules for common patterns

### 6.2 Meta-Event Properties

A meta-event:
- Has its own `id`, `timestamp` (the timestamp of the first constituent event), and `sequenceNumber`
- Has `childEventIds` listing its constituent events
- Has a `type` of `meta.[original_type]` (e.g., `meta.reference.enrich`)
- Can be expanded (showing constituent events inline) or collapsed (showing only the summary)
- Does **not** replace its constituent events — they remain on the primary cord but are visually grouped

### 6.3 Recursive Aggregation

Meta-events can themselves be aggregated into higher-order meta-events. The hierarchy is:

```
Primary cord event (knot)
  → Meta-event (pendant cord loop)
    → Meta-meta-event (pendant cord bundle)
```

This maps to the quipu's subsidiary cord structure: a pendant cord can carry its own subsidiary cords, which carry further subsidiaries.

---

## 7. Quipu Bundles (Cross-User Aggregation)

Historically, Incan administrators bundled multiple quipus together on a single primary cord for cross-regional analysis. A quipucamayoc in Cusco could gather quipus from different provinces — each with its own pendant cords and knots — and read across them by colour to extract empire-wide totals for a given category (e.g., "all agricultural output across all provinces").

Quipu Bundles bring this same principle to software: **multiple users' timelines, queried through a shared pendant cord type, producing a cross-user aggregate view.**

### 7.1 Bundle Definition

A Quipu Bundle is a read-only, cross-user projection that:

1. Selects a **pendant cord type** (e.g., `grading.score`, `calibration.rubric_feedback`)
2. Queries across **multiple users' event streams** (each user's quipu)
3. Returns a **unified view** where events from different users are interleaved chronologically, tagged by originating user

```typescript
interface QuipuBundle {
  id: string;
  name: string;                        // e.g., "Grammar Ratings — All Graders"
  description?: string;
  
  // Scope
  pendantCordTypes: string[];          // Which event types to include
  userIds: string[];                   // Which users' quipus to bundle
  
  // Optional filters
  dateRange?: { from: string; to: string };
  entityFilter?: {                     // e.g., only events referencing a specific criterion
    entityType: string;
    entityId: string;
  };
  
  // Metadata
  createdBy: string;                   // The user who created the bundle
  createdAt: string;
  accessLevel: "private" | "team" | "organisation";
}
```

### 7.2 Bundle Views

A bundle produces a timeline where events from different users appear on the same primary cord, distinguished by a **user indicator** (colour, avatar, or label). The user can then:

- **Read chronologically:** See how Grammar ratings evolved across all graders over time
- **Filter by user:** Isolate one grader's events within the bundle (equivalent to pulling one quipu out of the bundle)
- **Compare:** Side-by-side view of two users' pendant cords for the same type
- **Aggregate:** Statistical summaries across the bundle (e.g., "average Grammar slider rating across all graders: 0.72")

```
Bundle: "Grammar Ratings — All Graders"
Pendant cord filter: calibration.rubric_feedback WHERE criterion = "grammar"

┌─────────────────────────────────────────────────────────┐
│ Mar 3  [🎯 Grader A]  Grammar → 0.85 (Spot on)         │
│ Mar 3  [🎯 Grader B]  Grammar → 0.40 (Off)             │
│ Mar 4  [🎯 Grader A]  Grammar → 0.90 (Spot on)         │
│ Mar 4  [🎯 Grader C]  Grammar → 0.55 (Mixed)           │
│ Mar 5  [🎯 Grader B]  Grammar → 0.65 (Getting there)   │
│ Mar 5  [🎯 Grader C]  Grammar → 0.70 (Getting there)   │
│         ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│         Aggregate: mean = 0.675, trend = improving ↑     │
└─────────────────────────────────────────────────────────┘
```

### 7.3 Bundle Permissions

Bundles involve reading across users' event streams. Access control is required:

- **Private bundles:** Only the creator can view. Useful for a lead grader reviewing their own team's data.
- **Team bundles:** Visible to all members of a defined team or cohort. Useful for calibration sessions where all graders should see how their peers rated.
- **Organisation bundles:** Visible to administrators. Useful for institutional quality assurance.

Individual events within a bundle retain their original user's ownership. The bundle is a **view**, not a copy — it queries the original event streams in real time.

### 7.4 Bundle Use Cases

| Use Case | Bundle Configuration |
|---|---|
| Inter-rater reliability analysis | All graders × `calibration.rubric_feedback` × specific criterion |
| Reference quality across cohort | All graders × `reference.enrich` × specific reference entity |
| Grading speed comparison | All graders × `grading.score` × date range |
| Calibration convergence | All graders × `calibration.*` × all criteria |
| Epistemic query patterns | All graders × `calibration.epistemic_query` |

### 7.5 Historical Precedent

The bundle concept maps directly to documented Incan administrative practice. Provincial quipucamayocs maintained local quipus for their regions. When empire-wide data was needed — for census, taxation, or military logistics — these quipus were physically bundled and transported to Cusco, where central administrators could read across them by pendant cord colour and knot type to compile aggregate statistics. The Quipu Bundle in software follows the same logic: local event streams (one per user) are logically bundled for cross-cutting analysis, without altering the original streams.

---

## 8. Locking Knot (Integrity Guarantee)

The "locking knot" is the architectural property that holds the entire structure together: **strict linear ordering via monotonic sequence numbers**. This is the single constraint that, if removed, would cause the architecture to "unravel."

### 8.1 Invariants

The following invariants must hold at all times:

1. **No gaps in sequence numbers.** If event N exists, event N-1 must also exist.
2. **No duplicate sequence numbers.** Each event occupies exactly one position.
3. **No retroactive insertion.** New events are always appended, never inserted between existing events. Corrections are modelled as new events that reference the corrected event via `parentEventId`.
4. **Pendant cord filters never alter sequence order.** Filtered views hide events but never reorder them.
5. **Meta-events do not remove constituent events.** Aggregation is a visual grouping, not a destructive operation.

These invariants guarantee that the primary cord can always be "pulled straight" — restoring the full chronological sequence from any filtered or aggregated view.

---

## 9. Conformance Levels

Implementations may claim conformance at four levels:

### Level 1 — Core Quipu
- Linear event timeline with monotonic sequencing
- Events have type, timestamp, payload, and summary
- Dynamic pendant cord discovery (filter buttons appear on first event of each type)
- Filtered view projections

### Level 2 — Full Quipu
- All of Level 1
- Subsidiary cords (parent-child event relationships)
- Sub-action discovery (secondary filter buttons for sub-types)
- Persistent entity linkage (bidirectional)
- Entity-based timeline projections

### Level 3 — Composable Quipu
- All of Level 2
- Meta-event aggregation (automatic and/or manual)
- Recursive aggregation
- Pattern-based aggregation rules
- Narrative composition (shift-click multi-select with optional saved narratives)

### Level 4 — Bundled Quipu
- All of Level 3
- Quipu Bundles (cross-user aggregation via shared pendant cord queries)
- Bundle permissions (private, team, organisation)
- Bundle aggregate statistics
- Sequence pattern capture and workflow suggestion

---

## Changelog

- **1.1.0** (March 2026): Added Sections 2.3 (Agentic AI Events), 3.4 (Sub-Action Discovery), 3.5 (Narrative Composition), 7 (Quipu Bundles). Added Level 4 conformance. Renumbered sections 7→8, 8→9.
- **1.0.0** (March 2026): Initial specification
