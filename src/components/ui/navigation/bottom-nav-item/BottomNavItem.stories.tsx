import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BottomNavItem } from "./BottomNavItem";
import { NavigationRail } from "@/components/ui/navigation/navigation-rail/NavigationRail";

const meta: Meta<typeof BottomNavItem> = {
  title: "UI/Navigation/BottomNavItem",
  component: BottomNavItem,
};

export default meta;
type Story = StoryObj<typeof BottomNavItem>;

export const Playground: Story = {
  args: {
    icon: "dashboard",
    label: "Overview",
    selected: true,
  },
};

export const BottomNavPill: Story = {
  decorators: [
    (Story) => (
      <div className="h-40 w-[420px] flex items-end justify-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [selected, setSelected] = useState("overview");
    const items = [
      { id: "overview", icon: "dashboard", label: "Overview" },
      { id: "users", icon: "group", label: "Users" },
      { id: "billing", icon: "payments", label: "Billing" },
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
          onClick={() => setSelected("overview")}
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

export const CircleCustomIcon: Story = {
  args: {
    customIcon: (
      <div className="w-full h-full bg-tertiary/30 flex items-center justify-center">
        <span className="text-on-surface font-semibold">U</span>
      </div>
    ),
    iconShape: "circle",
    label: "Account",
    selected: true,
    showTitle: false,
  },
};
