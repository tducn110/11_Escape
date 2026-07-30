# Stage A — One-Time Figma Triage and Cleanup

## Objective

Run the installed `figma-triage` skill exactly once before puzzle-system implementation, remove every confirmed redundant item returned by the analysis, validate the cleanup, and then permanently close the triage scope for this assignment.

## Required sequence

1. Change directory to `/home/pro/Downloads/intern/11_Escape`.
2. Read the installed `figma-triage` skill instructions. Do not infer its interface from its name.
3. Capture pre-triage evidence:
   - active branch;
   - HEAD commit;
   - full `git status --short`;
   - existing unrelated dirty entries.
4. Run the skill's analyze operation once.
5. Save the complete raw analysis to:

```text
reports/goal-execution/triage-initial.txt
```

6. Create:

```text
reports/goal-execution/triage-resolution.md
```

7. Classify every finding as one of:
   - `REMOVE_FILE`
   - `REMOVE_IMPORT`
   - `REMOVE_EXPORT`
   - `REMOVE_BRANCH`
   - `REMOVE_DEPENDENCY`
   - `REMOVE_CSS_OR_ASSET_REFERENCE`
   - `MERGE_DUPLICATE_IMPLEMENTATION`
   - `KEEP_FALSE_POSITIVE`
8. Fix every confirmed finding.
9. A `KEEP_FALSE_POSITIVE` entry must cite the exact live import/caller/runtime path proving it is used.
10. Run the current repository validation scripts after cleanup.
11. Mark the triage stage closed in `triage-resolution.md`.
12. Do not invoke the skill, rerun its analysis, edit its configuration, or add new triage work later in this assignment.

## Cleanup safety

Before deleting a file or asset, inspect:

- static imports;
- dynamic imports;
- registry entries;
- string asset paths;
- CSS URLs and selectors;
- package scripts;
- runtime DOM queries;
- test and audit scripts.

Do not delete an item only because Repomix omitted a binary or because a direct TypeScript import is absent.

## Interaction with later economy removal

The initial triage cleanup is limited to findings in the initial analysis. Later dead code caused by economy removal or domain extraction must still be cleaned as part of those implementation stages, but the `figma-triage` skill itself must not be invoked again.

## Acceptance criteria

- The raw initial analysis is preserved unchanged.
- Every finding has a resolution entry.
- Every confirmed redundant item is removed.
- Every retained item has proof.
- Current `npm run typecheck`, `npm test`, and `npm run build` pass after cleanup, unless a pre-existing failure is captured before cleanup and proven unrelated.
- No unrelated dirty file is overwritten or reverted.
- The resolution file explicitly states that the triage scope is frozen.

## Stop rule

If the skill is unavailable, its instructions cannot be read, or its analysis cannot run, stop the entire assignment with `GOAL_BLOCKED`. Do not substitute a guessed manual command and claim compliance.
