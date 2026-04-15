# Quipu Architecture — Verifiability Design (v1.5 Planned)

**Status:** Design document for the planned v1.5 verifiability extensions. Not yet implemented. Open for review, critique, and amendment via GitHub Issues and pull requests.

**Author:** Sean MacNiven
**First published:** April 2026
**License:** MIT (same as the rest of the repository)

---

## Purpose

This document specifies two optional capabilities planned for Quipu Core v1.5 that together satisfy the verifiability and tamper-evidence properties needed for high-assurance applications of Quipu Architecture (grading appeals, incident postmortems, humanitarian accountability, enterprise audit):

1. A **hash-chained event log** that makes the primary cord cryptographically tamper-evident, using a Merkle chain over events. Standard practice; modelled on Git, Certificate Transparency, and modern WORM audit logs.
2. A **pluggable bundle attestation interface** that allows bundles (or any subset of the event log) to be signed, witnessed, and verified by one or more parties, with swappable attestation backends.

The design deliberately treats blockchain-based attestation as **one supported backend among several**, not as the default. Consumers who require blockchain attestation can implement it as a downstream adapter; consumers who do not can use simpler, cheaper, more private alternatives.

---

## Design principles

Three commitments constrain the design:

1. **Core defines properties, not policies.** "Events should be tamper-evident" is a property; "events should be hashed with SHA-256 using this exact byte layout" is a policy. Core defines just enough policy to make the property meaningful and verifiable across implementations, and no more.

2. **Verifiability is opt-in.** A Quipu consumer that does not need cryptographic verifiability should not pay for it — neither in code size, nor in performance, nor in cognitive overhead reading the spec. The hash chain is an optional field on `QuipuEvent`; the attestation interface is only imported by consumers that want it.

3. **No specific cryptographic backend in Core.** Core defines hash and signature *interfaces*; the actual SHA-256 / Ed25519 / RFC 3161 / OpenTimestamps / blockchain implementations live in adapter packages. Core stays dependency-free.

---

## Part 1 — Hash-chained event log

### Updated `QuipuEvent` type

The existing `QuipuEvent` interface gains one optional field:

```typescript
export interface QuipuEvent<TPayload = unknown> {
  readonly id: EventId;
  readonly timestamp: Timestamp;
  readonly type: PendantType;
  readonly initiatedBy: Initiator;
  readonly actor: ActorId;
  readonly payload: TPayload;
  readonly parentId?: EventId;
  readonly entityRefs?: ReadonlyArray<EntityId>;
  readonly metaOf?: ReadonlyArray<EventId>;

  /**
   * Optional cryptographic chain link.
   * If present, this is the hash of the immediately previous event
   * on the same primary cord, computed using a Hasher implementation.
   * Together with each event's own hash, this forms a Merkle chain
   * over the cord, making any post-hoc reordering or modification
   * detectable.
   */
  readonly previousEventHash?: string;
}
```

### Hasher interface

```typescript
/**
 * A pluggable hash function. Quipu Core does not commit to a specific
 * algorithm; SHA-256 is the recommended default, supplied by an adapter
 * (e.g. @quipu/hasher-sha256 or any consumer-supplied implementation
 * built on Web Crypto or Node crypto).
 */
export interface Hasher {
  readonly algorithm: string;  // e.g. "sha256"
  hash(input: Uint8Array): Promise<string>;  // hex-encoded digest
}

/**
 * Canonicalise an event for hashing. Field order, JSON serialisation
 * rules, and excluded fields are fixed by Quipu Core so that any
 * implementation produces the same hash for the same event.
 *
 * Excluded from the hash: the event's own previousEventHash
 * (otherwise the chain would be self-referential).
 *
 * Canonicalisation should follow RFC 8785 (JSON Canonicalization
 * Scheme) to ensure cross-implementation determinism.
 */
export function canonicaliseEvent(event: QuipuEvent): Uint8Array;

export async function hashEvent(event: QuipuEvent, hasher: Hasher): Promise<string>;
```

### ChainedEventStore

