import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavDrawer, type NavDrawerItem, type NavDrawerSection } from "./NavDrawer";
import { Avatar } from "@/components/ui/media/avatar/Avatar";

const sections: NavDrawerSection[] = [
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile", icon: "person" },
      { id: "security", label: "Security", icon: "shield" },
      { id: "preferences", label: "Preferences", icon: "tune" },
    ],
  },
  {
    items: [
      { id: "sign-out", label: "Sign out", icon: "logout", variant: "danger" as const },
    ],
  },
];

const meta: Meta<typeof NavDrawer> = {
  title: "UI/Navigation/NavDrawer",
  component: NavDrawer,
  decorators: [
    (Story) => (
      <div className="h-[500px] border border-outline-variant rounded-2xl overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavDrawer>;

export const Playground: Story = {
  render: () => {
    const [active, setActive] = useState("profile");
    return (
      <NavDrawer
        contextSwitcher={
          <div className="flex items-center gap-3 p-2">
            <Avatar size="sm" fallback="J" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-on-surface truncate">John Doe</p>
              <p className="text-xs text-on-surface-variant truncate">john@example.com</p>
            </div>
          </div>
        }
        sections={sections}
        activeItemId={active}
        onItemClick={(item: NavDrawerItem) => setActive(item.id)}
      />
    );
  },
};
