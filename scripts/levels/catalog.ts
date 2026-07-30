import type { DifficultyPhase, Direction, EntityId, PuzzleEntity, PuzzleLevel } from "../../src/features/tribe-out/types";

type SegmentSpec = {
  id: EntityId;
  width: number;
  height?: number;
};

type ChainSpec = {
  row: number;
  startCol: number;
  direction?: Direction;
  segments: SegmentSpec[];
};

function levelId(index: number): PuzzleLevel["id"] {
  return `level-${String(index).padStart(3, "0")}` as PuzzleLevel["id"];
}

function phaseFor(index: number): DifficultyPhase {
  if (index <= 20) return 1;
  if (index <= 40) return 2;
  if (index <= 60) return 3;
  if (index <= 80) return 4;
  return 5;
}

function unit(
  id: EntityId,
  row: number,
  col: number,
  direction: Direction,
  width = 1,
  height = 1,
  assetKey = `villager-${((Number(id.replace(/\D+/g, "")) || 1) % 7) + 1}`,
): PuzzleEntity {
  return { id, type: "unit", assetKey, row, col, width, height, direction, escaped: false };
}

function obstacle(id: EntityId, row: number, col: number, width = 1, height = 1): PuzzleEntity {
  return { id, type: "obstacle", assetKey: "rock", row, col, width, height };
}

function gate(id: EntityId, row: number, col: number, open = false): PuzzleEntity {
  return { id, type: "gate", assetKey: open ? "gate-open" : "gate-closed", row, col, width: 1, height: 1, open };
}

function switchEntity(id: EntityId, row: number, col: number, targetId: EntityId, activated = false): PuzzleEntity {
  return { id, type: "switch", assetKey: activated ? "switch-active" : "switch-inactive", row, col, width: 1, height: 1, targetId, activated };
}

function createLevel(index: number, level: Omit<PuzzleLevel, "id" | "phase">): PuzzleLevel {
  return { id: levelId(index), phase: phaseFor(index), ...level };
}

function buildChain(spec: ChainSpec): PuzzleEntity[] {
  const direction = spec.direction ?? "right";
  const entities: PuzzleEntity[] = [];
  let col = spec.startCol;

  for (const segment of spec.segments) {
    const height = segment.height ?? 1;
    entities.push(unit(segment.id, spec.row, col, direction, segment.width, height));
    col += segment.width;
  }

  return entities;
}

function baseLives(index: number): number {
  return 3 + Math.floor((index - 1) / 30);
}

function phaseTutorial(index: number): string | undefined {
  switch (index) {
    case 1: return "Chạm vào nhân vật để họ chạy thoát!";
    case 2: return "Nhân vật này đang cản đường nhân vật kia!";
    case 3: return "Bạn có thể xoay nhân vật bằng nút Xoay ở dưới!";
    case 4: return "Dùng công tắc để mở cổng!";
    case 5: return "Có những nhân vật chiếm nhiều hơn 1 ô!";
    default: return undefined;
  }
}

function makePhase1(index: number): PuzzleLevel {
  const count = 2 + ((index - 1) % 3);
  const boardRows = 3 + (index % 2);
  const boardCols = count + 2;
  const entities: PuzzleEntity[] = [
    ...buildChain({
      row: 1,
      startCol: 0,
      segments: Array.from({ length: count }, (_, i) => ({ id: `u${i}`, width: 1 })),
    }),
  ];

  if (index % 4 === 0) {
    entities.push(obstacle("o0", 0, boardCols - 1));
  }

  return createLevel(index, {
    boardRows,
    boardCols,
    lives: baseLives(index),
    timeLimit: 16 + count * 3,
    tutorialText: phaseTutorial(index),
    rotateCharges: 0,
    entities,
  });
}

function makeParallelChainsLevel(
  index: number,
  chainLengths: number[],
  options: {
    boardRows: number;
    boardCols: number;
    rotateCharges: number;
    obstacleCount?: number;
    wideRoot?: boolean;
  },
): PuzzleLevel {
  const entities: PuzzleEntity[] = [];
  const rowGap = chainLengths.length >= 3 ? 2 : 3;

  chainLengths.forEach((length, chainIndex) => {
    const row = 1 + chainIndex * rowGap;
    const widths = Array.from({ length }, (_, segmentIndex) => {
      if (options.wideRoot && chainIndex === 0 && segmentIndex === 0) {
        return 2;
      }
      return 1;
    });
    entities.push(
      ...buildChain({
        row,
        startCol: 0,
        segments: widths.map((width, segmentIndex) => ({ id: `u${chainIndex}_${segmentIndex}`, width })),
      }),
    );
  });

  for (let obstacleIndex = 0; obstacleIndex < (options.obstacleCount ?? 0); obstacleIndex += 1) {
    entities.push(obstacle(`o${obstacleIndex}`, 0, options.boardCols - 1 - obstacleIndex));
  }

  return createLevel(index, {
    boardRows: options.boardRows,
    boardCols: options.boardCols,
    lives: baseLives(index),
    timeLimit: 18 + chainLengths.reduce((sum, value) => sum + value, 0) * 2,
    rotateCharges: options.rotateCharges,
    entities,
  });
}

