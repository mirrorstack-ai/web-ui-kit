import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";

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

export const Interactive: Story = {
  args: {
    interactive: true,
    children: "Hover over me — interactive surface with hover styles",
  },
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
