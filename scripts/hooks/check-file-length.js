// Hook: block files over 250 lines (skip files with @generated marker)

const fs = require("fs");
const path = require("path");

const MAX_LINES = 250;

const toolInput = process.env.CLAUDE_TOOL_INPUT;
if (!toolInput) process.exit(0);

let filePath;
try {
  const parsed = JSON.parse(toolInput);
  filePath = parsed.file_path || parsed.file;
} catch {
  process.exit(0);
}

if (!filePath || !fs.existsSync(filePath)) process.exit(0);

const ext = path.extname(filePath);
if (ext !== ".ts" && ext !== ".tsx") process.exit(0);

const content = fs.readFileSync(filePath, "utf8");
const lines = content.split("\n");

// Skip files with @generated marker in first 5 lines
const header = lines.slice(0, 5).join("\n");
if (header.includes("@generated")) process.exit(0);

if (lines.length > MAX_LINES) {
  console.log(`BLOCKED: ${filePath} has ${lines.length} lines (max ${MAX_LINES}).`);
  console.log("Run /simplify to break it into smaller modules.");
  console.log("Or add '// @generated' in the first 5 lines to skip this check.");
  process.exit(1);
}

process.exit(0);
