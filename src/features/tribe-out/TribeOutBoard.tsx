import { TribeOutEntityComponent } from "./TribeOutEntity";
import type { TribeOutEntity } from "./types";

interface Props {
  entities: TribeOutEntity[];
  boardRows: number;
  boardCols: number;
  cellSize: number;
  bumpingId: string | null;
  bumpNonce: number;
  onTap: (id: string) => void;
}

export function TribeOutBoard({ entities, boardRows, boardCols, cellSize, bumpingId, bumpNonce, onTap }: Props) {
  const boardWidth  = boardCols * cellSize;
  const boardHeight = boardRows * cellSize;
  const pad = 10;

  return (
    <div
      style={{
        position: "relative",
        width: boardWidth,
        height: boardHeight,
        margin: "0 auto",
        flexShrink: 0,
      }}
    >
      {/* Raised green platform base (2D depth) */}
      <div
        style={{
          position: "absolute",
          left: -pad,
          top: -pad,
          width: boardWidth + pad * 2,
          height: boardHeight + pad * 2,
          borderRadius: 20,
          background: "linear-gradient(180deg, #7fae4a 0%, #6b8e3d 100%)",
          boxShadow: "0 10px 0 #4c6630, 0 16px 26px rgba(42,36,24,0.28)",
        }}
      />

      {/* Grid of grass tiles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${boardCols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${boardRows}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: boardRows * boardCols }).map((_, i) => {
          const r = Math.floor(i / boardCols);
          const c = i % boardCols;
          const light = (r + c) % 2 === 0;
          return (
            <div key={i} style={{ padding: 2, boxSizing: "border-box" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                  background: light ? "#9ac95e" : "#8dbd52",
                  boxShadow: "inset 0 -3px 0 rgba(76,102,48,0.55), inset 0 2px 3px rgba(255,255,255,0.25)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Entities */}
      {entities.map(entity => (
        <TribeOutEntityComponent
          key={entity.id}
          entity={entity}
          cellSize={cellSize}
          isBumping={bumpingId === entity.id}
          bumpNonce={bumpingId === entity.id ? bumpNonce : 0}
          onTap={onTap}
        />
      ))}
    </div>
  );
}
