import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, type TimelineEntry } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "UI/Notch/Blocks/Timeline",
  component: Timeline,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const Wrapper = ({
  children,
  width = 200,
  height = 260,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
}) => (
  <div
    className="border border-outline-variant rounded-xl text-on-surface"
    style={{ width, height }}
  >
    {children}
  </div>
);

const activityEntries: TimelineEntry[] = [
  { icon: "download", text: "Installed by My App", time: "2h ago", status: "success" },
  { icon: "publish", text: "v0.1.0 published", time: "1d ago", status: "success" },
  { icon: "settings", text: "Config updated", time: "3d ago" },
  { icon: "delete", text: "Uninstalled from Test App", time: "5d ago", status: "error" },
  { icon: "code", text: "Created", time: "2w ago" },
];

export const Activity: Story = {
  render: () => (
    <Wrapper>
      <Timeline entries={activityEntries} />
    </Wrapper>
  ),
};

const manyEntries: TimelineEntry[] = Array.from({ length: 12 }, (_, i) => ({
  icon: ["sync", "edit", "visibility", "cloud_upload"][i % 4],
  text: `Event #${i + 1} — ${["Synced data", "Edited config", "Viewed logs", "Uploaded asset"][i % 4]}`,
  time: `${i + 1}h ago`,
  status: (["default", "success", "warning", "error"] as const)[i % 4],
}));

export const ManyEntries: Story = {
  render: () => (
    <Wrapper>
      <Timeline entries={manyEntries} />
    </Wrapper>
  ),
};
