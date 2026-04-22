import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof Dialog> = {
  title: "UI/Surfaces/Dialog",
  component: Dialog,
  args: {
    open: true,
    title: "Confirm action",
    children: "Are you sure you want to proceed? This action cannot be undone.",
  },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  args: {
    actions: [
      { label: "Cancel", onClick: () => {} },
      { label: "Confirm", onClick: () => {}, variant: "filled" },
    ],
  },
};

export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete item?"
          actions={[
            { label: "Cancel", onClick: () => setOpen(false) },
            {
              label: "Delete",
              onClick: () => setOpen(false),
              variant: "filled",
              color: "error",
            },
          ]}
        >
          <p className="text-on-surface-variant text-sm">
            This will permanently delete the item. You cannot undo this action.
          </p>
        </Dialog>
      </>
    );
  },
};

export const LoadingAction: Story = {
  args: {
    title: "Saving changes",
    children: "Please wait while your changes are being saved...",
    actions: [
      { label: "Cancel", onClick: () => {}, disabled: true },
      { label: "Saving...", onClick: () => {}, variant: "filled", loading: true },
    ],
  },
};

export const NoTitle: Story = {
  args: {
    title: undefined,
    children: "A simple message dialog without a title heading.",
    actions: [{ label: "OK", onClick: () => {}, variant: "filled" }],
  },
};
