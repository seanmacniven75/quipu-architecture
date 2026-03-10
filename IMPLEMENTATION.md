# Quipu Architecture — Quick Start

**Author:** Dr. Sean MacNiven  
**Date:** March 2026

---

## Minimum Implementation Checklist

To build a Level 1 (Core Quipu) compliant application, you need:

### Backend

1. **Event table** with `id`, `sequenceNumber` (autoincrement), `timestamp`, `type`, `payload`, `summary`, `initiatedBy`, `sessionId`, `userId`
2. **Event emitter** — a single function that all actions flow through to create events
3. **API endpoints:**
   - `GET /events?sessionId=X&type=Y` — fetch events, optionally filtered by pendant cord type
   - `GET /events/types?sessionId=X` — list discovered pendant cord types with counts
4. **Real-time push** — WebSocket or SSE to broadcast new events to connected clients

### Frontend

1. **Timeline component** — vertically scrolling list of event cards, ordered by `sequenceNumber`
2. **Pendant cord navigation bar** — horizontal chips that appear dynamically as new types are discovered
3. **Filter toggle logic** — clicking a chip filters the timeline; gap indicators show hidden event counts
4. **Event listener** — WebSocket/SSE client that appends new events to the timeline and registers new pendant cord types

### That's it for Level 1.

For Level 2, add:
- `parentEventId` field and subsidiary cord nesting in the UI
- `EntityRef` table and bidirectional entity-event navigation
- Entity detail panel with event history

For Level 3, add:
- Meta-event aggregation (automatic or manual)
- Aggregation pattern rules
- Expand/collapse UI for meta-events
- Narrative composition (shift-click multi-select with saved narratives)

For Level 4, add:
- Quipu Bundles (cross-user aggregation via shared pendant cord queries)
- Bundle permissions (private, team, organisation)
- Bundle aggregate statistics

---

## Technology Recommendations

Quipu Architecture is technology-agnostic. Any stack that supports ordered event storage and real-time push will work. Recommended starting points:

| Layer | Recommended | Alternatives |
|---|---|---|
| Database | PostgreSQL (with autoincrement for sequence) | SQLite, MongoDB (with manual sequence management) |
| ORM | Prisma | Drizzle, TypeORM, Sequelize |
| Backend | Node.js / Express or Fastify | Python / FastAPI, Go |
| Real-time | WebSocket (ws, Socket.io) | Server-Sent Events, polling |
| Frontend | React | Vue, Svelte, vanilla JS |
| State management | Zustand or Redux | Jotai, MobX |

---

## Common Pitfalls

1. **Don't use timestamps for ordering.** Clocks drift; sequence numbers don't. Use `sequenceNumber` for all ordering decisions.
2. **Don't predefine pendant cord types in the UI.** The whole point of dynamic discovery is that the interface reflects what has actually happened. Hardcoding tabs defeats the architecture.
3. **Don't let meta-events delete their children.** Aggregation is visual grouping, not data destruction. The constituent events must always be recoverable.
4. **Don't surface every backend event.** Not all domain events are meaningful to the user. Transform selectively — only emit QuipuEvents for actions the user would care about.
5. **Don't forget gap indicators.** A filtered view without gap indicators loses the sense of temporal position. The user should always know "these two visible events were not adjacent."

---

## Intellectual Property and Attribution

Quipu Architecture is published under the MIT License. This means:

- **You can use it freely** in commercial and non-commercial projects
- **You must include the copyright notice** ("Copyright (c) 2026 Dr. Sean MacNiven") in any derivative work
- **You cannot patent** derivatives of Quipu Architecture — this publication constitutes prior art that invalidates novelty claims on the core pattern

Software architecture patterns are abstract ideas and are generally not patentable (see *Alice Corp. v. CLS Bank*, 2014). The strongest protection for an architectural contribution is **public, timestamped prior art** — which this repository provides.

**If you implement Quipu Architecture:** please cite this repository. The citation format is in the [README](README.md).

---

## Zenodo DOI Registration

To establish a citable, timestamped record:

1. Push this repository to GitHub
2. Go to [zenodo.org](https://zenodo.org) and sign in with GitHub
3. Enable the repository in Zenodo's GitHub integration settings
4. Create a GitHub release (e.g., `v1.0.0`)
5. Zenodo will automatically archive the release and assign a DOI
6. Add the DOI badge to the README

This creates a permanent, citable, timestamped record of authorship.
