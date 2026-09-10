import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { winkGame } from '../client';

describe('Wink SDK v1 Adapter (11_escape)', () => {
  let originalWink: unknown;

  beforeEach(() => {
    originalWink = (globalThis as any).Wink;
  });

  afterEach(() => {
    (globalThis as any).Wink = originalWink;
  });

  it('runs safely in standalone mode when window.Wink is absent', () => {
    delete (globalThis as any).Wink;
    delete (globalThis as any).WinkBridge;
    const round = winkGame.startRound();
    expect(round.roundId).toBeDefined();
    expect(winkGame.completeRound(round)).toBe(true);
  });

  it('connects to window.Wink SDK v1 and binds lifecycle', () => {
    const listeners: Record<string, Function> = {};
    const mockSdk = {
      init: vi.fn(async () => mockSdk),
      gameplayStart: vi.fn(),
      gameplayStop: vi.fn(),
      track: vi.fn(async () => {}),
      can: vi.fn((cap: string) => cap === 'submitScore' || cap === 'track'),
      on: vi.fn((event: string, cb: Function) => {
        listeners[event] = cb;
        return () => delete listeners[event];
      }),
      player: { isGuest: false, displayName: 'Escape Player' },
    };

    (globalThis as any).window = globalThis;
    (globalThis as any).Wink = mockSdk;

    const round = winkGame.startRound();
    expect(mockSdk.gameplayStart).toHaveBeenCalled();

    winkGame.completeRound(round);
    expect(mockSdk.gameplayStop).toHaveBeenCalled();

    winkGame.track('level_clear', { level: 1 });
    expect(mockSdk.track).toHaveBeenCalledWith('level_clear', { level: 1 });
  });
});
