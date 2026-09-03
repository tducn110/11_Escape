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
        const rootUrl = import.meta.env.BASE_URL + "assets/atlas/assets-0.json";
        const sheet = await Assets.load<Spritesheet>(rootUrl);

        const registerSheet = (s: Spritesheet) => {
          if (!s || !s.textures) return;
          for (const [name, tex] of Object.entries(s.textures)) {
            textureCache.set(name, tex);
            const baseName = name.split("/").pop();
            if (baseName) textureCache.set(baseName, tex);
          }
        };

        registerSheet(sheet);
        if (Array.isArray(sheet?.linkedSheets)) {
          for (const linked of sheet.linkedSheets) {
            registerSheet(linked);
          }
        }

        // Fallback: If linked sheets were not automatically loaded, load them explicitly
        if (textureCache.size <= 4) {
          for (let i = 1; i <= 3; i++) {
            try {
              const url = import.meta.env.BASE_URL + `assets/atlas/assets-${i}.json`;
              const subSheet = await Assets.load<Spritesheet>({
                src: url,
                data: { ignoreMultiPack: true },
              });
              registerSheet(subSheet);
            } catch (err) {
              console.warn(`[Atlas] Sub-pack ${i} explicit load warning:`, err);
            }
          }
        }

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