function makeStatefulLevel(
  index: number,
  config: {
    boardRows: number;
    boardCols: number;
    rotateCharges: number;
    keyChain: number[];
    helperChain: number[];
    gatedChain: number[];
    includeGate: boolean;
    includeSwitch: boolean;
    includeWideUnit: boolean;
    includeRotateDecoy: boolean;
    includeObstacle: boolean;
  },
): PuzzleLevel {
  const entities: PuzzleEntity[] = [];
  const keyRow = 1;
  const helperRow = 3;
  const gatedRow = 5;

  const keySegments = config.keyChain.map((width, segmentIndex) => ({
    id: `k${index}_${segmentIndex}`,
    width,
  }));
  const helperSegments = config.helperChain.map((width, segmentIndex) => ({
    id: `h${index}_${segmentIndex}`,
    width,
  }));
  const gatedSegments = config.gatedChain.map((width, segmentIndex) => ({
    id: `g${index}_${segmentIndex}`,
    width,
  }));

  entities.push(
    ...buildChain({
      row: keyRow,
      startCol: 0,
      segments: keySegments,
    }),
    ...buildChain({
      row: helperRow,
      startCol: 0,
      segments: helperSegments,
    }),
    ...buildChain({
      row: gatedRow,
      startCol: 0,
      segments: gatedSegments,
    }),
  );

  const keyRootEndCol = config.keyChain.reduce((sum, width) => sum + width, 0);
  const helperRootEndCol = config.helperChain.reduce((sum, width) => sum + width, 0);
  const gatedRootEndCol = config.gatedChain.reduce((sum, width) => sum + width, 0);

  if (config.includeSwitch) {
    entities.push(switchEntity(`s${index}`, keyRow, keyRootEndCol, `gate-${index}`));
  }

  if (config.includeGate) {
    entities.push(gate(`gate-${index}`, gatedRow, gatedRootEndCol, false));
  }

  if (config.includeWideUnit) {
    entities.push(unit(`m${index}`, helperRow + 1, 0, "right", 2, 1));
  }

  if (config.includeRotateDecoy) {
    const decoyCol = Math.min(config.boardCols - 1, Math.max(keyRootEndCol, helperRootEndCol) + 1);
    entities.push(unit(`r${index}`, 2, decoyCol, "up"));
    entities.push(obstacle(`or${index}`, 1, decoyCol));
  }

  return createLevel(index, {
    boardRows: config.boardRows,
    boardCols: config.boardCols,
    lives: baseLives(index),
    timeLimit: 24 + (config.keyChain.length + config.helperChain.length + config.gatedChain.length) * 3,
    rotateCharges: config.rotateCharges,
    entities,
  });
}

function phase2Level(index: number): PuzzleLevel {
  const variant = (index - 21) % 3;
  if (variant === 0) {
    return makeParallelChainsLevel(index, [4, 4], {
      boardRows: 5,
      boardCols: 6,
      rotateCharges: 1,
      obstacleCount: 1,
    });
  }
  if (variant === 1) {
    return makeParallelChainsLevel(index, [5, 3], {
      boardRows: 5,
      boardCols: 6,
      rotateCharges: 1,
      obstacleCount: 1,
      wideRoot: true,
    });
  }
  return makeParallelChainsLevel(index, [4, 3, 3], {
    boardRows: 7,
    boardCols: 6,
    rotateCharges: 1,
    obstacleCount: 2,
  });
}

