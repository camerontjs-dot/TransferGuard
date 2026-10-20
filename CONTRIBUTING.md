# Contributing

TransferGuard is at the design stage. Start with the [README](README.md), [product specification](docs/PRODUCT-SPEC.md) and [planning issue](https://github.com/camerontjs-dot/TransferGuard/issues/1).

Useful early contributions are a clearly described transfer workflow, counterexamples to the design, a comparison with an existing tool, small redistributable fixtures, and documentation improvements. Before a substantial adapter, writer or schema change, discuss the specific job and acceptance boundary in an issue. Do not race an existing contributor.

## A useful issue

State source and destination formats/versions, expected preservation, observed behavior, relevant scope and current workaround. A bug needs a minimal reproduction on an identified baseline. Unsupported behavior is a feature question, not automatically a bug.

Use synthetic or deliberately redistributable examples only. Do not attach company exports, credentials, contact lists, proprietary files, private paths or user reports containing personal material. An anonymized file still needs sharing permission.

## A useful pull request

Work on a feature branch against the maintainer-specified base, normally `main`. Make one coherent change, preserve unrelated work, and stage exact paths. Include the user-visible behavior, exclusions, actual verification and remaining gaps. Do not invent sign-offs, agreement acceptance, execution, independent review or test results.

For code changes, use the toolchain declared by the accepted implementation. No product build/test commands exist yet; do not add a decorative passing CI badge. Before introducing a dependency, explain the need, license and operational boundary. Tests must exercise the actual relevant reader/writer/consumer and include a valid control. A repair needs an old-fails/new-passes regression.

AI assistance is permitted when contributors review the work, disclose material assistance and its verification limits, and can explain the change. AI-generated fixtures/expected results are not self-validating. Do not submit unreviewed bulk changes or mass-generated issues.

## Community conduct

Be respectful and specific. Critique behavior and evidence, not people. Harassment, discriminatory abuse, private-data disclosure and spam are not accepted. The maintainer may remove harmful material or limit participation. Never post sensitive incident details just to ask where to report them.

## License and release

Preserve the repository's [MIT license](LICENSE), third-party notices, and provenance of contributed material. Do not import unlicensed code or another project's private research. Merge, release, deployment, visibility, security settings and paid services remain separate maintainer decisions. Contributors should not interpret a plan as permission to operate someone else's systems.
