import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  GraphSideGroup,
  type GraphSideGroupItem,
} from "./GraphSideGroup";

const meta: Meta<typeof GraphSideGroup> = {
  title: "UI/Graph/GraphSide/GraphSideGroup",
  component: GraphSideGroup,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideGroup>;

const Controlled = ({ initial }: { initial: GraphSideGroupItem[] }) => {
  const [groups, setGroups] = useState<GraphSideGroupItem[]>(initial);
  return <GraphSideGroup groups={groups} onChange={setGroups} />;
};

export const Default: Story = {
  render: () => (
    <Controlled
      initial={[
        { id: "core", name: "Core", color: "#1976d2" },
        { id: "finance", name: "Finance", color: "#43a047" },
        { id: "social", name: "Social", color: "#f4511e" },
      ]}
    />
  ),
};

export const Empty: Story = {
  render: () => <Controlled initial={[]} />,
};
