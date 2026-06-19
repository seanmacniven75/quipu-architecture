---
name: quipu-design
description: Use this skill to generate well-branded interfaces and assets for Quipu — the interaction architecture for chat-native agentic workflows (primary cord, pendant cords, gap indicators, crystallised skills), and its reference product Strand Support. For production or throwaway prototypes/mocks. Contains design guidelines, colours, type, fonts, assets, and UI-kit components.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things are
- `readme.md` — the full design guide: sources, content fundamentals, visual foundations, iconography, and a complete file index. **Start here.**
- `styles.css` — link this one file to inherit every token (`@import`s `tokens/*`).
- `tokens/` — colours, typography, spacing, effects, keyframes (CSS custom properties).
- `components/core/` — `Button`, `Badge`, `Avatar`. `components/quipu/` — `PendantCord`, `EventCard`, `GapIndicator`, `Cord` (the signature primitives). Each has a `.prompt.md` with a usage example.
- `ui_kits/strand-support/` — the reference product (customer support case-as-quipu); read `StrandApp.jsx` to see the primitives composed.
- `motion/quipu-bundle.html` — the hero animation (cord projecting & bundling as categories are chosen).
- `assets/` — logo mark + wordmark.

## Using the components
Components are bundled to `window.QuipuDesignSystem_<hash>` (run the design-system check to confirm the exact namespace). In an HTML file: link `styles.css`, load React 18 + Babel + the `_ds_bundle.js`, then `const { Cord, EventCard, PendantCord, Button, Badge, Avatar } = window.<Namespace>`. Pass icons as nodes (`icon={<i data-lucide="wrench"/>}` with Lucide loaded). See any `*.card.html` for a working template.

## House rules (summary — see readme.md for the full set)
- The **primary cord** is the spine; events are **knots**; types are colour-coded via `--type-*`. Cord teal is primary; **clay is reserved** for emergent/crystallised moments.
- British spelling; sentence case; calm, candid, anti-hype copy; one-line concrete event summaries.
- Lucide line icons (not emoji) in rendered UI. Paper-like surfaces, hairline borders, low cool shadows, no background gradients, no frosted glass.
- Motion is calm: pendant-discovery pop, gap-acknowledging projection, soft crystallise pulse — no hard bounce.
