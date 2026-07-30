
# 11_Escape

Production stabilization workspace for the `Tribe Out / Escape` Figma Make export.

## Runtime

Current runtime path:

```txt
index.html
-> src/main.tsx
-> src/app/App.tsx
-> src/features/tribe-out/TribeOutGame.tsx
```

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm test`

## Scope

This repo keeps the existing React DOM game and stabilizes it for production:

- preserve the current visual direction from `DESIGN.md`
- improve reliability, tests, responsiveness, and accessibility
- remove generated scaffold only after validation proves it is unused

Non-goals:

- no backend
- no auth
- no leaderboard
- no shop or ads
- no PixiJS in v1
  
