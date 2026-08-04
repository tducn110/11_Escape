// Nơi đăng ký các asset (hình ảnh, âm thanh) bên ngoài.
// Nếu file không tồn tại hoặc bị lỗi tải, game sẽ tự động fallback về đồ họa SVG code-generated và âm thanh Synth.

export const IMAGE_ASSETS: Record<string, string> = {
  "villager-1": import.meta.env.BASE_URL + "assets/Characters/meo.png",
  "villager-2": import.meta.env.BASE_URL + "assets/Characters/panda.png",
  "villager-3": import.meta.env.BASE_URL + "assets/Characters/dog.png",
  "villager-4": import.meta.env.BASE_URL + "assets/Characters/bear.png",
  "villager-5": import.meta.env.BASE_URL + "assets/Characters/frog.png",
  "villager-6": import.meta.env.BASE_URL + "assets/Characters/meocanhsat.png",
  "villager-7": import.meta.env.BASE_URL + "assets/Characters/monkey.png",
  "gate-closed": import.meta.env.BASE_URL + "assets/tribe-out/mechanics/gate-hole.png",
  "gate-open": import.meta.env.BASE_URL + "assets/tribe-out/board/leaf-tile.png",
  "switch-inactive": import.meta.env.BASE_URL + "assets/tribe-out/mechanics/switch-inactive.png",
  "switch-active": import.meta.env.BASE_URL + "assets/tribe-out/mechanics/switch-active.png",
};

export const AUDIO_ASSETS: Record<string, string> = {
  // Ví dụ thêm âm thanh:
  // "click": "/assets/audio/click.mp3",
  // "escape": "/assets/audio/escape.mp3",
  // "bump": "/assets/audio/bump.mp3",
  // "win": "/assets/audio/win.mp3",
  // "gameover": "/assets/audio/gameover.mp3",
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
  "assets/tribe-out/hud/hint-button.png",
  "assets/tribe-out/hud/rotate-button.png"
];

export function preloadAllImages() {
  // Preload character & board sprites
  Object.values(IMAGE_ASSETS).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Preload overlay images
  PRELOAD_OVERLAY_IMAGES.forEach((path) => {
    const img = new Image();
    img.src = import.meta.env.BASE_URL + path;
  });
}
