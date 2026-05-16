import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  GraphSideSetting,
  type GraphSideSettingValue,
} from "./GraphSideSetting";

const meta: Meta<typeof GraphSideSetting> = {
  title: "UI/Graph/GraphSide/GraphSideSetting",
  component: GraphSideSetting,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideSetting>;

const Controlled = () => {
  const [value, setValue] = useState<GraphSideSettingValue>({
    nodeSize: 1,
    lineSize: 1,
    showTags: false,
    repulsion: 1500,
    linkDistance: 70,
  });
  return <GraphSideSetting value={value} onChange={setValue} />;
};

export const Default: Story = { render: () => <Controlled /> };
