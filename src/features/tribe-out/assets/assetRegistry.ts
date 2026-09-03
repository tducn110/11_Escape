import { loadGameAtlases, IMAGE_ASSETS } from "./atlas";

export { IMAGE_ASSETS };

export const AUDIO_ASSETS: Record<string, string> = {
  // ...
};

export const PRELOAD_OVERLAY_IMAGES = [
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
];

export async function preloadAllImages(): Promise<void> {
  await loadGameAtlases();

  // Preload overlay images
  const overlayPromises = PRELOAD_OVERLAY_IMAGES.map((path) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // don't block app on missing optional overlay
      img.src = import.meta.env.BASE_URL + path;
    });
  });

  await Promise.all(overlayPromises);
}

