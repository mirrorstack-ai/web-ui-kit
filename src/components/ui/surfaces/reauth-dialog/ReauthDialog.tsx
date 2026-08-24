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

/**
 * Every string this dialog renders that is NOT already a prop.
 *
 * The kit ships English defaults and holds no message catalog — an app that
 * has one passes its own. Optional per key so a caller can translate the
 * dialog without restating the parts it is happy with, and so adding a key
 * here never breaks a call site.
 *
 * `title` and `description` stay top-level props: they are the two strings a
 * caller overrides for CONTEXT ("verify before deleting this app"), not for
 * language, and they predate this object.
 */
export interface ReauthDialogLabels {
  /** Above the passkey button. */
  passkeyPrompt?: string;
  passkeyCta?: string;
  /** Switch links between the two methods. */
  useEmailInstead?: string;
  usePasskeyInstead?: string;
  /** Above the send-code button. */
  emailPrompt?: string;
  emailSendCta?: string;
  /** Above the 6-digit input, once a code is out. */
  codePrompt?: string;
  verifying?: string;
  resendCta?: string;
  sending?: string;
  /** The passkey-setup nudge: a link, then the rest of the sentence. Split in
   *  two because the link sits INSIDE the sentence and the kit has no rich-text
   *  formatter; a locale that needs the other order can put the whole clause in
   *  `passkeySetupHint` and a bare verb in the CTA. */
  passkeySetupCta?: string;
  passkeySetupHint?: string;
  /** Failure copy. These surface a thrown error's own message when it has one,
   *  so they are the fallback, not the whole story. */
  sendFailed?: string;
  invalidCode?: string;
  passkeyFailed?: string;
  emailNotConfigured?: string;
  passkeyNotConfigured?: string;
}

/** English defaults, resolved once per render so the JSX below reads as text
 *  rather than as a wall of `??`. */
const DEFAULT_LABELS: Required<ReauthDialogLabels> = {
  passkeyPrompt: "Use your passkey to verify",
  passkeyCta: "Verify with passkey",
  useEmailInstead: "Use email verification instead",
  usePasskeyInstead: "Use passkey instead",
  emailPrompt: "We'll send a 6-digit verification code to your email",
  emailSendCta: "Send verification code",
  codePrompt: "Enter the 6-digit code sent to your email",
  verifying: "Verifying...",
  resendCta: "Resend code",
  sending: "Sending...",
  passkeySetupCta: "Set up a passkey",
  passkeySetupHint: " for faster verification next time",
  sendFailed: "Failed to send code",
  invalidCode: "Invalid code",
  passkeyFailed: "Passkey verification failed",
  emailNotConfigured: "Email verification not configured",
  passkeyNotConfigured: "Passkey verification not configured",
};

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
  /** Translations for everything below the title. Omitted keys fall back to
   *  English — see {@link ReauthDialogLabels}. */
  labels?: ReauthDialogLabels;
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
  labels,
  className,
}: ReauthDialogProps) {
  const l = { ...DEFAULT_LABELS, ...labels };
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
        throw new Error(l.emailNotConfigured);
      const id = await onEmailSendCode();
      setChallengeId(id);
    } catch (err) {
      setError(errorMessage(err, l.sendFailed));
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
        throw new Error(l.emailNotConfigured);
      const token = await onEmailVerifyCode(challengeId, verifyCode);
      reset();
      onSuccess(token);
    } catch (err) {
      setError(errorMessage(err, l.invalidCode));
      setCode("");
      setIsVerifying(false);
    }
  };

  const handlePasskeyVerify = async () => {
    setError(null);
    setIsVerifying(true);
    try {
      if (!onPasskeyVerify)
        throw new Error(l.passkeyNotConfigured);
      const token = await onPasskeyVerify();
      reset();
      onSuccess(token);
    } catch (err) {
      // NotAllowedError = user cancelled the passkey prompt
      if (!(err instanceof DOMException && err.name === "NotAllowedError")) {
        setError(errorMessage(err, l.passkeyFailed));
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
      title={title}
    >
      {error && (
        <Alert variant="error" onDismiss={() => setError(null)} className="mb-4">
          {error}
        </Alert>
      )}

      <p className="text-sm text-on-surface-variant mb-4">{description}</p>

      {!showingEmail && (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="passkey" size={32} className="text-primary" />
          </div>
          <p className="text-sm text-on-surface-variant text-center">
            {l.passkeyPrompt}
          </p>
          <Button
            onClick={handlePasskeyVerify}
            loading={isVerifying}
            fullWidth
          >
            {l.passkeyCta}
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
              {l.useEmailInstead}
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
            {l.emailPrompt}
          </p>
          <Button
            onClick={handleSendCode}
            loading={isSending}
            fullWidth
          >
            {l.emailSendCta}
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
              {l.usePasskeyInstead}
            </button>
          )}
        </div>
      )}

      {showingEmail && codeSent && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-on-surface-variant text-center mb-1">
            {l.codePrompt}
          </p>
          <VerificationCodeInput
            value={code}
            onChange={setCode}
            onComplete={handleEmailVerify}
            disabled={isVerifying}
            error={!!error}
          />
          {isVerifying && (
            <p className="text-xs text-on-surface-variant">{l.verifying}</p>
          )}
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isSending || isVerifying}
            className={cn(linkCls, "text-xs")}
          >
            {isSending ? l.sending : l.resendCta}
          </button>
          {hasPasskey && (
            <button
              type="button"
              onClick={() => reset()}
              disabled={isVerifying}
              className={cn(linkCls, "text-xs")}
            >
              {l.usePasskeyInstead}
            </button>
          )}
        </div>
      )}

      {showingEmail && showPasskeySetup && (
        <Alert variant="success" icon="passkey" iconSize={28} className="mt-4">
          <button
            type="button"
            onClick={onPasskeySetup}
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {l.passkeySetupCta}
          </button>
          {l.passkeySetupHint}
        </Alert>
      )}

    </Dialog>
  );
}
