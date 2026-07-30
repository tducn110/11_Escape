// Nơi đăng ký các asset (hình ảnh, âm thanh) bên ngoài.
// Nếu file không tồn tại hoặc bị lỗi tải, game sẽ tự động fallback về đồ họa SVG code-generated và âm thanh Synth.

export const IMAGE_ASSETS: Record<string, string> = {
  "villager-1": "/assets/Characters/meo.png",
  "villager-2": "/assets/Characters/panda.png",
  "villager-3": "/assets/Characters/dog.png",
  "villager-4": "/assets/Characters/bear.png",
  "villager-5": "/assets/Characters/frog.png",
  "villager-6": "/assets/Characters/meocanhsat.png",
  "villager-7": "/assets/Characters/monkey.png",
  "gate-closed": "/assets/tribe-out/mechanics/gate-hole.png",
  "gate-open": "/assets/tribe-out/board/leaf-tile.png",
  "switch-inactive": "/assets/tribe-out/mechanics/switch-inactive.png",
  "switch-active": "/assets/tribe-out/mechanics/switch-active.png",
};

export const AUDIO_ASSETS: Record<string, string> = {
  // Ví dụ thêm âm thanh:
  // "click": "/assets/audio/click.mp3",
  // "escape": "/assets/audio/escape.mp3",
  // "bump": "/assets/audio/bump.mp3",
  // "win": "/assets/audio/win.mp3",
  // "gameover": "/assets/audio/gameover.mp3",
};
