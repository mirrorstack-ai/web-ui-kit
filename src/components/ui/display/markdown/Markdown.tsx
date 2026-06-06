import { memo, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Markdown",
  description:
    "Minimal markdown renderer for the kit's typography tokens — headings (# / ## / ###), paragraphs, unordered lists, fenced code blocks, inline **bold** and `code`. Memoized so re-renders don't re-parse the source.",
};

export interface MarkdownProps {
  source: string;
  className?: string;
}

const INLINE_TOKEN_RE = /(\*\*[^*]+\*\*|`[^`]+`)/g;
const CRLF_RE = /\r\n?/g;
const HEADING_RE = /^(#{1,3}) (.*)$/;
const LIST_RE = /^[-*] /;

const HEADING_LEVELS: Record<
  1 | 2 | 3,
  { Tag: "h3" | "h4" | "h5"; cls: string }
> = {
  1: { Tag: "h3", cls: "text-xl font-medium text-on-surface mt-4 first:mt-0" },
  2: { Tag: "h4", cls: "text-base font-medium text-on-surface mt-4 first:mt-0" },
  3: { Tag: "h5", cls: "text-sm font-medium text-on-surface mt-3 first:mt-0" },
};

function renderInline(text: string): ReactNode {
  const tokens = text.split(INLINE_TOKEN_RE);
  return tokens.map((t, i) => {
    if (!t) return null;
    if (t.startsWith("**") && t.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-on-surface">
          {t.slice(2, -2)}
        </strong>
      );
    }
    if (t.startsWith("`") && t.endsWith("`")) {
      return (
        <code
          key={i}
          className="font-mono bg-surface-container text-on-surface px-1 py-0.5 rounded text-xs"
        >
          {t.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{t}</span>;
  });
}

export const Markdown = memo(function Markdown({ source, className }: MarkdownProps) {
  const lines = source.replace(CRLF_RE, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    const heading = line.match(HEADING_RE);
    if (heading) {
      const level = heading[1].length as 1 | 2 | 3;
      const text = heading[2];
      const { Tag, cls } = HEADING_LEVELS[level];
      blocks.push(
        <Tag key={blocks.length} className={cls}>
          {text}
        </Tag>,
      );
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3);
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre
          key={blocks.length}
          className="text-xs font-mono bg-surface-container text-on-surface p-3 rounded-lg overflow-x-auto leading-relaxed"
        >
          {lang && (
            <span className="block text-on-surface-variant/60 mb-1">{lang}</span>
          )}
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (LIST_RE.test(line)) {
      const items: string[] = [];
      while (i < lines.length && LIST_RE.test(lines[i])) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul
          key={blocks.length}
          className="list-disc pl-5 space-y-0.5 text-sm text-on-surface leading-relaxed"
        >
          {items.map((it, j) => (
            <li key={j}>{renderInline(it)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !HEADING_RE.test(lines[i]) &&
      !lines[i].startsWith("```") &&
      !LIST_RE.test(lines[i])
    ) {
      paragraph.push(lines[i]);
      i++;
    }
    blocks.push(
      <p
        key={blocks.length}
        className="text-sm text-on-surface-variant leading-relaxed"
      >
        {renderInline(paragraph.join(" "))}
      </p>,
    );
  }
  return <div className={cn("space-y-2", className)}>{blocks}</div>;
});
