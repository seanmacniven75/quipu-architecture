# Quipu Architecture — Implementation Guide

**Version:** 1.0.0  
**Author:** Dr. Sean MacNiven  
**Date:** March 2026

---

## 1. Data Model

### 1.1 Minimum Viable Schema (SQL/Prisma)

```prisma
model QuipuEvent {
  id              String   @id @default(cuid())
  sequenceNumber  Int      @unique @default(autoincrement())
  timestamp       DateTime @default(now())

  // Pendant Cord Assignment
  type            String   // Dot-separated hierarchical type
  typeLabel       String   // Human-readable label
  typeIcon        String?  // Icon identifier

  // Payload
  payload         Json     // Domain-specific event data
  summary         String   // One-line human description

  // Lineage
  parentEventId   String?
  parentEvent     QuipuEvent?  @relation("SubsidiaryCord", fields: [parentEventId], references: [id])
  childEvents     QuipuEvent[] @relation("SubsidiaryCord")
  initiatedBy     String       // "user" | "system" | "agent"
  agentId         String?

  // Entity Links
  entityRefs      EntityRef[]

  // Aggregation
  metaEventId     String?
  metaEvent       QuipuEvent?  @relation("Aggregation", fields: [metaEventId], references: [id])
  aggregatedEvents QuipuEvent[] @relation("Aggregation")

  // Scoping
  sessionId       String       // Groups events by work session
  userId          String       // The user whose timeline this belongs to

  @@index([sessionId, sequenceNumber])
  @@index([type])
  @@index([parentEventId])
  @@index([metaEventId])
}

model EntityRef {
  id           String     @id @default(cuid())
  eventId      String
  event        QuipuEvent @relation(fields: [eventId], references: [id])
  entityType   String     // Domain-specific entity type
  entityId     String     // ID in the persistent entity layer
  relationship String     // "created" | "updated" | "read" | "deleted" | "enriched"
  uri          String?

  @@index([entityType, entityId])
  @@index([eventId])
}
```

### 1.2 Indexing Strategy

The critical query patterns are:

1. **Full timeline:** `WHERE sessionId = ? ORDER BY sequenceNumber ASC`
2. **Pendant cord filter:** `WHERE sessionId = ? AND type LIKE ? ORDER BY sequenceNumber ASC`
3. **Entity history:** Join through `EntityRef` → `WHERE entityType = ? AND entityId = ? ORDER BY event.sequenceNumber ASC`
4. **Subsidiary expansion:** `WHERE parentEventId = ? ORDER BY sequenceNumber ASC`

All four patterns are covered by the indexes above.

---

## 2. Event Emission

### 2.1 Emitting Events (Backend)

Every action in the application should flow through a central event emitter:

```typescript
class QuipuEmitter {
  private sequenceCounter: number = 0;

  async emit(params: {
    type: string;
    typeLabel: string;
    typeIcon?: string;
    payload: Record<string, unknown>;
    summary: string;
    initiatedBy: "user" | "system" | "agent";
    agentId?: string;
    parentEventId?: string;
    entityRefs?: Array<{
      entityType: string;
      entityId: string;
      relationship: "created" | "updated" | "read" | "deleted" | "enriched";
      uri?: string;
    }>;
    sessionId: string;
    userId: string;
  }): Promise<QuipuEvent> {
    // Sequence number is assigned atomically by the database (autoincrement)
    // This guarantees the locking knot invariant
    const event = await prisma.quipuEvent.create({
      data: {
        ...params,
        payload: params.payload,
        entityRefs: params.entityRefs
          ? { create: params.entityRefs }
          : undefined,
      },
      include: { entityRefs: true },
    });

    // Broadcast to connected clients for real-time timeline updates
    this.broadcast(event);

    return event;
  }

  private broadcast(event: QuipuEvent): void {
    // WebSocket, SSE, or polling — implementation-specific
    // The client receives the event and appends it to the timeline
  }
}
```

### 2.2 Parallel Collapse Pattern

When multiple agents or background tasks complete simultaneously:

