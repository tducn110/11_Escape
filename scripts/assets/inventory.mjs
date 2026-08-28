import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PUBLIC_DIR = join(ROOT, "public");
const SRC_DIR = join(ROOT, "src");

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|gif|svg)$/;

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
  const pattern = /(?:["'`]|\/)([A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg|mp3|ogg|wav|woff2?))["'`]?/g;
  const baseUrlPattern = /BASE_URL\s*\+\s*["'`]([A-Za-z0-9_./-]+)["'`]/g;
  for (const file of collectFiles(SRC_DIR)) {
    if (!/\.(ts|tsx|mjs|js)$/.test(file.path)) continue;
    const content = readFileSync(file.full, "utf8");
    for (const match of content.matchAll(pattern)) {
      const ref = match[1];
      if (ref.startsWith("http") || ref.startsWith("data:")) continue;
      references.add(ref);
    }
    for (const match of content.matchAll(baseUrlPattern)) {
      references.add(match[1]);
    }
  }
  return [...references];
}

async function imageMetadata(file) {
  try {
    const metadata = await sharp(file.full).metadata();
    return { format: metadata.format ?? null, width: metadata.width ?? null, height: metadata.height ?? null };
  } catch {
    return { format: "svg-xml", width: null, height: null };
  }
}

const REQUIRED_PUBLIC_FILES = [
  "wink-bridge.js",
  "wink-bridge.lock.json",
  "wink-runtime-config.json",
];

const publicFiles = collectFiles(PUBLIC_DIR);
const references = findAssetReferences();

const files = [];
for (const file of publicFiles) {
  const entry = { path: file.path, bytes: file.bytes };
  if (IMAGE_EXTENSIONS.test(file.path)) {
    Object.assign(entry, await imageMetadata(file));
  }
  files.push(entry);
}

const inventory = {
  root: ROOT,
  totalPublicFiles: publicFiles.length,
  publicBytes: publicFiles.reduce((sum, file) => sum + file.bytes, 0),
  requiredFiles: REQUIRED_PUBLIC_FILES,
  files,
  srcReferences: references.map(({ ref }) => ref),
};

console.log(JSON.stringify(inventory, null, 2));