import type { TribeOutProgressSnapshot } from "./types";

const COINS_KEY = "tribeout_coins";
const HIGHEST_LEVEL_KEY = "tribeout_highest_level";
const CURRENT_LEVEL_KEY = "tribeout_current_level";

function readNumber(key: string, fallback: number): number {
  if (typeof window === "undefined" || !window.localStorage) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  const parsedValue = rawValue === null ? fallback : Number.parseInt(rawValue, 10);
  return Number.isNaN(parsedValue) ? fallback : parsedValue;
}

export function loadTribeOutProgress(): TribeOutProgressSnapshot {
  const highest = readNumber(HIGHEST_LEVEL_KEY, 0);
  return {
    coins: readNumber(COINS_KEY, 0),
    highestUnlockedLevel: highest,
    currentLevelIndex: readNumber(CURRENT_LEVEL_KEY, highest),
  };
}

export function persistTribeOutProgress(progress: TribeOutProgressSnapshot): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(COINS_KEY, String(progress.coins));
    window.localStorage.setItem(HIGHEST_LEVEL_KEY, String(progress.highestUnlockedLevel));
    if (progress.currentLevelIndex !== undefined) {
      window.localStorage.setItem(CURRENT_LEVEL_KEY, String(progress.currentLevelIndex));
    }
  } catch (error) {
    console.warn("Failed to save TribeOut progress to localStorage:", error);
  }
}

export function clearTribeOutProgress(): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.removeItem(COINS_KEY);
    window.localStorage.removeItem(HIGHEST_LEVEL_KEY);
    window.localStorage.removeItem(CURRENT_LEVEL_KEY);
  } catch (error) {
    console.warn("Failed to clear TribeOut progress from localStorage:", error);
  }
}
