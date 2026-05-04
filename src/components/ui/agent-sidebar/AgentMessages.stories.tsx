import type { Meta, StoryObj } from "@storybook/react";
import {
  AgentSidebarUserMessage,
  AgentSidebarAgentMessage,
} from "./AgentSidebarMessage";

const meta: Meta = {
  title: "Agent/Messages",
  decorators: [
    (Story) => (
      <div className="h-[420px] w-[420px] rounded-2xl overflow-hidden flex flex-col bg-on-background p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const User: StoryObj = {
  render: () => (
    <AgentSidebarUserMessage content="Update my username to alice2 and turn on dark mode." />
  ),
};

export const Agent: StoryObj = {
  render: () => (
    <AgentSidebarAgentMessage content="Sure — I'll update your username and your appearance preference. Please confirm the changes below." />
  ),
};

export const AgentStreaming: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AgentSidebarAgentMessage content="" streaming />
      <AgentSidebarAgentMessage
        content="Updating your profile now"
        streaming
      />
    </div>
  ),
};
