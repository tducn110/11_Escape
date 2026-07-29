# Stage F — Difficulty Analyzer

## Objective

Measure logical depth, strategic decisions, statefulness, and visual density separately. The analyzer must not mistake high unit count for deep puzzle design.

## Report model

```ts
export type MetricCoverage = "exact" | "sampled" | "not-applicable";

export interface MetricValue<T> {
  value: T;
  coverage: MetricCoverage;
  sampleCount: number | null;
  seed: string | null;
}

export interface DifficultyReport {
  levelId: LevelId;
  phase: DifficultyPhase;
  unitCount: number;
  obstacleCount: number;
  gateCount: number;
  switchCount: number;
  multiCellUnitCount: number;
  initialAvailableMoves: number;
  initialAvailableRatio: number;
  criticalPathLength: MetricValue<number | null>;
  causalUnlockDepth: MetricValue<number>;
  averageAvailableMoves: MetricValue<number>;
  forcedStateRatio: MetricValue<number>;
  minRotateRequired: number;
  deadEndRisk: MetricValue<number>;
  meaningfulDecisionProxy: MetricValue<number>;
  mechanicUsage: MechanicUsageReport;
  phaseTargetStatus: "IN_BAND" | "OUT_OF_BAND" | "APPROVED_EXCEPTION";
  outOfBandReasons: string[];
}
```

## Metrics

### `initialAvailableMoves`

Count legal exit actions in the initial puzzle state. Do not count rotate actions.

### `initialAvailableRatio`

```text
initialAvailableMoves / unitCount
```

Return 0 for invalid zero-unit input; validator prevents such levels from release.

### `criticalPathLength`

Use only for monotonic levels whose logical constraints can be represented as a static dependency graph without required rotate or stateful gate sequencing.

Create blocker edges:

```text
blocker unit -> blocked unit
```

Only live units are graph nodes. Obstacles and permanently blocking gates make a level unsolvable rather than becoming removable nodes.

Compute the longest DAG path in nodes. If the graph is cyclic, the validator/solver outcome determines rejection; do not silently report a path.

### `causalUnlockDepth`

This is the primary stateful depth metric.

#### Monotonic calculation

Use exit waves:

```text
depth := 0
state := initial
while incomplete:
  exits := legal exits at start of wave
  if empty: no finite depth
  apply every start-of-wave exit in stable order
  depth += 1
```

Exits that become legal during a wave belong to the next wave.

#### Stateful calculation

Use macro-state search with lexicographic objective:

```text
(rotateCount, decisionLayerCount, totalActionCount)
```

- A required rotate is one layer.
- The subsequent exit wave is another layer.
- Exit actions that were legal together and commute share a layer.

Required expected results:

```text
8 independent units              -> 1
8-unit dependency chain          -> 8
2 parallel chains of length 4    -> 4
required rotate then exit        -> 2
switch opens gate for later unit -> at least one additional layer
```

### `averageAvailableMoves`

Do not enumerate all escaped subsets.

For monotonic levels:

- include the canonical exit-wave trace;
- include a fixed number of deterministic topological traces generated from stable seeds;
- recommended sample count: 32 traces;
- record sample count and seed.

At each pre-action state, count legal exits. Average across sampled states.

For stateful levels:

- use the reduced closed-state graph explored by the solver when fully explored;
- otherwise sample deterministic winning traces and label the metric sampled.

### `forcedStateRatio`

Ratio of observed decision states with exactly one legal exit. A state with rotate choices but no legal exit is not counted as a one-exit state; record it through stateful metrics.

### `minRotateRequired`

Copy from the lexicographically optimal solver result.

### `deadEndRisk`

For monotonic exit-only levels, exact value is 0 by contract.

For stateful levels:

```text
legal rotate actions from winning-reachable closed states
that lead to states with no winning solution
/
all legal rotate actions from those states
```

Use exact reduced graph when available. Otherwise deterministic sampling with coverage metadata.

Do not count a blocked tap as a legal puzzle action.

### `meaningfulDecisionProxy`

Count closed states containing at least two legal non-equivalent rotate actions that lead to different canonical closed successor states and different future solution consequences.

Independent exit ordering is not a meaningful decision because it is collapsed by exit closure.

### `mechanicUsage`

Report whether each obstacle, gate, switch, and multi-cell unit participates in a constraint or solution transition.

An obstacle participates only when it blocks at least one direction relevant to a live unit or makes rotate meaningful. A decorative obstacle that affects no legal or candidate route is unused and should reject generated candidates.

## Outputs

`npm run levels:report` writes:

```text
reports/levels/difficulty.json
reports/levels/difficulty.csv
reports/levels/difficulty.md
```

Metadata:

- tool version;
- git commit;
- level-set version;
- generator version;
- command and arguments;
- timestamp;
- exact/sampled coverage;
- seeds and sample counts;
- solver budgets.

The CLI fails for invalid, unsolvable, inconclusive, or unapproved out-of-band release levels.
