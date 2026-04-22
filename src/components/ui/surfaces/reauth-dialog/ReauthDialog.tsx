import { useState, useCallback, useEffect } from "react";
import type { ComponentMeta } from "@/types/component-meta";
import { Dialog } from "@/components/ui/surfaces/dialog/Dialog";
import { Button } from "@/components/ui/actions/button/Button";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Alert } from "@/components/ui/feedback/alert/Alert";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";

export const meta: ComponentMeta = {
  name: "ReauthDialog",
  description:
    "Modal dialog prompting re-authentication via passkey or password before sensitive actions",
};

export interface ReauthDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (reauthToken: string) => void;
  title?: string;
  description?: string;
  methods?: ("password" | "passkey")[];
  onPasswordVerify?: (password: string) => Promise<string>;
  onPasskeyVerify?: () => Promise<string>;
  className?: string;
}

export function ReauthDialog({
  open,
  onClose,
  onSuccess,
  title = "Verify your identity",
  description = "For your security, please verify your identity before continuing.",
  methods = ["passkey", "password"],
  onPasswordVerify,
  onPasskeyVerify,
  className,
}: ReauthDialogProps) {
  const hasPasskey = methods.includes("passkey");
  const hasPassword = methods.includes("password");

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPasswordFallback, setShowPasswordFallback] = useState(false);

  const showingPassword = !hasPasskey || showPasswordFallback;

  const reset = useCallback(() => {
    setPassword("");
    setError(null);
    setIsVerifying(false);
    setShowPasswordFallback(false);
  }, []);

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const handleClose = () => {
    if (isVerifying) return;
    reset();
    onClose();
  };

  const handlePasswordVerify = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }
    setError(null);
    setIsVerifying(true);
    try {
      if (!onPasswordVerify)
        throw new Error("Password verification not configured");
      const token = await onPasswordVerify(password);
      reset();
      onSuccess(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect password");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePasskeyVerify = async () => {
    setError(null);
    setIsVerifying(true);
    try {
      if (!onPasskeyVerify)
        throw new Error("Passkey verification not configured");
      const token = await onPasskeyVerify();
      reset();
      onSuccess(token);
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        // User cancelled the passkey prompt
      } else {
        setError(
          err instanceof Error ? err.message : "Passkey verification failed",
        );
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={title}
      className={className}
      actions={
        showingPassword
          ? [
              {
                label: "Cancel",
                variant: "text" as const,
                onClick: handleClose,
                disabled: isVerifying,
              },
              {
                label: "Verify",
                variant: "filled" as const,
                onClick: handlePasswordVerify,
                loading: isVerifying,
              },
            ]
          : undefined
      }
    >
      <p className="text-sm text-on-surface-variant mb-4">{description}</p>

      {!showingPassword && (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="passkey" size={32} className="text-primary" />
          </div>
          <p className="text-sm text-on-surface-variant text-center">
            Use your passkey to verify
          </p>
          <Button
            onClick={handlePasskeyVerify}
            loading={isVerifying}
            fullWidth
          >
            Verify with passkey
          </Button>
          {hasPassword && (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setShowPasswordFallback(true);
              }}
              disabled={isVerifying}
              className="text-sm text-primary hover:underline disabled:opacity-50"
            >
              Use password instead
            </button>
          )}
        </div>
      )}

      {showingPassword && (
        <div className="flex flex-col gap-3">
          <FloatingLabelInput
            type="password"
            id="reauth-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword((e as React.ChangeEvent<HTMLInputElement>).target.value)}
            disabled={isVerifying}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePasswordVerify();
            }}
            showPasswordToggle
          />
          {hasPasskey && (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setShowPasswordFallback(false);
              }}
              disabled={isVerifying}
              className="text-sm text-primary hover:underline disabled:opacity-50 self-start"
            >
              Use passkey instead
            </button>
          )}
        </div>
      )}

      {error && (
        <Alert variant="error" onDismiss={() => setError(null)} className="mt-4">
          {error}
        </Alert>
      )}
    </Dialog>
  );
}
