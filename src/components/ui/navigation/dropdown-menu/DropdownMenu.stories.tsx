import { useState } from "react";
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
 * `openOnHover` opens the menu on mouse hover of the trigger, layered on top of
 * click. The menu stays open while the pointer is over the trigger or the menu,
 * and closes after a short grace on leave so trigger&rarr;menu travel does not
 * dismiss it. Mouse-only &mdash; touch/pen keep tap-to-toggle. Reach for it on a
 * desktop toolbar overflow menu, never a mobile bottom-nav menu. Hover over the
 * button below to open it.
 */
export const OpenOnHover: Story = {
  args: {
    openOnHover: true,
    trigger: (
      <IconButton icon="more_horiz" aria-label="More" variant="text" />
    ),
    items: [
      { id: "rename", label: "Rename", icon: "edit" },
      { id: "move", label: "Move to…", icon: "drive_file_move" },
      { type: "separator" as const },
      { id: "archive", label: "Archive", icon: "archive" },
      { id: "delete", label: "Delete", icon: "delete", variant: "error" as const },
    ],
    onSelect: (item) => console.log("Selected:", item.id),
  },
};

/**
 * Hover menu with a separator above a toggle row (the mirrorstack.ai ≡ menu
 * shape): the menu stays open over the whole card, separator included, and the
 * divider's block margin is `my-0.5` (a 6px gap each side with the 4px flex gap).
 */
export const OpenOnHoverSeparator: Story = {
  args: {
    openOnHover: true,
    trigger: <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />,
    items: [
      { id: "docs", label: "Docs", icon: "menu_book" },
      { type: "separator" as const },
      { id: "reduce-motion", label: "Reduce animation", checked: false },
    ],
    onSelect: (item) => console.log("Selected:", item.id),
  },
};

/**
 * Regression for a click-through header: the menu sits under a
 * click-through wrapper (`pointer-events: none` on the menu), yet the whole card (separator, padding, gaps)
 * stays hoverable, so a hover-open menu does not close while the pointer
 * crosses the divider.
 */
export const OpenOnHoverUnderPointerNone: Story = {
  ...OpenOnHoverSeparator,
  decorators: [
    (Story) => (
      // The menu wrapper is click-through and only item rows opt back in —
      // the shape of the mirrorstack.ai header's global CSS.
      <div className="inline-block [&_[role=menu]]:pointer-events-none [&_[role=menuitem]]:pointer-events-auto">
        <Story />
      </div>
    ),
  ],
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

/**
 * `notchHeadRadius` rounds ONLY the notch tab's outer corners, so an avatar
 * trigger gets a rounder tab (20) than the menu body (`notchRadius` 12).
 */
export const RoundedHead: Story = {
  args: {
    trigger: (
      <IconButton icon="account_circle" aria-label="Account menu" variant="text" size="sm" />
    ),
    notchWidth: 44,
    notchHeight: 44,
    notchRadius: 12,
    notchHeadRadius: 20,
    items: [
      { id: "profile", label: "Profile", icon: "person" },
      { id: "settings", label: "Settings", icon: "settings" },
      { type: "separator" as const },
      { id: "signout", label: "Sign out", icon: "logout" },
    ],
    onSelect: (item) => console.log("Selected:", item.id),
  },
};

async function waitForRow(root: HTMLElement): Promise<HTMLElement> {
  for (let i = 0; i < 50; i++) {
    const row = root.querySelector<HTMLElement>('[role="menuitemcheckbox"]');
    if (row) return row;
    await new Promise((r) => setTimeout(r, 20));
  }
  throw new Error("toggle row never rendered");
}

/**
 * An item with `checked` becomes a toggle row (`menuitemcheckbox`): no leading
 * icon, a trailing Switch, and selecting it (click / Enter / Space) does NOT
 * close the menu — the caller flips its own state.
 */
export const ToggleItem: Story = {
  // Layout proof: the Switch box must sit on the label's vertical centre.
  play: async ({ canvasElement }) => {
    canvasElement.querySelector("button")?.click();
    const row = await waitForRow(canvasElement);
    await document.fonts.ready; // the icon font changes row height once loaded
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    const label = Array.from(row.childNodes).find((n) => n.nodeType === Node.TEXT_NODE)!;
    const range = document.createRange();
    range.selectNodeContents(label);
    const labelRect = range.getBoundingClientRect();
    const sw = row.querySelector('[role="switch"]')!.getBoundingClientRect();
    const diff = Math.abs(sw.top + sw.height / 2 - (labelRect.top + labelRect.height / 2));
    console.log(`[ToggleItem] switch centreY - label centreY = ${diff.toFixed(2)}px`);
    if (diff > 0.5) throw new Error(`Switch is ${diff.toFixed(2)}px off the label's centre`);
  },
  render: (args) => {
    const [reduce, setReduce] = useState(false);
    return (
      <DropdownMenu
        {...args}
        items={[
          { id: "docs", label: "Docs", icon: "menu_book" },
          { type: "separator" as const },
          { id: "reduce-motion", label: "Reduce animation", checked: reduce },
        ]}
        onSelect={(item) => {
          if (item.id === "reduce-motion") setReduce((v) => !v);
        }}
      />
    );
  },
  args: {
    trigger: (
      <IconButton icon="menu" aria-label="Open menu" variant="text" size="sm" />
    ),
    items: [],
    onSelect: () => {},
  },
};
