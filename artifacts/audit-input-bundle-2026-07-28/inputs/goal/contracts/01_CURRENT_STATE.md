# Confirmed Current State

## Snapshot authority

The supplied Repomix contains 64 text files and represents the current local repository snapshot supplied by the user.

## Runtime path

```text
index.html
  -> src/main.tsx
  -> src/app/App.tsx
  -> src/features/tribe-out/TribeOutGame.tsx
```

## Rendering architecture

- React renders units, obstacles, gates, switches, HUD, controls, and overlays.
- PixiJS renders only the isometric board backdrop in `src/features/tribe-out/pixi/IsometricBoardBackdrop.tsx`.
- `src/features/tribe-out/isometric.ts` owns board projection and entity visual placement.
- The implementation must preserve this ownership split.

## Package scripts

Current confirmed scripts:

```text
npm run dev
npm run build
npm run typecheck
npm test
npm run test:watch
```

Current package type is ESM. Current level tools are mixed TypeScript and CommonJS.

## Current puzzle model

`src/features/tribe-out/types.ts` currently defines:

- `Direction`
- `EntityType`
- `TribeOutEntity`
- `TribeOutLevel`
- `GameState`
- `TribeOutProgressSnapshot`
- `TribeOutTapResult`

Current `TribeOutLevel.id` is numeric. Current state includes coins and reward accounting. Current progress uses numeric indexes.

## Current gameplay ownership

`src/features/tribe-out/gameLogic.ts` currently owns:

- `getOccupiedCells`
- `isInsideBoard`
- `buildOccupancyMap`
- `getForwardCellsUntilExit`
- `canExit`
- `getAvailableUnits`
- `buildInitialGameState`
- `buildNextLevelState`
- `resetLevel`
- `applyTapUnit`
- `applyRotateUnit`

It mixes pure puzzle rules with lives, stars, progress, coins, and reward behavior.

## Confirmed defects and design debt

### Interaction boundary defect

`TribeOutEntity.tsx` currently treats switches as interactive because `isInteractive` excludes only obstacle and gate. A switch receives `role="button"`, tab focus, click, and keyboard activation.

`applyTapUnit` rejects only obstacles and escaped entities before `canExit`. A switch can reach the blocked-tap path and lose a life.

`applyRotateUnit` always decrements a charge after mapping, even when `unitId` does not name a live unit. A non-unit or missing target can consume a charge.

### Economy without gameplay purpose

Coins are present in:

- `GameState` and `TribeOutProgressSnapshot`;
- `gameLogic.ts` reward math;
- `tribeOutStorage.ts`;
- `TribeOutGame.tsx` hints and persistence;
- `TribeOutHUD.tsx`;
- `TribeOutOverlay.tsx`;
- `screens/Dashboard.tsx`;
- tests, CSS, and the viewport audit.

The economy is being removed by this specification.

### Hint lifecycle defect

`TribeOutGame.tsx` creates the hint-clear timeout without retaining or clearing it on unmount, restart, or level transition. The new runtime contract must own this timer in a ref and clear it.

### Solver incompleteness

`scripts/solver.ts`:

- checks only level 22;
- performs greedy exits only;
- does not model rotate, switch, gate, validation, budgets, reports, or replay verification.

### Generator shallowness

`scripts/gen_levels.cjs`:

- places obstacles first;
- accepts only units whose own path is initially clear;
- probabilistically makes later units block earlier units;
- uses one broad algorithm for most of the catalog;
- does not generate gates/switches after the handcrafted tutorial;
- does not guarantee phase-specific difficulty targets.

### Invalid authored data

Level 5 in `scripts/handcrafted_levels.cjs` contains overlapping unit footprints.

### Current catalog shape

The snapshot contains:

- 100 levels;
- 5 handcrafted levels;
- 95 generated levels;
- 3,128 unit entries;
- 601 obstacle entries;
- 1 gate;
- 1 switch.

The high unit count and near absence of stateful mechanics confirm that later difficulty is primarily visual density rather than puzzle depth.

### Persistence debt

`tribeOutStorage.ts` uses separate localStorage keys:

- `tribeout_coins`
- `tribeout_highest_level`
- `tribeout_current_level`
- `tribeout_level_stars`

`clearTribeOutProgress` currently does not remove the stars key.

### Documentation drift

Older documents still describe 10 levels, coin behavior, no PixiJS, or earlier layout assumptions. Update or mark those claims obsolete after implementation.
