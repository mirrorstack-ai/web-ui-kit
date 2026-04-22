import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "AgentSidebar",
  description:
    "Agent chat sidebar with tab bar header and auto-expanding message input",
};

export { AgentSidebarHeader, type AgentSidebarHeaderProps } from "./AgentSidebarHeader";
export { AgentSidebarInput, type AgentSidebarInputProps } from "./AgentSidebarInput";
