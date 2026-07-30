# File-by-File Implementation Specification

This document defines the required purpose, imports, exports, and changes for live files. Symbol names may be updated only when required by TypeScript conflicts; semantic contracts are fixed.

## `package.json`

### Purpose

Expose clean-checkout commands for runtime and level tooling.

### Required changes

- Add exact root dev dependency `tsx`.
- Add scripts:

```json
{
  "typecheck:app": "tsc -p tsconfig.json --noEmit",
  "typecheck:tools": "tsc -p tsconfig.tools.json --noEmit",
  "typecheck": "npm run typecheck:app && npm run typecheck:tools",
  "levels:validate": "tsx scripts/levels/cli/validate.ts",
  "levels:solve": "tsx scripts/levels/cli/solve.ts",
  "levels:report": "tsx scripts/levels/cli/report.ts",
  "levels:generate": "tsx scripts/levels/cli/generate.ts"
}
```

Preserve existing `dev`, `build`, `test`, and `test:watch` behavior.

### Lockfile

The snapshot contains no committed lockfile. Run `npm install --save-dev --save-exact tsx` and commit the generated `package-lock.json`. If the live repository already contains a committed lockfile, update that lockfile and do not create a competing package-manager lockfile.

## `tsconfig.tools.json` — create

### Purpose

Typecheck Node-based level tools independently from browser code.

### Contract

- Extend the root TypeScript configuration where safe.
- Include `scripts/levels/**/*.ts` and pure puzzle modules needed by tools.
- Use Node types.
- Do not include React JSX or browser-only feature files.
- Use `noEmit: true` for the quality gate.
- Resolve ESM imports consistently with the active Vite/TypeScript setup.

## `src/features/tribe-out/types.ts`

### Purpose

Expose runtime feature state and re-export shared puzzle types without duplicating puzzle rules.

### Required changes

- Remove `coins` and `coinsEarnedThisLevel` from `GameState`.
- Change numeric level identity/index persistence to stable `LevelId`.
- Remove economy fields from `TribeOutProgressSnapshot`.
- Use discriminated entity types from `puzzle/types.ts` or re-export them.
- Keep runtime-only state:

```ts
export interface GameState {
  currentLevelId: LevelId;
  lives: number;
  escapedCount: number;
  totalUnits: number;
  status: "playing" | "won" | "lost";
  puzzle: PuzzleState;
  lastBumpedEntityId: EntityId | null;
  lastEscapedEntityId: EntityId | null;
  timeRemaining: number;
  hintsUsed: number;
  stars: StarRating;
  selectedTool: "none" | "rotate";
}
```

`rotateCharges` must live inside `PuzzleState` as `rotateChargesRemaining`; do not duplicate it in runtime state.

### Progress type

```ts
export interface TribeOutProgressSnapshot {
  schemaVersion: number;
  levelSetVersion: number;
  unlockedLevelIds: LevelId[];
  currentLevelId: LevelId;
  starsByLevelId: Partial<Record<LevelId, StarRating>>;
}
```

## `src/features/tribe-out/puzzle/types.ts` — create

Own all types defined in `contracts/03_DOMAIN_CONTRACT.md`. No React or browser imports.

## `src/features/tribe-out/puzzle/geometry.ts` — create

Move and strengthen:

- `getOccupiedCells`
- `isInsideBoard`
- `getForwardCellsUntilExit`

Return deterministic cell ordering. Accept readonly inputs.

## `src/features/tribe-out/puzzle/occupancy.ts` — create

Move `buildOccupancyMap`. Use discriminated entity types. Export a stable cell-key helper if needed.

## `src/features/tribe-out/puzzle/selectors.ts` — create

Own target resolution, `canExitUnit`, legal action listing, and completion checks.

Do not import `LEVELS`; all functions receive level and state explicitly.

## `src/features/tribe-out/puzzle/engine.ts` — create

Own `createInitialPuzzleState` and `applyPuzzleAction`. It must implement atomic exit/switch/gate behavior and safe rotate behavior.

## `src/features/tribe-out/puzzle/serialization.ts` — create

Own canonical state keys used by solver and analyzer.

## `src/features/tribe-out/puzzle/index.ts` — create

Re-export only the supported domain API. CLI tools and runtime code import from this barrel or exact pure submodules; no circular dependency.

## `src/features/tribe-out/gameLogic.ts`

### Target purpose

Runtime adapter for lives, stars, status, level transition, and progress snapshots. It must not implement occupancy, path, switch, gate, or rotate rules.

### Required exports

```ts
buildInitialGameState(levelId: LevelId): GameState
buildNextLevelState(currentState: GameState, nextLevelId: LevelId): GameState
resetLevel(state: GameState): GameState
applyTapUnit(unitId: EntityId, state: GameState): TribeOutTapResult
applyRotateUnit(unitId: EntityId, state: GameState): GameState
calculateStars(stateBeforeWin: GameState, level: TribeOutLevel): StarRating
buildWinProgressSnapshot(
  progress: TribeOutProgressSnapshot,
  completedLevelId: LevelId,
  stars: StarRating,
): TribeOutProgressSnapshot
```

### `applyTapUnit` behavior

1. Return inert when runtime status is not `playing`.
2. Call `applyPuzzleAction` with `exit`.
3. For `BLOCKED_PATH`, decrement one life, set bump ID, and set `lost` only when life reaches zero.
4. For any other rejection, do not change life or state.
5. For accepted exit, update puzzle state and escaped count.
6. On first transition to complete, set status `won` and calculate stars exactly once.
7. Return a progress snapshot only on the win transition.
8. No coin or reward behavior.

