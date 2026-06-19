**Avatar** — actor identity chip; initials or image, tinted by actor.

```jsx
<Avatar name="Maria Chen" actor="user" />
<Avatar name="Strand Support Agent" actor="agent" size={28} />
<Avatar name="System" actor="system" />
```

`actor` tints and shapes: `user`/`agent` round, `system` squared. Agent uses the teal agent tone so AI actions are recognisable. Falls back to initials when no `src`.
