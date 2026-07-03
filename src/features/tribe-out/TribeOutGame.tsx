import { useState, useEffect, useCallback, useRef } from "react";
import { TribeOutHUD } from "./TribeOutHUD";
import { TribeOutBoard } from "./TribeOutBoard";
import { WinOverlay, LoseOverlay } from "./TribeOutOverlay";
import {
  buildInitialGameState,
  buildNextLevelState,
  resetLevel,
  applyTapUnit,
} from "./gameLogic";
import { LEVELS } from "./levels";
import { loadTribeOutProgress, persistTribeOutProgress } from "./tribeOutStorage";
import "./tribeOut.css";

function useCellSize(boardRows: number, boardCols: number) {
  const compute = useCallback(() => {
    const hPad = 48;
    const vPad = 210; // HUD + controls + shell padding
    const maxW = Math.min(window.innerWidth  - hPad, 500);
    const maxH = Math.min(window.innerHeight - vPad, 520);
    const byW  = Math.floor(maxW / boardCols);
    const byH  = Math.floor(maxH / boardRows);
    return Math.max(44, Math.min(byW, byH, 80));
  }, [boardRows, boardCols]);

  const [cellSize, setCellSize] = useState(compute);

  useEffect(() => {
    const handler = () => setCellSize(compute());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [compute]);

  return cellSize;
}

export function TribeOutGame() {
  const [gameState, setGameState] = useState(() => {
    const savedProgress = loadTribeOutProgress();
    return buildInitialGameState(0, savedProgress.coins);
  });
  const [bumpingId, setBumpingId] = useState<string | null>(null);
  const bumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const level = LEVELS[gameState.currentLevelIndex];
  const cellSize = useCellSize(level.boardRows, level.boardCols);

  const handleTap = (entityId: string) => {
    const savedProgress = loadTribeOutProgress();
    const { nextState, progressSnapshot } = applyTapUnit(entityId, gameState, savedProgress);
    setGameState(nextState);

    if (progressSnapshot) {
      persistTribeOutProgress(progressSnapshot);
    }

    if (nextState.lastBumpedEntityId) {
      if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
      setBumpingId(nextState.lastBumpedEntityId);
      bumpTimerRef.current = setTimeout(() => setBumpingId(null), 700);
    }
  };

  const handleRestart = () => {
    if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
    setBumpingId(null);
    setGameState(resetLevel(gameState));
  };

  const handleNextLevel = () => {
    if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
    setBumpingId(null);
    const nextIndex = (gameState.currentLevelIndex + 1) % LEVELS.length;
    setGameState(buildNextLevelState(gameState, nextIndex));
  };

  const boardWidth = level.boardCols * cellSize;
  const shellPad = 16;

  return (
    <div
      className="tribe-shell"
      style={{
        width: Math.min(boardWidth + shellPad * 2 + 6, window.innerWidth - 24),
        maxWidth: 520,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* HUD */}
      <TribeOutHUD
        level={gameState.currentLevelIndex + 1}
        lives={gameState.lives}
        maxLives={level.lives}
        escapedCount={gameState.escapedCount}
        totalUnits={gameState.totalUnits}
        coins={gameState.coins}
      />

      {/* Tutorial hint */}
      {level.tutorialText && gameState.escapedCount === 0 && gameState.status === "playing" && (
        <div
          style={{
            background: "rgba(232,116,50,0.10)",
            borderBottom: "1px solid rgba(232,116,50,0.20)",
            padding: "7px 16px",
            textAlign: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#e87432",
            fontFamily: "Be Vietnam Pro, sans-serif",
          }}
        >
          {level.tutorialText}
        </div>
      )}

      {/* Board area */}
      <div
        style={{
          padding: `${shellPad}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <TribeOutBoard
          entities={gameState.entities}
          boardRows={level.boardRows}
          boardCols={level.boardCols}
          cellSize={cellSize}
          bumpingId={bumpingId}
          onTap={handleTap}
        />

        {/* Overlays */}
        {gameState.status === "won" && (
          <WinOverlay
            level={gameState.currentLevelIndex + 1}
            escapedCount={gameState.escapedCount}
            coinsEarned={gameState.coinsEarnedThisLevel}
            isLastLevel={gameState.currentLevelIndex === LEVELS.length - 1}
            onNextLevel={handleNextLevel}
            onReplay={handleRestart}
          />
        )}
        {gameState.status === "lost" && (
          <LoseOverlay onRestart={handleRestart} />
        )}
      </div>

      {/* Bottom controls */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "10px 16px 14px",
          borderTop: "1.5px solid rgba(138,125,101,0.15)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="tribe-btn-ghost"
          onClick={handleRestart}
          style={{ padding: "10px 22px", fontSize: 14 }}
        >
          🔄 Thử lại
        </button>

        <button
          className="tribe-btn-ghost"
          disabled
          style={{ padding: "10px 22px", fontSize: 14 }}
          title="Coming soon"
        >
          💡 Gợi ý
        </button>

        {gameState.status === "won" && (
          <button
            className="tribe-btn-primary"
            onClick={handleNextLevel}
            style={{ padding: "10px 22px", fontSize: 14 }}
          >
            Màn Tiếp →
          </button>
        )}
      </div>
    </div>
  );
}
