# Example: Humanitarian Response (NGO Coordination)

**Domain:** Multi-agency disaster relief and aid distribution  
**Application:** Humanitarian coordination platform  
**Conformance Level:** Level 4 (Bundled Quipu)

---

## The Response Is the Quipu

After a disaster, information is the scarcest resource. Field teams radio situation reports. Logistics coordinators track supply movements. Medical teams triage and treat. Donor liaisons compile funding requests. Government authorities issue access permits. And coordinating bodies like OCHA or IFRC try to maintain a common operating picture across dozens of agencies, each with their own reporting cadence, terminology, and priorities.

Currently this information lives in OCHA's ReliefWeb, agency-specific platforms, WhatsApp groups, email chains, spreadsheets, and printed situation reports. No one has the complete picture. A field nurse knows what she's treating but not what supplies are en route. A logistics coordinator knows what's moving but not what the medical teams need most urgently. A donor knows what they've funded but not whether it's reached beneficiaries.

In Quipu Architecture, **the response is the primary cord.** Every field report, supply movement, medical intervention, funding event, access decision, and coordination meeting is a knot on a single timeline. Each agency's events are tagged by actor. Pendant cord filters let any stakeholder extract exactly the view they need — without any single agency having to compile reports for every other agency.

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | Response activated |
| `sitrep` | Situation Report | 📋 | First field assessment or status update |
| `medical` | Medical | 🏥 | First triage, treatment, or health event |
| `logistics` | Logistics | 📦 | First supply request, shipment, or distribution |
| `shelter` | Shelter | 🏠 | First shelter assessment, setup, or allocation |
| `protection` | Protection | 🛡️ | First protection concern, GBV report, or child welfare event |
| `funding` | Funding | 💰 | First donor pledge, disbursement, or financial report |
| `access` | Access | 🚧 | First access constraint, permit, or security event |
| `coordination` | Coordination | 🤝 | First inter-agency meeting or cluster decision |
| `beneficiary` | Beneficiary | 👤 | First beneficiary registration or feedback event |

---

## Sample Timeline: Response ER-2026-TUR-002

**Event:** Earthquake, magnitude 6.8, southeastern Türkiye  
**Affected population:** ~45,000  
**Coordinating body:** OCHA  
**Duration shown:** First 72 hours

