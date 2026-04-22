import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavDrawer, type NavDrawerItem, type NavDrawerSection } from "./NavDrawer";

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
        sections={sections}
        activeItemId={active}
        onItemClick={(item: NavDrawerItem) => setActive(item.id)}
      />
    );
  },
};
