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
          onPasswordVerify={async (pw) => {
            await new Promise((r) => setTimeout(r, 1000));
            if (pw === "password") return "mock-reauth-token";
            throw new Error("Incorrect password");
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

export const PasswordOnly: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Sensitive Action</Button>
        <ReauthDialog
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
          methods={["password"]}
          onPasswordVerify={async (pw) => {
            await new Promise((r) => setTimeout(r, 500));
            if (pw === "password") return "token";
            throw new Error("Incorrect password");
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
