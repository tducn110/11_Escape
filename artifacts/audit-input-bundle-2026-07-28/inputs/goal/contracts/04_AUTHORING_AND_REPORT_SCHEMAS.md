# Authoring and Report Schemas

## Difficulty target band

```ts
export interface NumericRange {
  min: number;
  max: number;
}

export interface DifficultyTargetBand {
  boardRows: NumericRange;
  boardCols: NumericRange;
  unitCount: NumericRange;
  initialAvailableMoves: NumericRange;
  initialAvailableRatio: NumericRange;
  causalDepth: NumericRange;
  averageAvailableMoves: NumericRange;
  minRotateRequired: NumericRange;
  meaningfulDecisionProxy: NumericRange;
  deadEndRisk: NumericRange;
}
```

## Approved exception

```ts
export interface ApprovedMetricException {
  metric: keyof DifficultyReport;
  actualValue: number | string;
  targetDescription: string;
  reason: string;
  manualEvidenceRequired: string;
}
```

An exception with an empty reason or missing evidence is invalid.

## Authoring manifest

```ts
export interface LevelAuthoringManifest {
  levelId: LevelId;
  phase: DifficultyPhase;
  sourceKind: "authored" | "generated" | "generated-with-override";
  generatorVersion: string;
  seed: string | null;
  templateId: string;
  concepts: string[];
  intendedOpening: PuzzleAction[];
  rotateRequired: boolean;
  intentionalDeadEnd: boolean;
  deadEndSignal: string | null;
  timerModel: {
    observationAllowanceSeconds: number;
    actionAllowanceSeconds: number;
    mobileBufferSeconds: number;
  };
  targetBand: DifficultyTargetBand;
  approvedExceptions: ApprovedMetricException[];
}
```

## Dependency blueprint

```ts
export type BlueprintNodeRole =
  | "root"
  | "spine"
  | "branch"
  | "join"
  | "gate-key"
  | "gate-blocked"
  | "rotate-candidate"
  | "multicell-bridge";

export interface DependencyBlueprintNode {
  id: string;
  role: BlueprintNodeRole;
  footprint: "1x1" | "2x1" | "1x2";
  allowedDirections: Direction[];
}

export interface DependencyBlueprintEdge {
  from: string;
  to: string;
  kind: "blocks-exit" | "opens-gate-for";
}

export interface DependencyBlueprint {
  templateId: string;
  nodes: DependencyBlueprintNode[];
  edges: DependencyBlueprintEdge[];
  gateChains: GateChainBlueprint[];
  rotateCharges: number;
  intendedRotateNodeIds: string[];
}
```

## Generator result

```ts
export interface GeneratedCandidate {
  level: TribeOutLevel;
  manifest: LevelAuthoringManifest;
  seed: string;
  generatorVersion: string;
  attempt: number;
  blueprint: DependencyBlueprint;
}

export interface CandidateEvaluation {
  validation: ValidationResult;
  solve: SolveResult | null;
  difficulty: DifficultyReport | null;
  accepted: boolean;
  rejectionReasons: string[];
}
```

## Catalog report summary

```ts
export interface CatalogSummary {
  levelSetVersion: number;
  generatorVersion: string;
  levelCount: 100;
  validCount: number;
  solvableCount: number;
  inconclusiveCount: number;
  outOfBandCount: number;
  approvedExceptionCount: number;
  phaseSummaries: PhaseSummary[];
}
```

## Report serialization

- JSON uses stable key ordering where practical and stable level ordering.
- CSV has one row per level and explicit coverage columns for sampled metrics.
- Markdown summarizes phases and lists every invalid, unsolvable, inconclusive, out-of-band, exception, and performance-outlier level.
- Committed deterministic reports exclude wall-clock timestamps. Execution evidence may record timestamps separately.
