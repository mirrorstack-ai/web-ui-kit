import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/actions/button/Button";

import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "UI/Surfaces/Popover",
  component: Popover,
  args: {
    trigger: <Button variant="filled">Hover or focus me</Button>,
    children: (
      <div className="w-64 rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-lg">
        <p className="font-medium text-on-surface">Arbitrary content</p>
        <p className="mt-1 text-sm text-on-surface-variant">
          This layer is not limited to a list of actions.
        </p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[280px] items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Playground: Story = {};

export const InteractiveContent: Story = {
  args: {
    trigger: <a href="#profile">Account details</a>,
    children: (
      <div className="w-64 rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-lg">
        <p className="text-sm text-on-surface">The popover does not trap focus.</p>
        <Button className="mt-3" size="sm">
          Secondary action
        </Button>
      </div>
    ),
  },
};

export const NearViewportEdge: Story = {
  decorators: [
    (Story) => (
      <div className="flex min-h-[280px] items-end justify-end p-2">
        <Story />
      </div>
    ),
  ],
};
