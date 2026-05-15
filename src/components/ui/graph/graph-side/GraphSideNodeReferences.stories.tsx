import type { Meta, StoryObj } from "@storybook/react";
import { GraphSideNodeReferences } from "./GraphSideNodeReferences";

const meta: Meta<typeof GraphSideNodeReferences> = {
  title: "UI/Graph/GraphSide/GraphSideNodeReferences",
  component: GraphSideNodeReferences,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideNodeReferences>;

const ITEMS = [
  { id: "balance", label: "Balance" },
  { id: "stripe", label: "Stripe" },
  { id: "ledger", label: "Ledger" },
];

export const Static: Story = {
  args: { items: ITEMS },
};

export const Interactive: Story = {
  args: {
    items: ITEMS,
    onSelect: (id) => console.log(`Selected: ${id}`),
  },
};

export const Empty: Story = {
  args: { items: [] },
};