function phase3Level(index: number): PuzzleLevel {
  const variant = (index - 41) % 4;
  if (variant === 0) {
    return makeStatefulLevel(index, {
      boardRows: 6,
      boardCols: 6,
      rotateCharges: 1,
      keyChain: [1, 1, 1],
      helperChain: [1, 1],
      gatedChain: [1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: true,
      includeRotateDecoy: false,
      includeObstacle: true,
    });
  }
  if (variant === 1) {
    return makeStatefulLevel(index, {
      boardRows: 6,
      boardCols: 7,
      rotateCharges: 1,
      keyChain: [1, 1, 1],
      helperChain: [1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: false,
      includeRotateDecoy: false,
      includeObstacle: true,
    });
  }
  if (variant === 2) {
    return makeStatefulLevel(index, {
      boardRows: 7,
      boardCols: 7,
      rotateCharges: 1,
      keyChain: [1, 1],
      helperChain: [1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: true,
      includeRotateDecoy: false,
      includeObstacle: false,
    });
  }
  return makeStatefulLevel(index, {
    boardRows: 6,
    boardCols: 7,
    rotateCharges: 1,
    keyChain: [1, 1, 1],
    helperChain: [1, 1],
    gatedChain: [1, 1, 1, 1, 1, 1],
    includeGate: true,
    includeSwitch: true,
    includeWideUnit: true,
    includeRotateDecoy: false,
    includeObstacle: true,
  });
}

function phase4Level(index: number): PuzzleLevel {
  const variant = (index - 61) % 4;
  if (variant === 0) {
    return makeStatefulLevel(index, {
      boardRows: 6,
      boardCols: 8,
      rotateCharges: 2,
      keyChain: [1, 1, 1],
      helperChain: [1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: true,
      includeRotateDecoy: true,
      includeObstacle: true,
    });
  }
  if (variant === 1) {
    return makeStatefulLevel(index, {
      boardRows: 7,
      boardCols: 8,
      rotateCharges: 2,
      keyChain: [1, 1, 1, 1],
      helperChain: [1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: false,
      includeRotateDecoy: true,
      includeObstacle: true,
    });
  }
  if (variant === 2) {
    return makeStatefulLevel(index, {
      boardRows: 7,
      boardCols: 8,
      rotateCharges: 2,
      keyChain: [1, 1, 1],
      helperChain: [1, 1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: true,
      includeRotateDecoy: true,
      includeObstacle: false,
    });
  }
  return makeStatefulLevel(index, {
    boardRows: 6,
    boardCols: 8,
    rotateCharges: 2,
    keyChain: [1, 1, 1],
    helperChain: [1, 1],
    gatedChain: [1, 1, 1, 1, 1, 1, 1],
    includeGate: true,
    includeSwitch: true,
    includeWideUnit: false,
    includeRotateDecoy: true,
    includeObstacle: true,
  });
}

function phase5Level(index: number): PuzzleLevel {
  const variant = (index - 81) % 4;
  if (variant === 0) {
    return makeStatefulLevel(index, {
      boardRows: 7,
      boardCols: 8,
      rotateCharges: 2,
      keyChain: [1, 1, 1, 1],
      helperChain: [1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: true,
      includeRotateDecoy: true,
      includeObstacle: true,
    });
  }
  if (variant === 1) {
    return makeStatefulLevel(index, {
      boardRows: 8,
      boardCols: 8,
      rotateCharges: 2,
      keyChain: [1, 1, 1],
      helperChain: [1, 1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: true,
      includeRotateDecoy: true,
      includeObstacle: true,
    });
  }
  if (variant === 2) {
    return makeStatefulLevel(index, {
      boardRows: 8,
      boardCols: 8,
      rotateCharges: 1,
      keyChain: [1, 1, 1, 1],
      helperChain: [1, 1, 1],
      gatedChain: [1, 1, 1, 1, 1, 1, 1],
      includeGate: true,
      includeSwitch: true,
      includeWideUnit: true,
      includeRotateDecoy: true,
      includeObstacle: true,
    });
  }
  return makeStatefulLevel(index, {
    boardRows: 7,
    boardCols: 8,
    rotateCharges: 2,
    keyChain: [1, 1, 1],
    helperChain: [1, 1, 1],
    gatedChain: [1, 1, 1, 1, 1, 1, 1],
    includeGate: true,
    includeSwitch: true,
    includeWideUnit: true,
    includeRotateDecoy: true,
    includeObstacle: true,
  });
}

export function generateLevels(): readonly PuzzleLevel[] {
  const levels: PuzzleLevel[] = [];

  for (let index = 1; index <= 100; index += 1) {
    const phase = phaseFor(index);
    const level = phase === 1
      ? makePhase1(index)
      : phase === 2
        ? phase2Level(index)
        : phase === 3
          ? phase3Level(index)
          : phase === 4
            ? phase4Level(index)
            : phase5Level(index);

    levels.push({
      ...level,
      entities: level.entities.map(entity => ({ ...entity })) as PuzzleEntity[],
    });
  }

  return levels;
}
