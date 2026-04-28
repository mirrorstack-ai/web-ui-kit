import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof Card> = {
  title: "UI/Surfaces/Card",
  component: Card,
  args: {
    children: (
      <>
        <h3 className="text-base font-semibold text-on-surface">Card Title</h3>
        <p className="text-sm text-on-surface-variant mt-1">
          A brief description of the card content.
        </p>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />,
    actions: (
      <>
        <Button variant="text" size="sm">
          Cancel
        </Button>
        <Button variant="filled" size="sm">
          Action
        </Button>
      </>
    ),
  },
};

export const Default: Story = {
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />,
    actions: (
      <>
        <Button variant="text" size="sm">
          Cancel
        </Button>
        <Button variant="filled" size="sm">
          Action
        </Button>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    className: "max-w-sm",
    interactive: true,
    media: <div className="aspect-video bg-surface-container" />,
  },
};

export const MediaOnly: Story = {
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />,
  },
};

export const NoActions: Story = {
  args: {
    className: "max-w-sm",
    media: <div className="aspect-video bg-surface-container" />,
  },
};

export const ContentOnly: Story = {
  args: {
    className: "max-w-sm",
  },
};
