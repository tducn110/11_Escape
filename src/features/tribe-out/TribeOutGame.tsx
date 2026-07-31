import { useEffect, useRef, useState } from "react";
import { Pause } from "lucide-react";
import { GameShell } from "../../components/game/GameShell";
import { Button } from "../../components/shared/Button";
import { IconButton } from "../../components/shared/IconButton";
import { useMeasuredElementSize } from "../../components/game/useMeasuredElementSize";
import { TribeOutHUD } from "./TribeOutHUD";
import { TribeOutBoard } from "./TribeOutBoard";
import { TribeOutPauseOverlay } from "./TribeOutPauseOverlay";
import { WinOverlay, LoseOverlay } from "./TribeOutOverlay";
import {
  buildInitialGameState,
  buildNextLevelState,
  resetLevel,
  applyTapUnit,
  getRepresentativeHintAction,
  applyRotateUnit,
  buildWinProgressSnapshot,
} from "./gameLogic";
import { LEVELS } from "./levels";
import { loadTribeOutProgress, persistTribeOutProgress } from "./tribeOutStorage";
import { tribeOutAudio } from "./audio/tribeOutAudio";
import { getIsoBoardLayout } from "./isometric";
import type { GameState, TribeOutProgressSnapshot } from "./types";
import { LEVEL_INDEX_BY_ID } from "./levels";
import "./tribeOut.css";

const HINT_CHARGES_PER_LEVEL = 3;

interface Props {
  isActive?: boolean;
  onBoom?: () => void;
}

function resolveLevelIndexById(levelId: GameState["currentLevelId"]): number {
  return LEVEL_INDEX_BY_ID.get(levelId) ?? 0;
}

