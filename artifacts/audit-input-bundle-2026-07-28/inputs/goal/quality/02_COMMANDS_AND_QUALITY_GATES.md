# Commands and Release Quality Gates

## Required commands

Run from `/home/pro/Downloads/intern/11_Escape`:

```bash
npm install
npm run typecheck
npm test
npm run build
npm run levels:validate
npm run levels:solve
npm run levels:report
npm run levels:generate
npm run levels:validate
npm run levels:solve
npm run levels:report
node scripts/task8-viewport-audit.mjs
```

The second validate/solve/report sequence verifies the generated committed catalog rather than only in-memory candidates.

## Clean-checkout verification

Before final acceptance, create a clean verification environment from the final commit or use a clean worktree. Run:

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run levels:validate
npm run levels:solve
npm run levels:report
```

`levels:generate` must also work from clean checkout, but it may produce deterministic files whose diff must be empty against committed generated output.

Required check:

```bash
npm run levels:generate
git diff --exit-code -- src/features/tribe-out/levels.ts reports/levels
```

Adjust report paths if timestamp fields are intentionally excluded from committed deterministic reports. Committed outputs must not contain nondeterministic timestamps that create false diffs; runtime metadata timestamps may be written to non-committed execution evidence instead.

## Hard release gates

- zero TypeScript errors in app and tools;
- zero failing tests;
- successful Vite build;
- exactly 100 valid levels;
- exactly 100 solvable levels;
- zero `INCONCLUSIVE` release levels;
- every solver trace replays to win;
- every level has a manifest;
- every level has a difficulty report;
- every out-of-band metric has an explicit approved exception;
- no unused mechanic entity in generated levels;
- no economy runtime, persistence, UI, test, CSS, or documentation behavior;
- stable level IDs and migration tests pass;
- viewport audit passes;
- representative manual QA passes;
- initial triage findings are fully resolved;
- no unrelated worktree changes are overwritten.

## Determinism gates

- same seed + generator version + specification version produces byte-identical normalized level data;
- solver action order and trace are stable;
- analyzer sample seeds are stable;
- report level ordering is stable;
- generated `levels.ts` is stable;
- repeated progress migration is idempotent.

## Performance gates

- 40-independent-unit fixture passes the linear fast path.
- Every release level solves inside declared state/time budgets.
- Full catalog validate + solve + report completes within a documented CI budget.
- Browser remains responsive on representative phase-5 level at supported mobile viewport.

## Documentation gates

Update stale current-state documents that claim:

- only 10 levels;
- active coin economy;
- no PixiJS at all;
- obsolete runtime structure.

Do not rewrite historical audit records unless they claim to be current. Prefer marking historical documents as superseded with a link to current architecture.
