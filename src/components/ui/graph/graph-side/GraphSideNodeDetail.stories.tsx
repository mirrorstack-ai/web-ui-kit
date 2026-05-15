import type { Meta, StoryObj } from "@storybook/react";
import { GraphSideNodeDetail } from "./GraphSideNodeDetail";

const meta: Meta<typeof GraphSideNodeDetail> = {
  title: "UI/Graph/GraphSide/GraphSideNodeDetail",
  component: GraphSideNodeDetail,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideNodeDetail>;

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between gap-2 text-on-surface-variant">
    <span>{k}</span>
    <span className="text-on-surface">{v}</span>
  </div>
);

export const Default: Story = {
  render: () => (
    <GraphSideNodeDetail>
      <Row k="Last activity" v="2026-05-14" />
      <Row k="Owner" v="nothingchang" />
      <Row k="Created" v="2026-01-02" />
    </GraphSideNodeDetail>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <GraphSideNodeDetail>
      <p>
        Balance powers the financial side of MirrorStack — ledger entries,
        statements, and any monetary movement across connected accounts.
      </p>
    </GraphSideNodeDetail>
  ),
};
