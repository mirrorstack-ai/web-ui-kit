import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar, type SnackbarVariant } from "./Snackbar";
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
    interface SnackbarItem {
      id: number;
      message: string;
      variant: SnackbarVariant;
      duration?: number;
      hasActions?: boolean;
    }

    const [items, setItems] = useState<SnackbarItem[]>([]);

    const addSnackbar = (variant: SnackbarVariant, message: string, duration?: number, hasActions?: boolean) => {
      setItems((prev) => {
        if (variant === "unsave" && prev.some((item) => item.variant === "unsave")) {
          return prev;
        }
        return [{ id: Date.now(), message, variant, duration, hasActions }, ...prev];
      });
    };

    const removeSnackbar = (id: number) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <div className="relative min-h-[400px]">
        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => addSnackbar("success", "Action completed", 3000)}>
            Show Success
          </Button>
          <Button variant="outline" color="error" onClick={() => addSnackbar("error", "Something went wrong", 3000)}>
            Show Error
          </Button>
          <Button variant="outline" color="warning" onClick={() => addSnackbar("warning", "Connection unstable", 3000)}>
            Show Warning
          </Button>
          <Button variant="outline" color="warning" onClick={() => addSnackbar("unsave", "You have unsaved changes", 0, true)}>
            Show Unsaved Changes
          </Button>
        </div>
        <div className="absolute bottom-4 inset-x-0 flex flex-col-reverse items-center gap-3 px-4">
          {items.map((item) => (
            <Snackbar
              key={item.id}
              {...args}
              message={item.message}
              variant={item.variant}
              open
              onDismiss={() => removeSnackbar(item.id)}
              duration={item.duration}
              {...(item.hasActions && {
                action: { label: "Save", onClick: () => removeSnackbar(item.id) },
                secondaryAction: { label: "Reset", onClick: () => removeSnackbar(item.id) },
              })}
              className="!relative !inset-auto !p-0 !w-full !max-w-lg"
            />
          ))}
        </div>
      </div>
    );
  },
};
