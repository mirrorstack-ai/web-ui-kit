import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ActivityList, type ActivityItem } from "./ActivityList";

const sampleItems: ActivityItem[] = [
  { id: "1", icon: "login", label: "Signed in from Chrome on macOS", timestamp: "2 min ago" },
  { id: "2", icon: "key", label: "Registered a new passkey", timestamp: "1 hour ago" },
  { id: "3", icon: "edit", label: "Updated profile picture", timestamp: "3 hours ago" },
  { id: "4", icon: "security", label: "Changed password", timestamp: "Yesterday" },
  { id: "5", icon: "devices", label: "Revoked session on Firefox", timestamp: "2 days ago" },
];

const meta: Meta<typeof ActivityList> = {
  title: "UI/Data/ActivityList",
  component: ActivityList,
  args: {
    items: sampleItems,
  },
  argTypes: {
    loading: { control: "boolean" },
    hasMore: { control: "boolean" },
    loadingMore: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActivityList>;

export const Playground: Story = {};

export const Loading: Story = {
  args: { items: [], loading: true },
};

export const Empty: Story = {
  args: { items: [] },
};

export const WithLoadMore: Story = {
  render: () => {
    const [items, setItems] = useState(sampleItems.slice(0, 3));
    const [loadingMore, setLoadingMore] = useState(false);

    const handleLoadMore = () => {
      setLoadingMore(true);
      setTimeout(() => {
        setItems(sampleItems);
        setLoadingMore(false);
      }, 1000);
    };

    return (
      <ActivityList
        items={items}
        hasMore={items.length < sampleItems.length}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
      />
    );
  },
};