```
#1  [⚙️ System]        Emergency response activated: ER-2026-TUR-002
                        Earthquake M6.8, Adıyaman Province.
                        OCHA flash update: est. 45,000 affected.
                        → entityRefs: [disaster:tur_eq_2026 CREATED,
                           region:adiyaman CREATED]

#2  [📋 Sitrep]        IFRC field team: Initial assessment, Kuyucak district.
                        ~3,200 displaced. Multiple building collapses.
                        Road to Kuyucak passable but damaged.
                        → Pendant cord "Sitrep" appears
                        → entityRefs: [location:kuyucak CREATED]

#3  [📋 Sitrep]        MSF rapid assessment: Gölbaşı sub-district.
                        ~1,800 displaced. Hospital partially collapsed.
                        Operating theatre intact. Walking wounded
                        arriving on foot.
                        → entityRefs: [location:golbasi CREATED,
                           facility:golbasi_hospital CREATED]

#4  [🏥 Medical]       MSF: Triage established at Gölbaşı hospital.
                        42 patients in first 3 hours. 8 critical
                        (crush injuries), 14 serious, 20 minor.
                        → Pendant cord "Medical" appears

#5  [🚧 Access]        AFAD (Turkish disaster authority): Bridge on
                        Route D360 between Adıyaman and Gölbaşı collapsed.
                        Alternative route via Kahta adds 90 minutes.
                        → Pendant cord "Access" appears
                        → entityRefs: [route:d360 CREATED]

#6  [📦 Logistics]     IFRC: Emergency stockpile request from
                        Ankara warehouse. 2,000 shelter kits,
                        5,000 hygiene kits, 500 winterisation kits.
                        → Pendant cord "Logistics" appears

#7  [🤝 Coordination]  OCHA: First inter-agency coordination meeting.
                        Cluster leads assigned:
                        - Shelter: IFRC
                        - Health: WHO + MSF
                        - WASH: UNICEF
                        - Protection: UNHCR
                        - Logistics: WFP
                        → Pendant cord "Coordination" appears

#8  [🏥 Medical]       WHO: Mobile health team deployed to Kuyucak.
                        Setting up field clinic at school gymnasium.
                        → entityRefs: [facility:kuyucak_field_clinic CREATED]

#9  [🏠 Shelter]       IFRC: Emergency shelter assessment, Kuyucak.
                        ~600 households need immediate shelter.
                        Temperature forecast: -4°C overnight.
                        → Pendant cord "Shelter" appears
                        → entityRefs: [location:kuyucak ENRICHED]

#10 [📦 Logistics]     WFP: Convoy departed Ankara warehouse.
                        22 trucks. ETA Adıyaman: 8 hours.
                        Routing via Kahta (D360 bridge down).
                        → entityRefs: [route:d360 READ]

#11 [💰 Funding]       CERF (Central Emergency Response Fund):
                        $2M rapid grant approved for immediate
                        life-saving activities.
                        → Pendant cord "Funding" appears

#12 [🛡️ Protection]    UNHCR: Protection monitoring initiated.
                        Reports of unaccompanied minors in Kuyucak
                        displacement site. 7 children identified,
                        3 under age 5.
                        → Pendant cord "Protection" appears
                        → entityRefs: [protection_case:uac_kuyucak CREATED]

#13 [🚧 Access]        Military checkpoint established on Kahta route.
                        Humanitarian vehicles require AFAD coordination
                        letter for passage. 2-hour processing delay
                        reported.

#14 [🤝 Coordination]  OCHA: Access negotiation with military command.
                        Humanitarian corridor agreement reached.
                        Pre-cleared vehicle list to be submitted daily.

#15 [📦 Logistics]     WFP convoy arrived Adıyaman. 3-hour delay
                        at Kahta checkpoint (pre-clearance list not
                        yet in effect).

#16 [🏠 Shelter]       IFRC: 400 emergency tents erected at Kuyucak
                        displacement site. Capacity: ~2,000 people.
                        Winterisation kits distributed to vulnerable
                        families (elderly, disabled, families with
                        infants).
                        → entityRefs: [location:kuyucak ENRICHED]

#17 [🏥 Medical]       MSF Gölbaşı: surgical team operational.
                        4 crush injury surgeries completed.
                        2 patients stabilised for transfer to
                        Adıyaman State Hospital.

#18 [📋 Sitrep]        OCHA: 48-hour consolidated sitrep.
                        Total assessed: 14,200 of est. 45,000.
                        Immediate needs: shelter (critical),
                        health (high), WASH (high), protection (medium).
                        → entityRefs: [disaster:tur_eq_2026 ENRICHED]

#19 [👤 Beneficiary]   IFRC: Beneficiary registration opened at
                        Kuyucak site. 847 households registered
                        in first 6 hours. Data collected: household
                        size, vulnerabilities, pre-disaster housing,
                        specific needs.
                        → Pendant cord "Beneficiary" appears

#20 [💰 Funding]       ECHO (EU humanitarian aid): €5M pledge
                        for shelter and WASH. Disbursement pending
                        needs assessment validation.

#21 [📋 Sitrep]        Joint assessment team (IFRC + UNICEF + WHO):
                        Gölbaşı sub-district fully assessed.
                        4,200 displaced. Water supply contaminated.
                        WASH intervention highest priority.
                        → entityRefs: [location:golbasi ENRICHED]

#22 [🤝 Coordination]  OCHA: 72-hour coordination meeting.
                        Flash appeal to be launched: $28M target.
                        Priorities: shelter winterisation, WASH
                        restoration, surgical capacity, protection
                        of unaccompanied minors.
                        → entityRefs: [disaster:tur_eq_2026 ENRICHED]
```

---

## Pendant Cord Views

### Donor Reporting: [💰 Funding] + [📋 Sitrep]

A donor (ECHO) needs to see what they're funding and whether needs justify the investment:

```
#2   IFRC: Kuyucak — 3,200 displaced, building collapses
#3   MSF: Gölbaşı — 1,800 displaced, hospital partially collapsed
#11  CERF: $2M rapid grant approved
#18  OCHA 48hr sitrep: 14,200 assessed, shelter critical
#20  ECHO: €5M pledged for shelter + WASH
#21  Joint assessment: Gölbaşı — 4,200 displaced, water contaminated
#22  Flash appeal: $28M target
```

Seven events. The donor sees the evolving scale of need alongside the funding response — without logistics details, access negotiations, or medical specifics.

### Medical Coordination: [🏥 Medical]

WHO health cluster lead needs the clinical picture:

```
#4   MSF Gölbaşı: 42 patients triaged (8 critical, 14 serious, 20 minor)
     ─ ─ ─ 3 other events ─ ─ ─
#8   WHO mobile team deployed to Kuyucak field clinic
     ─ ─ ─ 8 other events ─ ─ ─
#17  MSF Gölbaşı: 4 surgeries, 2 transfers to state hospital
```

Three events. Pure medical narrative.

