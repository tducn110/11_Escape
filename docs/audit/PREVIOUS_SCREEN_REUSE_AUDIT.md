# Previous Screen Reuse Audit

## 1. 02_2048

### Pattern found

- Single-screen app shell with `100dvh`, safe-area padding, `overflow: hidden`, and `overscroll-behavior: none`
- Game card constrained by viewport-aware max width and max height

### Should reuse?

- Yes

### Why

- Tribe Out had the same mobile single-screen requirement and the existing shell still allowed page drag because height was not hard-locked.

### Exact file to port from

- `/home/pro/Downloads/intern/02_2048/src/app/App.tsx`
- `/home/pro/Downloads/intern/02_2048/src/styles/globals.css`

### Exact file to port into

- `src/app/App.tsx`
- `src/styles/globals.css`
- `src/features/tribe-out/tribeOut.css`

### Risk

- Low. The pattern is structural and does not depend on 2048 game logic.

## 2. 09_blockblast

### Pattern found

- Measured viewport sizing with `ResizeObserver`, `visualViewport`, RAF scheduling, and delayed resize retries

### Should reuse?

- Yes

### Why

- Tribe Out cell sizing must be based on the real board area instead of raw viewport height minus a guessed constant.

### Exact file to port from

- `/home/pro/Downloads/intern/09_blockblast/src/features/blockblast/layout/useMeasuredGameViewport.ts`

### Exact file to port into

- `src/components/game/useMeasuredElementSize.ts`
- `src/features/tribe-out/TribeOutGame.tsx`

### Risk

- Low. The hook is generic and independent from PixiJS when reduced to measured element sizing.

## 3. 01_FruitSlashing

### Pattern found

- `GameButton`
- `PanelFrame`
- `IconButton`
- overlay card language for centered action dialogs

### Should reuse?

- Partially yes

### Why

- `GameButton` and the framed panel/card language map well to Tribe Out controls and overlays.
- `IconButton` is not needed because Tribe Out currently has text actions, not toolbar icons.
- `PanelFrame` needs adaptation because Tribe Out overlays do not need a close button or floating side panel behavior.

### Exact file to port from

- `/home/pro/Downloads/intern/01_FruitSlashing/src/components/ui/primitives/GameButton.tsx`
- `/home/pro/Downloads/intern/01_FruitSlashing/src/components/ui/primitives/PanelFrame.tsx`

### Exact file to port into

- `src/components/game/GameButton.tsx`
- `src/components/game/GameOverlayFrame.tsx`
- `src/features/tribe-out/TribeOutOverlay.tsx`

### Risk

- Low to medium. Styling ports cleanly, but floating panel behavior must not reintroduce scroll or off-screen content.

## 4. 01_FruitSlashing DashboardPanel / SettingsPanel

### Pattern found

- Floating side/top panels with independent scroll regions and close controls

### Should reuse?

- No

### Why

- Tribe Out is a single-screen puzzle shell, not a dashboard or side-panel app. Reusing these would add the wrong interaction model and could reintroduce scroll areas.

### Exact file to port from

- `/home/pro/Downloads/intern/01_FruitSlashing/src/components/game/DashboardPanel.tsx`
- `/home/pro/Downloads/intern/01_FruitSlashing/src/components/game/SettingsPanel.tsx`

### Exact file to port into

- Not reused

### Risk

- High. Would pull in unrelated layout assumptions and extra controls.

## 5. 01_FruitSlashing CountdownOverlay / GameOverOverlay / FloatingTextLayer

### Pattern found

- Full-screen overlays and transient effects for a reflex game

### Should reuse?

- No direct reuse

### Why

- Tribe Out only needs static win/lose modal framing. Countdown and floating feedback layers solve a different gameplay problem.

### Exact file to port from

- `/home/pro/Downloads/intern/01_FruitSlashing/src/components/game/CountdownOverlay.tsx`
- `/home/pro/Downloads/intern/01_FruitSlashing/src/components/game/GameOverOverlay.tsx`
- `/home/pro/Downloads/intern/01_FruitSlashing/src/components/game/FloatingTextLayer.tsx`

### Exact file to port into

- Not reused directly

### Risk

- Medium. Would add extra layers and states not needed for current gameplay.

## 6. 08_pikachu

### Pattern found

- Local game/audio hooks and unused exported UI artifacts

### Should reuse?

- No

### Why

- Task 8 explicitly excludes audio work, and the visible patterns inspected here are not better than the already selected shell and measurement patterns from other projects.

### Exact file to port from

- `/home/pro/Downloads/intern/08_pikachu/src/app/hooks/useGameAudio.ts`
- `/home/pro/Downloads/intern/08_pikachu/src/app/_unused/*`

### Exact file to port into

- Not reused

### Risk

- Medium. Would introduce off-scope audio or stale scaffold.
