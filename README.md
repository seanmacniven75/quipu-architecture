[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18941708.svg)](https://doi.org/10.5281/zenodo.18941708)
# Quipu Architecture

### The Universal Chat-Based Workflow Architecture for Agentic AI

**Author:** Sean MacNiven  
**Affiliation:** Glasgow Caledonian Univeristy / Leeds Beckett University / Kings College London / Coded for Humans  
**First Published:** March 2026  
**License:** MIT  
**DOI:** *10.5281/zenodo.18941708*

---

## Abstract

Quipu Architecture is an open UI/interaction design pattern that replaces tabs, panels, and dashboards with **a single conversational timeline**. It is designed for the emerging paradigm of **agentic AI workflows** — applications where humans and AI agents collaborate, delegate, and act in the same workspace.

Every action — whether a human decision, an AI agent's output, or a background system event — is logged as an event on a **single linear causal timeline** (the *primary cord*). Events are tagged by action type and form **pendant cords** — dynamic, filterable groupings that can be isolated, inspected, and navigated without leaving the timeline. The architecture is inspired by the Incan *quipu* (khipu): a knotted-cord record-keeping system in which a single horizontal primary cord carries pendant cords bearing knots that encode information through their type, position, colour, and material.

Unlike tabbed interfaces, parallel panel layouts, or branching conversation trees, Quipu Architecture preserves **strict linear causality**. Parallel computations are collapsed into the single event that initiated them. The result is an interface that can be "pulled straight" into a flat chronological sequence, or "bunched" into loops of related action types for focused exploration.

**The core proposition:** In agentic AI applications, the chat is not a feature — it is the entire workflow. Quipu Architecture provides the structural pattern that makes this possible. Importantly, it is also a single record of truth. 

**The Universal Model:**
A case quipu is equivalent to exporting a universal model of the entire interaction. Every search, every decision, and every insight is captured within the quipu's structure. This makes the quipu not just a log, but a self-evidencing generative model suitable for:
- RLHF (Reinforcement Learning from Human Feedback): Training agents to navigate the Markov blanket with greater fidelity.
- Auditability: A clear, linear chain of causality that resists the "black box" nature of traditional AI interfaces.
- Insight Generation: Using "quipu bundles" to analyze complex case patterns across thousands of interactions.

**What makes Quipu novel?**
No existing UI architecture lets the interface grow its own navigation as new types of actions occur, shows you what's hidden when you filter instead of silently removing it, lets you combine filters into reusable stories across action types, and places human and AI agent actions on a single linear timeline — all without tabs, panels, or branching.

---

## Why Agentic AI Needs a New UI Paradigm

Current UI architectures were designed for human-only workflows. Tabs, panels, and dashboards assume a single actor navigating between views. Agentic AI breaks this assumption in three ways:

**1. Multiple actors, one workspace.** When an AI agent extracts references, scores an essay, or files a support ticket, its actions need to be visible alongside the human's actions — not hidden in a log panel or buried in a notification. Quipu places human and agent events on the same primary cord, tagged by `initiatedBy: "user" | "agent" | "system"`. The user can filter to see only agent actions, only their own actions, or the full interleaved story.

**2. Parallel work, linear narrative.** Agents often perform multiple tasks simultaneously (searching, analysing, generating). Traditional UIs either block the user while agents work, or scatter results across multiple panels. Quipu's **parallel collapse rule** ensures that concurrent agent operations resolve to a single event (or sequential subsidiary events) on the timeline. The user experiences a coherent narrative, not a fragmented dashboard.

**3. Emergent capabilities, not predefined menus.** Agents gain new capabilities over time — new tools, new integrations, new actions. Tabbed interfaces require designers to anticipate every possible capability and assign it a panel. Quipu's **dynamic pendant discovery** means that when an agent performs a new type of action for the first time, a corresponding filter button spontaneously appears. The UI adapts to what agents can do, rather than constraining agents to what the UI was designed for.

**4. Transparent decision-making.** In high-stakes workflows (grading, medical, financial, legal), users need to understand *why* an agent acted as it did. Quipu's single-timeline approach makes the agent's decision process auditable — every input the agent received, every action it took, and every output it produced is visible in chronological order. Filtering by the agent's pendant cord isolates its complete reasoning chain.

**5. Chat as workflow, not chat alongside workflow.** Most agentic AI tools treat chat as a sidebar — a place to ask questions about the "real" work happening elsewhere. Quipu Architecture inverts this: the conversational stream *is* the workflow. There is no separate workspace. Grading happens in the chat. Support happens in the chat. Project management happens in the chat. The chat is the quipu.

---

## The Metaphor

The Incan quipu was a recording device used across the Andes for millennia, most prominently during the Inca Empire (1438–1532 CE). It consisted of:

- A **primary cord** — a thick horizontal strand from which everything else hangs
- **Pendant cords** — thinner cords attached to the primary cord, hanging vertically, each bearing knots
- **Knots** — tied at specific positions along pendant cords, encoding values through their type (figure-eight, long knot, single knot), position, and grouping
- **Subsidiary cords** — additional cords hanging from pendant cords, representing corrections, exceptions, or subcategories
- **Colour and material** — encoding categorical information (red for soldiers, yellow for gold, etc.)

Quipucamayocs (knot-keepers) read quipus by following the primary cord left to right, inspecting pendant cords as they appeared. They could also isolate pendant cords of a particular colour or material to see all records of a given type across the entire quipu.

This maps directly to the software architecture:

| Quipu Element | Software Equivalent |
|---|---|
| Primary cord | The linear event timeline (causal spine) |
| Pendant cords | Action type groupings (References, Grading, Calibration, etc.) |
| Knots | Individual events, positioned chronologically |
| Knot type/position | Event metadata (severity, outcome, confidence level) |
| Colour grouping | Dynamic filter buttons that appear when an action type first occurs |
| Subsidiary cords | Sub-events or enrichments attached to a parent event |
| Reading left-to-right | Scrolling the timeline chronologically |
| Isolating by colour | Filtering the timeline by action type |
| Bundling multiple quipus | Quipu Bundles — cross-user aggregation through a shared pendant cord type |

The critical property of a quipu — and of this architecture — is that **it is a single strand**. The pendant cords hang from it; they do not exist independently. Remove the primary cord and the entire structure disassembles. Pull the string straight and you recover the full chronological sequence. This is not a tapestry (many parallel threads woven together) or a tree (branching paths). It is one continuous line with tagged nodes that can be aggregated, filtered, and explored — but never separated from the causal spine.

---

## Core Principles

### 1. Single Linear Causality

All events are ordered on a single timeline. No event exists outside this sequence. Even when multiple background agents operate in parallel (e.g., an AI model extracting references while simultaneously scoring an essay), their outputs are logged as a single composite event at the moment they resolve. The user's experience is always: "one thing happened, then the next thing happened."

### 2. Events as First-Class Citizens

Every action — user-initiated, system-initiated, or agent-initiated — produces an event. Events are immutable once created. An event has:

- A **timestamp** (position on the primary cord)
- A **type** (which pendant cord it belongs to)
- A **payload** (the knot's encoded value)
- An optional **parent event ID** (for subsidiary cords)
- An optional **persistent entity reference** (linking to shared knowledge, e.g., a reference in a knowledge graph)

### 3. Dynamic Pendant Discovery

Action types are not predefined in the UI. When the first event of a new type appears on the timeline, a corresponding **filter affordance** (button, tab, or icon) spontaneously manifests in the interface. If a user never triggers a "References" event, no References filter ever appears. This keeps the interface honest about what has actually happened, rather than presenting a menu of hypothetical capabilities.

### 4. Filtered Views as Projections

Clicking a pendant cord filter does not navigate away from the timeline. It **re-projects** the timeline, compressing it so that only events of the selected type are visible — but they remain anchored to their original chronological position. The user can see: "I enriched Reference A on Day 1, then again on Day 5, then again on Day 12." The gaps between those events (where other action types occurred) are collapsed but recoverable. Pulling the filter off restores the full sequence.

### 5. Persistent Entity Enrichment

Some events create or modify **persistent entities** that exist beyond the timeline. A "Reference Extracted" event might create or update an entry in a shared knowledge graph. A "Calibration Feedback" event might update a statistical model. These persistent entities are linked bidirectionally to the events that created or modified them — you can navigate from the entity to all events that touched it, and from any event to the entity it affected.

### 6. Composable Event Aggregation

Sequences of related events can be aggregated into **meta-events**. For example, the sequence [Extract References → Enrich Reference A → Enrich Reference B → Confirm Enrichments] might be aggregated into a single "Reference Processing" meta-event that can be expanded or collapsed. Meta-events are themselves events on the timeline — they have a timestamp (the moment of aggregation) and a type. This enables hierarchical exploration: zoom out to see the broad narrative, zoom in to see individual actions.

### 7. Narrative Composition

Users can **shift-click** multiple pendant cord filters to compose custom cross-type projections — stories that span multiple action types. A grader might select "References" and "Calibration" simultaneously to see how their reference encounters and calibration feedback evolved together. These compositions can be saved as **named narratives** — reusable filter presets that capture recurring workflows. When the system detects that a user repeatedly follows the same sequence of action types (e.g., A-B-C-D across multiple sessions), it can suggest a named narrative automatically.

### 8. Quipu Bundles (Cross-User Aggregation)

A single quipu represents one user's timeline. A **Quipu Bundle** aggregates multiple users' timelines, queried through a shared pendant cord type. This maps directly to documented Incan administrative practice: provincial quipucamayocs maintained local quipus, and when empire-wide data was needed, these quipus were physically bundled and transported to Cusco for cross-regional analysis.

In software, a bundle might query "all Grammar ratings across all graders" — producing a unified chronological view where events from different users are interleaved and distinguished by user indicator. Bundles enable inter-rater reliability analysis, cross-cohort quality assurance, and collaborative calibration — all without altering the original per-user event streams.

### 9. The Shared Markov Blanket

In the context of active inference, the Quipu functions as the shared Markov blanket for the interaction. In complex multi-agent systems, information is typically fragmented; the AI has its context window and the human has their dashboard, creating high "variational free energy" (uncertainty) between them.

By forcing every action onto a single linear causal timeline, the Quipu externalizes and synchronizes the internal states of both the human and the agent. The "knots" (events) on the cord serve as the sensory and active states that bound the system. Because both parties perceive and act upon the same "primary cord," their generative models of the task remain coupled, minimizing surprise and ensuring a single record of truth.

### 10. Hierarchical Active Inference via Bundling

The Quipu Architecture facilitates hierarchical active inference through its unique "bunching" and "looping" mechanics. While the primary cord tracks fast-timescale, granular events (sensory/active states), the ability to "bunch" these into pendant cords allows for higher-level abstraction.
- **Linear Sequence** (Low Level): Provides the raw, chronological sequence of evidence.
- **Bundles/Loops** (High Level): Represents the "conceptual" or "strategic" level of the hierarchy. "Bunched" cords act as higher-order states that explain the sequences below them.

When a user or agent bundles a set of actions—such as a series of log analyses, search results, and knowledge base lookups—they are essentially performing a message-passing operation in a hierarchical model. This reduces the cognitive load (variational free energy) by allowing the collaborators to focus on high-level intent and outcomes without losing access to the underlying causal evidence.

---

## What Quipu Architecture Is Not

**It is not a chatbot UI.** Chat interfaces (ChatGPT, Claude, Gemini) present a conversational transcript between human and AI. Quipu Architecture uses the conversational stream as a **workflow substrate** — the chat doesn't describe the work; it *is* the work. Events include not just messages but actions, decisions, state changes, and system events, all on the same timeline.

**It is not an agent orchestration framework.** Frameworks like LangChain, CrewAI, or AutoGen manage how agents are invoked and coordinated. Quipu Architecture addresses a different problem: how to **present** the combined output of human and agent actions to the user as a coherent, navigable, filterable narrative. It is a UI pattern, not a backend orchestration layer. It can sit on top of any agent framework.

**It is not event sourcing.** Event sourcing (Fowler, 2005) reconstructs application state by replaying events. Quipu Architecture uses events as the primary **user-facing interface**, not as a backend state reconstruction mechanism. The timeline is the UI, not just the data layer.

**It is not a threaded conversation model.** Threaded conversations (email, Discord, Slack) create hierarchical branches. Quipu Architecture maintains a flat, linear spine — pendant cords do not branch; they filter.

**It is not a knowledge graph.** Knowledge graphs (Roam, Obsidian, Neo4j) model relationships between entities. Quipu Architecture models **temporal sequences of actions** that may reference entities in a knowledge graph. The graph is a linked layer, not the primary structure.

**It is not a tabbed interface.** Tabbed interfaces predefine categories and hide content behind static navigation. Quipu Architecture dynamically generates navigational affordances based on what has actually occurred.

---

## Prior Art and Comparative Analysis

### Feature Comparison Matrix

The following matrix compares Quipu Architecture against established UI and software architecture patterns across the capabilities that define Quipu's design space. A filled circle (●) indicates native support; a half circle (◐) indicates partial or indirect support; an empty circle (○) indicates the pattern does not address this capability.

| Capability | Quipu | Agentic AI Chat | Tabbed UI | Activity Stream | Threaded Conversations | Event Sourcing | Knowledge Graph | Version Control | CQRS |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Single linear causal spine** | ● | ● | ○ | ● | ○ | ● | ○ | ○ | ○ |
| **All actions visible in one view** | ● | ◐ | ○ | ● | ○ | ○ | ○ | ◐ | ○ |
| **Human + agent actions unified** | ● | ◐ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **Dynamic UI discovery** (affordances appear as events occur) | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **Filtered timeline projections** (view by action type without leaving the timeline) | ● | ○ | ◐ | ○ | ◐ | ○ | ◐ | ◐ | ◐ |
| **Sub-action drill-down** (hierarchical type filtering) | ● | ○ | ◐ | ○ | ○ | ○ | ○ | ○ | ○ |
| **Gap indicators** (hidden events are acknowledged, not erased) | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **Narrative composition** (user-defined cross-type story views) | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **Persistent entity linkage** (events ↔ knowledge objects, bidirectional) | ● | ○ | ○ | ○ | ○ | ◐ | ● | ○ | ◐ |
| **Composable meta-events** (sequences aggregate into expandable groups) | ● | ○ | ○ | ○ | ◐ | ◐ | ○ | ● | ○ |
| **Cross-user aggregation** (Quipu Bundles) | ● | ○ | ○ | ○ | ○ | ○ | ○ | ◐ | ○ |
| **Parallel collapse** (concurrent processes → single timeline event) | ● | ◐ | ○ | ○ | ○ | ◐ | ○ | ○ | ○ |
| **User-facing** (designed as a primary UI, not a backend concern) | ● | ● | ● | ● | ● | ○ | ◐ | ◐ | ○ |
| **Sequence pattern detection** (suggests workflows from recurring patterns) | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| **Recoverable full timeline** ("pull the string" to restore unfiltered view) | ● | ○ | ○ | ○ | ● | ○ | ● | ○ | ○ |

### Reading the Matrix

No existing pattern scores ● across more than four of these capabilities. Quipu Architecture scores ● across all fifteen. The key distinctions:

**vs. Agentic AI Chat (ChatGPT, Claude, Gemini, Copilot):** Current agentic chat interfaces present a conversational transcript — human message, agent response, human message, agent response. They share Quipu's linear spine, but they lack everything that makes a timeline *navigable*: no filtering by action type, no dynamic discovery of new capabilities, no entity linkage, no narrative composition, no bundling, no meta-events. When an agent performs ten actions in sequence, the user must scroll through all of them to find the one they care about. In a 200-message conversation, there is no way to see "just the code changes" or "just the decisions." Agentic chat is a transcript; Quipu is an explorable workflow.

**vs. Tabbed UIs:** Tabs predefine categories, hide content behind static navigation, and force the user to choose a context before seeing anything. Quipu dynamically generates navigational affordances based on what has actually happened, and everything remains on a single timeline until the user chooses to filter. Tabs fragment the narrative; Quipu preserves it.

**vs. Activity Streams (W3C, 2017):** Activity streams share Quipu's chronological spine, but they are flat and unstructured — every event gets equal visual weight, there is no filtering by type, no sub-action drill-down, no entity linkage, and no way to compose narrative views across action categories. Activity streams are a fire hose; Quipu is an explorable narrative.

**vs. Threaded Conversations (Slack, Discord, Email):** Threads create hierarchical branches that diverge from the main timeline. Once you enter a thread, you lose the temporal context of what else was happening. Quipu's pendant cord filters keep the user anchored to the timeline — filtering is a lens, not a departure. Threads branch; Quipu loops.

**vs. Event Sourcing (Fowler, 2005):** Event sourcing is a backend persistence pattern for reconstructing application state by replaying events. It is not user-facing. Quipu borrows the event log concept but applies it as the primary interaction surface, adding dynamic discovery, visual filtering, entity linkage, narrative composition, and cross-user bundling — none of which event sourcing addresses.

**vs. Knowledge Graphs (Roam, Obsidian, Neo4j):** Knowledge graphs excel at modelling relationships between entities but lose temporal sequence. You can see that Paper A and Paper B are related, but not that you discovered Paper A on Monday, enriched it on Wednesday, and cited it on Friday. Quipu preserves the temporal narrative and links to the knowledge graph as a secondary layer — time is primary, relationships are linked.

**vs. Version Control (Git):** Git tracks state changes over time with branching timelines. Quipu tracks action sequences without branching. Git is file-centric; Quipu is action-centric. Git's "log" view is the closest analogue to Quipu's primary cord, but it lacks dynamic filtering, entity linkage, narrative composition, and cross-user bundling.

**vs. CQRS (Command Query Responsibility Segregation):** CQRS separates write models (commands) from read models (queries/projections). Quipu's filtered views are conceptually similar to CQRS read-model projections, but applied to the user interface rather than the data layer. CQRS is infrastructure; Quipu is interaction design.

### Summary of Novel Contribution

The novel contribution of Quipu Architecture is the **specific combination** of:

1. Single linear causality (the primary cord)
2. Dynamic pendant discovery (UI affordances emerge from the event stream)
3. Filtered timeline projections with gap indicators (pendant cord views)
4. Hierarchical sub-action drill-down
5. Narrative composition via multi-select (shift-click story building)
6. Bidirectional persistent entity linkage
7. Composable event aggregation (meta-events)
8. Cross-user aggregation (Quipu Bundles)
9. Sequence pattern detection and workflow suggestion
10. Native human-agent action unification (both actors on the same cord)

— all applied as a **chat-based interaction pattern** that replaces tabs, panels, and dashboards with a single conversational workflow. No existing pattern — including current agentic AI chat interfaces — addresses more than four of these ten capabilities natively. Quipu Architecture is designed for the emerging paradigm where the chat is not a feature alongside the workflow; it *is* the workflow.

---

## Applications

Quipu Architecture is domain-agnostic. Any process involving sequential actions, multiple actors, and multiple audiences can benefit. The `/examples` directory contains full worked examples for:

### Primary Examples

- **[Customer Support](examples/support-workflow.md):** The case file is the quipu. Customer messages, agent responses, internal notes, diagnostics, escalations, KB lookups, SLA events, and resolutions on a single timeline — filterable by audience (customer-facing vs. internal), bundleable across cases for product intelligence.

- **[Incident Management](examples/incident-management.md):** The incident is the quipu. Alerts, diagnostics, remediation steps, internal comms, customer comms, and leadership briefings on one cord. The postmortem writes itself — it's a pendant cord view of the investigation events. Bundleable across incidents for reliability trends.

- **[Project Management](examples/project-management.md):** The project is the quipu. Tasks, decisions, blockers, scope changes, stakeholder communications, risks, milestones, resource changes, and retrospectives on a single timeline. Status reports are pendant cord views. The decision log is a filter, not a separate document. Portfolio health emerges from cross-project bundles.

- **[Sales Pipeline / CRM](examples/sales-pipeline.md):** The deal is the quipu. Discovery, outreach, champion interactions, technical evaluations, competitive signals, commercial proposals, and legal negotiations on a single timeline. Win/loss intelligence and competitive playbooks emerge from cross-deal bundles.

- **[Supply Chain / Logistics](examples/supply-chain.md):** The shipment is the quipu. Warehouse, transport, customs, financial, quality, and exception events on one cord. Customs audit trails, financial reconciliation, and supplier performance scorecards are all pendant cord views of the same timeline.

- **[Humanitarian Response](examples/humanitarian-response.md):** The disaster response is the quipu. Field assessments, medical interventions, logistics, shelter, protection, funding, access constraints, and coordination meetings — from dozens of agencies — on a single timeline. Donors see one story, field teams see another, protection officers see another. Cross-response bundles reveal institutional learning across crises.

### Additional Examples

- **[Academic Grading](examples/grading-workflow.md):** The reference implementation. Grading events, calibration feedback, reference extraction, and epistemic queries on a single timeline with active inference integration.

- **[Editorial Workflow](examples/editorial-workflow.md):** Peer review, revision, and publication decision events for journal manuscript management.

- **[Research Workflow](examples/research-workflow.md):** Literature review, data collection, analysis, and writing events for academic research project management.

See the `/examples` directory for domain-specific worked examples.

---

## Getting Started

See [SPECIFICATION.md](SPECIFICATION.md) for the formal event schema and filtering protocol.

See [ARCHITECTURE.md](ARCHITECTURE.md) for implementation guidance, including data models, UI patterns, and integration with event-sourced backends.

See [examples/](examples/) for domain-specific worked examples.

---

## Citation

If you use Quipu Architecture in your work, please cite this repository:

```
MacNiven, S. (2026). Quipu Architecture: Temporal Event Streams with Dynamic
Action Aggregation. https://github.com/[username]/quipu-architecture
```

BibTeX:
```bibtex
@misc{macniven2026quipu,
  author = {MacNiven, Sean},
  title = {Quipu Architecture: Temporal Event Streams with Dynamic Action Aggregation},
  year = {2026},
  publisher = {GitHub},
  url = {https://github.com/[username]/quipu-architecture}
}
```

---

## License

MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Dr. Sean MacNiven. All rights reserved.
