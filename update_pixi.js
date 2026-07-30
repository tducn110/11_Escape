const fs = require('fs');
const file = 'src/features/tribe-out/pixi/IsometricBoardBackdrop.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  "import { Application, Container, Graphics } from \"pixi.js\";",
  "import { Application, Container, Graphics, Sprite, Assets } from \"pixi.js\";"
);
content = content.replace(
  "const tilePoolRef = useRef<Graphics[]>([]);",
  "const tilePoolRef = useRef<(Graphics | Sprite)[]>([]);"
);
fs.writeFileSync(file, content);
