import type { Meta, StoryObj } from "@storybook/react";
import { OptionList } from "./OptionList";

const meta: Meta<typeof OptionList> = {
  title: "UI/Surfaces/OptionList",
  component: OptionList,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OptionList>;

const QUERY_OPS = [
  { value: "tag:", description: "match the node's tag" },
  { value: "name:", description: "match the node's title" },
  { value: "description:", description: "match the node's description" },
  { value: "content:", description: "match the node's content" },
];

export const Default: Story = {
  args: {
    title: "Search options",
    showInfo: true,
    items: QUERY_OPS,
    onSelect: (item) => console.log("selected", item.value),
  },
};

export const Highlighted: Story = {
  args: {
    title: "Search options",
    items: QUERY_OPS,
    activeIndex: 1,
    onSelect: (item) => console.log("selected", item.value),
  },
};

export const NoTitle: Story = {
  args: {
    items: [
      { value: "user" },
      { value: "core" },
      { value: "balance" },
    ],
    onSelect: (item) => console.log("selected", item.value),
  },
};
