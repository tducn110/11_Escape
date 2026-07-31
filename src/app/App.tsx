import { useEffect } from "react";
import { TribeOutGame } from "../features/tribe-out/TribeOutGame";
import { tribeOutAudio } from "../features/tribe-out/audio/tribeOutAudio";

export default function App() {
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
        <div
          className="tribe-game-mount"
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            minHeight: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TribeOutGame />
        </div>
      </main>
    </div>
  );
}
