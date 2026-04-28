import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Feedback/Skeleton",
  component: Skeleton,
  args: {
    width: "w-full",
    height: "h-4",
    lines: 1,
  },
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    lines: { control: { type: "number", min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {};

export const MultiLine: Story = {
  args: {
    lines: 4,
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width="w-3/4" height="h-6" />
      <Skeleton width="w-1/2" height="h-4" />
      <Skeleton width="w-48" height="h-4" />
      <Skeleton width="w-24" height="h-3" />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-80 space-y-3 rounded-lg border border-outline-variant p-4">
      <Skeleton width="w-10" height="h-10" className="rounded-full" />
      <Skeleton width="w-3/4" height="h-5" />
      <Skeleton lines={3} />
    </div>
  ),
};
