import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "AgentSidebar",
  description:
    "Agent chat sidebar — tab bar with chat history, auto-expanding input, and user/agent message types with streaming",
};

export { AgentSidebarHeader, type AgentSidebarHeaderProps } from "./AgentSidebarHeader";
export { AgentSidebarInput, type AgentSidebarInputProps } from "./AgentSidebarInput";
export {
  AgentGreeting,
  type AgentGreetingProps,
  type AgentGreetingModel,
} from "./AgentGreeting";
export {
  AgentSidebarUserMessage,
  type AgentSidebarUserMessageProps,
  AgentSidebarAgentMessage,
  type AgentSidebarAgentMessageProps,
} from "./AgentSidebarMessage";
export {
  AgentSidebarMultiQuestion,
  type AgentSidebarMultiQuestionProps,
  type AgentSidebarQuestion,
  type AgentSidebarMultiQuestionStatus,
  type AgentSidebarMultiQuestionAnswer,
  type AgentSidebarMultiQuestionLayout,
  type AgentSidebarChoiceStyle,
} from "./AgentSidebarMultiQuestion";
export {
  AgentSidebarMessages,
  type AgentSidebarMessage,
  type AgentSidebarMessagesProps,
} from "./AgentSidebarMessages";
export {
  type AgentSidebarHistoryGroup,
  type AgentSidebarHistoryItem,
} from "./types";
export { mockAgentHistory, mockAgentMessages } from "./mock-data";
