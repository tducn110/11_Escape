import type {
  AnimalEscapeLevel,
  AnimalVisualId,
  Direction,
  EntityId,
  PuzzleEntity,
} from "../types";

export type LevelAuthor = Pick<AnimalEscapeLevel, "boardRows" | "boardCols" | "lives" | "timeLimit" | "rotateCharges" | "tutorialText">;

function unit(
  id: EntityId,
  visualId: AnimalVisualId,
  row: number,
  col: number,
  direction: Direction,
  width = 1,
  height = 1,
): PuzzleEntity {
  return { id, type: "unit", visualId, row, col, width, height, direction, escaped: false };
}

function obstacle(id: EntityId, row: number, col: number, width = 1, height = 1): PuzzleEntity {
  return { id, type: "obstacle", row, col, width, height };
}

function gate(id: EntityId, row: number, col: number, width = 1, height = 1): PuzzleEntity {
  return { id, type: "gate", row, col, width, height, open: false };
}

function switchEntity(
  id: EntityId,
  row: number,
  col: number,
  targetId: EntityId,
): PuzzleEntity {
  return { id, type: "switch", row, col, width: 1, height: 1, targetId, activated: false };
}

export const LEVEL_1: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 3,
  boardCols: 3,
  lives: 3,
  timeLimit: 15,
  rotateCharges: 0,
  tutorialText: "Chạm vào con vật để nó chạy thoát khỏi khu rừng!",
  entities: [
    unit("u1", "animal-cat", 1, 1, "right"),
  ],
};

export const LEVEL_2: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 3,
  boardCols: 3,
  lives: 3,
  timeLimit: 16,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-panda", 1, 0, "right"),
    unit("u2", "animal-dog", 2, 1, "left"),
  ],
};

export const LEVEL_3: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 3,
  boardCols: 3,
  lives: 3,
  timeLimit: 18,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-bear", 0, 0, "right"),
    unit("u2", "animal-frog", 2, 0, "right"),
    unit("u3", "animal-monkey", 1, 2, "up"),
  ],
};

export const LEVEL_4: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 3,
  boardCols: 4,
  lives: 3,
  timeLimit: 20,
  rotateCharges: 0,
  tutorialText: "Có con vật đang cản đường! Hãy chạy con cản đường trước.",
  entities: [
    unit("u1", "animal-cat", 1, 0, "right"),
    unit("u2", "animal-panda", 1, 2, "right"),
    unit("u3", "animal-chicken", 0, 3, "down"),
  ],
};

export const LEVEL_5: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 4,
  lives: 3,
  timeLimit: 24,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-squirrel", 2, 1, "right"),
    unit("u2", "animal-dog", 2, 2, "right"),
    unit("u3", "animal-buffalo", 2, 3, "down"),
  ],
};

export const LEVEL_6: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 4,
  lives: 3,
  timeLimit: 24,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-bear", 0, 1, "right"),
    unit("u2", "animal-frog", 1, 0, "right"),
    unit("u3", "animal-monkey", 1, 1, "down"),
  ],
};

export const LEVEL_7: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 4,
  lives: 3,
  timeLimit: 26,
  rotateCharges: 0,
  tutorialText: "Con vật to chiếm nhiều ô hơn! Chạy đúng thứ tự.",
  entities: [
    unit("u1", "animal-police-cat", 1, 1, "right", 2, 1),
    unit("u2", "animal-chicken", 1, 3, "up"),
    unit("u3", "animal-squirrel", 3, 0, "right"),
  ],
};

export const LEVEL_8: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 4,
  lives: 3,
  timeLimit: 26,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-panda", 1, 1, "down", 1, 2),
    unit("u2", "animal-dog", 3, 1, "right"),
    unit("u3", "animal-cat", 0, 2, "left"),
  ],
};

export const LEVEL_9: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 5,
  boardCols: 5,
  lives: 3,
  timeLimit: 30,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-buffalo", 2, 1, "right", 2, 1),
    unit("u2", "animal-frog", 2, 3, "up"),
    unit("u3", "animal-bear", 4, 0, "right"),
    unit("u4", "animal-monkey", 4, 2, "up"),
  ],
};

export const LEVEL_10: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 4,
  lives: 3,
  timeLimit: 30,
  rotateCharges: 2,
  tutorialText: "Xoay để đổi hướng chạy cho con vật, né chướng ngại vật!",
  entities: [
    unit("u1", "animal-cat", 1, 1, "right"),
    obstacle("rock1", 1, 3),
  ],
};

export const LEVEL_11: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 4,
  lives: 3,
  timeLimit: 30,
  rotateCharges: 3,
  entities: [
    unit("u1", "animal-chicken", 0, 2, "right"),
    obstacle("rock1", 0, 3),
    unit("u2", "animal-bear", 3, 1, "right"),
    obstacle("rock2", 3, 3),
  ],
};

