import { useState, useCallback, useEffect } from "react";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import type { ComponentMeta } from "@/types/component-meta";
import { Button } from "@/components/ui/actions/button/Button";

export const meta: ComponentMeta = {
  name: "ReauthDialog",
  description:
    "Modal dialog prompting re-authentication via passkey or password before sensitive actions",
};

export type ReauthMethod = "password" | "passkey";

export interface ReauthDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onSuccess: (reauthToken: string) => void;
  readonly title?: string;
  readonly description?: string;
  readonly methods?: readonly ReauthMethod[];
  readonly onPasswordVerify?: (password: string) => Promise<string>;
  readonly onPasskeyVerify?: () => Promise<string>;
  readonly className?: string;
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

  if (isDev) {
    if (hasPasskey && !onPasskeyVerify) {
      console.warn(
        "[ReauthDialog] methods includes 'passkey' but onPasskeyVerify is not provided",
      );
    }
    if (hasPassword && !onPasswordVerify) {
      console.warn(
        "[ReauthDialog] methods includes 'password' but onPasswordVerify is not provided",
      );
    }
  }

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
      if (!onPasswordVerify) {
        throw new Error("Password verification not configured");
      }
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
      if (!onPasskeyVerify) {
        throw new Error("Passkey verification not configured");
      }
      const token = await onPasskeyVerify();
      reset();
      onSuccess(token);
    } catch (err) {
      if (
        err instanceof DOMException &&
        err.name === "NotAllowedError"
      ) {
        // User cancelled the passkey prompt — not an error
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-scrim/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-2xl bg-surface-container-low p-6 shadow-xl",
          className,
        )}
      >
        <h2 className="text-lg font-semibold text-on-surface">{title}</h2>
        <p className="mt-2 text-sm text-on-surface-variant">{description}</p>

        <div className="mt-4">
          {/* Passkey view */}
          {!showingPassword && (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <span
                  className="material-symbols-rounded text-primary"
                  aria-hidden="true"
                  style={{ fontSize: 28 }}
                >
                  passkey
                </span>
              </div>
              <p className="text-center text-sm text-on-surface-variant">
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
                  className="text-sm text-primary hover:underline disabled:opacity-50 cursor-pointer"
                >
                  Use password instead
                </button>
              )}
            </div>
          )}

          {/* Password view */}
          {showingPassword && (
            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="reauth-password"
                  className="mb-1 block text-sm font-medium text-on-surface"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="reauth-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isVerifying}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePasswordVerify();
                  }}
                  autoFocus
                  className={cn(
                    "w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors",
                    "bg-surface text-on-surface border-outline-variant",
                    "focus:border-primary focus:ring-1 focus:ring-primary",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                />
              </div>
              {hasPasskey && (
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setShowPasswordFallback(false);
                  }}
                  disabled={isVerifying}
                  className="self-start text-sm text-primary hover:underline disabled:opacity-50 cursor-pointer"
                >
                  Use passkey instead
                </button>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="mt-4 flex items-center gap-3 rounded-xl border bg-error/10 border-error/30 px-4 py-3 text-error"
              role="alert"
            >
              <span
                className="material-symbols-rounded shrink-0"
                aria-hidden="true"
                style={{ fontSize: 20 }}
              >
                error
              </span>
              <span className="flex-1 text-sm">{error}</span>
              <button
                type="button"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
                className="shrink-0 rounded-full p-1 text-current opacity-70 hover:opacity-100 cursor-pointer"
              >
                <span
                  className="material-symbols-rounded"
                  aria-hidden="true"
                  style={{ fontSize: 18 }}
                >
                  close
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Actions for password view */}
        {showingPassword && (
          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="text"
              onClick={handleClose}
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordVerify} loading={isVerifying}>
              Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
