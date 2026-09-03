import type { TribeOutEntity } from "./types";
import type { IsoBoardLayout } from "./isometric";
import { PixiGameRenderer } from "./pixi/PixiGameRenderer";

interface Props {
  entities: readonly TribeOutEntity[];
  boardRows: number;
  boardCols: number;
  layout: IsoBoardLayout;
  bumpingId: string | null;
  bumpNonce: number;
  hintedId?: string | null;
  onTap: (id: string) => void;
}

export function TribeOutBoard({ entities, boardRows, boardCols, layout, bumpingId, bumpNonce, hintedId, onTap }: Props) {
  const boardWidth = layout.stageWidth;
  const boardHeight = layout.stageHeight;

  return (
    <div
      role="group"
      aria-label={`Bàn chơi ${boardRows} hàng ${boardCols} cột`}
      style={{
        position: "relative",
        width: boardWidth,
        height: boardHeight,
        margin: "0 auto",
        flexShrink: 0,
        isolation: "isolate",
      }}
    >
      <PixiGameRenderer
        layout={layout}
        boardRows={boardRows}
        boardCols={boardCols}
        entities={entities}
        bumpingId={bumpingId}
        bumpNonce={bumpNonce}
        hintedId={hintedId}
        onTap={onTap}
      />
    </div>
  );
}
