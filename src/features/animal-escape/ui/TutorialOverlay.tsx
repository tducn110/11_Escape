export interface TutorialOverlayProps {
  text: string;
  onDismiss(): void;
}

export function TutorialOverlay({ text, onDismiss }: TutorialOverlayProps) {
  return (
    <div className="animal-escape-overlay">
      <div className="animal-escape-overlay__card">
        <h2 className="animal-escape-overlay__title">Hướng dẫn</h2>
        <p className="animal-escape-overlay__text">{text}</p>
        <div className="animal-escape-overlay__actions">
          <button type="button" className="animal-escape-button animal-escape-button--primary" onClick={onDismiss}>
            Hiểu rồi, bắt đầu!
          </button>
        </div>
      </div>
    </div>
  );
}