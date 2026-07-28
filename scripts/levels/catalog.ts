import type { PuzzleLevel, PuzzleEntity, Direction, EntityId } from "../../src/features/tribe-out/types";

function levelId(index: number): PuzzleLevel["id"] {
  return `level-${String(index).padStart(3, "0")}`;
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
  return { id, type: "unit", assetKey, row, col, width, height, direction };
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

function createLevel(index: number, level: Omit<PuzzleLevel, "id">): PuzzleLevel {
  return { id: levelId(index), ...level };
}

function phaseFor(index: number): 1 | 2 | 3 | 4 | 5 {
  if (index <= 20) return 1;
  if (index <= 40) return 2;
  if (index <= 60) return 3;
  if (index <= 80) return 4;
  return 5;
}

function tutorialText(index: number): string | undefined {
  switch (index) {
    case 1: return "Chạm vào nhân vật để họ chạy thoát!";
    case 2: return "Nhân vật này đang cản đường nhân vật kia!";
    case 3: return "Bạn có thể xoay nhân vật bằng nút Xoay ở dưới!";
    case 4: return "Dùng công tắc để mở cổng!";
    case 5: return "Có những nhân vật chiếm nhiều hơn 1 ô!";
    default: return undefined;
  }
}

function baseLives(index: number): number {
  return 3 + Math.floor((index - 1) / 30);
}

function makePhase1(index: number): PuzzleLevel {
  const count = 2 + ((index - 1) % 3);
  const boardRows = 3 + (index % 2);
  const boardCols = count + 2;
  const chainRow = 1;
  const entities: PuzzleEntity[] = [];

  for (let i = 0; i < count; i += 1) {
    entities.push(unit(`u${i}`, chainRow, i, "right"));
  }

  if (index % 4 === 0) {
    entities.push(obstacle("o0", 0, boardCols - 1));
  }

  return createLevel(index, {
    boardRows,
    boardCols,
    lives: baseLives(index),
    timeLimit: 16 + count * 3,
    tutorialText: tutorialText(index),
    rotateCharges: 0,
    entities,
  });
}

function makePhase2(index: number): PuzzleLevel {
  const count = 3 + ((index - 21) % 2);
  const boardRows = 4 + ((index - 21) % 2);
  const boardCols = count + 3;
  const chainRow = 1;
  const entities: PuzzleEntity[] = [];
  const usesWideLeader = index % 2 === 0;

  for (let i = 0; i < count; i += 1) {
    const width = i === 0 && usesWideLeader ? 2 : 1;
    const col = usesWideLeader ? (i === 0 ? 0 : i + 1) : i;
    entities.push(unit(`u${i}`, chainRow, col, "right", width, 1));
  }

  entities.push(obstacle("o0", boardRows - 1, boardCols - 1));
  if (index % 3 === 0) {
    entities.push(obstacle("o1", 0, 0));
  }

  return createLevel(index, {
    boardRows,
    boardCols,
    lives: baseLives(index),
    timeLimit: 18 + count * 4,
    rotateCharges: 0,
    entities,
  });
}

function makePhase3(index: number): PuzzleLevel {
  const boardRows = 4;
  const boardCols = 6 + ((index - 41) % 2);
  const gateId = "g0";
  const entities: PuzzleEntity[] = [
    unit("u0", 0, 0, "right"),
    switchEntity("s0", 0, 1, gateId),
    gate(gateId, 1, 1, false),
    unit("u1", 1, 0, "right"),
    unit("u2", 1, 2, "right"),
  ];

  if (index % 2 === 0) {
    entities.push(obstacle("o0", 2, boardCols - 1));
  }

  return createLevel(index, {
    boardRows,
    boardCols,
    lives: baseLives(index),
    timeLimit: 24,
    rotateCharges: 0,
    entities,
  });
}

function makePhase4(index: number): PuzzleLevel {
  const boardRows = 4 + ((index - 61) % 2);
  const boardCols = 6;
  const entities: PuzzleEntity[] = [
    unit("u0", 1, 0, "right"),
    unit("u1", 1, 1, "right"),
    unit("u2", 1, 2, "right"),
    unit("u3", 1, 3, "right"),
    obstacle("o0", 0, 0),
  ];

  if (index % 3 === 0) {
    entities[0] = unit("u0", 1, 0, "down");
    entities.push(obstacle("o1", 2, 0));
  }

  return createLevel(index, {
    boardRows,
    boardCols,
    lives: baseLives(index),
    timeLimit: 28,
    rotateCharges: index % 2 === 0 ? 2 : 1,
    entities,
  });
}

function makePhase5(index: number): PuzzleLevel {
  const boardRows = 5;
  const boardCols = 7;
  const gateId = "g0";
  const entities: PuzzleEntity[] = [
    unit("u0", 0, 0, "right"),
    switchEntity("s0", 0, 2, gateId),
    gate(gateId, 1, 1, false),
    unit("u1", 1, 0, "right"),
    unit("u2", 1, 2, "right"),
    unit("u3", 2, 0, "right", 2, 1),
  ];

  if (index % 2 === 1) {
    entities.push(obstacle("o0", 3, 5));
  }

  return createLevel(index, {
    boardRows,
    boardCols,
    lives: baseLives(index),
    timeLimit: 32,
    rotateCharges: 2,
    entities,
  });
}

export function generateLevels(): readonly PuzzleLevel[] {
  const levels: PuzzleLevel[] = [];
  for (let index = 1; index <= 100; index += 1) {
    const phase = phaseFor(index);
    const level = phase === 1
      ? makePhase1(index)
      : phase === 2
        ? makePhase2(index)
        : phase === 3
          ? makePhase3(index)
          : phase === 4
            ? makePhase4(index)
            : makePhase5(index);

    levels.push({
      ...level,
      entities: level.entities.map(entity => ({ ...entity })) as PuzzleEntity[],
    });
  }
  return levels;
}
