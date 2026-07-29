# Tribe Out Puzzle-System Goal Package

## Purpose

This directory is the complete, authoritative English implementation specification for the repository located at:

```text
/home/pro/Downloads/intern/11_Escape
```

The implementing agent must read this file first, then implement the entire specification end to end. The assignment is not complete after a single internal phase. Internal phases exist to control dependency order and verification, but the agent continues until the global Definition of Done is satisfied or a hard blocker is proven.

## Authoritative inputs

1. This specification package.
2. The live repository at `/home/pro/Downloads/intern/11_Escape`.
3. `source/Logic.md` for the approved strategic plan.
4. `source/repomix-output.xml` for the source snapshot supplied with this package.

The user confirmed that the supplied plan and Repomix were created from the correct local repository. Treat the snapshot context as `CONTEXT_FRESH` for specification authoring. During implementation, inspect the live files before editing so symbol mapping remains accurate.

## Specification authority

This package defines target behavior and architecture. When existing source contradicts the specification, the implementing agent is authorized to modify, replace, or delete the conflicting source, tests, imports, scripts, types, documentation, generated data, and persistence behavior within the defined scope.

The agent must not weaken the specification to preserve legacy behavior.

## Final scope

The implementation must complete all of the following:

- Run the installed `figma-triage` skill once at the beginning, remove every confirmed redundant item reported by its analysis, validate the cleanup, then never invoke or modify that skill again during this assignment.
- Remove the complete coin/economy system.
- Establish one browser-independent pure puzzle engine shared by runtime and CLI tools.
- Establish a structural validator.
- Establish a hybrid solver that avoids exponential enumeration of independent exits.
- Establish a deterministic difficulty analyzer.
- Migrate progress to stable string level identifiers.
- Replace or regenerate the full 100-level catalog.
- Divide the 100 levels into five 20-level difficulty phases with phase-specific authoring/generation algorithms.
- Integrate runtime, hints, stars, timer, Dashboard, Settings, persistence, accessibility, animation, audio boundaries, and cleanup with the new domain.
- Pass all automated, performance, level, build, and manual release gates.

## Mandatory overrides to the original plan

These decisions override conflicting language in `source/Logic.md`:

1. **Catalog scope:** all 100 levels, not only the first 20–30.
2. **Difficulty structure:** five phases of 20 levels each.
3. **Economy:** remove coins, coin rewards, completion rewards, first-clear rewards, replay reward logic, anti-farming logic, hint prices, coin persistence, and coin UI.
4. **Level identity:** each level has one stable ID such as `level-001`; do not add `v2` or content-version suffixes to individual level IDs.
5. **Progress:** retain unlocked levels, current level, and stars; add schema and level-set versions.
6. **Triage:** run `figma-triage` once at the start, remediate its confirmed findings, validate, freeze that scope, and do not run it again.
7. **Conflict authority:** source conflicting with this specification may be deleted or rewritten.

## Read order

1. `START_HERE.md`
2. `MASTER_EXECUTION_SPEC.md`
3. `source/OVERRIDES_AND_DECISIONS.md`
4. `contracts/01_CURRENT_STATE.md`
5. `contracts/02_TARGET_ARCHITECTURE.md`
6. `contracts/03_DOMAIN_CONTRACT.md`
7. All files under `implementation/` in numeric order
8. All files under `quality/`
9. `TRACEABILITY_MATRIX.md`

## Global stop condition

Stop successfully only when every required file contract, behavior contract, test, level report, migration rule, quality gate, manual verification item, and evidence requirement is complete.

If completion is impossible, stop with `GOAL_BLOCKED` and provide exact evidence. Do not return a partial-success claim.
