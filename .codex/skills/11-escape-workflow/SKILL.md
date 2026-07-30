---
name: 11-escape-workflow
description: Use when working in 11_Escape to route Codex tasks and deploys through codex, dev, and main in the repo-specific branch workflow.
---

# 11_Escape Codex workflow

Use this skill for any Codex task in this repo.

## Scope

- Applies to `11_Escape` only.
- Use the repo workflow file at `../../../workflow.md` as the source of truth.
- This skill is tailored for Codex-owned changes.

## Branch policy

- Work on `codex` for Codex-owned changes.
- Never mix Codex work into `agy`.
- Use `dev` only for verified merge aggregation.
- Merge to `main` only after `dev` is stable.

## When you start

1. Check `git status`.
2. Confirm the current branch.
3. Identify whether the task is Codex-owned.
4. Read `../../../workflow.md` if needed for the exact merge flow.

## Execution rules

- Keep each change scoped to one purpose.
- Prefer small, reviewable commits.
- Do not disturb unrelated dirty worktree files.
- If a change belongs to another agent, stop and hand it off conceptually instead of blending branches.

## Required order

1. Create or switch to `codex`.
2. Make the change.
3. Commit on `codex`.
4. Push `codex`.
5. Merge into `dev`.
6. Test on `dev`.
7. Merge `dev` into `main` only when stable.

## Files to update when needed

- `workflow.md` for shared process changes.
- `CODEX_RULES.md` only if the repo keeps a separate Codex rule file and the change is Codex-specific.
