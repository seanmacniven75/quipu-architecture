/* ──────────────────────────────────────────────────────
   Quipu Timeline Visualization — WebGPU
   Azure / Fluent-inspired colour palette.
   Horizontal primary cord, pendant strands hanging down,
   knots as filled circles, 10 s temporal grouping.
   ────────────────────────────────────────────────────── */

const GROUP_WINDOW_SECONDS = 10;
const MAX_EVENTS = 64;
const MAX_GROUPS = 24;

const canvas = document.getElementById("quipuCanvas");
const statusEl = document.getElementById("gpuStatus");
const filterChipsEl = document.getElementById("filterChips");
const clearFiltersBtn = document.getElementById("clearFilters");
const timelineListEl = document.getElementById("timelineList");
const tooltipEl = document.getElementById("tooltip");

const fmt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
  timeStyle: "medium",
  timeZone: "UTC",
});

const baseIso = "2026-04-19T10:22:00.000Z";

/* ── Hardcoded Quipu events (spec-compliant) ───────── */

const hardcodedEvents = [
  ev(1, 0, "intake.ticket.opened", "Ticket Opened", "system",
    "Ticket SH-1142 opened from email channel",
    { ticketId: "SH-1142", channel: "email" }),
  ev(2, 4, "triage.classify", "Auto Classification", "agent",
    "Agent classified issue as subscription entitlement mismatch",
    { confidence: 0.91 }, "evt-1"),
  ev(3, 8, "knowledge.extract", "Reference Extraction", "agent",
    "Pulled 3 relevant KB references for entitlement policy",
    { references: ["kb-991", "kb-204", "kb-411"] }, "evt-1"),
  ev(4, 12, "comms.agent.reply", "Agent Reply", "agent",
    "Sent first-step remediation guidance to requester",
    { template: "entitlement-repair-v2" }, "evt-1"),
  ev(5, 13, "comms.user.reply", "User Reply", "user",
    "User confirmed remediation failed and posted account screenshot",
    { attachment: "screenshot-42.png" }, "evt-4"),
  ev(6, 19, "routing.handoff", "Handoff", "system",
    "Routed to strand holdings billing specialist queue",
    { fromQueue: "tier-1", toQueue: "billing-specialist" }),
  ev(7, 28, "investigation.correlate", "Investigation", "agent",
    "Correlated prior entitlement migration with account tenancy",
    { accountId: "acct-20183" }, "evt-6"),
  ev(8, 29, "annotation.timeline", "Timeline Annotation", "user",
    "Specialist annotated timeline with migration date mismatch",
    { note: "Legacy contract rollover at 00:00 UTC" }, "evt-7"),
  ev(9, 36, "remediation.proposed", "Fix Proposed", "agent",
    "Suggested entitlement contract rebind and invoice cache refresh",
    { operations: ["contract-rebind", "invoice-refresh"] }, "evt-7"),
  ev(10, 44, "remediation.applied", "Fix Applied", "system",
    "Applied contract rebind and cache refresh in production",
    { changeId: "chg-22791" }, "evt-9"),
  ev(11, 47, "comms.user.confirmed", "User Confirmed", "user",
    "User confirmed billing dashboard now reflects active plan",
    { accountId: "acct-20183" }, "evt-10"),
  ev(12, 58, "resolution.closed", "Ticket Closed", "system",
    "Closed ticket after successful user confirmation",
    { resolutionCode: "entitlement-corrected" }, "evt-1"),
];

const selectedTopLevelTypes = new Set();
const discoveredTopLevelTypes = discoverTopLevelTypes(hardcodedEvents);
let gpu = null;
let hoverState = { idx: -1, uvX: 0, uvY: 0, kind: 0 };

init();

/* ── Event builder ─────────────────────────────────── */

function ev(seq, offsetSec, type, typeLabel, initiatedBy, summary, payload, parentEventId) {
  const ts = new Date(new Date(baseIso).getTime() + offsetSec * 1000).toISOString();
  return {
    id: `evt-${seq}`,
    timestamp: ts,
    sequenceNumber: seq,
    type,
    typeLabel,
    payload,
    summary,
    parentEventId,
    initiatedBy,
    agentId: initiatedBy === "agent" ? "strand-support-agent-v0" : undefined,
    entityRefs: [{
      entityType: "ticket",
      entityId: "SH-1142",
      relationship: seq === 1 ? "created" : "updated",
    }],
  };
}

