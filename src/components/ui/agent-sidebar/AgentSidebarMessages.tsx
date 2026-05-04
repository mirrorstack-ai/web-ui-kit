import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
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
  const wasNearBottomRef = useRef(true);

  // If the user scrolled up to read history we don't yank the view back down
  // on every streamed token.
  useEffect(() => {
    const parent = findScrollParent(endRef.current);
    if (!parent) return;
    const onScroll = () => {
      const distance = parent.scrollHeight - parent.scrollTop - parent.clientHeight;
      wasNearBottomRef.current = distance <= NEAR_BOTTOM_PX;
    };
    parent.addEventListener("scroll", onScroll, { passive: true });
    return () => parent.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    if (!isFirstRunRef.current && !wasNearBottomRef.current) return;
    endRef.current?.scrollIntoView({
      behavior: isFirstRunRef.current ? "auto" : "smooth",
      block: "end",
    });
    isFirstRunRef.current = false;
  }, [messages, autoScroll]);

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
    </div>
  );
}
