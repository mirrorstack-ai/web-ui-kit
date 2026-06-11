import type { Meta, StoryObj } from "@storybook/react";
import {
  AgentSidebarUserMessage,
  AgentSidebarAgentMessage,
} from "./AgentSidebarMessage";
import {
  AgentSidebarMessages,
  type AgentSidebarMessage,
} from "./AgentSidebarMessages";

const meta: Meta = {
  title: "UI/Agent/Messages",
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

const noop = () => {};

const actionCallbacks = {
  onCopyMessage: noop,
  onRateMessage: noop,
  onRerunMessage: noop,
};

const finishedAgentMsg = {
  id: "m-2",
  role: "agent",
  content:
    "You changed your username to alice2, enabled dark mode, and added a passkey from your MacBook.",
} satisfies AgentSidebarMessage;

const finishedThread: AgentSidebarMessage[] = [
  {
    id: "m-1",
    role: "user",
    content: "Summarize my account changes this week.",
  },
  finishedAgentMsg,
];

/** Copy / thumbs / rerun appear under finished agent messages only. */
export const FinishedWithActions: StoryObj = {
  render: () => (
    <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} />
  ),
};

/** A previously-recorded rating renders the thumb filled at full ink. */
export const FeedbackSelected: StoryObj = {
  render: () => (
    <AgentSidebarMessages
      messages={[finishedThread[0], { ...finishedAgentMsg, feedback: "up" }]}
      {...actionCallbacks}
    />
  ),
};

/** The action row stays hidden while the agent is still streaming. */
export const StreamingHidesActions: StoryObj = {
  render: () => (
    <AgentSidebarMessages
      messages={[
        finishedThread[0],
        {
          id: "m-2",
          role: "agent",
          content: "Pulling your audit log",
          streaming: true,
        },
      ]}
      {...actionCallbacks}
    />
  ),
};

/** Brand mark in the sidebar accent below the list when the last message is finished. */
export const WithLogo: StoryObj = {
  render: () => (
    <AgentSidebarMessages messages={finishedThread} {...actionCallbacks} showLogo />
  ),
};
