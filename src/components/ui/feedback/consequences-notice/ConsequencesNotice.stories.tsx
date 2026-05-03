import type { Meta, StoryObj } from "@storybook/react";
import { ConsequencesNotice } from "./ConsequencesNotice";

const meta: Meta<typeof ConsequencesNotice> = {
  title: "UI/Feedback/ConsequencesNotice",
  component: ConsequencesNotice,
  args: {
    items: [
      "You'll be signed out of every device immediately.",
      "API tokens and modules linked to this account stop working.",
      <>
        You can restore the account within <strong>90 days</strong> via the
        email link we send.
      </>,
      "After 90 days, the account and its data are permanently deleted.",
    ],
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["error", "warning", "info", "success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConsequencesNotice>;

export const Playground: Story = {};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Heads up",
    items: [
      "This rotation invalidates all existing tokens.",
      "Any module currently authenticating with the old token will fail until redeployed.",
    ],
  },
};

export const AppDeletion: Story = {
  args: {
    title: "Deleting this app will:",
    items: [
      "Stop all running modules associated with the app.",
      "Revoke API tokens scoped to this app.",
      <>
        Schedule the app's data for deletion in <strong>30 days</strong>.
      </>,
      "Cancel any active subscriptions.",
    ],
  },
};
