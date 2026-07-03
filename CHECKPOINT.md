# 11_Escape Checkpoint

## Purpose

This document captures what must stay clear before any future work continues on `11_Escape / Tribe Out`.

The project is no longer a raw Figma Make export. It is now a stabilized React DOM game with a locked single-screen shell, tested gameplay rules, shared game UI primitives, and cleaned production dependencies.

Use this file before adding assets, audio, animation, new levels, economy features, or any larger refactor.

## 1. Layers

The codebase should keep these ownership layers separate.

### App Layer

Files:

- `src/main.tsx`
- `src/app/App.tsx`
- `src/styles/globals.css`
- `src/styles/index.css`

Purpose:

- Boot React.
- Render the fixed single-screen viewport.
- Own the countryside background.
- Lock `html`, `body`, and `#root` so the page cannot scroll vertically or horizontally.
- Keep the app at `100dvh` with safe-area padding handled inside the locked viewport.

Rules:

- Do not put gameplay rules here.
- Do not add routing unless the game actually needs multiple screens.
- Do not change the app into a landing page.
- Do not let the page scroll to solve layout problems.

### Shared Game UI Layer

Files:

- `src/components/game/GameShell.tsx`
- `src/components/game/GameButton.tsx`
- `src/components/game/HudStat.tsx`
- `src/components/game/GameOverlayFrame.tsx`
- `src/components/game/useMeasuredElementSize.ts`

Purpose:

- Provide generic game-screen structure.
- Provide reusable button, HUD stat, overlay frame, and measured-area sizing patterns.
- Keep the shell reusable for future small games without importing Tribe Out-specific logic.

Rules:

- Shared components must not import `src/features/tribe-out/*`.
- Shared components should stay small and behavior-light.
- Do not add abstractions here unless at least two places need the same structure.

### Tribe Out Feature Layer

Files:

- `src/features/tribe-out/TribeOutGame.tsx`
- `src/features/tribe-out/TribeOutBoard.tsx`
- `src/features/tribe-out/TribeOutEntity.tsx`
- `src/features/tribe-out/TribeOutHUD.tsx`
- `src/features/tribe-out/TribeOutOverlay.tsx`
- `src/features/tribe-out/AnimalSprite.tsx`
- `src/features/tribe-out/tribeOut.css`

Purpose:

- Render the actual game.
- Own Tribe Out-specific board, entity, HUD, overlay, and visual styling.
- Connect shared shell components to game state.
- Keep controls, board, HUD, and overlays visible inside one viewport.

Rules:

- Keep Tribe Out-specific UI here.
- Keep board rendering as React DOM for v1.
- Do not add PixiJS unless DOM performance becomes a real bottleneck.
- Do not hide overflow in a way that makes board pieces or controls inaccessible.

### Gameplay Logic Layer

Files:

- `src/features/tribe-out/gameLogic.ts`
- `src/features/tribe-out/levels.ts`
- `src/features/tribe-out/types.ts`
- `src/features/tribe-out/gameLogic.test.ts`

Purpose:

- Own pure board rules.
- Own level data.
- Own state transition behavior.
- Keep tests for core gameplay expectations.

Rules:

- `gameLogic.ts` should stay pure and testable.
- Do not call `localStorage`, browser APIs, audio, animation APIs, or DOM APIs inside pure logic.
- Every level must remain solvable.
- Every rule change should get a focused unit test.

### Persistence Layer

Files:

- `src/features/tribe-out/tribeOutStorage.ts`

Purpose:

- Own browser storage for simple progress.
- Keep persistence outside pure gameplay logic.

Rules:

- Store only simple local progress in v1.
- No backend, auth, leaderboard, shop, ads, gacha, or online economy.

## 2. Components

### Current Shared Components

`GameShell`

- Provides the fixed game card structure.
- Contains header, optional notice, board area, and controls.
- The board area is the flexible region and is measured for sizing.

`GameButton`

- Provides reusable game button styling.
- Supports `primary` and `ghost` variants.
- Keeps a minimum usable target size.

`HudStat`

- Provides reusable HUD stat structure.
- Used for level, lives, escape progress, and coins.

`GameOverlayFrame`

- Provides reusable overlay card structure.
- Used by win and lose overlays.

`useMeasuredElementSize`

- Measures actual available space with `ResizeObserver`, `visualViewport`, and scheduled resize retries.
- Prevents board sizing from depending on guessed viewport constants.

### Current Tribe Out Components

`TribeOutGame`

- Owns the active game state.
- Loads saved coins.
- Applies taps through pure logic.
- Persists win progress.
- Computes board cell size from the measured board area.

`TribeOutBoard`

- Renders the square grass grid and entity layer.
- Receives `cellSize` from the measured shell layout.

`TribeOutEntity`

- Renders units and obstacles.
- Handles click and keyboard activation.
- Owns entity escape and bump animations.

`TribeOutHUD`

