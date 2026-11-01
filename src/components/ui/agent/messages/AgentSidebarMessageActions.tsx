import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import type {
  AgentSidebarMessageActionLabels,
  AgentSidebarMessageFeedback,
} from "./AgentSidebarMessage";

const COPY_FLASH_MS = 1500;
// Same muted ink as AgentSidebarInput's composer icons.
const MUTED_INK = "text-inverse-on-surface/60 hover:text-inverse-on-surface";

export function AgentMessageActions({
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
