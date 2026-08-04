import type { Direction, PuzzleEntity } from "../../../src/features/tribe-out/types";
import { getProfileForLevel } from "./profiles";
import { getPhase1AuthoredLevel } from "./phase1Authored";

export interface RawLevel {
  boardRows: number;
  boardCols: number;
  lives: number;
  timeLimit: number;
  tutorialText?: string;
  rotateCharges: number;
  entities: PuzzleEntity[];
}

function baseLives(index: number): number {
  return 3 + Math.floor((index - 1) / 30);
}

function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
function strSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return h;
}

export function buildCandidate(index: number, lane: number): RawLevel | null {
  const profile = getProfileForLevel(index);
  if (index <= 20) return getPhase1AuthoredLevel(index);

  const seedStr = `level-${index}:difficulty-v1:${lane}`;
  const rnd = mulberry32(strSeed(seedStr));

  const boardRows = profile.maxBoardSize;
  const boardCols = profile.maxBoardSize;
  
  const entities: PuzzleEntity[] = [];
  
  let targetEntities = profile.maxEntities;
  if (index === 100) targetEntities = 14;

  let rotateRequired = profile.minRotateRequired;
  if (profile.meaningfulDecisionProxy > 0 && rotateRequired === 0) rotateRequired = 1;
  if (index === 100) rotateRequired = 4;
  
  let multiCellRequired = profile.allowedMechanics.multiCell ? 1 : 0;
  if (index === 21) multiCellRequired = 1;
  
  let gatesRequired = (profile.allowedMechanics.gates && index > 40) ? 1 : 0;
  let switchesRequired = (profile.allowedMechanics.switches && index > 40) ? 1 : 0;
  if (index === 31) { gatesRequired = 1; switchesRequired = 1; }

  // Allow more unit variation to avoid DUPLICATE SIGNATURE errors.
  let unitCount = profile.minEntities;
  if (profile.maxEntities > profile.minEntities) {
    unitCount += Math.floor(rnd() * (profile.maxEntities - profile.minEntities + 1));
  }
  let l1 = Math.floor(unitCount * 0.6);
  let l2 = Math.floor(unitCount * 0.2);
  let l3 = unitCount - l1 - l2;
  
  // ensure we don't have 0 in lines
  if (l1 < 1) l1 = 1;
  if (l2 < 1) l2 = 1;
  if (l3 < 1) l3 = 1;

  // We place units in 3 rows: row 1, 3, 5 (if boardRows >= 6).
  // But boardRows is 5 to 8. So we use rows 0, 2, 4.
  // For each line, we stagger them slightly based on lane to create unique signatures.
  let lines = [l1, l2, l3];
  
  let eIdx = 0;
  let rCount = 0;
  for (let li = 0; li < 3; li++) {
    let row = li * 2;
    if (row >= boardRows) row = boardRows - 1; // Fit in board
    if (li === 2 && multiCellRequired > 0 && row + 1 >= boardRows) {
      row = boardRows - 2; // ensure vertical multicell fits
    }

    let col = 0;
    
    // Add gate at the end of line 0
    if (li === 0 && gatesRequired > 0) {
      entities.push({ id: `gate1`, type: "gate", row, col: boardCols - 1, open: false, width: 1, height: 1 });
    }
    // Add switch to open gate at the end of line 1
    if (li === 1 && switchesRequired > 0) {
      entities.push({ id: `sw1`, type: "switch", row, col: boardCols - 1, targetId: `gate1`, activated: false, width: 1, height: 1 });
    }
    
    for (let ui = 0; ui < lines[li]; ui++) {
      if (eIdx >= unitCount) break;
      if (entities.length >= profile.maxEntities && index !== 100) break;
      
      let shift = Math.floor(rnd() * 2);
      if (lane > 0 && ui > 0) col += shift;
      
      // Ensure we don't place a unit on an already occupied cell
      while (col < boardCols - 2 && entities.some(e => e.row === row && e.col === col)) {
        col++;
      }
      if (col >= boardCols - 2) break; // Don't block the gate/switch area
      
      let face: Direction = "right";
      let isTrapped = false;
      
      // We only intentionally trap units if we haven't reached rotateRequired
      if (rCount < rotateRequired && rnd() < 0.5) {
        let faces: Direction[] = ["up", "down", "left", "right"];
        face = faces[Math.floor(rnd() * faces.length)];
        isTrapped = true;
        rCount++;
      }
      
      // Ensure the first unit is trapped if rotateRequired > 0 to guarantee at least some rotation
      if (eIdx === 0 && rotateRequired > 0 && !isTrapped) {
        isTrapped = true;
        rCount++;
      }
      
      let w = 1, h = 1;
      if (multiCellRequired > 0 && !isTrapped && ui === 0 && li === 2) {
        w = 1; h = 2;
        multiCellRequired--;
      }
      
      entities.push({
        id: `u${eIdx}`,
        type: "unit",
        row, col, direction: face, width: w, height: h
      });
      if (isTrapped) {
        // ensure we have space to put an obstacle in front of it
        const directions = ["up", "right", "down", "left"];
        while (true) {
          let obsRow = row;
          let obsCol = col;
          if (face === "up") {
            obsRow = row - 1;
            obsCol = col + Math.floor(rnd() * w);
          } else if (face === "down") {
            obsRow = row + h;
            obsCol = col + Math.floor(rnd() * w);
          } else if (face === "left") {
            obsCol = col - 1;
            obsRow = row + Math.floor(rnd() * h);
          } else if (face === "right") {
            obsCol = col + w;
            obsRow = row + Math.floor(rnd() * h);
          }

          if (obsRow >= 0 && obsRow < boardRows && obsCol >= 0 && obsCol < boardCols) {
            let existingEntity = entities.find(e => e.row === obsRow && e.col === obsCol);
            if (!existingEntity) {
              entities.push({ id: `obs${eIdx}`, type: "obstacle", row: obsRow, col: obsCol, width: 1, height: 1 });
              let unitEntity = entities.find(e => e.id === `u${eIdx}`);
              if (unitEntity) unitEntity.direction = face as any;
              break;
            } else if (existingEntity.type === "obstacle") {
              let unitEntity = entities.find(e => e.id === `u${eIdx}`);
              if (unitEntity) unitEntity.direction = face as any;
              break;
            }
          }
          // If out of bounds or occupied by a unit/switch/gate, try a different direction
          face = directions[Math.floor(rnd() * 4)] as any;
        }
      }
      
      col++;
      eIdx++;
    }
  }

  // To guarantee meaningfulDecisionProxy >= 1:
  // We place an obstacle exactly where the first unit (u0) would face if rotated ONCE.
  // If the user rotates u0, it faces the obstacle.
  // If extraCharges > 0 (Phase 2), they can rotate again (SOLVABLE:K+1) -> high proxy, low risk.
  // If extraCharges is small (Phase 4), they are stuck (UNSOLVABLE) -> high proxy, high risk.
  if (profile.meaningfulDecisionProxy > 0) {
    const u0 = entities.find(e => e.type === "unit");
    if (u0) {
      let nextDir: Direction = "up";
      if (u0.direction === "up") nextDir = "right";
      else if (u0.direction === "right") nextDir = "down";
      else if (u0.direction === "down") nextDir = "left";
      else if (u0.direction === "left") nextDir = "up";

      let obsRow = u0.row;
      let obsCol = u0.col;
      if (nextDir === "up") obsRow--;
      else if (nextDir === "down") obsRow++;
      else if (nextDir === "left") obsCol--;
      else if (nextDir === "right") obsCol++;

      // Only place if it's within the board and not occupied
      if (obsRow >= 0 && obsRow < boardRows && obsCol >= 0 && obsCol < boardCols) {
        let hasObs = entities.some(e => e.row === obsRow && e.col === obsCol);
        if (!hasObs) {
          entities.push({ id: `proxy_obs`, type: "obstacle", row: obsRow, col: obsCol, width: 1, height: 1 });
        }
      }
    }
  }

  let extraCharges = 0;
  if (profile.minDeadEndRisk > 0) {
    // For Phase 4/5, restrict charges to force dead ends
    extraCharges = 1;
  } else {
    extraCharges = 5;
  }
  
  let finalRotateCharges = rotateRequired + extraCharges;

  return {
    boardRows,
    boardCols,
    lives: baseLives(index),
    timeLimit: 30,
    rotateCharges: finalRotateCharges,
    entities,
  };
}
