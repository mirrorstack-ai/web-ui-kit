#!/bin/bash
# Hook: block files over 250 lines (skip files with @generated marker)

MAX_LINES=250

# Get the file path from the tool result
FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // .file // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

# Skip non-source files
case "$FILE_PATH" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac

# Skip files with @generated marker
if head -5 "$FILE_PATH" | grep -q '@generated'; then
  exit 0
fi

# Check line count
LINES=$(wc -l < "$FILE_PATH" | tr -d ' ')

if [ "$LINES" -gt "$MAX_LINES" ]; then
  echo "BLOCKED: $FILE_PATH has $LINES lines (max $MAX_LINES)."
  echo "Split the file into smaller modules, or add '// @generated' to the first 5 lines to skip this check."
  exit 1
fi

exit 0
