# Strand Support — UI kit

A high-fidelity recreation of **Strand Support**, the customer-support product
that is the reference deployment of the Quipu Architecture support workflow.
The defining idea: **the case file IS the primary cord.** Every customer
message, agent reply, diagnostic, KB lookup, escalation, SLA event and
resolution is a knot on one timeline — filterable by pendant cord, composable
into narratives, and bundleable across cases.

## Files
- `index.html` — the interactive workspace (mount point + script loading).
- `StrandApp.jsx` — the app: Topbar, CaseHeader, PendantBar, Cord timeline,
  Composer, EntityPanel, BundleView. Composes the design-system primitives
  (`Cord`, `EventCard`, `PendantCord`, `GapIndicator`, `Button`, `Badge`,
  `Avatar`) — it does not re-implement them.
- `data.js` — sample data for Case #4892 and the cross-case bundle, plus the
  pendant-cord type registry (label + Lucide icon per type).

## What's interactive
- **Pendant cords** — click a chip to project the timeline to that type; gaps
  appear for hidden events. **Shift-click** to compose multiple types (OR logic).
- **Crystallise narrative** — with ≥2 cords selected, save the composition as a
  reusable dashed narrative chip.
- **Run AI root-cause** — emits a brand-new `automation` event whose pendant
  cord is *discovered* live and pops into the bar (dynamic pendant discovery).
- **Linked entities** — open the entity panel to see every event that touched
  an entity (a pendant-cord projection scoped to one entity).
- **Bundle** — switch to the cross-case aggregate view with summary statistics.

## Source of truth
Behaviour and event data follow `quipu-architecture/examples/support-workflow.md`
and `SPECIFICATION.md` (event schema, projection + gap rules, narrative
composition). The original behaviour-only prototype lives at
`quipu-architecture/examples/strand-holdings-support-v0/`.
