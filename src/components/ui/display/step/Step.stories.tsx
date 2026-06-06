import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Step } from "./Step";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof Step> = {
  title: "UI/Data/Step",
  component: Step,
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl bg-background p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    n: 1,
    title: "Details",
    status: "active",
    children: (
      <p className="text-sm text-on-surface-variant">
        Step body lives here. Anything from a single line to a full form.
      </p>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Step>;

export const Active: Story = {};

export const Complete: Story = {
  args: { status: "complete" },
};

export const CompleteWithEdit: Story = {
  args: {
    status: "complete",
    onEdit: () => console.log("Edit step 1"),
    children: undefined,
  },
};

export const Pending: Story = {
  args: { status: "pending", n: 3, title: "Review" },
};

export const Wizard: StoryObj<typeof Step> = {
  render: () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    return (
      <div>
        <Step
          n={1}
          title="Details"
          status={step === 1 ? "active" : "complete"}
          onEdit={step > 1 ? () => setStep(1) : undefined}
        >
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-on-surface-variant">
                Fill in the basics. Name, slug, description.
              </p>
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          )}
        </Step>
        <Step
          n={2}
          title="Modules"
          status={step === 2 ? "active" : step > 2 ? "complete" : "pending"}
          onEdit={step > 2 ? () => setStep(2) : undefined}
        >
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-on-surface-variant">
                Pick the modules you want installed on this app.
              </p>
              <div className="flex gap-2">
                <Button variant="text" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          )}
        </Step>
        <Step
          n={3}
          title="Review"
          status={step === 3 ? "active" : "pending"}
          isLast
        >
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-on-surface-variant">
                Confirm and create the app.
              </p>
              <div className="flex gap-2">
                <Button variant="text" onClick={() => setStep(2)}>Back</Button>
                <Button>Create app</Button>
              </div>
            </div>
          )}
        </Step>
      </div>
    );
  },
};
