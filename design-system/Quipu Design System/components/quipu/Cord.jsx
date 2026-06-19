import { pendantTone } from './PendantCord';
import { EventCard } from './EventCard';
import { GapIndicator } from './GapIndicator';

// The primary cord: a single vertical spine with type-coloured knots, each
// knot anchoring one event. Pass `items` (events + gaps) for a turnkey
// timeline, or `children` to lay out arbitrary nodes along the cord.
export function Cord({ items = null, children = null, onGapClick, style = {} }) {
  const rows = items
    ? items.map((it, i) => {
        if (it.gap || it.kind === 'gap') {
          return (
            <Row key={it.id || `gap-${i}`} knotColor="var(--cord-line-faint)" gap>
              <GapIndicator count={it.count} from={it.from} to={it.to} onClick={onGapClick} />
            </Row>
          );
        }
        const tone = pendantTone(it.type);
        return (
          <Row key={it.id || it.seq || i} knotColor={tone.c} active={it.active !== false} meta={it.isMeta}>
            <EventCard {...it} />
          </Row>
        );
      })
    : children;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        paddingLeft: 4,
        ...style,
      }}
    >
      {/* the continuous spine */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 9,
          top: 10,
          bottom: 10,
          width: 'var(--cord-width)',
          background: 'linear-gradient(var(--cord-line) 0%, var(--cord-line) 92%, transparent 100%)',
          borderRadius: 2,
        }}
      />
      {rows}
    </div>
  );
}

function Row({ children, knotColor = 'var(--cord-600)', gap = false, active = true, meta = false }) {
  return (
    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'var(--cord-gutter) 1fr', alignItems: 'start' }}>
      <span style={{ position: 'relative', height: '100%' }}>
        <span
          aria-hidden="true"
          style={{
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
            opacity: active ? 1 : 0.45,
          }}
        />
      </span>
      <div>{children}</div>
    </div>
  );
}
