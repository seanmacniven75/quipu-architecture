# Example: Sales Pipeline / CRM

**Domain:** B2B enterprise sales deal management  
**Application:** CRM platform  
**Conformance Level:** Level 4 (Bundled Quipu)

---

## The Deal Is the Quipu

In traditional CRMs, a deal record contains fields (stage, value, close date) and a sidebar of "activities" — calls, emails, meetings — listed in a flat log. Notes live in one tab, emails in another, proposals in a third. The salesperson reconstructs the narrative mentally; the VP of Sales reconstructs it from a dashboard that shows pipeline stages but not the story of how a deal got there.

In Quipu Architecture, **the deal is the primary cord.** Every touchpoint — discovery call, competitor mention, technical evaluation, pricing negotiation, legal review, champion interaction — is a knot on a single timeline. The deal stage isn't a dropdown field that someone updates manually; it emerges from the events themselves. And when a deal is won or lost, the quipu tells you exactly why, in sequence.

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | Deal created |
| `outreach` | Outreach | 📤 | First email, call, or LinkedIn message |
| `discovery` | Discovery | 🔍 | First qualification or needs-analysis event |
| `champion` | Champion | ⭐ | First interaction with an internal advocate |
| `technical` | Technical | 🔧 | First demo, POC, or technical evaluation |
| `commercial` | Commercial | 💰 | First pricing discussion or proposal |
| `legal` | Legal | 📜 | First contract, NDA, or procurement event |
| `competitive` | Competitive | ⚔️ | First competitor mention or displacement event |
| `risk` | Risk Signal | ⚠️ | First deal risk identified |
| `decision` | Decision | ✅ | First stage change, win, or loss |

---

## Sample Timeline: Deal #DL-7291

**Account:** NovaMed Health Systems (1,200 employees)  
**Product:** CloudSync Pro — Enterprise tier  
**Deal Value:** €186,000 ARR  
**Sales Cycle:** 68 days

```
#1  [⚙️ System]        Deal created. Source: inbound demo request.
                        → entityRefs: [account:novamed CREATED,
                           contact:dr_elena_voss CREATED]

#2  [📤 Outreach]      SDR Lena: Initial qualifying call with Dr. Voss
                        (CTO). 22 minutes.
                        → Pendant cord "Outreach" appears
                        Notes: Current solution is legacy on-prem file
                        server. Compliance deadline forcing cloud migration
                        by Q3. Budget approved.

#3  [🔍 Discovery]     AE Jordan: Discovery call. Pain points identified:
                        1. HIPAA compliance gap with current system
                        2. Remote clinics can't access shared files reliably
                        3. IT team of 4 managing 1,200 users manually
                        → Pendant cord "Discovery" appears
                        → entityRefs: [account:novamed ENRICHED]

#4  [⚔️ Competitive]   Dr. Voss mentioned evaluating Dropbox Business
                        and Box Enterprise alongside CloudSync.
                        → Pendant cord "Competitive" appears
                        → entityRefs: [competitor:dropbox READ,
                           competitor:box READ]

#5  [⭐ Champion]       Dr. Voss introduced us to Raj Patel (IT Director).
                        Raj is the day-to-day decision influencer.
                        "He'll be running the technical evaluation."
                        → Pendant cord "Champion" appears
                        → entityRefs: [contact:raj_patel CREATED]

#6  [🔧 Technical]     SE Marta: Product demo for Raj + 2 IT staff.
                        45 minutes. Focused on HIPAA compliance module
                        and remote clinic sync.
                        → Pendant cord "Technical" appears
                        Feedback: "Impressed by compliance dashboard.
                        Concerned about migration from on-prem."

#7  [🔧 Technical]     SE Marta: Migration assessment call with Raj.
                        Scoped: 4.2TB data, 340 folder structures,
                        12 permission groups. Estimated 3-week migration
                        with dedicated support.
                        → entityRefs: [account:novamed ENRICHED]

#8  [⚔️ Competitive]   Raj: "Dropbox can't do the compliance piece.
                        We've narrowed to CloudSync and Box."
                        → entityRefs: [competitor:dropbox UPDATED,
                           competitor:box READ]

#9  [💰 Commercial]    AE Jordan: Sent initial proposal. €186,000 ARR.
                        Includes: Enterprise tier (1,200 seats),
                        HIPAA module, dedicated migration support,
                        premium SLA.
                        → Pendant cord "Commercial" appears

#10 [⚠️ Risk]          Raj flagged: "Procurement wants to see
                        penetration testing results before signing.
                        They're also pushing for a 15% discount."
                        → Pendant cord "Risk Signal" appears
                        → entityRefs: [contact:raj_patel READ]

#11 [💰 Commercial]    Jordan: Shared SOC 2 Type II report and
                        penetration test summary with procurement.
                        Countered discount request with 2-year
                        commitment option at 8% discount.

#12 [📜 Legal]         NovaMed legal sent redlined MSA.
                        Key changes: data residency clause (EU-only),
                        liability cap modification, 90-day termination
                        instead of 30.
                        → Pendant cord "Legal" appears

#13 [📜 Legal]         CloudSync legal responded: accepted EU residency,
                        countered on liability and termination (60 days).
                        → parentEventId: #12

#14 [⭐ Champion]      Raj (internal): "Elena is presenting to the board
                        next Tuesday. She needs a one-page executive
                        summary and ROI projection."
                        → entityRefs: [contact:dr_elena_voss READ]

#15 [📤 Outreach]      Jordan: Sent executive summary and ROI doc
                        to Dr. Voss. Projected 34% reduction in IT
                        admin overhead + compliance risk elimination.

#16 [⭐ Champion]      Raj: "Board approved. Elena has sign-off.
                        Legal is finalising this week."

#17 [📜 Legal]         MSA signed. 2-year commitment, 8% discount.
                        €171,120 ARR (adjusted).
                        → entityRefs: [account:novamed UPDATED]

#18 [✅ Decision]      Deal closed — WON. €171,120 ARR.
                        → Pendant cord "Decision" appears
                        → entityRefs: [account:novamed UPDATED]
                        Sales cycle: 68 days. Touches: 18.

#19 [⚙️ System]        Deal #DL-7291 closed. Handoff to Customer
                        Success initiated.
```

