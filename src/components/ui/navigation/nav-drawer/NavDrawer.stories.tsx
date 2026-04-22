import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavDrawer, type NavDrawerItem, type NavDrawerSection } from "./NavDrawer";
import { Avatar } from "@/components/ui/media/avatar/Avatar";
import { Button } from "@/components/ui/actions/button/Button";

const sections: NavDrawerSection[] = [
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile", icon: "person" },
      { id: "security", label: "Security", icon: "security" },
      { id: "sessions", label: "Sessions", icon: "devices" },
      { id: "passkeys", label: "Passkeys", icon: "passkey" },
    ],
  },
  {
    label: "Preferences",
    items: [
      { id: "appearance", label: "Appearance", icon: "palette" },
      { id: "notifications", label: "Notifications", icon: "notifications" },
    ],
  },
  {
    items: [
      { id: "signout", label: "Sign Out", icon: "logout", variant: "danger" as const },
    ],
  },
];

const meta: Meta<typeof NavDrawer> = {
  title: "UI/Navigation/NavDrawer",
  component: NavDrawer,
  decorators: [
    (Story) => (
      <div className="h-[600px] border border-outline-variant rounded-2xl overflow-hidden">
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
        branding={
          <span className="text-lg font-bold text-on-surface">MirrorStack</span>
        }
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
        footer={
          <Button variant="text" size="sm" fullWidth leftIcon="add">
            Add Organization
          </Button>
        }
      />
    );
  },
};
