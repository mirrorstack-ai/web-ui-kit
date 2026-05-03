import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/ui/actions/button/Button";
import { ConsequencesNotice } from "@/components/ui/feedback/consequences-notice/ConsequencesNotice";
import { TypeToConfirmDialog } from "./TypeToConfirmDialog";

const meta: Meta<typeof TypeToConfirmDialog> = {
  title: "UI/Surfaces/TypeToConfirmDialog",
  component: TypeToConfirmDialog,
};

export default meta;
type Story = StoryObj<typeof TypeToConfirmDialog>;

export const DisableAccount: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="error" onClick={() => setOpen(true)}>
          Disable account
        </Button>
        <TypeToConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            setOpen(false);
            // eslint-disable-next-line no-alert
            alert("Account disabled (demo)");
          }}
          phrase="disable"
          warnTitle="Disable this account?"
          confirmActionLabel="Disable account"
          consequences={
            <ConsequencesNotice
              items={[
                "You'll be signed out of every device immediately.",
                "API tokens and modules linked to this account stop working.",
                <>
                  You can restore the account within <strong>90 days</strong> via
                  the email link we send.
                </>,
                "After 90 days, the account and its data are permanently deleted.",
              ]}
            />
          }
        />
      </>
    );
  },
};

export const DeleteApp: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="error" onClick={() => setOpen(true)}>
          Delete app
        </Button>
        <TypeToConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            setOpen(false);
            // eslint-disable-next-line no-alert
            alert("App deleted (demo)");
          }}
          phrase="delete"
          warnTitle="Delete this app?"
          confirmActionLabel="Delete app"
          consequences={
            <ConsequencesNotice
              title="Deleting this app will:"
              items={[
                "Stop all running modules associated with the app.",
                "Revoke API tokens scoped to this app.",
                <>
                  Schedule the app's data for deletion in{" "}
                  <strong>30 days</strong>.
                </>,
                "Cancel any active subscriptions.",
              ]}
            />
          }
        />
      </>
    );
  },
};

export const NoConsequencesBody: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="error" onClick={() => setOpen(true)}>
          Open
        </Button>
        <TypeToConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          phrase="confirm"
          warnTitle="Are you sure?"
          confirmActionLabel="Yes, do it"
        />
      </>
    );
  },
};
