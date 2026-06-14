import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "UI/Media/Logo",
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Playground: Story = {
  render: () => (
    <div className="w-16 h-16">
      <Logo />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="w-8 h-8">
        <Logo />
      </div>
      <div className="w-12 h-12">
        <Logo />
      </div>
      <div className="w-16 h-16">
        <Logo />
      </div>
      <div className="w-24 h-24">
        <Logo />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="w-8 h-8">
        <Logo loading />
      </div>
      <div className="w-16 h-16">
        <Logo loading />
      </div>
    </div>
  ),
};

export const WithWordmark: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9">
        <Logo />
      </div>
      <span className="text-2xl font-bold tracking-tight text-on-surface">
        Mirror<span className="text-primary">Stack</span>
      </span>
    </div>
  ),
};
