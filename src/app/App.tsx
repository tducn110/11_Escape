import { useEffect } from "react";
import { TribeOutGame } from "../features/tribe-out/TribeOutGame";
import { tribeOutAudio } from "../features/tribe-out/audio/tribeOutAudio";

export default function App() {
  useEffect(() => {
    tribeOutAudio.preload();
  }, []);

  return (
    <div className="app-container relative flex h-dvh min-h-dvh w-full flex-col items-center justify-center overflow-hidden">
      <main className="relative z-[1] flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden overscroll-none">
        <div className="flex h-full min-h-0 w-full items-center justify-center">
          <TribeOutGame />
        </div>
      </main>
    </div>
  );
}
