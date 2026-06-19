// Strand Support — interactive Quipu workspace (UI kit reference screen).
// Composes the design-system primitives: Cord, EventCard, PendantCord,
// GapIndicator, Button, Badge, Avatar. The case file IS the primary cord.
(function () {
  const NS = window.QuipuDesignSystem_9d1632;
  const { Button, Badge, Avatar, PendantCord, GapIndicator, Cord } = NS;
  const { TYPES, EVENTS, BUNDLE } = window.STRAND;
  const { useState, useEffect } = React;

  const topType = (t) => String(t).split('.')[0];
  const icon = (name) => React.createElement('i', { 'data-lucide': name });
  const typeIcon = (t) => icon((TYPES[topType(t)] || {}).icon || 'circle');

  function useLucide(dep) {
    useEffect(() => { window.lucide && window.lucide.createIcons(); });
  }

  // Discovered pendant cords: top-level types in order of first appearance.
  function discover(events) {
    const order = [];
    const counts = {};
    for (const e of events) {
      const t = topType(e.type);
      if (!(t in counts)) { counts[t] = 0; order.push(t); }
      counts[t]++;
    }
    return order.map((t) => ({ type: t, label: (TYPES[t] || {}).label || t, count: counts[t] }));
  }

  // Project events through the selected filters, inserting gap markers.
  function project(events, selected) {
    const all = selected.size === 0;
    const out = [];
    let gap = 0, from = null, to = null;
    for (const e of events) {
      const match = all || selected.has(topType(e.type));
      if (match) {
        if (gap > 0) { out.push({ gap: true, count: gap, from, to, id: 'g' + e.seq }); gap = 0; from = null; to = null; }
        out.push({ ...e, icon: typeIcon(e.type), typeLabel: (TYPES[topType(e.type)] || {}).label });
      } else {
        gap++; from = from || e.timestamp; to = e.timestamp;
      }
    }
    if (gap > 0) out.push({ gap: true, count: gap, from, to, id: 'gend' });
    return out;
  }

  function Topbar({ view, setView }) {
    useLucide();
    return (
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 22px', background: 'var(--paper-0)', borderBottom: '1px solid var(--border-default)' }}>
        <img src="../../assets/quipu-mark.svg" width="26" height="26" alt="" />
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>Strand</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginLeft: -8, marginTop: 4 }}>Support</span>
        <nav style={{ display: 'flex', gap: 4, marginLeft: 18 }}>
          {[['case', 'Case cord'], ['bundle', 'Bundle']].map(([k, l]) => (
            <button key={k} onClick={() => setView(k)} style={{
              border: 'none', cursor: 'pointer', padding: '7px 13px', borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 600,
              background: view === k ? 'var(--cord-100)' : 'transparent',
              color: view === k ? 'var(--cord-700)' : 'var(--text-muted)',
            }}>{l}</button>
          ))}
        </nav>
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', color: 'var(--text-faint)' }}>{icon('search')}</span>
          <span style={{ display: 'inline-flex', color: 'var(--text-faint)' }}>{icon('bell')}</span>
          <Avatar name="Tomás Rivera" actor="user" size={28} />
        </div>
      </header>
    );
  }

  function CaseHeader({ onEntity }) {
    useLucide();
    const ent = [
      ['customer:maria_chen', 'Maria Chen', 'user-round'],
      ['kb:KB-2891', 'KB-2891', 'book-open'],
      ['diagnostic:sync_log_4892', 'sync_log_4892', 'wrench'],
    ];
    return (
      <div style={{ background: 'var(--paper-0)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '16px 18px', boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--clay-600)' }}>#4892</span>
          <Badge tone="danger" variant="solid">High</Badge>
          <Badge tone="success">Within SLA</Badge>
          <Badge tone="cord">Enterprise</Badge>
        </div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>
          Selective sync silently dropping files in shared folders
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <Avatar name="Maria Chen" actor="user" size={22} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Maria Chen · CloudSync Pro</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xs)', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Linked entities</span>
          {ent.map(([id, label, ic]) => (
            <button key={id} onClick={() => onEntity(id)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xs)', color: 'var(--ink-600)',
              background: 'var(--paper-100)', border: '1px solid var(--line-200)', borderRadius: 'var(--radius-xs)', padding: '3px 8px',
            }}>
              <span style={{ display: 'inline-flex', width: 12, height: 12, color: 'var(--text-faint)' }}>{icon(ic)}</span>
              {label}<span style={{ color: 'var(--text-faint)' }}>▸</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function PendantBar({ chips, selected, toggle, clear, save, narratives, applyNarrative }) {
    useLucide();
    const [newType, setNewType] = useState(null);
    useEffect(() => { if (newType) { const id = setTimeout(() => setNewType(null), 700); return () => clearTimeout(id); } }, [newType]);
    return (
      <div style={{ background: 'var(--paper-0)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', boxShadow: 'var(--shadow-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 11 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
            {chips.length} pendant cords discovered
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>shift-click to compose</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {chips.map((c) => (
            <PendantCord key={c.type} type={c.type} label={c.label} count={c.count}
              icon={typeIcon(c.type)} active={selected.has(c.type)} isNew={c.type === window.__strandNew}
              onClick={(e) => toggle(c.type, e.shiftKey)} />
          ))}
          {narratives.map((n, i) => (
            <PendantCord key={'n' + i} variant="narrative" type={n.types[0]} label={n.name} icon={icon('bookmark')}
              onClick={() => applyNarrative(n)} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 13 }}>
          <Button variant="secondary" size="sm" icon={icon('x')} onClick={clear} disabled={selected.size === 0}>Clear selection</Button>
          <Button variant="accent" size="sm" icon={icon('sparkles')} onClick={save} disabled={selected.size < 2}>Crystallise narrative</Button>
        </div>
      </div>
    );
  }

  function Composer({ onSend, onSimulate }) {
    useLucide();
    const [val, setVal] = useState('');
    const send = () => { if (val.trim()) { onSend(val.trim()); setVal(''); } };
    return (
      <div style={{ position: 'sticky', bottom: 0, background: 'var(--paper-0)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 10, boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder="Reply to Maria, or log an action…"
            style={{ flex: 1, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '10px 12px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', outline: 'none' }} />
          <Button variant="secondary" size="md" icon={icon('cpu')} onClick={onSimulate}>Run AI root-cause</Button>
          <Button variant="primary" size="md" iconRight={icon('send-horizontal')} onClick={send}>Send</Button>
        </div>
      </div>
    );
  }

  function EntityPanel({ id, events, onClose }) {
    useLucide();
    if (!id) return null;
    const related = events.filter((e) => (e.entityRefs || []).includes(id));
    const meta = {
      'customer:maria_chen': { title: 'Maria Chen', sub: 'Enterprise · 3 cases · avg 4.2d resolution', ic: 'user-round' },
      'kb:KB-2891': { title: 'KB-2891', sub: 'Concurrent edit conflict in v3.8.x · Resolved in v3.9.0', ic: 'book-open' },
      'diagnostic:sync_log_4892': { title: 'sync_log_4892', sub: '14 conflict events · created by Tomás', ic: 'wrench' },
    }[id] || { title: id, sub: '', ic: 'box' };
    return (
      <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'var(--rail-entity)', background: 'var(--paper-0)', borderLeft: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)', padding: 20, overflowY: 'auto', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 'var(--radius-md)', background: 'var(--cord-100)', color: 'var(--cord-700)' }}>{icon(meta.ic)}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink-900)' }}>{meta.title}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', marginTop: 2 }}>{meta.sub}</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-faint)', display: 'inline-flex' }}>{icon('x')}</button>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)', margin: '22px 0 10px' }}>
          Touched by {related.length} event{related.length === 1 ? '' : 's'}
        </div>
        <Cord items={related.map((e) => ({ ...e, icon: typeIcon(e.type), typeLabel: (TYPES[topType(e.type)] || {}).label }))} />
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <Button variant="secondary" size="sm" icon={icon('pen-line')}>Enrich</Button>
          <Button variant="ghost" size="sm" icon={icon('flag')}>Flag</Button>
        </div>
      </aside>
    );
  }

  function BundleView() {
    useLucide();
    const items = BUNDLE.map((e) => ({ ...e, icon: typeIcon(e.type), typeLabel: (TYPES[topType(e.type)] || {}).label, actor: e.actor, detail: null }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: 'var(--paper-0)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '16px 18px', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ display: 'inline-flex', color: 'var(--cord-600)' }}>{icon('layers')}</span>
            <Badge tone="cord">Quipu Bundle</Badge>
            <Badge tone="neutral">Organisation</Badge>
          </div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--ink-900)' }}>Selective Sync Conflict — All Cases</h1>
          <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <span style={{ fontFamily: 'var(--font-mono)' }}>diagnostic.* + resolution</span> &nbsp;·&nbsp; entity <span style={{ fontFamily: 'var(--font-mono)' }}>kb:KB-2891</span> &nbsp;·&nbsp; 4 agents
          </p>
        </div>
        <div style={{ background: 'var(--paper-0)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '18px', boxShadow: 'var(--shadow-xs)' }}>
          <Cord items={items} />
          <div style={{ marginTop: 16, padding: '12px 14px', borderTop: '1px dashed var(--border-strong)', display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {[['3', 'cases'], ['4', 'agents'], ['12', 'diagnostic events'], ['51 days', 'report → fix']].map(([n, l]) => (
              <div key={l}><div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--cord-700)' }}>{n}</div><div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    );
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
      setSelected((prev) => {
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
      const name = types.map((t) => (TYPES[t] || {}).label || t).slice(0, 2).join(' + ');
      setNarratives((n) => [...n, { name, types }]);
    };
    const applyNarrative = (n) => setSelected(new Set(n.types));

    const send = (msg) => {
      const seq = nextSeq;
      setNextSeq(seq + 2);
      setEvents((ev) => [
        ...ev,
        { seq, type: 'agent', summary: msg, actor: 'Tomás Rivera', initiatedBy: 'user', timestamp: 'now' },
        { seq: seq + 1, type: 'customer', summary: 'Maria: “Thanks — noted. I’ll keep an eye on the shared folder.”', actor: 'Maria Chen', initiatedBy: 'user', timestamp: 'now' },
      ]);
    };

    const simulate = () => {
      // Dynamic pendant discovery: a brand-new agent capability appears.
      if (events.some((e) => topType(e.type) === 'automation')) return;
      window.__strandNew = 'automation';
      const seq = nextSeq;
      setNextSeq(seq + 1);
      setEvents((ev) => [...ev, {
        seq, type: 'automation', summary: 'AI generated a root-cause hypothesis: silent failure in v3.8.2 conflict resolver, confidence 0.91. New capability — pendant cord discovered.',
        actor: 'Strand Automation Agent', initiatedBy: 'agent', timestamp: 'now', entityRefs: ['diagnostic:sync_log_4892'],
      }]);
      setTimeout(() => { window.__strandNew = null; }, 900);
    };

    return (
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--surface-app)', display: 'flex', flexDirection: 'column' }}>
        <Topbar view={view} setView={setView} />
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '22px 24px 28px', display: 'flex', flexDirection: 'column', gap: 16, height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
            {view === 'case' ? (
              <>
                <CaseHeader onEntity={setEntity} />
                <PendantBar chips={chips} selected={selected} toggle={toggle} clear={clear} save={save} narratives={narratives} applyNarrative={applyNarrative} />
                <div style={{ background: 'var(--paper-0)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: '20px 18px', boxShadow: 'var(--shadow-xs)' }}>
                  <Cord items={items} onGapClick={clear} />
                </div>
                <Composer onSend={send} onSimulate={simulate} />
              </>
            ) : (
              <BundleView />
            )}
          </div>
          <EntityPanel id={entity} events={events} onClose={() => setEntity(null)} />
        </div>
      </div>
    );
  }

  window.StrandApp = App;
})();
