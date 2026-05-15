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
    nodeSize: 8,
    lineSize: 1,
    showTags: true,
  });
  return <GraphSideSetting value={value} onChange={setValue} />;
};

export const Default: Story = { render: () => <Controlled /> };
