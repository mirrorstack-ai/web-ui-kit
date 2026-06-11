import { useEffect, useRef, useState } from "react";
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
      <div className="max-w-full text-sm text-inverse-on-surface whitespace-pre-wrap break-words leading-relaxed">
        {showThinking ? <ThinkingDots /> : content}
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
    <div className="mt-1 -ml-1.5 flex items-center gap-0.5">
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
