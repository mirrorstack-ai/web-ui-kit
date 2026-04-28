import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "./ConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "UI/Surfaces/ConfirmDialog",
  component: ConfirmDialog,
  args: {
    open: true,
    title: "Confirm action",
    description: "Are you sure you want to proceed?",
    confirmLabel: "Confirm",
    loading: false,
  },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    confirmLabel: { control: "text" },
    confirmColor: { control: "select", options: ["error", undefined] },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Playground: Story = {};

export const ErrorVariant: Story = {
  args: {
    title: "Delete item?",
    description:
      "This will permanently delete the item. You cannot undo this action.",
    confirmLabel: "Delete",
    confirmColor: "error",
  },
};

export const Loading: Story = {
  args: {
    title: "Saving changes",
    description: "Please wait while your changes are saved.",
    loading: true,
  },
};
