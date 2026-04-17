[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18941708.svg)](https://doi.org/10.5281/zenodo.18941708)

# Quipu Architecture

### An Interaction Architecture for Chat-Native Agentic Workflows

**Author:** Dr. Sean MacNiven
**Affiliation:** Coded for Humans; Glasgow Caledonian University, Leeds-Beckett University and King's College London
**First Published:** March 2026 (v1.0); current revision v1.3
**License:** MIT
**DOI:** 10.5281/zenodo.18941708

---

## Abstract

Quipu Architecture is an open interaction design pattern for agentic AI workflows, in which the conversational stream itself serves as the workflow surface rather than as a sidebar alongside it. The pattern combines a single linear event timeline (the _primary cord_); filter affordances (_pendant cords_) that emerge dynamically as new event types occur; filtered projections that preserve temporal anchoring and explicitly acknowledge what has been hidden (_gap indicators_); reusable workflow captures (_crystallised skills_) that form from observed action sequences and become invocable by click rather than by retyping; and cross-user aggregation (_Quipu Bundles_) for pattern extraction across many users' action streams.

The central claim is narrow and specific. Individual mechanics in this list have meaningful prior art (notably dynamic facet discovery in observability platforms; activity streams in modern case-management and issue-tracking systems; saved filters in team-chat tooling; linear tool-call transcripts in current agentic IDEs); the contribution proposed here is the integration of these mechanics into a single end-user-facing interaction surface, together with four specifically distinctive elements: dynamic filter affordances presented to the end user (not the developer or SRE) inside a conversational workspace; gap indicators that surface rather than silence the presence of hidden events; emergent skill crystallisation, in which repeated action sequences become clickable and portable workflow primitives without explicit authoring; and Quipu Bundles as a cross-user aggregation primitive over _user decision streams_ rather than over system traces.

This is a specification and a vocabulary, not a validated system. A reference deployment is under development (xRead, an AI-assisted academic grading extension for Canvas SpeedGrader), and empirical validation is planned. The architecture is offered in the honest expectation that parts of it will require revision in light of real use.

---

## The Core Thesis: A Closed Interaction Loop

The value proposition of Quipu Architecture is not any single mechanic; it is the closed loop that the mechanics compose.

1. A user, an AI agent, or a system process performs an action; the action is logged as a typed event on the primary cord.
2. When an event type appears on the cord for the first time, a corresponding filter affordance materialises in the interface; the user did not have to anticipate the affordance, and the affordance would not exist if the event type had never occurred.
3. The user can project the cord through one or more filter affordances, producing a cross-type narrative view that remains chronologically anchored; gaps where other event types occurred are acknowledged, not silently removed.
4. Recurrent cross-type narrative views can be saved as named, clickable skills; subsequent invocation is a click, not a reconstructed prompt, and crystallised skills are scoped (session-local, user-global, or exportable).
5. The entire cord, including its crystallised skills, is exportable as a structured data object; this object is simultaneously an audit trail, a training artefact for reinforcement learning from human feedback, and a transferable unit of institutional knowledge.

No individual step in this loop is unprecedented; what is under-precedented is the complete loop running inside a single conversational surface, addressable end-to-end by the end user rather than by the developer inspecting telemetry. This closed loop is the specific novelty claim of the architecture, and it is the claim against which the pattern should be evaluated.

---

## Why Agentic AI Motivates a Reconsideration of Workflow Surfaces

Current workflow interfaces inherited from pre-agentic software (tabs, panels, dashboards, sidebars) were designed around a single actor navigating between discrete views; agentic AI breaks this assumption in four ways that the Quipu pattern is designed to address.

**Multiple actors, one workspace.** When an AI agent extracts references, scores an essay, or files a support ticket, its actions must be visible alongside the user's own actions rather than sequestered in a log panel or a notification queue; Quipu places human, agent, and system events on a single cord, distinguished by an `initiatedBy` field, so that any one actor's actions can be isolated or the whole interleaved narrative inspected.

**Parallel work, linear narrative.** Agents frequently perform concurrent operations (searching, analysing, generating); traditional interfaces either block the user while agents work or fragment results across multiple panels. Quipu's parallel collapse rule logs concurrent operations as a single composite event at the moment they resolve, trading some fidelity to the underlying concurrency for a coherent user-facing narrative (a trade-off that is discussed explicitly in _Limitations and Open Questions_ below).

**Emergent capabilities, not predefined menus.** Agents acquire new tools and new action types over time; tabbed interfaces require designers to anticipate every possible capability in advance and to assign each a panel. Dynamic pendant discovery inverts this: the interface learns what the agent can do from what the agent has in fact done, and adapts its affordances accordingly.

**Transparent decision-making.** In high-stakes workflows (grading; medical; financial; legal; regulated case management), users and reviewers need to understand why an agent acted as it did; Quipu's single-timeline approach makes the agent's decision process auditable, because every input the agent received, every action it took, and every output it produced is visible in chronological order, and filtering by the agent's pendant cord isolates its complete reasoning chain.

The strongest statement that can honestly be defended is this: for workflows where audit trail, decision transparency, and institutional pattern extraction matter at least as much as input efficiency, treating the chat transcript as the primary workflow surface (rather than as a sidebar) is a promising pattern; and the specific combination of mechanics proposed here is the most developed instance of that pattern known to the author. Whether this pattern generalises beyond such workflows (to creative work, real-time collaborative editing, or rich-media composition, for example) is an open question; the pattern is offered for the domain where its assumptions hold, not as a universal replacement.

---

## The Metaphor

The Incan quipu (khipu) was a knotted-cord record-keeping system used across the Andes for millennia, most prominently during the Inca Empire (1438–1532 CE); it consisted of a thick horizontal primary cord from which pendant cords hung vertically, each bearing knots that encoded values through their type (figure-eight, long knot, single knot), their position along the cord, and the grouping of the knots into clusters. Subsidiary cords hung from pendant cords to represent corrections, exceptions, or sub-categories; colour and material encoded further categorical information. Quipucamayocs (knot-keepers) read quipus by following the primary cord, inspecting pendant cords as they appeared, and isolating pendants of a particular colour to see all records of a given type across the entire cord.

The metaphor motivates the architecture; it should not be mistaken for it. The mapping below is suggestive rather than strict, and is offered because the vocabulary it supplies has proven useful in design conversations.

| Quipu Element            | Software Equivalent                                                      |
| ------------------------ | ------------------------------------------------------------------------ |
| Primary cord             | The linear event timeline (causal spine)                                 |
| Pendant cords            | Action-type filter affordances                                           |
| Knots                    | Individual events, positioned chronologically                            |
| Subsidiary cords         | Sub-events or enrichments attached to a parent event                     |
| Colour grouping          | Dynamic filter buttons that appear when an action type first occurs      |
| Reading left-to-right    | Scrolling the timeline chronologically                                   |
| Isolating by colour      | Filtering the timeline by action type                                    |
| Bundling multiple quipus | Quipu Bundles; cross-user aggregation through a shared pendant cord type |

The critical structural property of a quipu (and of this architecture) is that it is a single strand; the pendant cords hang from it, and they do not exist independently. Remove the primary cord and the entire structure disassembles; pull the string straight and the full chronological sequence is recovered. This is not a tapestry (many parallel threads woven together) nor a tree (branching paths); it is one continuous line with tagged nodes that can be aggregated, filtered, and explored.

---

## Core Principles

Eight principles are proposed as the minimal set required for the closed loop described above; a further three speculative framings (active inference, hierarchical message-passing, and contextual affordance suggestion as predictive inference) are retained in Appendix A as honestly-marked theoretical work rather than as core principles.

### 1. Single Linear Causality

All events are ordered on a single timeline; no event exists outside this sequence. When multiple background agents operate in parallel (for example, an AI model extracting references while simultaneously scoring an essay), their outputs are logged as a single composite event at the moment they resolve. The user's experience is always "one thing happened, then the next thing happened," even where the underlying computation is genuinely concurrent; this is a deliberate trade-off in favour of narrative coherence.

### 2. Events as First-Class Citizens

Every action, whether user-initiated, system-initiated, or agent-initiated, produces an event; events are immutable once created. An event carries a timestamp (its position on the primary cord), a type (its pendant-cord membership), a payload (the structured data the event commits to), an optional parent event ID (for subsidiary cords), and an optional persistent entity reference (linking to shared knowledge, such as a reference in a knowledge graph or a row in a case-management table).

### 3. Dynamic Pendant Discovery

Action types are not predefined in the interface; when the first event of a new type appears on the timeline, a corresponding filter affordance (button, chip, or icon) materialises in the interface, and the interface thereafter exposes filtering by that type. If a user never triggers an event of a given type, no affordance for that type ever appears. The interface is thereby kept honest about what has actually happened, rather than presenting a menu of hypothetical capabilities; it is also kept extensible, since new agent tools or action types do not require UI redesign in order to become navigable.

### 4. Filtered Views as Projections, with Gap Indicators

Clicking a pendant cord filter does not navigate away from the timeline; it re-projects the timeline so that only events of the selected type are visible, anchored at their original chronological position. Crucially, the intervals during which other event types occurred are represented by explicit gap indicators (compressed but visible placeholders), not silently removed; this makes clear to the user that other things happened between the events they are currently viewing, and permits the filter to be lifted to recover the full sequence. Gap-acknowledging projection is one of the distinctive commitments of this architecture; most filtered views in adjacent tools remove hidden content without trace.

### 5. Narrative Composition

Users can combine multiple pendant cord filters (typically via shift-click or multi-select) to compose cross-type projections that span multiple action types; these compositions can be saved as named narratives and recalled, shared, or exported. Narrative composition is the precondition for skill crystallisation, described next; it is also the mechanism by which a user can construct ad-hoc views for exploratory analysis without needing to anticipate those views at the time the interface was designed.

### 6. Emergent Skill Crystallisation

When a user repeatedly composes the same cross-type projection, or when they repeatedly execute the same sequence of actions in a recurrent pattern, the system offers to crystallise the pattern into a named, clickable skill. The crystallised skill is subsequently invocable by click rather than by reconstructed prompt; it is scoped (session-local, user-global, or exportable for sharing); and it is itself an event on the primary cord when invoked, preserving the auditability of the session. This is the principle most responsible for the closed loop: dynamic discovery adds filters as event types arrive; narrative composition allows cross-type views; crystallisation promotes recurrent views into first-class, reusable primitives; export permits those primitives to migrate between sessions, users, and systems. Emergent skill crystallisation is the specific element most likely to distinguish Quipu in practice from adjacent patterns, and it is also the element most likely to be non-trivial to get right (see _Limitations_).

### 7. Persistent Entity Enrichment

Some events create or modify persistent entities that exist beyond the timeline; a _Reference Extracted_ event might create or update an entry in a shared knowledge graph, a _Calibration Feedback_ event might update a statistical model of rater bias, a _Case Escalated_ event might update the state of a case in a case-management backend. These persistent entities are linked bidirectionally to the events that created or modified them; one can navigate from the entity to all events that touched it, and from any event to the entity it affected.

### 8. Cross-User Aggregation (Quipu Bundles)

A single quipu represents one user's timeline; a Quipu Bundle aggregates multiple users' timelines, queried through a shared pendant cord type. This maps directly to documented Incan administrative practice, in which provincial quipucamayocs maintained local quipus and, when empire-wide data was needed, those quipus were physically bundled and transported to Cusco for cross-regional analysis. In software, a bundle might query _all Grammar ratings across all graders_ or _all escalation events across all support cases_; the result is a unified chronological view in which events from different users are interleaved and distinguished by user indicator. Bundles enable inter-rater reliability analysis, cross-cohort calibration, and institutional pattern extraction, without altering the original per-user event streams. The distinctive property of Bundles is that they aggregate _user decision streams_ rather than _system traces_, which is the focus of observability platforms and agent-tracing tooling; this orientation towards human decision patterns is what makes them useful for audit, calibration, and institutional learning rather than for debugging.

---

## What Quipu Architecture Is Not

**It is not a chatbot UI.** Chat interfaces present a conversational transcript; Quipu Architecture uses the conversational stream as a workflow substrate in which events include not only messages but actions, decisions, state changes, and system events.

**It is not an agent orchestration framework.** Frameworks such as LangChain, CrewAI, and AutoGen manage how agents are invoked and coordinated; Quipu addresses a different problem, namely how the combined output of human and agent actions is presented to the end user as a coherent, navigable, filterable narrative. It is a UI pattern, not a backend orchestration layer, and can sit atop any agent framework.

**It is not event sourcing.** Event sourcing (Fowler, 2005) reconstructs application state by replaying events; Quipu uses events as the primary user-facing interface. Quipu can be backed by an event-sourced persistence layer, but this is an implementation choice, not a definitional one.

**It is not an observability or agent-tracing platform.** Observability tooling (Datadog, Honeycomb, Splunk, Sentry; and the agent-specific variants LangSmith, Langfuse, Braintrust, Helicone) provides powerful faceted views over system traces for developers and operators; Quipu provides comparable faceted views over _user action streams_ for end users of the workflow. The tooling audiences are different, the semantics of the events are different, and the design constraints are different.

**It is not a threaded conversation model.** Threaded conversations create hierarchical branches; Quipu maintains a flat linear spine, and pendant cords do not branch, they filter.

**It is not a knowledge graph.** Knowledge graphs model relationships between entities; Quipu models temporal sequences of actions that may reference entities in a knowledge graph. The graph is a linked layer, not the primary structure.

**It is not a tabbed interface.** Tabbed interfaces predefine categories and hide content behind static navigation; Quipu dynamically generates navigational affordances based on what has actually occurred.

---

## Prior Art and Comparative Analysis

The mechanics assembled in Quipu Architecture have substantial and varied prior art; honest engagement with it is the only way the synthesis claim survives scrutiny.

**Observability and agent-tracing platforms** (Datadog Logs Explorer, Honeycomb BubbleUp, Splunk field discovery, Elastic, Sentry; LangSmith, Langfuse, Braintrust, Helicone). These systems have done dynamic facet discovery at scale for a decade and more; a filter for `service:checkout` materialises the first time a checkout event is ingested, saved views persist, and cross-trace aggregation is routine. What differs is the audience (developer or SRE, not end user of the workflow); the semantics of the events (system operations, not user decisions); and the absence of end-user-facing skill reuse primitives. Quipu's contribution relative to this lineage is the reorientation towards the end user, over decision-stream semantics, with clickable reuse.

**Modern agentic IDEs and transcript interfaces** (Cursor, Claude Code, Devin, Replit Agent, Aider, ChatGPT, the Claude app). These interfaces run a linear transcript of human and agent actions together, with tool-call expansion, and are the closest structural precedent for the primary cord. What they lack is dynamic filter affordances surfaced as first-class navigation (the transcript is scrollable but not faceted); explicit gap indicators when filtering is applied; saved, clickable cross-type projections; and automatic skill crystallisation from observed sequences. Custom GPTs, Claude projects, and similar reusable-agent primitives are _explicitly authored_ out of band, not _emergent_ from in-session behaviour, and this is the axis on which Quipu's crystallisation claim is narrow but genuine.

**Case-management and issue-tracking systems** (Linear, Notion, GitHub Issues, Jira, ServiceNow, Zendesk). These systems have activity streams with type filters, saved views, and in some cases cross-entity aggregation; they are mature and in production at scale. What they lack is emergence (the schema of event types is fixed by the product, not discovered from use); gap acknowledgement in filtered views; and native integration of agent actions on the same surface as human actions. Quipu's contribution relative to this lineage is emergence, gap acknowledgement, and the unified human-agent timeline.

**Team-chat and saved-search tooling** (Slack, Discord, Microsoft Teams). These systems support saved searches and, in some cases, saved filters; but the events are predominantly messages rather than typed workflow actions, the saved views are manual constructions rather than emergent, and there is no notion of crystallising a recurrent cross-filter composition into a clickable skill.

**Jupyter notebooks** deserve specific mention as the deepest precedent for "a linear sequence of typed cells as the workflow itself"; a Jupyter notebook is a primary cord of sorts, with cells as typed events, and saved notebooks function as crystallised skills. Jupyter predates every other item in this list by a long way, and its influence on Quipu is direct, if oblique. What Jupyter does not offer is conversational input, emergent filter affordances, cross-session skill reuse beyond copy-paste, or cross-user aggregation.

**Event sourcing (Fowler, 2005), CQRS, and version control (Git)** remain appropriate as adjacent architectural patterns rather than direct competitors, for the reasons discussed in _What Quipu Is Not_.

### Feature Comparison Matrix

The matrix below compares Quipu Architecture against the adjacent patterns listed above. A filled circle (●) indicates native support; a half circle (◐) indicates partial, indirect, or aspirational support; an empty circle (○) indicates that the pattern does not address the capability.

The matrix has been rescored in this revision to reflect the honest state of Quipu: several capabilities that earlier revisions scored as fully supported are in fact aspirational or demonstrated only in specification, and have been downgraded to half-circles accordingly. The matrix is the author's assessment and remains advocacy for the pattern being introduced; adversarial re-scoring by practitioners from the adjacent ecosystems is explicitly invited.

| Capability                            | Quipu | Agentic IDE / Transcript | Observability / Tracing | Case Mgmt / Issue Tracker | Team Chat | Threaded Conversation | Event Sourcing | Knowledge Graph | Jupyter |
| ------------------------------------- | ----- | ------------------------ | ----------------------- | ------------------------- | --------- | --------------------- | -------------- | --------------- | ------- |
| Single linear causal spine            | ●     | ●                        | ●                       | ●                         | ●         | ○                     | ●              | ○               | ●       |
| All actions visible in one view       | ◐     | ●                        | ●                       | ◐                         | ◐         | ○                     | ○              | ○               | ●       |
| Human and agent actions unified       | ●     | ●                        | ◐                       | ◐                         | ○         | ○                     | ○              | ○               | ◐       |
| Dynamic filter affordance discovery   | ●     | ○                        | ●                       | ○                         | ○         | ○                     | ○              | ○               | ○       |
| Filtered timeline projections         | ●     | ○                        | ●                       | ●                         | ◐         | ◐                     | ○              | ◐               | ○       |
| Gap indicators in filtered views      | ●     | ○                        | ◐                       | ○                         | ○         | ○                     | ○              | ○               | ○       |
| Narrative composition (multi-filter)  | ●     | ○                        | ●                       | ●                         | ◐         | ○                     | ○              | ○               | ○       |
| Emergent skill crystallisation        | ◐     | ○                        | ○                       | ○                         | ○         | ○                     | ○              | ○               | ◐       |
| Persistent entity linkage             | ◐     | ◐                        | ◐                       | ●                         | ○         | ○                     | ◐              | ●               | ◐       |
| Composable meta-events                | ◐     | ◐                        | ●                       | ◐                         | ○         | ◐                     | ◐              | ○               | ●       |
| Cross-user aggregation (Bundles)      | ◐     | ○                        | ●                       | ●                         | ◐         | ○                     | ○              | ○               | ○       |
| Parallel collapse                     | ●     | ◐                        | ◐                       | ○                         | ○         | ○                     | ◐              | ○               | ◐       |
| User-facing (primary UI, not backend) | ●     | ●                        | ◐                       | ●                         | ●         | ●                     | ○              | ◐               | ●       |
| Sequence pattern detection            | ◐     | ○                        | ◐                       | ○                         | ○         | ○                     | ○              | ○               | ○       |
| Recoverable full timeline             | ●     | ●                        | ●                       | ●                         | ●         | ●                     | ●              | ●               | ●       |
| Contextual affordance suggestion      | ◐     | ◐                        | ○                       | ○                         | ○         | ○                     | ○              | ○               | ○       |

### Reading the Matrix

No adjacent pattern achieves the full combination; several come close on subsets. Observability tooling achieves most of the faceted-view capabilities but does not address end-user-facing skill reuse or the unified human-agent surface. Agentic IDEs achieve the unified surface and the recoverable timeline but do not offer dynamic filter affordances, gap indicators, or crystallisation. Case-management systems achieve persistent entity linkage and cross-user aggregation but not dynamic discovery or emergence. Jupyter achieves linearity and skill capture but lacks conversational input, dynamic filtering, and emergent crystallisation.

The narrow contribution claim of Quipu Architecture is the integration of four specifically under-precedented elements into a single end-user-facing interaction surface:

1. **Dynamic filter affordance discovery** surfaced to the end user inside a conversational workspace, rather than to the developer inside a telemetry tool.
2. **Gap indicators** that make hidden content explicit rather than invisible.
3. **Emergent skill crystallisation** from observed sequences, producing clickable and portable skill primitives without explicit authoring.
4. **Quipu Bundles** as a cross-user aggregation primitive over user decision streams rather than system traces.

Everything else in the architecture, the author maintains, is a principled recombination of well-established mechanics; no broader novelty claim is made.

---

## Applications

Quipu Architecture is domain-agnostic in the weak sense that the mechanics do not presuppose a particular domain; it is domain-specific in the strong sense that its value proposition is most pronounced in workflows where audit trail, decision transparency, and institutional pattern extraction matter at least as much as input efficiency. The `/examples` directory contains worked examples for the following domains.

### Primary Examples

- **[Academic Grading](examples/grading-workflow.md):** the reference implementation (xRead); grading events, calibration feedback, reference extraction, and epistemic queries on a single timeline with active inference integration for grader-bias correction.
- **[Customer Support](examples/support-workflow.md):** the case file is the quipu; customer messages, agent responses, internal notes, diagnostics, escalations, knowledge-base lookups, SLA events, and resolutions on a single timeline, filterable by audience and bundleable across cases for product intelligence.
- **[Incident Management](examples/incident-management.md):** the incident is the quipu; alerts, diagnostics, remediation, internal and customer communications, and leadership briefings on one cord. The postmortem writes itself as a pendant-cord view; cross-incident bundles reveal reliability trends.
- **[Project Management](examples/project-management.md):** the project is the quipu; tasks, decisions, blockers, scope changes, stakeholder communications, risks, milestones, and retrospectives on a single timeline. Status reports and decision logs are filter views rather than separate documents.
- **[Sales Pipeline](examples/sales-pipeline.md):** the deal is the quipu; discovery, outreach, champion interactions, technical evaluations, competitive signals, and legal negotiations on a single timeline. Win/loss intelligence and competitive playbooks emerge from cross-deal bundles.
- **[Supply Chain](examples/supply-chain.md):** the shipment is the quipu; warehouse, transport, customs, financial, quality, and exception events on one cord, with customs audit trails and supplier scorecards as pendant-cord views.
- **[Humanitarian Response](examples/humanitarian-response.md):** the disaster response is the quipu; field assessments, medical interventions, logistics, shelter, protection, funding, access constraints, and coordination meetings from many agencies on a single timeline, with cross-response bundles revealing institutional learning across crises.

### Additional Examples

- **[Editorial Workflow](examples/editorial-workflow.md):** peer review, revision, and publication decision events for journal manuscript management.
- **[Research Workflow](examples/research-workflow.md):** literature review, data collection, analysis, and writing events for academic research project management.

---

## Limitations and Open Questions

Quipu Architecture is offered as a specification, not as a finished and validated system; the following limitations are acknowledged explicitly.

**Empirical evidence is currently absent.** The comparative matrix and the principled arguments are reasoned, not measured; whether users complete agentic-workflow tasks faster, more accurately, or with greater satisfaction on a Quipu-style interface than on adjacent alternatives is an open question. Two validation studies are planned (see _Empirical Validation Roadmap_), and a third is under discussion.

**Emergent skill crystallisation is the highest-risk element.** The architectural claim most distinctive to Quipu is also the claim most likely to be difficult in practice; sequence-pattern detection is non-trivial (false positives produce noisy suggestions; false negatives produce missed opportunities), the user interface for previewing and editing a crystallised skill before adoption is non-trivial, and users often prefer explicit authoring to inferred authoring when they want control. The survival of the synthesis claim depends substantially on whether crystallisation can be made to feel helpful rather than intrusive.

**The parallel collapse rule is a deliberate simplification.** Real systems are concurrent; the architecture serialises concurrent operations into a single composite event at the moment of resolution in favour of narrative coherence. This suppresses some truthfulness about genuine parallelism and is therefore inappropriate for workflows where concurrency relationships themselves are the object of analysis (distributed-systems debugging, for example); in such cases, an observability platform is the correct tool and Quipu is not.

**Scaling behaviour is undocumented.** The architecture's behaviour at large event counts (10⁴ events on a single primary cord; 10⁵ events across a Quipu Bundle) has not been characterised; at what point dynamic pendant discovery produces filter clutter that degrades rather than aids navigation; what indexing strategies are required for sub-second filter projections at scale; when meta-event aggregation should be triggered automatically versus user-initiated; and what the practical limits of cross-user bundling are before computational or cognitive cost dominates.

**No reference implementation yet exists in this repository.** The repository currently contains the specification, architectural guidance, and worked domain examples in prose form; a minimal TypeScript reference implementation is on the roadmap and would substantially lower the cost of adoption and adversarial critique. xRead is the first real implementation, but it is a production application rather than a minimal reference.

**Accessibility has not been addressed in the specification.** A linear timeline interface has mixed accessibility properties; favourable for screen-reader linearisation in some respects, challenging for keyboard navigation across long timelines and dynamically appearing affordances in others. A dedicated accessibility section is planned.

**State management guidance is incomplete.** The relationship between the event log and persistent application state, and the boundary between Quipu's user-facing event surface and any backend event-sourcing or CQRS layer, is touched on in `ARCHITECTURE.md` but warrants fuller treatment.

**The matrix scoring is the author's own.** Even with the rescoring in this revision, several competitors could reasonably be argued upward by half a circle on several rows; a formal adversarial re-scoring exercise involving practitioners from the relevant adjacent ecosystems is on the roadmap.

**The active-inference framings in Appendix A are theoretical and metaphorical rather than formalised.** They are retained as speculative framings because they have been productive in design conversations, but they do not form part of the core architectural claim and should not be read as having been demonstrated.

---

## Empirical Validation Roadmap

Three validation studies are in progress or under discussion; all will be reported openly in this repository as data becomes available, regardless of whether the results favour or challenge the architecture.

**Study 1, xRead deployment (planned and underway).** Quipu Architecture is the interaction design underpinning xRead, an AI-assisted academic grading Chrome extension for Canvas SpeedGrader; the xRead pilot, scheduled to begin in Q2 2026, will provide the first real-world deployment data, including marker-behaviour telemetry on filter usage, narrative composition, meta-event aggregation, pendant-cord discovery, and (critically) skill crystallisation adoption; comparative timing data on grading sessions versus the unstructured Canvas SpeedGrader baseline; and qualitative interview data with pilot markers on perceived auditability and navigability. A limitation of Study 1 as an architectural validation is that xRead's success or failure will depend on factors beyond the architecture (Canvas integration, Chrome Web Store policy, marker recruitment, institutional dynamics at the pilot institution); for this reason, Study 2 is positioned as the primary architectural validation, with Study 1 providing deployment-level evidence.

**Study 2, controlled between-subjects study (planned).** A controlled between-subjects study comparing a Quipu-pattern prototype against a tabbed-equivalent control on a representative agentic-workflow task is planned for Q3 2026; primary outcomes are task completion time, error rate, and post-task System Usability Scale scores. Secondary outcomes are subjective auditability ratings, recall of agent actions performed during the session, and a behavioural measure of skill crystallisation adoption. The task domain will be chosen to be independent of xRead, so that Study 2 evaluates the pattern rather than the product. Target N is being scoped against a power analysis for medium effect sizes.

**Study 3, enterprise validation (under discussion).** A potential validation study within a major enterprise software company is under preliminary discussion, with the prospect of anonymised usage data from a case-management or support-workflow context. If this proceeds, it would provide evidence at enterprise scale (sustained use, heterogeneous users, mature adjacent tooling) and would test the cross-user Bundle pattern in a setting where comparable cross-case aggregation already exists in production tools.

---

## Roadmap

- **v1.3 (this release):** contribution claim tightened to four specifically under-precedented elements; matrix rescored to reflect honest current state of Quipu (several capabilities downgraded to half-circles); active-inference framings relocated to Appendix A as explicitly speculative; closed interaction loop elevated to the central thesis; Principle 6 (Emergent Skill Crystallisation) added as the most distinctive architectural element; subtitle revised from "Universal" to "Chat-Native"; affiliations clarified; BibTeX citation corrected.
- **v1.4, TypeScript reference implementation:** a minimal, dependency-light implementation of the event schema, dynamic pendant discovery, filter projections with gap indicators, meta-event aggregation, emergent skill crystallisation (with a user-editable preview step), and a Quipu Bundle aggregator; released alongside a small demonstration application.
- **v1.5, Scaling and failure-mode analysis:** documented benchmarks for filter-projection latency, pendant-discovery clutter thresholds, crystallisation precision and recall on synthetic sequence data, and bundle-aggregation cost at 10³, 10⁴, and 10⁵ events; documented failure modes and recommended mitigations.
- **v1.6, Verifiability extensions:** optional hash-chained event log and pluggable bundle attestation interface, with reference adapters for Ed25519 local signing, RFC 3161 trusted timestamps, and OpenTimestamps Bitcoin anchoring; full design in [VERIFIABILITY.md](VERIFIABILITY.md).
- **v1.7, Empirical evidence:** integration of findings from Study 1 (xRead pilot) and Study 2 (controlled between-subjects study); the comparative matrix will be revised in light of any findings that contradict the current scoring, and the contribution claim will be strengthened or retracted accordingly.
- **Adversarial matrix re-scoring:** structured exercise inviting practitioners from the adjacent ecosystems to re-score the comparative matrix and to propose revisions.

Contributions, critiques, and adversarial readings of any part of the specification are welcomed via GitHub Issues.

---

## Getting Started

See [SPECIFICATION.md](SPECIFICATION.md) for the formal event schema and filtering protocol.

See [ARCHITECTURE.md](ARCHITECTURE.md) for implementation guidance, including data models, UI patterns, and integration with event-sourced backends.

See [UX-PRINCIPLES.md](UX-PRINCIPLES.md) for interaction design guidance specific to the closed interaction loop.

See [IMPLEMENTATION.md](IMPLEMENTATION.md) for practical implementation notes drawn from the xRead reference deployment.

See [examples/](examples/) for domain-specific worked examples.

---

## Appendix A: Speculative Framings (Active Inference)

The following three framings were part of earlier revisions of this specification and have been retained here as explicitly speculative rather than excised entirely, because the vocabulary they supply has been productive in design conversations and because the author's adjacent research programme engages the underlying theoretical literature seriously. They should not be read as having been formalised, demonstrated, or defended at the level of technical rigour that the underlying literature requires; a proper formalisation would need to specify the generative model, the partial observability structure, the variational approximation, and the message-passing scheme, and is beyond the scope of this specification.

**A.1 The Quipu as a Shared Sensory and Active State Surface.** In active inference (Friston; Parr, Pezzulo, Friston), a Markov blanket is the set of states that statistically separate internal from external states under a particular factorisation of a generative model. The primary cord is not, strictly, a Markov blanket; it is more defensibly described as a _shared sensory and active state surface_ between a human and an agent, through which each party's internal generative model of the task is partially coupled to the other's. The externalised event log reduces uncertainty between the two parties about what has occurred (reduces expected free energy contributions that would otherwise arise from informational asymmetry); whether this reduction in uncertainty corresponds meaningfully to a reduction in variational free energy in the technical sense is an open theoretical question.

**A.2 Hierarchical Aggregation as Candidate Message Passing.** The ability to bundle low-level event sequences into higher-level meta-events has formal analogues in hierarchical predictive coding and in variational message passing over multi-level generative models; bundled meta-events function structurally like higher-order states that explain and contextualise the sequences below them. This is a candidate correspondence rather than a demonstrated equivalence; a formal treatment would specify the prior distributions at each level and the inference scheme that relates them.

**A.3 Contextual Affordance Suggestion as Predictive Inference.** Surfacing suggested next actions in response to recent events on the primary cord can be framed as the system issuing predictions about the likely next move in the shared interaction; user confirmation corresponds to low prediction error and reinforces the prediction, user divergence corresponds to informative prediction error that updates the predictive model. Whether this is formalised as active inference, as a simpler sequence-prediction model, or as something else is an implementation choice; the framing is offered as motivation rather than as the specification of the mechanism.

These framings are retained as speculative appendix rather than as core principles because the author believes they will be productive for future formalisation, but they do not carry the central architectural claim of this specification and should not be evaluated as though they did.

---

## Citation

If you use Quipu Architecture in your work, please cite this repository:

```
MacNiven, S. (2026). Quipu Architecture: An Interaction Architecture for
Chat-Native Agentic Workflows. https://github.com/seanmacniven75/quipu-architecture
DOI: 10.5281/zenodo.18941708
```

BibTeX:

```
@misc{macniven2026quipu,
  author = {MacNiven, Sean},
  title  = {Quipu Architecture: An Interaction Architecture for Chat-Native Agentic Workflows},
  year   = {2026},
  publisher = {GitHub},
  url    = {https://github.com/seanmacniven75/quipu-architecture},
  doi    = {10.5281/zenodo.18941708}
}
```

---

## License

MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Dr. Sean MacNiven.
