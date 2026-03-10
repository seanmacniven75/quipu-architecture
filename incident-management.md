# Example: Incident Management (DevOps War Room)

**Domain:** Production incident response and postmortem  
**Application:** Incident management platform  
**Conformance Level:** Level 4 (Bundled Quipu)

---

## The Incident Is the Quipu

During a production outage, information explodes across tools: PagerDuty fires alerts, engineers debug in terminal sessions and paste findings in Slack, a communications lead drafts customer-facing status updates, leadership asks for ETAs in a separate channel, and after resolution someone spends hours reconstructing the timeline for a postmortem document.

In Quipu Architecture, **the incident is the primary cord.** Every alert, diagnostic action, internal discussion, customer communication, and remediation step is a knot on a single timeline. The postmortem doesn't need to be written after the fact — it already exists. Filter by pendant cord and you have it: the full causal chain from trigger to resolution.

---

## Pendant Cord Types

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `alert` | Alerts | 🚨 | Incident triggered |
| `diagnostic` | Diagnostics | 🔬 | First investigation action |
| `remediation` | Remediation | 🔧 | First fix attempt |
| `internal` | Internal Comms | 💬 | First team discussion or decision |
| `external` | Customer Comms | 📢 | First status page update or customer notification |
| `leadership` | Leadership | 📊 | First exec briefing or escalation |
| `dependency` | Dependencies | 🔗 | First third-party service implicated |
| `postmortem` | Postmortem | 📝 | First postmortem annotation (can be added during or after) |

---

## Sample Timeline: INC-2026-0087

**Severity:** SEV-1  
**Service:** Payment processing pipeline  
**Impact:** 100% of transactions failing in EU region  
**Duration:** 47 minutes

```
#1  [🚨 Alert]         PagerDuty: Payment success rate dropped below 10%
                        (EU region). Threshold: 95%.
                        → entityRefs: [service:payment_pipeline READ,
                           region:eu READ, monitor:payment_success_rate READ]

#2  [🚨 Alert]         Cascading: Order service error rate spiked to 78%
                        → parentEventId: #1
                        → entityRefs: [service:order_service READ]

#3  [⚙️ System]        Incident INC-2026-0087 created. SEV-1.
                        Incident Commander: Aisha (SRE)
                        On-call engineer: Marcus (Payments team)

#4  [🔬 Diagnostics]   Marcus: Checked payment service dashboards.
                        EU pod CPU nominal, memory nominal.
                        Error logs show: "connection refused" to
                        downstream fraud-check service.
                        → Pendant cord "Diagnostics" appears
                        → entityRefs: [service:fraud_check READ]

#5  [🔬 Diagnostics]   Marcus: Fraud-check service pods healthy but
                        returning 503. Traced to database connection
                        pool exhaustion — 0 available connections,
                        200 waiting.
                        → entityRefs: [service:fraud_check_db READ]

#6  [💬 Internal]      Aisha: "Confirmed — this is a DB connection pool
                        issue on fraud-check. Marcus, can you check
                        if the connection pool config changed recently?"
                        → Pendant cord "Internal Comms" appears

#7  [🔬 Diagnostics]   Marcus: Last deployment to fraud-check was 2 hours
                        ago. Diff shows: connection pool max changed from
                        100 to 10 (typo in config PR #4521).
                        → entityRefs: [deployment:fraud_check_v2.14.3 READ,
                           pr:4521 READ]
                        → ROOT CAUSE IDENTIFIED

#8  [📝 Postmortem]    Auto-tagged: root cause = config change,
                        category = human error, trigger = deployment
                        → Pendant cord "Postmortem" appears
                        → parentEventId: #7

#9  [📢 External]      Status page updated: "We are investigating
                        payment processing failures in the EU region.
                        No data loss has occurred. ETA: 20 minutes."
                        → Pendant cord "Customer Comms" appears

#10 [📊 Leadership]    Aisha briefed VP Engineering: "Root cause identified.
                        Config typo in deploy 2hrs ago. Rolling back now.
                        No data loss — transactions are queued."
                        → Pendant cord "Leadership" appears

#11 [🔧 Remediation]   Marcus: Initiated rollback of fraud-check to v2.14.2
                        → Pendant cord "Remediation" appears
                        → entityRefs: [deployment:fraud_check_v2.14.2 CREATED]

#12 [🔧 Remediation]   Rollback complete. Connection pool restored to 100.
                        DB connections recovering — 43/100 available.
                        → parentEventId: #11

#13 [🚨 Alert]         Payment success rate recovering: 34% → 67% → 89%
                        → entityRefs: [monitor:payment_success_rate READ]

#14 [🔬 Diagnostics]   Marcus: Transaction queue draining normally.
                        12,847 queued transactions processing.
                        No data loss confirmed.

#15 [🚨 Alert]         Payment success rate back to 99.2%. Alert resolved.

#16 [📢 External]      Status page updated: "Payment processing has been
                        restored. All queued transactions are processing
                        normally. We will publish a full incident report
                        within 48 hours."

#17 [📊 Leadership]    Aisha to VP: "Resolved. 47 minutes total downtime.
                        12,847 transactions queued and now processed.
                        Zero data loss. Postmortem scheduled for tomorrow."

#18 [💬 Internal]      Aisha: "Scheduling postmortem for 10am tomorrow.
                        Key question: why did the PR review not catch a
                        10x reduction in pool size?"

--- Next day ---

#19 [📝 Postmortem]    Postmortem findings:
                        - Root cause: Typo in PR #4521 (100 → 10)
                        - Contributing factor: No automated config
                          validation for connection pool bounds
                        - Contributing factor: PR reviewer unfamiliar
                          with fraud-check service defaults
                        → entityRefs: [pr:4521 READ]

#20 [📝 Postmortem]    Action items:
                        1. Add config bounds validation to CI pipeline
                           (owner: Marcus, due: Mar 20)
                        2. Require domain-owner approval for infra config
                           changes (owner: Aisha, due: Mar 17)
                        3. Add connection pool dashboard to on-call
                           runbook (owner: Marcus, due: Mar 18)
                        → entityRefs: [action:config_validation CREATED,
                           action:domain_approval CREATED,
                           action:runbook_update CREATED]

#21 [⚙️ System]        Incident INC-2026-0087 closed.
                        Total duration: 47 minutes. TTD: 11 minutes.
                        TTR: 36 minutes. Impact: 12,847 queued txns.
                        Data loss: zero.
```

