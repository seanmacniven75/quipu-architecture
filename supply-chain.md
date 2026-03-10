# Example: Supply Chain / Logistics

**Domain:** International order fulfilment and shipment tracking  
**Application:** Supply chain management platform  
**Conformance Level:** Level 4 (Bundled Quipu)

---

## The Shipment Is the Quipu

In traditional logistics platforms, an order has a "tracking page" showing waypoints, a separate "documents" tab for customs paperwork, a "communications" log for broker and carrier messages, and a "financials" tab for invoicing and duties. The supply chain manager mentally reconstructs the full story by jumping between views. When something goes wrong — a delay, a customs hold, a damaged pallet — the root cause is buried across tabs.

In Quipu Architecture, **the shipment is the primary cord.** Every event — from purchase order to warehouse pick to customs clearance to final delivery — is a knot on a single timeline. Delays, inspections, and exceptions are visible in the same sequence as routine progress. The pendant cord filters let you isolate "just the customs story" or "just the financial story" without losing the context of what else was happening.

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `system` | System | ⚙️ | Order created |
| `warehouse` | Warehouse | 🏭 | First pick, pack, or inventory event |
| `transport` | Transport | 🚛 | First carrier assignment or movement scan |
| `customs` | Customs | 🛃 | First customs document or clearance event |
| `financial` | Financial | 💶 | First invoice, duty, or payment event |
| `quality` | Quality | ✅ | First inspection or quality check |
| `exception` | Exception | ⚠️ | First delay, damage, or hold event |
| `communication` | Communication | 💬 | First message to/from carrier, broker, or customer |

---

## Sample Timeline: Order #PO-2026-4410

**Buyer:** Bauer Elektronik GmbH (Mannheim, Germany)  
**Supplier:** Shenzhen Voltaic Components Ltd (Shenzhen, China)  
**Goods:** 12,000 capacitor units (4 pallets)  
**Route:** Shenzhen → Hong Kong → Rotterdam → Mannheim  
**Incoterms:** DDP (Delivered Duty Paid)

```
#1  [⚙️ System]        PO-2026-4410 created. 12,000 units.
                        Delivery window: Mar 1–15.
                        → entityRefs: [buyer:bauer_elektronik READ,
                           supplier:voltaic_components READ,
                           product:cap_220uf READ]

#2  [💶 Financial]      Proforma invoice received: €28,400
                        Payment terms: 30% advance, 70% on B/L
                        → Pendant cord "Financial" appears

#3  [💶 Financial]      Advance payment sent: €8,520
                        → parentEventId: #2

#4  [🏭 Warehouse]     Voltaic: Production complete. 12,000 units packed.
                        4 pallets, 1,840 kg gross.
                        → Pendant cord "Warehouse" appears
                        → entityRefs: [supplier:voltaic_components READ]

#5  [✅ Quality]        Pre-shipment inspection (SGS): PASSED
                        AQL 2.5, Level II. 0 critical defects,
                        2 minor (within tolerance).
                        → Pendant cord "Quality" appears
                        → entityRefs: [inspection:sgs_4410 CREATED]

#6  [🚛 Transport]     Carrier assigned: Maersk. Container MSKU7294831.
                        ETD Shenzhen: Feb 18. ETA Rotterdam: Mar 8.
                        → Pendant cord "Transport" appears
                        → entityRefs: [carrier:maersk READ,
                           container:MSKU7294831 CREATED]

#7  [🛃 Customs]        Export declaration filed (Shenzhen Customs).
                        HS Code: 8532.24. Value declared: €28,400.
                        → Pendant cord "Customs" appears

#8  [🚛 Transport]     Container loaded. Vessel: Maersk Elba.
                        Departed Shenzhen port.

#9  [🚛 Transport]     Transhipment: Hong Kong. Container transferred
                        to Maersk Eindhoven. ETD HK: Feb 20.

#10 [💶 Financial]      Balance payment triggered on B/L issuance: €19,880
                        → entityRefs: [document:bill_of_lading_4410 CREATED]

#11 [🚛 Transport]     In transit. Last position: Strait of Malacca.
                        On schedule.

#12 [⚠️ Exception]     Vessel delay notification: Maersk Eindhoven
                        diverted to avoid storm system in Indian Ocean.
                        Revised ETA Rotterdam: Mar 11 (+3 days).
                        → Pendant cord "Exception" appears
                        → entityRefs: [carrier:maersk READ]

#13 [💬 Communication]  Freight broker Hans notified buyer Bauer Elektronik
                        of 3-day delay. Updated delivery window: Mar 13–17.
                        → Pendant cord "Communication" appears

#14 [💬 Communication]  Bauer (Purchasing Mgr Klara): "Acknowledged.
                        Our production line can absorb 3 days. Please
                        confirm immediately if further delays occur."

#15 [🚛 Transport]     Arrived Rotterdam. Container discharged.

#16 [🛃 Customs]        EU import declaration filed. Customs broker:
                        DHL Global Forwarding.
                        → entityRefs: [broker:dhl_gf READ]

#17 [🛃 Customs]        Customs hold: Random inspection selected.
                        Physical examination of container scheduled.
                        → entityRefs: [customs_event:inspection_4410 CREATED]

#18 [⚠️ Exception]     Customs inspection delay: estimated 24–48 hours.
                        → parentEventId: #17

#19 [💬 Communication]  Hans to Bauer: "Container held for random customs
                        inspection in Rotterdam. Expected release within
                        48 hours. Revised delivery: Mar 15–17."

#20 [💬 Communication]  Klara: "That's still within our window. Proceed."

#21 [🛃 Customs]        Inspection complete. No issues found. Released.
                        → parentEventId: #17

#22 [💶 Financial]      Import duties and VAT assessed: €4,118
                        (14.5% duty + 19% VAT on CIF value)
                        → entityRefs: [customs_event:inspection_4410 READ]

#23 [🚛 Transport]     Last-mile transport: Rotterdam → Mannheim.
                        Carrier: DB Schenker. ETD: Mar 14 AM.

#24 [🚛 Transport]     Delivered to Bauer Elektronik warehouse, Mannheim.
                        Signed by: J. Weber (Warehouse Mgr).

#25 [✅ Quality]        Incoming inspection (Bauer QC): PASSED.
                        Random sample 200 units. 0 defects.
                        → entityRefs: [inspection:bauer_qc_4410 CREATED]

#26 [⚙️ System]        PO-2026-4410 complete. Total transit: 24 days.
                        Delays: 3 days (weather) + 2 days (customs).
                        Delivery: within revised window.
```

