# Master End-to-End Execution Specification

## Assignment

Implement the complete Tribe Out puzzle-system redesign in `/home/pro/Downloads/intern/11_Escape` by following every contract in this package.

This is one end-to-end assignment. The implementation may use internal commits or checkpoints, but it must continue through all phases until the global Definition of Done is satisfied.

## Required execution order

```text
A. Context and branch safety
B. One-time figma-triage analysis and cleanup
C. Baseline fixtures and rule contract
D. Pure puzzle domain engine
E. Runtime adapter integration
F. Static validator and TypeScript toolchain
G. Hybrid solver
H. Difficulty analyzer and report formats
I. Economy removal and progress migration
J. 100-level five-phase catalog redesign
K. Constrained generation and deterministic reports
L. Hint, timer, stars, accessibility, lifecycle, and screen integration
M. Full automated and manual release validation
N. Final evidence package
```

Later stages may not bypass failing earlier contracts.

## Repository workflow

Read `.codex/skills/11-escape-workflow/SKILL.md` and the referenced repository workflow before making changes. Use the branch required for the active implementing agent. Do not mix another agent's branch or unrelated dirty worktree changes.

## Allowed repository scope

The implementation may modify or delete files directly related to:

- Tribe Out puzzle logic and types;
- Tribe Out runtime UI required by logic/economy removal;
- Tribe Out persistence;
- level data and level authoring tools;
- package scripts and TypeScript tool configuration;
- tests and fixtures;
- generated level reports;
- stale documentation that contradicts the released implementation;
- dead code/imports/files identified by the one-time triage analysis.

## Protected scope

Do not redesign unrelated visual assets, audio architecture, background art, rendering style, or navigation. Preserve the current React/DOM entity rendering over a Pixi isometric backdrop. The whole game must not be migrated to Pixi.

Audio remains supported and must retain mute state, gesture unlock, visibility handling, external-buffer fallback, synthesized fallback, and disposal behavior.

## Global invariants

- A live unit escapes only when its entire forward path is clear across its full leading edge.
- Blocked live-unit taps preserve the intended bump and life loss behavior.
- Invalid targets such as obstacle, gate, switch, missing entity, or escaped unit do not consume life or rotate charge.
- Multi-cell footprints work in all four directions.
- Closed gates block; open gates do not.
- Switches do not occupy blocking cells and activate only when crossed by a successful exit.
- Gate opening is one-way and permanent for the current attempt.
- Rotate is clockwise, level-configured, and charge-limited.
- All puzzle transitions are immutable and deterministic.
- All units escaped produces exactly one win transition.
- Lives reaching zero produces loss.
- Timer expiry does not itself lose the level; it affects stars only.
- Restart restores original puzzle state and configured charges.
- Progress is stable across Dashboard and Settings.
- Storage failure never crashes gameplay.
- The app remains a locked, non-scrolling single-screen experience.
- Pixi initialization and destruction remain safe under React Strict Mode.
- No duplicate timers, listeners, canvas instances, animations, or audio unlock handlers.
- No state update or Pixi mutation after unmount/destroy.
- Reduced-motion and accessibility behavior do not regress.

## Completion statuses

The final report must use exactly one:

- `GOAL_ACCEPTED`
- `GOAL_BLOCKED`
- `GOAL_FAILED`

`GOAL_ACCEPTED` is allowed only when every Definition of Done item passes with raw evidence.
