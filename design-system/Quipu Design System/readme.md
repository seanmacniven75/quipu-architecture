# Quipu Design System

A design system for building **Quipu Architecture** interfaces — chat-native
agentic workflows where *the conversational stream itself is the workflow
surface*. The defining structure is a single linear **primary cord** (timeline)
of typed **events** (knots), with **pendant cords** (filter affordances) that are
*discovered* as event types first occur, **gap indicators** that surface — never
silence — hidden events in a filtered view, and **crystallised skills** that form
from recurring narrative compositions.

This system gives design agents the tokens, components, a reference UI kit, and a
motion language to produce on-brand Quipu screens, decks, and explainers.

> **Quipu** *(khipu)* — the Incan knotted-cord record: a horizontal primary cord
> with pendant cords hanging from it, each bearing knots that encode meaning by
> type, position and grouping. Pull the string straight and the full sequence
> returns. That is the architecture, and the brand.

---

## Where this sits in the repo

This folder is a **non-destructive addition** to
[`seanmacniven75/quipu-architecture`](https://github.com/seanmacniven75/quipu-architecture).
The repo root holds the *specification* (the architecture, schema, and worked
examples in prose); this `design-system/` folder is the *visual + UI layer* that
turns that spec into a buildable brand — tokens, React components, a reference
product UI kit, and a motion explainer. The spec is the source of truth; this is
its design realisation. Nothing here modifies the spec.

## Preview (no build step)

Every artifact is plain HTML/CSS/JS — open it in a browser, or enable **GitHub
Pages** (Settings → Pages → deploy from `main`) and visit:

- **Strand Support UI kit** (the case file as a live primary cord) —
  `design-system/ui_kits/strand-support/index.html`
- **Hero animation** (a cord projecting & bundling as categories are chosen) —
  `design-system/motion/quipu-bundle.html`
- **Foundation specimens** — any `design-system/guidelines/*.card.html`

> Pages URL pattern (once enabled):
> `https://seanmacniven75.github.io/quipu-architecture/design-system/ui_kits/strand-support/index.html`

## Quickstart for builders

1. Link the one entry stylesheet: `<link rel="stylesheet" href="styles.css">`
   (it `@import`s every token; fonts load from the Google Fonts CDN).
2. Load React 18 + Babel, then the bundle `_ds_bundle.js`, then read components
   off the global namespace — see any `*.card.html` for a copy-paste template.
3. Compose the primitives (`Cord`, `EventCard`, `PendantCord`, `GapIndicator`,
   `Button`, `Badge`, `Avatar`); pass icons as Lucide nodes.

> `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` are
> **generated** artifacts (the compiled component library + manifest). They are
> committed so the system works straight from a clone or Pages with no build —
> regenerate them only via the design-system tooling, don't hand-edit.

---

## Sources

This system was authored against the **Quipu Architecture** repository (read-only,
provided as a mounted codebase — not assumed accessible to the reader):

- `quipu-architecture/README.md` — thesis, principles, prior-art, applications.
- `quipu-architecture/SPECIFICATION.md` — the event schema, pendant-cord
  discovery & projection protocol, narrative composition, bundles, conformance.
- `quipu-architecture/ARCHITECTURE.md` — data model, UI component guidance.
- `quipu-architecture/examples/support-workflow.md` — the worked **customer
  support** example (Case #4892) that the Strand Support UI kit recreates.
- `quipu-architecture/examples/strand-holdings-support-v0/` — a *behaviour-only*
  HTML/CSS/JS prototype (Inter, teal-on-grey). Its palette (`#155b77`,
  `#1f2d3a`, `#f5f7fa`) is the seed of this system's **cord** and neutral ramps.
- Author: **Dr. Sean MacNiven** — *Quipu Architecture* (2026), MIT, DOI
  10.5281/zenodo.18941708. The repo is a **specification**, not a shipped brand.

**There was no pre-existing visual brand.** This system therefore *defines* one,
grounded in (a) the quipu metaphor, (b) the academic/archival register of the
spec, and (c) the reference prototype's teal palette. See *Caveats* for the
substitutions this entailed (fonts, icons).

---

## Content Fundamentals

The brand has two registers; both come straight from the source material.

**1. The scholarly register** (docs, headings, explainers, marketing). The spec
is written as an academic paper: precise, measured, intellectually honest, never
hype. It *names its own limitations*. Sentences are long but clear; claims are
hedged accurately ("the strongest statement that can honestly be defended is…").

- **Tone:** rigorous, calm, candid. Confident about the idea, humble about
  evidence. Anti-hype — no "revolutionary", "magical", "effortless".
- **Casing:** sentence case for headings and UI. Title Case only for proper
  nouns and named concepts (Primary Cord, Pendant Cord, Quipu Bundle).
- **Person:** explanatory third person and direct second person ("you can
  isolate the agent's actions in one click"). Avoid first-person marketing "we".
- **Spelling:** British English in the source (*crystallise, colour, behaviour,
  organisation*). Match it.
- **Vocabulary:** lean on the metaphor — *cord, pendant, knot, projection, gap,
  bundle, crystallise, pull the string straight*. Define a term once, then use it.
- **Emoji:** the spec uses emoji as pendant-cord type icons in prose tables
  (⚙️💬🎧🔒). In *product UI we replace these with line icons* (see Iconography);
  reserve emoji for plain-text/markdown contexts, never in rendered components.

**2. The product register** (in-app copy). Plain, human, low-ceremony, written
the way a good support agent writes.

- Event summaries are *one line, past or present tense, concrete*: "Pulled sync
  logs — 14 conflict events in 7 days." Never "Log retrieval operation executed."
- Agent/system voice is plain and accountable: "I've identified the issue…",
  "SLA check: first response in 22 minutes (target 4 hours)."
- Microcopy is quiet: "Clear selection", "Crystallise narrative", "pull straight".
- Numbers earn their place (counts, SLA times, confidence) — no decorative stats.

**Vibe:** an instrument for thinking, not a dashboard. Archival calm meets
modern clarity. Every element auditable; nothing shouting.

---

## Visual Foundations

**Palette.** A petrol-teal **cord** is the primary — it is literally the colour
of the spine drawn down every timeline (`--cord-600 #155b77`, from the
prototype). A warm terracotta **clay** (`--clay-600 #b8542f`) is the accent,
*reserved* for emergent / crystallised-skill moments (a deliberate nod to Andean
textile dye, used sparingly). Neutrals are a **cool slate ramp** — `--ink-*`
(text), `--line-*` (borders), `--paper-*` (surfaces). Events are colour-coded by
type via a **muted categorical set** of nine `--type-*` pairs (colour + tinted
background): system, customer, agent, internal, escalation, knowledge,
diagnostic, sla, resolution (+ automation as a 10th, emergent). These stay calm
and distinguishable — never neon. (Tokens: `tokens/colors.css`.)

**Typography.** Three families, three jobs (`tokens/typography.css`):
- **Spectral** (serif) — the editorial/scholarly voice: display headings, case
  titles, pull quotes, captions. Often *italic* for captions and quotes.
- **Hanken Grotesk** (sans) — all product UI, body, labels, buttons.
- **JetBrains Mono** — event types (`diagnostic.sync_log`), sequence numbers
  (`#7`), entity refs, counts, code. The mono is how "data" reads as data.
Scale runs 11→78px on a tuned ~1.25 ramp; UI body is 15px; never below 11px.

**Spacing & layout.** 4px base grid (`tokens/spacing.css`). The timeline column
maxes at **980px** (from the prototype). Dedicated rails: pendant/filter sidebar
280px, entity panel 360px. The cord has its own geometry tokens: `--cord-width`
2px spine, `--cord-knot` 11px, `--cord-gutter` 28px from spine to card.

**Surfaces & cards.** Light, paper-like. Cards are `--paper-0` (#fff) on a
`--paper-50` app background, **1px `--line-200` border**, **`--radius-md` (8px)**
to **`--radius-lg` (10px)** corners, and a **very low, cool-tinted shadow**
(`--shadow-xs`/`sm`). No heavy elevation; no coloured left-border-accent cards.
Type identity is carried by a small tinted icon chip + a mono type label, **not**
by a coloured stripe.

**The cord.** A continuous vertical 2px gradient line (`--cord-700`→`--cord-500`)
with a circular knot per event, ringed in the event's type colour. Meta-events
(bundles) take a *squared* knot. The spine **never reflows** — filtered-out
events become gap markers, preserving chronological anchoring.

**Borders & radii.** Hairline 1px borders everywhere; dashed borders are
semantic — they mean *a gap / hidden content / a saved narrative*. Pills
(`--radius-pill`) for chips and buttons; 8–10px for cards/panels.

**Shadows.** Cool, petrol-tinted (`rgba(20,40,55,…)`), low and soft. Five steps
xs→xl plus a `--ring-cord` focus ring. Elevation is restrained — a support tool,
not a toy.

**Backgrounds.** Flat tinted surfaces — **no gradients on backgrounds**, no
photographic hero imagery, no textures. The only gradient is the thin cord line
itself. Quiet by design.

**Motion** (`tokens/keyframes.css`, `tokens/effects.css`). Calm, no hard bounce.
- *Pendant discovery* — a new chip materialises with `quipu-pendant-pop`
  (scale 0.82→1.04→1, ~360ms, gentle overshoot). This is the signature moment.
- *Knot arrival* — `quipu-knot-in` (6px rise + fade).
- *Projection* — events cross-fade and re-anchor over `--dur-cord` (600ms,
  `--ease-out`); hidden runs collapse into gap markers.
- *Crystallisation* — a soft clay `quipu-pulse` ring.
- Easing: `--ease-out` for entrances, `--ease-pop` for discovery only.

**Hover / press.** Hover = subtle `brightness(0.96)` (filled) or tint fill
(chips); press = a 1px nudge + 0.99 scale. No colour inversions, no big lifts.
Active pendant cords *fill* with their type colour and gain `--shadow-xs`.

**Transparency & blur.** Used sparingly: `color-mix(... transparent)` for chip
borders and count pills so they tint to their type. No frosted-glass / backdrop
blur — surfaces are opaque paper.

**Imagery.** None photographic. The brand's only imagery is the **knotted-cord
mark** and the diagrammatic cord itself. Warm/cool balance = cool teal neutrals
with a single warm clay accent.

---

## Iconography

- **Set:** [**Lucide**](https://lucide.dev) — line icons, ~1.75px stroke,
  rounded joins. Calm and neutral, matching the paper aesthetic. Loaded from CDN
  (`unpkg.com/lucide`) in cards, the UI kit, and the motion piece; rendered by
  placing `<i data-lucide="name"></i>` and calling `lucide.createIcons()`.
- **Why a substitution:** the Quipu spec/examples use **emoji** as pendant-cord
  type icons (⚙️ System, 💬 Customer, 🎧 Agent, 🔒 Internal, 🔺 Escalation,
  📖 Knowledge, 🔧 Diagnostics, ⏱️ SLA, ✅ Resolution). For rendered product UI we
  upgrade to Lucide line icons for a refined, consistent look. **Canonical
  type → Lucide mapping** (also in `ui_kits/strand-support/data.js`):
  system→`settings-2`, customer→`message-circle`, agent→`headphones`,
  internal→`lock`, escalation→`triangle-alert`, knowledge→`book-open`,
  diagnostic→`wrench`, sla→`timer`, resolution→`circle-check`,
  automation→`sparkles`.
- **Emoji:** acceptable in markdown / plain-text spec tables (as in the source);
  **never** inside rendered components.
- **Logo / brand mark:** `assets/quipu-mark.svg` (square) and
  `assets/quipu-wordmark.svg` (lockup) — an abstracted quipu: a horizontal
  primary cord with three pendant cords of knots, one knot in clay (the
  crystallised skill). Authored for this system (no logo existed in the source).
- Icons are passed to components as nodes (`icon={<i data-lucide="wrench"/>}`),
  so any icon set can be swapped in; Lucide is the default.

---

## Index / Manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import` lines only.
- `readme.md` — this guide. · `SKILL.md` — Agent-Skill manifest.
- `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — **generated**;
  do not edit.

**`tokens/`** — `fonts.css` · `colors.css` · `typography.css` · `spacing.css` ·
`effects.css` · `keyframes.css`. (153 tokens.)

**`components/core/`** — `Button`, `Badge`, `Avatar` (each `.jsx` + `.d.ts` +
`.prompt.md`); `core.card.html` specimen.

**`components/quipu/`** — `PendantCord` (+ `pendantTone` helper), `EventCard`,
`GapIndicator`, `Cord` (each `.jsx` + `.d.ts` + `.prompt.md`); `quipu.card.html`
specimen. These are the signature primitives.

**`guidelines/`** — foundation specimen cards (Type, Colors, Spacing, Brand):
serif / sans / mono / scale; cord / clay / neutrals / pendant-type palette /
status; spacing / radii / shadows; logo.

**`ui_kits/strand-support/`** — the reference product: the customer-support case
file rendered as a quipu. `index.html` (interactive) + `StrandApp.jsx` +
`data.js` + `README.md`. Demonstrates dynamic pendant discovery, projection with
gaps, narrative composition / crystallisation, the entity panel, and a
cross-case bundle view.

**`motion/`** — `quipu-bundle.html`, the hero explainer animation (a primary cord
projecting and **bundling as categories are chosen**, then crystallising into a
skill); `animations.jsx` (timeline engine).

**`assets/`** — `quipu-mark.svg`, `quipu-wordmark.svg`.

---

## Caveats

- **Fonts are chosen, not given.** No typeface shipped with the source, so
  Spectral / Hanken Grotesk / JetBrains Mono are specified and loaded from the
  **Google Fonts CDN** (`tokens/fonts.css`). The compiler reports 0 `@font-face`
  because the closure uses a remote `@import` rather than local files — fonts
  still render. *To self-host, drop woff2 files in and swap the `@import` for
  local `@font-face` rules.*
- **Icons are substituted.** Lucide replaces the spec's emoji (documented above).
- **No real product screenshots existed.** The Strand Support UI kit is built
  from the *code/spec* (the behaviour prototype + `support-workflow.md`), not
  from screenshots — so layout is an honest interpretation of the architecture,
  not a pixel copy of a shipped app (there isn't one).
