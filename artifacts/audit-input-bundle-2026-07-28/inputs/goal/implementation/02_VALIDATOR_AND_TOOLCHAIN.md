# Stage D — Toolchain and Static Validation

## Objective

Provide deterministic TypeScript CLI tools that share the pure puzzle domain and reject malformed level data before solving or generation promotion.

## CLI contracts

### `npm run levels:validate`

Input defaults to the full runtime catalog. Optional arguments may select an ID range, but full-catalog behavior is mandatory.

Exit codes:

- `0`: all selected levels valid;
- `1`: one or more validation errors;
- `2`: tool/configuration/runtime failure.

Human output must include level ID, issue code, entity IDs, and cell/path context.

Machine output must be written to:

```text
reports/levels/validation.json
```

## Structured issue model

```ts
export type ValidationSeverity = "error" | "warning";

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: ValidationIssueCode;
  levelId: LevelId;
  message: string;
  entityIds: EntityId[];
  cells: Cell[];
  path: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}
```

Sort issues by level ID, severity, code, path, and entity IDs.

## Required error codes

```text
LEVEL_ID_INVALID
LEVEL_ID_DUPLICATE
LEVEL_PHASE_MISMATCH
BOARD_DIMENSION_INVALID
LIVES_INVALID
TIME_LIMIT_INVALID
ROTATE_CHARGES_INVALID
ENTITY_ID_DUPLICATE
ENTITY_TYPE_INVALID
GEOMETRY_NOT_INTEGER
FOOTPRINT_NON_POSITIVE
FOOTPRINT_OUT_OF_BOUNDS
PHYSICAL_FOOTPRINT_OVERLAP
SWITCH_PHYSICAL_OVERLAP
UNIT_DIRECTION_INVALID
UNIT_RUNTIME_STATE_INVALID
GATE_OPEN_INVALID
SWITCH_ACTIVATED_INVALID
SWITCH_TARGET_MISSING
SWITCH_TARGET_NOT_GATE
ASSET_KEY_EMPTY
CATALOG_SIZE_INVALID
CATALOG_ORDER_INVALID
MANIFEST_MISSING
MANIFEST_LEVEL_MISMATCH
```

## Physical overlap rules

Initial static footprints of live units, obstacles, and closed gates are mutually exclusive. Switch footprints must not overlap those physical footprints even though switches do not block forward movement at runtime.

Open gates in authored initial data are allowed only when a phase manifest explicitly justifies them; otherwise emit a warning or error according to the phase contract. The default catalog should start gates closed unless the lesson explicitly requires otherwise.

## Entity field rules

- Unit: direction required; open/targetId/activated forbidden.
- Obstacle: direction/escaped/open/targetId/activated forbidden.
- Gate: open required; direction/escaped/targetId/activated forbidden.
- Switch: targetId and activated required; direction/escaped/open forbidden.

If normalized runtime types make forbidden fields impossible at compile time, the validator still checks raw authoring input before normalization.

## Catalog validation

The full catalog must contain exactly 100 IDs in this order:

```text
level-001 ... level-100
```

Phase mapping is fixed:

- 001–020: phase 1
- 021–040: phase 2
- 041–060: phase 3
- 061–080: phase 4
- 081–100: phase 5

## Manifest validation

Every level must have an authoring manifest with:

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
  targetBand: DifficultyTargetBand;
  approvedExceptions: ApprovedMetricException[];
}
```

No target exception may be implicit. It requires a reason and affected metric.

## Required validator tests

- Level 5 overlap fixture reports exact cell and both unit IDs.
- Out-of-bounds horizontal and vertical multi-cell footprints.
- Duplicate level and entity IDs.
- Missing/incorrect switch target.
- Switch overlap with a physical entity.
- Illegal fields per entity type.
- Invalid phase and level ID order.
- Missing manifest.
- Valid gate/switch and multi-cell examples pass.

## Promotion gate

Generation may not write `levels.ts` when validation has any error. Warnings must appear in reports and may pass only if they are non-release-blocking by explicit code policy.
