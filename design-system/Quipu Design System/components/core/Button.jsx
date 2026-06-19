export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  disabled = false,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { font: 'var(--text-xs)', pad: '6px 11px', gap: '6px', h: 30 },
    md: { font: 'var(--text-sm)', pad: '9px 16px', gap: '8px', h: 38 },
    lg: { font: 'var(--text-md)', pad: '12px 22px', gap: '9px', h: 46 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--cord-600)',
      color: 'var(--text-on-cord)',
      border: '1px solid var(--cord-600)',
    },
    secondary: {
      background: 'var(--paper-0)',
      color: 'var(--cord-700)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--cord-700)',
      border: '1px solid transparent',
    },
    accent: {
      background: 'var(--clay-600)',
      color: '#fff',
      border: '1px solid var(--clay-600)',
    },
    danger: {
      background: 'var(--paper-0)',
      color: 'var(--status-danger)',
      border: '1px solid var(--clay-200)',
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        minHeight: s.h,
        padding: s.pad,
        font: 'var(--type-label)',
        fontSize: s.font,
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(0.5px) scale(0.99)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.filter = 'none'; }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(0.96)'; }}
      {...rest}
    >
      {icon ? <span style={{ display: 'inline-flex', width: 16, height: 16 }}>{icon}</span> : null}
      {children}
      {iconRight ? <span style={{ display: 'inline-flex', width: 16, height: 16 }}>{iconRight}</span> : null}
    </button>
  );
}
