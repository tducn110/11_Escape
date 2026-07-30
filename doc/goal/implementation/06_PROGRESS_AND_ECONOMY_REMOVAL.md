# Stage H — Economy Removal and Progress Migration

## Objective

Delete the economy and migrate progress to one versioned payload using stable level IDs.

## Economy deletion checklist

Delete or rewrite every confirmed occurrence of:

- `coins` in `GameState`;
- `coins` in progress snapshots;
- `coinsEarnedThisLevel`;
- coin sanitization;
- +10 unit reward;
- completion/star coin bonuses;
- replay detection for rewards;
- coin rollback on restart;
- hint price and insufficient-coin disablement;
- coin HUD metric;
- win-overlay coin badge;
- Dashboard coin/asset section;
- localStorage coin key behavior;
- economy tests and docs;
- economy-only imports, CSS, and icons.

Do not leave unused economy fields set to zero. Remove the feature.

## Current schema constants

```ts
export const TRIBE_OUT_PROGRESS_KEY = "tribeout_progress";
export const PROGRESS_SCHEMA_VERSION = 2;
export const LEVEL_SET_VERSION = 2;
```

The implementation may increment the numeric versions only if repository history already uses these values. The semantic contract is fixed.

## Canonical progress payload

```ts
export interface TribeOutProgressSnapshot {
  schemaVersion: number;
  levelSetVersion: number;
  unlockedLevelIds: LevelId[];
  currentLevelId: LevelId;
  starsByLevelId: Partial<Record<LevelId, StarRating>>;
}
```

## Default progress

```text
unlocked: [level-001]
current: level-001
stars: empty
```

## Sanitization

- Unknown level IDs are removed.
- Unlocks are normalized to a contiguous prefix ending at the highest valid unlocked catalog position.
- `level-001` is always unlocked.
- Current ID must be valid and unlocked; otherwise use the highest valid unlocked ID.
- Stars are clamped to integers 0–3.
- Stars for unknown IDs are removed.
- Duplicate unlocked IDs are removed.
- Invalid JSON returns default progress.
- Storage exceptions return playable in-memory defaults.

## Legacy keys

Read and remove after successful canonical persistence:

```text
tribeout_coins
tribeout_highest_level
tribeout_current_level
tribeout_level_stars
```

Coins are discarded. They are not mapped into another resource.

## Legacy migration

1. Read legacy highest and current numeric indexes.
2. Clamp indexes to 0–99.
3. Convert the highest index into a contiguous unlocked ID prefix.
4. Convert current index to a valid unlocked ID.
5. Parse legacy stars only to determine that old progress existed; because all 100 levels are redesigned in this release, reset all stars.
6. Persist canonical payload.
7. Only after persistence succeeds, remove all legacy keys.
8. Return canonical progress.

## Level-set migration

When loading an existing canonical payload with an older `levelSetVersion`:

- preserve the valid contiguous unlock prefix;
- preserve valid current level position;
- reset stars for the level IDs listed in the migration definition;
- for this redesign release, that list is all 100 IDs;
- update `levelSetVersion` exactly once;
- persist the migrated payload;
- repeated loads must not reset newly earned stars again.

## Win persistence

On win:

- keep the highest stars for the completed level;
- unlock the next level ID if one exists;
- do not change current level until the user chooses Next;
- do not grant any currency or reward.

On Next:

- persist the next unlocked level as `currentLevelId`.

On replay/restart:

- do not alter progress except current level when explicitly navigated.

## Clear progress

`clearTribeOutProgress` removes:

- canonical key;
- all legacy keys;
- any temporary migration key created by implementation.

It must not alter music/SFX settings unless they share no progress contract and the product explicitly requests it.

## Required tests

- no storage returns defaults;
- legacy highest/current migrate to stable IDs;
- legacy coins are discarded;
- all legacy stars reset for catalog v2;
- unlock/current preserved and clamped;
- corrupt JSON;
- negative and huge indexes;
- unknown IDs;
- non-contiguous unlock array normalization;
- invalid star values;
- migration idempotence;
- second load preserves newly earned v2 stars;
- storage write failure returns playable data;
- clear removes canonical and every legacy key;
- reorder fixture resolves by stable ID rather than old numeric object keys.
