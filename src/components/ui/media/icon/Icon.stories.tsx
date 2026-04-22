import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "UI/Media/Icon",
  component: Icon,
  args: {
    name: "edit",
    size: 24,
  },
  argTypes: {
    name: { control: "text" },
    size: { control: { type: "range", min: 16, max: 48, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="home" size={16} />
      <Icon name="home" size={20} />
      <Icon name="home" size={24} />
      <Icon name="home" size={32} />
      <Icon name="home" size={40} />
      <Icon name="home" size={48} />
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {[
        "home",
        "settings",
        "edit",
        "delete",
        "search",
        "close",
        "check",
        "add",
        "person",
        "lock",
        "visibility",
        "dark_mode",
        "light_mode",
        "key",
        "passkey",
        "security",
      ].map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon name={name} size={24} />
          <span className="text-xs text-on-surface-variant">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="check_circle" size={24} className="text-success" />
      <Icon name="error" size={24} className="text-error" />
      <Icon name="warning" size={24} className="text-warning" />
      <Icon name="info" size={24} className="text-primary" />
    </div>
  ),
};
