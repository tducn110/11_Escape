import { Assets, Spritesheet, Texture } from "pixi.js";

export const IMAGE_ASSETS: Record<string, string> = {
  "villager-1": "Characters/meo.png",
  "villager-2": "Characters/panda.png",
  "villager-3": "Characters/dog.png",
  "villager-4": "Characters/bear.png",
  "villager-5": "Characters/frog.png",
  "villager-6": "Characters/meocanhsat.png",
  "villager-7": "Characters/monkey.png",
  "gate-closed": "tribe-out/mechanics/gate-hole.png",
  "gate-open": "tribe-out/board/leaf-tile.png",
  "switch-inactive": "tribe-out/mechanics/switch-inactive.png",
  "switch-active": "tribe-out/mechanics/switch-active.png",
};

const textureCache = new Map<string, Texture>();
let loadPromise: Promise<void> | null = null;
let isLoaded = false;

export function isGameAtlasesLoaded(): boolean {
  return isLoaded;
}

export function loadGameAtlases(): Promise<void> {
  if (!loadPromise) {
    loadPromise = (async () => {
      try {
        const registerSheet = (s: any) => {
          if (!s) return;
          const sheetObj = (s.textures ? s : Object.values(s)[0]) as Spritesheet | undefined;
          if (!sheetObj?.textures) return;
          for (const [name, tex] of Object.entries(sheetObj.textures)) {
            textureCache.set(name, tex);
            const baseName = name.split("/").pop();
            if (baseName) textureCache.set(baseName, tex);
          }
        };

        // Explicitly load all 4 multipack sheets (0 to 3) to guarantee all textures are loaded
        const packIndices = [0, 1, 2, 3];
        await Promise.all(
          packIndices.map(async (i) => {
            try {
              const url = import.meta.env.BASE_URL + `assets/atlas/assets-${i}.json`;
              const sheet = await Assets.load<Spritesheet>({
                src: url,
                data: { ignoreMultiPack: true },
              });
              registerSheet(sheet);
            } catch (err) {
              console.warn(`[Atlas] Atlas pack ${i} load warning:`, err);
            }
          })
        );

        // Register aliases for game entities
        for (const [alias, target] of Object.entries(IMAGE_ASSETS)) {
          const tex = textureCache.get(target) || Assets.get(target);
          if (tex) {
            textureCache.set(alias, tex);
            try {
              Assets.cache.set(alias, tex);
            } catch {
              // ignore if already in cache
            }
          }
        }

        isLoaded = true;
      } catch (err) {
        console.error("[Atlas] Failed to load game atlases:", err);
        throw err;
      }
    })();
  }
  return loadPromise;
}

export function getTexture(frameNameOrKey: string): Texture | undefined {
  // Direct map hit
  let tex = textureCache.get(frameNameOrKey);
  if (tex) return tex;

  // Lookup in alias table
  const mapped = IMAGE_ASSETS[frameNameOrKey];
  if (mapped) {
    tex = textureCache.get(mapped) || Assets.get(mapped);
    if (tex) {
      textureCache.set(frameNameOrKey, tex);
      return tex;
    }
  }

  // Pixi cache hit
  tex = Assets.get(frameNameOrKey);
  if (tex) {
    textureCache.set(frameNameOrKey, tex);
    return tex;
  }

  // Try with .png
  if (!frameNameOrKey.endsWith(".png")) {
    const withPng = frameNameOrKey + ".png";
    tex = textureCache.get(withPng) || Assets.get(withPng);
    if (tex) {
      textureCache.set(frameNameOrKey, tex);
      return tex;
    }
  }

  console.warn(`[Atlas] Texture not found for: "${frameNameOrKey}"`);
  return undefined;
}