---

## Pendant Cord Views

### Customs Audit Trail: [🛃 Customs]

A compliance officer needs to verify all customs documentation:

```
#7   Export declaration: Shenzhen, HS 8532.24, €28,400
     ─ ─ ─ 8 other events ─ ─ ─
#16  EU import declaration: DHL Global Forwarding
#17  Customs hold: random inspection
  #21  └─ Inspection complete, released
```

Four events. The full customs provenance of the shipment, from export declaration to inspection clearance.

### Financial Reconciliation: [💶 Financial]

Finance needs the money trail:

```
#2   Proforma: €28,400 (30/70 terms)
  #3   └─ Advance: €8,520
     ─ ─ ─ 6 other events ─ ─ ─
#10  Balance: €19,880 (on B/L)
     ─ ─ ─ 11 other events ─ ─ ─
#22  Duties + VAT: €4,118
```

Four events. Total cost: €32,518. Complete reconciliation without opening a single spreadsheet.

### Exception Report: [⚠️ Exception] + [💬 Communication]

Risk management wants to know: what went wrong and how was it handled?

```
#12  Vessel diverted: storm, +3 days
#13  Broker notified buyer of delay
#14  Buyer: "Acknowledged. Can absorb 3 days."
     ─ ─ ─ 2 other events ─ ─ ─
#18  Customs inspection delay: +24–48 hours
#19  Broker notified buyer of hold
#20  Buyer: "Still within window. Proceed."
```

Six events. Every exception paired with its communication response. The narrative shows that both delays were handled proactively and the buyer was never surprised.

---

## Quipu Bundle: Supplier Performance

A procurement manager bundles all orders from Voltaic Components this year:

**Bundle:** "Voltaic Components — 2026 Orders"

```
Configuration:
  pendantCordTypes: ["exception", "quality", "transport"]
  entityFilter: { entityType: "supplier", entityId: "voltaic_components" }
  dateRange: { from: "2026-01-01", to: "2026-12-31" }
  accessLevel: "organisation"
```

**Bundle view:**

```
Jan 18  [✅ PO-4388]  Pre-shipment QC: PASSED (0 critical)
Jan 30  [🚛 PO-4388]  Delivered on time
Feb 12  [✅ PO-4395]  Pre-shipment QC: PASSED (1 minor)
Feb 20  [⚠️ PO-4395]  Carrier delay: port congestion (+2 days)
Mar 1   [🚛 PO-4395]  Delivered 2 days late
Mar 5   [✅ PO-4410]  Pre-shipment QC: PASSED (2 minor)
Mar 12  [⚠️ PO-4410]  Weather delay (+3 days)
Mar 13  [⚠️ PO-4410]  Customs inspection (+2 days)
Mar 15  [🚛 PO-4410]  Delivered within revised window
        ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
        Aggregate: 3 orders, 0 quality failures
        On-time: 1/3 (33%) — but delays were carrier/customs, not supplier
        Avg transit delay: 2.3 days
        Quality: 100% pass rate, trend: minor defects increasing (0→1→2)
        Recommendation: maintain supplier, flag minor defect trend for review
```

The bundle separates supplier-caused issues from carrier-caused issues — something a simple "on-time delivery %" metric would miss entirely. Voltaic's quality is consistent; the delays are external. That distinction matters for procurement decisions.

---

## Why Supply Chain Is a Natural Fit

Supply chain shipments are inherently:

1. **Linear** — goods move from origin to destination through a fixed sequence of stages
2. **Multi-actor** — supplier, carrier, customs broker, port authority, buyer, quality inspector
3. **Multi-system** — events originate from ERP, TMS, customs platforms, carrier APIs, and warehouse scanners
4. **Multi-audience** — customs sees declarations, finance sees payments, operations sees transport, QC sees inspections
5. **Exception-driven** — the interesting story is almost always "what went wrong and how was it handled"
6. **Bundleable** — supplier performance, carrier reliability, and route efficiency emerge from cross-shipment bundles

The shipment is the quipu. The customs trail is a pendant cord view. The supplier scorecard is a bundle.
