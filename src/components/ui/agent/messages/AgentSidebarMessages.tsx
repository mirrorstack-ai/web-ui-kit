import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Logo } from "@/components/ui/media/logo/Logo";
import {
  AgentSidebarUserMessage,
  AgentSidebarAgentMessage,
  type AgentMessageSegment,
  type AgentSidebarMessageFeedback,
  type AgentSidebarMessageActionLabels,
} from "./AgentSidebarMessage";
import {
  AgentSidebarMultiQuestion,
  type AgentSidebarQuestion,
  type AgentSidebarMultiQuestionStatus,
  type AgentSidebarMultiQuestionAnswer,
  type AgentSidebarMultiQuestionLayout,
} from "../asks/AgentSidebarMultiQuestion";
import {
  AgentSidebarToolCall,
  type AgentToolCall,
  type AgentToolCallLabels,
} from "./AgentSidebarToolCall";

export type AgentSidebarMessage =
  | {
      id: string;
      role: "user";
      content: string;
    }
  | {
      id: string;
      role: "agent";
      content: string;
      /** Ordered text/tool segments — when present the bubble renders them
       *  interleaved so streamed tool calls sit between the response text
       *  instead of hoisted to the top. */
      segments?: AgentMessageSegment[];
      streaming?: boolean;
      feedback?: AgentSidebarMessageFeedback;
    }
  | {
      id: string;
      role: "agent";
      kind: "multi-question";
      title: string;
      description?: string;
      questions: AgentSidebarQuestion[];
      submitLabel?: string;
      status?: AgentSidebarMultiQuestionStatus;
      layout?: AgentSidebarMultiQuestionLayout;
    }
  | {
      id: string;
      role: "tool";
      tool: AgentToolCall;
    };

export interface AgentSidebarMessagesProps {
  messages: AgentSidebarMessage[];
  onSubmitMultiQuestion?: (
    messageId: string,
    answers: Record<string, AgentSidebarMultiQuestionAnswer>,
  ) => void;
  /** Copy was clicked on a finished agent message. The kit only flashes the
   *  icon — the consumer performs the actual clipboard write. Return `false`
   *  (sync or resolved), or reject, to suppress the success flash. */
  onCopyMessage?: (messageId: string) => void | boolean | Promise<void | boolean>;
  /** Fired with the next rating: clicking the selected thumb yields null,
   *  clicking the other thumb switches. */
  onRateMessage?: (
    messageId: string,
    rating: AgentSidebarMessageFeedback,
  ) => void;
  onRerunMessage?: (messageId: string) => void;
  /** Localizable aria-labels for the action buttons (English defaults). */
  actionLabels?: AgentSidebarMessageActionLabels;
  /** Localizable status/aria text for tool-call rows (English defaults). */
  toolLabels?: AgentToolCallLabels;
  /** Render the brand logo once below the list when the last message is an
   *  agent reply — a clear platform signature, never per-message. While that
   *  reply is still streaming the mark spins as a "responding" indicator. */
  showLogo?: boolean;
  /** Auto-scroll to the latest message. Default: true. */
  autoScroll?: boolean;
  /** Rendered in place of the list when there are no messages — the host's
   *  personalized opener (e.g. "Hi, Sam, ask me anything about this app").
   *  Omit to keep the kit's soft generic line so existing consumers are
   *  unchanged. A node slot (not a string) so hosts can style/i18n freely. */
  emptyState?: ReactNode;
  /** Hide the MirrorStack logo shown above the empty-state opener. Defaults to
   *  false (logo shown) — mirrors `AgentGreeting`'s `hideLogo`. The empty
   *  sidebar reads as a branded hero just like the greeting surface. */
  hideEmptyStateLogo?: boolean;
  className?: string;
}

/** The kit's fallback opener when a host wires no `emptyState`. Intentionally
 *  plain — hosts are expected to override with a personalized line. */
const DEFAULT_EMPTY_STATE = (
  <p className="px-1 py-2 text-sm text-inverse-on-surface/60">
    Ask the agent anything.
  </p>
);

/** Brand signature above the empty-state opener — the same MirrorStack `Logo`
 *  the greeting hero shows, sized for the narrower sidebar (size-10 vs the
 *  hero's size-14). The aperture mark carries its own fixed brand colours and a
 *  transparent centre, so it needs no background tint — adding one would paint a
 *  solid square behind the mark. Decorative: the host's opener carries the
 *  accessible name. Exported so `AppShell`, which renders the empty body itself,
 *  paints the identical logo without duplicating the markup. */
export const AGENT_EMPTY_STATE_LOGO = (
  <div aria-hidden className="flex justify-start">
    <Logo className="size-10" />
  </div>
);

type ToolMessage = Extract<AgentSidebarMessage, { role: "tool" }>;

/** Collapse runs of consecutive tool rows so they can render in one gap-1
 *  group — the spec caps tool-stack spacing at gap-1 ("a 16-row stack stays
 *  calm") while regular messages keep the list's gap-4. */
