const fs = require('fs');
const path = require('path');

function generateLevels(numLevels) {
    const levels = [];
    
    for (let i = 1; i <= numLevels; i++) {
        let tier = Math.floor(i / 10); // 0 for 1-9, 1 for 10-19, 2 for 20-29...
        
        // Board size increases every 20 levels, maxing at 9x9
        let size = Math.min(9, 5 + Math.floor(i / 20)); 
        let boardCols = size;
        let boardRows = size;
        
        // Every x10, the difficulty spikes strongly:
        // 1. More obstacles based on tier
        // 2. Tighter time per unit
        // 3. Higher density of units
        
        let density = 0.4 + (tier * 0.04); // Density goes from 40% to 80%
        let maxUnits = Math.floor((boardCols * boardRows) * density);
        let numUnits = Math.min(3 + Math.floor(i * 0.8), maxUnits);
        
        let numObstacles = Math.floor(tier * 1.5 + (i % 10) / 4);
        
        // Time limit becomes much tighter as tier increases
        let timePerUnit = Math.max(0.8, 3.0 - (tier * 0.25));
        let timeLimit = Math.max(5, Math.floor(numUnits * timePerUnit + 5));
        
        const entities = [];
        const grid = Array.from({ length: boardRows }, () => Array(boardCols).fill(null));
        
        // Add obstacles
        for (let o = 0; o < numObstacles; o++) {
            let r = Math.floor(Math.random() * boardRows);
            let c = Math.floor(Math.random() * boardCols);
            if (grid[r][c] === null) {
                grid[r][c] = 'obs';
                entities.push({
                    id: `obs_${o}`,
                    type: "obstacle",
                    assetKey: "rock",
                    row: r,
                    col: c,
                    width: 1,
                    height: 1
                });
            }
        }
        
        // Backwards generation
        let unitCount = 0;
        let attempts = 0;
        const directions = ["up", "down", "left", "right"];
        
        while (unitCount < numUnits && attempts < 1500) {
            attempts++;
            let r = Math.floor(Math.random() * boardRows);
            let c = Math.floor(Math.random() * boardCols);
            if (grid[r][c] !== null) continue;
            
            let dir = directions[Math.floor(Math.random() * directions.length)];
            
            // Check path to edge based on dir
            let pathClear = true;
            if (dir === "up") {
                for (let r2 = r - 1; r2 >= 0; r2--) if (grid[r2][c] !== null) { pathClear = false; break; }
            } else if (dir === "down") {
                for (let r2 = r + 1; r2 < boardRows; r2++) if (grid[r2][c] !== null) { pathClear = false; break; }
            } else if (dir === "left") {
                for (let c2 = c - 1; c2 >= 0; c2--) if (grid[r][c2] !== null) { pathClear = false; break; }
            } else if (dir === "right") {
                for (let c2 = c + 1; c2 < boardCols; c2++) if (grid[r][c2] !== null) { pathClear = false; break; }
            }
            
            if (pathClear) {
                grid[r][c] = `u${unitCount}`;
                entities.push({
                    id: `u${unitCount}`,
                    type: "unit",
                    assetKey: `villager-${(unitCount % 7) + 1}`,
                    row: r,
                    col: c,
                    width: 1,
                    height: 1,
                    direction: dir
                });
                unitCount++;
            }
        }
        
        // Shuffle entities to hide the generated order
        entities.sort(() => Math.random() - 0.5);
        
        levels.push({
            id: i,
            boardRows,
            boardCols,
            lives: 3 + Math.floor(i / 30),
            timeLimit: timeLimit,
            tutorialText: i === 1 ? "Chạm vào nhân vật để họ chạy thoát! Chú ý thời gian!" : undefined,
            entities
        });
    }
    
    let out = `import type { TribeOutLevel } from "./types";\n\nexport const LEVELS: TribeOutLevel[] = ${JSON.stringify(levels, null, 2)};\n`;
    fs.writeFileSync(path.join(__dirname, '../src/features/tribe-out/levels.ts'), out);
}

generateLevels(100);
console.log("Levels generated with new difficulty curve.");
