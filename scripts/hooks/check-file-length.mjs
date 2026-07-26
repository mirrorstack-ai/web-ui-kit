#!/usr/bin/env node
// Claude Code PostToolUse hook: block .ts/.tsx files over 250 lines.
// Node (not bash) so it runs identically on macOS, Linux, and Windows.
//
// Contract: Claude Code pipes the hook payload as JSON on stdin.
// Exit 0 = allow, exit 2 = block (stderr is fed back to Claude).

import { existsSync, readFileSync } from "node:fs";

const MAX_LINES = 250;

function readStdin() {
  try {
    return readFileSync(0, "utf-8");
  } catch {
    return "";
  }
}

const raw = readStdin();
let payload;
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}

const toolInput = payload?.tool_input ?? {};
const filePath = toolInput.file_path ?? toolInput.path ?? "";

if (!filePath || !/\.tsx?$/.test(filePath) || !existsSync(filePath)) {
  process.exit(0);
}

let contents;
try {
  contents = readFileSync(filePath, "utf-8");
} catch {
  process.exit(0);
}

const lines = contents.split("\n");
// Trailing newline yields a final empty element — `wc -l` parity.
if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();

// Skip generated files.
if (lines.slice(0, 5).some((line) => line.includes("@generated"))) {
  process.exit(0);
}

if (lines.length > MAX_LINES) {
  process.stderr.write(
    `BLOCKED: ${filePath} has ${lines.length} lines (max ${MAX_LINES}).\n` +
      `Run /simplify to break it into smaller modules.\n` +
      `Or add '// @generated' in the first 5 lines to skip this check.\n`,
  );
  process.exit(2);
}

process.exit(0);
