import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import type { AgentChatErrorInfo } from "@/hooks/agent-chat/useAgentChat";
import { agentErrorMessage } from "@/hooks/agent-chat/errorMessages";

export const meta: ComponentMeta = {
  name: "AgentErrorNotice",
  description:
    "Inline notice for a failed or refused agent turn. Renders the per-code copy for the reader's locale plus the wait time; never shows server-supplied text.",
};

export interface AgentErrorNoticeProps {
  /** `errorInfo` from useAgentChat / useAgentSession. Renders nothing when null. */
  errorInfo: AgentChatErrorInfo | null;
  /** Reader's locale, e.g. "en" or "zh-TW". Unknown locales fall back to English. */
  locale: string;
  className?: string;
}

export function AgentErrorNotice({ errorInfo, locale, className }: AgentErrorNoticeProps) {
  if (!errorInfo) return null;
  return (
    <p
      role="alert"
      data-error-code={errorInfo.code}
      className={cn("text-sm text-error", className)}
    >
      {agentErrorMessage(errorInfo.code, locale, errorInfo.retryAfterSeconds)}
    </p>
  );
}
