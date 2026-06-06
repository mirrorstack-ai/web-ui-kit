import type { Meta, StoryObj } from "@storybook/react";
import { DataList, type DataListItem } from "./DataList";

const meta: Meta<typeof DataList> = {
  title: "UI/Blocks/List",
  component: DataList,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DataList>;

const issueItems: DataListItem[] = [
  {
    icon: "bug_report",
    title: "Fix OAuth refresh token expiry edge case",
    description: "opened by @alice",
    trailing: "2d ago",
    status: "error",
  },
  {
    icon: "lightbulb",
    title: "Add dark mode toggle to settings page",
    description: "opened by @bob",
    trailing: "4d ago",
    status: "success",
  },
  {
    icon: "bug_report",
    title: "Sidebar flickers on route change",
    description: "opened by @carol",
    trailing: "1w ago",
    status: "warning",
  },
  {
    icon: "lightbulb",
    title: "Support custom domain mapping",
    description: "opened by @dave",
    trailing: "2w ago",
    status: "success",
  },
  {
    icon: "bug_report",
    title: "CSV export truncates long fields",
    description: "opened by @eve",
    trailing: "3w ago",
    status: "error",
  },
];

export const Issues: Story = {
  args: { items: issueItems },
  decorators: [
    (Story) => (
      <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>
    ),
  ],
};

const appItems: DataListItem[] = [
  {
    icon: "web",
    title: "My SaaS App",
    description: "oauth-core v0.1.0",
    trailing: "May 20",
  },
  {
    icon: "web",
    title: "Analytics Dashboard",
    description: "oauth-core v0.2.1",
    trailing: "May 18",
  },
  {
    icon: "web",
    title: "CRM Integration",
    description: "oauth-core v0.1.3",
    trailing: "May 15",
  },
  {
    icon: "web",
    title: "Billing Portal",
    description: "oauth-core v0.3.0",
    trailing: "May 12",
  },
];

export const InstalledApps: Story = {
  args: { items: appItems },
  decorators: [
    (Story) => (
      <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: {
    items: [],
    emptyIcon: "inbox",
    emptyLabel: "No items yet",
  },
  decorators: [
    (Story) => (
      <div className="w-[200px] h-[150px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>
    ),
  ],
};

const manyItems: DataListItem[] = Array.from({ length: 15 }, (_, i) => ({
  icon: "description",
  title: `Document ${i + 1}`,
  description: `Updated by @user${i + 1}`,
  trailing: `${i + 1}d ago`,
  status: (["default", "success", "warning", "error"] as const)[i % 4],
}));

export const ManyItems: Story = {
  args: { items: manyItems },
  decorators: [
    (Story) => (
      <div className="w-[300px] h-[300px] border border-outline-variant rounded-xl text-on-surface px-2 py-4">
        <Story />
      </div>
    ),
  ],
};
