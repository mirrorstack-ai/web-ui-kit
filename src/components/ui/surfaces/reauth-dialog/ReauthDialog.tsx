import { useState, useCallback, useEffect } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Dialog } from "@/components/ui/surfaces/dialog/Dialog";
import { Button } from "@/components/ui/actions/button/Button";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Alert } from "@/components/ui/feedback/alert/Alert";
import { VerificationCodeInput } from "@/components/ui/inputs/verification-code-input/VerificationCodeInput";

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

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
  /** Optional. When provided and the user has no passkey, surfaces a setup recommendation in the email flow. */
  onPasskeySetup?: () => void;
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
  onPasskeySetup,
  className,
}: ReauthDialogProps) {
  const hasPasskey = methods.includes("passkey");
  const hasEmail = methods.includes("email");
  const showPasskeySetup = !hasPasskey && !!onPasskeySetup;

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
      setError(errorMessage(err, "Failed to send code"));
    } finally {
      setIsSending(false);
    }
  };

  const handleEmailVerify = async (verifyCode: string) => {
    if (!challengeId) return;
    setError(null);
    setIsVerifying(true);
    try {
      if (!onEmailVerifyCode)
        throw new Error("Email verification not configured");
      const token = await onEmailVerifyCode(challengeId, verifyCode);
      reset();
      onSuccess(token);
    } catch (err) {
      setError(errorMessage(err, "Invalid code"));
      setCode("");
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
      // NotAllowedError = user cancelled the passkey prompt
      if (!(err instanceof DOMException && err.name === "NotAllowedError")) {
        setError(errorMessage(err, "Passkey verification failed"));
      }
      setIsVerifying(false);
    }
  };

  const linkCls = "text-sm text-primary hover:underline disabled:opacity-50";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={className}
      actions={undefined}
    >
      {error && (
        <Alert variant="error" onDismiss={() => setError(null)} className="mb-4">
          {error}
        </Alert>
      )}

      <h3 className="text-lg font-semibold text-on-surface mb-2">{title}</h3>
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
              className={linkCls}
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
              className={linkCls}
            >
              Use passkey instead
            </button>
          )}
        </div>
      )}

      {showingEmail && codeSent && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-on-surface-variant text-center mb-1">
            Enter the 6-digit code sent to your email
          </p>
          <VerificationCodeInput
            value={code}
            onChange={setCode}
            onComplete={handleEmailVerify}
            disabled={isVerifying}
            error={!!error}
          />
          {isVerifying && (
            <p className="text-xs text-on-surface-variant">Verifying...</p>
          )}
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isSending || isVerifying}
            className={cn(linkCls, "text-xs")}
          >
            {isSending ? "Sending..." : "Resend code"}
          </button>
          {hasPasskey && (
            <button
              type="button"
              onClick={() => reset()}
              disabled={isVerifying}
              className={cn(linkCls, "text-xs")}
            >
              Use passkey instead
            </button>
          )}
        </div>
      )}

      {showingEmail && showPasskeySetup && (
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-on-surface-variant">
          <Icon
            name="passkey"
            size={16}
            className="text-on-surface-variant shrink-0 self-center"
          />
          <span>
            <button
              type="button"
              onClick={onPasskeySetup}
              className={cn(
                "text-primary underline underline-offset-2",
                "hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              )}
            >
              Set up a passkey
            </button>
            {" for faster verification next time"}
          </span>
        </div>
      )}

    </Dialog>
  );
}