/* ── Init ──────────────────────────────────────────── */

function init() {
  for (let i = 1; i < hardcodedEvents.length; i++) {
    if (hardcodedEvents[i].sequenceNumber <= hardcodedEvents[i - 1].sequenceNumber)
      throw new Error("Events must be strictly ordered by sequenceNumber.");
  }

  renderChips();
  renderList();
  clearFiltersBtn.addEventListener("click", () => {
    selectedTopLevelTypes.clear();
    renderChips();
    renderList();
    if (gpu) writeGpu();
  });
  bootGpu();
  initTooltip();
}

function discoverTopLevelTypes(events) {
  return new Set(events.map((e) => e.type.split(".")[0]));
}

function topType(e) { return e.type.split(".")[0]; }

/* Azure-aligned palette:
   user   = #0078d4  (Azure blue)
   agent  = #c239b3  (Plum / Copilot purple-pink)
   system = #00a36c  (Teal green)                       */
function actorColor(who) {
  if (who === "user")  return [0.0, 0.47, 0.83];   // #0078d4
  if (who === "agent") return [0.76, 0.22, 0.70];   // #c239b3
  return                      [0.0, 0.64, 0.42];    // #00a36c
}

/* ── Filter chips ──────────────────────────────────── */

function renderChips() {
  filterChipsEl.innerHTML = "";
  for (const t of [...discoveredTopLevelTypes].sort()) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `chip${selectedTopLevelTypes.has(t) ? " active" : ""}`;
    b.textContent = t;
    b.addEventListener("click", () => {
      selectedTopLevelTypes.has(t) ? selectedTopLevelTypes.delete(t) : selectedTopLevelTypes.add(t);
      renderChips();
      renderList();
      if (gpu) writeGpu();
    });
    filterChipsEl.appendChild(b);
  }
}

/* ── Event list with gap indicators ────────────────── */

function renderList() {
  timelineListEl.innerHTML = "";
  const proj = project(hardcodedEvents, selectedTopLevelTypes);
  for (const e of proj) {
    if (e.kind === "gap") {
      const d = document.createElement("div");
      d.className = "gap-item";
      d.textContent = `${e.count} hidden event${e.count > 1 ? "s" : ""}`;
      timelineListEl.appendChild(d);
      continue;
    }
    const d = document.createElement("article");
    d.className = "ev-item";
    d.innerHTML = `
      <div class="ev-head">
        <strong>#${e.sequenceNumber} ${e.typeLabel}</strong>
        <span>${fmt.format(new Date(e.timestamp))}</span>
      </div>
      <div class="ev-meta">${e.type} · ${e.initiatedBy}</div>
      <div class="ev-summary">${e.summary}</div>`;
    timelineListEl.appendChild(d);
  }
}

function project(events, sel) {
  const all = sel.size === 0;
  const out = [];
  let gap = 0;
  for (const e of events) {
    if (!all && !sel.has(topType(e))) { gap++; continue; }
    if (gap) { out.push({ kind: "gap", count: gap }); gap = 0; }
    out.push(e);
  }
  if (gap) out.push({ kind: "gap", count: gap });
  return out;
}

/* ── Temporal grouping ─────────────────────────────── */

function temporalGroups(events, windowSec) {
  if (!events.length) return [];
  const gs = [];
  let si = 0, st = Date.parse(events[0].timestamp);
  for (let i = 1; i < events.length; i++) {
    const t = Date.parse(events[i].timestamp);
    if (t - st <= windowSec * 1000) continue;
    if (i - si > 1) gs.push({ s: si, e: i - 1 });
    si = i; st = t;
  }
  if (events.length - si > 1) gs.push({ s: si, e: events.length - 1 });
  return gs;
}

/* ── GPU data ──────────────────────────────────────── */

