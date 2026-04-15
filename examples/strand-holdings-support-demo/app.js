const timelineEl = document.getElementById("timeline");
const filtersEl = document.getElementById("filters");
const narrativesEl = document.getElementById("narratives");
const detailEl = document.getElementById("detail");
const clearFiltersBtn = document.getElementById("clearFilters");
const saveNarrativeBtn = document.getElementById("saveNarrative");

const selectedTypes = new Set();
const narratives = [];
let events = [];
let activeEventId = null;

const fmt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

const byTime = (a, b) => new Date(a.timestamp) - new Date(b.timestamp);

function loadEvents() {
  return fetch("./events.json")
    .then((res) => res.json())
    .then((json) => {
      events = [...json.events].sort(byTime);
    });
}

function discoverPendantTypes() {
  const seen = new Set();
  const discovered = [];
  for (const ev of events) {
    if (!seen.has(ev.type)) {
      seen.add(ev.type);
      discovered.push(ev.type);
    }
  }
  return discovered;
}

function renderFilters() {
  filtersEl.innerHTML = "";
  for (const type of discoverPendantTypes()) {
    const chip = document.createElement("button");
    chip.className = `chip ${selectedTypes.has(type) ? "active" : ""}`;
    chip.textContent = type;
    chip.onclick = () => {
      if (selectedTypes.has(type)) selectedTypes.delete(type);
      else selectedTypes.add(type);
      renderAll();
    };
    filtersEl.appendChild(chip);
  }
}

function projectWithGaps(items) {
  const out = [];
  let hiddenCount = 0;
  let hiddenStart = null;
  let hiddenEnd = null;

  for (const ev of items) {
    const include = selectedTypes.size === 0 || selectedTypes.has(ev.type);
    if (include) {
      if (hiddenCount > 0) {
        out.push({
          kind: "gap",
          hiddenCount,
          from: hiddenStart,
          to: hiddenEnd,
        });
        hiddenCount = 0;
        hiddenStart = null;
        hiddenEnd = null;
      }
      out.push(ev);
    } else {
      hiddenCount += 1;
      hiddenStart = hiddenStart || ev.timestamp;
      hiddenEnd = ev.timestamp;
    }
  }

  if (hiddenCount > 0) {
    out.push({ kind: "gap", hiddenCount, from: hiddenStart, to: hiddenEnd });
  }

  return out;
}

function renderTimeline() {
  timelineEl.innerHTML = "";
  const projected = projectWithGaps(events);

  for (const entry of projected) {
    if (entry.kind === "gap") {
      const gap = document.createElement("div");
      gap.className = "gap";
      gap.textContent = `${entry.hiddenCount} hidden events (${fmt.format(new Date(entry.from))} to ${fmt.format(new Date(entry.to))})`;
      timelineEl.appendChild(gap);
      continue;
    }

    const ev = entry;
    const node = document.createElement("article");
    node.className = `event ${activeEventId === ev.id ? "active" : ""}`;
    node.onclick = () => {
      activeEventId = ev.id;
      renderTimeline();
      renderDetail();
    };

    node.innerHTML = `
      <div class="row">
        <span class="type">${ev.type}</span>
        <span class="meta">${fmt.format(new Date(ev.timestamp))}</span>
      </div>
      <div class="meta">Actor: ${ev.actor} / Initiated by: ${ev.initiatedBy}</div>
    `;
    timelineEl.appendChild(node);
  }
}

function renderDetail() {
  const ev = events.find((e) => e.id === activeEventId);
  if (!ev) {
    detailEl.innerHTML = "<p>Select an event to see detail.</p>";
    return;
  }

  detailEl.innerHTML = `
    <strong>${ev.type}</strong><br />
    <span>${fmt.format(new Date(ev.timestamp))}</span>
    <pre>${JSON.stringify(ev, null, 2)}</pre>
  `;
}

function renderNarratives() {
  narrativesEl.innerHTML = "";
  if (narratives.length === 0) {
    narrativesEl.innerHTML = "<p class='hint'>No saved narratives yet.</p>";
    return;
  }

  for (const n of narratives) {
    const box = document.createElement("div");
    box.className = "narrative-item";
    box.innerHTML = `
      <strong>${n.name}</strong>
      <div>${n.types.join(", ")}</div>
    `;
    box.onclick = () => {
      selectedTypes.clear();
      for (const type of n.types) selectedTypes.add(type);
      renderAll();
    };
    narrativesEl.appendChild(box);
  }
}

function renderAll() {
  renderFilters();
  renderTimeline();
  renderDetail();
  renderNarratives();
}

clearFiltersBtn.onclick = () => {
  selectedTypes.clear();
  renderAll();
};

saveNarrativeBtn.onclick = () => {
  if (selectedTypes.size === 0) return;
  const name = window.prompt("Narrative name:");
  if (!name) return;
  narratives.push({
    id: crypto.randomUUID(),
    name,
    types: [...selectedTypes],
  });
  renderNarratives();
};

loadEvents().then(renderAll);
