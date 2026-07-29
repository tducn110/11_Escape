# Stage I — Runtime Integration

## Objective

Integrate the new pure puzzle domain, progress schema, free hints, and 100-level catalog without regressing rendering, animation, audio, accessibility, or lifecycle safety.

## Attempt state flow

```text
load progress
  -> resolve currentLevelId
  -> create initial puzzle state
  -> build runtime GameState
  -> render board and controls
```

## Tap flow

```text
entity activation
  -> UI confirms live unit
  -> runtime adapter dispatches exit or rotate
  -> domain returns accepted/rejected transition
  -> runtime applies lives/status/animation/audio/persistence effects
```

## Invalid-target behavior

For obstacle, gate, switch, escaped unit, missing ID, or non-playing state:

- no life change;
- no rotate charge change;
- no puzzle-state change;
- no bump or escape animation;
- no bump/escape audio;
- no persistence write.

Direct domain and adapter calls must enforce this even if UI guards fail.

## Blocked live unit

A blocked live-unit tap:

- returns `BLOCKED_PATH` from the domain;
- subtracts one life in the runtime adapter;
- records `lastBumpedEntityId`;
- triggers one bump animation and sound;
- loses when new lives value is zero;
- does not mutate puzzle entities, switches, gates, directions, or rotate charges.

## Successful exit

- commit the returned `PuzzleState`;
- increment escaped count exactly once;
- set last escaped ID;
- clear bump ID;
- play escape audio once unless the same transition wins;
- when complete, play win audio and scenery boom once;
- calculate stars once;
- persist stars/unlock once.

## Star contract

```text
1 star: complete the level
+1 star: finish without losing a life
+1 star: use no hints and finish with timeRemaining > 0
```

Maximum is 3. Persist the best star rating only.

Economy removal does not change this rule.

## Hint contract

Hints are free.

`handleHint`:

1. requires playing status and no active hint animation;
2. obtains legal exit actions from the pure domain;
3. selects deterministically:
   - preferred: first exit in the representative solver trace that is legal in current state;
   - fallback: first legal exit sorted by unit ID;
4. increments `hintsUsed` once;
5. highlights the selected live unit for 1.5 seconds;
6. owns and clears its timer through `hintTimerRef`.

If no legal exit exists but a rotate is required, the hint system may highlight the rotate control and target unit only when a solver-derived legal rotate recommendation is available. If this UX is not implemented, the button must remain inert rather than giving a wrong unit hint.

## Timer contract

- decrement once per second only while game is active, tab is visible, status is playing, and time remains positive;
- stop at zero;
- zero does not set lost status;
- zero only prevents the timer/no-hint star bonus;
- clear timeout on dependency change and unmount;
- do not create duplicate intervals/timeouts in Strict Mode.

## Rotate UI contract

- button reads charges from `gameState.puzzle.rotateChargesRemaining`;
- disabled at zero or non-playing status;
- selected state toggles without puzzle mutation;
- accepted rotate clears selected tool;
- invalid target does not consume charge and may leave selected tool active so the player can choose a valid unit;
- restart restores level-configured charges.

## Level navigation

- resolve all navigation by stable level ID and catalog maps;
- no persisted numeric index identity;
- next level must already be unlocked after win;
- Dashboard derives highest unlocked position from catalog order;
- Settings navigation does not destroy attempt state unless existing behavior explicitly remounts it;
- progress remains synchronized when Dashboard opens.

## React/Pixi lifecycle

Preserve and verify:

- one Pixi canvas per mounted board;
- safe async `Application.init` disposal;
- no render after destroyed app;
- resize uses current refs;
- entity animation timeouts clear on effect cleanup;
- bump and hint timers clear on unmount;
- App scenery timer clears on unmount;
- audio listeners are not duplicated.

## Accessibility

- only live units receive button role, focus, click, Enter, and Space activation;
- environmental entities receive descriptive non-button semantics;
- direction remains in unit aria label;
- board remains a named group;
- overlays remain modal dialogs;
- progress bar values remain correct;
- controls meet existing touch target requirements;
- reduced motion disables or minimizes non-essential movement without hiding state changes.

## Responsive requirements

Re-run existing viewport audit and preserve:

```text
375x667
390x844
430x932
844x390
768x1024
1366x768
1440x900
```

All 100 levels do not need screenshots at every viewport, but representative levels from each phase must be manually tested on mobile portrait and desktop, including the largest board and largest multi-cell footprint.
