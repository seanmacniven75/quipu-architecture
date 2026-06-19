/* @ds-bundle: {"format":3,"namespace":"QuipuDesignSystem_9d1632","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Cord","sourcePath":"components/quipu/Cord.jsx"},{"name":"EventCard","sourcePath":"components/quipu/EventCard.jsx"},{"name":"GapIndicator","sourcePath":"components/quipu/GapIndicator.jsx"},{"name":"PendantCord","sourcePath":"components/quipu/PendantCord.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"cdca3e7406e6","components/core/Badge.jsx":"7319b9da2940","components/core/Button.jsx":"a8a25dd20d0d","components/quipu/Cord.jsx":"1dfb5cb9c67b","components/quipu/EventCard.jsx":"838241f58504","components/quipu/GapIndicator.jsx":"27733e14e836","components/quipu/PendantCord.jsx":"877cb4ee9ade","motion/animations.jsx":"ebe6809a6cbe","ui_kits/strand-support/StrandApp.jsx":"99ecc87256ff","ui_kits/strand-support/data.js":"10d024172a3e"},"inlinedExternals":[],"unexposedExports":[{"name":"pendantTone","sourcePath":"components/quipu/PendantCord.jsx"}]} */

(() => {

const __ds_ns = (window.QuipuDesignSystem_9d1632 = window.QuipuDesignSystem_9d1632 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  name = '',
  src = null,
  size = 32,
  actor = null,
  style = {}
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');

  // Actor-aware tinting: agent + system avatars read differently from people.
  const actorTone = {
    user: {
      bg: 'var(--cord-100)',
      c: 'var(--cord-700)'
    },
    agent: {
      bg: 'var(--type-agent-bg)',
      c: 'var(--type-agent)'
    },
    system: {
      bg: 'var(--paper-100)',
      c: 'var(--ink-500)'
    }
  };
  const tone = actorTone[actor] || actorTone.user;
  return /*#__PURE__*/React.createElement("span", {
    title: name,
    style: {
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
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      c: 'var(--ink-600)',
      bg: 'var(--paper-100)',
      bd: 'var(--line-200)'
    },
    cord: {
      c: 'var(--cord-700)',
      bg: 'var(--cord-100)',
      bd: 'var(--cord-200)'
    },
    accent: {
      c: 'var(--clay-700)',
      bg: 'var(--clay-100)',
      bd: 'var(--clay-200)'
    },
    success: {
      c: 'var(--status-success)',
      bg: 'var(--type-resolution-bg)',
      bd: '#bfe0cb'
    },
    warning: {
      c: 'var(--status-warning)',
      bg: 'var(--type-diagnostic-bg)',
      bd: '#ecd3ad'
    },
    danger: {
      c: 'var(--status-danger)',
      bg: 'var(--type-escalation-bg)',
      bd: '#eec4ba'
    },
    info: {
      c: 'var(--status-info)',
      bg: 'var(--type-customer-bg)',
      bd: '#c3d8ee'
    }
  };
  const t = tones[tone] || tones.neutral;
  const solid = variant === 'solid';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
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
    sm: {
      font: 'var(--text-xs)',
      pad: '6px 11px',
      gap: '6px',
      h: 30
    },
    md: {
      font: 'var(--text-sm)',
      pad: '9px 16px',
      gap: '8px',
      h: 38
    },
    lg: {
      font: 'var(--text-md)',
      pad: '12px 22px',
      gap: '9px',
      h: 46
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--cord-600)',
      color: 'var(--text-on-cord)',
      border: '1px solid var(--cord-600)'
    },
    secondary: {
      background: 'var(--paper-0)',
      color: 'var(--cord-700)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--cord-700)',
      border: '1px solid transparent'
    },
    accent: {
      background: 'var(--clay-600)',
      color: '#fff',
      border: '1px solid var(--clay-600)'
    },
    danger: {
      background: 'var(--paper-0)',
      color: 'var(--status-danger)',
      border: '1px solid var(--clay-200)'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(0.5px) scale(0.99)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.filter = 'none';
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(0.96)';
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 16,
      height: 16
    }
  }, icon) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 16,
      height: 16
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/quipu/GapIndicator.jsx
try { (() => {
function GapIndicator({
  count = 0,
  from = null,
  to = null,
  onClick,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
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
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--cord-600)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--text-muted)';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-semibold)'
    }
  }, count, " hidden event", count === 1 ? '' : 's'), from || to ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-3xs)',
      color: 'var(--text-faint)'
    }
  }, from, from && to ? ' – ' : '', to) : null, onClick ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--cord-600)'
    }
  }, "\xB7 pull straight") : null);
}
Object.assign(__ds_scope, { GapIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/quipu/GapIndicator.jsx", error: String((e && e.message) || e) }); }

// components/quipu/PendantCord.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Canonical pendant-cord palette. Maps a top-level event type to its colour
// pair. Used by PendantCord, EventCard and Cord so a type reads the same
// everywhere. Unknown types fall back to the cord (teal) tone.
const PENDANT_TONES = {
  system: {
    c: 'var(--type-system)',
    bg: 'var(--type-system-bg)'
  },
  customer: {
    c: 'var(--type-customer)',
    bg: 'var(--type-customer-bg)'
  },
  agent: {
    c: 'var(--type-agent)',
    bg: 'var(--type-agent-bg)'
  },
  internal: {
    c: 'var(--type-internal)',
    bg: 'var(--type-internal-bg)'
  },
  escalation: {
    c: 'var(--type-escalation)',
    bg: 'var(--type-escalation-bg)'
  },
  knowledge: {
    c: 'var(--type-knowledge)',
    bg: 'var(--type-knowledge-bg)'
  },
  diagnostic: {
    c: 'var(--type-diagnostic)',
    bg: 'var(--type-diagnostic-bg)'
  },
  sla: {
    c: 'var(--type-sla)',
    bg: 'var(--type-sla-bg)'
  },
  resolution: {
    c: 'var(--type-resolution)',
    bg: 'var(--type-resolution-bg)'
  },
  automation: {
    c: 'var(--type-automation)',
    bg: 'var(--type-automation-bg)'
  }
};
function pendantTone(type) {
  const top = String(type || '').split('.')[0];
  return PENDANT_TONES[top] || {
    c: 'var(--cord-600)',
    bg: 'var(--cord-100)'
  };
}
function PendantCord({
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
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    "data-active": active ? '' : undefined,
    style: {
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
      background: active ? tone.c : narrative ? 'var(--paper-0)' : tone.bg,
      border: narrative ? `1px dashed ${active ? 'transparent' : 'var(--border-strong)'}` : `1px solid ${active ? 'transparent' : 'color-mix(in srgb, ' + tone.c + ' 26%, transparent)'}`,
      boxShadow: active ? 'var(--shadow-xs)' : 'none',
      transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      animation: isNew ? 'quipu-pendant-pop var(--dur-slow) var(--ease-pop)' : 'none',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 14,
      height: 14,
      color: active ? '#fff' : tone.c
    }
  }, icon || /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'currentColor',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("span", null, label), count != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-3xs)',
      fontWeight: 'var(--weight-medium)',
      padding: '1px 6px',
      borderRadius: 'var(--radius-pill)',
      background: active ? 'rgba(255,255,255,0.22)' : 'color-mix(in srgb, ' + tone.c + ' 14%, transparent)',
      color: active ? '#fff' : tone.c
    }
  }, count) : null);
}
Object.assign(__ds_scope, { pendantTone, PendantCord });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/quipu/PendantCord.jsx", error: String((e && e.message) || e) }); }

