import type { Meta, StoryObj } from "@storybook/react";
import { StatusIndicator, type StatusLevel } from "./StatusIndicator";

const meta: Meta<typeof StatusIndicator> = {
  title: "UI/Notch/Blocks/Status",
  component: StatusIndicator,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

const Wrapper = ({
  size = 110,
  children,
}: {
  size?: number;
  children: React.ReactNode;
}) => (
  <div
    className="border border-outline-variant rounded-xl px-2 py-4 text-on-surface"
    style={{ width: size, height: size }}
  >
    {children}
  </div>
);

export const Online: Story = {
  render: () => (
    <Wrapper>
      <StatusIndicator status="online" label="Tunnel" sub="v0.1.0" />
    </Wrapper>
  ),
};

export const AllStates: Story = {
  render: () => {
    const states: { status: StatusLevel; label: string; sub: string }[] = [
      { status: "online", label: "Tunnel", sub: "v0.1.0" },
      { status: "offline", label: "Tunnel", sub: "last seen 2h ago" },
      { status: "warning", label: "CI", sub: "flaky test" },
      { status: "error", label: "Health", sub: "3 failures" },
      { status: "unknown", label: "DNS", sub: "checking..." },
    ];

    return (
      <div className="flex flex-row gap-2">
        {states.map((s) => (
          <Wrapper key={s.status} size={120}>
            <StatusIndicator status={s.status} label={s.label} sub={s.sub} />
          </Wrapper>
        ))}
      </div>
    );
  },
};
