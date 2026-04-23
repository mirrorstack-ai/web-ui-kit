import type { Meta, StoryObj } from "@storybook/react";
import { Notch } from "./Notch";

const meta: Meta<typeof Notch> = {
  title: "UI/Surfaces/Notch",
  component: Notch,
  args: {
    width: 200,
    height: 150,
    notchWidth: 40,
    notchHeight: 50,
    notchSide: "right",
    notchOffset: 0,
    radius: 8,
    inverseRadius: 6,
    strokeWidth: 1,
  },
  argTypes: {
    notchSide: { control: "select", options: ["top", "bottom", "left", "right"] },
    width: { control: { type: "range", min: 100, max: 400, step: 10 } },
    height: { control: { type: "range", min: 80, max: 300, step: 10 } },
    notchWidth: { control: { type: "range", min: 20, max: 80, step: 2 } },
    notchHeight: { control: { type: "range", min: 20, max: 100, step: 2 } },
    notchOffset: { control: { type: "range", min: -100, max: 100, step: 1 } },
    radius: { control: { type: "range", min: 0, max: 20, step: 1 } },
    inverseRadius: { control: { type: "range", min: 0, max: 16, step: 1 } },
    strokeWidth: { control: { type: "range", min: 0, max: 4, step: 0.5 } },
  },
};

export default meta;
type Story = StoryObj<typeof Notch>;

export const Playground: Story = {};

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">{side}</p>
          <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchSide={side} notchOffset={0} />
        </div>
      ))}
    </div>
  ),
};

export const FillOnly: Story = {
  args: { stroke: "none" },
};

export const OutlineOnly: Story = {
  args: { fill: "none" },
};

export const WithOffset: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      {[0, 30, 50, -30].map((offset) => (
        <div key={offset}>
          <p className="text-xs text-on-surface-variant mb-2">offset: {offset}</p>
          <Notch width={160} height={120} notchWidth={36} notchHeight={40} notchOffset={offset} />
        </div>
      ))}
    </div>
  ),
};

export const HeadOnly: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">headOnly — {side}</p>
          <Notch
            width={160} height={120}
            notchWidth={60} notchHeight={40}
            notchSide={side}
            headOnly
          />
        </div>
      ))}
    </div>
  ),
};

export const HeadOnlyWithOffset: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <div key={side}>
          <p className="text-xs text-on-surface-variant mb-2">headOnly — {side} — offset 30</p>
          <Notch
            width={160} height={120}
            notchWidth={60} notchHeight={40}
            notchSide={side}
            notchOffset={30}
            headOnly
          />
        </div>
      ))}
    </div>
  ),
};
