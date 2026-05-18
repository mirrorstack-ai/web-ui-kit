import type { Meta, StoryObj } from "@storybook/react";
import { Markdown } from "./Markdown";

const meta: Meta<typeof Markdown> = {
  title: "UI/Data/Markdown",
  component: Markdown,
  decorators: [
    (Story) => (
      <div className="w-full max-w-prose bg-surface p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Markdown>;

const KITCHEN_SINK = `## What you'll get

Install **My Module** and your app picks up a new set of pages, actions, and notifications — no setup screens to fight through.

## How it shows up

- A new section in your sidebar where you can pick up where you left off
- Quick actions surfaced on the relevant detail pages
- Notifications when something happens that needs your attention

## Quick start

Drop a handler into another module to call into this one:

\`\`\`ts
import ms from "@mirrorstack/sdk";

const result = await ms.Call("@me/my-module", "do.thing", { /* ... */ });
\`\`\`

## Notes

This module is **read-only** for other modules — writes go through registered \`handlers\`, not direct table writes.`;

export const Playground: Story = {
  args: { source: KITCHEN_SINK },
};

export const Headings: Story = {
  args: {
    source: `# Heading level 1

## Heading level 2

### Heading level 3

Body text follows the smallest heading.`,
  },
};

export const ListsAndInlines: Story = {
  args: {
    source: `Most lines render as paragraphs with **bold** and \`code\` inline.

- First bullet with a \`code\` ref
- **Bold bullet** with emphasis
- Plain bullet

A second paragraph follows the list.`,
  },
};

export const FencedCode: Story = {
  args: {
    source: `Fenced code blocks render with a monospace surface and an optional language label.

\`\`\`ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\``,
  },
};

export const Empty: Story = {
  args: { source: "" },
};
