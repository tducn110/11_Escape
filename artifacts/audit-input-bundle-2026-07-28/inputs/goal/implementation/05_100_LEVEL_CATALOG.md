# Stage G — Full 100-Level Catalog and Five Difficulty Phases

## Global catalog contract

The released catalog contains exactly 100 levels with stable IDs:

```text
level-001 ... level-100
```

All 100 levels are in redesign scope. Existing level geometry may be replaced. Existing numeric IDs are not preserved in runtime types; progression position is preserved through stable string IDs.

Every level must have:

- valid static data;
- a manifest;
- a deterministic representative solution;
- a solver result inside release budgets;
- a difficulty report;
- phase target compliance or an explicit approved exception;
- deterministic reproduction metadata;
- mobile-readable geometry.

## Global design limits

- Recommended board range: 3×3 through 8×8.
- A 9×9 board requires explicit mobile evidence and an approved exception.
- No released level may use 30–50 units as a substitute for depth.
- Recommended maximum unit count is 14.
- Every obstacle must participate in a route constraint.
- Gates and switches must be readable and causally relevant.
- Every level must be completable without pixel guessing.
- Timer is assigned only after puzzle metrics pass.

## Phase target bands

These are release bands, not merely suggestions. An exception must be declared in the manifest and listed in the report.

| Metric | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Levels | 001–020 | 021–040 | 041–060 | 061–080 | 081–100 |
| Board | 3–5 | 5–7 | 5–7 | 6–8 | 6–8 |
| Units | 1–7 | 6–10 | 7–11 | 8–12 | 9–14 |
| Initial exits | 1–3 | 1–3 | 1–3 | 1–2 | 1–3 |
| Initial exit ratio | lesson-specific, <= 65% | 20–45% | 15–40% | 10–30% | 8–25% |
| Critical/causal depth | 1–4 | 4–7 | 5–9 | 7–11 | 9–14 |
| Average exits | 1–3.5 | 1.5–3.5 | 1–3 | 1–2.8 | 1–2.5 |
| Minimum rotate | 0–1 | 0–1 | 0–1 | exactly 1 for at least 12 levels | 1–2 |
| Meaningful decisions | 0–1 | 1–2 | 1–3 | 2–4 | 3–6 |
| Dead-end risk | 0 | 0–5% | 0–12% | 5–25% | 8–30% |

Dead-end risk above zero requires visible signaling and a simple restart/recovery expectation in the manifest.

## Phase 1 — Foundation (`level-001`–`level-020`)

### Source strategy

Hand-author all 20 levels in `scripts/levels/catalog/phase1Authored.ts`.

### Purpose

Teach and reinforce the full v1 vocabulary without noise.

### Required sequence

| Level range | Required concept |
| --- | --- |
| 001–003 | clear exit, direction reading, escaped unit removal |
| 004–006 | blocker order and short chains |
| 007–009 | fork and join dependency patterns |
| 010–012 | multi-cell leading-edge rules |
| 013–014 | obstacle and rotate tutorial; rotate required in at least one |
| 015–016 | basic switch crossing and one-way gate opening |
| 017–018 | multi-cell plus blocker/gate reinforcement |
| 019–020 | small mixed review with one meaningful choice at most |

### Algorithm

No random generation. Author geometry deliberately, validate, solve, and analyze after every level. The phase builder may normalize data but may not invent geometry.

### Hard constraints

- No footprint overlap.
- No intentional dead end.
- At most one newly introduced concept per lesson level.
- Tutorial text only where a mechanic is introduced.
- At least one level must prove full leading-edge checking for a 2×1 unit.
- At least one level must prove full leading-edge checking for a 1×2 unit.

## Phase 2 — Structured Dependency (`level-021`–`level-040`)

### Source strategy

Generate from explicit monotonic dependency blueprints in `phase2Blueprints.ts`, then commit deterministic seeds and manifests.

### Blueprint types

- `CHAIN`
- `FORK`
- `JOIN`
- `PARALLEL_CHAINS`
- `SPINE_WITH_BRANCHES`
- `MULTICELL_CROSS_LANE`

### Algorithm

1. Select target unit count and graph template.
2. Construct a DAG with target roots and longest path.
3. Embed nodes in reverse topological order so later-placed units block intended earlier nodes.
4. Verify geometric dependency graph matches the blueprint within declared tolerances.
5. Add multi-cell units by structural role, not random chance.
6. Add an obstacle only if it participates in a validated route constraint.
7. Require fast-path no-rotate solvability unless the manifest explicitly marks one optional rotate lesson.
8. Reject candidates outside target bands.

### Hard constraints

- Gate/switch is optional but not required in this phase.
- No level relies on rotate to repair random generation.
- At least 12 of 20 levels must have a critical path of 5 or more.
- No level may begin with more than 45% of units immediately escapable.

