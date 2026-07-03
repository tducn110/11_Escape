import { useEffect, useRef, useState } from "react";
import { GameButton } from "../../components/game/GameButton";
import { GameShell } from "../../components/game/GameShell";
import { useMeasuredElementSize } from "../../components/game/useMeasuredElementSize";
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

function getCellSize(boardRows: number, boardCols: number, availableWidth: number, availableHeight: number) {
  if (availableWidth <= 0 || availableHeight <= 0) {
    return 44;
  }

  const boardInset = 20;
  const safeWidth = Math.max(0, availableWidth - boardInset);
  const safeHeight = Math.max(0, availableHeight - boardInset);
  const byWidth = Math.floor(safeWidth / boardCols);
  const byHeight = Math.floor(safeHeight / boardRows);

  return Math.max(32, Math.min(byWidth, byHeight, 80));
}

export function TribeOutGame() {
  const [gameState, setGameState] = useState(() => {
    const savedProgress = loadTribeOutProgress();
    return buildInitialGameState(0, savedProgress.coins);
  });
  const [bumpingId, setBumpingId] = useState<string | null>(null);
  const bumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: boardAreaRef, size: boardAreaSize } = useMeasuredElementSize<HTMLDivElement>();

  const level = LEVELS[gameState.currentLevelIndex];
  const cellSize = getCellSize(level.boardRows, level.boardCols, boardAreaSize.width, boardAreaSize.height);

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
  const boardHeight = level.boardRows * cellSize;
  const shellWidth = Math.min(boardWidth + 38, 520);

  const controls = (
    <>
      <GameButton
        aria-label="Thử lại màn hiện tại"
        variant="ghost"
        onClick={handleRestart}
      >
        🔄 Thử lại
      </GameButton>

      <GameButton
        aria-label="Gợi ý, hiện chưa khả dụng"
        variant="ghost"
        disabled
        aria-disabled="true"
        title="Coming soon"
      >
        💡 Gợi ý
      </GameButton>

      {gameState.status === "won" && (
        <GameButton
          aria-label="Sang màn tiếp theo"
          variant="primary"
          onClick={handleNextLevel}
        >
          Màn Tiếp →
        </GameButton>
      )}
    </>
  );

  return (
    <div className="tribe-game-root" style={{ width: `min(100%, ${Math.max(shellWidth, 0)}px)` }}>
      <GameShell
        header={(
          <TribeOutHUD
            level={gameState.currentLevelIndex + 1}
            lives={gameState.lives}
            maxLives={level.lives}
            escapedCount={gameState.escapedCount}
            totalUnits={gameState.totalUnits}
            coins={gameState.coins}
          />
        )}
        notice={
          level.tutorialText && gameState.escapedCount === 0 && gameState.status === "playing" ? (
            <div className="tribe-tutorial-banner">{level.tutorialText}</div>
          ) : undefined
        }
        controls={controls}
        boardAreaRef={boardAreaRef}
        boardAreaStyle={{ position: "relative" }}
      >
        <div className="tribe-board-center" style={{ width: boardWidth, height: boardHeight }}>
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
      </GameShell>
    </div>
  );
}