- Displays lives, level, escaped count, and coins.
- Uses shared `HudStat`.

`TribeOutOverlay`

- Displays win and lose dialogs.
- Uses shared `GameOverlayFrame` and `GameButton`.

`AnimalSprite`

- Provides the current SVG fallback character visuals.
- Should remain available even if raster assets are added later.

## 3. Levels

The current game has 10 levels in `src/features/tribe-out/levels.ts`.

Current level model:

- `id`
- `boardRows`
- `boardCols`
- `lives`
- optional `tutorialText`
- `entities`

Current entity model:

- `unit` or `obstacle`
- `row` and `col`
- `width` and `height`
- optional `direction`
- optional `escaped`

Current gameplay rules:

- Tapping a unit with a clear path makes it escape.
- Tapping a blocked unit costs one life.
- Escaped units no longer block other units.
- Obstacles always block.
- The level is won when every unit has escaped.
- The level is lost when lives reach zero.
- Restart resets the current level but keeps total coins.
- Next level loads the next level and keeps total coins.

Level safety requirements:

- Keep all 10 levels solvable.
- Preserve or update the solution comments when a level changes.
- Add tests for any new entity size or movement rule.
- Keep board sizes mobile-friendly.
- Do not add level mechanics that require scrolling.

## 4. Current UI

Current UI state:

- The game is a single-screen countryside puzzle shell.
- The app viewport is fixed and non-scrolling.
- HUD is visible at the top.
- Board stays centered in the flexible board area.
- Controls stay visible at the bottom.
- Win and lose overlays fit inside the board area.
- Units support click, touch, and keyboard activation.
- Direction arrows remain visible on the units.

Responsive checkpoints already verified:

- `375x667`
- `390x844`
- `430x932`
- `768x1024`
- `1440x900`

For each viewport, the latest Task 8 audit confirmed:

- no vertical scroll
- no horizontal scroll
- board visible
- HUD visible
- controls visible
- overlay fits
- units tappable
- arrows readable

UI rules for future work:

- Do not solve layout by allowing page scroll.
- Do not add a footer, landing screen, or dashboard unless explicitly required.
- Do not add UI cards inside cards.
- Keep the shell compact and playable.
- If adding icons, prefer a real icon library only after dependency impact is justified.
- If adding assets, keep the SVG fallback path.

## 5. Whole System State

Current production state:

- Git is initialized.
- The active branch is `stabilize-tribe-out`.
- Raw export, stabilization, cleanup, and Task 8 work have checkpoint commits.
- `PLAN.md` documents the workflow.
- `TASK.md` documents task completion and validation.
- `docs/audit/PREVIOUS_SCREEN_REUSE_AUDIT.md` documents previous-project reuse decisions.
- `scripts/task8-viewport-audit.mjs` verifies viewport behavior through Chrome DevTools Protocol.
- `codegraph` is initialized for fast code queries.

Current validation commands:

```bash
npm run build
npm run typecheck
npm test
node scripts/task8-viewport-audit.mjs
```

Current acceptance:

- Build passes.
- Typecheck passes.
- Unit tests pass.
- Viewport audit passes.
- Level 1 can be won.
- Replay works.
- Next level advances to level 2.
- Generated scaffold has been removed from runtime.

Current non-goals:

- No PixiJS.
- No audio.
- No raster asset integration.
- No backend.
- No auth.
- No leaderboard.
- No shop.
- No ads.
- No gacha or AFK systems.

Recommended future order:

1. Add real assets only if files exist and map them through a central asset file.
2. Add audio after the shell and gameplay remain stable.
3. Add animation polish only after state transitions remain test-covered.
4. Add new levels only with tests and solution notes.
5. Consider PixiJS only if DOM rendering becomes a measured performance problem.

## 6. Coins

Current coin behavior:

- Coins are a local reward counter.
- Each escaped unit adds coins.
- Winning a level adds bonus coins based on remaining lives.
- Coins persist in `localStorage`.
- Coins are loaded when the game starts.
- Coins are carried through restart and next-level flows.

Current coin purpose:

- Coins give the player a visible sense of progress.
- Coins reward efficient play because the win bonus includes remaining lives.
- Coins make level completion feel meaningful even without a shop or leaderboard.

Current coin effect:

- Coins currently do not unlock gameplay.
- Coins currently do not buy hints.
- Coins currently do not buy skins.
- Coins currently do not affect difficulty.
- Coins currently do not sync online.

Rules before expanding coins:

- Do not turn coins into a spendable economy until the economy is designed.
- Do not add a shop just because coins exist.
- Do not make hints cost coins until hint logic exists.
- Do not add paid upgrades, gacha, ads, or leaderboard coupling.
- If coins gain new effects, define the exact effect in docs first and add tests for the state transition.

Possible future coin uses:

- Cosmetic unlocks.
- Optional hint usage.
- Level-pack progress markers.
- Local achievement milestones.

These are not implemented yet.

