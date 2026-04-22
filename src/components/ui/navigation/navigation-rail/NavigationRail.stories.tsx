import type { Meta, StoryObj } from "@storybook/react";
import { NavigationRail } from "./NavigationRail";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Logo } from "@/components/ui/media/logo-mirrorstack/LogoMirrorStack";

const meta: Meta<typeof NavigationRail> = {
  title: "UI/Navigation/NavigationRail",
  component: NavigationRail,
  decorators: [
    (Story) => (
      <div className="h-[500px] flex">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationRail>;

export const Playground: Story = {
  render: () => (
    <NavigationRail
      logo={
        <div className="w-8 h-8">
          <Logo />
        </div>
      }
      header={
        <IconButton icon="person" variant="text" size="sm" aria-label="Profile" />
      }
      footer={
        <IconButton icon="settings" variant="text" size="sm" aria-label="Settings" />
      }
    >
      <IconButton icon="home" variant="tonal" size="sm" aria-label="Home" />
      <IconButton icon="search" variant="text" size="sm" aria-label="Search" />
      <IconButton icon="notifications" variant="text" size="sm" aria-label="Notifications" />
    </NavigationRail>
  ),
};
