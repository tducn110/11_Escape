import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGUAGE_STORAGE_KEY = "11-escape-language";
export type SupportedLanguage = "vi" | "en";

const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  value === "vi" || value === "en";

export const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isSupportedLanguage(savedLanguage)) return savedLanguage;
  } catch {
    // Storage read failure fallback
  }
  
  return DEFAULT_LANGUAGE;
};

export const persistLanguage = (language: string): void => {
  const normalizedLanguage = language.split("-")[0];
  if (typeof window === "undefined" || !isSupportedLanguage(normalizedLanguage)) return;

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
  } catch {
    // Persistence is optional in restricted WebViews and private browsing.
  }
};

const syncDocumentLang = (lang: string) => {
  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.lang = lang;
  }
};

const resources = {
  vi: {
    translation: {
      common: {
        play: "Chơi",
        pause: "Tạm dừng",
        resume: "Tiếp tục",
        back: "Quay lại",
        close: "Đóng",
        retry: "Chơi lại",
        loading: "Đang tải...",
        loadingResources: "Đang tải tài nguyên...",
      },
      settings: {
        title: "Cài đặt",
        language: "Ngôn ngữ",
        music: "Nhạc nền",
        sfx: "Hiệu ứng âm thanh",
        on: "Bật",
        off: "Tắt",
      },
      game: {
        title: "Thoát Khỏi Rừng",
        level: "Màn {{level}}",
        hint: "Gợi ý",
        rotate: "Xoay",
        hintsRemaining: "Còn {{count}} gợi ý",
        rotatesRemaining: "Còn {{count}} lượt xoay",
        hudAria: "Màn {{level}}, còn {{lives}} mạng, đã thoát {{escaped}} trên {{total}}",
        livesAria: "{{lives}} trên {{max}} mạng",
      },
      win: {
        completed: "HOÀN THÀNH!",
        levelComplete: "Màn {{level}} Hoàn Thành!",
        levelTitle: "MÀN {{level}}",
        escapedCount: "Thoát {{count}} nhân vật",
        starFull: "Sao đầy",
        starEmpty: "Sao rỗng",
        starsAria: "{{count}} sao",
        restartAll: "TỪ ĐẦU",
        nextLevel: "MÀN TIẾP",
        replay: "CHƠI LẠI",
        nextAria: "Sang màn tiếp theo",
        restartAllAria: "Chơi lại từ đầu",
        replayAria: "Chơi lại màn hiện tại",
      },
      lose: {
        title: "Hết mạng",
        description: "Bộ lạc cần bạn thử lại!",
        retryAria: "Thử lại màn hiện tại",
      },
    },
  },
  en: {
    translation: {
      common: {
        play: "Play",
        pause: "Pause",
        resume: "Resume",
        back: "Back",
        close: "Close",
        retry: "Play again",
        loading: "Loading...",
        loadingResources: "Loading resources...",
      },
      settings: {
        title: "Settings",
        language: "Language",
        music: "Background music",
        sfx: "Sound effects",
        on: "On",
        off: "Off",
      },
      game: {
        title: "Tribe Out",
        level: "Level {{level}}",
        hint: "Hint",
        rotate: "Rotate",
        hintsRemaining: "{{count}} hints remaining",
        rotatesRemaining: "{{count}} rotates remaining",
        hudAria: "Level {{level}}, {{lives}} lives left, escaped {{escaped}} of {{total}}",
        livesAria: "{{lives}} of {{max}} lives",
      },
      win: {
        completed: "COMPLETED!",
        levelComplete: "Level {{level}} Complete!",
        levelTitle: "LEVEL {{level}}",
        escapedCount: "Escaped {{count}} characters",
        starFull: "Full star",
        starEmpty: "Empty star",
        starsAria: "{{count}} stars",
        restartAll: "RESTART",
        nextLevel: "NEXT",
        replay: "RETRY",
        nextAria: "Go to next level",
        restartAllAria: "Play again from start",
        replayAria: "Replay current level",
      },
      lose: {
        title: "Out of lives",
        description: "The tribe needs you to try again!",
        retryAria: "Try this level again",
      },
    },
  },
} as const;

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    supportedLngs: ["vi", "en"],
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
  });
syncDocumentLang(i18n.language || DEFAULT_LANGUAGE);
i18n.on("languageChanged", (lng) => {
  persistLanguage(lng);
  syncDocumentLang(lng);
});

export default i18n;
