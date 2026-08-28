import { useCallback, useEffect, useRef, useState } from "react";
import type { EntityId, GameHint, GameState, LevelId, ProgressSnapshot } from "../types";
import {
  applyRotateUnit,
  applyTapUnit,
  buildInitialGameState,
  buildNextLevelState,
  getLevel,
  getLevelIndex,
  hasSeenTutorial,
  markTutorialSeen,
  pauseGame,
  resetLevel,
  resumeGame,
  tickTimer,
  useHint,
} from "../core/gameLogic";
import { loadProgress, persistProgress } from "../persistence/progressStorage";
import { animalEscapeAudio } from "../audio/animalEscapeAudio";
import { winkGame, type WinkRound } from "../../../integrations/wink/client";
import { AnimalEscapeHud } from "./AnimalEscapeHud";
import { TutorialOverlay } from "./TutorialOverlay";
import { PauseOverlay } from "./PauseOverlay";
import { ResultOverlay, type SaveState } from "./ResultOverlay";
import { createPixiApp, type PixiAppHandle } from "../rendering/pixi/createPixiApp";
import { AnimalEscapeScene } from "../rendering/pixi/AnimalEscapeScene";
import { loadAnimalAtlas } from "../rendering/pixi/animalAtlas";
import { BootErrorOverlay } from "./BootErrorOverlay";
import "./animalEscape.css";

const MAX_HINTS = 3;
const HINT_VISIBLE_MS = 2600;

export interface AnimalEscapeGameProps {
  initialLevelId: LevelId;
  onProgressChange?(snapshot: ProgressSnapshot): void;
}

type Overlay = "tutorial" | "paused" | "won" | "lost" | null;

