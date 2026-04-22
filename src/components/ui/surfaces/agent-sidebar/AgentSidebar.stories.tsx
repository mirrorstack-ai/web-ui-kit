import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AgentSidebarHeader } from "./AgentSidebarHeader";
import { AgentSidebarInput } from "./AgentSidebarInput";

const meta: Meta = {
  title: "UI/Surfaces/AgentSidebar",
  decorators: [
    (Story) => (
      <div className="h-[500px] w-[400px] border border-outline-variant rounded-2xl overflow-hidden flex flex-col">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Header: StoryObj = {
  render: () => {
    const [width, setWidth] = useState(400);
    return (
      <div className="bg-surface-container">
        <AgentSidebarHeader
          sidebarWidth={width}
          onToggleCollapse={() => setWidth(width <= 350 ? 600 : 350)}
          onClose={() => console.log("close")}
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
  render: () => (
    <>
      <AgentSidebarHeader
        sidebarWidth={400}
        onToggleCollapse={() => {}}
        onClose={() => {}}
      />
      <div className="flex-1 bg-on-background rounded-2xl flex flex-col">
        <div className="flex-1 p-4 text-inverse-on-surface text-sm">
          Chat messages would appear here...
        </div>
        <AgentSidebarInput
          onSend={(msg) => console.log("Send:", msg)}
          onAttachFile={() => console.log("attach")}
          onMic={() => console.log("mic")}
        />
      </div>
    </>
  ),
};
