import { loadGameAtlases, IMAGE_ASSETS } from "./atlas";

export { IMAGE_ASSETS };

export function resolveAssetUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path
    .replace(/^\/+/, "")
    .replace(/^(\s*buttons\/| buttons\/)/, "buttons/")
    .replace(/^(\s*Ground\/| Ground\/)/, "Ground/");
  return `${normalizedBase}${cleanPath}`;
}

export const AUDIO_ASSETS: Record<string, string> = {
  // ...
};

export const PRELOAD_OVERLAY_IMAGES = [
  "background/Phone.png",
  "EndGameScreen/khung.png",
  "EndGameScreen/bangten.png",
  "EndGameScreen/sao.png",
  "EndGameScreen/continue.png",
  "EndGameScreen/again.png",
  "EndGameScreen/decorate.png",
  "EndGameScreen/decorate2.png",
  "loseGamescreen/khung.png",
  "loseGamescreen/Endgame.png",
  "loseGamescreen/decorate1.png",
  "loseGamescreen/again.png",
  "buttons/again.png",
  "buttons/music.png",
  "buttons/nomusic.png",
  "buttons/nosfx.png",
  "buttons/sfx.png",
  "assets/tribe-out/hud/hint-button.png",
  "assets/tribe-out/hud/rotate-button.png",
  "assets/tribe-out/board/leaf-tile.png",
];

export async function preloadAllImages(): Promise<void> {
  await loadGameAtlases().catch((err) => {
    console.warn("[AssetRegistry] Game atlases load notice:", err);
  });

  // Preload overlay images
  const overlayPromises = PRELOAD_OVERLAY_IMAGES.map((path) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // don't block app on missing optional overlay
      img.src = resolveAssetUrl(path);
    });
  });

  await Promise.all(overlayPromises);
}


