import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/Navigation/DropdownMenu",
  component: DropdownMenu,
  decorators: [
    (Story) => (
      <div className="p-8 min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
  args: {
    trigger: (
      <IconButton icon="more_vert" aria-label="Open menu" variant="filled" />
    ),
    items: [
      { id: "edit", label: "Edit", icon: "edit" },
      { id: "duplicate", label: "Duplicate", icon: "content_copy" },
      { type: "separator" as const },
      { id: "delete", label: "Delete", icon: "delete", variant: "danger" as const },
    ],
    onSelect: (item) => console.log("Selected:", item.id),
  },
};

/**
 * The notch head tuned to a small trigger: `notchWidth`/`notchHeight` size the
 * tab to the icon button, and `notchRadius`/`notchInverseRadius` round the head
 * down to the button's own corner radius instead of the default bulbous 16.
 */
export const TightHead: Story = {
  args: {
    trigger: (
      <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />
    ),
    notchWidth: 34,
    notchHeight: 38,
    notchRadius: 8,
    notchInverseRadius: 6,
    items: [
      { id: "how", label: "How it works", icon: "play_circle" },
      { id: "source", label: "View source", icon: "code" },
      { type: "separator" as const },
      { id: "subscribe", label: "Get early access", icon: "mail" },
    ],
    onSelect: (item) => console.log("Selected:", item.id),
  },
};
