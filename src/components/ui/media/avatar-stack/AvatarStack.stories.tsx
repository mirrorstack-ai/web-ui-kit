import type { Meta, StoryObj } from "@storybook/react";
import { AvatarStack } from "./AvatarStack";
import type { AvatarSize } from "@/components/ui/media/avatar/Avatar";

const people = [
  { src: "https://i.pravatar.cc/150?img=12", fallback: "AK" },
  { src: "https://i.pravatar.cc/150?img=32", fallback: "MB" },
  { fallback: "JL" },
  { src: "https://i.pravatar.cc/150?img=5", fallback: "RS" },
  { fallback: "TN" },
  { fallback: "CW" },
];

const meta: Meta<typeof AvatarStack> = {
  title: "UI/Media/AvatarStack",
  component: AvatarStack,
  args: {
    items: people.slice(0, 3),
    max: 4,
    size: "sm",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    max: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarStack>;

export const Playground: Story = {};

/**
 * `max` is the total visible slots including the overflow chip. Six items
 * with `max={4}` render three avatars + a `+3` chip; the chip reuses the
 * Avatar initials fallback so it inherits theme and size for free.
 */
export const Overflow: Story = {
  args: {
    items: people,
  },
};

/**
 * When `items` is a server-capped preview, pass `total` and the chip reports
 * the real remainder — here a 4-item preview of a 12-member list renders
 * three avatars + `+9`.
 */
export const CappedPreview: Story = {
  args: {
    items: people.slice(0, 4),
    total: 12,
  },
};

/**
 * `trailing` always renders last and never collapses into the chip — here a
 * square org avatar pinned after the member stack, the /apps tile layout
 * (members + owning org).
 */
export const TrailingOrg: Story = {
  args: {
    items: people,
    trailing: { fallback: "KP", square: true },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl"] as AvatarSize[]).map((size) => (
        <AvatarStack
          key={size}
          size={size}
          items={people}
          trailing={{ fallback: "KP", square: true }}
        />
      ))}
    </div>
  ),
};

/**
 * Over a cover image (the /apps and /orgs tile context) the stack sits on
 * the scrim; each Avatar's built-in 2px primary border doubles as the
 * overlap separator and picks up scoped `brandVars` accents.
 */
export const OverCover: Story = {
  render: () => (
    <div
      className="relative aspect-video w-80 overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(140deg, var(--color-primary) 0%, #04121a 100%)",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-4">
        <AvatarStack items={people} trailing={{ fallback: "KP", square: true }} />
      </div>
    </div>
  ),
};
