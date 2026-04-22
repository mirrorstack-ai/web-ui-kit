import type { Meta, StoryObj } from "@storybook/react";
import { AppSwitcher } from "./AppSwitcher";
import { Logo } from "@/components/ui/media/logo-mirrorstack/LogoMirrorStack";

const apps = [
  { id: "account", label: "Account", description: "Profile & security settings", icon: "shield_person", href: "#" },
  { id: "apps", label: "Apps", description: "Manage your applications", icon: "apps", href: "#" },
];

const meta: Meta<typeof AppSwitcher> = {
  title: "UI/Navigation/AppSwitcher",
  component: AppSwitcher,
  decorators: [
    (Story) => (
      <div className="p-8 min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppSwitcher>;

export const Playground: Story = {
  args: {
    currentApp: "Account",
    logo: (
      <div className="w-8 h-8">
        <Logo />
      </div>
    ),
    apps,
    activeAppId: "account",
  },
};
