# Implementation Order and Dependency Gates

The implementation agent executes the whole assignment but must respect these internal gates.

## Gate 0 — Repository safety

- Read workflow skill.
- Record branch, HEAD, full status.
- Identify unrelated dirty files.
- Do not continue on wrong repository path.

## Gate 1 — One-time triage cleanup

- Complete `implementation/00_ONE_TIME_TRIAGE.md`.
- Current tests/build/typecheck pass or pre-existing failures are proven.
- Freeze triage scope.

## Gate 2 — Baseline fixtures

Before moving production rules:

- add regression fixture for Level 5 overlap;
- add invalid switch/gate tap fixture;
- add invalid rotate charge fixture;
- add 40-independent-unit fixture;
- capture current migration fixtures.

These tests may initially fail for the confirmed defects.

## Gate 3 — Pure domain

Implement:

- discriminated types;
- geometry;
- occupancy;
- selectors;
- engine;
- serialization;
- direct domain tests.

Do not change the 100-level catalog yet except temporary test fixtures.

Pass domain tests before runtime migration.

## Gate 4 — Runtime adapter and interaction

- migrate `gameLogic.ts` to domain calls;
- fix unit-only interaction;
- fix rotate rejection;
- fix hint timer lifecycle;
- preserve lives/timer/stars/audio/animation.

Pass runtime tests and build.

## Gate 5 — Toolchain and validator

- add `tsx`, lockfile, tools tsconfig, scripts;
- implement raw authoring validation;
- make invalid current catalog report failures, including Level 5.

At this gate it is acceptable for the current catalog validation command to fail because known data is invalid, but the failure must be expected and proven.

## Gate 6 — Hybrid solver

- implement exit closure;
- implement fast and stateful paths;
- implement replay verification;
- pass solver fixtures and performance fixture.

## Gate 7 — Analyzer

- implement all metrics and output formats;
- pass analyzer fixtures;
- produce baseline report for current catalog without claiming release acceptance.

## Gate 8 — Economy removal and progress migration

- remove all economy state/UI/persistence/tests;
- implement stable ID progress schema;
- pass migration and screen tests;
- remove legacy coin behavior.

This gate completes before publishing redesigned level data.

## Gate 9 — 100-level catalog

- implement phase manifests and generators;
- replace all 100 levels;
- delete old CJS sources and debug solver after successful replacement;
- generate runtime catalog;
- pass validate/solve/replay/report for all 100.

## Gate 10 — Runtime catalog integration and balance

- verify hints against new levels;
- assign timers after metrics;
- verify stars/unlocks/current navigation;
- update Dashboard;
- run viewport and representative manual QA.

## Gate 11 — Cleanup and documentation

Without rerunning figma-triage:

- remove dead economy and migration scaffolding;
- remove old tool implementations;
- remove stale imports/selectors/CSS;
- update current-state docs;
- preserve historical docs as historical where appropriate.

## Gate 12 — Final release verification

Run every command and evidence step. Only then return `GOAL_ACCEPTED`.