// components/quipu/EventCard.jsx
try { (() => {
function EventCard({
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
  style = {}
}) {
  const tone = __ds_scope.pendantTone(type);
  const label = typeLabel || String(type).split('.')[0];
  return /*#__PURE__*/React.createElement("article", {
    onClick: onClick,
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      flex: '0 0 24px',
      borderRadius: 'var(--radius-sm)',
      background: tone.bg,
      color: tone.c
    }
  }, icon || /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'currentColor'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-medium)',
      color: tone.c,
      letterSpacing: '0.01em'
    }
  }, label), isMeta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-3xs)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--clay-700)',
      background: 'var(--clay-100)',
      border: '1px solid var(--clay-200)',
      borderRadius: 'var(--radius-pill)',
      padding: '1px 7px'
    }
  }, "bundled") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), seq != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-3xs)',
      color: 'var(--text-faint)'
    }
  }, "#", seq) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)',
      whiteSpace: 'nowrap'
    }
  }, timestamp)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, summary), detail ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-muted)'
    }
  }, detail) : null, entityRefs && entityRefs.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, entityRefs.map((e, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-3xs)',
      color: 'var(--ink-600)',
      background: 'var(--paper-100)',
      border: '1px solid var(--line-200)',
      borderRadius: 'var(--radius-xs)',
      padding: '2px 7px'
    }
  }, typeof e === 'string' ? e : e.label, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--text-faint)'
    }
  }, "\u25B8")))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: actor,
    actor: initiatedBy,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)'
    }
  }, actor), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-3xs)',
      color: 'var(--text-faint)',
      textTransform: 'capitalize'
    }
  }, "\xB7 ", initiatedBy), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), subsidiaryCount > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--cord-600)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, "\u21B3 ", subsidiaryCount, " subsidiary") : null));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/quipu/EventCard.jsx", error: String((e && e.message) || e) }); }

