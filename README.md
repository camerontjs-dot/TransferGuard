# TransferGuard

**Move supported data. Check what survived. Keep the connections visible.**

TransferGuard is a proposed local-first tool for inspecting exports, preparing supported imports and exports, and independently comparing the result with the supplied source evidence.

> **Design-stage project.** There is no runnable TransferGuard application, supported-format release, or verified performance claim yet. The documents below define intended behavior, not implemented capabilities. TransferGuard is a working name pending a naming review; this repository is not affiliated with other similarly named services.

## The job

A transfer can preserve the number of files while losing a record, changing an identifier, or breaking an attachment link. The intended workflow is:

**Choose a job -> declare scope -> inventory inputs -> preview the transfer -> explicitly approve any writes -> re-read the result -> check content and existing relationships -> review exceptions -> save a report.**

A user should also be able to check a transfer performed by another tool. Using TransferGuard's exporter or importer must not be a prerequisite for verification.

## Four intended modes

| Mode | Intended outcome |
| --- | --- |
| Inspect | Explain what is in a supported export and whether it is usable. |
| Export | Read a supported source, write a new export, and compare the export with an independently captured source inventory. |
| Import | Preview a supported mapping, import into a new approved destination, and re-read the actual result. |
| Verify | Compare an existing export/source snapshot with a destination without changing either. |

Support is declared per format, direction, operation, version, and tested environment. Supporting an import does not imply support for the reverse export.

## Start here

- [Product scope and non-goals](docs/PRODUCT-SPEC.md)
- [End-to-end process map and step completion criteria](docs/PROCESS-MAP.md)
- [Architecture and data contracts](docs/ARCHITECTURE.md)
- [Technical tests, personal trial, and external pilot](docs/TEST-AND-PILOT-PLAN.md)
- [Audience and launch plan](docs/LAUNCH-PLAN.md)
- [Project planning issue](https://github.com/camerontjs-dot/TransferGuard/issues/1)
- [Contributing](CONTRIBUTING.md)

## Important boundaries

Checks apply only to the declared scope and supplied evidence. An export alone cannot establish whether an unseen source account exported everything. Matching hashes do not prove semantic completeness or authenticity. Existing links, deterministic identity mappings, and suggestions for new relationships must remain distinguishable.

The initial design excludes source deletion, silent overwrite, automatic semantic link creation, continuous synchronization, hosted customer-file processing, and universal format support. A report is not permission to delete the originals.

## Project and license

This is a fresh specification. No previous project's source, dependency stack, tests, or qualification is adopted by default. Any later reuse needs a small, justified, licensed change and tests for this project's own contract.

The repository's existing [MIT license](LICENSE) is retained. Implementation status, decisions, and evidence belong in issues and pull requests. Do not upload personal exports, contact lists, credentials, or private correspondence.
