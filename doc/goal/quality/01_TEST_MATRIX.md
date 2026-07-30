# Complete Automated Test Matrix

The implementing agent must add focused tests rather than one broad snapshot suite.

## Pure geometry

- 1×1 occupied cells.
- 2×1 horizontal occupied cells.
- 1×2 vertical occupied cells.
- arbitrary valid rectangle.
- board boundary inclusion and exclusion.
- forward cells in all four directions.
- forward ordering nearest-to-farthest.
- multi-cell full leading edge in all four directions.

## Occupancy

- live unit occupies cells.
- escaped unit ignored.
- obstacle occupies cells.
- closed gate occupies cells.
- open gate ignored.
- switch ignored as a blocker.
- multi-cell map includes every cell.

## Domain exit transitions

- clear exit accepted.
- blocked by unit.
- blocked by obstacle.
- blocked by closed gate.
- passes open gate.
- escaped target rejected.
- missing target rejected.
- obstacle target rejected.
- gate target rejected.
- switch target rejected.
- rejected action does not mutate input.
- accepted exit removes occupancy.
- one switch crossed.
- multiple switches crossed.
- switch not crossed.
- blocked exit does not activate switch.
- target gate opens atomically.
- gate remains open.
- win detected after last unit.
- two initially legal exits commute and yield the same canonical state.

## Rotate transitions

- up to right.
- right to down.
- down to left.
- left to up.
- consumes exactly one charge.
- zero charge rejected.
- missing target rejected without charge loss.
- environmental target rejected without charge loss.
- escaped unit rejected without charge loss.
- no unrelated entity mutation.

## Runtime adapter

- blocked live unit loses one life and bumps.
- third/final blocked tap loses game at zero.
- non-unit tap does not lose life.
- invalid rotate does not consume charge.
- successful exit increments count once.
- final exit sets won once.
- star calculation: completion only.
- star calculation: no life lost.
- star calculation: no hint and time remains.
- timer zero caps at two stars.
- hint use caps at two stars.
- best star persistence.
- next level unlock.
- restart restores original state and charges.

## Static validation

All cases in `implementation/02_VALIDATOR_AND_TOOLCHAIN.md`.

## Solver

All cases in `implementation/03_HYBRID_SOLVER.md`.

Additional performance assertion:

- 40 independent units do not generate escaped-subset states;
- expected solver path is `FAST_EXIT_CLOSURE`;
- `exploredStates` remains within the declared linear threshold.

## Analyzer

- independent units: causal depth 1.
- chain length 8: causal depth 8.
- two parallel chains length 4: depth 4.
- fork and join expected graph path.
- required rotate then exit: depth 2.
- switch/gate creates a later wave.
- independent exits are not meaningful decisions.
- distinct rotate successors count as meaningful.
- monotonic dead-end risk is zero.
- sampled metrics include seed and sample count.
- 40-unit report does not enumerate exponential states.

## Progress and migration

All cases in `implementation/06_PROGRESS_AND_ECONOMY_REMOVAL.md`.

## React interaction

Use the repository's existing test environment or add the smallest supported React test setup only when necessary and justified.

Required behavior-level tests or equivalent browser audit checks:

- live unit is focusable button.
- obstacle is not a button.
- gate is not a button.
- switch is not a button.
- Enter/Space activates a live unit.
- Enter/Space on environment does nothing.
- free hint does not require coins.
- hint timer clears on unmount/restart/next.
- HUD contains no coin metric.
- win overlay contains no coin badge.
- Dashboard contains no coin section.

## Audio and Pixi regression

Existing audio tests remain passing after unrelated changes.

Add or retain coverage proving Pixi backdrop does not duplicate canvas under mount/unmount/remount and does not mutate after destruction when the existing test infrastructure can support it. Otherwise provide raw manual Strict Mode evidence.
