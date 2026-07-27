// Nơi đăng ký các asset (hình ảnh, âm thanh) bên ngoài.
// Nếu file không tồn tại hoặc bị lỗi tải, game sẽ tự động fallback về đồ họa SVG code-generated và âm thanh Synth.

export const IMAGE_ASSETS: Record<string, string> = {
  // Ví dụ thêm hình ảnh: 
  // "villager-1": "/assets/images/tiger.png",
  // "rock": "/assets/images/rock.png",
};

export const AUDIO_ASSETS: Record<string, string> = {
  // Ví dụ thêm âm thanh:
  // "click": "/assets/audio/click.mp3",
  // "escape": "/assets/audio/escape.mp3",
  // "bump": "/assets/audio/bump.mp3",
  // "win": "/assets/audio/win.mp3",
  // "gameover": "/assets/audio/gameover.mp3",
};
