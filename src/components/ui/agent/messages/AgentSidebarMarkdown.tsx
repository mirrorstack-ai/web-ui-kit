import Markdown, {
  defaultUrlTransform,
  type Components,
  type UrlTransform,
} from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/utils/cn";

// Spacing rhythm shared by every block element so a message starts and ends
// flush with its bubble regardless of which block comes first/last.
const BLOCK = "my-2 first:mt-0 last:mb-0";
// h2–h4 share identical size/weight; only h1 is promoted to text-base.
const HEADING_SM = cn(BLOCK, "mt-3 text-sm font-semibold");

/** Markdown element styling on the kit's inverse sidebar surface. Raw HTML is
 *  never rendered (no rehype-raw) — model-emitted tags stay inert text.
 *  `img` is text-only on purpose: a model-written `![x](https://attacker…)`
 *  must never become a real `<img>`, or the browser fetches the attacker's
 *  URL (and whatever the model encoded in it) as a side effect of rendering
 *  the reply. This renders the alt text only and never forwards `src` or
 *  `srcset`. `agentMarkdownUrlTransform` below is a second, independent layer
 *  that empties image URLs even if this entry is ever removed. */
export const markdownComponents: Components = {
  p: ({ node: _node, ...props }) => <p className={BLOCK} {...props} />,
  a: ({ node: _node, ...props }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 decoration-inverse-on-surface/50 hover:decoration-inverse-on-surface"
      {...props}
    />
  ),
  ul: ({ node: _node, ...props }) => (
    <ul className={cn(BLOCK, "list-disc pl-5 space-y-1")} {...props} />
  ),
  ol: ({ node: _node, ...props }) => (
    <ol className={cn(BLOCK, "list-decimal pl-5 space-y-1")} {...props} />
  ),
  h1: ({ node: _node, ...props }) => (
    <h1 className={cn(BLOCK, "mt-3 text-base font-semibold")} {...props} />
  ),
  h2: ({ node: _node, ...props }) => <h2 className={HEADING_SM} {...props} />,
  h3: ({ node: _node, ...props }) => <h3 className={HEADING_SM} {...props} />,
  h4: ({ node: _node, ...props }) => <h4 className={HEADING_SM} {...props} />,
  // Inline code chip. Fenced code lives inside <pre>, which resets the chip
  // styles below so block code reads as one surface, not nested chips.
  code: ({ node: _node, ...props }) => (
    <code
      className="rounded bg-inverse-on-surface/15 px-1 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: ({ node: _node, ...props }) => (
    <pre
      className={cn(
        BLOCK,
        "overflow-x-auto rounded-lg bg-inverse-on-surface/10 p-3 font-mono text-xs leading-relaxed",
        "[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-xs",
      )}
      {...props}
    />
  ),
  blockquote: ({ node: _node, ...props }) => (
    <blockquote
      className={cn(BLOCK, "border-l-2 border-inverse-on-surface/30 pl-3 text-inverse-on-surface/80")}
      {...props}
    />
  ),
  hr: ({ node: _node, ...props }) => (
    <hr className={cn(BLOCK, "my-3 border-inverse-on-surface/20")} {...props} />
  ),
  // GFM tables: the wrapper owns horizontal overflow so a wide table scrolls
  // instead of stretching the sidebar.
  table: ({ node: _node, ...props }) => (
    <div className={cn(BLOCK, "overflow-x-auto")}>
      <table className="w-full border-collapse text-xs" {...props} />
    </div>
  ),
  th: ({ node: _node, ...props }) => (
    <th
      className="border border-inverse-on-surface/20 px-2 py-1 text-left font-semibold"
      {...props}
    />
  ),
  td: ({ node: _node, ...props }) => (
    <td className="border border-inverse-on-surface/20 px-2 py-1" {...props} />
  ),
  // Alt text only — see the file-level note on why `src`/`srcset` never
  // reach the DOM. Empty alt renders nothing rather than an empty string.
  img: ({ alt }) => (alt ? <>{alt}</> : null),
};

/** Second, independent layer against model-written images: empties the URL
 *  for any `img` node before react-markdown would otherwise set `src`, so
 *  the data-leak hole stays closed even if the `img` override above is ever
 *  removed. Non-image URLs (links) keep today's default protocol allowlist. */
export const agentMarkdownUrlTransform: UrlTransform = (url, key, node) =>
  node.tagName === "img" ? "" : defaultUrlTransform(url);

const REMARK_PLUGINS = [remarkGfm];

/** Agent reply body. Re-parses the full content on every render, which keeps
 *  streaming safe: an unterminated fence or half-written emphasis is just
 *  parsed as-is for that frame and settles once the closing chunk arrives. */
export function AgentMarkdown({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={REMARK_PLUGINS}
      components={markdownComponents}
      urlTransform={agentMarkdownUrlTransform}
    >
      {content}
    </Markdown>
  );
}
