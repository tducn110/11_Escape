import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Trophy, Settings, RotateCcw } from "lucide-react";
import { GameShell } from "../../components/game/GameShell";
import { Button } from "../../components/shared/Button";
import { IconButton } from "../../components/shared/IconButton";
import { useMeasuredElementSize } from "../../components/game/useMeasuredElementSize";
import { TribeOutHUD } from "./TribeOutHUD";
import { TribeOutBoard } from "./TribeOutBoard";
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

const HUD_ACTION_STYLE: CSSProperties = {
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(25, 77, 65, 0.86)",
  color: "#ffffff",
  boxShadow: "0 8px 18px rgba(20, 86, 58, 0.24)",
  backdropFilter: "blur(8px)",
};

interface Props {
  isActive?: boolean;
  onBoom?: () => void;
  onDashboard?: () => void;
  onSettings?: () => void;
}

function resolveLevelIndexById(levelId: GameState["currentLevelId"]): number {
  return LEVEL_INDEX_BY_ID.get(levelId) ?? 0;
}

export function TribeOutGame({ isActive = true, onBoom, onDashboard, onSettings }: Props = {}) {
  const initialProgressRef = useRef<TribeOutProgressSnapshot>(loadTribeOutProgress(LEVELS));
  const [gameState, setGameState] = useState(() => buildInitialGameState(initialProgressRef.current.currentLevelId));
  const [bumpingId, setBumpingId] = useState<string | null>(null);
  const [bumpNonce, setBumpNonce] = useState(0);
  const [hintedId, setHintedId] = useState<string | null>(null);
  const bumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameStateRef = useRef(gameState);
  const { ref: boardAreaRef, size: boardAreaSize } = useMeasuredElementSize<HTMLDivElement>();
  const [isVisible, setIsVisible] = useState(() => typeof document !== "undefined" ? !document.hidden : true);

  const levelIndex = resolveLevelIndexById(gameState.currentLevelId);
  const level = LEVELS[levelIndex] ?? LEVELS[0];
  const layout = getIsoBoardLayout(level.boardRows, level.boardCols, boardAreaSize.width, boardAreaSize.height);

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
    if (!isActive || !isVisible) return;
    if (gameState.timeRemaining <= 0) return;

    const timer = setTimeout(() => {
      setGameState(prev => {
        if (prev.status !== "playing" || prev.timeRemaining === undefined || prev.timeRemaining <= 0) {
          return prev;
        }
        const nextState = {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        };
        gameStateRef.current = nextState;
        return nextState;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState.status, gameState.timeRemaining, isActive, isVisible]);

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
    if (gameState.status !== "playing") return;

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
    const nextState = resetLevel(gameStateRef.current);
    gameStateRef.current = nextState;
    setGameState(nextState);
  };

  const handleNextLevel = () => {
    clearBumpTimer();
    clearHintTimer();
    setBumpingId(null);
    setHintedId(null);
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
    if (gameState.status !== "playing" || hintedId !== null) return;

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
    if (gameState.status !== "playing" || gameState.puzzle.rotateChargesRemaining <= 0) return;
    setGameState(prev => {
      const nextState = {
        ...prev,
        selectedTool: prev.selectedTool === "rotate" ? "none" : "rotate",
      } as GameState;
      gameStateRef.current = nextState;
      return nextState;
    });
  };

  return (
    <div className="tribe-game-root">
      <GameShell
        header={(
          <div className="tribe-game-header">
            <div className="tribe-game-header__top">
              <div className="tribe-game-header__identity">
                <div className="tribe-game-header__title">
                  Thoát Khỏi Rừng
                </div>
                <div className="tribe-game-header__level">
                  Màn {levelIndex + 1} · 11 Escape
                </div>
              </div>
              <div className="tribe-game-header__actions">
                <IconButton label="Thành Tích" onClick={onDashboard} size={42} style={HUD_ACTION_STYLE}>
                  <Trophy size={19} />
                </IconButton>
                <IconButton label="Cài đặt" onClick={onSettings} size={42} style={HUD_ACTION_STYLE}>
                  <Settings size={20} />
                </IconButton>
                <IconButton label="Chơi lại" onClick={handleRestart} size={42} style={HUD_ACTION_STYLE}>
                  <RotateCcw size={19} />
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
        notice={
          level.tutorialText && gameState.escapedCount === 0 && gameState.status === "playing" ? (
            <div className="tribe-tutorial-banner">{level.tutorialText}</div>
          ) : undefined
        }
        controls={
          <div style={{ padding: "0 16px", display: "flex", justifyContent: "center", gap: 16 }}>
            <Button variant="secondary" onClick={handleHint} disabled={gameState.status !== "playing" || hintedId !== null}>
              💡 Gợi ý
            </Button>
            <Button
              variant={gameState.selectedTool === "rotate" ? "primary" : "ghost"}
              onClick={handleRotateToggle}
              disabled={gameState.status !== "playing" || gameState.puzzle.rotateChargesRemaining <= 0}
            >
              🔄 Xoay ({gameState.puzzle.rotateChargesRemaining})
            </Button>
          </div>
        }
        boardAreaRef={boardAreaRef}
        boardAreaStyle={{ position: "relative" }}
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
    </div>
  );
}
