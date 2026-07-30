# Instructions to the Implementing Agent

You are responsible for implementing the entire specification in this `goal/` directory against the live repository at `/home/pro/Downloads/intern/11_Escape`.

## Operating rule

Do not merely produce another plan. Modify the repository, implement the system, run the tools, redesign the 100-level catalog, and verify the global Definition of Done.

## Required behavior

- Read every specification file before editing.
- Follow `IMPLEMENTATION_ORDER.md`.
- Do not stop after an internal gate unless blocked.
- Do not ask the user to choose architecture already fixed here.
- Do not preserve source that contradicts the specification.
- Do not invent new gameplay mechanics.
- Do not migrate the full game to Pixi.
- Do not reintroduce economy.
- Do not rerun `figma-triage` after its initial cleanup phase.
- Do not claim tests or tools passed without raw output.
- Do not edit generated `levels.ts` directly once the generator exists.
- Do not silently accept out-of-band levels.
- Do not leave duplicate solver/generator sources.

## Source contradiction handling

When a path or symbol differs in live source:

1. identify the live equivalent;
2. preserve the specification's responsibility and behavior;
3. record the mapping in gate evidence;
4. continue.

Stop only when the contradiction makes the target contract impossible or requires a new gameplay decision not defined here.

## End condition

Return `GOAL_ACCEPTED` only after every global quality gate is satisfied.
