# Example: Academic Grading Workflow (xRead)

**Domain:** AI-assisted academic essay grading  
**Application:** xRead Chrome Extension for Canvas LMS SpeedGrader  
**Conformance Level:** Level 3 (Composable Quipu)

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | App initialisation |
| `rubric` | Rubric | 📋 | First rubric upload or parsing event |
| `grading` | Grading | 📄 | First essay scored |
| `reference` | References | 📚 | First reference extraction |
| `calibration` | Calibration | 🎯 | First feedback event (slider, override, or epistemic query) |
| `voice` | Grading Voice | 🗣️ | First qualitative prior extracted or updated |

---

## Sample Timeline

Below is a worked example of a grading session as it would appear on the Quipu timeline. Each event shows its sequence number, type, and summary.

```
#1  [⚙️ System]      Session started
#2  [📋 Rubric]      Rubric uploaded: "Hult MBA Assessment Rubric"
                      → Pendant cord "Rubric" appears for the first time
#3  [📋 Rubric]      Parsed 4 criteria: Critical Thinking, Communication,
                      Application, Research
                      → entityRefs: [criterion:critical_thinking CREATED,
                         criterion:communication CREATED, ...]
#4  [📋 Rubric]      Grade bands extracted: Distinction (70–100),
                      Merit (60–69), Pass (50–59), Fail (0–49)
                      → entityRefs: [gradeband:distinction CREATED, ...]
#5  [📋 Rubric]      User confirmed rubric structure (no edits)
                      → This is active inference: system formed a model,
                        sought confirmation, received it

--- User begins grading ---

#6  [⚙️ System]      Essay #1 uploaded (PDF, 2,800 words, Student A)
#7  [📚 References]  Extracted 6 references from Essay #1
                      → Pendant cord "References" appears for the first time
                      → entityRefs: [ref:smith2022 CREATED, ref:jones2021 CREATED, ...]
#8  [📄 Grading]     xRead scored Essay #1: Critical Thinking → Upper Merit (67),
                      Communication → Distinction (72), Application → Merit (63),
                      Research → Pass (55)
                      → Pendant cord "Grading" appears for the first time
                      → entityRefs: [criterion:critical_thinking READ, ...]
#9  [🎯 Calibration] User rated criteria via sliders:
                      Critical Thinking → 0.85 (close), Communication → 0.90 (close),
                      Application → 0.40 (off), Research → 0.25 (way off)
                      → Pendant cord "Calibration" appears for the first time
                      → Kalman filter updates triggered for all 4 criteria
                      → entityRefs: [grader_belief:critical_thinking UPDATED, ...]
#10 [🎯 Calibration] System updated beliefs: Application μ shifted -4.2,
                      Research μ shifted -8.1
                      → parentEventId: #9

--- User enriches a reference ---

#11 [📚 References]  User annotated ref:smith2022: "Methodology section weak —
                      small sample size, no control group"
                      → entityRefs: [ref:smith2022 ENRICHED]
                      → This enrichment persists in the CrossRead knowledge graph

--- Second essay ---

#12 [⚙️ System]      Essay #2 uploaded (PDF, 3,100 words, Student B)
#13 [📚 References]  Extracted 9 references from Essay #2
                      → ref:smith2022 already exists — shows prior enrichment
                      → entityRefs: [ref:smith2022 READ, ref:chen2023 CREATED, ...]
#14 [📄 Grading]     xRead scored Essay #2 (adjusted by updated beliefs):
                      Critical Thinking → Merit (64), Communication → Upper Merit (68),
                      Application → Lower Merit (60), Research → Upper Pass (58)
#15 [🎯 Calibration] User rated criteria via sliders:
                      All criteria → 0.70+ (system improving)
#16 [🎯 Calibration] System updated beliefs: convergence detected on 3/4 criteria
                      → parentEventId: #15

--- Badge fires ---

#17 [🎯 Calibration] ⚡ xRead needs help: Research criterion still at σ² = 18.3
                      (above threshold). "How would you score this excerpt on
                      Research quality?"
                      → This is an epistemic query — active inference in action
                      → initiatedBy: "system"
#18 [🎯 Calibration] User responded to epistemic query: scored excerpt at Pass (52)
                      → parentEventId: #17
                      → Kalman filter update: Research σ² drops to 14.1
```