// components/quipu/Cord.jsx
try { (() => {
// The primary cord: a single vertical spine with type-coloured knots, each
// knot anchoring one event. Pass `items` (events + gaps) for a turnkey
// timeline, or `children` to lay out arbitrary nodes along the cord.
function Cord({
  items = null,
  children = null,
  onGapClick,
  style = {}
}) {
  const rows = items ? items.map((it, i) => {
    if (it.gap || it.kind === 'gap') {
      return /*#__PURE__*/React.createElement(Row, {
        key: it.id || `gap-${i}`,
        knotColor: "var(--cord-line-faint)",
        gap: true
      }, /*#__PURE__*/React.createElement(__ds_scope.GapIndicator, {
        count: it.count,
        from: it.from,
        to: it.to,
        onClick: onGapClick
      }));
    }
    const tone = __ds_scope.pendantTone(it.type);
    return /*#__PURE__*/React.createElement(Row, {
      key: it.id || it.seq || i,
      knotColor: tone.c,
      active: it.active !== false,
      meta: it.isMeta
    }, /*#__PURE__*/React.createElement(__ds_scope.EventCard, it));
  }) : children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      paddingLeft: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 9,
      top: 10,
      bottom: 10,
      width: 'var(--cord-width)',
      background: 'linear-gradient(var(--cord-line) 0%, var(--cord-line) 92%, transparent 100%)',
      borderRadius: 2
    }
  }), rows);
}
function Row({
  children,
  knotColor = 'var(--cord-600)',
  gap = false,
  active = true,
  meta = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'var(--cord-gutter) 1fr',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 9,
      top: gap ? 14 : 16,
      transform: 'translate(-50%, -50%)',
      width: meta ? 15 : 'var(--cord-knot)',
      height: meta ? 15 : 'var(--cord-knot)',
      borderRadius: meta ? 'var(--radius-xs)' : 999,
      background: gap ? 'var(--paper-50)' : knotColor,
      border: gap ? '2px dashed var(--cord-line-faint)' : `2px solid var(--surface-app)`,
      boxShadow: gap ? 'none' : '0 0 0 1.5px ' + (active ? knotColor : 'var(--line-300)'),
      opacity: active ? 1 : 0.45
    }
  })), /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { Cord });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/quipu/Cord.jsx", error: String((e && e.message) || e) }); }

// motion/animations.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// animations.jsx
// Reusable animation starter: Stage, Timeline, Sprite, easing helpers.
// Exports (to window): Stage, Sprite, PlaybackBar, TextSprite, ImageSprite, RectSprite,
//   useTime, useTimeline, useSprite, Easing, interpolate, animate, clamp.
//
// Usage (in an HTML file that loads React + Babel):
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <MyScene />
//   </Stage>
//
// <Stage> auto-scales to the viewport and provides the scrubber, play/pause,
// ←/→ seek, space, and 0-to-reset controls, and persists the playhead.
// Inside <Stage>, any child can call useTime() to read the current
// playhead (seconds). Or wrap content in <Sprite start={1} end={4}>...</Sprite>
// to only render during that window -- children receive a `localTime` and
// `progress` via the useSprite() hook. Use Easing + interpolate()/animate()
// for tweens; TextSprite / ImageSprite / RectSprite have built-in entry/exit.
// Build YOUR scenes by composing Sprites inside a Stage.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({
  localTime: 0,
  progress: 0,
  duration: 0
});
const useSprite = () => React.useContext(SpriteContext);
function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false
}) {
  const {
    time
  } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = {
    localTime,
    progress,
    duration,
    visible
  };
  return /*#__PURE__*/React.createElement(SpriteContext.Provider, {
    value: value
  }, typeof children === 'function' ? children(value) : children);
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0,
  y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em'
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let ty = 0;
  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity'
    }
  }, text);
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null // {label: string} for striped placeholder
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }
  const content = placeholder ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, placeholder.label || 'image') : /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity'
    }
  }, content);
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const {
    localTime,
    duration
  } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }
  const overrides = render ? render(spriteCtx) : {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides
    }
  });
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children
}) {
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(() => ({
    time: displayTime,
    duration,
    playing,
    setTime,
    setPlaying
  }), [displayTime, duration, playing]);
  return /*#__PURE__*/React.createElement("div", {
    ref: stageRef,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#0a0a0a',
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: canvasRef,
    style: {
      width,
      height,
      background,
      position: 'relative',
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      flexShrink: 0,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
    value: ctxValue
  }, children))), /*#__PURE__*/React.createElement(PlaybackBar, {
    time: displayTime,
    actualTime: time,
    duration: duration,
    playing: playing,
    onPlayPause: () => setPlaying(p => !p),
    onReset: () => {
      setTime(0);
    },
    onSeek: t => setTime(t),
    onHover: t => setHoverTime(t)
  }));
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 6,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Sprite,
  SpriteContext,
  useSprite,
  TextSprite,
  ImageSprite,
  RectSprite,
  Stage,
  PlaybackBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "motion/animations.jsx", error: String((e && e.message) || e) }); }

