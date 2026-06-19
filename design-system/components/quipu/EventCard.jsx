import { pendantTone } from './PendantCord';
import { Avatar } from '../core/Avatar';

export function EventCard({
  seq = null,
  type = 'system',
  typeLabel = null,
  icon = null,
  summary = '',
  detail = null,
  actor = '',
  initiatedBy = 'system',
  timestamp = '',
  entityRefs = [],
  subsidiaryCount = 0,
  isMeta = false,
  active = true,
  onClick,
  style = {},
}) {
  const tone = pendantTone(type);
  const label = typeLabel || String(type).split('.')[0];

  return (
    <article
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        background: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        boxShadow: 'var(--shadow-xs)',
        opacity: active ? 1 : 0.5,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            flex: '0 0 24px',
            borderRadius: 'var(--radius-sm)',
            background: tone.bg,
            color: tone.c,
          }}
        >
          {icon || <span style={{ width: 8, height: 8, borderRadius: 999, background: 'currentColor' }} />}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            fontWeight: 'var(--weight-medium)',
            color: tone.c,
            letterSpacing: '0.01em',
          }}
        >
          {label}
        </span>
        {isMeta ? (
          <span
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-3xs)', fontWeight: 'var(--weight-semibold)',
              color: 'var(--clay-700)', background: 'var(--clay-100)', border: '1px solid var(--clay-200)',
              borderRadius: 'var(--radius-pill)', padding: '1px 7px',
            }}
          >
            bundled
          </span>
        ) : null}
        <span style={{ flex: 1 }} />
        {seq != null ? (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xs)', color: 'var(--text-faint)' }}>#{seq}</span>
        ) : null}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
          {timestamp}
        </span>
      </div>

      {/* summary */}
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-body)', textWrap: 'pretty' }}>
        {summary}
      </div>
      {detail ? (
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-normal)', color: 'var(--text-muted)' }}>
          {detail}
        </div>
      ) : null}

      {/* entity refs */}
      {entityRefs && entityRefs.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {entityRefs.map((e, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xs)',
                color: 'var(--ink-600)', background: 'var(--paper-100)',
                border: '1px solid var(--line-200)', borderRadius: 'var(--radius-xs)',
                padding: '2px 7px',
              }}
            >
              {typeof e === 'string' ? e : e.label}
              <span aria-hidden="true" style={{ color: 'var(--text-faint)' }}>▸</span>
            </span>
          ))}
        </div>
      ) : null}

      {/* footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 1 }}>
        <Avatar name={actor} actor={initiatedBy} size={20} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>
          {actor}
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-3xs)', color: 'var(--text-faint)', textTransform: 'capitalize' }}>
          · {initiatedBy}
        </span>
        <span style={{ flex: 1 }} />
        {subsidiaryCount > 0 ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--cord-600)', fontWeight: 'var(--weight-semibold)' }}>
            ↳ {subsidiaryCount} subsidiary
          </span>
        ) : null}
      </div>
    </article>
  );
}
