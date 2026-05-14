import type { Meta, StoryObj } from "@storybook/react";
import { GraphAction } from "./GraphAction";

const meta: Meta<typeof GraphAction> = {
  title: "UI/Graph/GraphAction",
  component: GraphAction,
  decorators: [
    (Story) => (
      <div className="bg-surface p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphAction>;

export const Standalone: Story = {
  args: {
    onReplay: () => {},
    onFit: () => {},
    onSettings: () => {},
  },
};
