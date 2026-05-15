import type { Meta, StoryObj } from "@storybook/react";
import { GraphSide, type GraphSideNode } from "./GraphSide";

const SAMPLE: GraphSideNode = {
  id: "account",
  label: "Account",
  tag: "core",
};

const meta: Meta<typeof GraphSide> = {
  title: "UI/Graph/GraphSide",
  component: GraphSide,
};

export default meta;
type Story = StoryObj<typeof GraphSide>;

export const Standalone: Story = {
  args: {
    node: SAMPLE,
    onClose: () => {},
    renderDetails: (n) => (
      <p className="text-sm text-on-surface">
        Details for <strong>{n.label}</strong>.
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl">
        <Story />
      </div>
    ),
  ],
};
