# TransferGuard

**Move supported data. Check what survived. Keep the connections visible.**

TransferGuard is a proposed local-first tool for inspecting exports, preparing supported imports and exports, and independently comparing the result with the supplied source evidence.

> **Synthetic prototype, not a migration release.** This branch includes a small personal-practice page and an agent CLI. Only the constructed demo format is supported. Real application formats, production import/export, personal acceptance and external pilot usefulness remain unqualified. The working name remains provisional.

## Try the demo

The personal package includes `demo/TransferGuard-Try-Me.html`: open it in a desktop browser, select a case, and press **Run comparison**. No server, account, terminal or package installation is needed to use that generated page.

For a source checkout, build the standalone page using an existing Node.js 22+ installation:

```sh
node demo/build.cjs
```

Then open `demo/TransferGuard-Try-Me.html`. Generated HTML is not checked into Git. Start with **Healthy transfer**, **Same count, missing note**, and **Link points to the wrong note**. The page also lets you download a synthetic export and select the saved file for import/read-back.

Agents and scripts use the same engine:

```sh
node demo/cli.cjs describe
node demo/cli.cjs demo --case healthy
node demo/cli.cjs demo --case wrong-link
```

The wrong-link command deliberately exits **1** because it finds differences. It is not a crash. The CLI is non-interactive, produces JSON and has no npm dependencies. See [demo instructions](docs/DEMO.md), [the agent skill](skills/transferguard-demo/SKILL.md) and [the dated verification record](docs/DEMO-VERIFICATION.md). Browser qualification is incomplete: a narrow-layout correction needs replay. Use a desktop-width window for the initial personal trial.

## The intended product

**Choose a job -> declare scope -> inventory inputs -> preview the transfer -> explicitly approve any writes -> re-read the result -> check content and existing relationships -> review exceptions -> save a report.**

A user should also be able to check a transfer performed by another tool. Using TransferGuard's exporter or importer must not be a prerequisite for verification.

| Mode | Intended outcome, beyond the toy demo |
| --- | --- |
| Inspect | Explain what is in a supported export and whether it is usable. |
| Export | Write a new supported export and compare it with source observations. |
| Import | Preview a supported mapping, write into an approved destination and re-read the actual result. |
| Verify | Compare existing source/export and destination evidence without changing either. |

Support is declared per format, direction, operation, version and tested environment. Supporting an import does not imply support for the reverse export. The synthetic JSON round trip is not evidence of an application migration.

## Design and coordination

- [Product scope and non-goals](docs/PRODUCT-SPEC.md)
- [Process map and step completion criteria](docs/PROCESS-MAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Personal trial and external pilot plan](docs/TEST-AND-PILOT-PLAN.md)
- [Audience and launch plan](docs/LAUNCH-PLAN.md)
- [Project planning issue](https://github.com/camerontjs-dot/TransferGuard/issues/1)
- [Demo task](https://github.com/camerontjs-dot/TransferGuard/issues/6)
- [Contributing](CONTRIBUTING.md)

Checks apply only to declared scope and supplied evidence. An export alone cannot establish an unseen account's completeness. Matching hashes do not prove semantic completeness or authenticity. Existing links, explicit identity mappings and suggestions remain distinct. No source deletion, silent overwrite, automatic semantic links, hosted uploads or universal support is implied.

This is a fresh implementation, not a port of another project's source, dependency stack, tests or qualification. The existing [MIT license](LICENSE) is retained. Keep personal exports, contact lists, credentials and private correspondence out of public issues and source.
