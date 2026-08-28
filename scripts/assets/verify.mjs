/**
 * Asset verification for the Animal Escape build.
 *
 * Checks:
 *  1. every required file exists (wink bridge, entrypoints);
 *  2. every asset reference in src (ts/tsx/mjs/js/css/html/json, quoted and
 *     BASE_URL-concat paths) resolves to a real file under public/;
 *  3. no public file is orphaned — wink files and the generated atlas are
 *     allow-listed, everything else must be referenced from source;
 *  4. the gameplay atlas is consistent: every manifest frame exists in the
 *     atlas JSON, every atlas frame is in the manifest, frame rects stay
 *     inside the atlas image bounds;
 *  5. size budgets: gameplay atlas <= 1MB, total public assets <= 4MB.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PUBLIC_DIR = join(ROOT, "public");
const SRC_DIR = join(ROOT, "src");

const REQUIRED_PUBLIC_FILES = [
  "wink-bridge.js",
  "wink-bridge.lock.json",
  "wink-runtime-config.json",
];

const REQUIRED_SRC_FILES = [
  "src/main.tsx",
  "src/app/App.tsx",
  "src/styles/index.css",
];

const GENERATED_ATLAS_DIR = "assets/animal-escape/generated";
const ATLAS_IMAGE = "gameplay.webp";
const ATLAS_JSON = "gameplay.json";

/** Content files that may reference assets (quoted refs or css url()). */
const REFERENCE_EXTENSIONS = /\.(ts|tsx|mjs|js|css|html|json)$/;
const QUOTED_ASSET = /(?:["'`(])([A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg|mp3|ogg|wav|woff2?|json))["'`)]?/g;
const BASE_URL_ASSET = /BASE_URL\s*\+\s*["'`]([A-Za-z0-9_./-]+)["'`]/g;
/** css url() may reference directories without extensions (e.g. /background/). */
const CSS_URL = /url\(\s*["']?([A-Za-z0-9_./-]+)["']?\s*\)/g;

function collectFiles(dir, prefix = "") {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...collectFiles(full, `${prefix}${entry}/`));
    } else {
      files.push({ path: `${prefix}${entry}`, full, bytes: stat.size });
    }
  }
  return files;
}

function findAssetReferences() {
  const references = new Set();
  const seen = new Set();

  const add = (ref, file, kind) => {
    if (!ref || ref.startsWith("http") || ref.startsWith("data:")) return;
    const key = `${ref}@${file}`;
    if (seen.has(key)) return;
    seen.add(key);
    references.add({ ref, file, kind });
  };

  for (const file of [...collectFiles(SRC_DIR), { path: "index.html", full: join(ROOT, "index.html") }]) {
    if (!REFERENCE_EXTENSIONS.test(file.path)) continue;
    let content;
    try {
      content = readFileSync(file.full, "utf8");
    } catch {
      continue;
    }
    const isCss = /\.css$/.test(file.path);
    for (const match of content.matchAll(isCss ? CSS_URL : QUOTED_ASSET)) {
      add(match[1], file.path, isCss ? "css-url" : "quoted");
    }
    for (const match of content.matchAll(BASE_URL_ASSET)) {
      add(match[1], file.path, "base-url");
    }
  }

  return [...references];
}

function isFile(path) {
  return (statSync(path, { throwIfNoEntry: false }) ?? false).isFile?.() === true;
}

function resolveFromPublic(ref) {
  const clean = ref.replace(/^\/+/, "");
  const candidate = join(PUBLIC_DIR, clean);
  if (candidate.startsWith(PUBLIC_DIR) && isFile(candidate)) {
    return clean;
  }
  return null;
}

function parseAtlasManifestFrameIds() {
  const content = readFileSync(join(SRC_DIR, "features", "animal-escape", "rendering", "pixi", "animalAtlas.ts"), "utf8");
  const frames = new Set(content.matchAll(/"(animal-[a-z-]+|arrow)"/g).map(match => match[1]));
  return [...frames].sort();
}

function verifyAtlas(issues, publicFiles) {
  const jsonPath = join(PUBLIC_DIR, GENERATED_ATLAS_DIR, ATLAS_JSON);
  const imagePath = join(PUBLIC_DIR, GENERATED_ATLAS_DIR, ATLAS_IMAGE);
  if (!isFile(jsonPath)) {
    issues.push(`missing generated atlas json: ${GENERATED_ATLAS_DIR}/${ATLAS_JSON} (run pnpm assets:build)`);
    return;
  }
  if (!isFile(imagePath)) {
    issues.push(`missing generated atlas image: ${GENERATED_ATLAS_DIR}/${ATLAS_IMAGE} (run pnpm assets:build)`);
    return;
  }

  let atlas;
  try {
    atlas = JSON.parse(readFileSync(jsonPath, "utf8"));
  } catch (error) {
    issues.push(`atlas json is not parseable: ${error?.message ?? error}`);
    return;
  }

  const manifestFrames = parseAtlasManifestFrameIds();
  const atlasFrames = Object.keys(atlas.frames ?? {}).sort();
  const meta = atlas.meta ?? {};

  const missingInAtlas = manifestFrames.filter(frame => !atlasFrames.includes(frame));
  if (missingInAtlas.length > 0) {
    issues.push(`manifest frames missing from atlas: ${missingInAtlas.join(", ")}`);
  }
  const unreferencedInAtlas = atlasFrames.filter(frame => !manifestFrames.includes(frame));
  if (unreferencedInAtlas.length > 0) {
    issues.push(`atlas frames not in manifest: ${unreferencedInAtlas.join(", ")}`);
  }

  const atlasWidth = meta.size?.w ?? 0;
  const atlasHeight = meta.size?.h ?? 0;
  for (const [frame, data] of Object.entries(atlas.frames ?? {})) {
    const rect = data?.frame;
    if (!rect || typeof rect.x !== "number" || typeof rect.y !== "number" || typeof rect.w !== "number" || typeof rect.h !== "number") {
      issues.push(`atlas frame ${frame} has no valid rect`);
      continue;
    }
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.w > atlasWidth || rect.y + rect.h > atlasHeight) {
      issues.push(`atlas frame ${frame} is outside atlas bounds (${atlasWidth}x${atlasHeight})`);
    }
  }

  const imageBytes = (statSync(imagePath) ?? { size: 0 }).size;
  const ATLAS_BUDGET_BYTES = 1024 * 1024;
  if (imageBytes > ATLAS_BUDGET_BYTES) {
    issues.push(`atlas image exceeds budget: ${imageBytes} > ${ATLAS_BUDGET_BYTES} bytes`);
  }
}

const issues = [];

for (const required of REQUIRED_PUBLIC_FILES) {
  const candidate = join(PUBLIC_DIR, required);
  if (!isFile(candidate)) {
    issues.push(`missing required public file: ${required}`);
  }
}
for (const required of REQUIRED_SRC_FILES) {
  if (!isFile(join(ROOT, required))) {
    issues.push(`missing required source file: ${required}`);
  }
}

const references = findAssetReferences();
for (const { ref, file, kind } of references) {
  if (resolveFromPublic(ref)) continue;
  // A few quoted strings name repository files (wink-integration.json,
  // package.json, ...) rather than served assets — allow those.
  const clean = ref.replace(/^\/+/, "");
  const repoCandidate = join(ROOT, clean);
  if (repoCandidate.startsWith(ROOT) && isFile(repoCandidate)) continue;
  issues.push(`asset reference does not exist under public/ [${kind}] ${file}: ${ref}`);
}

const publicFiles = collectFiles(PUBLIC_DIR);
const referencedPaths = new Set(references.map(({ ref }) => resolveFromPublic(ref)).filter(Boolean));
const generatedPaths = new Set([
  `${GENERATED_ATLAS_DIR}/${ATLAS_JSON}`,
  `${GENERATED_ATLAS_DIR}/${ATLAS_IMAGE}`,
]);
const deadAssets = publicFiles
  .map(file => file.path)
  .filter(path => !referencedPaths.has(path) && !generatedPaths.has(path) && !REQUIRED_PUBLIC_FILES.includes(path))
  .sort();

if (deadAssets.length > 0) {
  issues.push(`unused public assets (no source references): ${deadAssets.join(", ")}`);
}

verifyAtlas(issues, publicFiles);

const totalBytes = publicFiles.reduce((sum, file) => sum + file.bytes, 0);
const TOTAL_BUDGET_BYTES = 4 * 1024 * 1024;
if (totalBytes > TOTAL_BUDGET_BYTES) {
  issues.push(`total public assets exceed budget: ${totalBytes} > ${TOTAL_BUDGET_BYTES} bytes`);
}

if (issues.length > 0) {
  console.error(JSON.stringify({ valid: false, issues }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({
  valid: true,
  publicFiles: publicFiles.length,
  publicBytes: totalBytes,
  referencedAssets: references.length,
}, null, 2));