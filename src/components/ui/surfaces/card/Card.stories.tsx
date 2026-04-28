import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Surfaces/Card",
  component: Card,
  args: {
    className: "p-5",
  },
  argTypes: {
    interactive: { control: "boolean" },
    loading: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    children: "A simple card with default styling",
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: "Hover over me — interactive card",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "This content is hidden while loading",
  },
};

export const InteractiveWithContent: Story = {
  render: (args) => (
    <Card {...args} interactive className="p-5 max-w-sm">
      <h3 className="text-base font-semibold text-on-surface">App Name</h3>
      <p className="text-sm text-on-surface-variant mt-1">
        A brief description of the application and what it does.
      </p>
    </Card>
  ),
};
