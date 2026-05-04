import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import {
  AgentSidebarUserMessage,
  AgentSidebarAgentMessage,
} from "./AgentSidebarMessage";

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
    };

export interface AgentSidebarMessagesProps {
  messages: AgentSidebarMessage[];
  /** Auto-scroll to the latest message. Default: true. */
  autoScroll?: boolean;
  className?: string;
}

export function AgentSidebarMessages({
  messages,
  autoScroll = true,
  className,
}: AgentSidebarMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, autoScroll]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {messages.map((m) => {
        if (m.role === "user") {
          return <AgentSidebarUserMessage key={m.id} content={m.content} />;
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
