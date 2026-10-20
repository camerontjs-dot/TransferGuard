# Product specification

Design baseline: 2026-10-20. Proposed behavior, not a feature-completion claim. Mutable decisions and execution evidence belong in [issue #1](https://github.com/camerontjs-dot/TransferGuard/issues/1) and linked work.

## 1. User outcome

Help a person move supported information between formats or applications, or check a move performed elsewhere, without silently losing records, important fields, attachments, or existing relationships.

The user should be able to answer: what was considered, what reached the destination, what changed, what did not arrive, what still connects, and what could not be checked?

This is not a mandatory replacement for an existing importer. Prefer a verification companion where the native transfer already works well. Add a writer only where it improves a demonstrated job.

## 2. Import and export are both in scope

| Operation | Reads | Writes | Evidence required before calling it complete |
| --- | --- | --- | --- |
| Inspect an export | Supplied artifact | Optional new local report | Every admitted member/record is accounted for; unsupported or unreadable material is visible. |
| Export | Supported source snapshot | New export in an approved location | Independently enumerate the source, re-open the serialized export, and compare at the declared boundary. |
| Import | Export plus target profile | New isolated destination or staging area | Approved plan, exact input identity, write journal, actual destination read-back, and preservation checks. |
| Verify an existing transfer | Export/source evidence and destination evidence | Optional new local report only | Independent inventories and declared correspondence/comparison rules; missing evidence stays unknown. |
| Combined transfer | Source, export, destination | Only the selected approved outputs | Each export/import/verification boundary independently completes. |

An import-ready file is not a completed import into an application. When the user completes a native-app import, TransferGuard must inspect that actual destination through a supported reader, re-export, or bounded manual procedure. Otherwise report `IMPORT_PREPARED` and `DESTINATION_NOT_VERIFIED`.

## 3. Three evidence boundaries

- **S: source observation.** A point-in-time source inventory, with scope, source permissions, filters and any pagination or consistency limits.
- **E: exported artifact.** The actual bytes and records supplied or written.
- **D: destination observation.** What is actually present after import, not the writer's intended output or success response.

`S -> E` addresses export preservation. `E -> D` addresses import preservation. `S -> D` addresses the supported end-to-end contract when the snapshots are compatible.

Without S, E-to-D comparison can still be useful, but source-account completeness is unknown. An expected count supplied by the user is a consistency hint, not an independent exhaustive inventory. A stale or partial D cannot support a full destination pass.

## 4. The smallest first product

Select **one real source/destination pair** before production implementation. Deliver a coherent vertical slice, not a universal adapter framework: inspect, compare, existing-link checking, readable exceptions, and a saved report. Then add guarded export/import for the same pair if existing tools leave a useful gap.

Candidate families for selection, not advertised support:

| Family | Why investigate | Reason to reject or defer |
| --- | --- | --- |
| Linked notes and attachments | Understandable personal trial; identity, content and links matter together. | Existing importer/checker already meets the job, no adjudicable source identity, or no reachable actual users. |
| CSV/JSON record sets with explicit keys and references | Fits routine exports/imports; allows independent row, field and relationship checks. | Every customer needs bespoke semantic mappings, unavailable source inventory, or no recurring/valuable one-off job. |
| Requirements/test exports | Relationship-heavy specialist use. | Existing native reports solve it, or it would force this product to inherit a specialized workflow. |

Choose from observed workflows, source/destination accessibility, testability, contribution potential, and native-tool comparison. Do not choose only because a friend is willing to test or an old parser exists. A local round trip can test mechanics, but does not validate a real application migration. No concrete external app pair is selected by this document.

## 5. Preserve relationships without inventing them

Three different jobs must not be conflated:

1. **Record correspondence:** determine which destination record represents a source record. Prefer stable source IDs and explicit transfer maps. Names or title similarity alone are not identity.
2. **Existing-relationship preservation:** check that a source relationship reaches the correct corresponding destination record, attachment or section. A link that resolves to the wrong object is a failure even if its URL opens.
3. **New relationship suggestions:** later, propose possible associations where no relationship was established. Suggestions remain advisory until individually decided, and a decision does not rewrite source history.

Initial outputs should include a searchable relationship table and source/destination evidence. A force-directed graph, general knowledge graph, model-generated relationships and automatic repairs are not required for initial value.

Represent source-explicit links, explicit transfer mappings, caller-supplied decisions, and unresolved candidates separately. Dangling source links remain source defects, not newly caused migration loss. A missing target outside the declared scope is not automatically a broken migration.

## 6. Comparison contract

Each supported profile states what it can preserve and check: identities, selected fields, meaningful body content, attachments, relative links, anchors, ordering and metadata where applicable. Distinguish null from blank, identifiers from numbers, time zones from display formatting, and missing fields from unsupported fields.

Allowed transformations must be explicit and versioned. Markdown and HTML need not have equal bytes, but a normalizer must not erase a materially missing paragraph. A one-to-many conversion needs an explicit correspondence rule; equal record counts are neither necessary nor sufficient.

Display exact discrepancies and supporting locations. Preserve originals and raw observations. Never normalize conflicting identities into a silent match, silently truncate an input, or infer success from an empty result.

## 7. Non-goals and safety limits

Initial product excludes:

- Universal migration, every app/version, arbitrary spreadsheets, or reverse-direction support by implication.
- Source deletion, destructive cleanup, silent overwrite, or a bidirectional synchronization service.
- Automatic semantic repair, bulk confirmation of uncertain relationships, or AI-authenticated human approval.
- Hosted uploads, remote model processing, automatic telemetry, or a data-collection business.
- A requirements-management suite, data warehouse, backup engine, release-approval system, or compliance certification.
- Claims of complete source-system truth from an export, or tamper-proof authenticity from self-contained hashes.

Later live-app writers need their own read/write permission boundary, staging or draft behavior, rate/permission handling, independent read-back, and a realistic recovery contract. A remote import with irreversible side effects must not inherit a local-folder rollback claim.

## 8. User-visible states

Separate execution (`NOT_RUN`, `RUNNING`, `COMPLETED`, `INTERRUPTED`, `BLOCKED`) from findings (`PRESERVED`, `EXPECTED_CHANGE`, `DISCREPANCY`, `NOT_VERIFIABLE`, `EXCLUDED`). Exact serialized names remain a design choice until a schema is versioned.

Do not render a global green pass when a required check is unrun, unsupported, ambiguous, stale or failed. A user may accept a documented difference for their own purpose; that does not turn it into preservation. Show denominators and exclude nothing silently.

## 9. Public promise

Intended positioning: **Move your data. See what arrived and what still connects.**

Every release must name the tested profile, operations, limits and environments. Public planning is allowed; promotion of an installable release waits for maintainer-operated testing and the applicable pilot/release decision. The working name must be reconsidered before broad promotion because an unrelated service already uses it; this is a naming-confusion observation, not a trademark determination.
