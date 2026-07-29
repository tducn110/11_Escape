# Manual QA Protocol

Record date, commit, browser, viewport, level ID, steps, and result.

## Phase representatives

Test at least:

- Phase 1: first exit lesson, blocked-tap lesson, multi-cell lesson, rotate lesson, gate lesson.
- Phase 2: chain, fork/join, multi-cell structural blocker.
- Phase 3: gate branch, short gate chain, required rotate-to-switch.
- Phase 4: competing rotate choices and intentional dead end.
- Phase 5: deepest causal level, largest board, two-rotate level.

## Required checks

### Interaction

- only units focus and activate;
- switch/gate/obstacle clicks and keyboard actions do nothing;
- invalid rotate targets do not consume charge;
- blocked unit bumps and loses exactly one life.

### State

- successful exit opens crossed switch target gate;
- gate stays open;
- restart fully resets gate, switch, units, timer, lives, hints, and rotate charges;
- next level loads correct stable ID;
- Dashboard and Settings preserve progress;
- level 100 completion does not corrupt unlock state.

### Economy removal

- no coin value in HUD;
- no hint price;
- no coin reward on exit/win;
- no coin badge in win overlay;
- no coin section in Dashboard;
- old coin localStorage value has no effect.

### Persistence

- legacy save migrates without crash;
- valid unlock/current position is preserved;
- old stars reset once for the redesigned catalog;
- new stars survive reload;
- clear progress resets to level 1;
- private/incognito or blocked storage still allows play.

### Responsive and readability

At each required viewport:

- no page scroll;
- HUD and controls visible;
- board not clipped beyond usability;
- arrows readable;
- gates and switches visually distinguishable;
- multi-cell footprints understandable;
- phase-5 choices do not require pixel guessing.

### Lifecycle

In React Strict Mode development:

- no duplicate Pixi canvas;
- no duplicate audio listeners;
- no warning about state update after unmount;
- restart/next during active hint or bump timer causes no stale update;
- background boom timer cleans up.

### Reduced motion

With reduced motion enabled:

- puzzle state remains understandable;
- escape/bump state is not hidden;
- no perpetual breathing animation is required to identify interaction;
- overlays and controls remain usable.
