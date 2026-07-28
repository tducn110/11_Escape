import { LEVELS } from "./domain";

export function generateLevelCatalog(): string {
  return JSON.stringify(LEVELS, null, 2);
}

