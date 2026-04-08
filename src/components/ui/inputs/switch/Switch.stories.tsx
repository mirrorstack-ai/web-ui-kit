import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "UI/Inputs/Switch",
  component: Switch,
  args: {
    checked: false,
    disabled: false,
    color: "primary",
    "aria-label": "Toggle switch",
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    color: {
      control: "select",
      options: ["primary", "error", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** Controlled example with live state */
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);

    return (
      <div className="flex items-center gap-3">
        <Switch {...args} checked={checked} onChange={setChecked} />
        <span className="text-sm text-on-surface-variant">
          {checked ? "ON" : "OFF"}
        </span>
      </div>
    );
  },
};

/** All color variants side by side */
export const ColorVariants: Story = {
  render: (args) => {
    const [states, setStates] = useState({
      primary: true,
      error: true,
      warning: true,
    });

    return (
      <div className="flex flex-col gap-4">
        {(["primary", "error", "warning"] as const).map((color) => (
          <div key={color} className="flex items-center gap-3">
            <Switch
              {...args}
              color={color}
              checked={states[color]}
              onChange={(checked) =>
                setStates((prev) => ({ ...prev, [color]: checked }))
              }
              aria-label={`${color} switch`}
            />
            <span className="text-sm text-on-surface-variant capitalize">
              {color}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

/** Disabled state */
export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};
