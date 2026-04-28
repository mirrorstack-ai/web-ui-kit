import type { ComponentMeta } from "@/types/component-meta";
import type { ButtonProps } from "@/components/ui/actions/button/Button";
import { Dialog } from "@/components/ui/surfaces/dialog/Dialog";

export const meta: ComponentMeta = {
  name: "ConfirmDialog",
  description:
    "Convenience wrapper over Dialog for the common confirm/cancel pattern",
};

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  confirmColor?: ButtonProps["color"];
  loading?: boolean;
  className?: string;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  confirmColor,
  loading = false,
  className,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      className={className}
      actions={[
        { label: "Cancel", onClick: onClose, variant: "text" },
        {
          label: confirmLabel,
          onClick: onConfirm,
          loading,
          color: confirmColor,
        },
      ]}
    >
      <p className="text-sm text-on-surface-variant">{description}</p>
    </Dialog>
  );
}
