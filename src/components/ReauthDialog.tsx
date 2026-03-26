"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "../utils/cn";
import { Dialog } from "./Dialog";
import { Button } from "./Button";
import { Input } from "./Input";

export interface ReauthDialogProps {
  open: boolean;
  onClose: () => void;
  /** Called with the reauth token after successful verification. */
  onSuccess: (reauthToken: string) => void;
  title?: string;
  description?: string;
  /** Available verification methods. Defaults to ["passkey", "password"] */
  methods?: ("password" | "passkey")[];
  /** Verify password -- must call reauth API and return the reauthToken. */
  onPasswordVerify?: (password: string) => Promise<string>;
  /** Verify passkey -- must run WebAuthn ceremony and return the reauthToken. */
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

  // Reset state whenever dialog opens
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
      setError(
        err instanceof Error ? err.message : "Incorrect password",
      );
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
      if (
        err instanceof DOMException &&
        err.name === "NotAllowedError"
      ) {
        // User cancelled the passkey prompt -- not an error
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Passkey verification failed",
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
            <span className="material-symbols-rounded text-primary !text-3xl">
              passkey
            </span>
          </div>
          <p className="text-sm text-on-surface-variant text-center">
            Use your passkey to verify
          </p>
          <Button
            onClick={handlePasskeyVerify}
            loading={isVerifying}
            className="w-full"
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
          <Input
            type="password"
            id="reauth-password"
            label="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                (e as React.ChangeEvent<HTMLInputElement>).target.value,
              )
            }
            disabled={isVerifying}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePasswordVerify();
            }}
            autoFocus
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
        <div
          className={cn(
            "rounded-xl border px-4 py-3 mt-4",
            "bg-error/10 border-error/30 text-error",
          )}
          role="alert"
        >
          <div className="flex items-center">
            <span
              className="material-symbols-rounded flex-shrink-0"
              style={{ fontSize: 20 }}
            >
              error
            </span>
            <div className="ml-3 flex-1">
              <div className="text-sm">{error}</div>
            </div>
            <button
              type="button"
              className="h-8 w-8 rounded-lg inline-flex items-center justify-center text-current -my-1 ml-auto"
              onClick={() => setError(null)}
              aria-label="Dismiss"
            >
              <span
                className="material-symbols-rounded"
                style={{ fontSize: 20 }}
              >
                close
              </span>
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
