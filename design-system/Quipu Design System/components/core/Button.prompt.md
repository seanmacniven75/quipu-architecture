**Button** — the brand's primary action control; pill-shaped, calm hover/press, cord-teal by default.

```jsx
<Button variant="primary" onClick={save}>Save Narrative</Button>
<Button variant="secondary" size="sm">Clear Selection</Button>
<Button variant="accent" icon={<CrystalliseIcon/>}>Crystallise skill</Button>
```

Variants: `primary` (cord teal, main action) · `secondary` (paper + border) · `ghost` (text-only) · `accent` (clay terracotta — reserve for emergent/crystallise) · `danger`. Sizes `sm | md | lg`. Pass `icon` / `iconRight` as nodes.
