import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "UI/Data/StatCard",
  component: StatCard,
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm bg-background p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: "apps",
    label: "Installs",
    value: "1,284",
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Playground: Story = {};

export const NumericValue: Story = {
  args: {
    icon: "apps",
    label: "Installs",
    value: "12,840",
  },
};

export const VersionLabel: Story = {
  args: {
    icon: "new_releases",
    label: "Latest version",
    value: "v0.4.0-beta.1",
  },
};

export const DateValue: Story = {
  args: {
    icon: "calendar_today",
    label: "Created",
    value: "May 6, 2026",
  },
};

export const OverviewGrid: StoryObj<typeof StatCard> = {
  render: () => (
    <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3">
      <StatCard icon="apps" label="Installs" value="1,284" />
      <StatCard icon="new_releases" label="Latest version" value="v0.4.0" />
      <StatCard icon="calendar_today" label="Created" value="May 6, 2026" />
    </div>
  ),
};
