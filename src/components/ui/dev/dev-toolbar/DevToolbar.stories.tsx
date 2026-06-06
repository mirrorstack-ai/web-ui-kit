import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DevToolbar } from "./DevToolbar";

const meta = {
  title: "Ui/State/DevToolbar",
  component: DevToolbar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DevToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    items: [],
    value: "",
    onChange: () => {},
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("a");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showError, setShowError] = useState(false);

    return (
      <div className="h-screen w-full bg-surface-container-lowest flex items-center justify-center font-sans text-on-surface">
        <DevToolbar
          items={[
            { label: "State A", value: "a" },
            { label: "State B", value: "b" },
            { label: "State C", value: "c" },
          ]}
          value={value}
          onChange={setValue}
          showError={showError}
          onToggleError={() => setShowError((prev) => !prev)}
        />
        <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-surface-container border border-outline-variant">
          <h2 className="text-xl font-medium tracking-tight">Main Content Area</h2>
          <p className="text-on-surface-variant">
            Current selected state value: <strong className="text-primary">{value}</strong>
          </p>
          <p className="text-on-surface-variant">
            Error mode: <strong className={showError ? "text-error font-medium" : ""}>{showError ? "Active" : "Inactive"}</strong>
          </p>
        </div>
      </div>
    );
  },
};