function packGpu(events, sel) {
  const eb = new Float32Array(MAX_EVENTS * 4);
  const sb = new Float32Array(MAX_EVENTS * 4);
  const gb = new Float32Array(MAX_GROUPS * 4);

  const t0 = Date.parse(events[0].timestamp);
  const t1 = Date.parse(events[events.length - 1].timestamp);
  const range = Math.max(1, t1 - t0);
  const all = sel.size === 0;
  const groups = temporalGroups(events, GROUP_WINDOW_SECONDS).slice(0, MAX_GROUPS);

  for (let i = 0; i < events.length && i < MAX_EVENTS; i++) {
    const e = events[i];
    const norm = (Date.parse(e.timestamp) - t0) / range;
    const len = 0.18 + (i % 3) * 0.08;
    const vis = all || sel.has(topType(e));
    const [r, g, b] = actorColor(e.initiatedBy);
    eb.set([norm, len, 0, 0], i * 4);
    sb.set([r, g, b, vis ? 1.0 : 0.10], i * 4);
  }

  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    const x0 = (Date.parse(events[g.s].timestamp) - t0) / range;
    const x1 = (Date.parse(events[g.e].timestamp) - t0) / range;
    gb.set([x0, x1, g.e - g.s + 1, 0], i * 4);
  }

  return { eb, sb, gb, ec: Math.min(events.length, MAX_EVENTS), gc: groups.length };
}

/* ── WebGPU bootstrap ──────────────────────────────── */

async function bootGpu() {
  if (!navigator.gpu) { statusEl.textContent = "WebGPU unavailable — list view still works."; return; }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) { statusEl.textContent = "No WebGPU adapter."; return; }

  const device = await adapter.requestDevice();
  const ctx = canvas.getContext("webgpu");
  const fmt = navigator.gpu.getPreferredCanvasFormat();
  ctx.configure({ device, format: fmt, alphaMode: "opaque" });

  const mod = device.createShaderModule({ code: WGSL });
  const pipe = device.createRenderPipeline({
    layout: "auto",
    vertex:   { module: mod, entryPoint: "vs" },
    fragment: { module: mod, entryPoint: "fs", targets: [{ format: fmt }] },
    primitive: { topology: "triangle-list" },
  });

  const ub = device.createBuffer({ size: 48, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
  const evb = device.createBuffer({ size: MAX_EVENTS * 16, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
  const stb = device.createBuffer({ size: MAX_EVENTS * 16, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
  const grb = device.createBuffer({ size: MAX_GROUPS * 16, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });

  const bg = device.createBindGroup({
    layout: pipe.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: ub } },
      { binding: 1, resource: { buffer: evb } },
      { binding: 2, resource: { buffer: stb } },
      { binding: 3, resource: { buffer: grb } },
    ],
  });

  gpu = { device, ctx, pipe, bg, ub, evb, stb, grb, fmt, ec: 0, gc: 0 };
  writeGpu();
  statusEl.textContent = "WebGPU active";
  window.addEventListener("resize", () => { if (gpu) draw(); });
}

function writeGpu() {
  const d = packGpu(hardcodedEvents, selectedTopLevelTypes);
  gpu.ec = d.ec; gpu.gc = d.gc;
  gpu.device.queue.writeBuffer(gpu.evb, 0, d.eb);
  gpu.device.queue.writeBuffer(gpu.stb, 0, d.sb);
  gpu.device.queue.writeBuffer(gpu.grb, 0, d.gb);
  buildHitTargets();
  draw();
}

function draw() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.floor(canvas.clientWidth * dpr);
  const h = Math.floor(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }

  gpu.device.queue.writeBuffer(gpu.ub, 0, new Float32Array([w, h, gpu.ec, gpu.gc, hoverState.idx, hoverState.uvX, hoverState.uvY, hoverState.kind, 0,0,0,0]));

  const enc = gpu.device.createCommandEncoder();
  const pass = enc.beginRenderPass({ colorAttachments: [{
    view: gpu.ctx.getCurrentTexture().createView(),
    clearValue: { r: 0.969, g: 0.969, b: 0.969, a: 1 },
    loadOp: "clear", storeOp: "store",
  }] });
  pass.setPipeline(gpu.pipe);
  pass.setBindGroup(0, gpu.bg);
  pass.draw(3, 1, 0, 0);
  pass.end();
  gpu.device.queue.submit([enc.finish()]);
}

/* ── Hit-testing & tooltip ──────────────────────────── */

let hitTargets = [];

function cordYJs(x) { return 0.24 + Math.sin(x * 38) * 0.002 + Math.sin(x * 97) * 0.0006; }

function buildHitTargets() {
  hitTargets = [];
  const events = hardcodedEvents;
  const sel = selectedTopLevelTypes;
  const all = sel.size === 0;
  const t0 = Date.parse(events[0].timestamp);
  const t1 = Date.parse(events[events.length - 1].timestamp);
  const range = Math.max(1, t1 - t0);
  const padL = 0.06, padR = 0.06, span = 1 - padL - padR;

  const groups = temporalGroups(events, GROUP_WINDOW_SECONDS);

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const norm = (Date.parse(e.timestamp) - t0) / range;
    const slen = 0.18 + (i % 3) * 0.08;
    const vis = all || sel.has(topType(e));
    if (!vis) continue;
    const ex = padL + norm * span;
    const ey = cordYJs(ex);

    // junction knot
    hitTargets.push({
      cx: ex, cy: ey, r: 0.018, kind: "knot",
      event: e, eventIdx: i, label: `Junction: ${e.typeLabel}`,
    });
    // end knot
    hitTargets.push({
      cx: ex, cy: ey + slen, r: 0.016, kind: "end-knot",
      event: e, eventIdx: i, label: `Pendant: ${e.typeLabel}`,
    });
  }

  // groups
  for (const g of groups) {
    const x0 = padL + ((Date.parse(events[g.s].timestamp) - t0) / range) * span;
    const x1 = padL + ((Date.parse(events[g.e].timestamp) - t0) / range) * span;
    const count = g.e - g.s + 1;
    hitTargets.push({
      cx: (x0 + x1) / 2, cy: 0.12, r: Math.max(0.02, (x1 - x0) / 2 + 0.01),
      kind: "group", count,
      timeStart: events[g.s].timestamp,
      timeEnd: events[g.e].timestamp,
    });
  }

  // cord itself (sampled at a few x)
  for (let x = padL; x <= 1 - padR; x += 0.015) {
    hitTargets.push({ cx: x, cy: cordYJs(x), r: 0.018, kind: "cord" });
  }
}

