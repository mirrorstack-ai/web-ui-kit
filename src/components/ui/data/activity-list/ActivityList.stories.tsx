import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ActivityList, type ActivityItem } from "./ActivityList";

const sampleItems: ActivityItem[] = [
  {
    id: "1",
    icon: "edit",
    label: "Updated project settings",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    icon: "person_add",
    label: "Invited a new team member",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    icon: "upload_file",
    label: "Uploaded design assets",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    icon: "deployed_code",
    label: "Deployed to production",
    timestamp: "3 hours ago",
  },
  {
    id: "5",
    icon: "bug_report",
    label: "Resolved critical bug",
    timestamp: "Yesterday",
  },
];

const meta: Meta<typeof ActivityList> = {
  title: "UI/Data/ActivityList",
  component: ActivityList,
  args: {
    items: sampleItems,
    loading: false,
    hasMore: false,
    loadingMore: false,
    emptyMessage: "No activity recorded yet.",
  },
  argTypes: {
    loading: { control: "boolean" },
    hasMore: { control: "boolean" },
    loadingMore: { control: "boolean" },
    emptyMessage: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityList>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** Loading state with spinner */
export const Loading: Story = {
  args: {
    loading: true,
    items: [],
  },
};

/** Empty state with custom message */
export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: "No activity recorded yet.",
  },
};

/** List with load-more button */
export const WithLoadMore: Story = {
  render: (args) => {
    const [items, setItems] = useState<ActivityItem[]>(sampleItems.slice(0, 3));
    const [loadingMore, setLoadingMore] = useState(false);

    const handleLoadMore = () => {
      setLoadingMore(true);
      setTimeout(() => {
        setItems((prev) => [...prev, ...sampleItems.slice(prev.length)]);
        setLoadingMore(false);
      }, 1000);
    };

    return (
      <ActivityList
        {...args}
        items={items}
        hasMore={items.length < sampleItems.length}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
      />
    );
  },
};
