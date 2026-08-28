import { LEVELS, LEVEL_SET_VERSION } from "../levels";
import type { LevelId, ProgressSnapshot, StarRating } from "../types";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** Canonical key for the new Animal Escape progress snapshot. */
export const PROGRESS_KEY = "animal_escape_progress";

/** Legacy key from the previous TribeOut build — read once, then upgraded. */
export const LEGACY_PROGRESS_KEY = "tribeout_progress";

const LEGACY_KEYS = [
  "tribeout_coins",
  "tribeout_highest_level",
  "tribeout_current_level",
  "tribeout_level_stars",
];

const CURRENT_SCHEMA_VERSION = 3;
const LEVEL_ID_PATTERN = /^level-\d{3}$/;

let storageOverride: StorageLike | null | undefined;

/**
 * Test-only hook: pins the storage backend so persistence can be verified
 * without a browser. Pass `null` to restore the default backend.
 */
export function __setStorageForTests(storage: StorageLike | null): void {
  storageOverride = storage;
}

function getStorage(): StorageLike | null {
  if (storageOverride !== undefined) {
    return storageOverride;
  }
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    return window.localStorage;
  } catch {
    return null;
  }
}

function firstLevelId(catalog: readonly import("../types").AnimalEscapeLevel[]): LevelId {
  return catalog[0]?.id ?? "level-001";
}

function defaultProgress(catalog: readonly import("../types").AnimalEscapeLevel[] = LEVELS): ProgressSnapshot {
  const initialLevelId = firstLevelId(catalog);
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    levelSetVersion: LEVEL_SET_VERSION,
    unlockedLevelIds: [initialLevelId],
    currentLevelId: initialLevelId,
    starsByLevelId: {},
    tutorialSeenLevelIds: [],
  };
}

function safeGetItem(storage: StorageLike, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(storage: StorageLike, key: string, value: string): boolean {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemoveItem(storage: StorageLike, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    // ignore storage cleanup failures
  }
}

function readJson(storage: StorageLike, key: string): unknown {
  const raw = safeGetItem(storage, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeStableLevelId(
  value: unknown,
  catalog: readonly import("../types").AnimalEscapeLevel[],
): LevelId | null {
  if (typeof value !== "string" || !LEVEL_ID_PATTERN.test(value)) {
    return null;
  }
  return catalog.some(level => level.id === value) ? (value as LevelId) : null;
}

function buildContiguousUnlockPrefix(
  highestIndex: number,
  catalog: readonly import("../types").AnimalEscapeLevel[],
): LevelId[] {
  const clampedHighest = Math.max(0, Math.min(highestIndex, catalog.length - 1));
  return catalog.slice(0, clampedHighest + 1).map(level => level.id);
}

function normalizeStars(
  value: unknown,
  catalog: readonly import("../types").AnimalEscapeLevel[],
): Partial<Record<LevelId, StarRating>> {
  if (!value || typeof value !== "object") return {};

  const result: Partial<Record<LevelId, StarRating>> = {};
  for (const [rawKey, rawStars] of Object.entries(value as Record<string, unknown>)) {
    const levelId = normalizeStableLevelId(rawKey, catalog);
    if (!levelId) continue;
    if (!Number.isInteger(rawStars)) continue;
    const stars = Math.max(0, Math.min(3, Number(rawStars))) as StarRating;
    result[levelId] = Math.max(result[levelId] ?? 0, stars) as StarRating;
  }

  return result;
}

function normalizeUnlockPrefix(
  values: unknown,
  catalog: readonly import("../types").AnimalEscapeLevel[],
): LevelId[] {
  const validIds = Array.isArray(values)
    ? values
        .map(value => normalizeStableLevelId(value, catalog))
        .filter((value): value is LevelId => value !== null)
    : [];

  const highestIndex = validIds.reduce((maxIndex, levelId) => {
    const nextIndex = catalog.findIndex(level => level.id === levelId);
    return Math.max(maxIndex, nextIndex);
  }, 0);

  return buildContiguousUnlockPrefix(highestIndex, catalog);
}

function normalizeTutorialSeen(
  values: unknown,
  catalog: readonly import("../types").AnimalEscapeLevel[],
): LevelId[] {
  if (!Array.isArray(values)) return [];
  const seen = new Set<LevelId>();
  for (const value of values) {
    const levelId = normalizeStableLevelId(value, catalog);
    if (levelId && !seen.has(levelId)) {
      seen.add(levelId);
    }
  }
  return [...seen];
}

function sanitizeCurrentLevelId(
  candidate: unknown,
  unlockedLevelIds: readonly LevelId[],
  catalog: readonly import("../types").AnimalEscapeLevel[],
): LevelId {
  const stableLevelId = normalizeStableLevelId(candidate, catalog);
  if (stableLevelId && unlockedLevelIds.includes(stableLevelId)) {
    return stableLevelId;
  }
  return unlockedLevelIds.at(-1) ?? firstLevelId(catalog);
}

export function sanitizeProgress(
  value: unknown,
  catalog: readonly import("../types").AnimalEscapeLevel[] = LEVELS,
): ProgressSnapshot {
  const defaults = defaultProgress(catalog);
  if (!value || typeof value !== "object") {
    return defaults;
  }

  const raw = value as Partial<ProgressSnapshot>;
  const unlockedLevelIds = normalizeUnlockPrefix(raw.unlockedLevelIds, catalog);
  const currentLevelId = sanitizeCurrentLevelId(raw.currentLevelId, unlockedLevelIds, catalog);
  const starsByLevelId =
    raw.levelSetVersion === LEVEL_SET_VERSION && raw.schemaVersion === CURRENT_SCHEMA_VERSION
      ? normalizeStars(raw.starsByLevelId, catalog)
      : {};

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    levelSetVersion: LEVEL_SET_VERSION,
    unlockedLevelIds,
    currentLevelId,
    starsByLevelId,
    tutorialSeenLevelIds: normalizeTutorialSeen(raw.tutorialSeenLevelIds, catalog),
  };
}

function persistCanonicalProgress(storage: StorageLike, progress: ProgressSnapshot): boolean {
  const persisted = safeSetItem(storage, PROGRESS_KEY, JSON.stringify(progress));
  if (!persisted) {
    return false;
  }
  for (const key of LEGACY_KEYS) {
    safeRemoveItem(storage, key);
  }
  return true;
}

/**
 * One-shot migration from the previous build's storage.
 *
 * The legacy snapshot may reference level ids beyond the new 20-level catalog
 * (e.g. `level-083`); well-formed ids are clamped to the last available level
 * (`level-020`) before sanitization, per the migration policy. The legacy key
 * is kept untouched; a canonical snapshot is written and used from then on.
 */
function upgradeLegacyLevelIds(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return value;
  }

  const upgraded: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (key === "unlockedLevelIds" || key === "tutorialSeenLevelIds") {
      upgraded[key] = Array.isArray(item) ? item.map(clampLevelId) : item;
    } else if (key === "currentLevelId") {
      upgraded[key] = clampLevelId(item);
    } else if (key === "starsByLevelId") {
      if (item && typeof item === "object") {
        const stars: Record<string, unknown> = {};
        for (const [levelId, rating] of Object.entries(item as Record<string, unknown>)) {
          stars[clampLevelId(levelId) as string] = rating;
        }
        upgraded[key] = stars;
      } else {
        upgraded[key] = item;
      }
    } else {
      upgraded[key] = item;
    }
  }
  return upgraded;
}

