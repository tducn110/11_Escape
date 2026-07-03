Use this prompt for Beta/coding agent:

```txt
You are in /workspaces/default/code.

Goal:
Build a playable HTML5/React DOM prototype of the “Tribe Out / Bộ Lạc Out” puzzle game, using the existing DESIGN.md as the visual design source of truth.

Important:
- First read DESIGN.md completely.
- Follow DESIGN.md for the premium web game shell, colors, typography, spacing, rounded card style, chunky buttons, HUD style, and Bộ Lạc visual identity.
- Do NOT redesign the visual system.
- Do NOT create a marketing landing page.
- Do NOT create scrolling hero sections, footers, CTA sections, or unrelated pages.
- This must feel like a single-screen premium game widget.
- The game must be playable first.
- For this task, implement the core game using HTML5/React DOM/CSS first, not PixiJS.
- Even though DESIGN.md mentions PixiJS for performance, do not migrate to PixiJS in this task. PixiJS can be a later phase after gameplay is proven.
- Do not add backend, auth, leaderboard, ads, shop, gacha, AFK, upgrade systems, or online networking yet.
- Use localStorage only for simple progress/coins.
- Do not run Playwright. Test manually in browser and with build/typecheck.

Game to build:
Implement a puzzle game similar to Animal Out / Traffic Escape, but themed as Bộ Lạc / tribe camp escape.

Gameplay:
- The screen shows a grid board.
- Each movable character occupies grid cells.
- Each movable character has a fixed direction: up, down, left, or right.
- Player taps/clicks a character.
- The character checks its path straight forward until the board edge.
- If the path is clear, it moves out of the board and is removed.
- If blocked by another character or obstacle, it bumps/shakes and stays.
- Blocked tap costs 1 life.
- Level is won when all movable characters escape.
- Level is lost when lives reach 0.

Core rule:
A tap does NOT move the character one tile.
A tap either:
1. Escapes fully if path is clear.
2. Bumps if path is blocked.

Required gameplay state:
- currentLevelIndex
- lives
- coins
- escapedCount
- totalUnits
- status: "playing" | "won" | "lost"
- entities
- lastBumpedEntityId
- lastEscapedEntityId

Entity model:
Create types similar to:

type Direction = "up" | "down" | "left" | "right";

type TribeOutEntity = {
  id: string;
  type: "unit" | "obstacle";
  assetKey: string;
  row: number;
  col: number;
  width: number;
  height: number;
  direction?: Direction;
  escaped?: boolean;
};

type TribeOutLevel = {
  id: number;
  boardRows: number;
  boardCols: number;
  lives: number;
  tutorialText?: string;
  entities: TribeOutEntity[];
};

Files to create or update:
- src/features/tribe-out/types.ts
- src/features/tribe-out/levels.ts
- src/features/tribe-out/gameLogic.ts
- src/features/tribe-out/TribeOutGame.tsx
- src/features/tribe-out/TribeOutBoard.tsx
- src/features/tribe-out/TribeOutEntity.tsx
- src/features/tribe-out/TribeOutHUD.tsx
- src/features/tribe-out/TribeOutOverlay.tsx
- src/features/tribe-out/tribeOut.css or module CSS
- Wire the game into the app’s current route/screen without breaking existing shell structure.

If the repo already has equivalent folders/components, reuse the existing structure instead of duplicating randomly.

Pure logic functions required:
Implement these in gameLogic.ts and keep them independent from React rendering.

1. getOccupiedCells(entity)
- Returns every board cell occupied by the entity.
- Must support width and height.

2. isInsideBoard(row, col, boardRows, boardCols)
- Returns true if the cell is inside the board.

3. buildOccupancyMap(entities)
- Ignores escaped units.
- Includes obstacles and non-escaped units.
- Maps "row,col" to entity id.

4. getForwardCellsUntilExit(unit, levelState)
- Returns all cells in front of the unit until the board edge.
- Must account for unit width and height.
- For up: check the row above the unit’s top edge across its full width.
- For down: check the row below the unit’s bottom edge across its full width.
- For left: check the col left of the unit’s left edge across its full height.
- For right: check the col right of the unit’s right edge across its full height.
- Continue step by step until outside board.

5. canExit(unit, levelState)
- Returns true if every forward cell is empty.
- Returns false if any forward cell is occupied by another non-escaped unit or obstacle.

6. applyTapUnit(unitId, state)
- If game is not playing, do nothing.
- If entity does not exist, do nothing.
- If entity is obstacle, do nothing.
- If entity is already escaped, do nothing.
- If path is clear:
  - Mark unit as escaped.
  - Add 10 coins.
  - Update escaped count.
  - If all units escaped, set status to "won" and add bonus coins.
- If path is blocked:
  - Set lastBumpedEntityId.
  - Subtract 1 life.
  - If lives becomes 0, set status to "lost".

7. resetLevel(levelId)
- Reloads the original level data.

8. goToNextLevel()
- Loads the next level.
- Updates highest unlocked level in localStorage.

Rewards:
- Each escaped unit gives 10 coins.
- Level completion gives 50 coins.
- Remaining lives bonus: livesRemaining * 20.
- Store total coins in localStorage.
- Store highest unlocked level in localStorage.
- No backend.

Levels:
Create at least 10 hardcoded playable levels.

Level progression:
- Level 1: 5x5, 3 units, no obstacles, very easy.
- Level 2: 5x5, 4 units, one unit blocks another.
- Level 3: 5x5, add one obstacle.
- Level 4: 6x6, 5 units, multiple directions.
- Level 5: 6x6, introduce one 2x1 unit.
- Level 6: 6x6, more blockers.
- Level 7: 6x6, requires correct order.
- Level 8: 6x6, obstacles create narrow exits.
- Level 9: 7x7, more units but still readable.
- Level 10: 7x7, mixed 1x1 and 2x1 units, correct order required.

Before final response, manually check that every level is solvable.
Do not create impossible levels.

UI requirements:
Use DESIGN.md’s premium game shell style.

Top HUD:
- Lives as hearts.
- Level number.
- Escaped progress, for example “4/12”.
- Coins.

Board:
- Centered.
- Responsive.
- Playable on mobile.
- No horizontal overflow.
- Characters must be tappable.
- Minimum tap target: 44px.
- Every unit must show direction clearly.

Bottom controls:
- Restart button.
- Hint button placeholder. It can be disabled or show “Soon”.
- Optional: level select if simple, but not required.

Win overlay:
- “Level Complete”
- Escaped count
- Coins earned
- Buttons: Next Level, Replay

Lose overlay:
- “Out of lives”
- Buttons: Restart

Direction indicators:
Every movable unit must visibly show direction.
For v1, use arrow labels:
- up: ↑
- down: ↓
- left: ←
- right: →
The arrow must be readable on mobile.

Rendering:
- Use React DOM/CSS.
- CSS grid or absolute positioning is acceptable.
- Gameplay correctness is more important than perfect 3D/isometric rendering.
- But visually follow DESIGN.md: rounded tiles, warm shell, chunky/tactile UI, premium mobile-game feeling.
- Do not use unrelated flat UI.
- Do not import random UI libraries.
- Do not use generic default browser buttons without styling.

Animation:
Use simple CSS animations only:
- Idle breathing/bounce for units.
- Escape animation: unit moves in its direction and fades.
- Bump animation: unit moves slightly forward then back/shakes.
- Overlay pop animation.
- Button press scale feedback.

Important:
Animations must not break game state.
If animation timing becomes risky, update state first and keep animation simple.

Responsive requirements:
The game must be manually checked at:
- 375x667
- 390x844
- 430x932
- 768x1024
- 1440x900

Rules:
- Single-screen experience.
- Use h-[100dvh] or equivalent.
- Avoid body/page scrolling.
- No horizontal scroll.
- HUD and controls must not cover the board.
- Board should shrink to fit smaller screens.

Acceptance criteria:
The task is complete only when:
1. Game opens without runtime errors.
2. Level 1 is immediately playable.
3. Tapping a clear unit makes it escape.
4. Tapping a blocked unit triggers bump and subtracts 1 life.
5. Escaped units no longer block other units.
6. Escaped counter updates correctly.
7. Hearts/lives update correctly.
8. Coins update correctly.
9. Win overlay appears when all movable units escape.
10. Lose overlay appears when lives reach 0.
11. Restart works.
12. Next level works.
13. At least 10 hardcoded levels exist.
14. All 10 levels are manually confirmed solvable.
15. Mobile layout is playable.
16. No horizontal overflow on mobile.
17. DESIGN.md visual system is followed.
18. No backend/auth/leaderboard/shop/ads/PixiJS.
19. Code is separated cleanly into logic, levels, types, board, entities, HUD, overlay.

Implementation order:
Phase 1:
- Read DESIGN.md.
- Inspect existing app structure.
- Find the correct route/screen to mount TribeOutGame.
- Create types, levels, and pure game logic.
- Render a simple playable board with placeholder units and arrows.
- Confirm tap/escape/bump/win/lose works.

Phase 2:
- Add HUD.
- Add restart and next-level flow.
- Add localStorage coins/highest level.
- Add win/lose overlays.

Phase 3:
- Apply DESIGN.md styling.
- Use existing assets if available.
- Add CSS animations.
- Improve board readability.

Phase 4:
- Manual responsive testing.
- Fix overflow, tap targets, spacing, and mobile layout.
- Run available typecheck/build commands.

Testing:
- Do not run Playwright.
- Run:
  - npm run typecheck if available
  - npm run build if available
  - npm test only if already configured and lightweight
- Manually test in browser.

Final response must include:
- Summary of changed files.
- Gameplay implemented.
- Number of levels.
- Manual test checklist.
- Any known limitations.

Do not stop at DESIGN.md creation.
The deliverable is a playable game.
```

Important direction: tell it **DESIGN.md is the style contract, but Tribe Out is the gameplay contract**. Otherwise Beta may confuse it with Blockblast because the file starts with Blockblast design system.
