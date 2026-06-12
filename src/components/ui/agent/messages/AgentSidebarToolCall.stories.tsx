import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarToolCall } from "./AgentSidebarToolCall";
import {
  AgentSidebarMessages,
  type AgentSidebarMessage,
} from "./AgentSidebarMessages";

const meta: Meta = {
  title: "UI/Agent/ToolCall",
  decorators: [
    (Story) => (
      <div className="w-[420px] rounded-2xl bg-on-background p-4 flex flex-col gap-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Started: StoryObj = {
  render: () => (
    <AgentSidebarToolCall
      tool={{ moduleSlug: "cms", tool: "get_page", status: "started" }}
    />
  ),
};

export const Done: StoryObj = {
  render: () => (
    <AgentSidebarToolCall
      tool={{ moduleSlug: "cms", tool: "get_page", status: "done", durationMs: 1234 }}
    />
  ),
};

export const DoneWithDetail: StoryObj = {
  render: () => (
    <AgentSidebarToolCall
      tool={{
        moduleSlug: "cms",
        tool: "get_page",
        status: "done",
        durationMs: 842,
        args: { slug: "home" },
        result: { id: "abc123", title: "Home", status: "published" },
      }}
    />
  ),
};

export const ErrorNoDetail: StoryObj = {
  render: () => (
    <AgentSidebarToolCall
      tool={{ moduleSlug: "cms", tool: "create_post", status: "error" }}
    />
  ),
};

export const ErrorWithDetail: StoryObj = {
  render: () => (
    <AgentSidebarToolCall
      tool={{
        moduleSlug: "cms",
        tool: "create_post",
        status: "error",
        durationMs: 310,
        args: { title: "Draft 1", body: "..." },
        error: "permission_denied: you are not an admin of this app",
      }}
    />
  ),
};

/** Account-scope call: 3-segment app · module · tool label. */
export const WithAppSlug: StoryObj = {
  render: () => (
    <AgentSidebarToolCall
      tool={{
        appSlug: "kaohsiung-pet",
        moduleSlug: "cms",
        tool: "list_posts",
        status: "done",
        durationMs: 93,
        args: { limit: 10 },
        result: [{ id: "1" }, { id: "2" }],
      }}
    />
  ),
};

/** B-2 caps 16 calls per turn — the stack must stay calm. */
export const SixteenRowStack: StoryObj = {
  render: () => {
    const messages: AgentSidebarMessage[] = Array.from({ length: 16 }, (_, i) => ({
      id: `tool-${i}`,
      role: "tool" as const,
      tool: {
        moduleSlug: `module-${(i % 3) + 1}`,
        tool: ["fetch_data", "write_record", "send_event"][i % 3],
        status: (["started", "done", "error"] as const)[i % 3],
        durationMs: i % 3 !== 0 ? 100 + i * 50 : undefined,
      },
    }));
    return <AgentSidebarMessages messages={messages} autoScroll={false} />;
  },
};

/** Replay: persisted rows carry full meta (args/result/duration). */
export const ReplayShape: StoryObj = {
  render: () => (
    <AgentSidebarMessages
      autoScroll={false}
      messages={[
        { id: "u1", role: "user", content: "List my recent posts" },
        {
          id: "t1",
          role: "tool",
          tool: {
            moduleSlug: "cms",
            tool: "list_posts",
            status: "done",
            durationMs: 214,
            args: { limit: 5 },
            result: [{ id: "p1", title: "Hello world" }],
          },
        },
        {
          id: "a1",
          role: "agent",
          content: 'You have 1 recent post: "Hello world".',
        },
      ]}
    />
  ),
};

/** Live: the SSE `tool` event carries no args/result — a transient started row. */
export const LiveShape: StoryObj = {
  render: () => (
    <AgentSidebarMessages
      autoScroll={false}
      messages={[
        { id: "u1", role: "user", content: "Publish the draft" },
        {
          id: "t1",
          role: "tool",
          tool: {
            moduleSlug: "cms",
            tool: "publish_post",
            status: "started",
          },
        },
      ]}
    />
  ),
};
