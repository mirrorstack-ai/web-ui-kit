import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GraphSideContent } from "./GraphSideContent";
import {
  GraphSideGroup,
  type GraphSideGroupItem,
} from "./GraphSideGroup";
import {
  GraphSideSetting,
  type GraphSideSettingValue,
} from "./GraphSideSetting";
import { GraphSideSearch } from "./GraphSideSearch";

const meta: Meta<typeof GraphSideContent> = {
  title: "UI/Graph/GraphSide/GraphSideContent",
  component: GraphSideContent,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideContent>;

const WithSearchGroupAndSetting = () => {
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState<GraphSideGroupItem[]>([
    { id: "core", name: "openclaude", color: "#f4a8a8" },
    { id: "memory", name: "memory system brain", color: "#a8d8a8" },
    { id: "wss", name: "wss tunnel", color: "#cbb6e5" },
    { id: "mcp", name: "mcp", color: "#f5c14a" },
    { id: "stripe", name: "stripe", color: "#8db8e8" },
  ]);
  const [setting, setSetting] = useState<GraphSideSettingValue>({
    nodeSize: 1,
    textSize: 1,
    lineSize: 1,
    showTags: false,
    repulsion: 1500,
    linkDistance: 70,
  });

  return (
    <GraphSideContent
      prepend={<GraphSideSearch value={search} onChange={setSearch} />}
      items={[
        {
          id: "groups",
          title: "Groups",
          body: <GraphSideGroup groups={groups} onChange={setGroups} />,
        },
        {
          id: "settings",
          title: "Settings",
          body: <GraphSideSetting value={setting} onChange={setSetting} />,
        },
      ]}
    />
  );
};

export const Default: Story = { render: () => <WithSearchGroupAndSetting /> };
