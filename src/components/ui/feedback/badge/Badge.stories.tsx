import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeVariant } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Feedback/Badge",
  component: Badge,
  args: {
    children: "Active",
    variant: "success",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "error", "info"],
    },
    size: { control: "select", options: ["sm", "md"] },
    icon: { control: "text" },
    dot: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(["default", "primary", "success", "warning", "error", "info"] as BadgeVariant[]).map(
        (v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ),
      )}
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" icon="check_circle">Ready</Badge>
      <Badge variant="error" icon="error">Failed</Badge>
      <Badge variant="warning" icon="warning">Pending</Badge>
      <Badge variant="info" icon="info">Info</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Processing</Badge>
      <Badge variant="error" dot>Offline</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
    </div>
  ),
};
