import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavigationRail } from "./NavigationRail";
import { NavigationButton } from "@/components/ui/navigation/navigation-button/NavigationButton";
import { Avatar } from "@/components/ui/media/avatar/Avatar";

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

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState("apps");
    return (
      <div className="flex flex-col items-center">
      <Avatar size="lg" fallback="J" square className="ml-4 mb-2" />
      <NavigationRail
        footer={
          <NavigationButton
            icon="settings"
            label="Settings"
            selected={selected === "settings"}
            onClick={() => setSelected("settings")}
          />
        }
      >
        <div className="w-full gap-2 flex flex-col">
          <NavigationButton
            icon="dashboard"
            label="Overview"
            variant="primary"
            selected={selected === "overview"}
            onClick={() => setSelected("overview")}
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
            icon="apartment"
            label="Organizations"
            variant="tertiary"
            selected={selected === "org"}
            onClick={() => setSelected("org")}
          />
        </div>
        <div className="h-px rounded-full w-full bg-outline" />
        <div className="w-full gap-2 flex flex-col">
          <NavigationButton
            icon="description"
            label="Documentation"
            selected={selected === "docs"}
            onClick={() => setSelected("docs")}
          />
        </div>
      </NavigationRail>
      </div>
    );
  },
};
