import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "UI/Actions/IconButton",
  component: IconButton,
  args: {
    icon: "settings",
    "aria-label": "Settings",
    variant: "filled",
    color: "primary",
    size: "md",
  },
  argTypes: {
    icon: { control: "text" },
    variant: {
      control: "select",
      options: ["filled", "tonal", "outline", "text"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "error", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    tooltip: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** All variants side by side */
export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <IconButton {...args} variant="filled" icon="favorite" aria-label="Favorite" />
      <IconButton {...args} variant="tonal" icon="favorite" aria-label="Favorite" />
      <IconButton {...args} variant="outline" icon="favorite" aria-label="Favorite" />
      <IconButton {...args} variant="text" icon="favorite" aria-label="Favorite" />
    </div>
  ),
};

/** All colors side by side */
export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <IconButton {...args} variant="filled" color="primary" icon="star" aria-label="Primary" />
      <IconButton {...args} variant="filled" color="secondary" icon="star" aria-label="Secondary" />
      <IconButton {...args} variant="filled" color="tertiary" icon="star" aria-label="Tertiary" />
      <IconButton {...args} variant="filled" color="error" icon="delete" aria-label="Error" />
      <IconButton {...args} variant="filled" color="warning" icon="warning" aria-label="Warning" />
    </div>
  ),
};

/** All sizes side by side */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <IconButton {...args} size="sm" icon="close" aria-label="Small" />
      <IconButton {...args} size="md" icon="close" aria-label="Medium" />
      <IconButton {...args} size="lg" icon="close" aria-label="Large" />
    </div>
  ),
};

/** Loading state replaces icon with spinner */
export const Loading: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <IconButton {...args} size="sm" loading icon="refresh" aria-label="Loading small" />
      <IconButton {...args} size="md" loading icon="refresh" aria-label="Loading medium" />
      <IconButton {...args} size="lg" loading icon="refresh" aria-label="Loading large" />
    </div>
  ),
};
