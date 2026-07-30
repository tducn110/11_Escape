# Requirement Traceability Matrix

| Requirement | Primary specification | Owning implementation | Verification |
| --- | --- | --- | --- |
| One-time figma triage | `implementation/00_ONE_TIME_TRIAGE.md` | installed skill + cleanup diff | raw analysis, resolution map, build/typecheck/test |
| Shared pure engine | `contracts/03_DOMAIN_CONTRACT.md` | `src/features/tribe-out/puzzle/*` | domain tests and runtime parity |
| Full leading-edge exit | domain contract | geometry/selectors/engine | four-direction multi-cell tests |
| Unit-only interaction | file specification + runtime integration | `TribeOutEntity.tsx`, `gameLogic.ts` | UI/direct-call tests |
| Invalid rotate does not consume charge | domain/runtime contracts | engine + adapter | rotate rejection tests |
| Atomic switch/gate transition | domain contract | engine | switch/gate transition tests |
| Static level validation | `implementation/02_VALIDATOR_AND_TOOLCHAIN.md` | `scripts/levels/validation/*` | validator fixtures and full catalog command |
| Avoid `2^N` exit subsets | `implementation/03_HYBRID_SOLVER.md` | exit closure + fast solver | 40-unit performance fixture |
| Minimum rotate solution | solver spec | stateful solver | 0-rotate/1-rotate competition fixture |
| Deterministic trace replay | solver spec | solveLevel and replay | all 100 solution reports |
| Causal depth | analyzer spec | analyzer causalDepth | independent/chain/parallel/rotate/gate fixtures |
| Five difficulty phases | `implementation/05_100_LEVEL_CATALOG.md` | phase catalog and generators | phase report bands |
| All 100 levels redesigned | catalog spec | manifests, generators, `levels.ts` | count, IDs, validation, solve, report |
| Economy removed | `implementation/06_PROGRESS_AND_ECONOMY_REMOVAL.md` | types, logic, UI, storage, CSS, docs | repo search, tests, manual QA |
| Stable level IDs | domain/progress specs | level catalog and storage | migration/reorder tests |
| Stars/unlock/current retained | progress spec | storage and runtime | persistence tests |
| Free hints | runtime integration | `TribeOutGame.tsx` | hint tests and UI QA |
| Timer not loss condition | runtime integration | runtime adapter/game | tests and manual QA |
| React/Pixi lifecycle | runtime integration | game, entity, Pixi backdrop | tests/manual Strict Mode evidence |
| TypeScript tools | validator/toolchain spec | package, tsconfig, scripts | clean checkout commands |
| Deterministic generation | catalog + quality gates | generator | repeated generation zero diff |
| No stale old tools | file spec | delete CJS/debug solver | imports/scripts search and final diff |
| Complete evidence | completion protocol | reports | final audit bundle |
