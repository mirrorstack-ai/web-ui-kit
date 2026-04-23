import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { NavigationRail } from "@/components/ui/navigation/navigation-rail/NavigationRail";
import { NavigationButton } from "@/components/ui/navigation/navigation-button/NavigationButton";
import { Avatar } from "@/components/ui/media/avatar/Avatar";

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
  render: () => (
    <AppShell
      navigation={
        <NavigationRail
          header={
            <Avatar fallback="M" size="md" square />
          }
          footer={
            <NavigationButton icon="settings" label="Settings" variant="secondary" />
          }
        >
          <NavigationButton icon="home" label="Home" variant="primary" />
          <NavigationButton icon="data_table" label="Apps" variant="secondary" />
          <NavigationButton icon="notifications" label="Alerts" variant="secondary" />
        </NavigationRail>
      }
      agentSidebarContent={
        <div className="text-inverse-on-surface text-sm">
          Chat messages would appear here...
        </div>
      }
      onAgentSend={(msg) => console.log("Send:", msg)}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-on-surface mb-4">Dashboard</h1>
        <p className="text-on-surface-variant">
          Main content area. The agent sidebar can be toggled with the floating button.
        </p>
      </div>
    </AppShell>
  ),
};