---

## Pendant Cord Views

### Filtering on [📚 References]:

```
#7   Extracted 6 references from Essay #1
     ─ ─ ─ 3 other events ─ ─ ─
#11  User annotated ref:smith2022
#13  Extracted 9 references from Essay #2
     ─ ─ ─ 5 other events ─ ─ ─
```

### Filtering on [🎯 Calibration]:

```
     ─ ─ ─ 8 other events ─ ─ ─
#9   User rated criteria via sliders (Essay #1)
  #10  └─ System updated beliefs (subsidiary)
     ─ ─ ─ 4 other events ─ ─ ─
#15  User rated criteria via sliders (Essay #2)
  #16  └─ System updated beliefs (subsidiary)
#17  ⚡ xRead needs help: Research criterion
  #18  └─ User responded to epistemic query
```

### Entity View for ref:smith2022:

```
#7   CREATED    — Extracted from Essay #1 bibliography
#11  ENRICHED   — User annotated: "Methodology section weak..."
#13  READ       — Found in Essay #2 bibliography (prior enrichment shown)
```

---

## Meta-Event Aggregation

After grading 10 essays, the timeline might have 60+ events. Automatic aggregation groups them:

```
[Meta] Essays #1–3 Grading Session (18 events)
  → Expand to see individual grading, feedback, and reference events
[Meta] Essays #4–7 Grading Session (24 events)
  → Expand to see individual events
[Meta] Calibration Summary (8 events)
  → Shows confidence progression across all criteria
```

---

## Active Inference Events

The following events demonstrate active inference within the Quipu timeline:

1. **Rubric Parsing (#2–#5):** System perceives rubric → forms generative model → acts to reduce uncertainty by seeking user confirmation
2. **Post-Grade Feedback (#9, #15):** System predicts grades → user rates accuracy → prediction error drives belief update
3. **Epistemic Query (#17–#18):** System identifies high-uncertainty criterion → actively seeks targeted information → updates model

Each of these is visible on the timeline as a standard event, making the AI's learning process transparent and navigable.

---

## Quipu Bundle Example: Cross-Grader Calibration

A course coordinator at Hult creates a bundle to monitor grading consistency:

**Bundle:** "Critical Thinking Calibration — All MBA Graders"

```
Configuration:
  pendantCordTypes: ["calibration.rubric_feedback"]
  entityFilter: { entityType: "rubric_criterion", entityId: "critical_thinking" }
  userIds: ["grader_niland", "grader_sarah", "grader_james"]
  accessLevel: "team"
```

**Bundle view:**
```
Mar 3  [🎯 Niland]  Critical Thinking → 0.85 (close match)
Mar 3  [🎯 Sarah]   Critical Thinking → 0.45 (significant gap)
Mar 4  [🎯 James]   Critical Thinking → 0.70 (moderate match)
Mar 4  [🎯 Niland]  Critical Thinking → 0.90 (converging)
Mar 5  [🎯 Sarah]   Critical Thinking → 0.60 (improving)
       ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
       Aggregate: mean = 0.70, σ = 0.17
       Niland: converged | Sarah: improving | James: stable
```

This tells the coordinator: Niland's model has learned his voice well, James is stable but not fully calibrated, and Sarah's model is still learning — she may benefit from additional calibration sessions. None of this required any grader to share their individual timelines manually. The bundle reads across their quipus automatically.

---

## Narrative Composition Example

A grader shift-clicks `[📚 References]` + `[🎯 Calibration]` to compose:

**Saved narrative:** "References & Calibration"

```
#7   [📚 References]  Extracted 6 references from Essay #1
#9   [🎯 Calibration] Slider feedback: Application → 0.40 (off)
     ─ ─ ─ 1 other event ─ ─ ─
#11  [📚 References]  Annotated ref:smith2022 (methodology weak)
     ─ ─ ─ 1 other event ─ ─ ─
#13  [📚 References]  Extracted 9 references from Essay #2
     ─ ─ ─ 1 other event ─ ─ ─
#15  [🎯 Calibration] Slider feedback: all criteria → 0.70+ (improving)
```

This narrative reveals the relationship between the grader's engagement with references and their calibration trajectory — a story that would be invisible in either pendant cord viewed alone.