## Phase 3 — Stateful Mechanics (`level-041`–`level-060`)

### Source strategy

Generate from explicit gate/switch causal templates in `phase3Blueprints.ts`, with authored corrections allowed.

### Template types

- `SWITCH_OPENS_SINGLE_GATE`
- `SWITCH_UNLOCKS_BRANCH`
- `TWO_SWITCH_PARALLEL`
- `SHORT_GATE_CHAIN`
- `ROTATE_TO_SWITCH`
- `MULTICELL_GATE_LANE`

### Algorithm

1. Build a causal blueprint before geometry.
2. Assign switch and target gate IDs explicitly.
3. Ensure the intended exiting unit crosses the switch footprint.
4. Ensure the gate blocks at least one required unit before opening.
5. Embed remaining monotonic dependencies around the causal chain.
6. Solve using fast closure first; invoke stateful search only when rotate is required.
7. Reject unused gates, switches, or obstacles.
8. Reject candidates where stateful mechanics do not increase causal depth.

### Phase composition requirements

- At least 14 levels contain gate/switch mechanics.
- At least 6 levels require exactly one rotate.
- At least 6 levels combine a multi-cell unit with a stateful gate constraint.
- No toggle or closing gate.

## Phase 4 — Strategic Combination (`level-061`–`level-080`)

### Source strategy

Generate from strategic rotate-resource blueprints in `phase4Blueprints.ts`; hand-tune any accepted candidate whose visual readability is insufficient.

### Template types

- `COMPETING_ROTATE_TARGETS`
- `ROTATE_BEFORE_GATE_CHAIN`
- `FORKED_STATEFUL_BRANCH`
- `MULTICELL_RESOURCE_LOCK`
- `SAFE_AND_DEAD_END_ROTATE`
- `CONVERGING_GATE_PATHS`

### Algorithm

1. Build two or more plausible rotate candidates.
2. Guarantee at least one optimal solution with exactly one rotate.
3. When an incorrect rotate creates a dead end, declare the signal and recovery in the manifest.
4. Apply exit closure between rotate decisions.
5. Use the stateful solver and dead-end analyzer as an acceptance gate.
6. Reject candidates whose apparent choices collapse to equivalent successors.
7. Reject candidates with an unreasonably high dead-end risk or unreadable state.

### Phase composition requirements

- At least 12 levels require exactly one rotate.
- At least 10 levels contain two non-equivalent rotate choices.
- At least 10 levels use gate/switch.
- At least 10 levels use multi-cell units structurally.

## Phase 5 — Expert Causal Planning (`level-081`–`level-100`)

### Source strategy

Use strict constrained generation from `phase5Blueprints.ts`, followed by mandatory authored review. A level may be marked `generated-with-override` when geometry is hand-corrected while preserving its seed/template lineage.

### Template types

- `DOUBLE_ROTATE_PLAN`
- `DEEP_GATE_CHAIN`
- `MULTI_BRANCH_RESOURCE_PLAN`
- `LOW_ROOT_CAUSAL_SPINE`
- `NONCOMMUTING_ROTATE_CHOICES`
- `EXPERT_MIXED_MECHANICS`

### Algorithm

1. Choose a causal blueprint with target depth and decision count.
2. Assign one or two rotate charges explicitly.
3. Embed gates, switches, and multi-cell blockers.
4. Validate physical and causal roles.
5. Solve within release budgets.
6. Analyze exact metrics when the reduced graph is fully explored.
7. Otherwise use deterministic sampled metrics but never accept an `INCONCLUSIVE` solver result.
8. Reject visual density without causal participation.
9. Require manual mobile readability review.

### Hard constraints

- No new mechanic beyond v1.
- No level is made expert only by short timer.
- Initial exit ratio must remain at or below 25% unless an approved readability exception exists.
- At least 10 levels require two rotate decisions or one rotate with three or more meaningful choice states.

## Timer assignment

Assign timer after a level passes logic targets:

```text
timeLimit = observationAllowance
          + expectedActionCount * inputAndAnimationAllowance
          + mobileBuffer
```

The generator/report must record the components used. Timer expiry does not lose the level; it removes the timer star condition.

## Runtime generation output

`levels:generate` must:

1. Build all 100 candidates from phase sources.
2. Normalize entity state.
3. Validate the catalog.
4. Solve every level.
5. Replay every solution.
6. Analyze every level.
7. Enforce phase bands and exceptions.
8. Write reports to a temporary directory.
9. Write `levels.ts.tmp`.
10. Atomically promote the runtime file and reports only after all gates pass.

A failure must leave the previous valid `levels.ts` untouched.
