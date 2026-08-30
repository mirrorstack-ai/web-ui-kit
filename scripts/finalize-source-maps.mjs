// Make every published source map self-contained. TypeScript honors
// inlineSources for JavaScript maps but omits sourcesContent from declaration
// maps, while the package intentionally does not publish its TypeScript tree.

import {
  readFileSync,
  readdirSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = realpathSync(
  resolve(dirname(fileURLToPath(import.meta.url)), ".."),
);
const sourceRoot = realpathSync(join(packageRoot, "src"));
const distRoot = realpathSync(join(packageRoot, "dist"));

function filesBelow(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

function isBelow(path, directory) {
  const child = relative(directory, path);
  return child !== "" && child !== ".." && !child.startsWith(`..${sep}`);
}

const maps = filesBelow(distRoot).filter((path) => path.endsWith(".map"));
if (maps.length === 0) {
  throw new Error("source-map finalizer found no maps in dist");
}

let embedded = 0;
for (const mapPath of maps) {
  const canonicalMapPath = realpathSync(mapPath);
  if (!isBelow(canonicalMapPath, distRoot)) {
    throw new Error(`${relative(packageRoot, mapPath)} resolves outside dist`);
  }

  const map = JSON.parse(readFileSync(canonicalMapPath, "utf8"));
  if (!Array.isArray(map.sources) || map.sources.length === 0) {
    throw new Error(`${relative(packageRoot, mapPath)} has no sources`);
  }
  if (map.sourceRoot !== undefined && map.sourceRoot !== "") {
    throw new Error(`${relative(packageRoot, mapPath)} has an unsupported sourceRoot`);
  }

  const contents = Array.isArray(map.sourcesContent)
    ? [...map.sourcesContent]
    : new Array(map.sources.length);
  if (contents.length !== map.sources.length) {
    throw new Error(`${relative(packageRoot, mapPath)} has mismatched sourcesContent`);
  }

  for (const [index, source] of map.sources.entries()) {
    if (typeof source !== "string" || source === "") {
      throw new Error(`${relative(packageRoot, mapPath)} has an invalid source path`);
    }
    if (
      contents[index] !== undefined &&
      contents[index] !== null &&
      typeof contents[index] !== "string"
    ) {
      throw new Error(`${relative(packageRoot, mapPath)} has invalid source content`);
    }

    const sourcePath = realpathSync(resolve(dirname(canonicalMapPath), source));
    if (!isBelow(sourcePath, sourceRoot)) {
      throw new Error(
        `${relative(packageRoot, mapPath)} references source outside src: ${source}`,
      );
    }
    const sourceContent = readFileSync(sourcePath, "utf8");
    if (typeof contents[index] === "string") {
      if (contents[index] !== sourceContent) {
        throw new Error(`${relative(packageRoot, mapPath)} has stale source content`);
      }
      continue;
    }

    contents[index] = sourceContent;
    embedded += 1;
  }

  map.sourcesContent = contents;
  writeFileSync(canonicalMapPath, JSON.stringify(map));
}

console.log(`source maps: ${maps.length} self-contained (${embedded} sources embedded)`);
