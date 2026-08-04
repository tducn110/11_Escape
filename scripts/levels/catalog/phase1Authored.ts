import type { PuzzleEntity } from "../../../src/features/tribe-out/types";
import { unit, obstacle, gate, switchEntity, rotateClockwise, rotateCounterClockwise } from "./geometry";
import type { RawLevel } from "./builder";

export function getPhase1AuthoredLevel(index: number): RawLevel {
  const entities: PuzzleEntity[] = [];
  let boardRows = 5;
  let boardCols = 5;
  let rotateCharges = 0;
  let tutorialText: string | undefined = undefined;

  switch (index) {
    case 1:
      // clear exit
      boardRows = 3; boardCols = 3;
      entities.push(unit("u1", 1, 1, "right"));
      tutorialText = "Chạm vào nhân vật để họ chạy thoát!";
      break;
    case 2:
      boardRows = 3; boardCols = 3;
      entities.push(unit("u1", 1, 0, "right"));
      entities.push(unit("u2", 1, 2, "up"));
      break;
    case 3:
      boardRows = 3; boardCols = 3;
      entities.push(unit("u1", 2, 2, "up"));
      entities.push(unit("u2", 1, 1, "down"));
      entities.push(unit("u3", 0, 0, "right"));
      break;
    case 4:
      // blocker order
      boardRows = 3; boardCols = 4;
      entities.push(unit("u1", 1, 1, "right"));
      entities.push(unit("u2", 1, 2, "up"));
      tutorialText = "Một số nhân vật đang cản đường người khác!";
      break;
    case 5:
      boardRows = 4; boardCols = 4;
      entities.push(unit("u1", 1, 1, "right"));
      entities.push(unit("u2", 1, 2, "right"));
      entities.push(unit("u3", 1, 3, "up"));
      break;
    case 6:
      boardRows = 4; boardCols = 4;
      entities.push(unit("u1", 2, 1, "up"));
      entities.push(unit("u2", 1, 1, "right"));
      entities.push(unit("u3", 1, 2, "down"));
      break;
    case 7:
      // fork and join
      boardRows = 4; boardCols = 4;
      entities.push(unit("u1", 2, 2, "up"));
      entities.push(unit("u2", 1, 1, "right"));
      entities.push(unit("u3", 2, 1, "right"));
      break;
    case 8:
      boardRows = 4; boardCols = 4;
      entities.push(unit("u1", 1, 1, "right"));
      entities.push(unit("u2", 1, 2, "down"));
      entities.push(unit("u3", 2, 2, "left"));
      entities.push(unit("u4", 2, 1, "down"));
      break;
    case 9:
      boardRows = 5; boardCols = 5;
      entities.push(unit("u1", 2, 2, "up"));
      entities.push(unit("u2", 1, 2, "left"));
      entities.push(unit("u3", 1, 1, "down"));
      entities.push(unit("u4", 3, 2, "right"));
      break;
    case 10:
      // multi-cell
      boardRows = 5; boardCols = 5;
      entities.push(unit("u1", 2, 1, "right", 1, 2)); // width 1, height 2 (vertical)
      entities.push(unit("u2", 2, 2, "up"));
      tutorialText = "Có những nhân vật chiếm nhiều hơn 1 ô!";
      break;
    case 11:
      boardRows = 5; boardCols = 5;
      rotateCharges = 1;
      entities.push(unit("u1", 2, 1, "right", 2, 1)); // width 2, height 1 (horizontal)
      entities.push(obstacle("ob1", 2, 4)); // block u1 from going right
      entities.push(unit("u2", 2, 3, "up"));
      break;
    case 12:
      boardRows = 5; boardCols = 5;
      entities.push(unit("u1", 1, 1, "right", 2, 1));
      entities.push(unit("u2", 2, 1, "right", 2, 1));
      entities.push(unit("u3", 1, 3, "up"));
      entities.push(unit("u4", 2, 3, "down"));
      break;
    case 13:
      // obstacle and rotate
      boardRows = 4; boardCols = 4;
      rotateCharges = 1;
      entities.push(unit("u1", 1, 1, "right"));
      entities.push(obstacle("ob1", 1, 2));
      tutorialText = "Chạm nút Xoay để xoay nhân vật tránh chướng ngại!";
      break;
    case 14:
      boardRows = 5; boardCols = 5;
      rotateCharges = 1;
      entities.push(unit("u1", 2, 2, "up"));
      entities.push(obstacle("ob1", 1, 2));
      entities.push(unit("u2", 2, 1, "right"));
      break;
    case 15:
      // switch and gate
      boardRows = 5; boardCols = 5;
      entities.push(unit("u1", 1, 1, "right"));
      entities.push(gate("g1", 1, 2, false));
      entities.push(unit("u2", 3, 1, "right"));
      entities.push(switchEntity("s1", 3, 2, "g1", false));
      tutorialText = "Dùng công tắc để mở cổng!";
      break;
    case 16:
      boardRows = 5; boardCols = 5;
      entities.push(unit("u1", 1, 1, "right"));
      entities.push(gate("g1", 1, 2, false));
      entities.push(unit("u2", 3, 3, "up"));
      entities.push(switchEntity("s1", 2, 3, "g1", false));
      break;
    case 17:
      // multi-cell + gate
      boardRows = 5; boardCols = 5;
      entities.push(unit("u1", 1, 1, "right", 1, 2));
      entities.push(gate("g1", 1, 2, false));
      entities.push(unit("u2", 3, 3, "up"));
      entities.push(switchEntity("s1", 2, 3, "g1", false));
      break;
    case 18:
      boardRows = 5; boardCols = 5;
      entities.push(unit("u1", 2, 2, "up", 2, 1));
      entities.push(gate("g1", 1, 2, false));
      entities.push(unit("u2", 1, 1, "down"));
      entities.push(switchEntity("s1", 2, 1, "g1", false));
      break;
    case 19:
      // mixed review
      boardRows = 5; boardCols = 5;
      rotateCharges = 1;
      entities.push(unit("u1", 2, 2, "up"));
      entities.push(gate("g1", 1, 2, false));
      // u2 has a clear path to escape down, and activates s1
      entities.push(unit("u2", 1, 0, "down"));
      entities.push(switchEntity("s1", 2, 0, "g1", false));
      // u3 is blocked, must rotate
      entities.push(unit("u3", 3, 3, "right"));
      entities.push(obstacle("ob1", 3, 4));
      break;
    case 20:
      boardRows = 5; boardCols = 5;
      rotateCharges = 1;
      entities.push(unit("u1", 2, 2, "up"));
      entities.push(gate("g1", 1, 2, false));
      entities.push(unit("u2", 3, 2, "up"));
      // u3 escapes right, hits s1
      entities.push(unit("u3", 0, 1, "right"));
      entities.push(switchEntity("s1", 0, 3, "g1", false));
      // u4 is blocked by obstacle, must rotate
      entities.push(unit("u4", 4, 4, "up"));
      entities.push(obstacle("ob1", 3, 4));
      break;
    default:
      throw new Error("Invalid Phase 1 level index");
  }

  // Timer formula: observationAllowance + expectedActionCount * inputAndAnimationAllowance + mobileBuffer
  // Approx: 8 + (entities.length * 2) + 4
  const timeLimit = 12 + entities.length * 2;

  return {
    boardRows,
    boardCols,
    lives: 3,
    timeLimit,
    tutorialText,
    rotateCharges,
    entities,
  };
}
