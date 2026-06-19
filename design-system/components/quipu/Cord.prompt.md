**Cord** — the primary cord: a vertical spine with type-coloured knots anchoring events. The heart of any Quipu screen.

```jsx
<Cord
  onGapClick={clearFilters}
  items={[
    { seq:2, type:'customer', summary:'Files disappearing…', actor:'Maria', initiatedBy:'user', timestamp:'09:02' },
    { gap:true, count:4, from:'09:03', to:'09:20' },
    { seq:7, type:'diagnostic', summary:'Pulled sync logs', actor:'Tomás', initiatedBy:'agent', timestamp:'09:21' },
  ]}
/>
```

`items` mixes EventCard props with `{gap:true, count, from, to}` markers. Knot colour follows each event's `type`; meta events get a squared knot. Use `active:false` on items to dim them in a projection.
