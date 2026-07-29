# Evidence and Completion Protocol

## Baseline evidence

Before changes, capture:

```bash
pwd
git branch --show-current
git rev-parse HEAD
git status --short
git diff --stat
git diff
```

Store a copy under:

```text
reports/goal-execution/baseline/
```

When the worktree is dirty, record every out-of-scope entry and do not claim it was created by this assignment.

## Per-gate evidence

For each gate in `IMPLEMENTATION_ORDER.md`, record:

- files changed;
- diff stat;
- relevant raw diff;
- commands run;
- raw test/tool output;
- acceptance criteria result;
- unresolved risk;
- next gate decision.

Use:

```text
reports/goal-execution/gate-00.md
...
reports/goal-execution/gate-12.md
```

## Generated reports

Required:

```text
reports/levels/validation.json
reports/levels/solutions.json
reports/levels/solutions.md
reports/levels/difficulty.json
reports/levels/difficulty.csv
reports/levels/difficulty.md
reports/goal-execution/triage-initial.txt
reports/goal-execution/triage-resolution.md
reports/goal-execution/manual-qa.md
reports/goal-execution/final-verification.txt
```

## Final git evidence

Capture:

```bash
git status --short
git diff --stat
git diff --name-status
git diff
```

If changes are committed during the repository workflow, also provide:

```bash
git log --oneline --decorate -n 20
```

The final report must distinguish assignment changes from baseline unrelated changes.

## Raw command evidence

Never summarize a command as passed without preserving its raw stdout/stderr and exit code.

## Final completion report

Return these exact sections:

```text
STATUS
REPOSITORY
BRANCH_AND_COMMITS
BASELINE_WORKTREE
TRIAGE_ANALYSIS_AND_RESOLUTION
ARCHITECTURE_IMPLEMENTED
ECONOMY_REMOVAL
PROGRESS_MIGRATION
LEVEL_CATALOG_SUMMARY
VALIDATOR_SUMMARY
SOLVER_SUMMARY
DIFFICULTY_SUMMARY
FILES_CREATED_MODIFIED_DELETED
COMMANDS_AND_RAW_RESULTS
MANUAL_QA
OUT_OF_SCOPE_WORKTREE_ENTRIES
KNOWN_LIMITATIONS
DEFINITION_OF_DONE_CHECKLIST
```

`STATUS` must be exactly one of:

```text
GOAL_ACCEPTED
GOAL_BLOCKED
GOAL_FAILED
```

## `GOAL_BLOCKED`

Use only when an external capability, missing source, unrecoverable repository state, or impossible specification conflict prevents completion.

Include:

- exact blocker;
- evidence;
- affected requirements;
- work completed safely;
- changes that must not be treated as accepted.

## `GOAL_FAILED`

Use when implementation was attempted but repository correctness or verification is broken and no safe completion was achieved.

## No partial success

Do not use `GOAL_ACCEPTED` when:

- any release level is invalid, unsolvable, or inconclusive;
- tests/build/typecheck fail;
- economy remains reachable;
- progress migration is unverified;
- generated output is nondeterministic;
- initial triage findings remain unresolved;
- manual evidence is missing;
- source claims contradict raw evidence.