```typescript
/**
 * An EventStore that maintains a hash chain over appended events.
 * Wraps any underlying EventStore and adds the chain commitment.
 */
export interface ChainedEventStore extends EventStore {
  /**
   * Verify the integrity of the chain over a range of events.
   * Returns the first event whose chain link is broken, or null
   * if the chain verifies cleanly.
   */
  verifyChain(opts?: {
    since?: Timestamp;
    until?: Timestamp;
  }): Promise<{ ok: true } | { ok: false; brokenAt: EventId; reason: string }>;

  /**
   * Return the current "head" hash — the hash of the most recent event
   * on the cord. Suitable for periodic anchoring.
   */
  headHash(): Promise<string | null>;
}

export function createChainedEventStore(
  underlying: EventStore,
  hasher: Hasher
): ChainedEventStore;
```

### Behaviour

- **Append is the only mutating operation.** On `append(event)`, the wrapper computes `previousEventHash` from the current head and writes the augmented event to the underlying store.
- **First-event convention.** `previousEventHash` of the first event is absent (or `null`). This is the genesis convention.
- **Chain breaks are detectable but not automatically repaired.** `verifyChain` reports the first broken link; policy is left to the consumer.
- **Reordering is detected, not prevented.** The chain is a detection mechanism, not a storage guarantee.
- **The chain does not commit to clock accuracy.** Timestamps are inputs to the hash; strong time guarantees come from RFC 3161 or equivalent through the attestation interface below.

### Worked example (grading-tool audit story, no blockchain required)

```typescript
import { createChainedEventStore, MemoryEventStore } from "@quipu/core";
import { Sha256Hasher } from "@quipu/hasher-sha256";

const store = createChainedEventStore(new MemoryEventStore(), new Sha256Hasher());

await store.append(/* "Marker opened submission" */);
await store.append(/* "Rubric loaded" */);
await store.append(/* "Marker entered grade for criterion 1" */);
// ...

// At session close: get the head hash and persist it alongside the bundle.
const head = await store.headHash();
// The institution and the marker can both store `head` independently.
// Either party can later verify the bundle has not been altered by
// recomputing the chain and comparing the head.
```

This gives a complete audit story with no blockchain, no third party, no network call, and no GDPR exposure.

---

## Part 2 — Pluggable bundle attestation

### Why a separate concept

The hash chain proves a primary cord is internally consistent. Attestation is the further step of having one or more *parties* witness the cord's state at a point in time. This is where the interesting design space lives — and where blockchain becomes one of several valid options, rather than the only or default option.

### Attestation interface

```typescript
/**
 * An attestation is evidence that a specific subject hash (typically
 * a head hash or bundle hash) existed in a specific state at a
 * specific time, witnessed by one or more parties. The structure of
 * the evidence is opaque to Core; what matters is that an Attestor
 * can produce one and a Verifier can check one.
 */
export interface Attestation {
  readonly subject: string;
  readonly backend: string;    // e.g. "ed25519-local", "rfc3161-digicert",
                                //      "ots-bitcoin", "fabric-channel-x"
  readonly attestedAt: Timestamp;
  readonly evidence: unknown;  // backend-specific; opaque to Core
  readonly note?: string;
}

export interface Attestor {
  readonly backend: string;
  attest(subject: string, opts?: { note?: string }): Promise<Attestation>;
}

export interface Verifier {
  readonly backend: string;
  verify(attestation: Attestation): Promise<
    | { ok: true; attestedAt: Timestamp; witnesses?: ReadonlyArray<string> }
    | { ok: false; reason: string }
  >;
}

export async function attestHead(
  store: ChainedEventStore,
  attestor: Attestor,
  opts?: { note?: string }
): Promise<Attestation | null>;
```

### Reference adapter packages (separate, opt-in)

Quipu Core ships **zero** attestation backends. Adapter packages live separately and are imported only by consumers that want them. Planned first set:

| Package | Backend | Use case |
|---|---|---|
| `@quipu/attestation-local` | Ed25519 signature with a locally held key | Single-party attestation; self-signed audit logs |
| `@quipu/attestation-rfc3161` | RFC 3161 trusted timestamp authority | Notarised proof-of-existence; legally recognised in most jurisdictions |
| `@quipu/attestation-ots` | OpenTimestamps (Bitcoin anchoring of hashes, not data) | Trustless proof-of-existence without on-chain data; good middle ground |
| `@quipu/attestation-pgp` | PGP / OpenPGP signature | Familiar in academic and journalistic workflows |

