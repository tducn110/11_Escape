import { TribeOutEntityComponent } from "./TribeOutEntity";
import type { TribeOutEntity } from "./types";
import type { IsoBoardLayout } from "./isometric";
import { IsometricBoardBackdrop } from "./pixi/IsometricBoardBackdrop";

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
      <IsometricBoardBackdrop layout={layout} boardRows={boardRows} boardCols={boardCols} />

      {/* Entities */}
      {entities.map(entity => (
        <TribeOutEntityComponent
          key={entity.id}
          entity={entity}
          layout={layout}
          isBumping={bumpingId === entity.id}
          bumpNonce={bumpingId === entity.id ? bumpNonce : 0}
          isHinted={hintedId === entity.id}
          onTap={onTap}
        />
      ))}
    </div>
  );
}
