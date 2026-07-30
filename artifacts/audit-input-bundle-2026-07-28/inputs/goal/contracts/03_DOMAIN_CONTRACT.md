# Pure Puzzle Domain Contract

## Purpose

The domain module is the single source of truth for deterministic puzzle behavior. It must be usable by React runtime code and Node CLI code without environment adapters.

## Core identifiers

```ts
export type LevelId = `level-${string}`;
export type EntityId = string;
export type Direction = "up" | "right" | "down" | "left";
export type DifficultyPhase = 1 | 2 | 3 | 4 | 5;
export type StarRating = 0 | 1 | 2 | 3;
```

Runtime validation must enforce the level ID pattern:

```regex
^level-(00[1-9]|0[1-9][0-9]|100)$
```

## Entity model

Use a discriminated union. Do not retain optional fields that are meaningless for an entity type.

```ts
export interface EntityFootprint {
  row: number;
  col: number;
  width: number;
  height: number;
}

export interface UnitEntity extends EntityFootprint {
  id: EntityId;
  type: "unit";
  assetKey: string;
  direction: Direction;
  escaped: boolean;
}

export interface ObstacleEntity extends EntityFootprint {
  id: EntityId;
  type: "obstacle";
  assetKey: string;
}

export interface GateEntity extends EntityFootprint {
  id: EntityId;
  type: "gate";
  assetKey: string;
  open: boolean;
}

export interface SwitchEntity extends EntityFootprint {
  id: EntityId;
  type: "switch";
  assetKey: string;
  targetId: EntityId;
  activated: boolean;
}

export type PuzzleEntity = UnitEntity | ObstacleEntity | GateEntity | SwitchEntity;
```

Authoring data may omit runtime-resettable fields only if a normalization function adds them deterministically. The runtime catalog itself must expose a normalized complete shape.

## Level model

```ts
export interface TribeOutLevel {
  id: LevelId;
  phase: DifficultyPhase;
  boardRows: number;
  boardCols: number;
  lives: number;
  timeLimit: number;
  rotateCharges: number;
  tutorialText?: string;
  entities: PuzzleEntity[];
}
```

Rules:

- Catalog order defines progression order.
- The catalog contains exactly 100 levels.
- `id` is stable and unique.
- `phase` must match the level's catalog range.
- `rotateCharges` is explicit for every level; no implicit default remains after migration.

## Puzzle state

```ts
export interface PuzzleState {
  entities: PuzzleEntity[];
  rotateChargesRemaining: number;
}
```

Do not include lives, timer, stars, selected UI tool, animation IDs, audio, persistence, or screen state.

## Puzzle actions

```ts
export type PuzzleAction =
  | { type: "exit"; unitId: EntityId }
  | { type: "rotate"; unitId: EntityId };
```

## Rejection reasons

```ts
export type PuzzleRejectionReason =
  | "TARGET_NOT_FOUND"
  | "TARGET_NOT_LIVE_UNIT"
  | "BLOCKED_PATH"
  | "NO_ROTATE_CHARGES"
  | "PUZZLE_ALREADY_COMPLETE";
```

`BLOCKED_PATH` is the only rejection that runtime translates into a life loss and bump. All other rejections are inert.

## Transition result

```ts
export interface PuzzleTransitionResult {
  accepted: boolean;
  action: PuzzleAction;
  nextState: PuzzleState;
  rejectionReason?: PuzzleRejectionReason;
  escapedUnitId: EntityId | null;
  activatedSwitchIds: EntityId[];
  openedGateIds: EntityId[];
  rotateChargesConsumed: number;
  completed: boolean;
}
```

Contract:

- `nextState` is immutable relative to the input.
- Rejected actions must not mutate any input object.
- Rejected actions return an equivalent state with zero side-effect arrays and zero consumed charges.
- Output ID arrays are stable-sorted.
- Successful exit, switch activation, and gate opening happen in one atomic transition.

## Required exports

### `geometry.ts`

```ts
getOccupiedCells(entity: EntityFootprint): Cell[]
isInsideBoard(cell: Cell, boardRows: number, boardCols: number): boolean
getForwardCellsUntilExit(unit: UnitEntity, boardRows: number, boardCols: number): Cell[]
```

`getForwardCellsUntilExit` returns all cells beyond the unit's full leading edge, ordered from nearest to farthest, with deterministic secondary ordering.

### `occupancy.ts`

```ts
buildOccupancyMap(entities: readonly PuzzleEntity[]): ReadonlyMap<string, EntityId>
```

Occupancy rules:

- live units occupy all footprint cells;
- escaped units do not occupy cells;
- obstacles occupy cells;
- closed gates occupy cells;
- open gates do not occupy cells;
- switches never occupy blocking cells.

Static validation still forbids a switch footprint from overlapping a physical entity in initial level data.

### `selectors.ts`

```ts
findLiveUnit(state: PuzzleState, unitId: EntityId): UnitEntity | null
canExitUnit(level: TribeOutLevel, state: PuzzleState, unitId: EntityId): boolean
listLegalExitActions(level: TribeOutLevel, state: PuzzleState): PuzzleAction[]
listLegalRotateActions(level: TribeOutLevel, state: PuzzleState): PuzzleAction[]
listLegalPuzzleActions(level: TribeOutLevel, state: PuzzleState): PuzzleAction[]
isPuzzleComplete(state: PuzzleState): boolean
```

All action lists are sorted by `unitId`.

### `engine.ts`

```ts
createInitialPuzzleState(level: TribeOutLevel): PuzzleState
applyPuzzleAction(
  level: TribeOutLevel,
  state: PuzzleState,
  action: PuzzleAction,
): PuzzleTransitionResult
```

### `serialization.ts`

```ts
serializePuzzleState(level: TribeOutLevel, state: PuzzleState): string
```

Canonical key fields:

1. escaped status in catalog entity order;
2. current direction for live units in catalog entity order;
3. gate-open status in catalog entity order;
4. switch-activated status in catalog entity order;
5. rotate charges remaining.

The key must not include transient object identity, asset keys, UI state, timer, lives, stars, or array insertion side effects.

## Exit transition

For `{ type: "exit", unitId }`:

1. Reject if the puzzle is complete.
2. Resolve a live unit. Reject missing, non-unit, or escaped targets with `TARGET_NOT_LIVE_UNIT` or `TARGET_NOT_FOUND`.
3. Compute occupancy and the complete forward path.
4. Reject blocked path with `BLOCKED_PATH`.
5. Build the traversed cells as unit footprint plus forward cells.
6. Mark the unit escaped.
7. Activate every inactive switch whose footprint intersects traversed cells.
8. Open every existing target gate referenced by newly activated switches.
9. Return the new state atomically.
10. Set `completed` from the new state.

A successful exit can never close a gate, reactivate a switch, rotate a unit, add a blocker, or consume a rotate charge.

## Rotate transition

For `{ type: "rotate", unitId }`:

1. Reject complete puzzle.
2. Resolve a live unit.
3. Reject non-live targets without consuming a charge.
4. Reject zero charges with `NO_ROTATE_CHARGES`.
5. Rotate clockwise:

```text
up -> right -> down -> left -> up
```

6. Consume exactly one charge.
7. Do not move the unit, activate switches, open gates, escape a unit, or change another entity.

## Commutativity property

Under v1 rules, successful exit actions are monotonic:

- they remove occupancy;
- they may open gates;
- they never add occupancy or close gates.

If two exit actions are both legal in the same state, applying them in either order must produce the same canonical state after both actions. This property is required by the solver's exit-closure reduction and must have direct regression tests.
