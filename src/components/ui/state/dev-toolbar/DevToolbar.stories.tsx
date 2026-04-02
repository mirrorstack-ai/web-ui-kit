import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DevToolbar } from "./DevToolbar";

const meta: Meta<typeof DevToolbar> = {
  title: "UI/State/DevToolbar",
  component: DevToolbar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items: [
      { label: "State A", value: "a" },
      { label: "State B", value: "b" },
      { label: "State C", value: "c" },
    ],
    value: "a",
    showError: false,
  },
  argTypes: {
    value: {
      control: "select",
      options: ["a", "b", "c"],
    },
    showError: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DevToolbar>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** Controlled example with live state */
export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.value ?? "a");
    const [showError, setShowError] = useState(false);

    return (
      <div className="h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface">
        <DevToolbar
          {...args}
          value={selected}
          onChange={setSelected}
          showError={showError}
          onToggleError={() => setShowError((prev) => !prev)}
        />
        <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant">
          <h2 className="text-xl font-medium tracking-tight">
            Main Content Area
          </h2>
          <p className="text-on-surface-variant">
            Selected: <strong className="text-primary">{selected}</strong>
          </p>
          <p className="text-on-surface-variant">
            Error:{" "}
            <strong className={showError ? "text-error font-medium" : ""}>
              {showError ? "Active" : "Inactive"}
            </strong>
          </p>
        </div>
      </div>
    );
  },
};

/** Without error toggle */
export const WithoutErrorToggle: Story = {
  args: {
    onToggleError: undefined,
    showError: undefined,
  },
};

/** With error active */
export const ErrorActive: Story = {
  args: {
    showError: true,
  },
};
