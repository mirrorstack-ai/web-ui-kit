import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "../src");
const COMPONENTS = join(SRC, "components");

interface ComponentInfo {
  name: string;
  path: string;
  description: string;
  filePath: string;
  dir: string;
}

async function loadMeta(filePath: string): Promise<{ name: string; description: string } | null> {
  try {
    const mod = await import(pathToFileURL(filePath).href);
    if (mod.meta?.name && mod.meta?.description) {
      return mod.meta;
    }
    return null;
  } catch {
    return null;
  }
}

function extractProps(filePath: string): string[] | null {
  const content = readFileSync(filePath, "utf-8");
  const match = content.match(/export interface \w+Props[\s\S]*?\{([\s\S]*?)\n\}/);
  if (!match) return null;
  return match[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//") && !l.startsWith("/*") && !l.startsWith("*"));
}

function extractExample(storyDir: string, componentName: string) {
  const storyFile = join(storyDir, `${componentName}.stories.tsx`);
  if (!existsSync(storyFile)) return null;
  const content = readFileSync(storyFile, "utf-8");

  const argsMatch = content.match(/args:\s*\{([\s\S]*?)\}/);
  const args = argsMatch
    ? argsMatch[1]
        .split("\n")
        .map((l) => l.trim().replace(/,$/, ""))
        .filter((l) => l && !l.startsWith("//"))
    : [];

  return { args, file: relative(process.cwd(), storyFile) };
}

function scanComponentPaths(baseDir: string, prefix: string) {
  const results: { mainFile: string; dir: string; path: string }[] = [];
  if (!existsSync(baseDir)) return results;

  for (const category of readdirSync(baseDir, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const categoryPath = join(baseDir, category.name);

    for (const component of readdirSync(categoryPath, { withFileTypes: true })) {
      if (!component.isDirectory()) continue;
      const componentPath = join(categoryPath, component.name);

      const files = readdirSync(componentPath);
      const mainFile = files.find(
        (f) => f.endsWith(".tsx") && !f.includes(".stories.") && !f.includes(".test.")
      );
      if (!mainFile) continue;

      results.push({
        mainFile: join(componentPath, mainFile),
        dir: componentPath,
        path: `${prefix}/${category.name}/${component.name}`,
      });
    }
  }
  return results;
}

async function scanComponents(baseDir: string, prefix: string): Promise<ComponentInfo[]> {
  const paths = scanComponentPaths(baseDir, prefix);
  const results: ComponentInfo[] = [];

  for (const p of paths) {
    const meta = await loadMeta(p.mainFile);
    results.push({
      name: meta?.name || p.mainFile.split("/").pop()!.replace(".tsx", ""),
      path: p.path,
      description: meta?.description || "",
      filePath: p.mainFile,
      dir: p.dir,
    });
  }
  return results;
}

async function main() {
const [command, ...args] = process.argv.slice(2);

if (command === "list" || !command) {
  const ui = await scanComponents(join(COMPONENTS, "ui"), "ui");
  const layout = await scanComponents(join(COMPONENTS, "layout"), "layout");

  if (ui.length) {
    console.log("UI Components\n");
    let lastCategory = "";
    for (const c of ui) {
      const cat = c.path.split("/")[1];
      if (cat !== lastCategory) {
        console.log(`  ${cat}/`);
        lastCategory = cat;
      }
      const desc = c.description ? `  ${c.description}` : "";
      console.log(`    ${c.name.padEnd(24)}${desc}`);
    }
    console.log();
  }

  if (layout.length) {
    console.log("Layouts\n");
    let lastCategory = "";
    for (const c of layout) {
      const cat = c.path.split("/")[1];
      if (cat !== lastCategory) {
        console.log(`  ${cat}/`);
        lastCategory = cat;
      }
      const desc = c.description ? `  ${c.description}` : "";
      console.log(`    ${c.name.padEnd(24)}${desc}`);
    }
    console.log();
  }

  if (!ui.length && !layout.length) {
    console.log("No components found.");
  }
} else if (command === "get") {
  const query = args[0];
  if (!query) {
    console.error("Usage: pnpm components get <path>\n");
    console.error("Example: pnpm components get ui/actions/button");
    process.exit(1);
  }

  const all = [
    ...(await scanComponents(join(COMPONENTS, "ui"), "ui")),
    ...(await scanComponents(join(COMPONENTS, "layout"), "layout")),
  ];

  const match = all.find(
    (c) => c.path === query || c.name.toLowerCase() === query.toLowerCase()
  );

  if (!match) {
    console.error(`Component not found: ${query}\n`);
    console.error("Available:");
    all.forEach((c) => console.error(`  ${c.path}  (${c.name})`));
    process.exit(1);
  }

  console.log(`${match.name}`);
  console.log(`Path: ${match.path}`);
  console.log(`File: ${relative(process.cwd(), match.filePath)}`);
  if (match.description) console.log(`Description: ${match.description}`);

  const props = extractProps(match.filePath);
  if (props) {
    console.log("\nProps:");
    props.forEach((p) => console.log(`  ${p}`));
  }

  const example = extractExample(match.dir, match.name);
  if (example) {
    console.log(`\nStory: ${example.file}`);
    if (example.args.length) {
      console.log("\nDefault args:");
      example.args.forEach((a) => console.log(`  ${a}`));
    }
  }

  console.log(`\nUsage:`);
  console.log(`  import { ${match.name} } from "@mirrorstack-ai/web-ui-kit";`);
} else if (command === "validate") {
  const allPaths = [
    ...scanComponentPaths(join(COMPONENTS, "ui"), "ui"),
    ...scanComponentPaths(join(COMPONENTS, "layout"), "layout"),
  ];

  let failed = 0;

  for (const p of allPaths) {
    const meta = await loadMeta(p.mainFile);
    const rel = relative(process.cwd(), p.mainFile);

    if (!meta) {
      console.error(`FAIL  ${rel}  — missing or invalid "meta" export`);
      failed++;
      continue;
    }

    if (!meta.name.trim()) {
      console.error(`FAIL  ${rel}  — meta.name is empty`);
      failed++;
    }
    if (!meta.description.trim()) {
      console.error(`FAIL  ${rel}  — meta.description is empty`);
      failed++;
    }

    if (meta.name.trim() && meta.description.trim()) {
      console.log(`PASS  ${rel}`);
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} component(s) missing metadata.`);
    process.exit(1);
  } else {
    console.log(`\nAll ${allPaths.length} component(s) have valid metadata.`);
  }
} else {
  console.error(`Unknown command: ${command}\n`);
  console.error("Commands:");
  console.error("  list                          List all components");
  console.error("  get <path|name>               Show component details");
  console.error("  validate                      Check all components have metadata");
  console.error("\nExamples:");
  console.error("  pnpm components list");
  console.error("  pnpm components get ui/actions/button");
  console.error("  pnpm components get Button");
  console.error("  pnpm components validate");
  process.exit(1);
}
}

main();
