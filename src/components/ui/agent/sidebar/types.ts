export interface AgentSidebarHistoryItem {
  id: string;
  title: string;
  /** ISO 8601 UTC string. */
  updatedAt: string;
}

export interface AgentSidebarHistoryGroup {
  label: string;
  items: AgentSidebarHistoryItem[];
}