export function TribeOutGame({ isActive = true, onBoom }: Props = {}) {
  const initialProgressRef = useRef<TribeOutProgressSnapshot>(loadTribeOutProgress(LEVELS));
  const [gameState, setGameState] = useState(() => buildInitialGameState(initialProgressRef.current.currentLevelId));
  const [bumpingId, setBumpingId] = useState<string | null>(null);
  const [bumpNonce, setBumpNonce] = useState(0);
  const [hintedId, setHintedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const bumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameStateRef = useRef(gameState);
  const { ref: boardAreaRef, size: boardAreaSize } = useMeasuredElementSize<HTMLDivElement>();
  const [isVisible, setIsVisible] = useState(() => typeof document !== "undefined" ? !document.hidden : true);

  const levelIndex = resolveLevelIndexById(gameState.currentLevelId);
  const level = LEVELS[levelIndex] ?? LEVELS[0];
  const layout = getIsoBoardLayout(level.boardRows, level.boardCols, boardAreaSize.width, boardAreaSize.height);
  const hintChargesRemaining = Math.max(0, HINT_CHARGES_PER_LEVEL - gameState.hintsUsed);

  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    return () => {
      if (bumpTimerRef.current) clearTimeout(bumpTimerRef.current);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState.status !== "playing" || gameState.timeRemaining === undefined) return;
    if (!isActive || !isVisible || isPaused) return;
    if (gameState.timeRemaining <= 0) return;

    const timer = setTimeout(() => {
      setGameState(prev => {
        if (prev.status !== "playing" || prev.timeRemaining === undefined || prev.timeRemaining <= 0) {
          return prev;
        }
        const timeRemaining = Math.max(0, prev.timeRemaining - 1);
        const nextState: GameState = {
          ...prev,
          timeRemaining,
        };
        gameStateRef.current = nextState;
        return nextState;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState.status, gameState.timeRemaining, isActive, isPaused, isVisible]);

  useEffect(() => {
    if (gameState.status === "lost") {
      tribeOutAudio.playGameOver();
    }
    if (gameState.status !== "playing" && isPaused) {
      setIsPaused(false);
    }
  }, [gameState.status, isPaused]);

  const clearBumpTimer = () => {
    if (bumpTimerRef.current) {
      clearTimeout(bumpTimerRef.current);
      bumpTimerRef.current = null;
    }
  };

  const clearHintTimer = () => {
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }
  };

  const handleTap = (unitId: string) => {
    if (gameState.status !== "playing" || isPaused) return;

    if (gameState.selectedTool === "rotate") {
      const nextState = applyRotateUnit(gameState, unitId);
      gameStateRef.current = nextState;
      setGameState(nextState);
      return;
    }

    const currentState = gameStateRef.current;
    const { nextState, progressSnapshot } = applyTapUnit(unitId, currentState, initialProgressRef.current);

    gameStateRef.current = nextState;
    setGameState(nextState);

    if (currentState.status !== "won" && nextState.status === "won") {
      onBoom?.();
      tribeOutAudio.playWin();
      if (progressSnapshot) {
        initialProgressRef.current = progressSnapshot;
        persistTribeOutProgress(progressSnapshot);
      }
    }

    if (nextState.lastBumpedEntityId) {
      clearBumpTimer();
      setBumpingId(nextState.lastBumpedEntityId);
      setBumpNonce(prev => prev + 1);
      tribeOutAudio.playBump();
      bumpTimerRef.current = setTimeout(() => {
        setBumpingId(null);
        bumpTimerRef.current = null;
      }, 700);
    } else if (nextState.escapedCount > currentState.escapedCount) {
      tribeOutAudio.playEscape();
    }
  };

  const handleRestart = () => {
    clearBumpTimer();
    clearHintTimer();
    setBumpingId(null);
    setHintedId(null);
    setIsPaused(false);
    const nextState = resetLevel(gameStateRef.current);
    gameStateRef.current = nextState;
    setGameState(nextState);
  };

  const handleNextLevel = () => {
    clearBumpTimer();
    clearHintTimer();
    setBumpingId(null);
    setHintedId(null);
    setIsPaused(false);
    const currentState = gameStateRef.current;
    const nextLevelIndex = (resolveLevelIndexById(currentState.currentLevelId) + 1) % LEVELS.length;
    const nextLevelId = LEVELS[nextLevelIndex].id;
    const nextState = buildNextLevelState(currentState, nextLevelId);

    gameStateRef.current = nextState;
    setGameState(nextState);

    const nextProgress = buildWinProgressSnapshot(initialProgressRef.current, currentState.currentLevelId, currentState.stars);
    const persistedProgress = {
      ...nextProgress,
      currentLevelId: nextLevelId,
      unlockedLevelIds: [...new Set([...nextProgress.unlockedLevelIds, nextLevelId])],
    };
    initialProgressRef.current = persistedProgress;
    persistTribeOutProgress(persistedProgress);
  };

  const handleHint = () => {
    if (gameState.status !== "playing" || isPaused || hintedId !== null || hintChargesRemaining <= 0) return;

    const targetId = getRepresentativeHintAction(level, gameState.puzzle);
    if (!targetId) return;

    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }));
    gameStateRef.current = {
      ...gameStateRef.current,
      hintsUsed: gameStateRef.current.hintsUsed + 1,
    };

    setHintedId(targetId);
    clearHintTimer();
    hintTimerRef.current = setTimeout(() => {
      setHintedId(null);
      hintTimerRef.current = null;
    }, 1500);
  };

  const handleRotateToggle = () => {
    if (gameState.status !== "playing" || isPaused || gameState.puzzle.rotateChargesRemaining <= 0) return;
    setGameState(prev => {
      const nextState = {
        ...prev,
        selectedTool: prev.selectedTool === "rotate" ? "none" : "rotate",
      } as GameState;
      gameStateRef.current = nextState;
      return nextState;
    });
  };

  const handlePause = () => {
    if (gameState.status === "playing") {
      setIsPaused(true);
    }
  };



  return (
    <div className="tribe-game-root">
      <GameShell
        header={(
          <div className="tribe-game-header">
            <div className="tribe-game-header__top">
              <div className="tribe-game-header__identity" aria-label={`Thoát Khỏi Rừng, màn ${levelIndex + 1}`}>
                <div className="tribe-game-header__title">
                  Thoát Khỏi Rừng
                </div>
                <div className="tribe-game-header__level">
                  Màn {levelIndex + 1}
                </div>
              </div>
              <div className="tribe-game-header__actions">
                <IconButton label="Tạm dừng" onClick={handlePause} size={58} className="tribe-hud-icon-button">
                  <Pause size={29} fill="currentColor" strokeWidth={2.6} />
                </IconButton>
              </div>
            </div>
            <TribeOutHUD
              level={levelIndex + 1}
              lives={gameState.lives}
              maxLives={level.lives}
              escapedCount={gameState.escapedCount}
              totalUnits={gameState.totalUnits}
              timeRemaining={gameState.timeRemaining}
            />
          </div>
        )}
        notice={undefined}
        controls={
          <div className="tribe-game-tools">
            <Button
              variant="secondary"
              className="tribe-tool-button tribe-tool-button--hint"
              onClick={handleHint}
              disabled={gameState.status !== "playing" || isPaused || hintedId !== null || hintChargesRemaining <= 0}
            >
              <span className="tribe-tool-button__label">Gợi ý</span>
              <span className="tribe-tool-button__count" aria-label={`Còn ${hintChargesRemaining} gợi ý`}>
                {hintChargesRemaining}
              </span>
            </Button>
            <Button
              variant="ghost"
              className="tribe-tool-button tribe-tool-button--rotate"
              onClick={handleRotateToggle}
              disabled={gameState.status !== "playing" || isPaused || gameState.puzzle.rotateChargesRemaining <= 0}
              aria-pressed={gameState.selectedTool === "rotate"}
            >
              <span className="tribe-tool-button__label">Xoay</span>
              <span className="tribe-tool-button__count" aria-label={`Còn ${gameState.puzzle.rotateChargesRemaining} lượt xoay`}>
                {gameState.puzzle.rotateChargesRemaining}
              </span>
            </Button>
          </div>
        }
        boardAreaRef={boardAreaRef}
      >
        <div className="tribe-board-center" style={{ width: layout.stageWidth, height: layout.stageHeight }}>
          <TribeOutBoard
            entities={gameState.puzzle.entities}
            boardRows={level.boardRows}
            boardCols={level.boardCols}
            layout={layout}
            bumpingId={bumpingId}
            bumpNonce={bumpNonce}
            hintedId={hintedId}
            onTap={handleTap}
          />

          {gameState.status === "won" && (
            <WinOverlay
              level={levelIndex + 1}
              escapedCount={gameState.escapedCount}
              stars={gameState.stars}
              isLastLevel={levelIndex === LEVELS.length - 1}
              onNextLevel={handleNextLevel}
              onReplay={handleRestart}
            />
          )}
          {gameState.status === "lost" && (
            <LoseOverlay onRestart={handleRestart} />
          )}
        </div>
      </GameShell>
      {isPaused ? (
        <TribeOutPauseOverlay
          onResume={() => setIsPaused(false)}
          onRestart={handleRestart}
        />
      ) : null}
    </div>
  );
}
