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
    "Modal dialog prompting re-authentication via passkey or email verification before sensitive actions",
};

export interface ReauthDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (reauthToken: string) => void;
  title?: string;
  description?: string;
  methods?: ("email" | "passkey")[];
  /** Send a 6-digit code to the user's email. Returns a challenge ID. */
  onEmailSendCode?: () => Promise<string>;
  /** Verify the 6-digit code. Receives challengeId + code, returns reauth token. */
  onEmailVerifyCode?: (challengeId: string, code: string) => Promise<string>;
  /** Run WebAuthn ceremony, returns reauth token. */
  onPasskeyVerify?: () => Promise<string>;
  className?: string;
}

export function ReauthDialog({
  open,
  onClose,
  onSuccess,
  title = "Verify your identity",
  description = "For your security, please verify your identity before continuing.",
  methods = ["passkey", "email"],
  onEmailSendCode,
  onEmailVerifyCode,
  onPasskeyVerify,
  className,
}: ReauthDialogProps) {
  const hasPasskey = methods.includes("passkey");
  const hasEmail = methods.includes("email");

  const [code, setCode] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showEmailFallback, setShowEmailFallback] = useState(false);

  const showingEmail = !hasPasskey || showEmailFallback;
  const codeSent = challengeId !== null;

  const reset = useCallback(() => {
    setCode("");
    setChallengeId(null);
    setError(null);
    setIsVerifying(false);
    setIsSending(false);
    setShowEmailFallback(false);
  }, []);

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const handleClose = () => {
    if (isVerifying || isSending) return;
    reset();
    onClose();
  };

  const handleSendCode = async () => {
    setError(null);
    setIsSending(true);
    try {
      if (!onEmailSendCode)
        throw new Error("Email verification not configured");
      const id = await onEmailSendCode();
      setChallengeId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    } finally {
      setIsSending(false);
    }
  };

  const handleEmailVerify = async () => {
    if (!code || code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    if (!challengeId) return;
    setError(null);
    setIsVerifying(true);
    try {
      if (!onEmailVerifyCode)
        throw new Error("Email verification not configured");
      const token = await onEmailVerifyCode(challengeId, code);
      reset();
      onSuccess(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
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
        showingEmail && codeSent
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
                onClick: handleEmailVerify,
                loading: isVerifying,
                disabled: code.length !== 6,
              },
            ]
          : undefined
      }
    >
      <p className="text-sm text-on-surface-variant mb-4">{description}</p>

      {!showingEmail && (
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
          {hasEmail && (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setShowEmailFallback(true);
              }}
              disabled={isVerifying}
              className="text-sm text-primary hover:underline disabled:opacity-50"
            >
              Use email verification instead
            </button>
          )}
        </div>
      )}

      {showingEmail && !codeSent && (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="mail" size={32} className="text-primary" />
          </div>
          <p className="text-sm text-on-surface-variant text-center">
            We'll send a 6-digit verification code to your email
          </p>
          <Button
            onClick={handleSendCode}
            loading={isSending}
            fullWidth
          >
            Send verification code
          </Button>
          {hasPasskey && (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setShowEmailFallback(false);
              }}
              disabled={isSending}
              className="text-sm text-primary hover:underline disabled:opacity-50"
            >
              Use passkey instead
            </button>
          )}
        </div>
      )}

      {showingEmail && codeSent && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-on-surface-variant">
            Enter the 6-digit code sent to your email.
          </p>
          <FloatingLabelInput
            type="text"
            inputMode="numeric"
            id="reauth-code"
            label="Verification code"
            value={code}
            onChange={(e) => {
              const v = (e as React.ChangeEvent<HTMLInputElement>).target.value.replace(/\D/g, "").slice(0, 6);
              setCode(v);
            }}
            disabled={isVerifying}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEmailVerify();
            }}
            maxLength={6}
          />
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isSending || isVerifying}
            className="text-sm text-primary hover:underline disabled:opacity-50 self-start"
          >
            {isSending ? "Sending..." : "Resend code"}
          </button>
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
