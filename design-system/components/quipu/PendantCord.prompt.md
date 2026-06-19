**PendantCord** — the signature Quipu control: a dynamically-discovered, type-coloured filter chip. Single-click toggles; shift-click composes (OR logic) per the spec.

```jsx
<PendantCord type="diagnostic" label="Diagnostics" count={4} icon={<WrenchIcon/>} />
<PendantCord type="customer" label="Customer" count={6} active />
<PendantCord type="agent" label="Agent" count={9} isNew /> {/* pops in on discovery */}
<PendantCord variant="narrative" type="customer" label="Handoff story" />
```

`type` drives colour (system/customer/agent/internal/escalation/knowledge/diagnostic/sla/resolution). `active` fills it. `isNew` plays the discovery pop (needs the `quipu-pendant-pop` keyframe). `variant="narrative"` = saved composition (dashed). Also exports `pendantTone(type)`.
