import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LEVELS } from "../levels";
import type { ProgressSnapshot } from "../types";
import {
  LEGACY_PROGRESS_KEY,
  PROGRESS_KEY,
  __setStorageForTests,
  clearProgress,
  loadProgress,
  migrateLegacyProgress,
  persistProgress,
  sanitizeProgress,
  type StorageLike,
} from "./progressStorage";

class MemoryStorage implements StorageLike {
  private data = new Map<string, string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  raw(): Record<string, string> {
    return Object.fromEntries(this.data);
  }
}

const LAST_LEVEL_ID = "level-020";

let storage: MemoryStorage;

beforeEach(() => {
  storage = new MemoryStorage();
  __setStorageForTests(storage);
});

afterEach(() => {
  __setStorageForTests(null);
});

describe("sanitizeProgress", () => {
  it("returns defaults for garbage input", () => {
    const sanitized = sanitizeProgress("not an object");
    expect(sanitized.unlockedLevelIds).toEqual([LEVELS[0].id]);
    expect(sanitized.currentLevelId).toBe(LEVELS[0].id);
    expect(sanitized.starsByLevelId).toEqual({});
    expect(sanitized.tutorialSeenLevelIds).toEqual([]);
  });

  it("drops unknown level ids from a current-schema snapshot", () => {
    const sanitized = sanitizeProgress({
      schemaVersion: 3,
      levelSetVersion: 4,
      unlockedLevelIds: ["level-001", "level-083", "level-100", "level-999"],
      currentLevelId: "level-083",
      starsByLevelId: { "level-083": 3 },
    });
    expect(sanitized.unlockedLevelIds).toEqual(["level-001"]);
    expect(sanitized.currentLevelId).toBe("level-001");
    expect(sanitized.starsByLevelId).toEqual({});
  });

  it("clamps star values and drops unknown stars and out-of-range tutorial ids", () => {
    const sanitized = sanitizeProgress({
      schemaVersion: 3,
      levelSetVersion: 4,
      unlockedLevelIds: ["level-001"],
      currentLevelId: "level-001",
      starsByLevelId: { "level-002": 5, "level-099": 3, "garbage": 1 },
      tutorialSeenLevelIds: ["level-001", "level-001", "level-500"],
    });
    expect(sanitized.starsByLevelId).toEqual({ "level-002": 3 });
    expect(sanitized.tutorialSeenLevelIds).toEqual(["level-001"]);
  });
});

describe("migration", () => {
  it("migrates a legacy tribeout_progress snapshot, clamping old ids", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      LEGACY_PROGRESS_KEY,
      JSON.stringify({
        schemaVersion: 2,
        levelSetVersion: 3,
        unlockedLevelIds: ["level-001", "level-004", "level-083"],
        currentLevelId: "level-004",
        starsByLevelId: { "level-004": 2 },
        tutorialSeenLevelIds: ["level-001"],
      }),
    );

    const migrated = migrateLegacyProgress(storage);
    expect(migrated).not.toBeNull();
    expect(migrated!.currentLevelId).toBe("level-004");
    expect(migrated!.unlockedLevelIds.at(-1)).toBe(LAST_LEVEL_ID);
    expect(migrated!.starsByLevelId).toEqual({});
    expect(storage.getItem(PROGRESS_KEY)).not.toBeNull();
    expect(storage.getItem(LEGACY_PROGRESS_KEY)).not.toBeNull();
  });

  it("clamps a legacy currentLevelId beyond the catalog to the last level", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      LEGACY_PROGRESS_KEY,
      JSON.stringify({
        schemaVersion: 2,
        levelSetVersion: 3,
        unlockedLevelIds: ["level-001", "level-083"],
        currentLevelId: "level-083",
        starsByLevelId: {},
      }),
    );

    const migrated = migrateLegacyProgress(storage);
    expect(migrated!.currentLevelId).toBe(LAST_LEVEL_ID);
    expect(migrated!.unlockedLevelIds).toHaveLength(LEVELS.length);
  });

  it("returns null when no legacy snapshot exists", () => {
    const storage = new MemoryStorage();
    expect(migrateLegacyProgress(storage)).toBeNull();
  });
});

describe("loadProgress / persistProgress", () => {
  it("loads defaults when nothing is stored", () => {
    const progress = loadProgress(LEVELS);
    expect(progress.currentLevelId).toBe(LEVELS[0].id);
  });

  it("round-trips a stored progress", () => {
    const stored: ProgressSnapshot = {
      schemaVersion: 3,
      levelSetVersion: 4,
      unlockedLevelIds: [LEVELS[0].id, LEVELS[1].id],
      currentLevelId: LEVELS[1].id,
      starsByLevelId: { "level-001": 2 as const },
      tutorialSeenLevelIds: ["level-001"],
    };
    persistProgress(stored);

    const loaded = loadProgress(LEVELS);
    expect(loaded).toEqual(stored);
  });

  it("persistProgress writes through sanitization", () => {
    const broken: ProgressSnapshot = {
      schemaVersion: 3,
      levelSetVersion: 4,
      unlockedLevelIds: ["level-999" as never],
      currentLevelId: "level-999" as never,
      starsByLevelId: {},
      tutorialSeenLevelIds: [],
    };
    persistProgress(broken);
    const raw = storage.getItem(PROGRESS_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!) as ProgressSnapshot;
    expect(parsed.unlockedLevelIds).toEqual([LEVELS[0].id]);
    expect(parsed.currentLevelId).toBe(LEVELS[0].id);
  });

  it("clearProgress removes all keys", () => {
    persistProgress({
      schemaVersion: 3,
      levelSetVersion: 4,
      unlockedLevelIds: [LEVELS[0].id],
      currentLevelId: LEVELS[0].id,
      starsByLevelId: {},
      tutorialSeenLevelIds: [],
    });
    clearProgress();
    expect(storage.getItem(PROGRESS_KEY)).toBeNull();
    expect(storage.getItem(LEGACY_PROGRESS_KEY)).toBeNull();
  });
});