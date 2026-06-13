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

const markdownReply = `## Account changes

This week you made **three** changes:

1. Renamed your username to \`alice2\`
2. Enabled *dark mode*
3. Added a passkey

Run this to verify from the CLI:

\`\`\`bash
mirrorstack account audit --since 7d
\`\`\`

See the [audit log docs](https://docs.mirrorstack.ai/audit) for details.`;

/** Agent replies render Markdown: headings, lists, inline + fenced code, links. */
export const AgentMarkdown: StoryObj = {
  render: () => <AgentSidebarAgentMessage content={markdownReply} />,
};

/** Mid-stream markdown with every construct a real reply carries — heading,
 *  bold, list, inline code, link — and an unterminated code fence that
 *  renders calmly as a code block until the closing fence arrives. */
export const AgentMarkdownStreaming: StoryObj = {
  render: () => (
    <AgentSidebarAgentMessage
      content={
        "## Checking availability\n\nHere's what I found so far:\n\n- Username **alice2** is available\n- Dark mode is `off` — see the [appearance docs](https://docs.mirrorstack.ai/appearance)\n\n```bash\nmirrorstack account au"
      }
      streaming
    />
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

const respondingThread: AgentSidebarMessage[] = [
  {
    id: "m-1",
    role: "user",
    content: "Summarize my account changes this week.",
  },
  {
    id: "m-2",
    role: "agent",
    content: "Pulling your audit log",
    streaming: true,
  },
];

/** While the last agent message is still streaming, the brand logo renders and
 *  SPINS below the list as the "responding" indicator (the loading prop is wired
 *  from the last agent message's `streaming` flag). It settles to the static
 *  mark once the reply finishes — see `WithLogo`. */
export const Responding: StoryObj = {
  render: () => (
    <AgentSidebarMessages messages={respondingThread} {...actionCallbacks} showLogo />
  ),
};
