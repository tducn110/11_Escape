import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getInitialLanguage,
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  persistLanguage,
} from "./i18n";

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    read: (key: string) => values.get(key) ?? null,
  };
}

describe("language persistence", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("defaults to English when no language was selected", () => {
    const storage = createStorage();
    vi.stubGlobal("window", { localStorage: storage });

    expect(getInitialLanguage()).toBe("en");
  });

  it("loads only a previously selected supported language", () => {
    const storage = createStorage({ [LANGUAGE_STORAGE_KEY]: "vi" });
    vi.stubGlobal("window", { localStorage: storage });

    expect(getInitialLanguage()).toBe("vi");

    storage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    expect(getInitialLanguage()).toBe("en");
  });

  it("persists the language only through an explicit language change", () => {
    const storage = createStorage();
    vi.stubGlobal("window", { localStorage: storage });

    expect(storage.read(LANGUAGE_STORAGE_KEY)).toBeNull();
    persistLanguage("vi");
    expect(storage.read(LANGUAGE_STORAGE_KEY)).toBe("vi");

    persistLanguage("en-US");
    expect(storage.read(LANGUAGE_STORAGE_KEY)).toBe("en");
  });

  it("accepts only vi and en", () => {
    expect(isSupportedLanguage("vi")).toBe(true);
    expect(isSupportedLanguage("en")).toBe(true);
    expect(isSupportedLanguage("fr")).toBe(false);
    expect(isSupportedLanguage(null)).toBe(false);
  });
});