---

## Pendant Cord Views

### Auto-Generated Postmortem: [🔬 Diagnostics] + [🔧 Remediation] + [📝 Postmortem]

This is the postmortem timeline — the technical investigation, fix, and learnings, without comms noise:

```
#4   Dashboard check: CPU/memory nominal, "connection refused" to fraud-check
#5   Fraud-check: DB connection pool exhausted (0/200)
#7   Root cause: config typo in PR #4521 (100 → 10)
  #8   └─ Auto-tagged: human error, config change
#11  Rollback initiated: fraud-check v2.14.2
  #12  └─ Rollback complete, connections recovering
#14  Queue draining, no data loss confirmed
#19  Postmortem findings: typo, no config validation, reviewer gap
#20  Action items: 3 remediation tasks assigned
```

Eleven events. The postmortem effectively writes itself — the investigation already happened chronologically on the quipu.

### Customer-Facing Narrative: [📢 External]

```
#9   "Investigating payment failures in EU region. No data loss. ETA: 20 min."
     ─ ─ ─ 6 other events ─ ─ ─
#16  "Restored. All queued transactions processing. Full report within 48hrs."
```

Two events. That's the entire customer-facing story.

### Executive Briefing: [📊 Leadership]

```
     ─ ─ ─ 9 other events ─ ─ ─
#10  "Root cause identified. Config typo. Rolling back. No data loss."
     ─ ─ ─ 6 other events ─ ─ ─
#17  "Resolved. 47 min downtime. 12,847 txns queued and processed. Zero loss."
```

Two events. VP gets the full picture in two lines.

---

## Sub-Action Discovery

Clicking `[🚨 Alerts]` reveals:

```
[ 🚨 Alerts (4) ▾ ]
  [ Triggered (2) ] [ Cascading (1) ] [ Resolved (1) ]
```

Clicking `[📝 Postmortem]` reveals:

```
[ 📝 Postmortem (3) ▾ ]
  [ Root Cause (1) ] [ Findings (1) ] [ Action Items (1) ]
```

---

## Quipu Bundle: Reliability Trends

An SRE manager bundles all SEV-1 incidents from the quarter:

**Bundle:** "SEV-1 Incidents — Q1 2026"

```
Configuration:
  pendantCordTypes: ["alert", "postmortem"]
  filter: severity = "SEV-1"
  dateRange: { from: "2026-01-01", to: "2026-03-31" }
  accessLevel: "organisation"
```

**Bundle view:**

```
Jan 8   [🚨 INC-0034]  Auth service — certificate expiry
  [📝]  Root cause: cert rotation cron disabled during migration
Feb 2   [🚨 INC-0051]  Search indexer — OOM kill cascade
  [📝]  Root cause: unbounded result set from new query pattern
Mar 3   [🚨 INC-0087]  Payment pipeline — DB connection pool exhaustion
  [📝]  Root cause: config typo in deployment
        ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
        Aggregate: 3 SEV-1s in Q1
        Root cause categories: config (2), operational (1)
        Mean TTR: 38 minutes
        Common thread: deployment-related config changes (2/3)
        Suggested systemic action: config validation in CI pipeline
```

The bundle reveals a pattern invisible from any single incident: two of three SEV-1s were config-related deployment errors. The systemic recommendation emerges from the data — no one had to write a quarterly reliability report.

---

## Why Incident Management Is a Natural Fit

Incidents are the highest-stakes version of the Quipu pattern:

1. **Strictly linear** — events happen in rapid sequence under extreme time pressure
2. **Multi-actor** — on-call engineer, incident commander, comms lead, leadership, external customers
3. **Multi-audience** — each audience needs a radically different view of the same incident
4. **Postmortem as pendant cord** — the retrospective analysis is not a separate document; it's annotations on the same timeline
5. **Bundleable** — reliability trends emerge from bundling incidents by severity, service, or root cause category
6. **Time-critical** — the sequential integrity of the timeline is what makes the postmortem trustworthy

The incident is the quipu. The postmortem is a pendant cord view. The quarterly reliability review is a bundle.
