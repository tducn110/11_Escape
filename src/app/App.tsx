import { useEffect, useState } from "react";
import { TribeOutGame } from "../features/tribe-out/TribeOutGame";
import { tribeOutAudio } from "../features/tribe-out/audio/tribeOutAudio";
import { preloadAllImages } from "../features/tribe-out/assets/assetRegistry";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    tribeOutAudio.preload();
    preloadAllImages().finally(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <div className="app-container relative flex h-dvh min-h-dvh w-full flex-col items-center justify-center overflow-hidden">
      <main className="relative z-[1] flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden overscroll-none">
        <div className="flex h-full min-h-0 w-full items-center justify-center">
          {loaded ? (
            <TribeOutGame />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-white">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-300 border-t-transparent" />
              <p className="font-bold text-sm tracking-wide text-amber-200">Đang tải tài nguyên...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

