import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TribeOutGame } from "../features/tribe-out/TribeOutGame";
import { tribeOutAudio } from "../features/tribe-out/audio/tribeOutAudio";
import { preloadAllImages, resolveAssetUrl } from "../features/tribe-out/assets/assetRegistry";
import { preloadCriticalResources, preloadNonCriticalResources } from "../utils/game-loader";
import { completeGameLoading, onGameLoadingDismiss, setGameLoadingProgress } from "../utils/loading-controller";


export default function App() {
  // Unified PapaStudio loading screen lifecycle barrier
  useEffect(() => {
    setGameLoadingProgress(25);
    const criticalPromise = preloadCriticalResources((pct) => {
      setGameLoadingProgress(Math.min(95, pct));
    });
    const winkPromise = new Promise<void>((resolve) => {
      if (typeof window === "undefined") return resolve();
      let attempts = 0;
      const check = () => {
        if ((window as any).Wink || (window as any).WinkBridge || attempts > 20) resolve();
        else { attempts++; setTimeout(check, 100); }
      };
      check();
    });
    void Promise.allSettled([criticalPromise, winkPromise]).then(() => {
      completeGameLoading();
    });
    const unbind = onGameLoadingDismiss(() => {
      preloadNonCriticalResources();
    });
    return unbind;
  }, []);

  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    tribeOutAudio.preload();
    preloadAllImages().finally(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    const blockCopyAction = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener("copy", blockCopyAction, true);
    document.addEventListener("cut", blockCopyAction, true);
    document.addEventListener("selectstart", blockCopyAction, true);
    document.addEventListener("dragstart", blockCopyAction, true);
    document.addEventListener("contextmenu", blockCopyAction, true);

    return () => {
      document.removeEventListener("copy", blockCopyAction, true);
      document.removeEventListener("cut", blockCopyAction, true);
      document.removeEventListener("selectstart", blockCopyAction, true);
      document.removeEventListener("dragstart", blockCopyAction, true);
      document.removeEventListener("contextmenu", blockCopyAction, true);
    };
  }, []);

  return (
    <div
      className="app-container relative flex h-dvh min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
      style={{ "--bg-phone": `url("${resolveAssetUrl("background/Phone.png")}")` } as React.CSSProperties}
    >
      <main className="relative z-[1] flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden overscroll-none">
        <div className="flex h-full min-h-0 w-full items-center justify-center">
          {loaded ? (
            <TribeOutGame />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-white">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-300 border-t-transparent" />
              <p className="font-bold text-sm tracking-wide text-amber-200">{t("common.loadingResources", "Đang tải tài nguyên...")}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
