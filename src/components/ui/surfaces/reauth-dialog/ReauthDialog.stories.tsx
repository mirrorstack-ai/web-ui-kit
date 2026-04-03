import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReauthDialog } from "./ReauthDialog";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof ReauthDialog> = {
  title: "UI/Surfaces/ReauthDialog",
  component: ReauthDialog,
  args: {
    open: true,
    title: "Verify your identity",
    description:
      "For your security, please verify your identity before continuing.",
    methods: ["passkey", "password"],
  },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ReauthDialog>;

/** Interactive playground — all controls work here */
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.open ?? true);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open ReauthDialog</Button>
        <ReauthDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={(token) => {
            setOpen(false);
            alert(`Verified! Token: ${token}`);
          }}
          onPasskeyVerify={async () => {
            await new Promise((r) => setTimeout(r, 1500));
            return "passkey-token-abc123";
          }}
          onPasswordVerify={async (password) => {
            await new Promise((r) => setTimeout(r, 1000));
            if (password !== "password") {
              throw new Error("Incorrect password");
            }
            return "password-token-xyz789";
          }}
        />
      </div>
    );
  },
};

/** Password-only mode */
export const PasswordOnly: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Password Dialog</Button>
        <ReauthDialog
          {...args}
          open={open}
          methods={["password"]}
          onClose={() => setOpen(false)}
          onSuccess={(token) => {
            setOpen(false);
            alert(`Verified! Token: ${token}`);
          }}
          onPasswordVerify={async (password) => {
            await new Promise((r) => setTimeout(r, 1000));
            if (password !== "password") {
              throw new Error("Incorrect password");
            }
            return "password-token-xyz789";
          }}
        />
      </div>
    );
  },
};

/** Passkey-only mode */
export const PasskeyOnly: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Passkey Dialog</Button>
        <ReauthDialog
          {...args}
          open={open}
          methods={["passkey"]}
          onClose={() => setOpen(false)}
          onSuccess={(token) => {
            setOpen(false);
            alert(`Verified! Token: ${token}`);
          }}
          onPasskeyVerify={async () => {
            await new Promise((r) => setTimeout(r, 1500));
            return "passkey-token-abc123";
          }}
        />
      </div>
    );
  },
};
