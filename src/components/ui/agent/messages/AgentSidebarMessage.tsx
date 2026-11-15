import { cn } from "@/utils/cn";
import { AgentMarkdown } from "./AgentSidebarMarkdown";
import { AgentMessageActions } from "./AgentSidebarMessageActions";
import {
  AgentSidebarToolCall,
  type AgentToolCall,
  type AgentToolCallLabels,
} from "./AgentSidebarToolCall";

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

/** One ordered piece of a streamed agent reply: a run of response text or a
 *  tool call, in the order they occurred during streaming. Lets a single
 *  message interleave prose and tool rows (text → tool → more text) instead of
 *  hoisting every tool call to the top. */
export type AgentMessageSegment =
  | { type: "text"; text: string }
  | { type: "tool"; id: string; tool: AgentToolCall };

export interface AgentSidebarAgentMessageProps {
  /** Full reply text (concatenation of all text segments). Rendered as
   *  Markdown (GFM) when `segments` is absent; always the copy/replay source.
   *  Raw HTML in the content is never rendered. */
  content: string;
  /** Ordered text/tool segments. When present, the body renders these
   *  interleaved (preserving stream order) instead of the flat `content`.
   *  Omit for plain replies (replay rows, finished bubbles with no tools). */
  segments?: AgentMessageSegment[];
  /** Localizable status/aria text for any interleaved tool-call rows. */
  toolLabels?: AgentToolCallLabels;
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
  segments,
  toolLabels,
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
        {showThinking ? (
          <ThinkingDots />
        ) : segments && segments.length > 0 ? (
          <AgentSegments
            segments={segments}
            streaming={streaming}
            toolLabels={toolLabels}
          />
        ) : (
          <>
            <AgentMarkdown content={content} />
            {streaming && content.length > 0 && <StreamingCaret />}
          </>
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

/** Blinking caret trailing the live text while a reply streams. */
function StreamingCaret() {
  return (
    <span
      className="ml-0.5 inline-block w-[2px] h-4 align-middle bg-inverse-on-surface animate-pulse"
      aria-hidden
    />
  );
}

/** Render an ordered text/tool segment list in occurrence order. Each text run
 *  is its own markdown block; tool rows sit between the prose exactly where the
 *  stream emitted them. The blinking caret rides only the final text segment
 *  while streaming — a trailing tool call carries its own spinner instead.
 *  Each tool row gets a small top gap so it reads as a step between paragraphs,
 *  matching the tool-stack rhythm in AgentSidebarMessages. */
function AgentSegments({
  segments,
  streaming,
  toolLabels,
}: {
  segments: AgentMessageSegment[];
  streaming: boolean;
  toolLabels?: AgentToolCallLabels;
}) {
  // The caret rides the last text run ONLY when it's also the final segment —
  // a trailing tool call shows its own spinner, so a caret there would read as
  // a stray cursor floating after the prose.
  const caretIndex =
    streaming && segments[segments.length - 1]?.type === "text"
      ? segments.length - 1
      : -1;
  return (
    <>
      {segments.map((seg, i) =>
        seg.type === "tool" ? (
          // Tight symmetric gap so a tool row reads as a step between
          // paragraphs without the heavier list-level rhythm. Adjacent text
          // segments reset their own edge margins, so this is the only gap.
          <div key={seg.id} className="my-1.5 first:mt-0 last:mb-0">
            <AgentSidebarToolCall tool={seg.tool} toolLabels={toolLabels} />
          </div>
        ) : (
          <div key={`text-${i}`}>
            <AgentMarkdown content={seg.text} />
            {i === caretIndex && seg.text.length > 0 && <StreamingCaret />}
          </div>
        ),
      )}
    </>
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
