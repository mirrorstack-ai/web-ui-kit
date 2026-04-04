import type { Meta, StoryObj } from "@storybook/react";
import { SocialButton } from "./SocialButton";

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

/** Interactive playground — all controls work here */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <div className="flex max-w-sm items-center justify-center rounded-xl bg-surface-container p-8">
        <Story />
      </div>
    ),
  ],
};

/** All supported social providers */
export const AllProviders: Story = {
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-3 rounded-xl bg-surface-container p-6">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-on-surface-variant">
        Sign in
      </p>
      <SocialButton {...args} provider="google" />
      <SocialButton {...args} provider="discord" />
      <SocialButton {...args} provider="openid" />
      <SocialButton {...args} provider="line" />
    </div>
  ),
};

/** Icon-only compact layout */
export const IconOnly: Story = {
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-4 rounded-xl bg-surface-container p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
        Or continue with
      </p>
      <div className="flex gap-3">
        {(["google", "discord", "openid", "line"] as const).map((p) => (
          <SocialButton
            {...args}
            key={p}
            provider={p}
            className="w-12 px-0 [&>span]:hidden"
          />
        ))}
      </div>
    </div>
  ),
};

/** Login card demo with social buttons */
export const LoginCard: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-5 rounded-2xl bg-surface-container p-6 shadow-lg">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-on-surface">Welcome back</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Choose a provider to sign in
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <SocialButton {...args} provider="google" />
        <SocialButton {...args} provider="discord" />
        <SocialButton {...args} provider="line" />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-outline-variant" />
        <span className="text-xs text-on-surface-variant">or</span>
        <div className="h-px flex-1 bg-outline-variant" />
      </div>

      <div className="text-center text-sm text-on-surface-variant">
        <SocialButton {...args} provider="openid" className="w-full" />
      </div>
    </div>
  ),
};
