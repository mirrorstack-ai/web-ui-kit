import { useEffect, useState, type ReactNode } from "react";

import { Dialog } from "@/components/ui/surfaces/dialog/Dialog";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import type { ButtonProps } from "@/components/ui/actions/button/Button";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "TypeToConfirmDialog",
  description:
    "Two-step destructive confirm flow: a consequences-explainer Dialog followed by a type-to-confirm input. Mirrors the GitHub/Stripe danger-zone pattern.",
};

export interface TypeToConfirmDialogProps {
  /** Open state for the entire flow. The component owns the warn→type stage internally. */
  open: boolean;
  /** Fired on Cancel, Escape, backdrop click, or after a successful onConfirm. */
  onClose: () => void;
  /** Called when the user types the phrase and clicks the confirm button. */
  onConfirm: () => void | Promise<void>;
  /**
   * Phrase the user must type. Comparison is case-insensitive and trims
   * surrounding whitespace.
   */
  phrase: string;
  /** Title for the warn-step Dialog (e.g. "Disable this account?"). */
  warnTitle: string;
  /**
   * Title for the type-step Dialog. Defaults to `Type '<phrase>' to confirm`
   * so simple consumers don't have to repeat the phrase.
   */
  confirmTitle?: string;
  /** Label for the confirm button on the type step (e.g. "Disable account"). */
  confirmActionLabel: string;
  /** Label for the warn-step Continue button. Default "Continue". */
  warnActionLabel?: string;
  /** Color tone for both action buttons. Default "error". */
  color?: ButtonProps["color"];
  /**
   * Notice/consequences body. Shown in BOTH stages so the user sees the same
   * information at the warn step and again when typing to confirm. Typically
   * a `<ConsequencesNotice />`.
   */
  consequences?: ReactNode;
  /** Loading state for the confirm action. Disables Cancel + Confirm while true. */
  loading?: boolean;
}

export function TypeToConfirmDialog({
  open,
  onClose,
  onConfirm,
  phrase,
  warnTitle,
  confirmTitle,
  confirmActionLabel,
  warnActionLabel = "Continue",
  color = "error",
  consequences,
  loading = false,
}: TypeToConfirmDialogProps) {
  const [stage, setStage] = useState<"warn" | "type">("warn");
  const [input, setInput] = useState("");

  // Reset stage and input whenever the flow closes so the next open starts
  // fresh at the warn step. Doing this in an effect (instead of inside
  // onClose) covers Escape, backdrop-click, and parent-driven closes that
  // bypass our handlers.
  useEffect(() => {
    if (!open) {
      setStage("warn");
      setInput("");
    }
  }, [open]);

  const matched = input.trim().toLowerCase() === phrase.toLowerCase();
  const resolvedConfirmTitle = confirmTitle ?? `Type '${phrase}' to confirm`;

  return (
    <>
      <Dialog
        open={open && stage === "warn"}
        onClose={onClose}
        title={warnTitle}
        actions={[
          { label: "Cancel", variant: "text", onClick: onClose },
          {
            label: warnActionLabel,
            variant: "filled",
            color,
            onClick: () => setStage("type"),
          },
        ]}
      >
        {consequences}
      </Dialog>

      <Dialog
        open={open && stage === "type"}
        onClose={onClose}
        title={resolvedConfirmTitle}
        actions={[
          {
            label: "Cancel",
            variant: "text",
            onClick: onClose,
            disabled: loading,
          },
          {
            label: confirmActionLabel,
            variant: "filled",
            color,
            disabled: !matched || loading,
            loading,
            onClick: onConfirm,
          },
        ]}
      >
        <div className="space-y-3">
          {consequences}
          <p className="text-sm text-on-surface-variant">
            To confirm, type{" "}
            <span className="font-mono font-medium text-on-surface">
              {phrase}
            </span>{" "}
            below.
          </p>
          <FloatingLabelInput
            id="type-to-confirm-input"
            type="text"
            label="Confirmation"
            size="sm"
            hideLabel
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
          />
        </div>
      </Dialog>
    </>
  );
}
