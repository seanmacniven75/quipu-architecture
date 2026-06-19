**GapIndicator** — dashed marker that makes hidden events explicit in a filtered projection (a core Quipu commitment: surface gaps, never silence them).

```jsx
<GapIndicator count={4} from="10:31" to="10:44" onClick={clearFilter} />
```

Place between visible `EventCard`s when a pendant-cord filter is active. With `onClick`, shows "pull straight" to restore the full timeline.
