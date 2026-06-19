# Example: The Protégé Model — Personal Specialist Agents in Support Workflows

**Domain:** Product support case management with personalised AI agents
**Application:** Automated case resolution augmented by per-engineer specialist agents
**Conformance Level:** Level 4 (Bundled Quipu)
**Relationship to other examples:** This example extends [Customer Support](support-workflow.md). That example treats the case file as the quipu. This one adds a second quipu — the *engineer's own cord* — and shows how a personal agent grows from it.

---

## The Premise: Small Trained Specialists in Front of a Large Generalist

Automated case resolution (ACR) workflows are now common in enterprise support: a large language model, paired with a curated skills portfolio, triages an incoming case, attempts a resolution, and applies a confidence threshold. Above the threshold, a proposal is posted to the customer; below it, the case is handed to a human engineer.

This works, but a generalist ACR operating alone is generic by design. It has no knowledge of *which* engineer will receive a low-confidence case, no memory of how that engineer has resolved similar cases before, and no mechanism to close the confidence gap using accumulated human expertise. Every case of a given shape is approached the same way, regardless of who is best placed to solve it.

The Protégé model proposes a familiar pattern from machine learning — a small, narrowly-trained specialist outperforming a large generalist within its domain — applied at the level of interaction architecture rather than model weights. Rather than routing a low-confidence case directly to an engineer, the workflow first routes it to that engineer's **Protégé**: a personal agent that has been learning from every case the engineer has worked, and that acts as a trained proxy for that specific human.

The result is a **Support Duo**: one engineer, one Protégé, inseparable. No Protégé exists independently of its engineer. Routing a case to a Protégé is therefore a gated pathway to its engineer — the agent takes a first pass, and the human is reached only if the agent cannot resolve the case alone.

The claim made here is narrow, in keeping with the rest of this specification. Persistent, personalised agent memory is an active research area, and systems for per-user agent profiles, episodic memory, and local-first memory stores already exist in the literature. What this example contributes is not a new memory mechanism but a demonstration that **an engineer's accumulated Protégé memory is, structurally, a living pendant on their own Quipu cord** — and that the privacy properties enterprises require fall out of the architecture rather than being bolted on.

---

## The Protégé Pendant: Memory as a Living Cord

The Protégé's memory is held in a local file — `myagent.md` on the engineer's machine — referred to here as the **Protégé Pendant**.

The naming is deliberate and the mapping is exact. In Quipu Architecture, a pendant cord hangs from the primary cord, accumulates knots as events occur, and has no independent existence: remove the primary cord and the pendant disassembles. The Protégé Pendant is precisely this. It accumulates as the engineer works cases — each resolution, each correction, each clarification adding a knot — and it cannot exist apart from the engineer whose cord it hangs from.

This connects directly to **Principle 6 (Emergent Skill Crystallisation)**. When an engineer repeatedly follows the same resolution pathway, that recurrent sequence crystallises into a named, reusable skill. The Protégé Pendant is what you get when crystallised skills accumulate over hundreds of cases into a coherent personal repertoire: a portable, exportable distillation of *how this engineer solves problems*. The Protégé is not a new component in the architecture — it is what emerges when crystallisation runs continuously against one person's decision stream.

The Pendant logs decision pathways, not case content: the strategies the engineer favours, the diagnostics they reach for first, the components they know deeply, and the voice in which they write to customers. It is a model of process, distilled from the engineer's own cord.

---

## Two Cords, One Boundary

The Protégé model makes a distinction the base support example does not need: **case history splits into two cords, separated by ownership.**

| | Decision Gates (organisation-owned) | Decision Pathways (engineer-owned) |
|---|---|---|
| **What it records** | Outcomes, results, confidence scores, resolution modes, closures | The engineer's reasoning, searches, questions, clarifications, working style |
| **Where it lives** | The organisation's Quipu (the case cord) | The Protégé Pendant (`myagent.md`), local to the engineer |
| **Who owns it** | The organisation; feeds generalist ACR improvement | The engineer; travels with them, deletable by them |
| **Visible in shared Bundles?** | Yes (anonymised at agent level) | No — never synced upstream |

This is the architecturally significant point. The boundary is not a policy overlay or a redaction step; it is structural. The shared Quipu simply has no event types that carry personal behavioural data, because those events live on a different cord. There is nothing to redact upstream because there is nothing personal upstream to begin with. The organisation learns *what was done*; the Protégé learns *how it was done*; the two never need to occupy the same cord.

For enterprises operating under GDPR, the EU AI Act, or works-council agreements, this inverts the usual compliance posture: instead of governing access to centralised behavioural data, the architecture never centralises it.

---

## Pendant Cord Types

This example inherits the support pendant cords from [support-workflow.md](support-workflow.md) and adds those specific to the Protégé second pass.