A community-contributed `@quipu/attestation-blockchain` adapter (Hyperledger, Ethereum, or otherwise) is entirely welcome as a separate package. Quipu Core neither blesses nor blocks it; the architecture treats it as one backend among many, on the same footing as the above.

### Which backend to choose

Guidance for implementers:

- **For single-party tamper-evidence** (one user, one institution, bilateral trust): the hash chain alone is sufficient. No attestation needed.
- **For bilateral trust with non-repudiation** (marker ↔ institution, counterparty ↔ counterparty): `@quipu/attestation-local` with keys held by both parties.
- **For legal notarisation of a point in time**: `@quipu/attestation-rfc3161`. RFC 3161 timestamps are accepted in legal proceedings in most jurisdictions.
- **For trustless proof-of-existence without depending on a single notary**: `@quipu/attestation-ots`. Anchors a hash to Bitcoin via OpenTimestamps; no on-chain data storage; essentially free; no GDPR exposure.
- **For multi-party federated witness**: a multi-attestor pattern combining N Ed25519 signatures into a single `Attestation` with a custom backend identifier.
- **For full trustless multi-party consensus with smart-contract logic**: a downstream `@quipu/attestation-blockchain` adapter. Accept the operational cost, GDPR design work, and governance complexity that come with it.

### Why this design satisfies the blockchain use case

For consumers who genuinely need blockchain attestation — for example, a multi-institution academic consortium where no single party is trusted, or a regulatory regime that mandates public-ledger anchoring — the `Attestor` / `Verifier` interface provides a clear extension point. A downstream adapter can implement any blockchain-based attestation scheme and register itself with the consumer's Quipu consumer code; nothing in Core needs to change.

This design also future-proofs Quipu against shifts in the attestation landscape. If blockchain attestation becomes dramatically cheaper, more privacy-preserving, or more universally trusted in future, a new adapter can be added without any change to Core or to existing consumers. Conversely, if blockchain fades as an infrastructure choice, Quipu is not left holding a dependency it no longer wants.

---

## GDPR and privacy considerations

One of the main reasons blockchain is not the default attestation backend is GDPR. Putting personal data on a public immutable ledger is a direct conflict with GDPR Article 17 (right to erasure). Standard mitigations (off-chain storage with on-chain hashes, permissioned chains, encrypted payloads with key destruction) all reduce to "we are using the chain only for hashes" — at which point the question arises whether a hash chain plus RFC 3161 or OpenTimestamps offers the same guarantees more simply.

The architecture's position is: consumers should default to the simplest backend that satisfies their trust model. Blockchain is available for cases where simpler backends genuinely fall short, but it should be a considered choice, not a default.

---

## Implementation roadmap

This document is the design brief for v1.5. The expected implementation sequence is:

1. Add optional `previousEventHash` field to `QuipuEvent` in `@quipu/core`.
2. Add `Hasher` interface, `canonicaliseEvent`, and `hashEvent` to `@quipu/core`.
3. Implement `createChainedEventStore` wrapper in `@quipu/core`.
4. Release `@quipu/hasher-sha256` adapter.
5. Add `Attestor` / `Verifier` interfaces and `attestHead` helper to `@quipu/core`.
6. Release `@quipu/attestation-local` adapter.
7. Release `@quipu/attestation-rfc3161` adapter.
8. Release `@quipu/attestation-ots` adapter.
9. Document the multi-attestor federated pattern as a recipe in `IMPLEMENTATION.md`.

Blockchain adapters, if developed, are expected to be community-contributed and may live in separate repositories.

---

## Open questions and invitation to contribute

This design is committed now to establish the architectural position, but it is explicitly open to amendment. Questions currently open for discussion:

- Should `canonicaliseEvent` mandate RFC 8785 (JCS) specifically, or define its own canonicalisation rules?
- Should the `Hasher` interface support streaming hashing for large events, or is single-shot sufficient?
- Should `Attestation` be first-class events on the primary cord (logged as events of a well-known type), or held separately? Arguments exist on both sides.
- Should Quipu Core provide a multi-attestor convenience wrapper, or leave federation to consumers?
- What is the right story for key rotation and revocation in the `@quipu/attestation-local` adapter?

Contributions, critiques, and alternative proposals are welcome via GitHub Issues or pull requests against this document.
