export interface DifficultyProfile {
  minRotateRequired: number;
  maxRotateRequired: number;
  meaningfulDecisionProxy: number;
  minBoardSize: number;
  maxBoardSize: number;
  minEntities: number;
  maxEntities: number;
  maxInitialExits: number;
  minInitialAvailableRatio: number;
  maxInitialAvailableRatio: number;
  minDeadEndRisk: number;
  maxDeadEndRisk: number;
  allowedMechanics: {
    gates: boolean;
    switches: boolean;
    multiCell: boolean;
    rotate: boolean;
  };
}

export const PHASE_PROFILES: Record<number, DifficultyProfile> = {
  1: { // 001-020
    minRotateRequired: 0,
    maxRotateRequired: 2,
    meaningfulDecisionProxy: 0,
    minBoardSize: 3,
    maxBoardSize: 5,
    minEntities: 1,
    maxEntities: 7,
    maxInitialExits: 3,
    minInitialAvailableRatio: 0,
    maxInitialAvailableRatio: 1.0,
    minDeadEndRisk: 0,
    maxDeadEndRisk: 1.0,
    allowedMechanics: { gates: true, switches: true, multiCell: true, rotate: true }, // Authored phase, we use mechanics explicitly
  },
  2: { // 021-040
    minRotateRequired: 0,
    maxRotateRequired: 4,
    meaningfulDecisionProxy: 1,
    minBoardSize: 5,
    maxBoardSize: 7,
    minEntities: 6,
    maxEntities: 10,
    maxInitialExits: 3,
    minInitialAvailableRatio: 0.20,
    maxInitialAvailableRatio: 0.45,
    minDeadEndRisk: 0,
    maxDeadEndRisk: 0.05,
    allowedMechanics: { gates: false, switches: false, multiCell: true, rotate: true },
  },
  3: { // 041-060
    minRotateRequired: 0,
    maxRotateRequired: 4,
    meaningfulDecisionProxy: 1,
    minBoardSize: 5,
    maxBoardSize: 7,
    minEntities: 7,
    maxEntities: 11,
    maxInitialExits: 3,
    minInitialAvailableRatio: 0.15,
    maxInitialAvailableRatio: 0.40,
    minDeadEndRisk: 0,
    maxDeadEndRisk: 0.12,
    allowedMechanics: { gates: true, switches: true, multiCell: true, rotate: true },
  },
  4: { // 061-080
    minRotateRequired: 0,
    maxRotateRequired: 5,
    meaningfulDecisionProxy: 2,
    minBoardSize: 6,
    maxBoardSize: 8,
    minEntities: 8,
    maxEntities: 16,
    maxInitialExits: 2,
    minInitialAvailableRatio: 0.10,
    maxInitialAvailableRatio: 0.30,
    minDeadEndRisk: 0.05,
    maxDeadEndRisk: 0.85,
    allowedMechanics: { gates: true, switches: true, multiCell: true, rotate: true },
  },
  5: { // 081-100
    minRotateRequired: 1,
    maxRotateRequired: 6,
    meaningfulDecisionProxy: 3,
    minBoardSize: 6,
    maxBoardSize: 8,
    minEntities: 9,
    maxEntities: 18,
    maxInitialExits: 2,
    minInitialAvailableRatio: 0.05,
    maxInitialAvailableRatio: 0.20,
    minDeadEndRisk: 0.15,
    maxDeadEndRisk: 0.95,
    allowedMechanics: { gates: true, switches: true, multiCell: true, rotate: true },
  },
};

export function getProfileForLevel(levelIndex: number): DifficultyProfile {
  // levelIndex is 1-based (1 to 100)
  const phase = Math.ceil(levelIndex / 20);
  return PHASE_PROFILES[phase] || PHASE_PROFILES[5];
}