```typescript
// The user's request is a single event
const requestEvent = await emitter.emit({
  type: "agent.request",
  summary: "User requested full essay analysis",
  initiatedBy: "user",
  // ...
});

// Background tasks run in parallel
const [references, scores] = await Promise.all([
  extractReferences(essay),
  scoreEssay(essay),
]);

// Results are logged as sequential subsidiary events
await emitter.emit({
  type: "reference.extract",
  summary: `Extracted ${references.length} references`,
  parentEventId: requestEvent.id,
  initiatedBy: "agent",
  // ...
});

await emitter.emit({
  type: "grading.score",
  summary: "Scored 5 criteria against active rubric",
  parentEventId: requestEvent.id,
  initiatedBy: "agent",
  // ...
});
```

From the user's perspective: one request event, then two subsidiary results. The parallelism is invisible.

---

## 3. UI Components

### 3.1 Primary Cord (Timeline View)

The timeline is a vertically scrolling list of event cards. Each card shows:

- **Timestamp** (relative or absolute, user preference)
- **Type icon and label** (colour-coded by pendant cord)
- **Summary text**
- **Expand/collapse control** (if the event has child events or is a meta-event)
- **Entity links** (clickable chips for each referenced entity)

```
┌─────────────────────────────────────────────────┐
│ 10:32 AM  [📄 Grading]  Scored Essay #4         │
│   "Upper Merit across 4/5 criteria"             │
│   [Knowledge ▸] [Argument ▸] [Sources ▸]       │
│   ↳ 2 subsidiary events                         │
├─────────────────────────────────────────────────┤
│ 10:31 AM  [📚 References]  Extracted 8 refs     │
│   "Smith et al. 2022, Jones 2021, ..."          │
│   [Smith2022 ▸] [Jones2021 ▸]                   │
├─────────────────────────────────────────────────┤
│ 10:30 AM  [⚙️ System]  Essay #4 uploaded        │
│   "PDF, 3,200 words, submitted by Student D"    │
└─────────────────────────────────────────────────┘
```

### 3.2 Pendant Cord Navigation Bar

A horizontal bar (or sidebar) showing discovered pendant cord types as filter chips:

```
[ All ] [ 📄 Grading (12) ] [ 📚 References (8) ] [ 🎯 Calibration (5) ] [ ⚙️ System (3) ]
```

- Each chip shows the type label, icon, and event count
- Chips appear **dynamically** as new types are discovered
- Active filters are visually highlighted
- Clicking a chip toggles the filter
- Multiple chips can be active simultaneously (OR logic)

### 3.3 Gap Indicators

When a pendant cord filter is active, hidden events are represented by gap indicators:

```
┌─────────────────────────────────────────────────┐
│ 10:45 AM  [📚 References]  Enriched Smith2022   │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤
│           4 other events · click to expand       │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤
│ 10:31 AM  [📚 References]  Extracted 8 refs     │
└─────────────────────────────────────────────────┘
```

Clicking "4 other events" either:
- Expands them inline (showing the full timeline segment), or
- Clears the filter entirely

### 3.4 Entity Detail Panel

When a user clicks an entity reference chip (e.g., [Smith2022 ▸]), a side panel opens showing:

- The entity's current state (full reference data, enrichment notes, etc.)
- A mini-timeline of all events that have referenced this entity
- Actions: "Enrich", "Annotate", "Flag"

Any action taken in the entity panel generates a new event on the primary cord timeline.

---

## 4. Real-Time Updates

### 4.1 WebSocket Protocol

New events are pushed to connected clients via WebSocket. The client appends each event to the timeline in sequence order. If events arrive out of order (rare, but possible with network jitter), the client re-sorts by `sequenceNumber`.

### 4.2 Pendant Cord Registration

When the client receives an event with a previously unseen top-level type:

1. Add a new chip to the pendant cord navigation bar
2. Animate the chip's appearance (subtle fade-in or slide)
3. Optionally pulse the chip briefly to draw attention

This is the "spontaneous button" experience.

---

## 5. Integration Patterns

### 5.1 With Event-Sourced Backends

Quipu Architecture complements event sourcing. The event store is the backend source of truth; the Quipu timeline is the user-facing projection. The mapping is:

- **Domain event** (backend) → **QuipuEvent** (frontend) via a transformer that adds `typeLabel`, `summary`, `typeIcon`, and `entityRefs`
- Not all domain events need to be surfaced as QuipuEvents — only those meaningful to the user

