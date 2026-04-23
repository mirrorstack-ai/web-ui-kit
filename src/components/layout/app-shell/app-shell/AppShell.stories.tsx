import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { NavigationRail } from "@/components/ui/navigation/navigation-rail/NavigationRail";
import { NavigationButton } from "@/components/ui/navigation/navigation-button/NavigationButton";

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
    const [selected, setSelected] = useState("apps");
    return (
      <AppShell
        navigation={
          <NavigationRail
            logo={
              <NavigationButton
                customIcon={
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">M</span>
                  </div>
                }
                label="My App"
                variant="secondary"
                disableHoverExpand
                className="border border-primary"
              />
            }
          >
            <div className="w-full gap-2 flex flex-col">
              <NavigationButton
                icon="space_dashboard"
                label="Dashboard"
                variant="primary"
                selected={selected === "dashboard"}
                onClick={() => setSelected("dashboard")}
              />
              <NavigationButton
                icon="data_table"
                label="Your Apps"
                selected={selected === "apps"}
                onClick={() => setSelected("apps")}
              />
            </div>
            <div className="h-px rounded-full w-full bg-outline" />
            <div className="w-full gap-2 flex flex-col">
              <NavigationButton
                icon="extension"
                label="Add-ons"
                selected={selected === "addons"}
                onClick={() => setSelected("addons")}
              />
              <NavigationButton
                icon="rocket_launch"
                label="Deployment"
                selected={selected === "deployment"}
                onClick={() => setSelected("deployment")}
              />
              <NavigationButton
                icon="settings"
                label="Settings"
                selected={selected === "settings"}
                onClick={() => setSelected("settings")}
              />
            </div>
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
    );
  },
};
