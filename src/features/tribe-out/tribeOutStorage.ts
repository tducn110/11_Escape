import type { TribeOutProgressSnapshot } from "./types";

const COINS_KEY = "tribeout_coins";
const HIGHEST_LEVEL_KEY = "tribeout_highest_level";

function readNumber(key: string, fallback: number): number {
  if (typeof window === "undefined" || !window.localStorage) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  const parsedValue = rawValue === null ? fallback : Number.parseInt(rawValue, 10);
  return Number.isNaN(parsedValue) ? fallback : parsedValue;
}

export function loadTribeOutProgress(): TribeOutProgressSnapshot {
  return {
    coins: readNumber(COINS_KEY, 0),
    highestUnlockedLevel: readNumber(HIGHEST_LEVEL_KEY, 0),
  };
}

export function persistTribeOutProgress(progress: TribeOutProgressSnapshot): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(COINS_KEY, String(progress.coins));
  window.localStorage.setItem(HIGHEST_LEVEL_KEY, String(progress.highestUnlockedLevel));
}
