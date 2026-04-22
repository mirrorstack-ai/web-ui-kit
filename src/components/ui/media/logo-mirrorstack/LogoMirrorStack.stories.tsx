import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./LogoMirrorStack";

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

export const CustomColor: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="w-16 h-16">
        <Logo />
      </div>
      <div className="w-16 h-16">
        <Logo className="bg-on-surface" />
      </div>
      <div className="w-16 h-16">
        <Logo className="bg-error" />
      </div>
    </div>
  ),
};