function groupToolRuns(
  messages: AgentSidebarMessage[],
): (Exclude<AgentSidebarMessage, ToolMessage> | ToolMessage[])[] {
  const out: (Exclude<AgentSidebarMessage, ToolMessage> | ToolMessage[])[] = [];
  for (const m of messages) {
    if (m.role === "tool") {
      const last = out[out.length - 1];
      if (Array.isArray(last)) last.push(m);
      else out.push([m]);
    } else {
      out.push(m);
    }
  }
  return out;
}

const NEAR_BOTTOM_PX = 80;

function findScrollParent(el: HTMLElement | null): HTMLElement | null {
  let node: HTMLElement | null = el?.parentElement ?? null;
  while (node) {
    const overflow = getComputedStyle(node).overflowY;
    if (overflow === "auto" || overflow === "scroll") return node;
    node = node.parentElement;
  }
  return null;
}

export function AgentSidebarMessages({
  messages,
  onSubmitMultiQuestion,
  onCopyMessage,
  onRateMessage,
  onRerunMessage,
  actionLabels,
  toolLabels,
  showLogo = false,
  autoScroll = true,
  emptyState,
  hideEmptyStateLogo = false,
  className,
}: AgentSidebarMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const isFirstRunRef = useRef(true);
  const isAtBottomRef = useRef(true);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const parent = findScrollParent(endRef.current);
    if (!parent) return;
    const update = () => {
      const distance = parent.scrollHeight - parent.scrollTop - parent.clientHeight;
      const near = distance <= NEAR_BOTTOM_PX;
      if (near !== isAtBottomRef.current) {
        isAtBottomRef.current = near;
        setIsAtBottom(near);
      }
    };
    update();
    parent.addEventListener("scroll", update, { passive: true });
    return () => parent.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    if (!isFirstRunRef.current && !isAtBottomRef.current) return;
    endRef.current?.scrollIntoView({
      behavior: isFirstRunRef.current ? "auto" : "smooth",
      block: "end",
    });
    isFirstRunRef.current = false;
  }, [messages, autoScroll]);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  // Empty thread → the brand logo over the host's opener (or the kit fallback)
  // in place of the list, so a freshly-opened sidebar reads as a branded hero
  // rather than a blank pane. Rendered after the hooks above so hook order
  // stays stable across renders.
  if (messages.length === 0) {
    return (
      <div className={cn("flex flex-col items-start", className)}>
        {!hideEmptyStateLogo && AGENT_EMPTY_STATE_LOGO}
        {emptyState ?? DEFAULT_EMPTY_STATE}
        <div ref={endRef} />
      </div>
    );
  }

  const lastMessage = messages[messages.length - 1];
  const lastAgentMessage =
    lastMessage && lastMessage.role === "agent" && !("kind" in lastMessage)
      ? lastMessage
      : undefined;
  // Brand signature once the last message is an agent reply. While that reply
  // is still streaming the mark spins as a "responding" indicator, then
  // settles to the static logo when the response finishes.
  const showBrandLogo = showLogo && !!lastAgentMessage;
  const logoResponding = !!lastAgentMessage?.streaming;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {groupToolRuns(messages).map((entry) => {
        if (Array.isArray(entry)) {
          return (
            <div key={entry[0].id} className="flex flex-col gap-1">
              {entry.map((m) => (
                <AgentSidebarToolCall key={m.id} tool={m.tool} toolLabels={toolLabels} />
              ))}
            </div>
          );
        }
        const m = entry;
        if (m.role === "user") {
          return <AgentSidebarUserMessage key={m.id} content={m.content} />;
        }
        if ("kind" in m) {
          return (
            <AgentSidebarMultiQuestion
              key={m.id}
              title={m.title}
              description={m.description}
              questions={m.questions}
              submitLabel={m.submitLabel}
              status={m.status}
              layout={m.layout}
              onSubmit={(answers) => onSubmitMultiQuestion?.(m.id, answers)}
            />
          );
        }
        return (
          <AgentSidebarAgentMessage
            key={m.id}
            content={m.content}
            segments={m.segments}
            toolLabels={toolLabels}
            streaming={m.streaming}
            feedback={m.feedback}
            onCopy={onCopyMessage && (() => onCopyMessage(m.id))}
            onFeedback={
              onRateMessage && ((rating) => onRateMessage(m.id, rating))
            }
            onRerun={onRerunMessage && (() => onRerunMessage(m.id))}
            actionLabels={actionLabels}
          />
        );
      })}
      {showBrandLogo && (
        // Decorative signature only — hidden from the accessibility tree.
        // The streaming message already announces "thinking" for a11y.
        <div aria-hidden className="flex justify-start">
          <Logo loading={logoResponding} className="h-10 w-10" />
        </div>
      )}
      <div ref={endRef} />
      {!isAtBottom && (
        // -mt-4 cancels the parent's gap-4 so the sticky pill sits flush
        // against the last message instead of adding a gap row of layout.
        <div className="sticky bottom-2 z-10 flex justify-center pointer-events-none -mt-4">
          <button
            type="button"
            onClick={scrollToBottom}
            className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-inverse-on-surface/[0.12] backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-inverse-on-surface hover:bg-inverse-on-surface/[0.20] transition-colors shadow-sm"
          >
            <Icon name="arrow_downward" size={14} />
            Back to bottom
          </button>
        </div>
      )}
    </div>
  );
}
