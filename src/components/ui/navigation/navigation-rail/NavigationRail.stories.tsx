import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavigationRail } from "./NavigationRail";
import { NavigationButton } from "@/components/ui/navigation/navigation-button/NavigationButton";
import { BottomNavItem } from "@/components/ui/navigation/bottom-nav-item/BottomNavItem";

const meta: Meta<typeof NavigationRail> = {
  title: "UI/Navigation/NavigationRail",
  component: NavigationRail,
  decorators: [
    (Story) => (
      <div className="h-[600px] flex">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationRail>;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div className="h-[600px] w-[500px] flex items-end justify-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [selected, setSelected] = useState("apps");
    const items = [
      { id: "dashboard", icon: "space_dashboard", label: "Dashboard" },
      { id: "apps", icon: "apps", label: "Your Apps" },
      { id: "addons", icon: "extension", label: "Add-ons" },
      { id: "settings", icon: "settings", label: "Settings" },
    ];
    return (
      <NavigationRail orientation="horizontal" containerClassName="gap-0 px-3 py-2">
        <BottomNavItem
          customIcon={
            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">M</span>
            </div>
          }
          label="My App"
          showTitle={false}
          onClick={() => setSelected("dashboard")}
        />
        {items.map((item) => (
          <BottomNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </NavigationRail>
    );
  },
};

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState("apps");
    return (
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
            icon="apps"
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
    );
  },
};
