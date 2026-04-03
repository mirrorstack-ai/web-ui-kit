import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Feedback/Alert",
  component: Alert,
  args: {
    variant: "info",
    title: "Heads up",
    children: "This is an informational alert with some helpful details.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["error", "success", "warning", "info"],
    },
    title: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** All four variants */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Alert {...args} variant="info" title="Info">
        This is an informational message.
      </Alert>
      <Alert {...args} variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert {...args} variant="warning" title="Warning">
        Please review before proceeding.
      </Alert>
      <Alert {...args} variant="error" title="Error">
        Something went wrong. Please try again.
      </Alert>
    </div>
  ),
};

/** Dismissible alert with controlled visibility */
export const Dismissible: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);

    return (
      <div className="flex flex-col gap-3">
        {visible ? (
          <Alert
            {...args}
            variant="warning"
            title="Dismissible alert"
            onDismiss={() => setVisible(false)}
          >
            Click the close button to dismiss this alert.
          </Alert>
        ) : (
          <p className="text-sm text-on-surface-variant">
            Alert dismissed.{" "}
            <button
              type="button"
              onClick={() => setVisible(true)}
              className="underline cursor-pointer text-primary"
            >
              Show again
            </button>
          </p>
        )}
      </div>
    );
  },
};

/** Without title — body only */
export const WithoutTitle: Story = {
  args: {
    variant: "success",
    title: undefined,
    children: "Operation completed without a title heading.",
  },
};
