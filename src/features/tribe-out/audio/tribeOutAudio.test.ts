import { describe, it, expect, beforeEach, vi } from "vitest";
import { tribeOutAudio } from "./tribeOutAudio";

describe("tribeOutAudio", () => {
  beforeEach(() => {
    tribeOutAudio.dispose();
    vi.stubGlobal("window", {
      AudioContext: vi.fn().mockImplementation(() => ({
        state: "running",
        currentTime: 0,
        destination: {},
        createGain: () => ({
          gain: { value: 1, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
          connect: vi.fn(),
        }),
        suspend: vi.fn().mockResolvedValue(undefined),
        resume: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      })),
      matchMedia: () => ({ matches: false }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("should initialize and toggle music/sfx correctly", () => {
    tribeOutAudio.setMusicEnabled(false);
    expect(tribeOutAudio.isMusicEnabled()).toBe(false);

    tribeOutAudio.setMusicEnabled(true);
    expect(tribeOutAudio.isMusicEnabled()).toBe(true);

    tribeOutAudio.setSfxEnabled(false);
    expect(tribeOutAudio.isSfxEnabled()).toBe(false);

    tribeOutAudio.setSfxEnabled(true);
    expect(tribeOutAudio.isSfxEnabled()).toBe(true);
  });

  it("should trigger sound methods without throwing errors", () => {
    expect(() => {
      tribeOutAudio.playButtonClick();
      tribeOutAudio.playEscape();
      tribeOutAudio.playBump();
      tribeOutAudio.playWin();
      tribeOutAudio.playGameOver();
    }).not.toThrow();
  });

  it("should suspend audio context when tab is hidden", () => {
    const suspendSpy = vi.fn();
    const resumeSpy = vi.fn();

    const docMock = {
      hidden: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    vi.stubGlobal("document", docMock);

    vi.stubGlobal("window", {
      AudioContext: vi.fn().mockImplementation(() => ({
        state: "running",
        currentTime: 0,
        destination: {},
        createGain: () => ({
          gain: { value: 1, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
          connect: vi.fn(),
        }),
        suspend: suspendSpy,
        resume: resumeSpy,
        close: vi.fn(),
      })),
      matchMedia: () => ({ matches: false }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    tribeOutAudio.playButtonClick();

    docMock.hidden = true;
    tribeOutAudio["handleVisibilityChange"]();

    expect(suspendSpy).toHaveBeenCalled();
  });
});