### Access & Security: [🚧 Access] + [🤝 Coordination]

An operations manager planning convoy routes:

```
#5   Bridge collapsed on D360. Alternative: Kahta (+90 min)
#7   Cluster leads assigned. Logistics: WFP.
     ─ ─ ─ 5 other events ─ ─ ─
#13  Military checkpoint on Kahta route. 2hr processing delay.
#14  OCHA negotiated humanitarian corridor. Pre-clearance list daily.
     ─ ─ ─ 7 other events ─ ─ ─
#22  72hr coordination: flash appeal priorities set
```

Five events. The full access picture: what's blocked, what's been negotiated, what's the current protocol.

### Protection Monitoring: [🛡️ Protection] + [👤 Beneficiary]

UNHCR protection officer:

```
     ─ ─ ─ 11 other events ─ ─ ─
#12  7 unaccompanied minors identified in Kuyucak (3 under 5)
     ─ ─ ─ 6 other events ─ ─ ─
#19  847 households registered. Vulnerability data collected.
```

Two events. The protection officer can immediately cross-reference the unaccompanied minors case against the beneficiary registration data to check whether these children's families have been found.

---

## Quipu Bundle: Cross-Response Learning

A regional disaster preparedness coordinator bundles all earthquake responses in the last 3 years:

**Bundle:** "Earthquake Responses — Türkiye 2024–2026"

```
Configuration:
  pendantCordTypes: ["access", "logistics", "coordination"]
  entityFilter: { entityType: "disaster", attributes: { type: "earthquake", country: "TUR" } }
  dateRange: { from: "2024-01-01", to: "2026-12-31" }
  accessLevel: "organisation"
```

**Bundle view:**

```
Feb 2023  [🚧 ER-TUR-001]  Multiple bridges collapsed. Access delays: 5 days.
Feb 2023  [🤝 ER-TUR-001]  Humanitarian corridor took 72hrs to negotiate.
Feb 2023  [📦 ER-TUR-001]  Ankara warehouse depleted in 48hrs. Resupply from Dubai: +4 days.
Mar 2026  [🚧 ER-TUR-002]  Bridge on D360 collapsed. Alternative: +90min.
Mar 2026  [🤝 ER-TUR-002]  Humanitarian corridor negotiated in 12hrs (faster this time).
Mar 2026  [📦 ER-TUR-002]  Ankara warehouse stock sufficient for first 72hrs.
          ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
          Pattern: bridge collapse is a recurring access bottleneck
          Improvement: corridor negotiation time reduced from 72hrs → 12hrs
          Improvement: pre-positioning strategy increased warehouse endurance
          Recommendation: advocate for seismic bridge reinforcement on D360 corridor
```

The bundle reveals institutional learning: corridor negotiation improved dramatically between responses (72 hours → 12 hours), pre-positioned stock lasted longer, but bridge vulnerability on D360 remains a systemic risk. This is the kind of cross-response intelligence that currently takes months of manual review to compile.

---

## Why Humanitarian Response Is a Natural Fit

Disaster response is inherently:

1. **Linear under pressure** — events unfold in strict sequence, often minute by minute in the first 72 hours
2. **Multi-agency** — OCHA, IFRC, MSF, WHO, UNICEF, UNHCR, WFP, national authorities, military, donors — all contributing events to the same crisis
3. **Multi-audience** — donors need funding justification, medical teams need clinical data, logistics needs access routes, protection needs vulnerability data, media needs public-facing updates — all from the same response
4. **Life-critical filtering** — a field nurse filtering for medical events and a logistics coordinator filtering for supply events are making decisions that directly affect survival
5. **Persistent entity enrichment** — locations, facilities, and affected populations are enriched continuously as assessments improve (Kuyucak: 3,200 → updated, Gölbaşı: 1,800 → 4,200)
6. **Bundleable for institutional learning** — cross-response bundles reveal patterns in access constraints, supply chain bottlenecks, and coordination improvements that inform future preparedness

The response is the quipu. The donor report is a pendant cord view. The preparedness strategy is a bundle.

---

## A Note on the Metaphor

There is a particular resonance in applying Quipu Architecture to humanitarian contexts. The original quipu was a tool for governing a vast, diverse empire across difficult terrain — coordinating resources, tracking populations, and maintaining administrative coherence across thousands of kilometres. Modern humanitarian coordination faces strikingly similar challenges: multiple authorities, diverse populations, difficult terrain, urgent resource allocation, and the need for a common operating picture that multiple stakeholders can read from different angles.

The quipu was never just an accounting tool. It was an information architecture for complex, multi-actor coordination under constraint. That is exactly what disaster response demands.
