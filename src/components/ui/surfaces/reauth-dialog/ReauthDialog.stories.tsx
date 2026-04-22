import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReauthDialog } from "./ReauthDialog";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof ReauthDialog> = {
  title: "UI/Surfaces/ReauthDialog",
  component: ReauthDialog,
};

export default meta;
type Story = StoryObj<typeof ReauthDialog>;

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete Account</Button>
        <ReauthDialog
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={(token) => {
            console.log("Reauth token:", token);
            setOpen(false);
          }}
          onEmailSendCode={async () => {
            await new Promise((r) => setTimeout(r, 1000));
            return "challenge-123";
          }}
          onEmailVerifyCode={async (_challengeId, code) => {
            await new Promise((r) => setTimeout(r, 1000));
            if (code === "123456") return "mock-reauth-token";
            throw new Error("Invalid verification code");
          }}
          onPasskeyVerify={async () => {
            await new Promise((r) => setTimeout(r, 1000));
            return "mock-passkey-token";
          }}
        />
      </>
    );
  },
};

export const EmailOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Sensitive Action</Button>
        <ReauthDialog
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
          methods={["email"]}
          onEmailSendCode={async () => {
            await new Promise((r) => setTimeout(r, 500));
            return "challenge-456";
          }}
          onEmailVerifyCode={async (_id, code) => {
            await new Promise((r) => setTimeout(r, 500));
            if (code === "123456") return "token";
            throw new Error("Invalid code");
          }}
        />
      </>
    );
  },
};

export const PasskeyOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Verify</Button>
        <ReauthDialog
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
          methods={["passkey"]}
          onPasskeyVerify={async () => {
            await new Promise((r) => setTimeout(r, 1000));
            return "passkey-token";
          }}
        />
      </>
    );
  },
};
