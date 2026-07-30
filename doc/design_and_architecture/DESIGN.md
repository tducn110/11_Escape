# Design System: Blockblast

## 1. Visual Theme & Atmosphere
This is a **Premium Web Game**, absolutely NOT a marketing landing page. The atmosphere balances the cozy warmth of a countryside dawn with the satisfying snappy mechanics of a premium modern mobile game.
The UI is purposefully structured as a highly polished, interactive "Game Shell" widget floating over a dynamic `CountrysideBackdrop`. It must maintain this native-app, single-screen interactive feel.

## 2. Color Palette & Roles
- **Canvas/Backdrop Base** (#f5ecd7) — Primary warm background for UI elements.
- **Card Shell Base** (#fdf6ea) — The off-white background of the central game shell card.
- **Charcoal Ink** (#2a2418) — Primary text, deep depth, and heavy borders.
- **Muted Earth** (#8a7d65) — Secondary text, metadata, tooltips, and soft borders.
- **Vibrant Terracotta** (#e87432) — Primary accent for high scores, active states, and focus rings.
- **Destructive Crimson** (#d4183d) — Error states or destructive actions.

## 3. Typography Rules
- **Display & Body:** `Be Vietnam Pro` — Friendly, highly legible sans-serif with rounded geometries.
- **Hierarchy:** Uses extreme weight contrasts (`font-black`, `font-extrabold` vs `font-medium`) rather than purely relying on size scaling.
- **Banned:** Generic serifs, thin weights for small labels, and un-styled system fonts.

## 4. Component Stylings
- **The Game Shell:** The core game is wrapped in `.blockblast-game-shell`. It uses `max-w-[440px]` on mobile and `lg:max-w-[1080px]` on desktop, with `rounded-[28px]`, `border-2`, and heavy drop shadows (`shadow-[0_18px_46px_...]`). This is the intended design! Do NOT strip this out.
- **Buttons:** Tactile, chunky interaction. They scale slightly (`gsap` bounce/back) rather than just changing color, offering a satisfying "push" mechanic.
- **HUD (Heads Up Display):** Stats use uppercase, heavily tracked labels with massive, tightly leaded numbers.
- **Blocks/Pieces:** Brightly colored with inner shadows and thick darker borders to pop off the board. No flat blocks.

## 5. Layout Principles
- **Single Screen Experience:** The game is a single, non-scrolling viewport (`h-[100dvh]`, `overflow-hidden`).
- **Responsive Shell:** On Desktop, a two-column split (`lg:flex-row`) inside the main shell. On Mobile, a vertical stack (`flex-col`) inside the shell.
- **Modals over Navigation:** Settings and Leaderboards act as modal/screen overlays replacing the game shell entirely, keeping the user immersed in the single-page app context.

## 6. Motion & Interaction
- **Perpetual Micro-Interactions:** The mascot breathes, scores pop with exaggerated spring physics.
- **Juicy Feedback:** Screen shakes, score cascades, and saturation changes upon game over or combo blasts.
- **Performance:** Hardware-accelerated transforms for UI pieces; PixiJS for the core game grid to guarantee 60fps+ on mobile browsers.

## 7. Anti-Patterns (Banned)
- **NO Landing Page Conversions:** Do not add marketing copy, scrolling hero sections, footers, or "call to action" blocks outside the game context. This is a game, not a product page.
- **DO NOT Break the Shell:** Do not remove the `blockblast-game-shell` boundaries, borders, or border-radius to make it "full bleed". The floating card layout is the intentional aesthetic.
- **NO Flat UI:** Do not use plain flat colors for blocks or containers. Everything interactive should have a slight border, inset shadow, or texture to feel touchable.
- **NO AI Copywriting Clichés:** Avoid generic placeholders. Use direct game terminology ("Tốt nhất", "Điểm").

---

# Design System — Bộ Lạc Đậu Phộng (mini-game)

*Derived from the bolacdauphong.vn brand identity, adapted for the web mini-game.*

## 1. Tổng quan thẩm mỹ

| Khía cạnh | Mô tả |
| --- | --- |
| Mood | Hoài niệm tuổi thơ, làng quê Việt Nam, ấm áp, hand-drawn |
| Style | Sketch bút chì + watercolor wash, kết hợp nhân vật 3D rendered |
| Personality | Vui tươi, dễ thương, chân thật, gần gũi |
| Inspiration | Tranh dân gian Đông Hồ + minh hoạ sách thiếu nhi |

---

## 2. Color tokens

| Token               | Hex       | Vai trò                            |
| ------------------- | --------- | ---------------------------------- |
| `--rice-paper`      | `#f5ecd7` | Background chủ đạo (giấy dó)       |
| `--paper-warm`      | `#efe3c4` | Background section thứ 2, footer   |
| `--ink-dark`        | `#2a2418` | Text chính, viền nét               |
| `--mascot-yellow`   | `#f0b840` | Vàng mascot Lạc Lạc, logo bubble   |
| `--orange-cta`      | `#e87432` | CTA chính, dấu nhấn, link active   |
| `--orange-cta-edge` | `#b85a22` | Border CTA                         |
| `--bamboo-green`    | `#6b8e3d` | Lá tre, accent                     |
| `--leaf-deep`       | `#4c6630` | Cỏ phía trước, gradient bottom     |
| `--bamboo-soft`     | `#c8d68a` | Cỏ nhạt, hill nền                  |
| `--earth-brown`     | `#8e4e22` | Đất, viền secondary                |
| `--pencil-gray`     | `#8a7d65` | Đường sketch, viền input, text phụ |
| `--cream-card`      | `#fdf6ea` | Background card, popover           |
| `--alert-red`       | `#c23838` | Hearts/lives, destructive          |

**Rule:** không bao giờ dùng pure black `#000` cho text — luôn dùng `#2a2418` (ink-dark) để giữ tone giấy ấm.

---

## 3. Typography

- **Font family:** `Be Vietnam Pro` (sans-serif, hỗ trợ dấu tiếng Việt đầy đủ)
- **Weights:** 400 (body), 600 (label), 700 (strong), 800 (display)
- **Display tagline:** scale `clamp(40px, 7vw, 84px)`, weight 800, line-height 1.05, color ink-dark, dùng `text-shadow: 0 2px 0 rgba(255,255,255,0.6)` để nổi trên backdrop sketch.
- **Section heading:** `clamp(28px, 4vw, 44px)`, weight 800, căn giữa
- **Body:** 15–17px, weight 400–500, line-height 1.65, color `#4a4232`
- **Caption / overline:** 11–12px, weight 700, letter-spacing 1–1.5px, UPPERCASE, color theo accent của section

> Logo chính dùng kiểu chữ marker hand-drawn. Trong mini-game ta thay bằng **logo bubble**: chữ "L" trắng trên hình tròn radial gradient vàng `#f8c860 → #d99820`, viền `#2a2418` 2px.

---

## 4. Layout & spacing

- **Container:** `max-width: 1100px`, `padding: 0 24px` (mobile) / `0 32px` (desktop)
- **Section padding dọc:** `80–100px`
- **Grid gutter:** 16–24px (card grid), 32–40px (footer columns)
- **Radius scale:**
  - Pill button / chip / nav dot label: `999px`
  - Card / modal: `20–24px`
  - Input / small chip: `12–14px`
- **Shadow:**
  - Card thường: `0 8px 24px rgba(42,36,24,0.06)`
  - Card nổi: `0 14px 40px rgba(42,36,24,0.18)`
  - CTA cam: `0 10px 24px rgba(232,116,50,0.4)`

---

## 5. Components

### 5.1 Top navigation
- Fixed, height ~64px, background `rgba(245,236,215,0.85)` + `backdrop-filter: blur(10px)`
- Trái: logo bubble + tên brand; Giữa: dotted-progress nav; Phải: mute, pill VIE, CTA
- Border-bottom: `1px solid rgba(138,125,101,0.18)`

### 5.2 CTA orange (primary button)
- Gradient `linear-gradient(180deg, #f08a48 0%, #e87432 100%)`
- Border `3px solid #b85a22`, border-radius `999px`, padding `16–18px 36px`, text trắng weight 800
- Hover: tăng `box-shadow` blur, không đổi gradient.

### 5.3 Ghost / secondary button
- Background `rgba(255,255,255,0.85)`, border `2px solid #8a7d65`, text ink-dark weight 700.

### 5.4 Card
- Background `rgba(255,255,255,0.85)` hoặc `#fdf6ea`
- Border `1.5px solid rgba(138,125,101,0.3)` (đôi khi `1.5px dashed`)
- Radius 20, padding 24

### 5.5 Pixel / vector mascot
- Mascot peanut: hình ovan đôi màu vàng `#f0b840`, vân ngang nâu `#8e4e22`, mặt cười.
- Mascot mèo: hình tròn cam `#e87432` + tai tam giác + ria, sọc nâu nhạt.
- Render trên gradient nền cỏ `#c8d68a → #6b8e3d`.

### 5.6 Dashboard
- 4 stat cards (Best / Last / Total / Rank) — icon màu accent + label uppercase + giá trị 32px weight 800
- Top 3 leaderboard: badge vàng/bạc/đồng (`#f0b840`, `#d0c4a0`, `#d99258`)

---

## 6. Backdrop sketch (hero)

Vẽ bằng SVG, không dùng ảnh raster. Layers từ xa → gần:
1. Bầu trời `#f5ecd7` (paper)
2. Núi mờ: bezier mềm, fill `#e6d8b2` alpha 0.6
3. Cánh đồng: bezier wave, fill `#c8d68a` alpha 0.5
4. Khóm tre / dừa: stroke `#6b8e3d` width 1.2, alpha 0.45
5. Đàn cò bay: 3–5 chữ V nhỏ stroke pencil-gray
6. Cỏ phía trước: gradient `#c8d68a → #4c6630`

Tất cả nét đều `strokeLinecap: round`, độ dày 1–1.5px, alpha 0.4–0.6.

---

## 7. Accessibility
- Tất cả button có `aria-label` khi chỉ có icon
- Modal `role="dialog" aria-modal="true"`
- Contrast: ink-dark `#2a2418` trên paper `#f5ecd7` > 12:1 (AAA)
- Touch target ≥ 44×44px cho nav dots và CTA mobile
- Tôn trọng `prefers-reduced-motion`

## 8. Asset policy
- **Không embed ảnh raster** từ `/src/imports/*.png`
- Mọi nhân vật, backdrop, icon trong game **vẽ bằng SVG hoặc Pixi Graphics**
- Icon UI nhỏ dùng `lucide-react`

---

# Game Spec: Tribe Out / Bộ Lạc Out

*Full implementation prompt for the coding agent.*

## Overview

Grid-based escape puzzle similar to Animal Out / Traffic Escape, themed as a tribe camp puzzle. Player taps characters to make them escape in their fixed facing direction.

## Core Rules

- Board is a 2D grid (5×5, 6×6, or 7×7).
- Each movable character has a fixed direction: `up | down | left | right`.
- Tap a unit → check path in its direction until board edge.
  - **Clear path:** unit escapes, removed from board. No life lost.
  - **Blocked path:** bump animation, subtract 1 life.
- Level won when all required movable units escape.
- Level lost when lives reach 0 (default: 3 lives).
- Escaped units no longer block cells.

## Required UI

**Top bar:** Lives (hearts) | Level number | Escaped progress (e.g. "4/12")

**Board:** Centered, responsive, playable at 375px mobile width.

**Bottom controls:** Restart | Hint (placeholder/disabled) | Next Level (post-win only)

**Win overlay:** "Level Complete" | escaped count | coins earned | Next Level + Replay buttons

**Lose overlay:** "Out of lives" | Restart button

## Scoring & Persistence
- Each escaped unit: +10 coins
- Level complete bonus: +50 coins
- Remaining lives bonus: `livesRemaining × 20`
- Store `totalCoins` and `highestUnlockedLevel` in localStorage. No backend.

## Data Types

```ts
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
```

## Required Pure Functions

1. `getOccupiedCells(entity)` — all cells occupied, supports width/height
2. `isInsideBoard(row, col, boardRows, boardCols)`
3. `buildOccupancyMap(entities)` — maps cell → entity id, ignores escaped units
4. `getForwardCellsUntilExit(unit, level)` — full front edge in direction until board edge
5. `canExit(unit, level)` — true if all forward cells empty
6. `applyTapUnit(unitId, state)` — core state transition
7. `resetLevel(levelId)` — reloads original level
8. `goToNextLevel()` — loads next level

## File Structure

```
src/features/tribe-out/types.ts
src/features/tribe-out/levels.ts
src/features/tribe-out/gameLogic.ts
src/features/tribe-out/TribeOutGame.tsx
src/features/tribe-out/TribeOutBoard.tsx
src/features/tribe-out/TribeOutEntity.tsx
src/features/tribe-out/TribeOutHUD.tsx
src/features/tribe-out/TribeOutOverlay.tsx
src/features/tribe-out/tribeOut.css
```

## Level Progression (10 levels minimum)

| Level | Grid | Units | Notes |
|-------|------|-------|-------|
| 1 | 5×5 | 3 | No obstacles. Teach tap-to-exit. |
| 2 | 5×5 | 4 | One unit blocks another. |
| 3 | 5×5 | 4 | Add one obstacle. |
| 4 | 6×6 | 5 | Multiple directions. |
| 5 | 6×6 | 5 | Add 2×1 unit. |
| 6 | 6×6 | 6 | More blockers. |
| 7 | 6×6 | 6 | Requires correct order. |
| 8 | 6×6 | 7 | Obstacles create narrow exits. |
| 9 | 7×7 | 8 | More units, still readable. |
| 10 | 7×7 | 9 | Mixed 1×1 and 2×1, order required. |

## Direction Indicators

Every movable unit must show its direction. Minimum acceptable: arrow symbol on unit (↑ ↓ ← →), visible on mobile.

## Animation (CSS-based)
1. **Idle:** subtle breathing/bounce
2. **Escape:** slide in direction + fade out
3. **Bump:** slight forward then back + shake
4. **Win/Lose overlays:** pop animation

Prioritize correct game state over visual polish.

## Responsive Requirements
- Desktop: board centered, max ~640px wide
- Mobile: `min(92vw, available-height-based-size)`, no horizontal scroll
- Test at: 375×667, 390×844, 430×932, 768×1024, 1440×900

## Acceptance Criteria
1. Game opens without runtime errors
2. Level 1 immediately playable
3. Clear unit tap → exit animation + escaped count update
4. Blocked unit tap → bump + life subtracted
5. Escaped units no longer block board
6. Hearts/lives update correctly
7. Win overlay on all units escaped
8. Lose overlay on lives = 0
9. Restart resets level fully
10. Next level loads correctly
11. At least 10 levels exist
12. Mobile viewport playable, no horizontal overflow
13. Follows this DESIGN.md
14. No backend, leaderboard, auth, shop, or PixiJS at v1

## Implementation Order
- **Phase 1:** Types → levels → pure game logic → simple board rendering → playable loop
- **Phase 2:** HUD + overlays + localStorage
- **Phase 3:** DESIGN.md styling + CSS animations
- **Phase 4:** Responsive testing + fixes
