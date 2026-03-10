# Example: Editorial Workflow (CrossRead)

**Domain:** Academic journal peer review and editorial decision-making  
**Application:** CrossRead editorial management system  
**Conformance Level:** Level 2 (Full Quipu)

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | Manuscript submission |
| `review` | Peer Review | 👁️ | First reviewer assignment or report |
| `revision` | Revision | ✏️ | First revision request or submission |
| `reference` | References | 📚 | First reference check or enrichment |
| `decision` | Decision | ⚖️ | First editorial decision event |
| `communication` | Communication | 💬 | First author/reviewer message |

---

## Sample Timeline

```
#1  [⚙️ System]         Manuscript MS-2026-0142 submitted
                         "AI-Assisted Thematic Analysis of Mindfulness Attrition"
                         → entityRefs: [manuscript:ms-2026-0142 CREATED]

#2  [⚖️ Decision]       Editor assigned: Dr. Patel
                         → Pendant cord "Decision" appears

#3  [👁️ Peer Review]    Reviewer A assigned (expertise: qualitative methods)
                         → Pendant cord "Peer Review" appears
#4  [👁️ Peer Review]    Reviewer B assigned (expertise: digital health)

#5  [📚 References]      Reference check: 42 citations extracted, 3 flagged as
                         retracted or corrected
                         → Pendant cord "References" appears
                         → entityRefs: [ref:wang2019 FLAGGED, ref:lee2020 FLAGGED,
                            ref:patel2018 FLAGGED]

#6  [👁️ Peer Review]    Reviewer A report received: Minor Revisions
                         "Strong methodology; literature review needs updating"
                         → entityRefs: [manuscript:ms-2026-0142 UPDATED]
#7  [👁️ Peer Review]    Reviewer B report received: Major Revisions
                         "Interesting but sample too homogeneous; expand discussion"

#8  [⚖️ Decision]       Editorial decision: Major Revisions
                         → entityRefs: [manuscript:ms-2026-0142 UPDATED]

#9  [💬 Communication]   Revision letter sent to author
                         → Pendant cord "Communication" appears

#10 [✏️ Revision]        Revised manuscript received (v2)
                         → Pendant cord "Revision" appears
                         → entityRefs: [manuscript:ms-2026-0142 UPDATED]

#11 [📚 References]      Reference re-check: 2 flagged references replaced,
                         1 retained with justification
                         → entityRefs: [ref:wang2019 UPDATED, ref:lee2020 UPDATED]

#12 [👁️ Peer Review]    Reviewer A re-review: Accept
#13 [👁️ Peer Review]    Reviewer B re-review: Minor Revisions

#14 [⚖️ Decision]       Editorial decision: Accept with Minor Revisions
#15 [✏️ Revision]        Final manuscript received (v3)
#16 [⚖️ Decision]       Editorial decision: Accept
```

---

## Key Differences from Grading Workflow

This example demonstrates Quipu Architecture in a **multi-actor, longer-timescale** context. The same core principles apply — single linear timeline, dynamic pendant discovery, filtered projections — but the events span weeks or months rather than minutes, and multiple human actors contribute events to the same timeline.

The editor's experience is a single continuous narrative of the manuscript's journey, filterable by concern (reviews, revisions, references, decisions) at any time.