/** level-083 → level-020 (clamped to the last authored level). */
function clampLevelId(value: unknown): unknown {
  if (typeof value !== "string" || !LEVEL_ID_PATTERN.test(value)) {
    return value;
  }
  const index = Number(value.slice("level-".length)) - 1;
  if (index < LEVELS.length) {
    return value;
  }
  return LEVELS[LEVELS.length - 1].id;
}

export function migrateLegacyProgress(
  storage: StorageLike,
  catalog: readonly import("../types").AnimalEscapeLevel[] = LEVELS,
): ProgressSnapshot | null {
  const legacy = readJson(storage, LEGACY_PROGRESS_KEY);
  if (!legacy || typeof legacy !== "object") {
    return null;
  }

  const sanitized = sanitizeProgress(upgradeLegacyLevelIds(legacy), catalog);
  persistCanonicalProgress(storage, sanitized);
  return sanitized;
}

export function loadProgress(
  catalog: readonly import("../types").AnimalEscapeLevel[] = LEVELS,
): ProgressSnapshot {
  const storage = getStorage();
  if (!storage) {
    return defaultProgress(catalog);
  }

  const canonical = readJson(storage, PROGRESS_KEY);
  if (canonical) {
    const sanitized = sanitizeProgress(canonical, catalog);
    const raw = canonical as Partial<ProgressSnapshot>;

    if (
      raw.schemaVersion !== sanitized.schemaVersion ||
      raw.levelSetVersion !== sanitized.levelSetVersion ||
      JSON.stringify(raw.unlockedLevelIds ?? []) !== JSON.stringify(sanitized.unlockedLevelIds) ||
      raw.currentLevelId !== sanitized.currentLevelId ||
      JSON.stringify(raw.starsByLevelId ?? {}) !== JSON.stringify(sanitized.starsByLevelId) ||
      JSON.stringify(raw.tutorialSeenLevelIds ?? []) !== JSON.stringify(sanitized.tutorialSeenLevelIds)
    ) {
      persistCanonicalProgress(storage, sanitized);
    }

    return sanitized;
  }

  return migrateLegacyProgress(storage, catalog) ?? defaultProgress(catalog);
}

export function persistProgress(progress: ProgressSnapshot): void {
  const storage = getStorage();
  if (!storage) return;

  const sanitized = sanitizeProgress(progress, LEVELS);
  persistCanonicalProgress(storage, sanitized);
}

export function clearProgress(): void {
  const storage = getStorage();
  if (!storage) return;

  safeRemoveItem(storage, PROGRESS_KEY);
  safeRemoveItem(storage, LEGACY_PROGRESS_KEY);
  for (const key of LEGACY_KEYS) {
    safeRemoveItem(storage, key);
  }
}