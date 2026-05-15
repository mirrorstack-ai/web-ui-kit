import type { Meta, StoryObj } from "@storybook/react";
import { GraphSide, type GraphSideNode } from "./GraphSide";

const meta: Meta<typeof GraphSide> = {
  title: "UI/Graph/GraphSide",
  component: GraphSide,
  decorators: [
    (Story) => (
      <div className="w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSide>;

const renderDetails = (n: GraphSideNode) => (
  <p className="text-sm text-on-surface">
    Details for <strong>{n.label}</strong>.
  </p>
);

export const WithSingleTag: Story = {
  args: {
    node: { id: "account", label: "Account", tag: "core" },
    onClose: () => {},
    renderDetails,
  },
};

export const WithMultipleTags: Story = {
  args: {
    node: {
      id: "balance",
      label: "Balance",
      tags: ["finance", "ledger", "stripe"],
    },
    onClose: () => {},
    renderDetails,
  },
};

export const TitleCenteredWhenNoTags: Story = {
  args: {
    node: { id: "settings", label: "Graph settings" },
    onClose: () => {},
    renderDetails,
  },
};
