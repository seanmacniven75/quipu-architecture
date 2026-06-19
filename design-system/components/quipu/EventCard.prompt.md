**EventCard** — one knot on the primary cord: a single typed event.

```jsx
<EventCard
  seq={7} type="diagnostic" typeLabel="Diagnostics" icon={<WrenchIcon/>}
  summary="Pulled sync logs for Marketing folder — 14 conflict events in 7 days"
  actor="Tomás" initiatedBy="agent" timestamp="10:32"
  entityRefs={["diagnostic:sync_log_4892"]} subsidiaryCount={1}
/>
```

Drive colour with `type`. `initiatedBy` ("user"|"agent"|"system") tones the footer avatar. `isMeta` shows a "bundled" tag for aggregated events. Set `active={false}` to dim events outside the current projection. Designed to stack inside `<Cord/>`.
