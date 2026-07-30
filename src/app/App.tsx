import { useState, useEffect } from "react";
import { TribeOutGame } from "../features/tribe-out/TribeOutGame";
import { SettingsScreen } from "../features/tribe-out/screens/Settings";
import { tribeOutAudio } from "../features/tribe-out/audio/tribeOutAudio";

type Screen = "game" | "settings";

export default function App() {
  const [screen, setScreen] = useState<Screen>("game");
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

  return (
    <div
      className="app-container"
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "none",
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
        {screen === "settings" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              padding: "16px 12px",
              paddingTop: "max(16px, env(safe-area-inset-top))",
              paddingRight: "max(12px, env(safe-area-inset-right))",
              paddingBottom: "max(16px, env(safe-area-inset-bottom))",
              paddingLeft: "max(12px, env(safe-area-inset-left))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
            isActive={screen === "game"}
            onSettings={() => setScreen("settings")}
          />
        </div>
      </main>
    </div>
  );
}
