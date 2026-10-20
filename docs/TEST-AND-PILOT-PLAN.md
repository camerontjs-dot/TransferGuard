# Technical acceptance and pilot plan

Design baseline: 2026-10-20. All tests below are planned, not executed. Numeric pilot targets are proposed project decisions, not industry benchmarks or market estimates.

## Progression

**Profile selected -> independent fixtures -> read-only checker -> guarded transfer -> packaged maintainer trial -> opt-in peer usability trial -> real-workflow pilot -> bounded public beta.**

Public design/source work is distinct from distributing an executable candidate. The maintainer personally tries the actual package before an external tester receives it. A test run by an AI agent is not that personal trial.

## A. Select one workflow

Record two independently described real jobs where possible: source, destination, artifact formats, transfer trigger, what matters, current workaround, native-tool behavior, ability to adjudicate, and data permission. Describe the existing tool comparison fairly, including reasons not to build a replacement writer.

Select one pair with accessible source/destination evidence and a useful bounded result. Do not require every user to need both import and export, and do not claim that friendly interest validates the job. Preserve rejected profiles and lack-of-benefit findings.

**Exit:** a reviewed profile and a small acceptance corpus whose expected preserved records, fields, assets and relationships are specified before decisive testing.

## B. Required test families

| Case | Required observation |
| --- | --- |
| Ordinary valid transfer | Supported fields/assets/links preserved; no fabricated alarm. |
| Missing record plus duplicate replacement | Discrepancy detected even when totals are equal. |
| Missing attachment / altered attachment | Exact affected object and reference identified. |
| Right number of links, wrong endpoint | Incorrect relationship detected, not passed because the link opens. |
| Pre-existing dangling source link | Attributed to source evidence; not invented as a transfer defect. |
| Renamed file or explicit new ID | Correct when justified by the declared mapping; ambiguous otherwise. |
| Unsupported or missing source IDs | No false identity from matching titles or positions. |
| Allowed markup/encoding transformation | Expected change passes only the declared rule. |
| Lost paragraph hidden by normalization | Verifier remains sensitive; raw evidence supports review. |
| One-to-many or many-to-one mapping | Explicit profile contract and complete accounting, not count equality. |
| Leading-zero ID, null/blank, large numeric ID, time zone | No silent coercion beyond the profile's contract. |
| Partial page / truncated transfer / parser failure | Partial or blocked, never a clean complete report. |
| Changed input or target after approval | Old approval/check invalidated; relevant steps rerun. |
| Case/Unicode/path collisions and unsafe archive paths | No hidden overwrite or escape; actionable refusal. |
| Unwritable destination, disk full, interrupt, retry | No damage to pre-existing data; complete or visibly partial staged result. |
| Missing permission / delayed destination visibility | Unknown or blocked, not missing-data certainty from inaccessible data. |
| Consistently re-hashed forged report | Hash consistency not misrepresented as source authenticity. |
| Scope exclusions and unsupported metadata | Shown separately from preserved or failed records. |

Run at the real reader/writer/consumer boundary. Unit tests supplement, not replace, actual import/export and saved-report use. Include resource-limit and platform tests once those claims exist. Record expected/actual behavior, source/artifact/profile/environment identities, original failures, and checks not run.

For fixes, demonstrate a regression failing against the old implementation for the right reason and passing on the candidate, with a normal valid case preserved. Challenge the verifier with deliberately damaged outputs. Do not change expectations after seeing results without retaining the original result and declaring a new evaluation.

## C. Maintainer personal trial

Use the exact installable package and normal instructions, not a developer checkout secretly repaired during the session. First exercise a controlled corpus; then a non-sensitive, permissioned source/destination pair relevant to the maintainer.

The maintainer personally performs:

1. Open/install using the intended route and understand supported scope.
2. Inspect an existing artifact and verify an independently created destination.
3. Preview an export/import, inspect predicted changes, and approve only the intended new output.
4. Perform the supported transfer and open its actual result in the destination consumer.
5. Investigate one missing object and one relationship problem from the report.
6. Leave an ambiguous finding unresolved, save the report, and reopen it later.
7. Cancel or encounter a controlled failure, then recover without damaging originals.

Keep time-to-first-useful-result, instructions misunderstood, interventions, errors, and corrections. Record the maintainer's own observations separately from agent reports.

**Exit:** maintainer approves the exact bounded trial experience; no unresolved blocker against the declared safety contract; report explains what to investigate, the evidence, and what was not checked. A screenshot or personal approval alone does not qualify correctness, new platforms or market demand.

## D. External pilot cohorts

### Friendly usability reviewers

Invite a small number of willing peers after the personal trial. Their role is to test installation, clarity, error recovery and usefulness of the report. Technical fluency and prior collaboration are selection clues, not consent or evidence that their daily work needs this tool.

### Actual-workflow participants

Screen for a supported source/destination pair, actual completed or planned transfer, current workaround, ability to verify the result, and permission to use the artifacts locally. Include independent users beyond the maintainer's friends. No company/regulated/sensitive data is requested by default.

Proposed initial pilot: five actual-workflow attempts. Keep all attempts in the denominator, including setup failures and withdrawals. Seek at least three independently completed useful comparisons and at least two concrete continuation signals before broader promotion. A useful result may confirm a healthy transfer; it need not find a defect. Revisit these thresholds prospectively if the job is infrequent, and never count synthetic demonstrations as real-workflow cases.

Measure total hands-on work including setup/export/configuration, not just engine runtime. Compare with the user's normal method and relevant native tooling. Capture materially misleading findings, missed problems, unnecessary alarms, manual repairs and operator help. Friend praise, GitHub stars and downloads are not completed jobs.

**Stop/narrow:** incorrect clean verdict, damage to originals, privacy breach, unreadable report, unavailable adjudication, bespoke configuration dominating the task, or native tools already meeting the job with lower effort. Safety/correctness failures block the affected release; a no-benefit result changes the product decision.

## E. Recruitment and privacy

Use existing relationship records for names and consent; do not create a public contact tracker. Ask about a workflow before asking for data. An earlier agreement to review another project is not TransferGuard consent. Avoid stacking requests on open obligations. No bulk messages, scraped member lists, artificial endorsements, or implied employer participation.

One useful screening prompt: 'What was the last time you moved data between tools, what did you need to preserve, and how did you check the result?'

Keep contact details, raw correspondence, personal exports, private paths and identifiable pilot notes out of this repository, including issues and PRs. Publish only consented, sanitized observations and synthetic fixtures with a clear origin. Hashes and screenshots may also identify private material.

## F. Public beta release gate

Require exact supported profile/operations/platforms, actual install and consumer tests, independent verifier sensitivity, completed personal trial, pilot disposition, known limitations, understandable instructions, dependency/license review, appropriate security reporting route, and maintainer release approval. Do not inherit another project's gate or quietly claim it passed.

Each release names its artifact identity and tested limits. Public beta is not a promise of universal completeness, safe deletion of originals, hosted data processing, or support for a reverse direction. A later schema/profile/writer change triggers the affected rechecks.
