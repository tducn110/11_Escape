# Stage E — Hybrid Solver

## Objective

Prove solvability with the same transition engine as runtime while avoiding exponential enumeration of independent exit orders.

## Key design decision

Under v1 rules, exit actions are monotonic and pairwise commuting when both are legal in the same state. The solver therefore collapses exit permutations into a deterministic **exit closure**. Search branches only on rotate decisions.

This exit-closure mechanism is the required partial-order reduction for the released v1 rules.

## Solver result

```ts
export type SolveStatus = "SOLVABLE" | "UNSOLVABLE" | "INCONCLUSIVE";
export type SolverPath = "FAST_EXIT_CLOSURE" | "STATEFUL_ROTATE_SEARCH";

export interface SolveCost {
  rotateCount: number;
  totalActionCount: number;
}

export interface SolverDiagnostics {
  exploredStates: number;
  generatedStates: number;
  prunedDominatedStates: number;
  collapsedExitActions: number;
  frontierPeak: number;
  elapsedMs: number;
  stateBudget: number;
  timeBudgetMs: number;
}

export interface SolveResult {
  levelId: LevelId;
  status: SolveStatus;
  solverPath: SolverPath;
  cost: SolveCost | null;
  actions: PuzzleAction[];
  finalStateKey: string | null;
  diagnostics: SolverDiagnostics;
  reason: string | null;
}
```

## Deterministic exit closure

Create `scripts/levels/solver/exitClosure.ts`.

```ts
export interface ExitClosureResult {
  state: PuzzleState;
  actions: PuzzleAction[];
  transitions: PuzzleTransitionResult[];
}

export function applyDeterministicExitClosure(
  level: TribeOutLevel,
  initialState: PuzzleState,
): ExitClosureResult;
```

Algorithm:

```text
state := initialState
trace := []
loop:
  legalExits := listLegalExitActions(level, state), sorted by unitId
  if legalExits is empty: return state and trace
  action := first legal exit
  result := applyPuzzleAction(level, state, action)
  assert result.accepted
  state := result.nextState
  append action and result
```

Completeness rationale:

- A successful exit cannot invalidate another currently legal exit.
- It only removes occupancy or opens gates.
- Therefore choosing a deterministic legal exit cannot destroy a no-rotate solution.
- Repeating to closure solves every state solvable with exits alone.

Directly test the commutativity premise. Do not rely only on comments.

## Fast path

`fastSolver.ts`:

1. Create the initial puzzle state.
2. Apply deterministic exit closure.
3. If complete, return `SOLVABLE`, `FAST_EXIT_CLOSURE`, rotate count 0.
4. If not complete and no rotate charges remain, return `UNSOLVABLE`.
5. Otherwise return a handoff state for stateful search.

The 40-independent-unit fixture must complete through the fast path with explored states bounded by a small linear threshold, recommended `<= 2` search states plus 40 closure actions.

## Stateful path

Use lexicographic Dijkstra over **closed macro-states**.

Every queue node is normalized by applying exit closure before insertion. Therefore the queue never branches over individual exit orders.

### Node fields

```ts
interface SearchNode {
  state: PuzzleState;              // already exit-closed
  stateKey: string;
  rotateCount: number;
  totalActionCount: number;
  actions: PuzzleAction[];
}
```

### Priority

Compare in order:

1. `rotateCount` ascending;
2. `totalActionCount` ascending;
3. `stateKey` ascending for deterministic ties.

The selected solution must prefer 0 rotates and 12 total actions over 1 rotate and 9 total actions.

### Successor generation

For each legal rotate action sorted by unit ID:

1. Apply the rotate through `applyPuzzleAction`.
2. Apply deterministic exit closure to the rotated state.
3. Concatenate rotate action and closure actions.
4. Serialize the closed successor.
5. Insert only if not dominated.

### Dominance

For an identical canonical state key, retain only the best lexicographic cost. A worse or equal cost is pruned.

Because rotate charges are part of the state key, do not use an unsound rule that treats states with different remaining charges as identical.

### Budgets

Default release budgets must be exported constants and written into reports. Recommended initial values:

```text
stateBudget: 250,000 closed states per level
timeBudgetMs: 5,000 per level in CI
```

The implementation may tune these values based on measured performance, but the final values must be explicit and all 100 release levels must resolve within them.

Budget exhaustion returns `INCONCLUSIVE`, never `UNSOLVABLE` or `SOLVABLE`.

## Replay verification

Every `SOLVABLE` trace must be replayed from `createInitialPuzzleState` using `applyPuzzleAction`.

Acceptance requires:

- every action accepted;
- final state complete;
- replay final key equals solver final key;
- replay rotate count and action count equal reported cost.

## CLI

`npm run levels:solve` writes:

```text
reports/levels/solutions.json
reports/levels/solutions.md
```

The command fails when any selected level is invalid, unsolvable, inconclusive, or has a non-replayable trace.

## Mandatory fixtures

- simple monotonic chain;
- 40 independent units;
- permanent obstacle lock with zero rotate charges;
- one switch opening one gate;
- two-layer gate chain;
- one required rotate;
- wrong rotate dead end;
- competing zero-rotate/one-rotate solutions;
- multi-cell paths in all directions;
- tiny state budget returns `INCONCLUSIVE`;
- trace replay.
