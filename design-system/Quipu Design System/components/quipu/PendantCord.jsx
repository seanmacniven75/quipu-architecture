// Canonical pendant-cord palette. Maps a top-level event type to its colour
// pair. Used by PendantCord, EventCard and Cord so a type reads the same
// everywhere. Unknown types fall back to the cord (teal) tone.
const PENDANT_TONES = {
  system:     { c: 'var(--type-system)',     bg: 'var(--type-system-bg)' },
  customer:   { c: 'var(--type-customer)',   bg: 'var(--type-customer-bg)' },
  agent:      { c: 'var(--type-agent)',      bg: 'var(--type-agent-bg)' },
  internal:   { c: 'var(--type-internal)',   bg: 'var(--type-internal-bg)' },
  escalation: { c: 'var(--type-escalation)', bg: 'var(--type-escalation-bg)' },
  knowledge:  { c: 'var(--type-knowledge)',  bg: 'var(--type-knowledge-bg)' },
  diagnostic: { c: 'var(--type-diagnostic)', bg: 'var(--type-diagnostic-bg)' },
  sla:        { c: 'var(--type-sla)',        bg: 'var(--type-sla-bg)' },
  resolution: { c: 'var(--type-resolution)', bg: 'var(--type-resolution-bg)' },
  automation: { c: 'var(--type-automation)', bg: 'var(--type-automation-bg)' },
};

export function pendantTone(type) {
  const top = String(type || '').split('.')[0];
  return PENDANT_TONES[top] || { c: 'var(--cord-600)', bg: 'var(--cord-100)' };
}

export function PendantCord({
  type = 'system',
  label,
  count = null,
  icon = null,
  active = false,
  isNew = false,
  variant = 'filter',
  onClick,
  style = {},
  ...rest
}) {
  const tone = pendantTone(type);
  const narrative = variant === 'narrative';

  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active ? '' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: count != null ? '5px 10px 5px 9px' : '5px 11px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1,
        cursor: 'pointer',
        borderRadius: 'var(--radius-pill)',
        color: active ? '#fff' : tone.c,
        background: active ? tone.c : (narrative ? 'var(--paper-0)' : tone.bg),
        border: narrative
          ? `1px dashed ${active ? 'transparent' : 'var(--border-strong)'}`
          : `1px solid ${active ? 'transparent' : 'color-mix(in srgb, ' + tone.c + ' 26%, transparent)'}`,
        boxShadow: active ? 'var(--shadow-xs)' : 'none',
        transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        animation: isNew ? 'quipu-pendant-pop var(--dur-slow) var(--ease-pop)' : 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 14,
          height: 14,
          color: active ? '#fff' : tone.c,
        }}
      >
        {icon || (
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'currentColor', display: 'block' }} />
        )}
      </span>
      <span>{label}</span>
      {count != null ? (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-3xs)',
            fontWeight: 'var(--weight-medium)',
            padding: '1px 6px',
            borderRadius: 'var(--radius-pill)',
            background: active ? 'rgba(255,255,255,0.22)' : 'color-mix(in srgb, ' + tone.c + ' 14%, transparent)',
            color: active ? '#fff' : tone.c,
          }}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
