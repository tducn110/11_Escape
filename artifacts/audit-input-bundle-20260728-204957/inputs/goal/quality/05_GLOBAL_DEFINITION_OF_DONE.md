# Global Definition of Done

Every checkbox is mandatory for `GOAL_ACCEPTED`.

## Triage

- [ ] Installed `figma-triage` instructions were read.
- [ ] Analysis ran exactly once before implementation.
- [ ] Raw output is preserved.
- [ ] Every confirmed redundant item was removed.
- [ ] Every retained false positive has proof.
- [ ] Triage scope was frozen and not invoked again.

## Architecture

- [ ] Pure puzzle domain exists and has no browser/runtime dependency.
- [ ] Runtime and tools use the same transitions.
- [ ] No duplicate occupancy/exit/switch/gate implementation remains.
- [ ] Entities remain React/DOM over a Pixi backdrop.

## Rules

- [ ] Full leading-edge multi-cell exits work in four directions.
- [ ] Invalid targets are inert.
- [ ] Blocked live-unit taps lose one life and bump.
- [ ] Rotate is safe, clockwise, and charge-limited.
- [ ] Switch/gate transition is atomic and one-way.
- [ ] Win/loss/timer/star rules match specification.

## Economy and progress

- [ ] Economy is absent from runtime, persistence, UI, tests, CSS, and current docs.
- [ ] Hints are free.
- [ ] Stable level IDs are used.
- [ ] Canonical progress payload is versioned.
- [ ] Legacy unlock/current migrate safely.
- [ ] Old stars reset once for all redesigned levels.
- [ ] Migration is idempotent.
- [ ] Storage failure is playable.

## Tooling

- [ ] `tsx` and tool typecheck are explicit.
- [ ] Validator, solver, analyzer, generator commands work from clean checkout.
- [ ] Old CJS/debug tools are removed.
- [ ] Generated output is deterministic.

## Catalog

- [ ] Exactly 100 stable IDs exist.
- [ ] Five phases contain exactly 20 levels each.
- [ ] Every level has a manifest.
- [ ] Every level is valid.
- [ ] Every level is solvable.
- [ ] No level is inconclusive.
- [ ] Every trace replays.
- [ ] Every level has a difficulty report.
- [ ] Every exception is explicit.
- [ ] Phase algorithms and composition requirements are satisfied.
- [ ] No decorative obstacle/gate/switch/multi-cell mechanic passes unnoticed.

## Runtime and lifecycle

- [ ] Only live units are interactive.
- [ ] Hint and bump timers clean up.
- [ ] Timer pauses correctly and does not cause loss.
- [ ] Dashboard/Settings preserve progress.
- [ ] No duplicate Pixi canvas/listeners/timers.
- [ ] Audio tests and behavior remain valid.
- [ ] Reduced motion and accessibility remain valid.
- [ ] No-scroll responsive shell remains valid.

## Verification

- [ ] App and tools typecheck.
- [ ] Tests pass.
- [ ] Build passes.
- [ ] Validate passes.
- [ ] Solve passes.
- [ ] Report passes.
- [ ] Generate is deterministic.
- [ ] Viewport audit passes.
- [ ] Manual phase QA is recorded.
- [ ] Clean-checkout verification passes.
- [ ] Raw evidence and full diff are included.
