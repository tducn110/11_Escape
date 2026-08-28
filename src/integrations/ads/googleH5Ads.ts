/** Google H5 Game Ads adapter - Mocked to bypass external SDK loading while keeping UI/Game transitions. */
export type AdSound = "on" | "off";

export interface AdLifecycle {
  beforeAd?: () => void;
  afterAd?: () => void;
}

export interface RewardedAdOptions extends AdLifecycle {
  name: string;
}

export interface InterstitialAdOptions extends AdLifecycle {
  name: string;
  type?: "next" | "start" | "pause" | "browse";
}

let activeBreak = false;
let configuredSound: AdSound = "on";

export function bootstrapGoogleH5Ads(): Promise<boolean> {
  return Promise.resolve(true);
}

export function setGoogleH5AdSound(sound: AdSound): void {
  configuredSound = sound;
}

export async function showRewardedVideo(options: RewardedAdOptions): Promise<boolean> {
  if (activeBreak) return false;
  activeBreak = true;
  options.beforeAd?.();
  return new Promise<boolean>((resolve) => {
    window.setTimeout(() => {
      options.afterAd?.();
      activeBreak = false;
      resolve(true);
    }, 120);
  });
}

export async function showInterstitial(options: InterstitialAdOptions): Promise<void> {
  if (activeBreak) return;
  activeBreak = true;
  options.beforeAd?.();
  await new Promise<void>((resolve) => {
    window.setTimeout(() => {
      options.afterAd?.();
      activeBreak = false;
      resolve();
    }, 120);
  });
}

export function isAdBreakActive(): boolean {
  return activeBreak;
}