---

## Pendant Cord Views

### Deal Review (Sales Manager): [🔍 Discovery] + [⚔️ Competitive] + [⚠️ Risk] + [✅ Decision]

The strategic arc — why we won, what we were up against, and what almost derailed it:

```
#3   Discovery: HIPAA gap, remote access, small IT team
#4   Competitive: Evaluating Dropbox, Box, CloudSync
#8   Competitive: Dropbox eliminated on compliance. Box remaining.
#10  Risk: Procurement wants pen test, pushing for 15% discount
     ─ ─ ─ 7 other events ─ ─ ─
#18  WON. €171,120 ARR. 68-day cycle.
```

Five events. The entire strategic narrative of a 68-day deal in five lines.

### Technical Handoff (Customer Success): [🔧 Technical] + [📜 Legal]

What CS needs to know for onboarding:

```
#6   Demo: HIPAA compliance + remote sync. Concern: migration.
#7   Migration scoped: 4.2TB, 340 folders, 12 groups, 3 weeks.
     ─ ─ ─ 4 other events ─ ─ ─
#12  Legal: EU data residency, modified liability, 60-day termination
  #13  └─ Accepted residency, countered liability/termination
#17  MSA signed: 2-year, 8% discount
```

Five events. CS knows the technical commitments and contractual terms without reading the entire deal history.

### Champion Influence Map: [⭐ Champion]

```
#5   Dr. Voss introduced Raj Patel (IT Director, eval owner)
     ─ ─ ─ 8 other events ─ ─ ─
#14  Raj: "Elena presenting to board Tuesday. Needs exec summary."
#16  Raj: "Board approved. Legal finalising."
```

Three events. The champion's role in the deal is crystal clear — they were the bridge to the technical evaluation (#5), the early warning system for board timing (#14), and the signal that the deal was closing (#16).

---

## Quipu Bundle: Win/Loss Intelligence

A VP of Sales bundles all closed deals from Q1:

**Bundle:** "Closed Deals Q1 — Competitive Patterns"

```
Configuration:
  pendantCordTypes: ["competitive", "decision"]
  dateRange: { from: "2026-01-01", to: "2026-03-31" }
  userIds: ["ae_jordan", "ae_sam", "ae_priya", "ae_kenji"]
  accessLevel: "team"
```

**Bundle view:**

```
Jan 12  [⚔️ Jordan]  DL-7103: Competitor = Box. Weakness: migration support
Jan 28  [✅ Jordan]  DL-7103: WON (€94k). Box eliminated on migration.
Feb 5   [⚔️ Priya]   DL-7188: Competitor = Dropbox + SharePoint
Feb 14  [⚔️ Priya]   DL-7188: SharePoint eliminated on UX. Dropbox remains.
Feb 28  [✅ Priya]    DL-7188: LOST (€220k). Dropbox won on price.
Mar 1   [⚔️ Jordan]  DL-7291: Competitor = Dropbox + Box
Mar 8   [⚔️ Jordan]  DL-7291: Dropbox eliminated on compliance
Mar 18  [✅ Jordan]  DL-7291: WON (€171k). Box eliminated on migration.
        ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
        Aggregate: 3 competitive deals, 2 won, 1 lost
        Box: eliminated 2/2 times (migration weakness)
        Dropbox: eliminated 1/2 (compliance), won 1/2 (price)
        Key loss factor: price sensitivity when compliance isn't a driver
        Suggested playbook update: lead with compliance early in cycle
```

The VP never asked anyone to write a competitive analysis. The quipus told the story.

---

## Why Sales Is a Natural Fit

Sales deals are inherently:

1. **Linear** — deals progress through stages over weeks or months
2. **Multi-actor** — SDR, AE, SE, legal, procurement, champion, economic buyer
3. **Multi-audience** — sales manager sees strategy, CS sees technical commitments, legal sees contract terms
4. **Relationship-rich** — champions, competitors, and risk signals are persistent entities that span deals
5. **Bundleable** — win/loss analysis, competitive intelligence, and rep performance emerge from cross-deal bundles
6. **Narratively complex** — why a deal was won or lost is a story, not a field value

The deal is the quipu. The win/loss analysis is a pendant cord view. The competitive playbook is a bundle.
