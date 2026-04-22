import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof Surface> = {
  title: "UI/Surfaces/Surface",
  component: Surface,
  args: {
    className: "p-6",
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Playground: Story = {
  args: {
    children: "Surface container with default styling",
  },
};

export const CardExample: Story = {
  render: () => (
    <Surface className="p-0 max-w-sm overflow-hidden">
      <div className="aspect-video bg-surface-container" />
      <div className="p-4">
        <h3 className="text-base font-semibold text-on-surface">Card Title</h3>
        <p className="text-sm text-on-surface-variant mt-1">
          A brief description of the card content.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="text" size="sm">
            Cancel
          </Button>
          <Button variant="filled" size="sm">
            Action
          </Button>
        </div>
      </div>
    </Surface>
  ),
};

export const Nested: Story = {
  render: () => (
    <Surface className="p-6">
      <h3 className="text-base font-semibold text-on-surface mb-3">
        Outer Surface
      </h3>
      <Surface className="p-4 bg-surface-container">
        <p className="text-sm text-on-surface-variant">
          Nested surface with higher elevation background
        </p>
      </Surface>
    </Surface>
  ),
};
