export function Badge({ children, tone = 'neutral', variant = 'soft', style = {}, ...rest }) {
  const tones = {
    neutral:    { c: 'var(--ink-600)',          bg: 'var(--paper-100)',          bd: 'var(--line-200)' },
    cord:       { c: 'var(--cord-700)',         bg: 'var(--cord-100)',           bd: 'var(--cord-200)' },
    accent:     { c: 'var(--clay-700)',         bg: 'var(--clay-100)',           bd: 'var(--clay-200)' },
    success:    { c: 'var(--status-success)',   bg: 'var(--type-resolution-bg)', bd: '#bfe0cb' },
    warning:    { c: 'var(--status-warning)',   bg: 'var(--type-diagnostic-bg)', bd: '#ecd3ad' },
    danger:     { c: 'var(--status-danger)',    bg: 'var(--type-escalation-bg)', bd: '#eec4ba' },
    info:       { c: 'var(--status-info)',      bg: 'var(--type-customer-bg)',   bd: '#c3d8ee' },
  };
  const t = tones[tone] || tones.neutral;
  const solid = variant === 'solid';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 9px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1.4,
        letterSpacing: '0.01em',
        borderRadius: 'var(--radius-pill)',
        color: solid ? '#fff' : t.c,
        background: solid ? t.c : t.bg,
        border: `1px solid ${solid ? 'transparent' : t.bd}`,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
