import { useState, useRef, useCallback, useEffect } from "react";
import { TribeOutGame } from "../features/tribe-out/TribeOutGame";
import { CountrysideBackdrop } from "../components/background/CountrysideBackdrop";
import { DashboardScreen } from "../features/tribe-out/screens/Dashboard";
import { SettingsScreen } from "../features/tribe-out/screens/Settings";
import { loadTribeOutProgress } from "../features/tribe-out/tribeOutStorage";
import { tribeOutAudio } from "../features/tribe-out/audio/tribeOutAudio";

type Screen = "game" | "dashboard" | "settings";

export default function App() {
  const [screen, setScreen] = useState<Screen>("game");
  const [progress, setProgress] = useState(loadTribeOutProgress());
  const [scenery, setScenery] = useState<"normal" | "boom">("normal");
  const sceneryTimerRef = useRef<number | null>(null);

  const [sfxEnabled, setSfxEnabled] = useState(() => tribeOutAudio.isSfxEnabled());
  const [musicEnabled, setMusicEnabled] = useState(() => tribeOutAudio.isMusicEnabled());

  const handleMusicChange = (enabled: boolean) => {
    setMusicEnabled(enabled);
    tribeOutAudio.setMusicEnabled(enabled);
  };

  const handleSfxChange = (enabled: boolean) => {
    setSfxEnabled(enabled);
    tribeOutAudio.setSfxEnabled(enabled);
  };

  useEffect(() => {
    tribeOutAudio.preload();
  }, []);

  // Sync progress occasionally
  useEffect(() => {
    if (screen === "dashboard") {
      setProgress(loadTribeOutProgress());
    }
  }, [screen]);

  const handleBoom = useCallback(() => {
    if (sceneryTimerRef.current !== null) {
      window.clearTimeout(sceneryTimerRef.current);
    }
    setScenery("boom");
    sceneryTimerRef.current = window.setTimeout(() => {
      setScenery("normal");
      sceneryTimerRef.current = null;
    }, 4200);
  }, []);

  useEffect(() => {
    return () => {
      if (sceneryTimerRef.current !== null) window.clearTimeout(sceneryTimerRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: "#f5ecd7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        boxSizing: "border-box",
      }}
    >
      <CountrysideBackdrop scenery={scenery} />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: screen === "game" ? 1080 : 460,
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          overflowY: "hidden",
          overscrollBehavior: "none",
        }}
      >
        {screen === "dashboard" && (
          <div style={{ width: "100%", height: "100%", padding: "16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DashboardScreen 
              progress={progress}
              onBack={() => setScreen("game")}
            />
          </div>
        )}

        {screen === "settings" && (
          <div style={{ width: "100%", height: "100%", padding: "16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SettingsScreen
              musicEnabled={musicEnabled}
              sfxEnabled={sfxEnabled}
              onMusicChange={handleMusicChange}
              onSfxChange={handleSfxChange}
              onBack={() => setScreen("game")}
            />
          </div>
        )}

        <div
          className="tribe-game-mount"
          style={{
            display: screen === "game" ? "flex" : "none",
            width: "100%",
            height: "100%",
            minHeight: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TribeOutGame 
            onBoom={handleBoom} 
            onDashboard={() => setScreen("dashboard")}
            onSettings={() => setScreen("settings")}
          />
        </div>
      </main>
    </div>
  );
}
