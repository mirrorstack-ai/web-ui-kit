import { cn } from "@/utils/cn";

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

export interface AgentSidebarAgentMessageProps {
  content: string;
  /** When true, renders typing indicator (if no content) or blinking cursor (if content). */
  streaming?: boolean;
  className?: string;
}

export function AgentSidebarAgentMessage({
  content,
  streaming = false,
  className,
}: AgentSidebarAgentMessageProps) {
  const showThinking = streaming && content.length === 0;

  return (
    <div className={cn("flex justify-start", className)}>
      <div className="max-w-full text-sm text-inverse-on-surface whitespace-pre-wrap break-words leading-relaxed">
        {showThinking ? <ThinkingDots /> : content}
        {streaming && content.length > 0 && (
          <span
            className="ml-0.5 inline-block w-[2px] h-4 align-middle bg-inverse-on-surface animate-pulse"
            aria-hidden
          />
        )}
      </div>
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
