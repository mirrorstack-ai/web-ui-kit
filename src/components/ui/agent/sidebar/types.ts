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

/** A single tab in the agent sidebar header. */
export interface ChatTab {
  id: string;
  title: string;
}

/** Label overrides for AgentSidebarHeader. All have EN defaults. */
export interface AgentSidebarHeaderLabels {
  /** aria-label on the history expand button. Default: "Chat history" */
  historyButtonLabel?: string;
  /** Shown when history is empty. Default: "No previous conversations" */
  historyEmpty?: string;
  /** aria-label on the rename icon button in a history row; the rename input
   *  uses it as a prefix ("<label>: <title>"). Default: "Rename conversation" */
  renameConversationLabel?: string;
  /** aria-label on the cancel-rename button. Default: "Cancel rename" */
  cancelRenameLabel?: string;
  /** aria-label on the delete icon button in a history row. Default: "Delete conversation" */
  deleteConversationLabel?: string;
  /** aria-label on the + button and text of the overflow new-chat entry. Default: "New chat" */
  newChatLabel?: string;
}

/** Label overrides for AgentSidebarInput. All have EN defaults. */
export interface AgentSidebarInputLabels {
  /** aria-label on the queued-message cancel button. Default: "Cancel queued message" */
  cancelQueuedLabel?: string;
  /** Prefix text in the queued-message chip. Default: "Queued" */
  queuedPrefix?: string;
}
