import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@/components/ui/media/icon/Icon";
import { BlockShape } from "./BlockShape";

const meta: Meta<typeof BlockShape> = {
  title: "UI/Notch/BlockShape",
  component: BlockShape,
  args: {
    shape: [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 0],
    ],
    tier: 1,
    block: 96,
    gap: 0,
    radius: 24,
    inverseRadius: 32,
    strokeWidth: 1,
  },
  argTypes: {
    shape: { control: "object" },
    tier: { control: { type: "range", min: 1, max: 4, step: 1 } },
    block: { control: { type: "range", min: 40, max: 140, step: 4 } },
    gap: { control: { type: "range", min: 0, max: 40, step: 2 } },
    radius: { control: { type: "range", min: 0, max: 44, step: 1 } },
    inverseRadius: { control: { type: "range", min: 0, max: 48, step: 1 } },
    strokeWidth: { control: { type: "range", min: 0, max: 4, step: 0.5 } },
  },
};

export default meta;
type Story = StoryObj<typeof BlockShape>;

export const Playground: Story = {
  render: (args) => (
    <BlockShape {...args}>
      <div className="flex h-full flex-col justify-between text-on-surface">
        <Icon name="dashboard" size={20} className="text-primary" />
        <div>
          <p className="text-xs text-on-surface-variant">Edit the `shape` matrix</p>
          <p className="text-lg font-medium">Notched block</p>
        </div>
      </div>
    </BlockShape>
  ),
};

const SHAPES: Record<string, number[][]> = {
  Rect: [
    [1, 1, 1],
    [1, 1, 1],
  ],
  "User example": [
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 0],
  ],
  "L-shape": [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  Plus: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  "Edge notch": [
    [1, 1, 1, 1],
    [1, 1, 0, 0],
    [1, 1, 1, 1],
  ],
  Donut: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  Staircase: [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
};

export const Gallery: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-8 p-4">
      {Object.entries(SHAPES).map(([name, shape]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <BlockShape shape={shape}>
            <span className="text-xs text-on-surface-variant">{name}</span>
          </BlockShape>
          <p className="text-xs text-on-surface-variant">{name}</p>
        </div>
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  args: {
    fill: "none",
    stroke: "var(--color-primary)",
    strokeWidth: 1.5,
  },
};

export const FilledNoStroke: Story = {
  args: {
    stroke: "none",
    fill: "var(--color-primary-container)",
  },
};

/** Same shape rendered at each tier — cells marked 2 / 3 join as space unlocks. */
export const ResponsiveTiers: Story = {
  render: () => {
    const shape = [
      [0, 1, 1, 2, 2],
      [1, 1, 1, 2, 2],
      [1, 1, 1, 3, 3],
      [0, 1, 1, 3, 3],
    ];
    return (
      <div className="flex flex-wrap items-start gap-10 p-4">
        {[1, 2, 3].map((tier) => (
          <div key={tier} className="flex flex-col items-center gap-2">
            <BlockShape shape={shape} tier={tier} block={72}>
              <span className="text-xs text-on-surface-variant">tier {tier}</span>
            </BlockShape>
            <p className="text-xs text-on-surface-variant">tier = {tier}</p>
          </div>
        ))}
      </div>
    );
  },
};