// ui_kits/strand-support/StrandApp.jsx
try { (() => {
// Strand Support — interactive Quipu workspace (UI kit reference screen).
// Composes the design-system primitives: Cord, EventCard, PendantCord,
// GapIndicator, Button, Badge, Avatar. The case file IS the primary cord.
(function () {
  const NS = window.QuipuDesignSystem_9d1632;
  const {
    Button,
    Badge,
    Avatar,
    PendantCord,
    GapIndicator,
    Cord
  } = NS;
  const {
    TYPES,
    EVENTS,
    BUNDLE
  } = window.STRAND;
  const {
    useState,
    useEffect
  } = React;
  const topType = t => String(t).split('.')[0];
  const icon = name => React.createElement('i', {
    'data-lucide': name
  });
  const typeIcon = t => icon((TYPES[topType(t)] || {}).icon || 'circle');
  function useLucide(dep) {
    useEffect(() => {
      window.lucide && window.lucide.createIcons();
    });
  }

  // Discovered pendant cords: top-level types in order of first appearance.
  function discover(events) {
    const order = [];
    const counts = {};
    for (const e of events) {
      const t = topType(e.type);
      if (!(t in counts)) {
        counts[t] = 0;
        order.push(t);
      }
      counts[t]++;
    }
    return order.map(t => ({
      type: t,
      label: (TYPES[t] || {}).label || t,
      count: counts[t]
    }));
  }

  // Project events through the selected filters, inserting gap markers.
  function project(events, selected) {
    const all = selected.size === 0;
    const out = [];
    let gap = 0,
      from = null,
      to = null;
    for (const e of events) {
      const match = all || selected.has(topType(e.type));
      if (match) {
        if (gap > 0) {
          out.push({
            gap: true,
            count: gap,
            from,
            to,
            id: 'g' + e.seq
          });
          gap = 0;
          from = null;
          to = null;
        }
        out.push({
          ...e,
          icon: typeIcon(e.type),
          typeLabel: (TYPES[topType(e.type)] || {}).label
        });
      } else {
        gap++;
        from = from || e.timestamp;
        to = e.timestamp;
      }
    }
    if (gap > 0) out.push({
      gap: true,
      count: gap,
      from,
      to,
      id: 'gend'
    });
    return out;
  }
  function Topbar({
    view,
    setView
  }) {
    useLucide();
    return /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 22px',
        background: 'var(--paper-0)',
        borderBottom: '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/quipu-mark.svg",
      width: "26",
      height: "26",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--ink-900)',
        letterSpacing: '-0.01em'
      }
    }, "Strand"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-faint)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        marginLeft: -8,
        marginTop: 4
      }
    }, "Support"), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 4,
        marginLeft: 18
      }
    }, [['case', 'Case cord'], ['bundle', 'Bundle']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setView(k),
      style: {
        border: 'none',
        cursor: 'pointer',
        padding: '7px 13px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        background: view === k ? 'var(--cord-100)' : 'transparent',
        color: view === k ? 'var(--cord-700)' : 'var(--text-muted)'
      }
    }, l))), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        color: 'var(--text-faint)'
      }
    }, icon('search')), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        color: 'var(--text-faint)'
      }
    }, icon('bell')), /*#__PURE__*/React.createElement(Avatar, {
      name: "Tom\xE1s Rivera",
      actor: "user",
      size: 28
    })));
  }
  function CaseHeader({
    onEntity
  }) {
    useLucide();
    const ent = [['customer:maria_chen', 'Maria Chen', 'user-round'], ['kb:KB-2891', 'KB-2891', 'book-open'], ['diagnostic:sync_log_4892', 'sync_log_4892', 'wrench']];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--paper-0)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        boxShadow: 'var(--shadow-xs)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        color: 'var(--clay-600)'
      }
    }, "#4892"), /*#__PURE__*/React.createElement(Badge, {
      tone: "danger",
      variant: "solid"
    }, "High"), /*#__PURE__*/React.createElement(Badge, {
      tone: "success"
    }, "Within SLA"), /*#__PURE__*/React.createElement(Badge, {
      tone: "cord"
    }, "Enterprise")), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-2xl)',
        fontWeight: 600,
        color: 'var(--ink-900)',
        letterSpacing: '-0.01em'
      }
    }, "Selective sync silently dropping files in shared folders"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Maria Chen",
      actor: "user",
      size: 22
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)'
      }
    }, "Maria Chen \xB7 CloudSync Pro")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--text-faint)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    }, "Linked entities"), ent.map(([id, label, ic]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onEntity(id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--ink-600)',
        background: 'var(--paper-100)',
        border: '1px solid var(--line-200)',
        borderRadius: 'var(--radius-xs)',
        padding: '3px 8px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 12,
        height: 12,
        color: 'var(--text-faint)'
      }
    }, icon(ic)), label, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, "\u25B8")))));
  }
  function PendantBar({
    chips,
    selected,
    toggle,
    clear,
    save,
    narratives,
    applyNarrative
  }) {
    useLucide();
    const [newType, setNewType] = useState(null);
    useEffect(() => {
      if (newType) {
        const id = setTimeout(() => setNewType(null), 700);
        return () => clearTimeout(id);
      }
    }, [newType]);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--paper-0)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 16px',
        boxShadow: 'var(--shadow-xs)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)'
      }
    }, chips.length, " pendant cords discovered"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-faint)'
      }
    }, "shift-click to compose")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center'
      }
    }, chips.map(c => /*#__PURE__*/React.createElement(PendantCord, {
      key: c.type,
      type: c.type,
      label: c.label,
      count: c.count,
      icon: typeIcon(c.type),
      active: selected.has(c.type),
      isNew: c.type === window.__strandNew,
      onClick: e => toggle(c.type, e.shiftKey)
    })), narratives.map((n, i) => /*#__PURE__*/React.createElement(PendantCord, {
      key: 'n' + i,
      variant: "narrative",
      type: n.types[0],
      label: n.name,
      icon: icon('bookmark'),
      onClick: () => applyNarrative(n)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 13
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: icon('x'),
      onClick: clear,
      disabled: selected.size === 0
    }, "Clear selection"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "sm",
      icon: icon('sparkles'),
      onClick: save,
      disabled: selected.size < 2
    }, "Crystallise narrative")));
  }
  function Composer({
    onSend,
    onSimulate
  }) {
    useLucide();
    const [val, setVal] = useState('');
    const send = () => {
      if (val.trim()) {
        onSend(val.trim());
        setVal('');
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        bottom: 0,
        background: 'var(--paper-0)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 10,
        boxShadow: 'var(--shadow-md)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: val,
      onChange: e => setVal(e.target.value),
      onKeyDown: e => {
        if (e.key === 'Enter') send();
      },
      placeholder: "Reply to Maria, or log an action\u2026",
      style: {
        flex: 1,
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 12px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-body)',
        outline: 'none'
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "md",
      icon: icon('cpu'),
      onClick: onSimulate
    }, "Run AI root-cause"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "md",
      iconRight: icon('send-horizontal'),
      onClick: send
    }, "Send")));
  }
  function EntityPanel({
    id,
    events,
    onClose
  }) {
    useLucide();
    if (!id) return null;
    const related = events.filter(e => (e.entityRefs || []).includes(id));
    const meta = {
      'customer:maria_chen': {
        title: 'Maria Chen',
        sub: 'Enterprise · 3 cases · avg 4.2d resolution',
        ic: 'user-round'
      },
      'kb:KB-2891': {
        title: 'KB-2891',
        sub: 'Concurrent edit conflict in v3.8.x · Resolved in v3.9.0',
        ic: 'book-open'
      },
      'diagnostic:sync_log_4892': {
        title: 'sync_log_4892',
        sub: '14 conflict events · created by Tomás',
        ic: 'wrench'
      }
    }[id] || {
      title: id,
      sub: '',
      ic: 'box'
    };
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'var(--rail-entity)',
        background: 'var(--paper-0)',
        borderLeft: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-lg)',
        padding: 20,
        overflowY: 'auto',
        zIndex: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        borderRadius: 'var(--radius-md)',
        background: 'var(--cord-100)',
        color: 'var(--cord-700)'
      }
    }, icon(meta.ic)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        color: 'var(--ink-900)'
      }
    }, meta.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, meta.sub)), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: 'var(--text-faint)',
        display: 'inline-flex'
      }
    }, icon('x'))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--text-faint)',
        margin: '22px 0 10px'
      }
    }, "Touched by ", related.length, " event", related.length === 1 ? '' : 's'), /*#__PURE__*/React.createElement(Cord, {
      items: related.map(e => ({
        ...e,
        icon: typeIcon(e.type),
        typeLabel: (TYPES[topType(e.type)] || {}).label
      }))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      icon: icon('pen-line')
    }, "Enrich"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      icon: icon('flag')
    }, "Flag")));
  }
  function BundleView() {
    useLucide();
    const items = BUNDLE.map(e => ({
      ...e,
      icon: typeIcon(e.type),
      typeLabel: (TYPES[topType(e.type)] || {}).label,
      actor: e.actor,
      detail: null
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--paper-0)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 18px',
        boxShadow: 'var(--shadow-xs)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        color: 'var(--cord-600)'
      }
    }, icon('layers')), /*#__PURE__*/React.createElement(Badge, {
      tone: "cord"
    }, "Quipu Bundle"), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, "Organisation")), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-2xl)',
        fontWeight: 600,
        color: 'var(--ink-900)'
      }
    }, "Selective Sync Conflict \u2014 All Cases"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 0',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, "diagnostic.* + resolution"), " \xA0\xB7\xA0 entity ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, "kb:KB-2891"), " \xA0\xB7\xA0 4 agents")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--paper-0)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        boxShadow: 'var(--shadow-xs)'
      }
    }, /*#__PURE__*/React.createElement(Cord, {
      items: items
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        padding: '12px 14px',
        borderTop: '1px dashed var(--border-strong)',
        display: 'flex',
        gap: 22,
        flexWrap: 'wrap'
      }
    }, [['3', 'cases'], ['4', 'agents'], ['12', 'diagnostic events'], ['51 days', 'report → fix']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
      key: l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--text-xl)',
        fontWeight: 600,
        color: 'var(--cord-700)'
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-muted)'
      }
    }, l))))));
  }
  function App() {
    const [events, setEvents] = useState(EVENTS);
    const [selected, setSelected] = useState(new Set());
    const [narratives, setNarratives] = useState([]);
    const [entity, setEntity] = useState(null);
    const [view, setView] = useState('case');
    const [nextSeq, setNextSeq] = useState(100);
    useLucide();
    const chips = discover(events);
    const items = project(events, selected);
    const toggle = (t, shift) => {
      setSelected(prev => {
        const next = new Set(prev);
        if (shift) {
          next.has(t) ? next.delete(t) : next.add(t);
        } else if (prev.has(t) && prev.size === 1) {
          next.clear();
        } else {
          next.clear();
          next.add(t);
        }
        return next;
      });
    };
    const clear = () => setSelected(new Set());
    const save = () => {
      const types = [...selected];
      const name = types.map(t => (TYPES[t] || {}).label || t).slice(0, 2).join(' + ');
      setNarratives(n => [...n, {
        name,
        types
      }]);
    };
    const applyNarrative = n => setSelected(new Set(n.types));
    const send = msg => {
      const seq = nextSeq;
      setNextSeq(seq + 2);
      setEvents(ev => [...ev, {
        seq,
        type: 'agent',
        summary: msg,
        actor: 'Tomás Rivera',
        initiatedBy: 'user',
        timestamp: 'now'
      }, {
        seq: seq + 1,
        type: 'customer',
        summary: 'Maria: “Thanks — noted. I’ll keep an eye on the shared folder.”',
        actor: 'Maria Chen',
        initiatedBy: 'user',
        timestamp: 'now'
      }]);
    };
    const simulate = () => {
      // Dynamic pendant discovery: a brand-new agent capability appears.
      if (events.some(e => topType(e.type) === 'automation')) return;
      window.__strandNew = 'automation';
      const seq = nextSeq;
      setNextSeq(seq + 1);
      setEvents(ev => [...ev, {
        seq,
        type: 'automation',
        summary: 'AI generated a root-cause hypothesis: silent failure in v3.8.2 conflict resolver, confidence 0.91. New capability — pendant cord discovered.',
        actor: 'Strand Automation Agent',
        initiatedBy: 'agent',
        timestamp: 'now',
        entityRefs: ['diagnostic:sync_log_4892']
      }]);
      setTimeout(() => {
        window.__strandNew = null;
      }, 900);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--surface-app)',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(Topbar, {
      view: view,
      setView: setView
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'hidden',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        padding: '22px 24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }
    }, view === 'case' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CaseHeader, {
      onEntity: setEntity
    }), /*#__PURE__*/React.createElement(PendantBar, {
      chips: chips,
      selected: selected,
      toggle: toggle,
      clear: clear,
      save: save,
      narratives: narratives,
      applyNarrative: applyNarrative
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--paper-0)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 18px',
        boxShadow: 'var(--shadow-xs)'
      }
    }, /*#__PURE__*/React.createElement(Cord, {
      items: items,
      onGapClick: clear
    })), /*#__PURE__*/React.createElement(Composer, {
      onSend: send,
      onSimulate: simulate
    })) : /*#__PURE__*/React.createElement(BundleView, null)), /*#__PURE__*/React.createElement(EntityPanel, {
      id: entity,
      events: events,
      onClose: () => setEntity(null)
    })));
  }
  window.StrandApp = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/strand-support/StrandApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/strand-support/data.js
