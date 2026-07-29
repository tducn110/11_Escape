import { LEVELS, LEVEL_SET_VERSION } from "./levels";
import type { LevelId, StarRating, TribeOutLevel, TribeOutProgressSnapshot } from "./types";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const PROGRESS_KEY = "tribeout_progress";
const LEGACY_KEYS = [
  "tribeout_coins",
  "tribeout_highest_level",
  "tribeout_current_level",
  "tribeout_level_stars",
];

const CURRENT_SCHEMA_VERSION = 2;
const CURRENT_LEVEL_SET_VERSION = LEVEL_SET_VERSION;
const LEVEL_ID_PATTERN = /^level-\d{3}$/;

function getStorage(): StorageLike | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    return window.localStorage;
  } catch {
    return null;
  }
}

function firstLevelId(catalog: readonly TribeOutLevel[]): LevelId {
  return catalog[0]?.id ?? "level-001";
}

function defaultProgress(catalog: readonly TribeOutLevel[]): TribeOutProgressSnapshot {
  const initialLevelId = firstLevelId(catalog);
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    levelSetVersion: CURRENT_LEVEL_SET_VERSION,
    unlockedLevelIds: [initialLevelId],
    currentLevelId: initialLevelId,
    starsByLevelId: {},
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

function clampLegacyIndex(value: unknown, catalog: readonly TribeOutLevel[]): number | null {
  if (!Number.isInteger(value)) {
    return null;
  }
  const numericValue = Number(value);
  if (numericValue < 0) return 0;
  if (numericValue >= catalog.length) return catalog.length - 1;
  return numericValue;
}

function normalizeStableLevelId(value: unknown, catalog: readonly TribeOutLevel[]): LevelId | null {
  if (typeof value !== "string" || !LEVEL_ID_PATTERN.test(value)) {
    return null;
  }
  return catalog.some(level => level.id === value) ? value as LevelId : null;
}

function buildContiguousUnlockPrefix(highestIndex: number, catalog: readonly TribeOutLevel[]): LevelId[] {
  const clampedHighest = Math.max(0, Math.min(highestIndex, catalog.length - 1));
  return catalog.slice(0, clampedHighest + 1).map(level => level.id);
}

function normalizeStars(value: unknown, catalog: readonly TribeOutLevel[]): Partial<Record<LevelId, StarRating>> {
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

function normalizeUnlockPrefix(values: unknown, catalog: readonly TribeOutLevel[]): LevelId[] {
  const validIds = Array.isArray(values)
    ? values.map(value => normalizeStableLevelId(value, catalog)).filter((value): value is LevelId => value !== null)
    : [];

  const highestIndex = validIds.reduce((maxIndex, levelId) => {
    const nextIndex = catalog.findIndex(level => level.id === levelId);
    return Math.max(maxIndex, nextIndex);
  }, 0);

  return buildContiguousUnlockPrefix(highestIndex, catalog);
}

function sanitizeCurrentLevelId(
  candidate: unknown,
  unlockedLevelIds: readonly LevelId[],
  catalog: readonly TribeOutLevel[],
): LevelId {
  const stableLevelId = normalizeStableLevelId(candidate, catalog);
  if (stableLevelId && unlockedLevelIds.includes(stableLevelId)) {
    return stableLevelId;
  }
  return unlockedLevelIds.at(-1) ?? firstLevelId(catalog);
}

export function sanitizeProgress(value: unknown, catalog: readonly TribeOutLevel[] = LEVELS): TribeOutProgressSnapshot {
  const defaults = defaultProgress(catalog);
  if (!value || typeof value !== "object") {
    return defaults;
  }

  const raw = value as Partial<TribeOutProgressSnapshot>;
  const unlockedLevelIds = normalizeUnlockPrefix(raw.unlockedLevelIds, catalog);
  const currentLevelId = sanitizeCurrentLevelId(raw.currentLevelId, unlockedLevelIds, catalog);
  const starsByLevelId =
    raw.levelSetVersion === CURRENT_LEVEL_SET_VERSION && raw.schemaVersion === CURRENT_SCHEMA_VERSION
      ? normalizeStars(raw.starsByLevelId, catalog)
      : {};

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    levelSetVersion: CURRENT_LEVEL_SET_VERSION,
    unlockedLevelIds,
    currentLevelId,
    starsByLevelId,
  };
}

function persistCanonicalProgress(storage: StorageLike, progress: TribeOutProgressSnapshot): boolean {
  const persisted = safeSetItem(storage, PROGRESS_KEY, JSON.stringify(progress));
  if (!persisted) {
    return false;
  }
  for (const key of LEGACY_KEYS) {
    safeRemoveItem(storage, key);
  }
  return true;
}

export function migrateLegacyProgress(storage: StorageLike, catalog: readonly TribeOutLevel[] = LEVELS): TribeOutProgressSnapshot {
  const defaults = defaultProgress(catalog);
  const currentLevelIndex = clampLegacyIndex(readJson(storage, "tribeout_current_level"), catalog);
  const highestUnlockedIndex = clampLegacyIndex(readJson(storage, "tribeout_highest_level"), catalog);
  void readJson(storage, "tribeout_level_stars");

  const highestIndex = highestUnlockedIndex ?? currentLevelIndex ?? 0;
  const unlockedLevelIds = buildContiguousUnlockPrefix(highestIndex, catalog);
  const currentLevelId = currentLevelIndex !== null
    ? unlockedLevelIds[Math.min(currentLevelIndex, unlockedLevelIds.length - 1)] ?? defaults.currentLevelId
    : unlockedLevelIds.at(-1) ?? defaults.currentLevelId;

  const progress: TribeOutProgressSnapshot = {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    levelSetVersion: CURRENT_LEVEL_SET_VERSION,
    unlockedLevelIds,
    currentLevelId,
    starsByLevelId: {},
  };

  persistCanonicalProgress(storage, progress);
  return progress;
}

export function loadTribeOutProgress(catalog: readonly TribeOutLevel[] = LEVELS): TribeOutProgressSnapshot {
  const storage = getStorage();
  if (!storage) {
    return defaultProgress(catalog);
  }

  const canonical = readJson(storage, PROGRESS_KEY);
  if (canonical) {
    const sanitized = sanitizeProgress(canonical, catalog);
    const raw = canonical as Partial<TribeOutProgressSnapshot>;

    if (
      raw.schemaVersion !== sanitized.schemaVersion ||
      raw.levelSetVersion !== sanitized.levelSetVersion ||
      JSON.stringify(raw.unlockedLevelIds ?? []) !== JSON.stringify(sanitized.unlockedLevelIds) ||
      raw.currentLevelId !== sanitized.currentLevelId ||
      JSON.stringify(raw.starsByLevelId ?? {}) !== JSON.stringify(sanitized.starsByLevelId)
    ) {
      persistCanonicalProgress(storage, sanitized);
    }

    return sanitized;
  }

  return migrateLegacyProgress(storage, catalog);
}

export function persistTribeOutProgress(progress: TribeOutProgressSnapshot): void {
  const storage = getStorage();
  if (!storage) return;

  const sanitized = sanitizeProgress(progress, LEVELS);
  persistCanonicalProgress(storage, sanitized);
}

export function clearTribeOutProgress(): void {
  const storage = getStorage();
  if (!storage) return;

  safeRemoveItem(storage, PROGRESS_KEY);
  for (const key of LEGACY_KEYS) {
    safeRemoveItem(storage, key);
  }
}
