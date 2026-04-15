const filtersEl = document.getElementById("filters");
const narrativesEl = document.getElementById("narratives");
const timelineEl = document.getElementById("timeline");
const clearFiltersBtn = document.getElementById("clearFilters");
const saveNarrativeBtn = document.getElementById("saveNarrative");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessage");
const actionButtons = document.querySelectorAll(".action-btn");

const selectedTypes = new Set();
const discoveredTypes = new Set();
const narratives = [];
const events = [];
let counter = 1;

const fmt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
  timeStyle: "medium",
  timeZone: "UTC",
});

function appendEvent(type, initiatedBy, actor, payload) {
  const isNewType = !discoveredTypes.has(type);
  if (isNewType) discoveredTypes.add(type);

  events.push({
    id: `ev-${counter++}`,
    timestamp: new Date().toISOString(),
    type,
    initiatedBy,
    actor,
    payload,
  });

  renderAll();

  if (isNewType) {
    const chip = [...filtersEl.querySelectorAll(".chip")].find((el) => el.textContent === type);
    if (chip) {
      chip.classList.add("new");
      setTimeout(() => chip.classList.remove("new"), 900);
    }
  }
}

function renderFilters() {
  filtersEl.innerHTML = "";
  const types = [...discoveredTypes];
  if (types.length === 0) {
    filtersEl.innerHTML = "<p class='empty'>No views yet. Trigger any action above.</p>";
    return;
  }

  for (const type of types) {
    const chip = document.createElement("button");
    chip.className = `chip ${selectedTypes.has(type) ? "active" : ""}`;
    chip.textContent = type;
    chip.onclick = () => {
      if (selectedTypes.has(type)) selectedTypes.delete(type);
      else selectedTypes.add(type);
      renderTimeline();
      renderFilters();
    };
    filtersEl.appendChild(chip);
  }
}

function renderNarratives() {
  narrativesEl.innerHTML = "";
  if (narratives.length === 0) return;

  for (const narrative of narratives) {
    const node = document.createElement("div");
    node.className = "narrative";
    node.innerHTML = `<strong>${narrative.name}</strong><div>${narrative.types.join(", ")}</div>`;
    node.onclick = () => {
      selectedTypes.clear();
      narrative.types.forEach((t) => selectedTypes.add(t));
      renderFilters();
      renderTimeline();
    };
    narrativesEl.appendChild(node);
  }
}

function projectWithGaps(input) {
  const out = [];
  let gapCount = 0;
  let gapStart = null;
  let gapEnd = null;
  const includeAll = selectedTypes.size === 0;

  for (const event of input) {
    const include = includeAll || selectedTypes.has(event.type);
    if (include) {
      if (gapCount > 0) {
        out.push({ kind: "gap", count: gapCount, from: gapStart, to: gapEnd });
        gapCount = 0;
        gapStart = null;
        gapEnd = null;
      }
      out.push(event);
      continue;
    }

    gapCount += 1;
    gapStart = gapStart || event.timestamp;
    gapEnd = event.timestamp;
  }

  if (gapCount > 0) out.push({ kind: "gap", count: gapCount, from: gapStart, to: gapEnd });
  return out;
}

function renderTimeline() {
  timelineEl.innerHTML = "";

  if (events.length === 0) {
    timelineEl.innerHTML = "<p class='empty'>No events yet. Use actions or send a message.</p>";
    return;
  }

  const projected = projectWithGaps(events);

  for (const entry of projected) {
    if (entry.kind === "gap") {
      const gap = document.createElement("div");
      gap.className = "gap";
      gap.textContent = `${entry.count} hidden events (${fmt.format(new Date(entry.from))} - ${fmt.format(new Date(entry.to))})`;
      timelineEl.appendChild(gap);
      continue;
    }

    const node = document.createElement("article");
    node.className = "event";
    node.innerHTML = `
      <div class="event-title">
        <span class="event-type">${entry.type}</span>
        <span>${fmt.format(new Date(entry.timestamp))}</span>
      </div>
      <div class="event-meta">Actor: ${entry.actor} / Initiated by: ${entry.initiatedBy}</div>
    `;
    timelineEl.appendChild(node);
  }
}

function renderAll() {
  renderFilters();
  renderNarratives();
  renderTimeline();
}

actionButtons.forEach((button) => {
  button.onclick = () => {
    appendEvent(button.dataset.eventType, "user", "john.public@strandholdings.example", {
      ticketId: "SH-IT-104221",
      action: button.textContent.trim(),
    });
  };
});

sendMessageBtn.onclick = () => {
  const message = messageInput.value.trim();
  if (!message) return;

  appendEvent("chat.user_message", "user", "john.public@strandholdings.example", { message });
  appendEvent("chat.agent_reply", "agent", "strand-support-agent", {
    message: "Acknowledged. I logged that update and adjusted the support narrative.",
  });
  messageInput.value = "";
};

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") sendMessageBtn.click();
});

clearFiltersBtn.onclick = () => {
  selectedTypes.clear();
  renderFilters();
  renderTimeline();
};

saveNarrativeBtn.onclick = () => {
  if (selectedTypes.size === 0) return;
  const name = window.prompt("Name this narrative:");
  if (!name) return;
  narratives.push({ id: crypto.randomUUID(), name, types: [...selectedTypes] });
  renderNarratives();
};

renderAll();