try { (() => {
// Strand Support — sample data for the Quipu UI kit.
// Case #4892 (from the Quipu support-workflow example), rendered as a quipu.
// Each event is a knot on the primary cord. `icon` is a Lucide name.
window.STRAND = function () {
  const TYPES = {
    system: {
      label: 'System',
      icon: 'settings-2'
    },
    customer: {
      label: 'Customer',
      icon: 'message-circle'
    },
    agent: {
      label: 'Agent',
      icon: 'headphones'
    },
    internal: {
      label: 'Internal',
      icon: 'lock'
    },
    diagnostic: {
      label: 'Diagnostics',
      icon: 'wrench'
    },
    knowledge: {
      label: 'Knowledge',
      icon: 'book-open'
    },
    escalation: {
      label: 'Escalation',
      icon: 'triangle-alert'
    },
    sla: {
      label: 'SLA',
      icon: 'timer'
    },
    resolution: {
      label: 'Resolution',
      icon: 'circle-check'
    },
    automation: {
      label: 'Automation',
      icon: 'sparkles'
    }
  };

  // Ordered by sequenceNumber — the locking knot. `disc` marks the event that
  // first discovers its pendant cord (used for the discovery pop animation).
  const EVENTS = [{
    seq: 1,
    type: 'system',
    summary: 'Case #4892 created via web form. Priority: High (Enterprise tier, data-integrity issue).',
    actor: 'System',
    initiatedBy: 'system',
    timestamp: '09:00',
    entityRefs: ['customer:maria_chen', 'product:cloudsync_pro'],
    disc: true
  }, {
    seq: 2,
    type: 'customer',
    summary: 'Files are disappearing from our shared Marketing folder. We\u2019ve lost 3 client presentations this week. This is affecting live projects.',
    actor: 'Maria Chen',
    initiatedBy: 'user',
    timestamp: '09:02',
    disc: true
  }, {
    seq: 3,
    type: 'sla',
    summary: 'SLA clock started \u2014 4hr first-response target (Enterprise). Auto-tagged: data_loss, selective_sync.',
    actor: 'System',
    initiatedBy: 'system',
    timestamp: '09:02',
    entityRefs: ['sla:enterprise_4hr'],
    disc: true
  }, {
    seq: 4,
    type: 'agent',
    summary: 'Agent Tom\u00e1s (Tier 1) assigned to the case.',
    actor: 'System',
    initiatedBy: 'system',
    timestamp: '09:05',
    disc: true
  }, {
    seq: 5,
    type: 'agent',
    summary: 'Tom\u00e1s: \u201cI understand this is urgent. Let me investigate immediately \u2014 can you confirm which OS versions your team is running?\u201d',
    actor: 'Tom\u00e1s Rivera',
    initiatedBy: 'user',
    timestamp: '09:08'
  }, {
    seq: 6,
    type: 'customer',
    summary: 'Maria: \u201cMix of Windows 11 and macOS Sonoma. It only happens when someone edits a file while another person has it open.\u201d',
    actor: 'Maria Chen',
    initiatedBy: 'user',
    timestamp: '09:14'
  }, {
    seq: 7,
    type: 'diagnostic',
    summary: 'Pulled sync logs for Marketing folder \u2014 14 conflict events in 7 days, all concurrent edits on .pptx files.',
    actor: 'Tom\u00e1s Rivera',
    initiatedBy: 'agent',
    timestamp: '09:21',
    entityRefs: ['diagnostic:sync_log_4892'],
    subsidiaryCount: 1,
    disc: true
  }, {
    seq: 8,
    type: 'diagnostic',
    summary: 'Conflict-resolution trace: resolver defaults to \u201clast write wins\u201d but fails silently when both clients run v3.8.2.',
    actor: 'Strand Diagnostic Agent',
    initiatedBy: 'agent',
    timestamp: '09:24',
    entityRefs: ['diagnostic:sync_log_4892']
  }, {
    seq: 9,
    type: 'knowledge',
    summary: 'KB search \u201cselective sync conflict resolution\u201d \u2014 found KB-2891: known concurrent-edit conflict in v3.8.x.',
    actor: 'Tom\u00e1s Rivera',
    initiatedBy: 'agent',
    timestamp: '09:28',
    entityRefs: ['kb:KB-2891'],
    disc: true
  }, {
    seq: 10,
    type: 'internal',
    summary: 'Tom\u00e1s note: \u201cMatches KB-2891. Fix ships in v3.9.0 next week. Enterprise customer lost deliverables \u2014 needs interim workaround.\u201d',
    actor: 'Tom\u00e1s Rivera',
    initiatedBy: 'user',
    timestamp: '09:31',
    disc: true
  }, {
    seq: 11,
    type: 'agent',
    summary: 'Tom\u00e1s: \u201cIt\u2019s a known conflict-resolution bug. I can enable server-side file locking for your shared folders as an interim fix. Would that work?\u201d',
    actor: 'Tom\u00e1s Rivera',
    initiatedBy: 'user',
    timestamp: '09:36'
  }, {
    seq: 12,
    type: 'customer',
    summary: 'Maria: \u201cYes, please enable that immediately. But we also need to recover the lost files if possible.\u201d',
    actor: 'Maria Chen',
    initiatedBy: 'user',
    timestamp: '09:41'
  }, {
    seq: 13,
    type: 'escalation',
    summary: 'Escalated to Tier 2 (Data Recovery) \u2014 customer requesting file recovery, requires backend access.',
    actor: 'Tom\u00e1s Rivera',
    initiatedBy: 'user',
    timestamp: '09:44',
    entityRefs: ['case:4892'],
    disc: true
  }, {
    seq: 15,
    type: 'diagnostic',
    summary: 'Priya queried server-side version history \u2014 3 .pptx files recoverable from 24/48/72hr snapshots.',
    actor: 'Priya Nair',
    initiatedBy: 'agent',
    timestamp: '10:05',
    entityRefs: ['diagnostic:recovery_4892'],
    subsidiaryCount: 1
  }, {
    seq: 18,
    type: 'agent',
    summary: 'Priya: \u201cI\u2019ve recovered all 3 presentations to a \u2018Recovered Files\u2019 folder. Can you verify they\u2019re the right versions?\u201d',
    actor: 'Priya Nair',
    initiatedBy: 'user',
    timestamp: '10:22'
  }, {
    seq: 21,
    type: 'sla',
    summary: 'SLA check: first response in 22 min (target 4hr). Resolution in 3.4hr \u2014 within target.',
    actor: 'System',
    initiatedBy: 'system',
    timestamp: '12:30',
    entityRefs: ['sla:enterprise_4hr']
  }, {
    seq: 22,
    type: 'resolution',
    summary: 'Interim resolution: server-side file locking enabled; 3 files recovered. Permanent fix v3.9.0 (Mar 17).',
    actor: 'Tom\u00e1s Rivera',
    initiatedBy: 'user',
    timestamp: '12:34',
    entityRefs: ['case:4892'],
    isMeta: true,
    disc: true
  }];

  // Cross-case bundle: "Selective Sync Conflict — All Cases"
  const BUNDLE = [{
    seq: 1,
    type: 'diagnostic',
    summary: 'Case #4710: First report \u2014 macOS only.',
    actor: 'Kenji',
    initiatedBy: 'agent',
    timestamp: 'Jan 15'
  }, {
    seq: 2,
    type: 'diagnostic',
    summary: 'Case #4710: Reproduced on Windows 11.',
    actor: 'Sara',
    initiatedBy: 'agent',
    timestamp: 'Jan 22'
  }, {
    seq: 3,
    type: 'resolution',
    summary: 'Case #4710: Workaround deployed (version pinning).',
    actor: 'Kenji',
    initiatedBy: 'user',
    timestamp: 'Feb 3'
  }, {
    seq: 4,
    type: 'diagnostic',
    summary: 'Case #4892: 14 conflict events, cross-platform \u2014 root cause confirmed v3.8.2.',
    actor: 'Tom\u00e1s',
    initiatedBy: 'agent',
    timestamp: 'Feb 18'
  }, {
    seq: 5,
    type: 'resolution',
    summary: 'Case #4892: 3 files recovered, interim lock enabled.',
    actor: 'Priya',
    initiatedBy: 'user',
    timestamp: 'Feb 19'
  }, {
    seq: 6,
    type: 'diagnostic',
    summary: 'Case #5023: Same issue, 2-person team.',
    actor: 'Sara',
    initiatedBy: 'agent',
    timestamp: 'Mar 1'
  }, {
    seq: 7,
    type: 'resolution',
    summary: 'Case #4892: Permanent fix confirmed (v3.9.0).',
    actor: 'Tom\u00e1s',
    initiatedBy: 'user',
    timestamp: 'Mar 7'
  }];
  return {
    TYPES,
    EVENTS,
    BUNDLE
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/strand-support/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Cord = __ds_scope.Cord;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.GapIndicator = __ds_scope.GapIndicator;

__ds_ns.PendantCord = __ds_scope.PendantCord;

})();
