type ToneOptions = {
  waveform?: OscillatorType;
  volume?: number;
  attack?: number;
  release?: number;
  freqEnd?: number;
};

const DESKTOP_AUDIO = {
  masterVolume: 1,
  musicVolume: 0.1,
  sfxVolume: 2.0,
};

const MOBILE_AUDIO = {
  masterVolume: 1,
  musicVolume: 0.2,
  sfxVolume: 2.0,
};

const TONE_SFX_GAIN = 1.35;

function clampVolume(volume: number) {
  return Math.min(1, Math.max(0, volume));
}

class TribeOutAudio {
  private context: AudioContext | null = null;
  private musicEnabled = true;
  private sfxEnabled = true;
  private mobileAudioMode = false;
  private masterBgmGain: GainNode | null = null;
  private masterSfxGain: GainNode | null = null;
  private unlockListenersBound = false;
  private visibilityListenerBound = false;
  private audioBuffers: Map<string, AudioBuffer> = new Map();

  constructor() {
    this.addVisibilityListener();
  }

  preload() {
    this.addUnlockListeners();
    this.addVisibilityListener();
    this.preloadExternalAudio().catch(() => {});
  }

  async preloadExternalAudio() {
    if (typeof window === "undefined") return;
    try {
      const { AUDIO_ASSETS } = await import("../assets/assetRegistry");
      const context = this.ensureContext();
      if (!context) return;
      
      for (const [key, url] of Object.entries(AUDIO_ASSETS)) {
        if (!this.audioBuffers.has(key)) {
          fetch(url)
            .then(res => res.arrayBuffer())
            .then(buffer => context.decodeAudioData(buffer))
            .then(audioBuffer => this.audioBuffers.set(key, audioBuffer))
            .catch(e => console.warn(`Failed to load audio asset: ${key}`, e));
        }
      }
    } catch {
      // Ignore
    }
  }

  private readonly handleVisibilityChange = () => {
    if (typeof document === "undefined") return;

    if (document.hidden) {
      if (this.masterBgmGain) this.masterBgmGain.gain.value = 0;
      if (this.masterSfxGain) this.masterSfxGain.gain.value = 0;
      if (this.context && this.context.state === "running") {
        this.context.suspend?.()?.catch(() => {});
      }
    } else {
      if (this.masterBgmGain) this.masterBgmGain.gain.value = this.musicEnabled ? 1 : 0;
      if (this.masterSfxGain) this.masterSfxGain.gain.value = this.sfxEnabled ? 1 : 0;
      if (this.context && this.context.state === "suspended") {
        this.context.resume?.()?.catch(() => {});
      }
    }
  };

  private readonly unlock = () => {
    this.unlockFromGesture({ removeFallbackListeners: true });
  };

  unlockFromGesture({ removeFallbackListeners = false }: { removeFallbackListeners?: boolean } = {}) {
    const context = this.ensureContext();
    if (context?.state === "suspended") {
      context.resume().catch(() => {});
    }

    if (removeFallbackListeners && (!context || context.state === "running")) {
      this.removeUnlockListeners();
    }
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;

    if (this.masterBgmGain) {
      this.masterBgmGain.gain.value = enabled ? 1 : 0;
    }

    if (!enabled) {
      this.removeVisibilityListener();
      return;
    }

    this.addVisibilityListener();
  }

  setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    if (this.masterSfxGain) {
      this.masterSfxGain.gain.value = enabled ? 1 : 0;
    }
  }

  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  isSfxEnabled(): boolean {
    return this.sfxEnabled;
  }

  setMobileAudioMode(enabled: boolean) {
    if (this.mobileAudioMode === enabled) return;
    this.mobileAudioMode = enabled;
  }

  playButtonClick() {
    if (!this.sfxEnabled) return;
    if (this.playBuffer("click", this.sfxToneVolume(1.0))) return;

    this.withRunningContext((context) => {
      const now = context.currentTime + 0.006;
      this.tone(context, 587.33, now, 0.055, {
        waveform: "triangle",
        volume: this.sfxToneVolume(0.045),
        attack: 0.006,
        release: 0.045,
      });
      this.tone(context, 880, now + 0.028, 0.05, {
        waveform: "sine",
        volume: this.sfxToneVolume(0.032),
        attack: 0.004,
        release: 0.04,
      });
    });
  }

  playEscape() {
    if (!this.sfxEnabled) return;
    if (this.playBuffer("escape", this.sfxToneVolume(1.0))) return;

    this.withRunningContext((context) => {
      const now = context.currentTime + 0.01;
      this.tone(context, 523.25, now, 0.08, { waveform: "sine", volume: this.sfxToneVolume(0.05) });
      this.tone(context, 659.25, now + 0.04, 0.09, { waveform: "triangle", volume: this.sfxToneVolume(0.04) });
      this.tone(context, 783.99, now + 0.08, 0.12, { waveform: "sine", volume: this.sfxToneVolume(0.045) });
    });
  }

  playBump() {
    if (!this.sfxEnabled) return;
    if (this.playBuffer("bump", this.sfxToneVolume(1.0))) return;

    this.withRunningContext((context) => {
      const now = context.currentTime + 0.01;
      this.tone(context, 130, now, 0.1, { waveform: "sawtooth", volume: this.sfxToneVolume(0.03), release: 0.05 });
      this.tone(context, 110, now + 0.03, 0.09, { waveform: "sawtooth", volume: this.sfxToneVolume(0.025), release: 0.05 });
    });
  }

  playWin() {
    if (!this.sfxEnabled) return;
    if (this.playBuffer("win", this.sfxToneVolume(1.0))) return;

    this.withRunningContext((context) => {
      const now = context.currentTime + 0.01;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        this.tone(context, freq, now + idx * 0.06, 0.18, {
          waveform: "triangle",
          volume: this.sfxToneVolume(0.05),
          release: 0.14,
        });
      });
    });
  }

  playGameOver() {
    if (!this.sfxEnabled) return;
    if (this.playBuffer("gameover", this.sfxToneVolume(1.0))) return;

    this.withRunningContext((context) => {
      const now = context.currentTime + 0.02;
      [392, 329.63, 261.63].forEach((frequency, index) => {
        this.tone(context, frequency, now + index * 0.12, 0.18, {
          waveform: "sawtooth",
          volume: this.sfxToneVolume(0.035),
          release: 0.18,
        });
      });
    });
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (this.context && this.context.state !== "closed") return this.context;

    const AudioCtor =
      window.AudioContext ??
      (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtor) return null;

    try {
      this.context = new AudioCtor();
      this.masterBgmGain = this.context.createGain();
      this.masterSfxGain = this.context.createGain();

      this.masterBgmGain.gain.value = this.musicEnabled ? 1 : 0;
      this.masterSfxGain.gain.value = this.sfxEnabled ? 1 : 0;

      this.masterBgmGain.connect(this.context.destination);
      this.masterSfxGain.connect(this.context.destination);
    } catch {
      return null;
    }

    return this.context;
  }

  private resumeContext(): AudioContext | null {
    const context = this.ensureContext();
    if (!context) return null;

    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    return context;
  }

  private withRunningContext(callback: (context: AudioContext) => void) {
    if (typeof document !== "undefined" && document.hidden) return;

    const context = this.resumeContext();
    if (!context) return;

    if (context.state === "running") {
      callback(context);
    } else {
      this.addUnlockListeners();
      // Execute callback anyway; audio will play once resumed
      callback(context);
    }
  }

  private playBuffer(key: string, volume: number): boolean {
    const buffer = this.audioBuffers.get(key);
    if (!buffer) return false;
    
    this.withRunningContext((context) => {
      try {
        const source = context.createBufferSource();
        source.buffer = buffer;
        
        const gain = context.createGain();
        gain.gain.value = volume;
        
        source.connect(gain);
        if (this.masterSfxGain) {
          gain.connect(this.masterSfxGain);
        }
        source.start(0);
      } catch {
        // Ignore synthesis errors
      }
    });
    
    return true;
  }

  private tone(
    context: AudioContext,
    frequency: number,
    startTime: number,
    duration: number,
    options: ToneOptions = {}
  ) {
    try {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const attack = options.attack ?? 0.012;
      const release = options.release ?? 0.08;
      const volume = options.volume ?? 0.04;
      const stopTime = startTime + duration + release;

      oscillator.type = options.waveform ?? "sine";
      oscillator.frequency.setValueAtTime(frequency, startTime);
      if (options.freqEnd) {
        oscillator.frequency.exponentialRampToValueAtTime(options.freqEnd, startTime + attack + 0.05);
      }

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

      oscillator.connect(gain);
      if (this.masterSfxGain) {
        gain.connect(this.masterSfxGain);
      }
      oscillator.start(startTime);
      oscillator.stop(stopTime + 0.02);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  private addUnlockListeners() {
    if (typeof window === "undefined" || this.unlockListenersBound) return;

    window.addEventListener("pointerdown", this.unlock, { passive: true });
    window.addEventListener("touchstart", this.unlock, { passive: true });
    window.addEventListener("keydown", this.unlock);
    this.unlockListenersBound = true;
  }

  private removeUnlockListeners() {
    if (typeof window === "undefined" || !this.unlockListenersBound) return;

    window.removeEventListener("pointerdown", this.unlock);
    window.removeEventListener("touchstart", this.unlock);
    window.removeEventListener("keydown", this.unlock);
    this.unlockListenersBound = false;
  }

  private audioConfig() {
    const isMobile = () => {
      if (typeof window === "undefined") return false;
      const uaMatch = /Mobi|Android|iPhone|iPad|iPod|IEMobile|BlackBerry|Opera Mini/i.test(
        navigator.userAgent
      );
      const widthMatch = window.matchMedia("(max-width: 1024px)").matches;
      const touchMatch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      return uaMatch || widthMatch || touchMatch;
    };
    const forceMobile = this.mobileAudioMode || isMobile();
    return forceMobile ? MOBILE_AUDIO : DESKTOP_AUDIO;
  }

  private sfxToneVolume(volume: number) {
    const config = this.audioConfig();
    return clampVolume(config.masterVolume * config.sfxVolume * volume * TONE_SFX_GAIN);
  }

  private addVisibilityListener() {
    if (typeof document === "undefined" || this.visibilityListenerBound) return;
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    this.visibilityListenerBound = true;
  }

  private removeVisibilityListener() {
    if (typeof document === "undefined" || !this.visibilityListenerBound) return;
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    this.visibilityListenerBound = false;
  }

  dispose() {
    this.removeUnlockListeners();
    this.removeVisibilityListener();
    this.visibilityListenerBound = false;
    if (this.context && this.context.state !== "closed") {
      this.context.close?.()?.catch(() => {});
    }
    this.context = null;
    this.masterBgmGain = null;
    this.masterSfxGain = null;
  }
}

export const tribeOutAudio = new TribeOutAudio();
