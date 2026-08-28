export type SaveState = "idle" | "saving" | "saved" | "failed";

export interface ResultOverlayProps {
  won: boolean;
  lossReason: "timeout" | "lives" | null;
  stars: number;
  score: number;
  hasNextLevel: boolean;
  saveState: SaveState;
  canSubmitScore: boolean;
  onSaveScore(): void;
  onNextLevel(): void;
  onRetry(): void;
}

export function ResultOverlay({
  won,
  lossReason,
  stars,
  score,
  hasNextLevel,
  saveState,
  canSubmitScore,
  onSaveScore,
  onNextLevel,
  onRetry,
}: ResultOverlayProps) {
  return (
    <div className="animal-escape-overlay">
      <div className="animal-escape-overlay__card">
        {won ? (
          <>
            <h2 className="animal-escape-overlay__title">Chạy thoát thành công!</h2>
            <div className="animal-escape-stars" aria-label={`${stars} sao`}>
              {[1, 2, 3].map(star => (
                <span key={star} className={star <= stars ? "is-earned" : ""}>
                  ⭐
                </span>
              ))}
            </div>
            <div className="animal-escape-overlay__score">Điểm: {score.toLocaleString("vi-VN")}</div>
            {canSubmitScore && saveState !== "saved" && (
              <div className="animal-escape-overlay__actions">
                <button
                  type="button"
                  className="animal-escape-button animal-escape-button--primary"
                  onClick={onSaveScore}
                  disabled={saveState === "saving"}
                >
                  {saveState === "saving" ? "Đang lưu…" : saveState === "failed" ? "Thử lưu lại" : "Lưu điểm"}
                </button>
                <p
                  className={`animal-escape-save-status${
                    saveState === "failed" ? " animal-escape-save-status--error" : ""
                  }`}
                >
                  {saveState === "failed" ? "Không lưu được điểm. Hãy thử lại." : ""}
                </p>
              </div>
            )}
            <div className="animal-escape-overlay__actions">
              {hasNextLevel ? (
                <button type="button" className="animal-escape-button animal-escape-button--primary" onClick={onNextLevel}>
                  Màn tiếp theo
                </button>
              ) : (
                <button type="button" className="animal-escape-button animal-escape-button--primary" onClick={onRetry}>
                  Chơi lại
                </button>
              )}
              <button type="button" className="animal-escape-button animal-escape-button--ghost" onClick={onRetry}>
                Chơi lại màn này
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="animal-escape-overlay__title">Thoát chưa kịp!</h2>
            <p className="animal-escape-overlay__text">
              {lossReason === "timeout"
                ? "Hết thời gian rồi. Các con vật vẫn đang chờ bạn!"
                : "Mất hết mạng rồi. Cẩn thận với đường đi bị chặn nhé!"}
            </p>
            <div className="animal-escape-overlay__actions">
              <button type="button" className="animal-escape-button animal-escape-button--primary" onClick={onRetry}>
                Chơi lại
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}