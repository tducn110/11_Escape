import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGUAGE_STORAGE_KEY = "11-escape-language";
export type SupportedLanguage = "vi" | "en";

const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  value === "vi" || value === "en";

export const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
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
      },
      settings: {
        title: "Cài đặt",
        language: "Ngôn ngữ",
        music: "Nhạc nền",
        sfx: "Hiệu ứng âm thanh",
        on: "Bật",
        off: "Tắt",
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
      },
      settings: {
        title: "Settings",
        language: "Language",
        music: "Background music",
        sfx: "Sound effects",
        on: "On",
        off: "Off",
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
i18n.on("languageChanged", persistLanguage);

export default i18n;
