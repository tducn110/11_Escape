import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateLevels } from "../catalog";

const levels = generateLevels();
const output = [
  'import type { TribeOutLevel } from "./types";',
  "",
  `export const LEVELS: readonly TribeOutLevel[] = ${JSON.stringify(levels, null, 2)};`,
  "",
  "export const LEVEL_SET_VERSION = 2;",
  'export const LEVEL_BY_ID: ReadonlyMap<TribeOutLevel["id"], TribeOutLevel> = new Map(LEVELS.map(level => [level.id, level] as const));',
  'export const LEVEL_INDEX_BY_ID: ReadonlyMap<TribeOutLevel["id"], number> = new Map(LEVELS.map((level, index) => [level.id, index] as const));',
  "",
].join("\n");

writeFileSync(resolve(process.cwd(), "src/features/tribe-out/levels.ts"), output);
console.log(JSON.stringify({ wrote: "src/features/tribe-out/levels.ts", levels: levels.length }, null, 2));
