import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  loadTribeOutProgress,
  persistTribeOutProgress,
  clearTribeOutProgress,
} from "./tribeOutStorage";

describe("tribeOutStorage", () => {
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      },
    });
  });

  it("should return fallback values when storage is empty", () => {
    const progress = loadTribeOutProgress();
    expect(progress).toEqual({
      coins: 0,
      highestUnlockedLevel: 0,
      currentLevelIndex: 0,
    });
  });

  it("should persist and load progress correctly", () => {
    persistTribeOutProgress({
      coins: 150,
      highestUnlockedLevel: 5,
      currentLevelIndex: 3,
    });

    const progress = loadTribeOutProgress();
    expect(progress).toEqual({
      coins: 150,
      highestUnlockedLevel: 5,
      currentLevelIndex: 3,
    });
  });

  it("should clear progress correctly", () => {
    persistTribeOutProgress({
      coins: 200,
      highestUnlockedLevel: 10,
      currentLevelIndex: 8,
    });

    clearTribeOutProgress();

    const progress = loadTribeOutProgress();
    expect(progress).toEqual({
      coins: 0,
      highestUnlockedLevel: 0,
      currentLevelIndex: 0,
    });
  });
});
