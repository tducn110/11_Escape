export interface BootErrorOverlayProps {
  onRetry(): void;
}

/**
 * Shown when the gameplay atlas fails to load. Assets are essential here:
 * starting the game without its textures would render placeholder shapes, so
 * the player gets a clear error and a retry instead of a broken board.
 */
export function BootErrorOverlay({ onRetry }: BootErrorOverlayProps) {
  return (
    <div className="animal-escape-overlay">
      <div className="animal-escape-overlay__card">
        <h2 className="animal-escape-overlay__title">Không tải được trò chơi</h2>
        <p className="animal-escape-overlay__text">
          Có lỗi khi tải tài nguyên. Hãy kiểm tra kết nối và thử lại.
        </p>
        <div className="animal-escape-overlay__actions">
          <button type="button" className="animal-escape-button animal-escape-button--primary" onClick={onRetry}>
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );
}
