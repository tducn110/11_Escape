# Manual QA

Verified by command and output:

- `npm run typecheck` — passed
- `npm test` — passed
- `npm run build` — passed
- `npm run levels:validate` — passed, `valid: true`, `levels: 100`
- `npm run levels:solve` — passed, `total: 100`, `solved: 100`
- `npm run levels:report` — passed, `issues: 0`

Viewport audit script updates:

- Canonical progress key is cleared before audits.
- Legacy `tribeout_*` progress keys are cleared before audits.
- Non-unit entities are guarded from being counted as interactive buttons.

Live Chrome CDP audit attempt:

- `node scripts/task8-viewport-audit.mjs` could not complete in this environment because Chrome did not keep a reachable CDP socket on `127.0.0.1:9222` during the run.
- The audit script itself was updated and syntax-checked as part of the repo changes.