function initTooltip() {
  let shown = false;
  canvas.addEventListener("mousemove", (me) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (me.clientX - rect.left) / rect.width;   // uv.x
    const my = (me.clientY - rect.top) / rect.height;    // uv.y
    const asp = canvas.clientWidth / canvas.clientHeight;

    let best = null, bestD = Infinity;
    for (const h of hitTargets) {
      const dx = (mx - h.cx) * asp;
      const dy = my - h.cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < h.r * asp && d < bestD) {
        // prefer events over cord
        if (best && best.kind !== "cord" && h.kind === "cord") continue;
        bestD = d; best = h;
      }
    }

    // update shader hover highlight
    if (!best) {
      hoverState.idx = -1; hoverState.kind = 0;
    } else if (best.kind === "cord") {
      hoverState.idx = -1; hoverState.uvX = mx; hoverState.uvY = my; hoverState.kind = 1;
    } else if (best.kind === "group") {
      hoverState.idx = -1; hoverState.uvX = mx; hoverState.uvY = my; hoverState.kind = 2;
    } else {
      hoverState.idx = best.eventIdx; hoverState.uvX = mx; hoverState.uvY = my; hoverState.kind = 3;
    }
    if (gpu) draw();

    if (!best || best.kind === "cord") {
      if (best && best.kind === "cord") {
        showTooltip(me, rect, `<div class="tt-title">Primary Cord</div><div class="tt-meta">Horizontal timeline — events hang as pendant strands</div>`);
        return;
      }
      hideTooltip();
      return;
    }

    if (best.kind === "group") {
      const ts = fmt.format(new Date(best.timeStart));
      const te = fmt.format(new Date(best.timeEnd));
      showTooltip(me, rect, `<div class="tt-title">Temporal Group</div><div class="tt-meta">${best.count} events within ${GROUP_WINDOW_SECONDS}s window</div><div class="tt-summary">${ts} — ${te}</div>`);
      return;
    }

    const e = best.event;
    const actorCls = `tt-actor--${e.initiatedBy}`;
    const where = best.kind === "knot" ? "Junction knot" : "Pendant end knot";
    showTooltip(me, rect, [
      `<div class="tt-title">#${e.sequenceNumber} ${e.typeLabel}</div>`,
      `<div class="tt-meta">${where} · ${e.type}<br>${fmt.format(new Date(e.timestamp))} · <span class="tt-actor ${actorCls}">${e.initiatedBy}</span></div>`,
      `<div class="tt-summary">${e.summary}</div>`,
    ].join(""));
  });

  canvas.addEventListener("mouseleave", hideTooltip);
}

