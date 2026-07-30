import { describe, it, expect, beforeEach, vi } from "vitest";
import { LEVELS } from "./levels";
import {
  clearTribeOutProgress,
  loadTribeOutProgress,
  migrateLegacyProgress,
  persistTribeOutProgress,
  sanitizeProgress,
  type StorageLike,
} from "./tribeOutStorage";

describe("tribeOutStorage", () => {
  let store: Record<string, string> = {};

  const storage: StorageLike = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };

  beforeEach(() => {
    store = {};
    vi.stubGlobal("window", {
      localStorage: storage,
    });
  });

  it("returns defaults when storage is empty", () => {
    const progress = loadTribeOutProgress(LEVELS);
    expect(progress.currentLevelId).toBe(LEVELS[0].id);
    expect(progress.unlockedLevelIds).toEqual([LEVELS[0].id]);
    expect(progress.starsByLevelId).toEqual({});
  });

  it("persists and reloads canonical progress", () => {
    const progress = sanitizeProgress({
      schemaVersion: 2,
      levelSetVersion: 2,
      unlockedLevelIds: [LEVELS[0].id, LEVELS[1].id],
      currentLevelId: LEVELS[1].id,
      starsByLevelId: { [LEVELS[1].id]: 3 },
    }, LEVELS);

    persistTribeOutProgress(progress);

    expect(loadTribeOutProgress(LEVELS)).toEqual(progress);
    expect(store.tribeout_progress).toBeDefined();
    expect(store.tribeout_coins).toBeUndefined();
  });

  it("migrates legacy numeric keys and resets stars once", () => {
    store.tribeout_current_level = "3";
    store.tribeout_highest_level = "9";
    store.tribeout_level_stars = JSON.stringify({ 1: 3, 4: 2 });

    const progress = migrateLegacyProgress(storage, LEVELS);
    expect(progress.currentLevelId).toBe(LEVELS[3].id);
    expect(progress.unlockedLevelIds).toEqual(LEVELS.slice(0, 10).map(level => level.id));
    expect(progress.starsByLevelId).toEqual({});
    expect(store.tribeout_progress).toBeDefined();
    expect(store.tribeout_current_level).toBeUndefined();
    expect(store.tribeout_highest_level).toBeUndefined();
  });

  it("normalizes canonical unlocks to a contiguous prefix and keeps current unlocked", () => {
    const progress = sanitizeProgress({
      schemaVersion: 2,
      levelSetVersion: 2,
      unlockedLevelIds: [LEVELS[0].id, LEVELS[3].id, "bad-id"],
      currentLevelId: LEVELS[8].id,
      starsByLevelId: { [LEVELS[0].id]: 2.5, [LEVELS[2].id]: 3, "bad-id": 2 },
    }, LEVELS);

    expect(progress.unlockedLevelIds).toEqual(LEVELS.slice(0, 4).map(level => level.id));
    expect(progress.currentLevelId).toBe(LEVELS[3].id);
    expect(progress.starsByLevelId).toEqual({ [LEVELS[2].id]: 3 });
  });

  it("clear removes canonical and legacy keys", () => {
    store.tribeout_progress = JSON.stringify({
      schemaVersion: 2,
      levelSetVersion: 2,
      unlockedLevelIds: [LEVELS[0].id],
      currentLevelId: LEVELS[0].id,
      starsByLevelId: {},
    });
    store.tribeout_coins = "10";
    store.tribeout_current_level = "1";
    store.tribeout_highest_level = "2";
    store.tribeout_level_stars = "{}";

    clearTribeOutProgress();

    expect(store).toEqual({});
  });
});
