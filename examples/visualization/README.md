# Visualization Timeline Control Example

This example demonstrates a Quipu-compliant timeline control rendered with WebGPU.

## What It Demonstrates

- Quipu events with specification-aligned fields (`id`, `timestamp`, `sequenceNumber`, `type`, `typeLabel`, `summary`, `payload`, `initiatedBy`, optional lineage and entity links)
- Primary cord visualization as a rope-like main strand
- Knot-like event nodes and pendant strands
- Static rendering (no animation loop)
- Group overlays for temporally close events (adjacent events grouped within a 10-second window)
- Pendant cord filtering by discovered top-level event types (OR logic)
- Gap indicators in the projected event list when filters hide intermediate events

## Files

- `index.html` - Example page and controls
- `styles.css` - Styling for the demo shell
- `app.js` - Hardcoded timeline data, grouping logic, and WebGPU renderer

## Usage

Serve this folder over local HTTP and open `index.html` in a WebGPU-enabled browser.

Example:

```bash
cd examples/visualization
python -m http.server 4173
```

Then navigate to `http://localhost:4173/`.

Opening via `file://` can trigger browser security-origin warnings and block some features.
If WebGPU is unavailable, the timeline list and filtering still render as a fallback.
