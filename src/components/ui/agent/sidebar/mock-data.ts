import type { AgentSidebarMessage } from "../messages/AgentSidebarMessages";
import type { AgentSidebarInputModel } from "./AgentSidebarInput";
import type { AgentSidebarHistoryGroup } from "./types";

// Milestone-A roster: Claude pair enabled; Gemini/GPT pairs visible but
// disabled until their adapters ship.
export const mockAgentModels: AgentSidebarInputModel[] = Object.freeze([
  { id: "anthropic.claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
  {
    id: "gemini-3.5-flash",
    label: "Gemini 3.5 Flash",
    disabled: true,
    disabledHint: "Supported in the future",
  },
  { id: "anthropic.claude-haiku-4-5-20251001-v1:0", label: "Claude Haiku 4.5" },
  {
    id: "gpt-5.4-mini",
    label: "GPT-5.4 mini",
    disabled: true,
    disabledHint: "Supported in the future",
  },
  {
    id: "gemini-3.1-flash-lite",
    label: "Gemini 3.1 Flash-Lite",
    disabled: true,
    disabledHint: "Supported in the future",
  },
  {
    id: "gpt-5.4-nano",
    label: "GPT-5.4 nano",
    disabled: true,
    disabledHint: "Supported in the future",
  },
]) as AgentSidebarInputModel[];

export const mockAgentHistory: AgentSidebarHistoryGroup[] = Object.freeze([
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
]) as AgentSidebarHistoryGroup[];

export const mockAgentMessages: AgentSidebarMessage[] = Object.freeze([
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
]) as AgentSidebarMessage[];