### 5.2 With AI Agents and Agentic Frameworks

Quipu Architecture is designed as the native presentation layer for agentic AI workflows. AI agents emit events through the same `QuipuEmitter` as human actions, creating a unified timeline where the user can see, filter, and audit everything that happened — regardless of whether a human or an agent did it.

**Agent event emission pattern:**

```typescript
// Wrap any agent framework (LangChain, CrewAI, AutoGen, custom) 
// with QuipuEmitter calls

async function agentGradeEssay(essay: Essay, emitter: QuipuEmitter, sessionId: string) {
  // Agent starts work — visible on the timeline
  const startEvent = await emitter.emit({
    type: "grading.agent_start",
    summary: `AI analysing Essay #${essay.id}`,
    initiatedBy: "agent",
    agentId: "xread-grading-v2",
    sessionId,
    payload: { essayId: essay.id, wordCount: essay.wordCount },
    entityRefs: [{ entityType: "essay", entityId: essay.id, relationship: "read" }],
  });

  // Agent does its work (any framework, any model)
  const result = await runAgentPipeline(essay);

  // Agent reports results — subsidiary to the start event
  await emitter.emit({
    type: "grading.score",
    summary: `Scored ${result.criteria.length} criteria: ${result.overallBand}`,
    initiatedBy: "agent",
    agentId: "xread-grading-v2",
    parentEventId: startEvent.id,
    sessionId,
    payload: result,
    entityRefs: result.criteria.map(c => ({
      entityType: "rubric_criterion",
      entityId: c.key,
      relationship: "read",
    })),
  });
}
```

**Key principles for agentic integration:**

1. **Every agent action gets an event.** Don't hide agent work behind a loading spinner. Emit events as the agent progresses — "started analysis," "extracted references," "scored criteria," "identified uncertainty." The user watches the agent work in real time on the timeline.

2. **Use `agentId` consistently.** When multiple agents collaborate (e.g., a grading agent and a reference-checking agent), their events interleave on the timeline but are distinguishable by `agentId`. The user can filter by specific agent.

3. **Agent-initiated pendant cords are powerful.** When an agent performs a new type of action (e.g., an epistemic query the system hasn't done before), a new pendant cord filter appears automatically. The user discovers the agent's expanding capabilities through the UI, not through documentation.

4. **Parallel agent work collapses cleanly.** Multiple agents running simultaneously produce events that resolve as subsidiary events under a single parent request. The user sees one coherent narrative, not a race condition.

5. **Agent transparency scales with filtering.** In a simple interaction, the user sees the full interleaved timeline. In a complex 200-event session, they can filter to see "just what the AI did" (`initiatedBy: "agent"`) or "just my decisions" (`initiatedBy: "user"`) or "just the outcomes" (specific pendant cord types).

**Compatibility:** Quipu Architecture is framework-agnostic. It works with LangChain, CrewAI, AutoGen, Semantic Kernel, bare API calls, or any custom agent framework. The `QuipuEmitter` is a thin wrapper — it doesn't constrain how agents are built, only how their actions are presented.

### 5.3 With Knowledge Graphs

Persistent entities can live in any storage system (relational DB, graph DB, document store). The `EntityRef` table provides the join layer. The Quipu timeline does not own the entities — it references them.

---

## 6. Accessibility Considerations

- **Screen readers:** Events should be announced chronologically. Pendant cord filters should be presented as toggleable landmark regions.
- **Keyboard navigation:** Arrow keys navigate between events; Tab moves between pendant cord filters; Enter expands/collapses meta-events.
- **Colour independence:** Pendant cord types should be distinguished by icon and label, not colour alone.

---

## 7. Performance Considerations

- **Pagination:** For long timelines, load events in pages (e.g., 50 at a time) with infinite scroll
- **Pendant cord counts:** Maintain running counts per type in memory rather than re-querying on each filter change
- **Meta-event expansion:** Lazy-load child events when a meta-event is expanded
- **Entity detail panel:** Lazy-load entity state and event history on open

---

## Changelog

- **1.1.0** (March 2026): Expanded Section 5.2 with comprehensive agentic AI integration guidance, framework-agnostic agent emission patterns, and multi-agent interleaving principles.
- **1.0.0** (March 2026): Initial implementation guide
