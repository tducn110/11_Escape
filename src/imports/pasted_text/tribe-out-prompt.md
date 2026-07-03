Below is a **full copy-paste prompt** for the coding agent. It focuses on **gameplay first**, uses **HTML5/React DOM first**, obeys existing `design.md`, and avoids getting stuck on Pixi/complex effects too early.

```txt
You are implementing a playable HTML5 puzzle game prototype called “Tribe Out / Bo Lac Out”.

Important context:
- This project already has a design.md. You MUST follow design.md for visual direction, colors, typography, spacing, component vibe, and overall UI style.
- Do NOT redesign the art direction.
- Do NOT introduce PixiJS yet.
- Do NOT build a backend yet.
- Do NOT add leaderboard, shop, login, ads, AFK, gacha, or upgrade systems yet.
- First goal: make a complete playable game loop using HTML5/React DOM/CSS.
- The game must work on desktop and mobile viewport.
- The code must be simple enough for a small model / junior agent to continue.

Game concept:
Create a grid-based escape puzzle similar to Animal Out / Traffic Escape, but themed as a tribe camp puzzle.

The player sees a board made of tiles. Each character or object occupies one or more grid cells. Each movable character has one fixed facing direction: up, down, left, or right.

When the player taps/clicks a character:
1. The game checks every tile in front of that character in its facing direction until the board edge.
2. If the path is clear, the character moves straight out of the board and is removed from the level.
3. If the path is blocked by another character or obstacle, the character does a bump animation and stays in place.
4. A blocked move costs 1 life.
5. The level is won when all required movable characters have escaped.
6. The level is lost when lives reach 0.

Core gameplay loop:
- Start level.
- Player studies directions.
- Player taps a movable unit.
- Unit either escapes or bumps.
- Escaped counter updates.
- Lives update if blocked.
- Win when escaped count reaches target.
- Lose when lives reach 0.
- Player can restart level or continue to next level after win.

Required UI:
Top bar:
- Left: lives as hearts, default 3 hearts.
- Center: Level number.
- Right: escaped progress, for example “4/12”.

Board:
- Centered on screen.
- Responsive.
- Must not overflow mobile viewport.
- Board must remain playable at 375px mobile width.
- Characters must be readable and tappable.

Bottom controls:
- Restart button.
- Hint button placeholder, can be disabled or show “Coming soon”.
- Next level only appears after win.
- Optional level select is not required for v1.

Win overlay:
- Shows “Level Complete”.
- Shows escaped count.
- Shows coins earned.
- Buttons: Next Level, Replay.

Lose overlay:
- Shows “Out of lives”.
- Buttons: Restart.

Gameplay rules:
- Board is a 2D grid.
- Levels can be 5x5, 6x6, or 7x7.
- Early levels should be 5x5 or 6x6.
- Units can be:
  - Movable character
  - Static obstacle
- Movable character fields:
  - id
  - type: "unit"
  - assetKey
  - row
  - col
  - width
  - height
  - direction: "up" | "down" | "left" | "right"
  - escaped: boolean
- Obstacle fields:
  - id
  - type: "obstacle"
  - assetKey
  - row
  - col
  - width
  - height
- Every unit and obstacle occupies grid cells.
- A unit can be 1x1, 1x2, 2x1, or 2x2.
- For v1, most units should be 1x1.
- 2x1 units are allowed but must be implemented safely.
- A unit can only move in its fixed direction.
- Units do not rotate.
- Units do not move one tile at a time.
- A valid tap either makes the unit escape completely or bump in place.
- Static obstacles never move.
- Escaped units no longer block cells.
- A level is complete when every non-escaped movable unit has escaped.

Life system:
- Each level starts with 3 lives by default.
- If the player taps a unit and its path is blocked, subtract 1 life.
- If lives reach 0, show lose overlay.
- If the path is clear and the unit escapes, do not subtract life.
- Restart resets lives, escaped units, and move count.

Scoring / rewards:
- Keep scoring simple.
- Each escaped unit gives 10 coins.
- Completing a level gives bonus coins:
  - Level complete bonus: 50
  - Remaining life bonus: livesRemaining * 20
- Store total coins in localStorage.
- Store highest unlocked level in localStorage.
- Do not use backend.
- Do not add login.

Level data:
Create at least 10 hardcoded playable levels.
Each level must include:
- id
- boardRows
- boardCols
- lives
- units
- obstacles
- optional tutorialText

Example level schema:

type Direction = "up" | "down" | "left" | "right";

type BoardEntity = {
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
  entities: BoardEntity[];
};

Required utility functions:
Implement pure game logic functions separately from UI rendering.

Files should include something similar to:
- src/features/tribe-out/types.ts
- src/features/tribe-out/levels.ts
- src/features/tribe-out/gameLogic.ts
- src/features/tribe-out/TribeOutGame.tsx
- src/features/tribe-out/TribeOutBoard.tsx
- src/features/tribe-out/TribeOutEntity.tsx
- src/features/tribe-out/TribeOutHUD.tsx
- src/features/tribe-out/TribeOutOverlay.tsx
- src/features/tribe-out/tribeOut.css or module CSS

Required pure functions:
1. getOccupiedCells(entity)
   - Returns all cells occupied by the entity.
   - Must support width and height.
   - Example return: [{ row: 2, col: 3 }, { row: 2, col: 4 }]

2. isInsideBoard(row, col, boardRows, boardCols)
   - Returns true if cell is inside board.

3. buildOccupancyMap(entities)
   - Ignores escaped units.
   - Maps each occupied cell to entity id.
   - Obstacles and non-escaped units block cells.

4. getForwardCellsUntilExit(unit, level)
   - Returns every cell in front of the unit in its direction until outside board.
   - Must account for the full width/height of large units.
   - For direction up, check the row above the unit’s top edge.
   - For direction down, check the row below the unit’s bottom edge.
   - For direction left, check the col left of the unit’s left edge.
   - For direction right, check the col right of the unit’s right edge.
   - Continue checking until reaching board edge.
   - For wide/tall units, check the whole front edge, not only one cell.

5. canExit(unit, level)
   - Returns true if all forward cells are empty.
   - Returns false if any forward cell is occupied by another non-escaped unit or obstacle.

6. applyTapUnit(unitId, state)
   - If game is already won or lost, do nothing.
   - If unit does not exist, do nothing.
   - If entity is obstacle, do nothing.
   - If unit is escaped, do nothing.
   - If canExit is true:
     - Mark unit as exiting/escaped.
     - Increment escaped count.
     - Add coins.
     - If all units escaped, set status to "won".
   - If canExit is false:
     - Set bump animation id.
     - Subtract 1 life.
     - If lives becomes 0, set status to "lost".

7. resetLevel(levelId)
   - Reloads original level data.

8. goToNextLevel()
   - Loads next level.
   - If no next level exists, keep showing completed state or loop to level 1 only if clearly marked as prototype behavior.

Rendering requirements:
- Use CSS grid or absolute positioning inside a board container.
- The board should visually look like an isometric/tile board if possible, but gameplay clarity is more important.
- Since design.md already exists, use existing design tokens/classes if available.
- Do not hardcode a completely unrelated visual style.
- Do not import random UI libraries.
- Do not add shadcn components unless the project already uses them and design.md requires them.
- Use simple buttons/components already in the project if available.

Direction indicators:
Every movable unit must clearly show its direction.
Use at least one of these:
- Small arrow badge under/above the unit.
- CSS arrow.
- Direction icon.
- Path preview on hover/tap.
For v1, easiest acceptable implementation:
- Add a small arrow symbol on the unit:
  - up: ↑
  - down: ↓
  - left: ←
  - right: →
The arrow must be visible on mobile.

Tap/click behavior:
- Use pointer events.
- Do not rely on hover only.
- Mobile tap must work.
- Buttons and board entities must have accessible labels.
- Entity click target should be at least 44px.

Animation requirements:
Keep animations simple and CSS-based:
1. Idle:
   - Subtle breathing/bounce for units.
2. Escape:
   - When unit exits, animate it moving in its direction and fading out.
   - After animation, remove it from blocking state immediately or safely mark escaped.
3. Bump:
   - When blocked, move slightly forward then back.
   - Add small shake.
4. Win:
   - Overlay appears with simple pop animation.
5. Lose:
   - Overlay appears.

Important:
- The logical state must update reliably.
- Do not let animations break gameplay.
- If animation is difficult, prioritize correct state and playable loop first.

Responsive requirements:
- Desktop:
  - Board centered.
  - Max board width around 640px.
- Mobile:
  - Board width should be min(92vw, available height based size).
  - UI must not overlap the board.
  - Top HUD must stay visible.
  - Bottom buttons must be reachable.
  - No horizontal scrolling.
  - Test manually at:
    - 375x667
    - 390x844
    - 430x932
    - 768x1024
    - desktop 1440x900

Manual testing only:
- Do NOT run Playwright.
- Do manual browser testing.
- Use npm run build and npm run typecheck if available.
- If test script exists, run it only if it is lightweight and already configured.
- Do not create a new complex test setup.

Acceptance criteria:
The implementation is accepted only if:
1. The game opens without runtime errors.
2. Level 1 is immediately playable.
3. Tapping a clear unit makes it exit.
4. Tapping a blocked unit triggers bump and subtracts 1 life.
5. Escaped units no longer block the board.
6. The escaped counter updates correctly.
7. Hearts/lives update correctly.
8. Win overlay appears when all movable units escape.
9. Lose overlay appears when lives reach 0.
10. Restart works.
11. Next level works.
12. At least 10 levels exist.
13. Mobile viewport is playable.
14. No horizontal overflow on mobile.
15. The implementation follows design.md.
16. No backend, no leaderboard, no auth, no shop, no PixiJS.

Suggested level progression:
Level 1:
- 5x5
- 3 units
- No obstacles
- Teach tap-to-exit.

Level 2:
- 5x5
- 4 units
- One unit blocks another.

Level 3:
- 5x5
- Add one obstacle.

Level 4:
- 6x6
- 5 units
- Multiple directions.

Level 5:
- 6x6
- Add 2x1 unit.

Level 6:
- 6x6
- More blockers.

Level 7:
- 6x6
- Requires correct order.

Level 8:
- 6x6
- Obstacles create narrow exits.

Level 9:
- 7x7
- More units but still readable.

Level 10:
- 7x7
- Mixed 1x1 and 2x1 units, correct order required.

Do not make levels impossible.
Before final response, manually verify each level can be completed.

Implementation order:
Phase 1:
- Add types.
- Add 10 levels.
- Add pure game logic.
- Add simple board rendering with placeholder colored blocks and arrows.
- Make gameplay work.

Phase 2:
- Add HUD, lives, progress, restart, next level.
- Add win/lose overlays.
- Add localStorage for coins and highest unlocked level.

Phase 3:
- Apply design.md styling.
- Replace placeholders with existing asset keys/images if available.
- Add CSS animations.

Phase 4:
- Manual responsive testing.
- Fix overflow, tap target, layout, and readability.

Do not start with animations or assets.
Start with working gameplay first.

Final deliverable:
- A playable Tribe Out HTML5 game mode.
- Clean separated code.
- 10 playable levels.
- Responsive UI.
- Clear win/lose/restart/next-level flow.
- Short summary of changed files.
- Manual test checklist result.
```

My recommendation for your actual build order: **HTML5 DOM first → gameplay verified → then replace visuals with assets → only after that move to PixiJS if needed**. This game does not need Pixi at v1. The hard part is not rendering; the hard part is clean level logic, path checking, lives, win/lose, and mobile readability.
