import type { Meta, StoryObj } from "@storybook/react";
import { Alert, type AlertVariant } from "./Alert";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof Alert> = {
  title: "UI/Feedback/Alert",
  component: Alert,
  args: {
    variant: "primary",
    children: "This is an informational alert message.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["error", "success", "warning", "primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["primary", "secondary", "success", "warning", "error"] as AlertVariant[]).map((v) => (
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

export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "Update available",
    children: "Version 1.4.0 is ready to install.",
    action: (
      <Button variant="filled" color="warning" size="sm">
        Update
      </Button>
    ),
  },
};

export const WithReload: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert
        variant="error"
        title="Could not load activity"
        onReload={() => {}}
        onDismiss={() => {}}
      >
        The latest activity could not be fetched. Reload to try again.
      </Alert>
      <Alert
        variant="error"
        title="Reloading activity"
        onReload={() => {}}
        reloadPending
        onDismiss={() => {}}
      >
        Fetching the latest activity. The reload control is disabled while the request is pending.
      </Alert>
    </div>
  ),
};

export const WithCustomIcon: Story = {
  args: {
    variant: "primary",
    icon: "passkey",
    iconSize: 28,
    children: "Set up a passkey for faster verification next time.",
  },
};

export const HideIcon: Story = {
  args: {
    variant: "error",
    title: "Before you continue",
    hideIcon: true,
    children:
      "Useful when the surrounding container (like a destructive Dialog) already conveys severity and a leading icon would crowd the title.",
  },
};
