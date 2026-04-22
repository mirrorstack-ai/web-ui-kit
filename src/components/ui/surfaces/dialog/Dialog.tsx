import { useEffect, useRef, useId, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Button, type ButtonProps } from "@/components/ui/actions/button/Button";

export const meta: ComponentMeta = {
  name: "Dialog",
  description:
    "Modal dialog with backdrop, focus trap, scroll locking, and declarative action buttons",
};

export interface DialogAction {
  label: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  loading?: boolean;
  disabled?: boolean;
}

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
  actions?: DialogAction[];
  className?: string;
}

let scrollLockCount = 0;

function lockScroll() {
  if (typeof document === "undefined") return;
  scrollLockCount++;
  if (scrollLockCount === 1) document.body.style.overflow = "hidden";
}

function unlockScroll() {
  if (typeof document === "undefined") return;
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) document.body.style.overflow = "";
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  className,
}: DialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current?.();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) return;
    if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="!m-0 fixed inset-0 z-50 bg-black/50"
        onClick={() => onClose?.()}
      />
      <div className="!m-0 fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          ref={dialogRef}
          tabIndex={-1}
          className={cn(
            "bg-surface rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl outline-none pointer-events-auto max-h-[90vh] overflow-y-auto",
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
        >
          {title && (
            <h3
              id={titleId}
              className="text-lg font-semibold text-on-surface mb-4"
            >
              {title}
            </h3>
          )}

          {children}

          {actions && actions.length > 0 && (
            <div className="flex justify-end gap-3 mt-4">
              {actions.map((action, i) => (
                <Button
                  key={`${i}-${action.label}`}
                  variant={action.variant ?? "text"}
                  color={action.color}
                  onClick={action.onClick}
                  loading={action.loading}
                  disabled={action.disabled}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