| Type | Label | Icon | Appears When |
|---|---|---|---|
| `acr` | Automated Resolution | 🤖 | First ACR pass on a case |
| `routing` | Routing | 🧭 | Case routed to a Protégé instance |
| `protege` | Protégé | 🎓 | First Protégé second-pass action |
| `query` | Engineer Query | ❓ | Protégé asks its engineer for input |
| `signoff` | Sign-off | ✍️ | Engineer approves a Protégé draft |
| `handover` | Handover | 📋 | Protégé prepares a handover document |
| `crystallise` | Skill Crystallised | 💎 | A recurrent pathway crystallises into the Pendant |

The `protege` and `crystallise` events are the ones that enrich the Protégé Pendant. Note that `query` and `crystallise` events are recorded on the engineer's local cord, not the organisation's shared cord — they are decision-pathway events.

---

## Sample Timeline: Case #7731

**Customer:** Devlin Okafor, Enterprise tier
**Product:** CloudSync Pro
**Issue:** Intermittent sync failures after SSO migration
**Engineer (Duo):** Priya Raman + her Protégé

```
#1  [🤖 ACR]          Case #7731 received. ACR first pass.
                       Skills invoked: sso_diagnostics, sync_log_parser
                       → Confidence: 64% (below 80% threshold)
                       → Pendant cord "Automated Resolution" appears

#2  [🧭 Routing]      Confidence below threshold. Suitability scoring across
                       active Protégé instances.
                       → Best match: Priya's Protégé (high historical
                         resolution rate on SSO + sync, enterprise tier)
                       → Pendant cord "Routing" appears
                       NOTE: routing to a Protégé is a gated pathway to Priya.

#3  [🎓 Protégé]      Priya's Protégé reprocesses the case, augmenting ACR
                       output with Pendant context: Priya's known pattern of
                       checking token-refresh timing before sync internals.
                       → Pendant cord "Protégé" appears
                       → Invokes sso_token_trace — a skill ACR did NOT
                         invoke on first pass, because the Protégé has the
                         context to know it is relevant here.

#4  [🎓 Protégé]      Token trace result: refresh interval misaligned with
                       sync poll cycle post-migration. Plausible root cause.
                       → Protégé confidence rises to 81%.
                       → parentEventId: #3

#5  [❓ Engineer Query] Protégé to Priya (LOCAL — decision-pathway event):
                       "Token-refresh misalignment looks like the cause, but
                       I have not seen this exact post-migration variant
                       before. Confirm before I draft?"
                       → Recorded on Priya's local cord, NOT the case cord.

#6  [💬 Engineer]      Priya: "Yes — and note the customer is on the legacy
                       SAML path, so phrase the fix for that, not OIDC."
                       → LOCAL event. This input will enrich the Pendant.

#7  [🎓 Protégé]      Protégé drafts a resolution in Priya's voice, scoped to
                       the SAML path, citing the token-refresh fix.
                       → Draft prepared for sign-off (not yet posted).

#8  [✍️ Sign-off]     Priya reviews, makes one small wording change, approves.
                       → Pendant cord "Sign-off" appears
                       → Resolution posted to customer.
                       → entityRefs: [case:7731 UPDATED]

#9  [💎 Skill Crystallised] (LOCAL) Protégé detects this is the 3rd
                       post-migration token-refresh case Priya has resolved
                       this way. Offers to crystallise:
                       "Post-migration SSO token-refresh (SAML path)".
                       Priya accepts.
                       → New skill added to the Protégé Pendant.
                       → Next time, the Protégé will likely clear 80% on the
                         first pass without needing to ask.

#10 [✅ Resolution]    Case #7731 resolved. First response: ACR + Protégé,
                       under 30 minutes, one engineer touch (sign-off).
                       → entityRefs: [case:7731 UPDATED]
```

