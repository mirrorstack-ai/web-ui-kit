import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./Snackbar";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof Snackbar> = {
  title: "UI/Feedback/Snackbar",
  component: Snackbar,
  args: {
    message: "Changes saved successfully",
    variant: "default",
    open: true,
    inline: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning", "unsave"],
    },
    open: { control: "boolean" },
    loading: { control: "boolean" },
    inline: { control: "boolean" },
    duration: { control: "number" },
    message: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[200px] flex items-end justify-center p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

/** Interactive playground — all controls work here */
export const Playground: Story = {};

/** All variants */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-16">
      <Snackbar {...args} variant="default" message="Default notification" />
      <Snackbar {...args} variant="success" message="Changes saved successfully" />
      <Snackbar {...args} variant="error" message="Failed to save changes" />
      <Snackbar {...args} variant="warning" message="Connection unstable" />
      <Snackbar {...args} variant="unsave" message="You have unsaved changes" />
    </div>
  ),
};

/** With dismiss close button */
export const WithDismiss: Story = {
  args: {
    message: "File uploaded",
    variant: "success",
    onDismiss: () => {},
  },
};

/** With action buttons */
export const WithActions: Story = {
  args: {
    message: "Item deleted",
    action: { label: "Undo", onClick: () => {} },
  },
};

/** With primary and secondary actions */
export const WithBothActions: Story = {
  args: {
    message: "Discard draft?",
    action: { label: "Discard", onClick: () => {} },
    secondaryAction: { label: "Keep editing", onClick: () => {} },
  },
};

/** Loading state on primary action */
export const Loading: Story = {
  args: {
    message: "Restoring item...",
    loading: true,
    action: { label: "Undo", onClick: () => {} },
  },
};

/** Toggle snackbar open/closed with a button */
export const ToggleDemo: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative min-h-[200px]">
        <Button onClick={() => setOpen(true)}>Show Snackbar</Button>
        <Snackbar
          {...args}
          message="Action completed"
          variant="success"
          open={open}
          onDismiss={() => setOpen(false)}
          duration={3000}
          inline
        />
      </div>
    );
  },
};
