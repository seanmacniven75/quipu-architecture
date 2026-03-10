# Example: Research Workflow

**Domain:** Academic research project management  
**Application:** General-purpose research assistant  
**Conformance Level:** Level 2 (Full Quipu)

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | Project initialisation |
| `literature` | Literature | 📖 | First paper added or searched |
| `data` | Data | 📊 | First dataset uploaded or generated |
| `analysis` | Analysis | 🔬 | First analysis run |
| `writing` | Writing | ✍️ | First draft or outline event |
| `collaboration` | Collaboration | 👥 | First co-author action or comment |

---

## Sample Timeline

```
#1  [⚙️ System]         Project created: "SALL-E: Tablet-Based Eye-Tracking
                         for Social Anxiety Assessment"

#2  [📖 Literature]      Search: "eye tracking social anxiety disorder" — 34 results
                         → Pendant cord "Literature" appears
#3  [📖 Literature]      Added 8 papers to library
                         → entityRefs: [paper:hirsch2019 CREATED, paper:mogg2004 CREATED, ...]

#4  [📖 Literature]      Annotated paper:mogg2004: "Foundational attentional bias
                         paradigm — but uses desktop eye-tracker, not mobile"
                         → entityRefs: [paper:mogg2004 ENRICHED]

#5  [📊 Data]            Uploaded pilot calibration data (n=12, Tobii Pro Fusion)
                         → Pendant cord "Data" appears
                         → entityRefs: [dataset:pilot_calibration CREATED]

#6  [🔬 Analysis]        Ran gaze accuracy comparison: Tobii vs ARKit
                         → Pendant cord "Analysis" appears
                         → entityRefs: [dataset:pilot_calibration READ,
                            analysis:gaze_accuracy_v1 CREATED]

#7  [📖 Literature]      Found paper:chen2024 — transfer learning for gaze estimation
                         "Directly relevant to per-user calibration approach"
                         → entityRefs: [paper:chen2024 CREATED]

#8  [✍️ Writing]         Outline created: NIHR RfPB funding application
                         → Pendant cord "Writing" appears
#9  [✍️ Writing]         Draft: Background section (v1)
                         → entityRefs: [paper:hirsch2019 READ, paper:mogg2004 READ]

#10 [👥 Collaboration]   Prof. Hirsch commented on Background section:
                         "Strengthen clinical need justification"
                         → Pendant cord "Collaboration" appears
                         → parentEventId: #9

#11 [✍️ Writing]         Revised: Background section (v2)
                         → parentEventId: #10
```

---

## Entity View for paper:mogg2004

```
#3   CREATED    — Added to library from search results
#4   ENRICHED   — Annotated: "Foundational attentional bias paradigm..."
#9   READ       — Referenced in Background section draft
```

This view shows the complete provenance of a single literature reference across the research process — from discovery through annotation to use in writing.
