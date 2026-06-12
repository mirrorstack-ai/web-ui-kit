import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarHeader } from "./AgentSidebarHeader";
import { AgentSidebarInput } from "./AgentSidebarInput";
import {
  AgentSidebarMessages,
  type AgentSidebarMessage,
} from "../messages/AgentSidebarMessages";
import { mockAgentHistory, mockAgentMessages, mockAgentModels } from "./mock-data";
import type { AgentSidebarHistoryGroup, ChatTab } from "./types";

const DEFAULT_MODEL_ID = "anthropic.claude-haiku-4-5-20251001-v1:0";

const meta: Meta = {
  title: "UI/Agent/Sidebar",
  decorators: [
    (Story) => (
      <div className="h-[640px] w-[420px] rounded-2xl overflow-hidden flex flex-col">
        <Story />
      </div>
    ),
  ],
};

export default meta;

/** Uncontrolled header: internal tab state, history open/select only. */
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

/** Controlled tabs: titles from the consumer, history opens as a NEW tab,
 *  long titles ellipsize within the strip's allotment. */
export const ControlledTabs: StoryObj = {
  render: () => {
    const [tabs, setTabs] = useState<ChatTab[]>([
      { id: "conv-1", title: "New chat" },
      { id: "conv-2", title: "Update display name" },
    ]);
    const [activeTabId, setActiveTabId] = useState("conv-1");
    const nextIdRef = useRef(3);
    const openTab = (title: string) => {
      const tab = { id: `conv-${nextIdRef.current++}`, title };
      setTabs((prev) => [...prev, tab]);
      setActiveTabId(tab.id);
    };
    return (
      <div className="bg-surface-container">
        <AgentSidebarHeader
          sidebarWidth={420}
          onToggleCollapse={() => {}}
          onClose={() => {}}
          history={mockAgentHistory}
          onSelectHistoryItem={(id) => {
            const item = mockAgentHistory
              .flatMap((g) => g.items)
              .find((i) => i.id === id);
            openTab(item?.title ?? "New chat");
          }}
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
          onCloseTab={(id) => {
            const next = tabs.filter((t) => t.id !== id);
            if (!next.length) return;
            setTabs(next);
            if (activeTabId === id) setActiveTabId(next[next.length - 1].id);
          }}
          onNewTab={() => openTab("New chat")}
        />
      </div>
    );
  },
};

/** History row actions: hover edit (inline rename) + hover delete. */
export const History: StoryObj = {
  render: () => {
    const [history, setHistory] = useState<AgentSidebarHistoryGroup[]>(mockAgentHistory);
    return (
      <div className="bg-surface-container">
        <AgentSidebarHeader
          sidebarWidth={420}
          onToggleCollapse={() => {}}
          onClose={() => {}}
          history={history}
          onSelectHistoryItem={(id) => console.log("open", id)}
          onRenameConversation={(id, title) => {
            setHistory((prev) =>
              prev.map((g) => ({
                ...g,
                items: g.items.map((item) =>
                  item.id === id ? { ...item, title } : item,
                ),
              })),
            );
          }}
          onDeleteConversation={(id) => {
            setHistory((prev) =>
              prev
                .map((g) => ({ ...g, items: g.items.filter((item) => item.id !== id) }))
                .filter((g) => g.items.length > 0),
            );
          }}
        />
      </div>
    );
  },
};

/** Composer with the model selector — the realistic host configuration. */
export const Input: StoryObj = {
  render: () => {
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return (
      <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput
          onSend={(msg) => console.log("Send:", msg)}
          onAttachFile={() => console.log("attach")}
          onMic={() => console.log("mic")}
          models={mockAgentModels}
          selectedModelId={modelId}
          onSelectModel={setModelId}
        />
      </div>
    );
  },
};

/** Queued-message chip pinned above the textarea while a reply streams. */
export const QueuedMessage: StoryObj = {
  render: () => {
    const [queued, setQueued] = useState<string | undefined>(
      "Summarize the last 3 deployments and show me any failures",
    );
    const [modelId, setModelId] = useState(DEFAULT_MODEL_ID);
    return (
      <div className="mt-auto bg-on-background rounded-b-2xl">
        <AgentSidebarInput
          onSend={(msg) => console.log("Send:", msg)}
          models={mockAgentModels}
          selectedModelId={modelId}
          onSelectModel={setModelId}
          queuedMessage={queued}
          onCancelQueued={() => setQueued(undefined)}
        />
      </div>
    );
  },
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
            models={mockAgentModels}
            selectedModelId={DEFAULT_MODEL_ID}
          />
        </div>
      </>
    );
  },
};
