import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui/media/icon/Icon";
import {
  AgentSidebarUserMessage,
  AgentSidebarAgentMessage,
} from "./AgentSidebarMessage";
import {
  AgentSidebarMultiQuestion,
  type AgentSidebarQuestion,
  type AgentSidebarMultiQuestionStatus,
  type AgentSidebarMultiQuestionAnswer,
  type AgentSidebarMultiQuestionLayout,
} from "./AgentSidebarMultiQuestion";

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
      streaming?: boolean;
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
    };

export interface AgentSidebarMessagesProps {
  messages: AgentSidebarMessage[];
  onSubmitMultiQuestion?: (
    messageId: string,
    answers: Record<string, AgentSidebarMultiQuestionAnswer>,
  ) => void;
  /** Auto-scroll to the latest message. Default: true. */
  autoScroll?: boolean;
  className?: string;
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
  autoScroll = true,
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

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {messages.map((m) => {
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
            streaming={m.streaming}
          />
        );
      })}
      <div ref={endRef} />
      {!isAtBottom && (
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
