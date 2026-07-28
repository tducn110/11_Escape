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

function getStorage(): StorageLike | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  return window.localStorage;
}

function defaultProgress(catalog: readonly TribeOutLevel[]): TribeOutProgressSnapshot {
  const firstLevelId = catalog[0]?.id ?? "level-001";
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    levelSetVersion: CURRENT_LEVEL_SET_VERSION,
    unlockedLevelIds: [firstLevelId],
    currentLevelId: firstLevelId,
    starsByLevelId: {},
  };
}

function normalizeLevelId(value: unknown, catalog: readonly TribeOutLevel[]): LevelId | null {
  if (typeof value === "string") {
    return catalog.some(level => level.id === value) ? value : null;
  }
  if (typeof value === "number" && Number.isInteger(value)) {
    if (value >= 1 && value <= catalog.length) {
      return catalog[value - 1].id;
    }
    if (value >= 0 && value < catalog.length) {
      return catalog[value].id;
    }
  }
  return null;
}

function normalizeStars(value: unknown, catalog: readonly TribeOutLevel[]): Partial<Record<LevelId, StarRating>> {
  if (!value || typeof value !== "object") return {};
  const entries = Object.entries(value as Record<string, unknown>);
  const result: Partial<Record<LevelId, StarRating>> = {};

  for (const [rawKey, rawStars] of entries) {
    const levelId = normalizeLevelId(rawKey, catalog) ?? normalizeLevelId(Number(rawKey), catalog);
    const stars = typeof rawStars === "number" && rawStars >= 0 && rawStars <= 3 ? rawStars as StarRating : null;
    if (levelId !== null && stars !== null) {
      result[levelId] = Math.max(result[levelId] ?? 0, stars) as StarRating;
    }
  }

  return result;
}

function readJson(storage: StorageLike, key: string): unknown {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function toUniqueLevelIds(values: unknown, catalog: readonly TribeOutLevel[]): LevelId[] {
  if (!Array.isArray(values)) return [];
  const ids: LevelId[] = [];
  for (const value of values) {
    const levelId = normalizeLevelId(value, catalog);
    if (levelId !== null && !ids.includes(levelId)) {
      ids.push(levelId);
    }
  }
  return ids;
}

export function sanitizeProgress(value: unknown, catalog: readonly TribeOutLevel[] = LEVELS): TribeOutProgressSnapshot {
  const defaults = defaultProgress(catalog);
  if (!value || typeof value !== "object") return defaults;

  const raw = value as Partial<TribeOutProgressSnapshot> & { currentLevelIndex?: unknown; highestUnlockedLevel?: unknown; levelStars?: unknown };
  const rawSchemaVersion = typeof raw.schemaVersion === "number" ? raw.schemaVersion : 0;
  const rawLevelSetVersion = typeof raw.levelSetVersion === "number" ? raw.levelSetVersion : 0;
  const schemaVersion = CURRENT_SCHEMA_VERSION;
  const levelSetVersion = CURRENT_LEVEL_SET_VERSION;

  const unlockedLevelIds = toUniqueLevelIds(raw.unlockedLevelIds, catalog);
  const currentLevelId = normalizeLevelId(raw.currentLevelId, catalog)
    ?? normalizeLevelId(raw.currentLevelIndex, catalog)
    ?? normalizeLevelId(raw.highestUnlockedLevel, catalog)
    ?? defaults.currentLevelId;

  const migratedStars = rawSchemaVersion === CURRENT_SCHEMA_VERSION && rawLevelSetVersion === CURRENT_LEVEL_SET_VERSION
    ? normalizeStars(raw.starsByLevelId ?? raw.levelStars, catalog)
    : {};

  const resolvedUnlocked = unlockedLevelIds.length > 0
    ? unlockedLevelIds
    : [currentLevelId];

  return {
    schemaVersion,
    levelSetVersion,
    unlockedLevelIds: resolvedUnlocked,
    currentLevelId,
    starsByLevelId: migratedStars,
  };
}

export function migrateLegacyProgress(storage: StorageLike, catalog: readonly TribeOutLevel[] = LEVELS): TribeOutProgressSnapshot {
  const defaults = defaultProgress(catalog);
  const currentLevelIndex = readJson(storage, "tribeout_current_level");
  const highestUnlockedLevel = readJson(storage, "tribeout_highest_level");
  const legacyStars = readJson(storage, "tribeout_level_stars");

  const currentLevelId = normalizeLevelId(currentLevelIndex, catalog)
    ?? normalizeLevelId(highestUnlockedLevel, catalog)
    ?? defaults.currentLevelId;

  const unlockedLevelIds = new Set<LevelId>([currentLevelId]);
  const highestLevelId = normalizeLevelId(highestUnlockedLevel, catalog);
  if (highestLevelId !== null) {
    unlockedLevelIds.add(highestLevelId);
  }

  // Redesign scope resets old stars once.
  void legacyStars;

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    levelSetVersion: CURRENT_LEVEL_SET_VERSION,
    unlockedLevelIds: [...unlockedLevelIds],
    currentLevelId,
    starsByLevelId: {},
  };
}

export function loadTribeOutProgress(catalog: readonly TribeOutLevel[] = LEVELS): TribeOutProgressSnapshot {
  const storage = getStorage();
  if (!storage) {
    return defaultProgress(catalog);
  }

  const canonical = readJson(storage, PROGRESS_KEY);
  if (canonical) {
    return sanitizeProgress(canonical, catalog);
  }

  return migrateLegacyProgress(storage, catalog);
}

export function persistTribeOutProgress(progress: TribeOutProgressSnapshot): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    for (const key of LEGACY_KEYS) {
      storage.removeItem(key);
    }
  } catch (error) {
    console.warn("Failed to save TribeOut progress to localStorage:", error);
  }
}

export function clearTribeOutProgress(): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.removeItem(PROGRESS_KEY);
    for (const key of LEGACY_KEYS) {
      storage.removeItem(key);
    }
  } catch (error) {
    console.warn("Failed to clear TribeOut progress from localStorage:", error);
  }
}
