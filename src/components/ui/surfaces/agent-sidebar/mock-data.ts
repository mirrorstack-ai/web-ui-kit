import type { AgentSidebarMessage } from "./AgentSidebarMessages";

export interface AgentSidebarHistoryItem {
  id: string;
  title: string;
  /** ISO 8601 UTC string. */
  updatedAt: string;
}

export interface AgentSidebarHistoryGroup {
  /** Display label, e.g. "Today", "Yesterday", "Earlier". */
  label: string;
  items: AgentSidebarHistoryItem[];
}

export const mockAgentHistory: AgentSidebarHistoryGroup[] = [
  {
    label: "Today",
    items: [
      { id: "h-1", title: "Update display name", updatedAt: "2026-05-04T09:42:00Z" },
      { id: "h-2", title: "Enable two-factor login", updatedAt: "2026-05-04T08:15:00Z" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { id: "h-3", title: "Revoke old browser session", updatedAt: "2026-05-03T22:10:00Z" },
      { id: "h-4", title: "Set notification preferences", updatedAt: "2026-05-03T14:50:00Z" },
    ],
  },
  {
    label: "Earlier",
    items: [
      { id: "h-5", title: "Rename my account slug", updatedAt: "2026-05-01T11:00:00Z" },
      { id: "h-6", title: "Add a passkey from MacBook", updatedAt: "2026-04-28T19:25:00Z" },
      { id: "h-7", title: "Connect Google account", updatedAt: "2026-04-22T07:05:00Z" },
    ],
  },
];

export const mockAgentMessages: AgentSidebarMessage[] = [
  {
    id: "m-1",
    role: "user",
    content: "I want to change my username to alice2 and turn on dark mode.",
  },
  {
    id: "m-2",
    role: "agent",
    content:
      "Sure — I can help with that. Let me know which one you'd like to start with.",
  },
];
