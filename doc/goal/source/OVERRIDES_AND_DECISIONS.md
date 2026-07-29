# Approved Overrides and Decisions

This file records decisions made after the strategic plan was written. These decisions are authoritative.

## Repository

```text
/home/pro/Downloads/intern/11_Escape
```

The final ZIP is intended to be extracted into:

```text
/home/pro/Downloads/intern/11_Escape/goal
```

## Full catalog

The assignment covers exactly 100 released levels:

| Phase | Levels | Primary character |
| --- | --- | --- |
| Phase 1 | `level-001`–`level-020` | Foundation and explicit teaching |
| Phase 2 | `level-021`–`level-040` | Structured monotonic dependency |
| Phase 3 | `level-041`–`level-060` | Stateful gate/switch reasoning |
| Phase 4 | `level-061`–`level-080` | Strategic combination and rotate resource decisions |
| Phase 5 | `level-081`–`level-100` | Expert causal planning |

Each phase uses its own catalog construction algorithm and target bands. A single generic random-placement algorithm is forbidden.

## Level identity

Every level uses one stable string identifier:

```text
level-001
level-002
...
level-100
```

Do not append `v2`, content hashes, or content-version suffixes to level IDs. Catalog-wide changes use `levelSetVersion`.

## Economy removal

Remove the economy completely. This includes:

- `coins` state and persistence;
- per-unit rewards;
- win/completion rewards;
- first-clear rewards;
- reward claim records;
- replay anti-farming logic;
- hint costs and insufficient-coin behavior;
- coin HUD and Dashboard content;
- coin overlay content;
- economy-specific CSS, tests, constants, imports, and documentation.

Hints remain free. `hintsUsed` remains because the star calculation uses it.

## Progress retained

Retain:

- stable level IDs;
- unlocked level IDs;
- current level ID;
- best stars by level ID;
- progress schema version;
- level-set version.

For the first release of the redesigned 100-level catalog, reset stars for all 100 levels exactly once because every level is in redesign scope. Preserve valid unlock progression and current position.

## Figma triage

The implementing agent must:

1. Read the installed `figma-triage` skill instructions.
2. Run its analyze operation before puzzle-system implementation.
3. Save the complete raw analysis.
4. Classify and remove every confirmed redundant item in that analysis.
5. Validate the cleanup with the repository's actual build, typecheck, and tests.
6. Freeze the triage scope.
7. Never invoke the skill again during this assignment.

A finding may be retained only when proven to be a false positive with source evidence. The evidence must be listed in the initial triage report.

## Specification authority

The implementing model must follow the specification completely. When source conflicts with the specification, the model may remove or rewrite the source. It must not preserve contradictory legacy behavior.
