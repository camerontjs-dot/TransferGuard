# Personal and agent practice demo

This **0.0.1-demo** is a deliberately small synthetic preview, built from scratch. It is not the first real transfer profile, an Evernote/Jira adapter, or a product release. Issue #3's real-workflow selection stays open. No former implementation or qualification is inherited.

## Personal test: no terminal or installation

Open `demo/TransferGuard-Try-Me.html` in a desktop browser. It is self-contained: no hosted page, account, model, package installation, or remote assets are required.

1. Start with **Healthy transfer** and press **Run comparison**. The two invented workspaces should match.
2. Choose **Same count, missing note**. Check which item disappeared even though both counts are four.
3. Choose **Link points to the wrong note**. Inspect the relationship table. A working link is not necessarily the right link.
4. Try **Not enough evidence**. It must not look like a successful verification.
5. In **Export / import practice**, download the sample export, select that saved JSON file, and run the check again. The actual selected bytes are read into a temporary in-page workspace. You can save that workspace as another JSON file.
6. Use **Save feedback questions**. Answer what was confusing and what you would need for a real transfer. Nothing is sent automatically.

The seven fixtures are constructed examples, not application bug reports. Each case's expected result is behind a reveal control. Browser download requests are not proof the user saved a file; the import exercise reads the file actually selected. Browser save prompts and overwrite decisions belong to the browser, not this page.

No real company or personal data should be used. The `synthetic` marker is self-declared, not a sensitive-data detector. Refreshing the page discards its in-memory workspace. Existing files are not modified by the page; explicit buttons request new downloads.

## Agent interface

From the repository/package root, with Node.js 22 or newer already installed:

```sh
node demo/cli.cjs describe
node demo/cli.cjs demo --case healthy
node demo/cli.cjs demo --case equal-count-loss
node demo/cli.cjs demo --case wrong-link
node demo/cli.cjs demo --case partial-inventory
```

There are **no npm dependencies or install step**. Each command writes exactly one JSON object on stdout, including input errors, and never prompts. Read `skills/transferguard-demo/SKILL.md` for the bounded workflow. `demo/bundle.schema.json` describes the toy input, with extra runtime constraints documented inside it.

| Exit | Meaning |
| --- | --- |
| 0 | No observed differences, or the requested non-verification command completed. Inspect `operation`, `execution`, and `verdict`; zero alone is not a transfer verdict. |
| 1 | Differences found. This is a valid completed comparison, not a crashed tool. |
| 2 | Blocked or invalid request. Read the structured error; do not assume a previously created output was verified. |
| 3 | Not verifiable or existing source problems requiring review. Never convert this to a clean result. |

`NO_DIFFERENCES` means only the checked synthetic snapshots match. `source_system_completeness` always remains `NOT_ESTABLISHED`. No fuzzy identity, inferred semantic links, or hidden normalization occurs. Unknown/partial required inventories do not produce missing-record certainty. Findings are not paginated away.

## Guarded file export/import for scripts

The demo supports a JSON workspace and a JSON export envelope for the same toy records. Importing/exporting them is real file I/O, **not migration into another application**.

First obtain source JSON by saving the browser's imported workspace, or use an explicitly constructed synthetic fixture. Then:

```sh
node demo/cli.cjs plan --operation export --input /absolute/source.json --output /absolute/new-export.json
```

The plan reads only. It returns a `plan_id`, exact input/output identities and a one-file creation preview. A caller with actual covering write authorization may pass that exact token:

```sh
node demo/cli.cjs transfer --operation export --input /absolute/source.json --output /absolute/new-export.json --approve-plan EXACT_RETURNED_PLAN_ID
```

Import uses the same sequence with `--operation import`, the exported package as input and a new workspace JSON as output. Finally use `verify --source SOURCE --destination DESTINATION` on the actual saved files.

The token binds the plan; it is not authentication or evidence that a human approved it. Changed inputs/target invalidate the token. Existing outputs, symlinks and symlinked output ancestors are refused. Use an existing, real, local output directory; on macOS a path through `/tmp` may be a symlink, so select its resolved location instead. No network-filesystem atomicity or hostile-concurrent-filesystem containment is claimed.

A new sibling `.partial-*` file is written and flushed before an exclusive hard-link publication. Ordinary errors clean the task's staging file; abrupt termination may leave a `.partial-*` artifact. A final file can exist without a completed response if the process stops after publication. Re-read it; do not infer verification from its presence. No pre-existing file is deliberately overwritten or deleted.

## Technical checks

```sh
node --test tests/*.test.cjs
node demo/build.cjs --check
```

These use Node's standard library. The machine-consumer tests spawn the actual CLI, parse its output, exercise stale/missing approval, refuse overwrites, and inspect saved export/import bytes. They are automation/contract tests, not an independent language-model agent trial.

An additional dependency-free browser test uses an already installed Chrome/Chromium and a separate temporary browser profile:

```sh
node tests/native-browser-smoke.cjs
```

Set `TG_CHROME` to the existing executable and `TG_TEST_OUTPUT` to a task-owned output folder as necessary. It exercises the actual standalone file, clicks controls, saves and reopens downloads, tries malformed/inert-markup input, checks keyboard activation and narrow layout, and records page network requests. It does not attach to your normal browser profile. Do not install a browser or bypass device policies merely to get a pass.

Rebuild the single HTML from `page.html`, `core.js`, `samples.js`, and `app.js` with `node demo/build.cjs`. Its content security policy hashes the exact inline script bytes and blocks remote connections. The CLI and page use the same comparator; the tests use separately specified expected results and actual files. This is not reviewer independence.

## What this does not qualify

No live-app support, binary-attachment conversion, semantic equivalence, large migrations, multiple-writer safety, Windows/Safari support, authentic source inventories, practitioner usefulness, personal acceptance, independent agent reasoning, hosted operation, or public beta release is established by this demo. The user's own try-out and the first real format decision remain next steps.

## Verification status for this handoff

The engine and CLI have 38 passing checks on Linux and macOS, plus four constructed faulty variants detected by the core tests on Linux. These were authored and operated by the same assistant, not independent reviewers.

The native Chrome desktop run exercised all seven cases, actual JSON downloads and file-input read-back, invalid-input reset, inert markup, and keyboard activation. The full browser suite did **not** pass: its 390-pixel layout check found overflow. A subsequent CSS-only correction changes the mobile grid to a shrinkable track; that correction and visual screenshot review are **NOT_RUN** because the connected-device tool reached its usage limit. Use a desktop-width window for the first personal try. The final package keeps the same comparison/CLI logic as those passing checks.

A prior browser-driver attempt omitted the Enter text event and stalled at the keyboard step. The corrected driver advanced to the layout check. Original failures remain part of the evidence; neither is silently reported as a complete browser pass. A separate combined Node rerun hit the tool timeout; the core and CLI suites were subsequently run separately and passed (23 and 15 checks).

No actual LLM-agent session or user personal test has been performed.
