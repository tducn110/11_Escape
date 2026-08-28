type ToneOptions = {
  waveform?: OscillatorType;
  volume?: number;
  attack?: number;
  release?: number;
  freqEnd?: number;
};

/**
 * Fully generative audio: every sound effect is synthesized with
 * oscillators and the background music is a scheduled, generative
 * pentatonic loop — no audio files are shipped, so the Music toggle
 * controls a real sound source.
 *
 * Effective music = userPreference && !platformMuted && document visible.
 * Platform muting (Wink bridge) never mutates the stored preference.
 */
class AnimalEscapeAudio {
  private context: AudioContext | null = null;
  private musicEnabled = true;
  private sfxEnabled = true;
  private platformMuted = false;
  private masterBgmGain: GainNode | null = null;
  private masterSfxGain: GainNode | null = null;
  private unlockListenersBound = false;
  private visibilityListenerBound = false;

  private musicTimer: number | null = null;
  private musicNextStepTime = 0;
  private musicStepIndex = 0;
  private musicSources = new Set<OscillatorNode>();

  /** C-major pentatonic: C D E G A — always consonant, calm forest mood. */
  private static readonly SCALE = [261.63, 293.66, 329.63, 392.0, 440.0];

  private readonly handleVisibilityChange = () => {
    if (typeof document === "undefined") return;
    if (document.hidden) {
      this.applyGainValues();
      this.context?.suspend?.().catch(() => {});
    } else {
      this.context?.resume?.().catch(() => {});
      this.applyGainValues();
    }
  };

  private readonly handleUnlock = () => {
    this.unlockFromGesture({ removeFallbackListeners: true });
  };

  unlockFromGesture({ removeFallbackListeners = false }: { removeFallbackListeners?: boolean } = {}) {
    const context = this.ensureContext();
    const resume =
      context && context.state === "suspended"
        ? context.resume().catch(() => {})
        : Promise.resolve();
    resume.then(() => {
      if (!context || context.state !== "running") return;
      if (removeFallbackListeners) {
        this.removeUnlockListeners();
      }
      // The first real gesture starts the background music when the player
      // has it enabled — previously the BGM only began after a manual
      // OFF -> ON toggle.
      if (this.musicEnabled && !this.platformMuted) {
        const hidden = typeof document !== "undefined" && document.hidden;
        if (!hidden) {
          this.startMusic();
        }
      }
    });
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
    this.applyGainValues();
  }

  setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    this.applyGainValues();
  }

  /** Platform-level mute (Wink). Never touches user preferences. */
  setPlatformMuted(muted: boolean) {
    this.platformMuted = muted;
    if (muted) {
      this.context?.suspend?.().catch(() => {});
    } else {
      this.context?.resume?.().catch(() => {});
    }
    this.applyGainValues();
  }

  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  isSfxEnabled(): boolean {
    return this.sfxEnabled;
  }

  private applyGainValues() {
    const bgmGain = this.masterBgmGain ? this.masterBgmGain.gain : null;
    const sfxGain = this.masterSfxGain ? this.masterSfxGain.gain : null;
    const hidden = typeof document !== "undefined" && document.hidden;
    const bgmAudible = this.musicEnabled && !this.platformMuted && !hidden;
    const sfxAudible = this.sfxEnabled && !this.platformMuted && !hidden;
    if (bgmGain) bgmGain.value = bgmAudible ? 0.12 : 0;
    if (sfxGain) sfxGain.value = sfxAudible ? 1 : 0;
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
      this.applyGainValues();
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
      callback(context);
    }
  }

  private tone(
    context: AudioContext,
    frequency: number,
    startTime: number,
    duration: number,
    options: ToneOptions = {},
    destination: AudioNode | null = this.masterSfxGain,
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
      if (destination) {
        gain.connect(destination);
      }
      oscillator.start(startTime);
      oscillator.stop(stopTime + 0.02);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  playButtonClick() {
    if (!this.sfxEnabled) return;
    this.withRunningContext(context => {
      const now = context.currentTime + 0.006;
      this.tone(context, 587.33, now, 0.055, {
        waveform: "triangle",
        volume: 0.05,
        attack: 0.006,
        release: 0.045,
      });
      this.tone(context, 880, now + 0.028, 0.05, {
        waveform: "sine",
        volume: 0.035,
        attack: 0.004,
        release: 0.04,
      });
    });
  }

  playEscape() {
    if (!this.sfxEnabled) return;
    this.withRunningContext(context => {
      const now = context.currentTime + 0.01;
      this.tone(context, 523.25, now, 0.08, { waveform: "sine", volume: 0.05 });
      this.tone(context, 659.25, now + 0.04, 0.09, { waveform: "triangle", volume: 0.04 });
      this.tone(context, 783.99, now + 0.08, 0.12, { waveform: "sine", volume: 0.045 });
    });
  }

  playBump() {
    if (!this.sfxEnabled) return;
    this.withRunningContext(context => {
      const now = context.currentTime + 0.01;
      this.tone(context, 130, now, 0.1, { waveform: "sawtooth", volume: 0.03, release: 0.05 });
      this.tone(context, 110, now + 0.03, 0.09, { waveform: "sawtooth", volume: 0.025, release: 0.05 });
    });
  }

  playRotate() {
    if (!this.sfxEnabled) return;
    this.withRunningContext(context => {
      const now = context.currentTime + 0.01;
      this.tone(context, 392, now, 0.09, { waveform: "triangle", volume: 0.045 });
      this.tone(context, 587.33, now + 0.07, 0.12, { waveform: "triangle", volume: 0.04 });
    });
  }

  playHint() {
    if (!this.sfxEnabled) return;
    this.withRunningContext(context => {
      const now = context.currentTime + 0.01;
      this.tone(context, 880, now, 0.12, { waveform: "sine", volume: 0.04, release: 0.1 });
      this.tone(context, 1174.66, now + 0.09, 0.16, { waveform: "sine", volume: 0.035, release: 0.12 });
    });
  }

  playWin() {
    if (!this.sfxEnabled) return;
    this.withRunningContext(context => {
      const now = context.currentTime + 0.01;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        this.tone(context, freq, now + idx * 0.06, 0.18, {
          waveform: "triangle",
          volume: 0.05,
          release: 0.14,
        });
      });
    });
  }

  playGameOver() {
    if (!this.sfxEnabled) return;
    this.withRunningContext(context => {
      const now = context.currentTime + 0.02;
      [392, 329.63, 261.63].forEach((frequency, index) => {
        this.tone(context, frequency, now + index * 0.12, 0.18, {
          waveform: "sawtooth",
          volume: 0.035,
          release: 0.18,
        });
      });
    });
  }

  /** Slow generative arpeggio: one chord tone per half second, softly looped. */
  private startMusic() {
    if (this.musicTimer !== null) return;
    const context = this.ensureContext();
    if (!context || context.state !== "running") return;

    this.musicNextStepTime = context.currentTime + 0.1;
    this.musicStepIndex = 0;

    this.musicTimer = window.setInterval(() => {
      const currentContext = this.ensureContext();
      if (!currentContext || currentContext.state !== "running") return;

      const lookahead = currentContext.currentTime + 0.6;
      while (this.musicNextStepTime < lookahead) {
        this.scheduleMusicStep(currentContext, this.musicNextStepTime);
        this.musicNextStepTime += 0.5;
        this.musicStepIndex += 1;
      }
    }, 250);
  }

  private scheduleMusicStep(context: AudioContext, startTime: number) {
    const scale = AnimalEscapeAudio.SCALE;
    const pattern = [0, 2, 4, 3, 1, 3, 4, 2];
    const semitone = pattern[this.musicStepIndex % pattern.length];
    const octave = Math.floor(this.musicStepIndex / pattern.length) % 2;
    const frequency = scale[semitone] * (octave === 1 ? 2 : 1);

    const source = context.createOscillator();
    const gain = context.createGain();
    source.type = "triangle";
    source.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);
    source.connect(gain);
    if (this.masterBgmGain) {
      gain.connect(this.masterBgmGain);
    }
    source.start(startTime);
    source.stop(startTime + 0.5);
    source.onended = () => {
      // A finished source leaves the live set so it can be garbage-collected.
      this.musicSources.delete(source);
    };
    this.musicSources.add(source);
  }

  private stopMusic() {
    if (this.musicTimer !== null) {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    for (const source of this.musicSources) {
      try {
        source.stop();
      } catch {
        // already stopped
      }
    }
    this.musicSources.clear();
  }

  private addUnlockListeners() {
    if (typeof window === "undefined" || this.unlockListenersBound) return;
    window.addEventListener("pointerdown", this.handleUnlock, { passive: true });
    window.addEventListener("touchstart", this.handleUnlock, { passive: true });
    window.addEventListener("keydown", this.handleUnlock);
    this.unlockListenersBound = true;
  }

  private removeUnlockListeners() {
    if (typeof window === "undefined" || !this.unlockListenersBound) return;
    window.removeEventListener("pointerdown", this.handleUnlock);
    window.removeEventListener("touchstart", this.handleUnlock);
    window.removeEventListener("keydown", this.handleUnlock);
    this.unlockListenersBound = false;
  }

  preload() {
    this.addUnlockListeners();
    this.addVisibilityListener();
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
    this.stopMusic();
    this.removeUnlockListeners();
    this.removeVisibilityListener();
    if (this.context && this.context.state !== "closed") {
      this.context.close?.().catch(() => {});
    }
    this.context = null;
    this.masterBgmGain = null;
    this.masterSfxGain = null;
  }
}

export const animalEscapeAudio = new AnimalEscapeAudio();