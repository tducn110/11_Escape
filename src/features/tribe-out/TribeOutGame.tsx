import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/shared/Button";
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
import { tribeOutAudio } from "./audio/tribeOutAudio";
import { IconButton } from "../../components/shared/IconButton";
import { LogoBubble } from "../../components/shared/LogoBubble";
import { Trophy, Settings, RotateCcw } from "lucide-react";
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

interface Props {
  onBoom?: () => void;
  onDashboard?: () => void;
  onSettings?: () => void;
}

export function TribeOutGame({ onBoom, onDashboard, onSettings }: Props = {}) {
  const [gameState, setGameState] = useState(() => {
    const savedProgress = loadTribeOutProgress();
    const savedLevel = savedProgress.currentLevelIndex !== undefined ? savedProgress.currentLevelIndex : savedProgress.highestUnlockedLevel;
    const startLevel = Math.max(0, Math.min(savedLevel, LEVELS.length - 1));
    return buildInitialGameState(startLevel, savedProgress.coins);
  });
  const [bumpingId, setBumpingId] = useState<string | null>(null);
  const [bumpNonce, setBumpNonce] = useState(0);
  const bumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameStateRef = useRef(gameState);
  const { ref: boardAreaRef, size: boardAreaSize } = useMeasuredElementSize<HTMLDivElement>();

  const level = LEVELS[gameState.currentLevelIndex];
  const cellSize = getCellSize(level.boardRows, level.boardCols, boardAreaSize.width, boardAreaSize.height);

  useEffect(() => {
    if (gameState.status !== "playing" || gameState.timeRemaining === undefined) return;
    
    if (gameState.timeRemaining <= 0) {
      setGameState(prev => {
        const nextState = { ...prev, status: "lost" };
        gameStateRef.current = nextState as typeof prev;
        tribeOutAudio.playGameOver();
        return nextState as typeof prev;
      });
      return;
    }

    const timer = setTimeout(() => {
      setGameState(prev => {
        if (prev.status !== "playing" || prev.timeRemaining === undefined || prev.timeRemaining <= 0) {
          return prev;
        }
        const newTime = prev.timeRemaining - 1;
        const nextState = {
          ...prev,
          timeRemaining: newTime,
          status: newTime <= 0 ? "lost" : prev.status,
        };
        gameStateRef.current = nextState as typeof prev;
        return nextState as typeof prev;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState.status, gameState.timeRemaining]);

  useEffect(() => {
    return () => {
      if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
    };
  }, []);

  const handleTap = (entityId: string) => {
    const currentState = gameStateRef.current;
    const savedProgress = loadTribeOutProgress();
    const { nextState, progressSnapshot } = applyTapUnit(entityId, currentState, savedProgress);
    
    gameStateRef.current = nextState;
    setGameState(nextState);

    if (currentState.status !== "won" && nextState.status === "won") {
      onBoom?.();
      tribeOutAudio.playWin();
    }

    if (progressSnapshot) {
      persistTribeOutProgress(progressSnapshot);
    }

    if (nextState.lastBumpedEntityId) {
      if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
      setBumpingId(nextState.lastBumpedEntityId);
      setBumpNonce(prev => prev + 1);
      tribeOutAudio.playBump();
      bumpTimerRef.current = setTimeout(() => setBumpingId(null), 700);
    } else if (nextState.escapedCount > currentState.escapedCount) {
      tribeOutAudio.playEscape();
    }
  };

  const handleRestart = () => {
    if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
    setBumpingId(null);
    const nextState = resetLevel(gameStateRef.current);
    gameStateRef.current = nextState;
    setGameState(nextState);

    const savedProgress = loadTribeOutProgress();
    persistTribeOutProgress({
      ...savedProgress,
      coins: nextState.coins,
    });
  };

  const handleNextLevel = () => {
    if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
    setBumpingId(null);
    const currentState = gameStateRef.current;
    const nextIndex = (currentState.currentLevelIndex + 1) % LEVELS.length;
    const nextState = buildNextLevelState(currentState, nextIndex);
    
    gameStateRef.current = nextState;
    setGameState(nextState);
    
    const savedProgress = loadTribeOutProgress();
    persistTribeOutProgress({
      ...savedProgress,
      currentLevelIndex: nextIndex,
    });
  };

  const boardWidth = level.boardCols * cellSize;
  const boardHeight = level.boardRows * cellSize;
  const shellWidth = boardWidth + 40;

  const controls = (
    <>
      {gameState.status === "won" && (
        <Button
          aria-label="Sang màn tiếp theo"
          variant="primary"
          onClick={handleNextLevel}
        >
          Màn Tiếp →
        </Button>
      )}
    </>
  );

  return (
    <div className="tribe-game-root" style={{ width: "100%", maxWidth: shellWidth }}>
      <GameShell
        header={(
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <LogoBubble label="T" size={34} />
                <div className="min-w-0">
                  <div className="text-[18px] font-black text-[#2a2418] leading-[1.05]">
                    Thoát Khỏi Rừng
                  </div>
                  <div className="text-[11px] font-extrabold text-[#8a7d65] tracking-[0.5px] mt-0.5">
                    11 Escape
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconButton label="Thành Tích" onClick={onDashboard} size={36}>
                  <Trophy size={18} />
                </IconButton>
                <IconButton label="Cài đặt" onClick={onSettings} size={36}>
                  <Settings size={20} />
                </IconButton>
                <IconButton label="Chơi lại" onClick={handleRestart} size={36}>
                  <RotateCcw size={18} />
                </IconButton>
              </div>
            </div>
            <TribeOutHUD
              level={gameState.currentLevelIndex + 1}
              lives={gameState.lives}
              maxLives={level.lives}
              escapedCount={gameState.escapedCount}
              totalUnits={gameState.totalUnits}
              coins={gameState.coins}
              timeRemaining={gameState.timeRemaining}
            />
          </div>
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
          bumpNonce={bumpNonce}
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
          <LoseOverlay 
            onRestart={handleRestart} 
            reason={gameState.lives <= 0 ? "lives" : "time"} 
          />
        )}
        </div>
      </GameShell>
    </div>
  );
}
