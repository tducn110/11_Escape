# Stage G Detail — Phase-Specific Generator Algorithms

## Shared deterministic random source

Create `scripts/levels/generator/random.ts`.

Use a deterministic PRNG whose output is stable across Node versions. Do not use `Math.random`, object-key iteration order, locale sorting, or cryptographic buffer mutation as the existing CJS generator does.

Required API:

```ts
export interface RandomSource {
  nextFloat(): number;
  nextInt(minInclusive: number, maxExclusive: number): number;
  pick<T>(values: readonly T[]): T;
  shuffle<T>(values: readonly T[]): T[];
}

export function createRandomSource(seed: string): RandomSource;
```

A small fixed algorithm such as `xmur3` + `mulberry32` is acceptable when implemented locally and regression-tested with fixed expected sequences.

## Shared embedding contract

`embedBlueprint.ts` receives:

- dependency blueprint;
- board dimensions;
- phase constraints;
- deterministic random source;
- attempt budget.

It returns either a candidate geometry or a structured failure.

### Placement state

Track:

- occupied physical cells;
- entity placements;
- intended blocker edges already satisfied;
- unintended blocker edges introduced;
- switch/gate causal links;
- unit forward lanes;
- mobile density estimate.

### Reverse-topological embedding

For monotonic `blocks-exit` edges, place the blocked node first and blockers later.

For each node in reverse topological order:

1. enumerate allowed footprint/direction placements in stable coordinate order;
2. filter out-of-bounds and overlap placements;
3. verify the node's own intended escape properties;
4. score how many required edges the placement satisfies;
5. penalize unintended edges and high visual density;
6. choose among equal best placements using deterministic random source;
7. backtrack when remaining nodes cannot be placed.

Do not accept a geometry whose measured dependency graph materially differs from the blueprint.

## Dependency graph verification

After embedding:

1. derive geometric blocker edges using the pure domain occupancy/path rules;
2. compare intended and actual unit dependency edges;
3. require every intended edge;
4. reject unexpected edges that change critical path, roots, or intended opening beyond manifest tolerance;
5. record harmless extra edges only when explicitly allowed by the template.

## Gate/switch embedding

For each gate chain:

1. place a gate on the required exit path of one or more target units;
2. prove the closed gate blocks those targets;
3. place a switch on the complete traversed route of the designated key unit;
4. prove the key unit can successfully exit before gate opening under the intended prerequisite state;
5. prove the exit activates the switch and opens the correct gate;
6. reject switches that no solution crosses;
7. reject gates that block no required unit.

## Multi-cell roles

A multi-cell unit is allowed only with a declared role:

- blocks two lanes;
- requires full leading-edge clearance;
- bridges dependency branches;
- makes a rotate decision spatially distinct;
- interacts with a gate lane.

Reject random multi-cell decoration.

## Obstacle roles

An obstacle is accepted only when the analyzer proves at least one:

- blocks a candidate exit direction;
- makes a required rotate direction meaningful;
- narrows an intended lane without creating hidden ambiguity;
- separates two stateful branches visually and logically.

## Phase 1 builder

No random geometry. Normalize authored input, validate, solve, and report.

## Phase 2 builder

Use DAG blueprint generation:

```text
select template
-> select unit count/depth/root count
-> create DAG
-> embed reverse-topologically
-> verify graph
-> fast-solve
-> analyze
```

Rotate charges default to 0. Optional rotate levels must be explicitly authored or template-marked.

## Phase 3 builder

Use causal chain generation:

```text
create base DAG
-> inject switch/key/gate/blocked target chain
-> embed chain first
-> embed remaining DAG
-> verify gate participation
-> solve
-> analyze stateful depth
```

## Phase 4 builder

Use rotate-choice generation:

```text
create at least two plausible rotate targets
-> reserve one optimal target
-> embed alternate target leading to distinct closed successor
-> add gate/multicell dependencies
-> solve all rotate branches
-> measure meaningful decisions/dead-end risk
```

A visually plausible but canonically equivalent rotate choice does not satisfy the template.

## Phase 5 builder

Use deep causal search:

```text
create depth/decision target
-> select one/two rotate-resource structure
-> compose gate chains and branch joins
-> embed with backtracking
-> validate
-> solve under release budget
-> analyze
-> require authored readability review
```

## Candidate attempt policy

Each level has a deterministic attempt sequence:

```text
seed = "<levelId>:<generatorVersion>:<attempt>"
```

Set an explicit attempt budget per phase. Recommended:

- Phase 2: 500
- Phase 3: 1,000
- Phase 4: 2,000
- Phase 5: 5,000

Failure to find an acceptable candidate returns a structured generation failure. Do not reduce target depth/unit/decision requirements silently.

## Authored overrides

An override may adjust geometry or entities after generation, but must:

- retain the original seed/template metadata;
- change `sourceKind` to `generated-with-override`;
- pass full validation/solve/analyze;
- document the reason.

## Atomic promotion

Never write partially accepted levels into runtime output. Build the complete catalog in memory, evaluate all 100, write temporary outputs, then rename atomically.
