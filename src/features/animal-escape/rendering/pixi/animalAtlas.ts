import { Assets } from "pixi.js";
import type { AnimalVisualId } from "../../types";

/**
 * Gameplay atlas manifest — the single source of truth for which frames the
 * board renders. Frame names equal visual ids; `arrow` is the direction
 * indicator drawn on top of every unit.
 *
 * The atlas (SVG source -> lossless WebP + spritesheet JSON) is built by
 * `pnpm assets:build` and verified by `pnpm assets:verify`, which checks that
 * every frame here exists in the shipped atlas and every atlas frame is
 * referenced.
 */
export const ANIMAL_FRAME_IDS = [
  "animal-cat",
  "animal-panda",
  "animal-dog",
  "animal-bear",
  "animal-frog",
  "animal-police-cat",
  "animal-monkey",
  "animal-chicken",
  "animal-squirrel",
  "animal-buffalo",
] as const satisfies readonly AnimalVisualId[];

export const ARROW_FRAME = "arrow";

export const ANIMAL_ATLAS_JSON_PATH = `${import.meta.env.BASE_URL}assets/animal-escape/generated/gameplay.json`;

let atlasPromise: ReturnType<typeof Assets.load> | null = null;

/**
 * Load the gameplay atlas exactly once and cache the promise: repeated calls
 * reuse the same decoded spritesheet (Pixi caches by URL).
 */
export function loadAnimalAtlas(): ReturnType<typeof Assets.load> {
  atlasPromise ??= Assets.load(ANIMAL_ATLAS_JSON_PATH);
  return atlasPromise;
}

export function resetAnimalAtlasCacheForTests(): void {
  atlasPromise = null;
}
