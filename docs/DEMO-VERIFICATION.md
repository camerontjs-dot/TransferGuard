# Synthetic demo verification record

Observed 2026-10-20. Task: issue #6. This is a fixed evidence summary, not a live status tracker. All implementation, fixture authoring and test operation were performed by the same assistant. No separate reviewer or LLM-agent session was launched.

## Results

| Boundary | Result |
| --- | --- |
| Core tests, Linux Node 22.16.0 | 23/23 PASS |
| Black-box CLI consumer, Linux Node 22.16.0 | 15/15 PASS |
| Same core/CLI suite, macOS arm64 Node 26.7.0 | 38/38 PASS |
| Four deliberately faulty core variants, Linux | 4/4 detected through assertions, not setup errors |
| CLI export and import | Actual new files created, re-read and compared; original preserved |
| Missing, fabricated or stale approval; existing target; symlinks | Refused in tested cases |
| Standalone Chrome 155.0.8059.85 on macOS arm64 | Seven scenario comparisons and their saved JSON reports completed; export download, selected-file import, saved workspace read-back, invalid import reset, inert markup and keyboard activation completed before later failure |
| Full native browser suite | FAIL on 390-pixel layout overflow; no overall browser pass |
| Subsequent CSS-only layout correction | Implemented, native replay NOT_RUN |
| Visual screenshot inspection | NOT_RUN |
| Page-network assertion at end of browser suite | NOT_REACHED; no complete measured network claim |
| Generated HTML rebuild consistency | PASS, byte-identical rebuild from source |
| Maintainer personal acceptance, independent LLM-agent trial, real app migration, external pilot | NOT_RUN |

The CLI tests spawn the actual command, consume JSON, inspect exit codes and read the resulting physical files without importing the product's implementation or sample generator. They test the machine interface, not whether another model independently reasons correctly about it.

Constructed mutation controls: accepting equal counts, ignoring body loss, treating unknown as clean, and ignoring link differences. All four were caught. These are intentional counterexamples, not historical application defects or general correctness proof.

## Identities

The desktop-exercised standalone HTML before the CSS correction had SHA-256:

`ab2bbf782f7b5fa6d521e290a583c005574cd270b3041983e34d62b44588156c`

The final HTML after the CSS-only correction has SHA-256:

`ed04e7c9a0848ac6eb65d1add3edd8ef1a961f2f3b6752435c9ce4dc53620871`

The comparator, CLI, browser controller and fixtures did not change in that correction. The source blobs used by the passing checks are:

| File | Git blob |
| --- | --- |
| demo/core.js | d59d6c36c57d02c892409bb16dad3406215dea60 |
| demo/cli.cjs | 662ef51504b8f72f562c5617dc85236473aded7a |
| demo/app.js | d59277976c50b1fd42d8194bc20f0f28bdbc0b0b |
| demo/samples.js | a9cb1465ae243507bb380fbb9f50bbbbca05d221 |
| tests/core.test.cjs | ae92f727221aba19eead1431a8b056ee7507357a |
| tests/agent-contract.test.cjs | 68646ad96101bd90f5464a3158d48c13eb800a94 |

## Failures and remaining boundary

The initial missing-module test occurred before implementation and is not a reproduced bug. Early chat-container browser navigation was blocked by environment policy; no policy bypass was attempted. Testing then used an already installed browser in a separate temporary profile on the authorized device.

Two native attempts stalled at the keyboard step because the driver did not supply the Enter text event. The corrected driver advanced to the narrow-layout failure. Those original failures remain failures. A combined Linux rerun hit the tool timeout; subsequent separate core and CLI runs passed with the same code. The device briefly disconnected and then returned the final failing layout log; a later device-tool quota prevented replay and screenshot inspection.

The CSS correction replaces the mobile grid's automatic minimum with a shrinkable track. It is not a verified fix until the original narrow-layout check is replayed. No original acceptance criterion is silently waived. The prototype can be used for a disclosed, synthetic desktop personal trial, not promoted as a fully qualified release.

Raw logs and screenshots remain in the task's private execution workspaces. They contain machine paths and are not part of the public source package. The exact candidate and distributed package identity are recorded on the owning PR and package manifest. No real data, contact information, outreach, merge, release, deployment or spend was introduced.
