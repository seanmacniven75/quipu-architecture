export function GapIndicator({ count = 0, from = null, to = null, onClick, style = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        padding: '7px 12px',
        background: 'repeating-linear-gradient(90deg, transparent, transparent 5px, var(--paper-100) 5px, var(--paper-100) 6px)',
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cord-600)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
    >
      <span style={{ fontWeight: 'var(--weight-semibold)' }}>
        {count} hidden event{count === 1 ? '' : 's'}
      </span>
      {from || to ? (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xs)', color: 'var(--text-faint)' }}>
          {from}{from && to ? ' – ' : ''}{to}
        </span>
      ) : null}
      {onClick ? <span style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--cord-600)' }}>· pull straight</span> : null}
    </button>
  );
}
