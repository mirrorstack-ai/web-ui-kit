import type { Meta, StoryObj } from "@storybook/react";
import { SocialButton, SocialIcon } from "./SocialButton";

const meta: Meta<typeof SocialButton> = {
  title: "UI/Actions/SocialButton",
  component: SocialButton,
  args: {
    provider: "google",
  },
  argTypes: {
    provider: {
      control: "select",
      options: ["google", "discord", "openid", "line"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SocialButton>;

export const Playground: Story = {};

export const AllProviders: Story = {
  render: () => (
    <div className="flex gap-3 max-w-md">
      <SocialButton provider="google" />
      <SocialButton provider="discord" />
      <SocialButton provider="openid" />
      <SocialButton provider="line" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <SocialButton provider="google">
        <SocialIcon provider="google" className="mr-2" />
        Continue with Google
      </SocialButton>
      <SocialButton provider="discord">
        <SocialIcon provider="discord" className="mr-2" />
        Continue with Discord
      </SocialButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    provider: "google",
    disabled: true,
  },
};
