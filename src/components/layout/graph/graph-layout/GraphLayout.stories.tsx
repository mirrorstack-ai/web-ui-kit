import type { Meta, StoryObj } from "@storybook/react";
import { GraphLayout } from "./GraphLayout";
import { GraphAction } from "@/components/ui/graph/action/GraphAction";

const meta: Meta<typeof GraphLayout> = {
  title: "Layout/Graph",
  component: GraphLayout,
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphLayout>;

export const ActionOnly: Story = {
  args: {
    action: (
      <GraphAction onReplay={() => {}} onFit={() => {}} onSettings={() => {}} />
    ),
  },
};
