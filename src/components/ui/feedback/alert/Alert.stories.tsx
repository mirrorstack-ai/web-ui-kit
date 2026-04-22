import type { Meta, StoryObj } from "@storybook/react";
import { Alert, type AlertVariant } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Feedback/Alert",
  component: Alert,
  args: {
    variant: "info",
    children: "This is an informational alert message.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["error", "success", "warning", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["info", "success", "warning", "error"] as AlertVariant[]).map((v) => (
        <Alert key={v} variant={v}>
          This is a {v} alert message.
        </Alert>
      ))}
    </div>
  ),
};

export const WithTitle: Story = {
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again or contact support if the issue persists.",
  },
};

export const Dismissible: Story = {
  args: {
    variant: "warning",
    title: "Connection unstable",
    children: "Some features may not work correctly.",
    onDismiss: () => {},
  },
};
