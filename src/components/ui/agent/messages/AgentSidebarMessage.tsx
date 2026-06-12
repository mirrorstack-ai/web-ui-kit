import { useEffect, useRef, useState } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export interface AgentSidebarUserMessageProps {
  content: string;
  className?: string;
}

export function AgentSidebarUserMessage({
  content,
  className,
}: AgentSidebarUserMessageProps) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-inverse-on-surface/12 px-3 py-2 text-sm text-inverse-on-surface whitespace-pre-wrap break-words">
        {content}
      </div>
    </div>
  );
}

/** Feedback rating on an agent message. `null` clears a previous rating. */
export type AgentSidebarMessageFeedback = "up" | "down" | null;

/** Localizable aria-labels for the message action buttons (English defaults). */
export interface AgentSidebarMessageActionLabels {
  copy?: string;
  copied?: string;
  good?: string;
  bad?: string;
  rerun?: string;
}

export interface AgentSidebarAgentMessageProps {
  /** Rendered as Markdown (GFM). Raw HTML in the content is never rendered. */
  content: string;
  /** When true, renders typing indicator (if no content) or blinking cursor (if content). */
  streaming?: boolean;
  /** Current feedback rating reflected on the thumbs. */
  feedback?: AgentSidebarMessageFeedback;
  /** Copy was clicked. The kit only flashes the icon to a check — the
   *  consumer performs the actual clipboard write. Return `false` (sync or
   *  resolved), or reject, to suppress the success flash. */
  onCopy?: () => void | boolean | Promise<void | boolean>;
  /** Fired with the next rating: clicking the selected thumb yields null,
   *  clicking the other thumb switches. */
  onFeedback?: (rating: AgentSidebarMessageFeedback) => void;
  onRerun?: () => void;
  actionLabels?: AgentSidebarMessageActionLabels;
  className?: string;
}

export function AgentSidebarAgentMessage({
  content,
  streaming = false,
  feedback = null,
  onCopy,
  onFeedback,
  onRerun,
  actionLabels,
  className,
}: AgentSidebarAgentMessageProps) {
  const showThinking = streaming && content.length === 0;
  // Actions appear on finished messages only, and only when the consumer
  // wired at least one callback.
  const showActions = !streaming && !!(onCopy || onFeedback || onRerun);

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="max-w-full min-w-0 text-sm text-inverse-on-surface break-words leading-relaxed">
        {showThinking ? <ThinkingDots /> : <AgentMarkdown content={content} />}
        {streaming && content.length > 0 && (
          <span
            className="ml-0.5 inline-block w-[2px] h-4 align-middle bg-inverse-on-surface animate-pulse"
            aria-hidden
          />
        )}
      </div>
      {showActions && (
        <AgentMessageActions
          feedback={feedback}
          onCopy={onCopy}
          onFeedback={onFeedback}
          onRerun={onRerun}
          labels={actionLabels}
        />
      )}
    </div>
  );
}

// Spacing rhythm shared by every block element so a message starts and ends
// flush with its bubble regardless of which block comes first/last.
const BLOCK = "my-2 first:mt-0 last:mb-0";
// h2–h4 share identical size/weight; only h1 is promoted to text-base.
const HEADING_SM = cn(BLOCK, "mt-3 text-sm font-semibold");

/** Markdown element styling on the kit's inverse sidebar surface. Raw HTML is
 *  never rendered (no rehype-raw) — model-emitted tags stay inert text. */
const markdownComponents: Components = {
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
};

const REMARK_PLUGINS = [remarkGfm];

/** Agent reply body. Re-parses the full content on every render, which keeps
 *  streaming safe: an unterminated fence or half-written emphasis is just
 *  parsed as-is for that frame and settles once the closing chunk arrives. */
function AgentMarkdown({ content }: { content: string }) {
  return (
    <Markdown remarkPlugins={REMARK_PLUGINS} components={markdownComponents}>
      {content}
    </Markdown>
  );
}

const COPY_FLASH_MS = 1500;
// Same muted ink as AgentSidebarInput's composer icons.
const MUTED_INK = "text-inverse-on-surface/60 hover:text-inverse-on-surface";

function AgentMessageActions({
  feedback,
  onCopy,
  onFeedback,
  onRerun,
  labels,
}: {
  feedback: AgentSidebarMessageFeedback;
  onCopy?: () => void | boolean | Promise<void | boolean>;
  onFeedback?: (rating: AgentSidebarMessageFeedback) => void;
  onRerun?: () => void;
  labels?: AgentSidebarMessageActionLabels;
}) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const unmountedRef = useRef(false);

  useEffect(
    () => () => {
      unmountedRef.current = true;
      clearTimeout(copyTimerRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      // A `false` return (sync or resolved) or a rejection means the
      // consumer's clipboard write failed — don't flash success.
      if ((await onCopy?.()) === false) return;
    } catch {
      return;
    }
    if (unmountedRef.current) return;
    setCopied(true);
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), COPY_FLASH_MS);
  };

  const thumb = (rating: "up" | "down", icon: string, label: string) => {
    // Clicking the selected thumb toggles it off; the other thumb switches.
    const selected = feedback === rating;
    return (
      <IconButton
        icon={icon}
        fill={selected}
        variant="text"
        size="sm"
        className={selected ? "text-inverse-on-surface" : MUTED_INK}
        onClick={() => onFeedback?.(selected ? null : rating)}
        aria-label={label}
        aria-pressed={selected}
      />
    );
  };

  return (
    // -ml-1.5 cancels the icon button's inner padding so the first icon
    // optically aligns with the message text's left edge.
    <div className="pt-2 -ml-1.5 flex items-center gap-0.5">
      {onCopy && (
        <IconButton
          icon={copied ? "check" : "content_copy"}
          variant="text"
          size="sm"
          className={MUTED_INK}
          onClick={handleCopy}
          aria-label={copied ? (labels?.copied ?? "Copied") : (labels?.copy ?? "Copy")}
        />
      )}
      {onFeedback && (
        <>
          {thumb("up", "thumb_up", labels?.good ?? "Good response")}
          {thumb("down", "thumb_down", labels?.bad ?? "Bad response")}
        </>
      )}
      {onRerun && (
        <IconButton
          icon="refresh"
          variant="text"
          size="sm"
          className={MUTED_INK}
          onClick={onRerun}
          aria-label={labels?.rerun ?? "Rerun"}
        />
      )}
    </div>
  );
}

function ThinkingDots() {
  const dot = "inline-block w-1 h-1 rounded-full bg-inverse-on-surface";
  return (
    <span
      className="inline-flex items-center gap-0.5 py-0.5"
      role="status"
      aria-label="Agent is thinking"
    >
      <span className={cn(dot, "animate-bounce [animation-delay:-0.3s]")} />
      <span className={cn(dot, "animate-bounce [animation-delay:-0.15s]")} />
      <span className={cn(dot, "animate-bounce")} />
    </span>
  );
}
