import type { Meta, StoryObj } from "@storybook/react";
import { GraphSideNodeSummary } from "./GraphSideNodeSummary";

const meta: Meta<typeof GraphSideNodeSummary> = {
  title: "UI/Graph/GraphSide/GraphSideNodeSummary",
  component: GraphSideNodeSummary,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideNodeSummary>;

export const Default: Story = {
  args: {
    description: "Double-entry ledger powering Balance.",
    source: "balance",
    id: "4f7a2c1b9d3e",
  },
};

export const LongId: Story = {
  args: {
    description: "Connected Stripe account for processing payments.",
    source: "commerce",
    id: "01HXKR9TQM7A3C5F8N2B6V4D1Y9G7P0S",
  },
};
