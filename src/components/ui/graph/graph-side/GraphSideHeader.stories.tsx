import type { Meta, StoryObj } from "@storybook/react";
import { GraphSideHeader } from "./GraphSideHeader";

const meta: Meta<typeof GraphSideHeader> = {
  title: "UI/Graph/GraphSide/GraphSideHeader",
  component: GraphSideHeader,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideHeader>;

export const WithSingleTag: Story = {
  args: {
    node: { label: "Account", tag: "core" },
    onClose: () => {},
  },
};

export const WithMultipleTags: Story = {
  args: {
    node: {
      label: "Balance",
      tags: ["finance", "ledger", "stripe"],
    },
    onClose: () => {},
  },
};

export const TagsWrapToSecondRow: Story = {
  args: {
    node: {
      label: "Balance",
      tags: ["finance", "ledger", "stripe", "monthly", "audit", "tax"],
    },
    onClose: () => {},
  },
};

export const WithoutTags: Story = {
  args: {
    node: { label: "Graph settings" },
    onClose: () => {},
  },
};
