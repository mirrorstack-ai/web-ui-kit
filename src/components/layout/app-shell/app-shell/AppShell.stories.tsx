import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

const meta: Meta<typeof AppShell> = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Playground: Story = {
  render: () => {
    const [agentOpen, setAgentOpen] = useState(false);
    return (
      <AppShell
        navigation={
          <div className="pl-2 py-4">
            <div className="ml-2 px-4 py-6 gap-4 flex flex-col items-center rounded-2xl shadow-2xl bg-surface-bright">
              <IconButton icon="home" variant="tonal" size="sm" aria-label="Home" />
              <IconButton icon="search" variant="text" size="sm" aria-label="Search" />
              <IconButton icon="notifications" variant="text" size="sm" aria-label="Notifications" />
            </div>
          </div>
        }
        agentSidebar={
          <div className="rounded-2xl bg-on-background h-full flex flex-col">
            <div className="flex-1 p-4 text-inverse-on-surface text-sm">
              Agent chat content...
            </div>
          </div>
        }
        agentSidebarOpen={agentOpen}
        onAgentSidebarToggle={() => setAgentOpen(!agentOpen)}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-on-surface mb-4">Dashboard</h1>
          <p className="text-on-surface-variant">
            Main content area. The agent sidebar can be toggled with the floating button.
          </p>
        </div>
      </AppShell>
    );
  },
};
