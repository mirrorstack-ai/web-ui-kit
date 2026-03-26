import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Actions/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "filled",
    color: "primary",
    size: "md",
  },
  argTypes: {
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
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    leftIcon: { control: "text" },
    rightIcon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** All variants side by side */
export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <Button {...args} variant="filled">Filled</Button>
      <Button {...args} variant="tonal">Tonal</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="text">Text</Button>
    </div>
  ),
};

/** All colors side by side */
export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <Button {...args} color="primary">Primary</Button>
      <Button {...args} color="secondary">Secondary</Button>
      <Button {...args} color="tertiary">Tertiary</Button>
      <Button {...args} color="error">Error</Button>
      <Button {...args} color="warning">Warning</Button>
    </div>
  ),
};

/** All sizes side by side */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

/** Buttons with icons */
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <Button {...args} leftIcon="add">Create</Button>
      <Button {...args} rightIcon="arrow_forward">Next</Button>
      <Button {...args} leftIcon="save" variant="tonal">Save</Button>
    </div>
  ),
};

/** Loading state */
export const Loading: Story = {
  render: (args) => (
    <div className="flex gap-3 items-center">
      <Button {...args} size="sm" loading>Small</Button>
      <Button {...args} size="md" loading>Medium</Button>
      <Button {...args} size="lg" loading>Large</Button>
    </div>
  ),
};
