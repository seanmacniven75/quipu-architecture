export function Avatar({ name = '', src = null, size = 32, actor = null, style = {} }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  // Actor-aware tinting: agent + system avatars read differently from people.
  const actorTone = {
    user:   { bg: 'var(--cord-100)',  c: 'var(--cord-700)' },
    agent:  { bg: 'var(--type-agent-bg)', c: 'var(--type-agent)' },
    system: { bg: 'var(--paper-100)', c: 'var(--ink-500)' },
  };
  const tone = actorTone[actor] || actorTone.user;

  return (
    <span
      title={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        borderRadius: actor === 'system' ? 'var(--radius-sm)' : '999px',
        background: src ? 'transparent' : tone.bg,
        color: tone.c,
        border: '1px solid rgba(20,40,55,0.06)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-bold)',
        fontSize: Math.max(10, Math.round(size * 0.36)),
        letterSpacing: '0.01em',
        overflow: 'hidden',
        userSelect: 'none',
        ...style,
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials || '?'
      )}
    </span>
  );
}