export function AnimalEscapeGame({ initialLevelId, onProgressChange }: AnimalEscapeGameProps) {
  const [game, setGame] = useState<GameState>(() => buildInitialGameState(initialLevelId));
  const [progress, setProgress] = useState<ProgressSnapshot>(() => loadProgress());
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [rotateMode, setRotateMode] = useState(false);
  const [hint, setHint] = useState<GameHint | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [bootState, setBootState] = useState<"loading" | "ready" | "error">("loading");
  const [bootAttempt, setBootAttempt] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<AnimalEscapeScene | null>(null);
  const appRef = useRef<PixiAppHandle | null>(null);
  const gameRef = useRef(game);
  const progressRef = useRef(progress);
  const overlayRef = useRef<Overlay>(null);
  const roundRef = useRef<WinkRound>(winkGame.startRound());
  const submittedScoreKeysRef = useRef<Set<string>>(new Set());
  const hintTimerRef = useRef<number | null>(null);
  const lifecycleStopRef = useRef<(() => void) | null>(null);

  gameRef.current = game;
  progressRef.current = progress;
  overlayRef.current = overlay;

  const updateOverlay = useCallback((next: Overlay) => {
    overlayRef.current = next;
    setOverlay(next);
  }, []);

  /** Each semantic round (first level, restart, next level) gets a fresh round id. */
  const startNewRound = useCallback(() => {
    roundRef.current = winkGame.startRound();
    submittedScoreKeysRef.current = new Set();
  }, []);

  const syncProgress = useCallback((next: ProgressSnapshot) => {
    setProgress(next);
    persistProgress(next);
    onProgressChange?.(next);
  }, [onProgressChange]);

  /**
   * Boot sequence: the gameplay atlas (and its GPU upload) must be ready
   * before the first frame renders, otherwise the board would stutter on
   * texture decode mid-game. A failed load blocks play with a retry screen —
   * assets are essential, not decorative.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    animalEscapeAudio.preload();
    animalEscapeAudio.unlockFromGesture();
    startNewRound();
    setBootState("loading");

    const boot = async () => {
      try {
        const spritesheet = (await loadAnimalAtlas()) as unknown as import("pixi.js").Spritesheet;
        if (cancelled) return;
        const textures: Readonly<Record<string, import("pixi.js").Texture>> = { ...spritesheet.textures };

        const app = await createPixiApp(container, () => sceneRef.current?.redraw());
        if (cancelled) {
          app.destroy();
          return;
        }
        appRef.current = app;
        sceneRef.current = new AnimalEscapeScene(
          app,
          { onTapCell: (row, col) => handleTapCell(row, col) },
          textures,
        );
        setBootState("ready");
      } catch {
        if (!cancelled) {
          setBootState("error");
        }
      }
    };
    void boot();

    return () => {
      cancelled = true;
      sceneRef.current?.destroy();
      sceneRef.current = null;
      appRef.current?.destroy();
      appRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootAttempt]);

  /** Timer loop — one second ticks while playing and not under an overlay. */
  useEffect(() => {
    const interval = window.setInterval(() => {
      const current = gameRef.current;
      if (current.phase !== "playing" || overlayRef.current !== null) return;
      const next = tickTimer(current);
      if (next.phase === "lost") {
        animalEscapeAudio.playGameOver();
        updateOverlay("lost");
      }
      setGame(next);
    }, 1000);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Wink lifecycle: parent pause/mute must never fight the player's prefs. */
  useEffect(() => {
    lifecycleStopRef.current = winkGame.bindLifecycle({
      onPause: () => {
        const current = gameRef.current;
        if (current.phase !== "playing") return;
        setGame(pauseGame(current));
        // A tutorial that is being read must not be replaced by the pause card;
        // the paused phase already freezes its timer.
        if (overlayRef.current === "tutorial") return;
        updateOverlay("paused");
      },
      onResume: () => {
        const current = gameRef.current;
        if (current.phase === "paused") {
          setGame(resumeGame(current));
          if (overlayRef.current === "paused") {
            updateOverlay(null);
          }
        }
      },
      onMute: () => animalEscapeAudio.setPlatformMuted(true),
      onUnmute: () => animalEscapeAudio.setPlatformMuted(false),
    });
    return () => {
      lifecycleStopRef.current?.();
      lifecycleStopRef.current = null;
    };
  }, [updateOverlay]);

  /** First level may need the tutorial. */
  useEffect(() => {
    const currentProgress = progressRef.current;
    if (!hasSeenTutorial(currentProgress, initialLevelId)) {
      updateOverlay("tutorial");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pushSnapshot = useCallback(() => {
    sceneRef.current?.setSnapshot({
      level: getLevel(gameRef.current.currentLevelId),
      puzzle: gameRef.current.puzzle,
      rotateMode,
      hint,
      lastAction: null,
      actionSequence: Date.now(),
    });
  }, [rotateMode, hint]);

  useEffect(() => {
    pushSnapshot();
  }, [pushSnapshot, game]);

  useEffect(() => {
    if (hint === null) return undefined;
    hintTimerRef.current = window.setTimeout(() => {
      setHint(null);
    }, HINT_VISIBLE_MS);
    return () => {
      if (hintTimerRef.current !== null) {
        window.clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    };
  }, [hint]);

  function handleTapCell(row: number, col: number): void {
    const current = gameRef.current;
    if (current.phase !== "playing" || overlayRef.current !== null) return;

    const entity = current.puzzle.entities
      .filter(e => {
        if (e.type === "unit" && e.escaped) return false;
        return row >= e.row && row < e.row + e.height && col >= e.col && col < e.col + e.width;
      })
      .sort((a, b) => (a.type === "unit" ? -1 : 1) - (b.type === "unit" ? -1 : 1))
      .at(0);

    if (!entity) return;

    if (entity.type === "unit") {
      if (rotateMode) {
        if (current.puzzle.rotateChargesRemaining <= 0) {
          setRotateMode(false);
          return;
        }
        const next = applyRotateUnit(current, entity.id);
        if (next !== current) {
          animalEscapeAudio.playRotate();
          setGame(next);
        }
        setRotateMode(false);
        return;
      }

      const outcome = applyTapUnit(entity.id as EntityId, current, progressRef.current);
      const next = outcome.nextState;
      if (next === current) return;

      if (outcome.progressSnapshot) {
        syncProgress(outcome.progressSnapshot);
      }

      const escaped = outcome.progressSnapshot !== null || next.escapedCount > current.escapedCount;
      if (escaped) {
        animalEscapeAudio.playEscape();
        sceneRef.current?.playExitAnimation(entity);
      } else {
        animalEscapeAudio.playBump();
        sceneRef.current?.playBump();
      }

      if (next.phase === "won") {
        winkGame.completeRound(roundRef.current);
        animalEscapeAudio.playWin();
        updateOverlay("won");
      }
      setGame(next);
    }
  }

  const handleUseHint = useCallback(() => {
    const current = gameRef.current;
    if (current.phase !== "playing" || overlayRef.current !== null || current.hintsUsed >= MAX_HINTS) return;
    const result = useHint(current);
    if (!result.hint) return;
    animalEscapeAudio.playHint();
    setGame(result.state);
    setHint(result.hint);
  }, []);

  const handleToggleRotateMode = useCallback(() => {
    if (overlayRef.current !== null) return;
    setRotateMode(prev => !prev);
  }, []);

  const handlePause = useCallback(() => {
    const current = gameRef.current;
    if (current.phase !== "playing" || overlayRef.current !== null) return;
    setGame(pauseGame(current));
    updateOverlay("paused");
  }, [updateOverlay]);

  const handleResume = useCallback(() => {
    setGame(prev => resumeGame(prev));
    updateOverlay(null);
  }, [updateOverlay]);

  const handleRestart = useCallback(() => {
    const current = gameRef.current;
    const next = resetLevel(current);
    startNewRound();
    setGame(next);
    setRotateMode(false);
    setHint(null);
    setSaveState("idle");
    updateOverlay(null);
  }, [startNewRound, updateOverlay]);

  const handleNextLevel = useCallback(() => {
    const current = gameRef.current;
    const next = buildNextLevelState(current);
    if (!next) {
      updateOverlay(null);
      return;
    }
    startNewRound();
    const nextProgress = progressRef.current;
    const levelId = next.currentLevelId;
    if (!hasSeenTutorial(nextProgress, levelId)) {
      updateOverlay("tutorial");
    } else {
      updateOverlay(null);
    }
    setGame(next);
    setRotateMode(false);
    setHint(null);
    setSaveState("idle");
  }, [startNewRound, updateOverlay]);

  const handleDismissTutorial = useCallback(() => {
    const levelId = gameRef.current.currentLevelId;
    syncProgress(markTutorialSeen(progressRef.current, levelId));
    updateOverlay(null);
  }, [syncProgress, updateOverlay]);

  const handleSaveScore = useCallback(() => {
    const current = gameRef.current;
    if (current.phase !== "won" || !winkGame.canSubmitScore) return;
    // Exactly one submit per round + level pair: retries are allowed only
    // after a failed attempt, never a second submit for the same result.
    const scoreKey = `${roundRef.current.roundId}:${current.currentLevelId}`;
    if (submittedScoreKeysRef.current.has(scoreKey)) return;
    setSaveState("saving");
    winkGame
      .submitFinalScore({
        score: current.score,
        gameMode: `animal-escape-${getLevelIndex(current.currentLevelId) + 1}`,
      })
      .then(() => {
        submittedScoreKeysRef.current.add(scoreKey);
        setSaveState("saved");
      })
      .catch(() => setSaveState("failed"));
  }, []);

  const handleToggleMusic = useCallback(() => {
    setMusicEnabled(prev => {
      animalEscapeAudio.setMusicEnabled(!prev);
      return !prev;
    });
  }, []);

  const handleToggleSfx = useCallback(() => {
    setSfxEnabled(prev => {
      animalEscapeAudio.setSfxEnabled(!prev);
      return !prev;
    });
  }, []);

  const handleRetryBoot = useCallback(() => {
    setBootAttempt(attempt => attempt + 1);
  }, []);

  const level = getLevel(game.currentLevelId);
  const levelIndex = getLevelIndex(game.currentLevelId);
  const timeDanger = game.timeRemaining <= Math.max(5, Math.ceil(level.timeLimit * 0.2));

  return (
    <div className="animal-escape-root">
      <AnimalEscapeHud
        levelIndex={levelIndex}
        phase={game.phase}
        timeRemaining={game.timeRemaining}
        lives={game.lives}
        maxLives={game.maxLives}
        rotateChargesRemaining={game.puzzle.rotateChargesRemaining}
        rotateMode={rotateMode}
        hintsUsed={game.hintsUsed}
        maxHints={MAX_HINTS}
        timeDanger={timeDanger}
        onToggleRotateMode={handleToggleRotateMode}
        onUseHint={handleUseHint}
        onPause={handlePause}
      />

      <div className="animal-escape-board-container">
        <div ref={containerRef} className="animal-escape-board-canvas" />
        {rotateMode && game.puzzle.rotateChargesRemaining > 0 && (
          <div className="animal-escape-rotate-banner">Chạm vào con vật để xoay hướng</div>
        )}

        {overlay === "tutorial" && (
          <TutorialOverlay text={level.tutorialText ?? "Chạm vào con vật để nó chạy thoát khỏi khu rừng!"} onDismiss={handleDismissTutorial} />
        )}

        {bootState === "error" && <BootErrorOverlay onRetry={handleRetryBoot} />}

        {overlay === "paused" && (
          <PauseOverlay
            musicEnabled={musicEnabled}
            sfxEnabled={sfxEnabled}
            onToggleMusic={handleToggleMusic}
            onToggleSfx={handleToggleSfx}
            onResume={handleResume}
            onRestart={handleRestart}
          />
        )}

        {overlay === "won" && (
          <ResultOverlay
            won
            lossReason={null}
            stars={game.stars}
            score={game.score}
            hasNextLevel={buildNextLevelState(game) !== null}
            saveState={saveState}
            canSubmitScore={winkGame.canSubmitScore}
            onSaveScore={handleSaveScore}
            onNextLevel={handleNextLevel}
            onRetry={handleRestart}
          />
        )}

        {overlay === "lost" && (
          <ResultOverlay
            won={false}
            lossReason={game.lossReason}
            stars={0}
            score={0}
            hasNextLevel={false}
            saveState="idle"
            canSubmitScore={false}
            onSaveScore={handleSaveScore}
            onNextLevel={handleNextLevel}
            onRetry={handleRestart}
          />
        )}
      </div>
    </div>
  );
}