import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GraphSideSearch } from "./GraphSideSearch";

const meta: Meta<typeof GraphSideSearch> = {
  title: "UI/Graph/GraphSide/GraphSideSearch",
  component: GraphSideSearch,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideSearch>;

const Controlled = ({ initial }: { initial: string }) => {
  const [value, setValue] = useState(initial);
  return <GraphSideSearch value={value} onChange={setValue} />;
};

export const Empty: Story = { render: () => <Controlled initial="" /> };
export const WithValue: Story = { render: () => <Controlled initial="balance" /> };
