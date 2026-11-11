import { useEffect, useId, useState } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Dialog } from "@/components/ui/surfaces/dialog/Dialog";
import { FloatingLabelInput } from "@/components/ui/inputs/floating-label-input/FloatingLabelInput";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

export const meta: ComponentMeta = {
  name: "SettingsTransfer",
  description:
    "Copy/paste pair for moving one settings page's configuration between applications. A copy IconButton that flashes a check, and a paste IconButton that opens a dialog. Import loads the caller's DRAFT — it never saves. The caller owns the envelope shape and the `parse` that validates it; this component owns only the interaction.",
};

/**
 * Why a pasted settings envelope was refused.
 *
 * Three outcomes, not one, because they send an operator to three different
 * places: fix the text, paste it into the other module's page, or find a newer
 * console.
 */
export type SettingsTransferError = "malformed" | "wrongModule" | "unsupported";

/**
 * Every string this component renders.
 *
 * The kit ships English defaults and holds no message catalog — an app that has
 * one passes its own. Optional per key so a caller can translate the dialog
 * without restating the parts it is happy with, and so adding a key here never
 * breaks a call site.
 *
 * 🔴 STRINGS, NOT KEYS. Each consumer resolves its own `t("…")` at the call
 * site, which is also the only place an i18n usage guard can see it: a key
 * reachable only as a shared component's internal literal reads to such a guard
 * as an orphan, and an orphan is what an untranslated string looks like just
 * before it ships. It is also why five modules with two different key
 * conventions can share this component without first agreeing on one.
 */
export interface SettingsTransferLabels {
  /** Accessible name of the copy control. */
  export?: string;
  /** Accessible name of the paste control, and the dialog title. */
  import?: string;
  /** Dialog buttons. */
  cancel?: string;
  load?: string;
  /** Sentence above the paste box. */
  help?: string;
  /** Floating label on the paste box itself. */
  inputLabel?: string;
  /** The three refusals. */
  malformed?: string;
  wrongModule?: string;
  unsupported?: string;
}

/** English defaults, resolved once per render so the JSX below reads as text. */
const DEFAULT_LABELS: Required<SettingsTransferLabels> = {
  export: "Copy settings",
  import: "Paste settings",
  cancel: "Cancel",
  load: "Load",
  help: "Paste a settings export below. It loads into the form — nothing is saved until you save.",
  inputLabel: "Settings JSON",
  malformed: "That text is not a valid settings export.",
  wrongModule: "That export belongs to a different module.",
  unsupported: "That export was made by a newer version of this module.",
};

export interface SettingsTransferProps<TExport, TImport> {
  /**
   * The envelope to copy. Null while the settings are still loading, which is
   * also what disables both controls.
   *
   * 🔴 Separate from TImport on purpose. What goes on the clipboard is the
   * WRAPPED form — module name and version included — and what comes back out
   * of `parse` is the bare settings the form takes. Tying them to one type
   * would force the caller to unwrap before exporting, and the wrapper is the
   * only thing that makes a paste into the wrong module's page nameable.
   */
  value: TExport | null;
  /**
   * Validate a pasted envelope and return the settings, or an error.
   *
   * Owned by the caller because only it knows its own shape, and because this
   * MUST be validation rather than a cast: the text came from a clipboard and
   * is about to become an application's configuration.
   */
  parse: (raw: string) => { ok: true; value: TImport } | { ok: false; error: SettingsTransferError };
  /** Receives the validated settings. See the note on the component: DRAFT. */
  onImport: (value: TImport) => void;
  labels?: SettingsTransferLabels;
  /** Optional class on the row holding the two controls. */
  className?: string;
}

/**
 * Copy a settings page's configuration out as JSON, and paste one back in.
 *
 * The pair exists so a configuration can be moved between applications —
 * staging to production, or one tenant to the next — without an operator
 * re-entering every field and getting one of them subtly wrong. Clipboard
 * rather than a file download: the console runs in a sandbox where a
 * page-initiated download is inert, and a paste box is also the only form that
 * works when the two apps are open in two tabs.
 *
 * 🔴 IMPORT LOADS THE DRAFT; IT DOES NOT SAVE. Pasting is one keystroke and a
 * settings page is a live application's behaviour, so the paste lands where
 * every other edit on that page lands — in the draft, behind the save bar, next
 * to a Reset that throws it away. The operator sees what they are about to
 * apply before it applies. An "import" that wrote straight through would be the
 * only control here with no undo.
 */
export function SettingsTransfer<TExport, TImport>({
  value,
  parse,
  onImport,
  labels,
  className,
}: SettingsTransferProps<TExport, TImport>) {
  const copy_ = { ...DEFAULT_LABELS, ...labels };
  // FloatingLabelInput associates its <label> through htmlFor/id, so WITHOUT
  // an id the paste box has no accessible name at all — which is how every
  // module-local copy of this component shipped.
  const inputId = useId();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<SettingsTransferError | null>(null);

  // Return the copy button to its normal icon on its own. Cleared on unmount so
  // a surface torn down mid-flash does not set state on a dead component.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  // Reset on the CLOSE transition rather than inside the close handler: the
  // dialog also closes on a successful import, and a stale paste left behind
  // would be the next thing the operator sees when they reopen it.
  useEffect(() => {
    if (!open) {
      setText("");
      setError(null);
    }
  }, [open]);

  const enabled = value !== null;

  /** Put the current value on the clipboard, flashing the control on success. */
  const copyToClipboard = () => {
    if (value === null) return;
    // The clipboard API rejects on a denied permission and is absent outside a
    // secure context. Either way the operator gets no confirmation flash rather
    // than an exception through the render tree.
    void navigator.clipboard
      ?.writeText(JSON.stringify(value, null, 2))
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  /** Validate the pasted text and hand it up, or name the refusal. */
  const confirmImport = () => {
    const result = parse(text);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onImport(result.value);
    setOpen(false);
  };

  return (
    <>
      <div className={cn("flex items-center justify-end gap-1", className)}>
        <IconButton
          icon={copied ? "check" : "content_copy"}
          variant="text"
          size="sm"
          type="button"
          color={copied ? "primary" : "secondary"}
          disabled={!enabled}
          onClick={copyToClipboard}
          aria-label={copy_.export}
        />
        <IconButton
          icon="content_paste"
          variant="text"
          size="sm"
          type="button"
          color="secondary"
          disabled={!enabled}
          onClick={() => setOpen(true)}
          aria-label={copy_.import}
        />
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={copy_.import}
        actions={[
          { label: copy_.cancel, variant: "text", onClick: () => setOpen(false) },
          {
            label: copy_.load,
            // Nothing pasted is not an error to report, it is a button that
            // should not be armed.
            disabled: text.trim() === "",
            onClick: confirmImport,
          },
        ]}
      >
        <div className="space-y-3">
          <p className="text-sm text-on-surface-variant">{copy_.help}</p>
          <FloatingLabelInput
            id={inputId}
            multiline
            rows={8}
            label={copy_.inputLabel}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              // Clear on edit: an error about the PREVIOUS paste, sitting under
              // text the operator has since replaced, reads as a verdict on
              // what they are looking at now.
              setError(null);
            }}
          />
          {error !== null && (
            <p className="text-sm text-error" role="alert">
              {copy_[error]}
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
}