### `applyRotateUnit` behavior

Call domain `rotate`. Only accepted transitions update puzzle state and clear selected tool. Invalid targets and zero charges are inert.

## `src/features/tribe-out/levels.ts`

### Target purpose

Generated, normalized runtime catalog.

### Contract

```ts
export const LEVEL_SET_VERSION = 2;
export const LEVELS: readonly TribeOutLevel[] = [...];
export const LEVEL_BY_ID: ReadonlyMap<LevelId, TribeOutLevel>;
export const LEVEL_INDEX_BY_ID: ReadonlyMap<LevelId, number>;
```

- Exactly 100 levels.
- IDs `level-001` through `level-100` in order.
- Do not hand-edit after generator creation.
- Do not include authoring-only metrics or generator diagnostics in runtime data.

## `src/features/tribe-out/TribeOutGame.tsx`

### Target purpose

Own active attempt lifecycle and connect runtime UI to the domain adapter.

### Required changes

- Initialize from `progress.currentLevelId`, resolved through `LEVEL_BY_ID`.
- Remove all coin loading, mutation, persistence, hint pricing, and coin props.
- Use `gameState.puzzle.rotateChargesRemaining` for rotate UI.
- Make hints free.
- Hint selection must use a deterministic legal exit or solver-derived recommendation; do not use `Math.random`.
- Retain `hintsUsed` increment because stars depend on no-hint completion.
- Add `hintTimerRef`; clear it on unmount, restart, next level, and before scheduling a new hint clear.
- Keep `bumpTimerRef` cleanup.
- Persist progress only when a win updates stars/unlocks or when current level changes.
- Unlock the next catalog level on win.
- `Next` on level 100 may wrap to level 1 only if the existing product behavior is retained; it must not relock progress.
- Do not create state updates after unmount.
- Preserve visibility-paused timer behavior and timer-not-loss behavior.

## `src/features/tribe-out/TribeOutEntity.tsx`

### Required interaction contract

Only `entity.type === "unit" && !entity.escaped` is interactive.

For obstacles, gates, and switches:

- no `onClick`;
- no keyboard activation;
- `role="img"` or presentation semantics appropriate to the existing visual contract;
- `tabIndex={-1}`;
- default cursor;
- no puzzle-action dispatch.

Update `getEntityAriaLabel` so gates and switches are not mislabeled as characters.

Preserve escape/bump animation cleanup and reset behavior. Respect reduced motion through existing CSS or explicit behavior.

## `src/features/tribe-out/TribeOutBoard.tsx`

Continue to render React entities over `IsometricBoardBackdrop`. Pass activation only to units through the entity component. Do not move puzzle rules into the board.

## `src/features/tribe-out/TribeOutHUD.tsx`

- Remove `Coins` import.
- Remove `coins` prop.
- Remove coin metric.
- Keep lives, timer, and escaped progress.
- Update aria summary accordingly.

## `src/features/tribe-out/TribeOutOverlay.tsx`

- Remove `coinsEarned` prop and `.tribe-overlay-coins` content.
- Keep star display, escaped count, next/replay actions, and dialog semantics.
- Timer remains a star condition, not a loss reason. If no runtime path can produce `reason="time"`, remove that branch and simplify `LoseOverlay` to lives-only.

## `src/features/tribe-out/screens/Dashboard.tsx`

- Remove `Coins` import and asset/economy section.
- Display progress-only information:
  - highest unlocked catalog position;
  - completed-level count from stars greater than zero;
  - total stars earned out of 300.
- Resolve IDs through catalog maps rather than numeric persisted indexes.
- Preserve the existing screen container and back action.

## `src/features/tribe-out/screens/Settings.tsx`

No gameplay redesign. Ensure clear-progress behavior, if present elsewhere, uses the new storage API. Preserve music/SFX controls.

## `src/features/tribe-out/tribeOutStorage.ts`

Replace separate keys with one canonical key:

```text
tribeout_progress
```

Export:

```ts
loadTribeOutProgress(catalog: readonly TribeOutLevel[]): TribeOutProgressSnapshot
persistTribeOutProgress(progress: TribeOutProgressSnapshot): void
clearTribeOutProgress(): void
migrateLegacyProgress(storage: StorageLike, catalog: readonly TribeOutLevel[]): TribeOutProgressSnapshot
sanitizeProgress(value: unknown, catalog: readonly TribeOutLevel[]): TribeOutProgressSnapshot
```

A small `StorageLike` interface may be introduced for tests.

Remove all legacy keys after canonical persistence succeeds. `clearTribeOutProgress` removes canonical and all legacy keys, including stars and coins.

## `src/app/App.tsx`

Continue to load progress for Dashboard refresh. Update types and storage calls. Do not add routing or economy state.

## `src/features/tribe-out/tribeOut.css`

Remove economy-only selectors such as `.tribe-overlay-coins` and any now-unused coin layout. Preserve gameplay layout, no-scroll behavior, responsive board, animation, accessibility focus, and reduced-motion rules.

## `scripts/task8-viewport-audit.mjs`

- Remove `tribeout_coins` assumptions.
- Clear the canonical progress key and all legacy progress keys before audits.
- Keep viewport matrix and win/replay/next checks.
- Update stale board selectors/labels only when required by live DOM.
- Add a check that switches/gates/obstacles are not included in unit button count.

## Old tool files

After the TypeScript replacements are validated and all imports/scripts are updated, delete:

```text
scripts/solver.ts
scripts/gen_levels.cjs
scripts/handcrafted_levels.cjs
```

Do not leave two authoritative generator or solver implementations.