export const LEVEL_12: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 5,
  boardCols: 5,
  lives: 3,
  timeLimit: 30,
  rotateCharges: 3,
  entities: [
    unit("u1", "animal-monkey", 2, 2, "right"),
    obstacle("rock1", 2, 4),
    obstacle("rock2", 4, 2),
  ],
};

export const LEVEL_13: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 5,
  boardCols: 4,
  lives: 3,
  timeLimit: 30,
  rotateCharges: 0,
  tutorialText: "Chạy qua công tắc để mở cổng cho con vật phía sau!",
  entities: [
    unit("u1", "animal-squirrel", 1, 2, "right"),
    switchEntity("s1", 1, 3, "g1"),
    gate("g1", 3, 2),
    unit("u2", "animal-dog", 3, 3, "left"),
  ],
};

export const LEVEL_14: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 5,
  boardCols: 4,
  lives: 3,
  timeLimit: 30,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-cat", 0, 1, "right"),
    switchEntity("s1", 0, 2, "g1"),
    gate("g1", 2, 0),
    unit("u2", "animal-panda", 2, 1, "left"),
    unit("u3", "animal-frog", 1, 0, "right"),
    switchEntity("s2", 1, 1, "g2"),
    gate("g2", 4, 3),
    unit("u4", "animal-chicken", 4, 2, "right"),
  ],
};

export const LEVEL_15: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 5,
  lives: 3,
  timeLimit: 32,
  rotateCharges: 0,
  entities: [
    gate("g1", 1, 4),
    unit("u1", "animal-bear", 1, 3, "right"),
    switchEntity("s1", 1, 1, "g1"),
    unit("u2", "animal-squirrel", 0, 1, "down"),
    gate("g2", 3, 0),
    unit("u3", "animal-monkey", 3, 2, "left"),
    switchEntity("s2", 0, 2, "g2"),
    unit("u4", "animal-police-cat", 0, 0, "right"),
  ],
};

export const LEVEL_16: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 4,
  boardCols: 6,
  lives: 3,
  timeLimit: 34,
  rotateCharges: 0,
  entities: [
    unit("u1", "animal-dog", 3, 1, "up"),
    switchEntity("s1", 1, 1, "g1"),
    gate("g1", 1, 3),
    unit("u2", "animal-cat", 1, 2, "right"),
    switchEntity("s2", 1, 4, "g2"),
    gate("g2", 2, 5),
    unit("u3", "animal-buffalo", 2, 4, "right"),
  ],
};

export const LEVEL_17: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 5,
  boardCols: 6,
  lives: 3,
  timeLimit: 34,
  rotateCharges: 0,
  entities: [
    gate("g1", 2, 2),
    unit("u1", "animal-frog", 2, 1, "right"),
    switchEntity("s1", 4, 2, "g1"),
    gate("g2", 4, 5),
    unit("u2", "animal-monkey", 4, 1, "right"),
    switchEntity("s2", 0, 2, "g2"),
    unit("u3", "animal-panda", 0, 1, "right"),
    unit("u4", "animal-chicken", 4, 4, "right"),
  ],
};

export const LEVEL_18: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 5,
  boardCols: 5,
  lives: 3,
  timeLimit: 34,
  rotateCharges: 2,
  entities: [
    gate("g1", 1, 3),
    unit("u1", "animal-squirrel", 1, 2, "right"),
    switchEntity("s1", 3, 1, "g1"),
    unit("u2", "animal-chicken", 2, 1, "down"),
    unit("u3", "animal-bear", 0, 2, "right"),
    obstacle("rock1", 0, 3),
  ],
};

export const LEVEL_19: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 5,
  boardCols: 5,
  lives: 3,
  timeLimit: 40,
  rotateCharges: 4,
  entities: [
    gate("g1", 1, 4),
    unit("u1", "animal-cat", 1, 3, "right"),
    switchEntity("s1", 4, 0, "g1"),
    unit("u2", "animal-dog", 3, 0, "right"),
    obstacle("rock1", 3, 3),
    unit("u3", "animal-police-cat", 0, 2, "right"),
    obstacle("rock2", 0, 3),
    obstacle("rock3", 2, 2),
  ],
};

export const LEVEL_20: LevelAuthor & { entities: PuzzleEntity[] } = {
  boardRows: 6,
  boardCols: 6,
  lives: 3,
  timeLimit: 45,
  rotateCharges: 4,
  entities: [
    unit("u1", "animal-buffalo", 2, 2, "right", 2, 1),
    obstacle("rock1", 2, 4),
    obstacle("rock4", 2, 0),
    gate("g1", 3, 2, 2, 1),
    switchEntity("s1", 5, 2, "g1"),
    unit("u2", "animal-monkey", 5, 1, "right"),
    unit("u3", "animal-bear", 3, 5, "left"),
    obstacle("rock5", 0, 5),
    obstacle("rock6", 3, 1),
  ],
};
