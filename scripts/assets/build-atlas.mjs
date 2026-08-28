/**
 * Build the gameplay sprite atlas from the authored animal SVGs.
 *
 * Pipeline: SVG -> rasterize at fixed frame size -> shelf bin-pack ->
 * composite -> lossless WebP + Pixi v8 spritesheet JSON.
 *
 * Frames are 256px so a 2x-DPR board cell never upscales; flat-color art
 * keeps the lossless WebP small. The generated files under
 * public/assets/animal-escape/generated are committed, and
 * `pnpm assets:verify` checks them against the manifest and budgets.
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SOURCE_DIR = join(ROOT, "src", "assets", "animals");
const OUT_DIR = join(ROOT, "public", "assets", "animal-escape", "generated");

const FRAME_SIZE = 256;
const SHELF_MAX_WIDTH = 6;
const ATLAS_IMAGE = "gameplay.webp";

/** Frames that must exist; every other SVG in the source dir is a frame too. */
const FIXED_FRAMES = ["arrow"];

function collectSvgs() {
  const frames = new Set(FIXED_FRAMES);
  for (const entry of readdirSync(SOURCE_DIR)) {
    const match = /^([a-z0-9-]+)\.svg$/.exec(entry);
    if (match) frames.add(match[1]);
  }
  return [...frames].sort();
}

async function rasterizeFrame(name) {
  const input = await sharp(join(SOURCE_DIR, `${name}.svg`), { density: 144 })
    .resize(FRAME_SIZE, FRAME_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (input.info.width !== FRAME_SIZE || input.info.height !== FRAME_SIZE) {
    throw new Error(`frame ${name} rasterized to ${input.info.width}x${input.info.height}, expected ${FRAME_SIZE}`);
  }
  return { name, buffer: input.data };
}

/** Simple shelf packer: fixed-height shelves, left to right, top to bottom. */
function pack(frames) {
  const columns = Math.min(SHELF_MAX_WIDTH, frames.length);
  const rows = Math.ceil(frames.length / columns);
  const width = columns * FRAME_SIZE;
  const height = rows * FRAME_SIZE;

  const placements = frames.map((frame, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    return {
      name: frame.name,
      x: col * FRAME_SIZE,
      y: row * FRAME_SIZE,
      w: FRAME_SIZE,
      h: FRAME_SIZE,
      buffer: frame.buffer,
    };
  });

  return { width, height, placements };
}

async function main() {
  const names = collectSvgs();
  const frames = [];
  for (const name of names) {
    frames.push(await rasterizeFrame(name));
  }

  const { width, height, placements } = pack(frames);

  const canvas = sharp({
    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  });

  const composites = placements.map(frame => ({
    input: Buffer.from(frame.buffer),
    raw: { width: frame.w, height: frame.h, channels: 4 },
    left: frame.x,
    top: frame.y,
  }));

  const atlas = await canvas
    .composite(composites)
    .webp({ lossless: true })
    .toBuffer({ resolveWithObject: true });

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, ATLAS_IMAGE), atlas.data);
  writeFileSync(
    join(OUT_DIR, "gameplay.json"),
    JSON.stringify(
      {
        frames: Object.fromEntries(
          placements.map(frame => [
            frame.name,
            { frame: { x: frame.x, y: frame.y, w: frame.w, h: frame.h } },
          ]),
        ),
        meta: {
          image: ATLAS_IMAGE,
          size: { w: width, h: height },
          scale: 1,
          format: "webp",
        },
      },
      null,
      2,
    ),
  );

  console.log(JSON.stringify(
    {
      valid: true,
      frames: placements.length,
      atlas: `${width}x${height}`,
      bytes: atlas.info.size,
      output: join(OUT_DIR, ATLAS_IMAGE),
      metadata: statSync(join(OUT_DIR, ATLAS_IMAGE)).size,
    },
    null,
    2,
  ));
}

main().catch(error => {
  console.error(JSON.stringify({ valid: false, error: String(error?.message ?? error) }, null, 2));
  process.exit(1);
});