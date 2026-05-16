import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarHeader } from "./AgentSidebarHeader";
import { AgentSidebarInput } from "./AgentSidebarInput";
import {
  AgentSidebarMessages,
  type AgentSidebarMessage,
} from "../messages/AgentSidebarMessages";
import { mockAgentHistory, mockAgentMessages } from "./mock-data";

const meta: Meta = {
  title: "Agent/Sidebar",
  decorators: [
    (Story) => (
      <div className="h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Header: StoryObj = {
  render: () => {
    const [width, setWidth] = useState(420);
    return (
      <div className="bg-surface-container">
        <AgentSidebarHeader
          sidebarWidth={width}
          onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)}
          onClose={() => console.log("close")}
          history={mockAgentHistory}
          onSelectHistoryItem={(id) => console.log("history", id)}
        />
      </div>
    );
  },
};

export const Input: StoryObj = {
  render: () => (
    <div className="mt-auto bg-on-background rounded-b-2xl">
      <AgentSidebarInput
        onSend={(msg) => console.log("Send:", msg)}
        onAttachFile={() => console.log("attach")}
        onMic={() => console.log("mic")}
      />
    </div>
  ),
};

export const Playground: StoryObj = {
  render: () => {
    const [messages, setMessages] = useState<AgentSidebarMessage[]>(
      mockAgentMessages,
    );

    const patchMessage = (id: string, patch: Record<string, unknown>) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? ({ ...m, ...patch } as AgentSidebarMessage) : m,
        ),
      );
    };

    const handleSend = (content: string) => {
      const userId = `u-${Date.now()}`;
      const agentId = `a-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: userId, role: "user", content },
        { id: agentId, role: "agent", content: "", streaming: true },
      ]);
      setTimeout(() => {
        patchMessage(agentId, {
          content: "Got it — let me look into that.",
          streaming: false,
        });
      }, 1500);
    };

    return (
      <>
        <AgentSidebarHeader
          sidebarWidth={420}
          onToggleCollapse={() => {}}
          onClose={() => {}}
          history={mockAgentHistory}
          onSelectHistoryItem={(id) => console.log("history", id)}
        />
        <div className="flex-1 bg-on-background rounded-2xl flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4">
            <AgentSidebarMessages messages={messages} />
          </div>
          <AgentSidebarInput
            onSend={handleSend}
            onAttachFile={() => console.log("attach")}
            onMic={() => console.log("mic")}
          />
        </div>
      </>
    );
  },
};
