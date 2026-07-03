# 11_Escape Production Stabilization Plan

## Objective

Ship the existing `Tribe Out / Escape` React DOM game export to a stable production baseline without rebuilding the game or changing its core visual direction.

## Runtime Truth

Current runtime path:

```txt
index.html
-> src/main.tsx
-> src/app/App.tsx
-> src/features/tribe-out/TribeOutGame.tsx
```

Current repo facts:

- `src/features/tribe-out/*` is the real runtime game feature.
- `src/app/components/ui/*` is generated scaffold and not runtime-reachable today.
- `src/app/components/figma/ImageWithFallback.tsx` is scaffold-only today.
- `src/imports/pasted_text/*` is reference material, not runtime.
- `DESIGN.md` remains the visual source of truth.
- There is no active router.
- `gameLogic.ts` currently mixes pure logic with `localStorage`.
- Responsive sizing currently reads `window.innerWidth` directly in render.
- Accessibility and keyboard support are incomplete.

## Non-Goals

- No backend or online state.
- No auth, leaderboard, shop, ads, gacha, AFK, or analytics.
- No PixiJS in v1.
- No broad design rewrite.

## Required Working Rules

1. Update docs first, then implement.
2. Maintain `TASK.md` as the active task ledger.
3. Every finished task must end with:
   - validation result,
   - `TASK.md` update,
   - git checkpoint commit.
4. Keep patches small and scoped.
5. Do not delete scaffold and remove dependencies in the same task.
6. Preserve gameplay behavior while extracting structure.
7. Use codegraph after initialization for faster repo queries.

## Task Phases

### Task 1: Planning Docs And Codegraph

Goal:

- Create `PLAN.md`.
- Create `TASK.md`.
- Initialize codegraph for this repo.

Validation:

- `test -f PLAN.md`
- `test -f TASK.md`
- `codegraph` initialized successfully

Checkpoint:

- `checkpoint: planning docs and codegraph initialized`

### Task 2: Reliability Baseline

Goal:

- Rename package identity from Figma boilerplate to `11-escape`.
- Move `react` and `react-dom` into runtime dependencies.
- Add TypeScript and Vitest baseline.
- Add scripts for `typecheck`, `test`, and `test:watch`.
- Add config files required for typecheck and tests.
- Update `README.md` and `index.html` identity text.

Validation:

- `npm run build`
- `npm run typecheck`
- `npm test`

Checkpoint:

- `checkpoint: project validation baseline`

### Task 3: Gameplay Logic Extraction And Tests

Goal:

- Keep board rules pure in `gameLogic.ts`.
- Move storage concerns into `tribeOutStorage.ts`.
- Add focused unit tests for occupancy, exit rules, tap outcome, coin math, and level solvability expectations.

Validation:

- `npm run typecheck`
- `npm test`

Checkpoint:

- `checkpoint: gameplay logic tests stable`

### Task 4: Responsive Shell Hardening

Goal:

- Remove direct viewport reads during render.
- Add measured sizing ownership for board and shell.
- Keep the single-screen mobile-first game shell stable.
- Prevent horizontal overflow.

Validation:

- `npm run build`
- `npm run typecheck`

Checkpoint:

- `checkpoint: responsive shell fixed`

### Task 5: Accessibility And Input

Goal:

- Add keyboard activation for tappable units.
- Improve `aria-label`, button semantics, and overlay dialog semantics.
- Ensure disabled hint button is explicitly inert.

Validation:

- `npm run build`
- `npm run typecheck`
- `npm test`

Checkpoint:

- `checkpoint: accessibility and input stable`

### Task 6: Scaffold Cleanup

Goal:

- Remove unused scaffold files from runtime repo.
- Remove unused scaffold dependencies only after file cleanup is validated.
- Keep `DESIGN.md` and active feature files.

Validation:

- `npm run build`
- `npm run typecheck`
- `npm test`

Checkpoint:

- `checkpoint: generated scaffold cleanup`

### Task 7: Final Production Verification

Goal:

- Re-run final build, typecheck, and tests.
- Confirm docs reflect final structure.
- Leave repo at a final production checkpoint.

Validation:

- `npm run build`
- `npm run typecheck`
- `npm test`

Checkpoint:

- `checkpoint: final production cleanup`

## Acceptance Criteria

Gameplay:

- Level 1 starts playable.
- All 10 levels remain solvable.
- Clear path tap escapes a unit.
- Blocked tap consumes one life.
- Escaped units do not block later exits.
- Win, lose, restart, and next level flows work.
- Coin math persists correctly.

UI:

- Single-screen shell remains intact.
- HUD, board, controls, and overlays remain readable.
- No landing page or extra scaffold UI leaks into runtime.

Responsive:

- No horizontal overflow.
- Board remains centered.
- Controls stay reachable on mobile.
- Tap targets remain at least 44px.

Code:

- Runtime logic is separated from persistence.
- Runtime files are clearly owned.
- Generated scaffold no longer pollutes production runtime.
- Build, typecheck, and tests pass.

