"use client";

import { type ReactNode } from "react";
import { Dialog } from "./Dialog";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** Dialog title */
  title: string;
  /** Dialog body content */
  children?: ReactNode;
  /** Confirm button label (default: "Confirm") */
  confirmLabel?: string;
  /** Cancel button label (default: "Cancel") */
  cancelLabel?: string;
  /** Use destructive (error) styling for the confirm button */
  destructive?: boolean;
  /** Show loading state on the confirm button */
  loading?: boolean;
  className?: string;
}

/**
 * Pre-configured confirm/cancel dialog built on top of Dialog.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={showDelete}
 *   onClose={() => setShowDelete(false)}
 *   onConfirm={handleDelete}
 *   title="Delete file?"
 *   destructive
 *   loading={isDeleting}
 * >
 *   <p>This action cannot be undone.</p>
 * </ConfirmDialog>
 * ```
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  className,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      title={title}
      className={className}
      actions={[
        {
          label: cancelLabel,
          variant: "text",
          onClick: onClose,
          disabled: loading,
        },
        {
          label: confirmLabel,
          variant: "filled",
          color: destructive ? "error" : "primary",
          onClick: onConfirm,
          loading,
        },
      ]}
    >
      {children}
    </Dialog>
  );
}
