const fs = require('fs');
let content = fs.readFileSync('src/features/tribe-out/AnimalSprite.tsx', 'utf8');

const replacement = `{direction && (
        <g transform={\`rotate(\${{ down: 0, left: 90, up: 180, right: 270 }[direction]} 50 50) translate(50 85)\`}>
          <circle r="10" fill="#fff" stroke={a.bodyDark} strokeWidth="2" />
          <path d="M0 4.5 L-4.5 -3 L4.5 -3 Z" fill={a.bodyDark} />
        </g>
      )}`;

content = content.replace(/\{direction && \(\s*<g transform="translate\(50 85\)">\s*<circle r="10" fill="#fff" stroke=\{a\.bodyDark\} strokeWidth="2" \/>\s*<path d="M0 4\.5 L-4\.5 -3 L4\.5 -3 Z" fill=\{a\.bodyDark\} \/>\s*<\/g>\s*\)\}/g, replacement);

fs.writeFileSync('src/features/tribe-out/AnimalSprite.tsx', content);
