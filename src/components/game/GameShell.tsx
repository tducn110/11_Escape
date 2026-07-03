import type { CSSProperties, ReactNode, MutableRefObject } from "react";

interface GameShellProps {
  header: ReactNode;
  notice?: ReactNode;
  controls: ReactNode;
  boardAreaRef: MutableRefObject<HTMLDivElement | null>;
  boardAreaStyle?: CSSProperties;
  children: ReactNode;
}

export function GameShell({
  header,
  notice,
  controls,
  boardAreaRef,
  boardAreaStyle,
  children,
}: GameShellProps) {
  return (
    <div className="game-shell">
      <div className="game-shell__header">{header}</div>
      {notice ? <div className="game-shell__notice">{notice}</div> : null}
      <div ref={boardAreaRef} className="game-shell__board-area" style={boardAreaStyle}>
        {children}
      </div>
      <div className="game-shell__controls">{controls}</div>
    </div>
  );
}