function showTooltip(me, rect, html) {
  tooltipEl.innerHTML = html;
  tooltipEl.hidden = false;
  const tx = me.clientX - rect.left + 14;
  const ty = me.clientY - rect.top - 10;
  // keep inside canvas bounds
  const maxX = rect.width - tooltipEl.offsetWidth - 8;
  const maxY = rect.height - tooltipEl.offsetHeight - 8;
  tooltipEl.style.left = Math.min(tx, Math.max(0, maxX)) + "px";
  tooltipEl.style.top  = Math.min(ty, Math.max(0, maxY)) + "px";
}

function hideTooltip() {
  tooltipEl.hidden = true;
  if (hoverState.kind !== 0) {
    hoverState.idx = -1; hoverState.kind = 0;
    if (gpu) draw();
  }
}

/* ── WGSL ──────────────────────────────────────────── */

const WGSL = /* wgsl */ `

struct Scene { size : vec2f, nEv : f32, nGr : f32, hover : vec4f, _b : vec4f };

@group(0) @binding(0) var<uniform> sc : Scene;
@group(0) @binding(1) var<storage, read> ev  : array<vec4f>;
@group(0) @binding(2) var<storage, read> sty : array<vec4f>;
@group(0) @binding(3) var<storage, read> grp : array<vec4f>;

struct V { @builtin(position) p : vec4f, @location(0) uv : vec2f };

@vertex fn vs(@builtin(vertex_index) i : u32) -> V {
  var tri = array<vec2f,3>(vec2f(-1,-3), vec2f(-1,1), vec2f(3,1));
  var o : V;
  o.p  = vec4f(tri[i], 0, 1);
  o.uv = vec2f(o.p.x * .5 + .5, 1.0 - (o.p.y * .5 + .5));
  return o;
}

/* util */
fn segD(p : vec2f, a : vec2f, b : vec2f, ar : f32) -> f32 {
  let q = vec2f(p.x*ar, p.y); let sa = vec2f(a.x*ar, a.y); let sb = vec2f(b.x*ar, b.y);
  let d = q-sa; let e = sb-sa;
  return length(d - e * clamp(dot(d,e)/max(dot(e,e),1e-8), 0.0, 1.0));
}
fn ptD(p : vec2f, c : vec2f, ar : f32) -> f32 {
  return length(vec2f((p.x-c.x)*ar, p.y-c.y));
}
fn cordY(x : f32) -> f32 { return 0.24 + sin(x*38.)*0.002 + sin(x*97.)*0.0006; }

@fragment fn fs(v : V) -> @location(0) vec4f {
  let uv = v.uv;
  let ar = sc.size.x / sc.size.y;
  let n  = i32(sc.nEv);
  let ng = i32(sc.nGr);
  let pL = 0.06; let pR = 0.06;
  let sp = 1.0 - pL - pR;

  let hIdx  = sc.hover.x;
  let hUv   = vec2f(sc.hover.y, sc.hover.z);
  let hKind = sc.hover.w;

  /* neutral background */
  var c = mix(vec3f(0.969, 0.969, 0.969), vec3f(0.957, 0.957, 0.957), uv.y);

  /* ── group brackets ── */
  var gi = 0;
  loop { if (gi >= ng) { break; }
    let g  = grp[gi];
    let x0 = pL + g.x * sp;
    let x1 = pL + g.y * sp;
    let by = 0.12;
    let gc = vec3f(0.54, 0.54, 0.54);

    let gHov = select(0.0, 1.0, hKind > 1.5 && hKind < 2.5
               && hUv.x > x0 - 0.02 && hUv.x < x1 + 0.02
               && hUv.y < by + 0.04);
    let gBr = mix(gc, vec3f(0.25, 0.25, 0.25), gHov * 0.6);

    let hd = segD(uv, vec2f(x0, by), vec2f(x1, by), ar);
    c = mix(c, gBr, smoothstep(0.0024, 0.0006, hd) * (0.6 + gHov * 0.3));
    let ld = segD(uv, vec2f(x0, by), vec2f(x0, cordY(x0) - 0.006), ar);
    c = mix(c, gBr, smoothstep(0.002, 0.0005, ld) * (0.45 + gHov * 0.3));
    let rd = segD(uv, vec2f(x1, by), vec2f(x1, cordY(x1) - 0.006), ar);
    c = mix(c, gBr, smoothstep(0.002, 0.0005, rd) * (0.45 + gHov * 0.3));
    gi += 1;
  }

  /* ── main cord (thinned, sharper) ── */
  let cy  = cordY(uv.x);
  let cd  = abs(uv.y - cy);
  let cT  = 0.008;
  let cM  = smoothstep(cT, cT * 0.55, cd)
           * smoothstep(pL - .01, pL, uv.x)
           * smoothstep(pR - .01, pR, 1. - uv.x);
  let cordCol = vec3f(0.42, 0.42, 0.42);
  let cHov = select(0.0, 1.0, hKind > 0.5 && hKind < 1.5);
  let cHovD = ptD(uv, hUv, ar);
  let cGlow = cHov * smoothstep(0.05, 0.0, cHovD) * 0.18;
  c = mix(c, cordCol + cGlow, cM);

  /* ── events ── */
  var i = 0;
  loop { if (i >= n) { break; }
    let e     = ev[i];
    let s     = sty[i];
    let t     = e.x;
    let slen  = e.y;
    let ecol  = s.xyz;
    let alpha = s.w;

    let ex = pL + t * sp;
    let ey = cordY(ex);

    let isHov = select(0.0, 1.0, hKind > 2.5 && abs(f32(i) - hIdx) < 0.5);

    /* hover glow halo (behind knots) */
    if (isHov > 0.5) {
      let jG = ptD(uv, vec2f(ex, ey), ar);
      c = mix(c, ecol, smoothstep(0.04, 0.012, jG) * 0.18 * alpha);
      let pG = ptD(uv, vec2f(ex, ey + slen), ar);
      c = mix(c, ecol, smoothstep(0.035, 0.010, pG) * 0.18 * alpha);
    }

    /* pendant strand */
    let sT = vec2f(ex, ey + 0.010);
    let sB = vec2f(ex, ey + slen);
    let sd = segD(uv, sT, sB, ar);
    let stCol = mix(vec3f(0.56, 0.56, 0.56), ecol, 0.45 + isHov * 0.35);
    c = mix(c, stCol, smoothstep(0.0024, 0.0006, sd) * alpha);

    /* junction knot on cord (thinned ring) */
    let jd = ptD(uv, vec2f(ex, ey), ar);
    let jFill = mix(cordCol, ecol, 0.6 + isHov * 0.3);
    c = mix(c, jFill, smoothstep(0.013, 0.009, jd) * alpha);
    c = mix(c, ecol * 0.5, smoothstep(0.015, 0.013, jd) * (1.-smoothstep(0.013, 0.011, jd)) * alpha * 0.35);

    /* end knot (thinned ring) */
    let pd = ptD(uv, sB, ar);
    let eFill = mix(ecol, vec3f(1.0), isHov * 0.15);
    c = mix(c, eFill, smoothstep(0.011, 0.007, pd) * alpha);
    c = mix(c, ecol * 0.4, smoothstep(0.013, 0.011, pd) * (1.-smoothstep(0.011, 0.009, pd)) * alpha * 0.35);

    i += 1;
  }

  return vec4f(c, 1.0);
}
`;
