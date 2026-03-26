"use client";

import type { ReactNode } from "react";
import { AppShell } from "./AppShell";

interface AgentLayoutProps {
  /** App content (e.g. dashboard layout, auth layout, etc.) */
  children: ReactNode;
  /** Agent sidebar chat content (messages, etc.) */
  sidebarContent?: ReactNode;
  onSend?: (message: string) => void;
  onAttachFile?: () => void;
  onMic?: () => void;
}

/**
 * @deprecated Use `AppShell` instead. This wrapper will be removed in a future release.
 */
export function AgentLayout({
  children,
  sidebarContent,
  onSend,
  onAttachFile,
  onMic,
}: AgentLayoutProps) {
  return (
    <AppShell
      agentSidebarContent={sidebarContent}
      onAgentSend={onSend}
      onAgentAttachFile={onAttachFile}
      onAgentMic={onMic}
    >
      {children}
    </AppShell>
  );
}
