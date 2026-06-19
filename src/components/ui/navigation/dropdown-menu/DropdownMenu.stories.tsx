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
 * An item's `icon` can be a custom node (e.g. a brand-logo SVG that Material
 * Symbols doesn't ship) instead of an icon name &mdash; size it to ~the item
 * icon size and use `currentColor`. `external: true` adds a trailing
 * open-in-new glyph for items that open in a new tab.
 */
export const CustomIconAndExternal: Story = {
  args: {
    trigger: (
      <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />
    ),
    notchRadius: 8,
    notchInverseRadius: 6,
    items: [
      {
        id: "repo",
        label: "Repository",
        external: true,
        icon: (
          <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor">
            <path d="M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z" />
          </svg>
        ),
      },
      { id: "docs", label: "Docs", icon: "menu_book", external: true },
      { type: "separator" as const },
      { id: "settings", label: "Settings", icon: "settings" },
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
