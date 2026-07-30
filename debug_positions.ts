import { getIsoBoardLayout, projectIsoEntity } from "./src/features/tribe-out/isometric.ts";
import type { TribeOutEntity } from "./src/features/tribe-out/types.ts";

const layout = getIsoBoardLayout(7, 7, 500, 500);
console.log("layout:", layout);

const u0: TribeOutEntity = {
  id: "u0", type: "unit", assetKey: "villager-2", row: 1, col: 0, width: 1, height: 1, direction: "right", escaped: false
};
const projected0 = projectIsoEntity(layout, u0);
console.log("u0 projected:", projected0);

const size = Math.max(32, Math.round(projected0.size));
const left = Math.round(projected0.x - size / 2);
console.log("u0 left:", left, "size:", size);