The case cord (events #1, #2, #3, #4, #7, #8, #10) is what the organisation sees. The engineer's local cord additionally carries #5, #6, and #9 — the reasoning, the clarification, and the crystallisation. Those never leave Priya's machine.

---

## A Second Case: When the Protégé Cannot Resolve

Not every second pass succeeds. The handover path is not a failure mode — it is the Protégé doing its job.

```
#1  [🤖 ACR]          Case #7790 received. Confidence: 41%.

#2  [🧭 Routing]      Routed to Kenji's Protégé (best available match).

#3  [🎓 Protégé]      Reprocesses with Kenji's Pendant context. Tries two
                       diagnostic pathways Kenji favours for this component.
                       → Neither narrows the root cause. Confidence: 49%.

#4  [❓ Engineer Query] (LOCAL) Protégé to Kenji: "I have tried the usual
                       two paths without progress. Suggestions before I
                       prepare a handover?"

#5  [💬 Engineer]      (LOCAL) Kenji: "No — this one's genuinely novel. Hand
                       it to me with what you have."

#6  [📋 Handover]     Protégé prepares a handover document, formatted to
                       Kenji's known preferences:
                         • What ACR found (skills, partial signals)
                         • What the Protégé tried (two pathways, why each
                           was abandoned)
                         • Where confidence broke down
                         • Initial suggestions for where to look next
                       → Pendant cord "Handover" appears
                       → Kenji picks up a case that is already part-worked,
                         not cold. Protégé steps back to support; Kenji is
                         now principal solver.
```

The contrast with the base support workflow is precise: in the unaugmented case, a sub-threshold case lands on the engineer's desk cold. Here it lands part-worked, with the dead ends already mapped, and in a format the engineer's own agent knows suits them.

---

## The Contrast in Plain Terms

| | ACR Alone | ACR + Protégé |
|---|---|---|
| Confidence ≥ threshold | Posts solution automatically | Posts in engineer's voice — initially with quick sign-off; over time, as reliability is proven, automatically |
| Confidence < threshold | Memo to engineer, cold | Second pass with Pendant context; draft for sign-off, or part-worked handover |
| Engineer knowledge used | None | Deep product expertise, case history, communication style |
| Engineer time required | Always | Only when the Protégé cannot resolve |

---

## Pendant Cord Views

### Protégé Activity View: [🎓 Protégé] + [💎 Skill Crystallised]

What an engineer reviewing their own agent's development sees — their Protégé's reasoning and the skills it has crystallised over time. Because both are decision-pathway events, this view exists *only on the engineer's local cord*; no one else can compose it.

### Organisational Audit View: [🤖 ACR] + [🧭 Routing] + [✍️ Sign-off] + [✅ Resolution]

What a support manager sees — the outcome spine, with no decision-pathway events. The manager can see *that* a Protégé second pass occurred and *that* it resolved the case, but not the engineer's reasoning. The cord boundary holds even inside a filtered view.

---

## Quipu Bundle: The Intelligent Shadow Network

At scale — one Protégé per engineer across thousands of engineers — the routing layer becomes what may be called an **Intelligent Shadow Network**: a server-side layer that matches each incoming case to the AI half of the most suitable Support Duo, escalating to a human only when the Protégé too cannot reach a confident proposal.

A Quipu Bundle over the organisational cord makes the network legible without touching any Protégé Pendant:

```
Bundle: "ACR + Protégé performance — last 30 days"

Configuration:
  pendantCordTypes: ["acr", "routing", "protege", "signoff", "resolution"]
  scope: organisation
  excludes: ["query", "crystallise"]   ← decision-pathway events, not present upstream

View (aggregate):
  Cases received:                          12,480
  Resolved by ACR alone (≥80%):             7,115   (57%)
  Routed to a Protégé (<80%):               5,365   (43%)
    └─ Resolved by Protégé + sign-off:      3,940   (73% of routed)
    └─ Handover to engineer:                1,425   (27% of routed)
  Net cases reaching a cold engineer desk:      0
  Median touches per Protégé-resolved case:     1   (sign-off only)
```

The Bundle aggregates decision *gates* — outcomes — exactly as the architecture intends. It can be computed entirely from the organisational cord, because the decision *pathways* that produced those outcomes never left the engineers' machines. The Shadow Network can be measured, A/B tested, and governed without any personal behavioural data being centralised to do so.

---

## Divergence at Scale

A note on what this produces. Each Protégé begins from the same base model and the same generalist ACR skills portfolio. What differs is the Pendant — and because each Pendant is grown from one engineer's distinct case history, no two Protégés converge.

After thousands of cases across thousands of engineers, the result is a population of specialists: the same foundation, but a different `myagent.md` in every instance, each shaped by the cord it hangs from. The network is not uniform. The generalist ACR improves on results, shared across everyone; each Protégé improves on process, owned by one person. And the one thing the generalist can never become — no matter how capable — is *personal*. That is the Protégé's ground, and the Protégé's alone.

---

## Why This Fits Quipu

The Protégé model is not an addition to the architecture; it is an application of principles already in the specification:

1. **The Protégé Pendant is a living pendant cord** (Principle 4) — it accumulates as knots on the engineer's primary cord and has no independent existence.
2. **The Protégé itself is emergent skill crystallisation run continuously** (Principle 6) — a personal agent is what a lifetime of crystallised pathways amounts to.
3. **The two-cord privacy boundary is persistent entity ownership** (Principle 7) — decision gates and decision pathways are distinct entity classes with distinct owners.
4. **The Shadow Network is a Quipu Bundle over decision streams** (Principle 8) — organisational intelligence aggregated over outcomes, never over the personal cords that produced them.

The case file is the quipu. The engineer is *also* a quipu. The Protégé is the pendant that hangs between them.
