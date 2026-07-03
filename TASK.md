# 11_Escape Task Ledger

## Status Legend

- `[ ]` pending
- `[-]` in progress
- `[x]` complete

## Active Sequence

1. `[x]` Task 1: planning docs and codegraph initialization
2. `[x]` Task 2: project validation baseline
3. `[x]` Task 3: gameplay logic extraction and tests
4. `[x]` Task 4: responsive shell hardening
5. `[x]` Task 5: accessibility and input
6. `[x]` Task 6: scaffold cleanup
7. `[x]` Task 7: final production verification
8. `[x]` Task 8: single-screen lock and previous screen reuse audit

## Task Records

### Task 1

- Scope: create persistent `PLAN.md` and `TASK.md`, initialize codegraph, commit checkpoint.
- Files expected: `PLAN.md`, `TASK.md`, codegraph metadata.
- Validation:
  - `PLAN.md` created
  - `TASK.md` created
  - `codegraph init -i` completed
  - `.gitignore` added for local/generated artifacts
- Checkpoint:
  - `checkpoint: planning docs and codegraph initialized`

### Task 2

- Scope: package identity, runtime deps, TS/Vitest baseline, scripts, README/title.
- Validation:
  - `npm install`
  - `npm run build`
  - `npm run typecheck`
  - `npm test`
- Checkpoint:
  - `checkpoint: project validation baseline`

### Task 3

- Scope: storage extraction from `gameLogic.ts`, focused game logic tests.
- Validation:
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Checkpoint:
  - `checkpoint: gameplay logic tests stable`

### Task 4

- Scope: responsive measurement and shell sizing stability.
- Validation:
  - `npm run build`
  - `npm run typecheck`
  - `npm test`
- Checkpoint:
  - `checkpoint: responsive shell and accessibility stable`

### Task 5

- Scope: keyboard/touch/click accessibility and overlay semantics.
- Validation:
  - `npm run build`
  - `npm run typecheck`
  - `npm test`
- Checkpoint:
  - `checkpoint: responsive shell and accessibility stable`

### Task 6

- Scope: scaffold file cleanup and dependency cleanup in a validated phase.
- Validation:
  - `npm install`
  - `npm run build`
  - `npm run typecheck`
  - `npm test`
- Checkpoint:
  - `checkpoint: generated scaffold cleanup`

### Task 7

- Scope: final verification pass and production checkpoint.
- Validation:
  - `git status --short`
  - `npm run build`
  - `npm run typecheck`
  - `npm test`
  - `codegraph` reindexed after cleanup
- Checkpoint:
  - `checkpoint: final production cleanup`

### Task 8

- Scope: remove vertical drag/scroll, lock the game to one viewport, audit previous game repos, and port only useful shared screen patterns.
- Validation:
  - `npm run build`
  - `npm run typecheck`
  - `npm test`
  - `node scripts/task8-viewport-audit.mjs`
- Manual viewport matrix:
  - `375x667`: no vertical scroll, no horizontal scroll, board visible, HUD visible, controls visible, overlay fits, units tappable, arrows readable
  - `390x844`: no vertical scroll, no horizontal scroll, board visible, HUD visible, controls visible, overlay fits, units tappable, arrows readable
  - `430x932`: no vertical scroll, no horizontal scroll, board visible, HUD visible, controls visible, overlay fits, units tappable, arrows readable
  - `768x1024`: no vertical scroll, no horizontal scroll, board visible, HUD visible, controls visible, overlay fits, units tappable, arrows readable
  - `1440x900`: no vertical scroll, no horizontal scroll, board visible, HUD visible, controls visible, overlay fits, units tappable, arrows readable
- Reused components and patterns:
  - `src/components/game/GameButton.tsx`: adapted from `01_FruitSlashing` `GameButton` pattern
  - `src/components/game/GameOverlayFrame.tsx`: adapted from `01_FruitSlashing` `PanelFrame` visual framing, without side-panel behavior
  - `src/components/game/useMeasuredElementSize.ts`: adapted from `09_blockblast` measured viewport pattern
  - single-screen viewport lock in `src/app/App.tsx` and `src/styles/globals.css`: adapted from `02_2048` shell pattern
  - `src/components/game/GameShell.tsx` and `src/components/game/HudStat.tsx`: extracted locally after the reuse audit to keep Tribe Out on a shared game-shell structure
- Intentionally not reused:
  - `01_FruitSlashing` `SettingsPanel` and `DashboardPanel`: wrong interaction model for a single-screen puzzle shell
  - `01_FruitSlashing` `CountdownOverlay`, `GameOverOverlay`, `FloatingTextLayer`: solves different gameplay feedback needs
  - `02_2048` dashboard/settings screens: not needed for current Tribe Out flow
  - `08_pikachu` audio hooks and `_unused` UI: out of scope for Task 8 or stale scaffold
- Checkpoint:
  - `checkpoint: single-screen lock and screen reuse audit`
