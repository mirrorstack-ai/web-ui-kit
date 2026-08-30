import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { Button, type ButtonProps } from "@/components/ui/actions/button/Button";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

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
  /** Element inside the dialog that should receive focus when it opens. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Hide the built-in X close button in the top-right corner. The X is
   *  rendered by default whenever `onClose` is provided. */
  hideCloseButton?: boolean;
}

interface DialogEnvironment {
  ownerDocument: Document;
  portalTarget: Element;
}

interface ScrollLockState {
  body: HTMLElement;
  count: number;
  overflow: string;
  paddingRight: string;
}

interface DialogStackEntry {
  dialog: HTMLElement;
  close: () => void;
}

interface DialogStackState {
  entries: DialogStackEntry[];
  handleKeyDown: (event: KeyboardEvent) => void;
}

const scrollLocks = new WeakMap<Document, ScrollLockState>();
const dialogStacks = new WeakMap<Document, DialogStackState>();

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

// Reserve the scrollbar gutter as right-padding while scroll is
// locked, otherwise the page reflows by the gutter width (≈15px on
// macOS Safari/Chrome) the moment overflow flips to hidden and the
// scrollbar disappears. Pages that already opt into
// `scrollbar-gutter: stable` at the html level will see gutter === 0
// and skip the padding adjustment.
function lockScroll(ownerDocument: Document) {
  const activeLock = scrollLocks.get(ownerDocument);
  if (activeLock) {
    activeLock.count += 1;
    return;
  }

  const body = ownerDocument.body;
  if (!body) return;

  const view = ownerDocument.defaultView;
  const gutter = view
    ? view.innerWidth - ownerDocument.documentElement.clientWidth
    : 0;
  scrollLocks.set(ownerDocument, {
    body,
    count: 1,
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
  });
  body.style.overflow = "hidden";
  if (gutter > 0) body.style.paddingRight = `${gutter}px`;
}

function unlockScroll(ownerDocument: Document) {
  const activeLock = scrollLocks.get(ownerDocument);
  if (!activeLock) return;

  activeLock.count -= 1;
  if (activeLock.count > 0) return;

  activeLock.body.style.overflow = activeLock.overflow;
  activeLock.body.style.paddingRight = activeLock.paddingRight;
  scrollLocks.delete(ownerDocument);
}

function canRestoreFocus(
  element: Element | null,
  ownerDocument: Document,
): element is HTMLElement {
  return (
    element?.ownerDocument === ownerDocument &&
    element.isConnected &&
    typeof (element as HTMLElement).focus === "function"
  );
}

function focusWithinDialog(
  entry: DialogStackEntry,
  backwards: boolean,
): void {
  const { dialog } = entry;
  const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (focusable.length === 0) {
    dialog.focus();
    return;
  }

  const target = backwards ? focusable[focusable.length - 1] : focusable[0];
  target.focus();
}

function handleTopmostKeyDown(
  entry: DialogStackEntry,
  ownerDocument: Document,
  event: KeyboardEvent,
): void {
  if (event.key === "Escape") {
    entry.close();
    return;
  }
  if (event.key !== "Tab") return;

  const { dialog } = entry;
  const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  const activeElement = ownerDocument.activeElement;
  if (
    focusable.length === 0
    || activeElement === dialog
    || !dialog.contains(activeElement)
  ) {
    event.preventDefault();
    focusWithinDialog(entry, event.shiftKey);
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function registerDialog(
  ownerDocument: Document,
  entry: DialogStackEntry,
): void {
  let state = dialogStacks.get(ownerDocument);
  if (!state) {
    const entries: DialogStackEntry[] = [];
    const handleKeyDown = (event: KeyboardEvent) => {
      const topmost = entries[entries.length - 1];
      if (topmost) handleTopmostKeyDown(topmost, ownerDocument, event);
    };
    state = { entries, handleKeyDown };
    dialogStacks.set(ownerDocument, state);
    ownerDocument.addEventListener("keydown", handleKeyDown);
  }
  state.entries.push(entry);
}

function unregisterDialog(
  ownerDocument: Document,
  entry: DialogStackEntry,
): {
  wasTopmost: boolean;
  nextTopmost: DialogStackEntry | undefined;
} {
  const state = dialogStacks.get(ownerDocument);
  if (!state) return { wasTopmost: false, nextTopmost: undefined };

  const index = state.entries.indexOf(entry);
  if (index < 0) return { wasTopmost: false, nextTopmost: undefined };
  const wasTopmost = index === state.entries.length - 1;
  state.entries.splice(index, 1);
  const nextTopmost = state.entries[state.entries.length - 1];
  if (state.entries.length === 0) {
    ownerDocument.removeEventListener("keydown", state.handleKeyDown);
    dialogStacks.delete(ownerDocument);
  }
  return { wasTopmost, nextTopmost };
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  className,
  initialFocusRef,
  hideCloseButton = false,
}: DialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const renderSiteRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const [environment, setEnvironment] = useState<DialogEnvironment | null>(null);
  const onCloseRef = useRef(onClose);
  const requestedInitialFocusRef = useRef(initialFocusRef);

  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    requestedInitialFocusRef.current = initialFocusRef;
  }, [initialFocusRef]);

  useLayoutEffect(() => {
    if (!open) {
      if (environment) setEnvironment(null);
      return;
    }
    if (environment) return;

    const renderSite = renderSiteRef.current;
    if (!renderSite) return;

    const ownerDocument = renderSite.ownerDocument;
    const trigger = ownerDocument.activeElement;
    triggerRef.current = trigger;
    const portalTarget =
      renderSite.closest("[data-ms-mount]") ??
      ownerDocument.body ??
      ownerDocument.documentElement;
    setEnvironment({ ownerDocument, portalTarget });
  }, [environment, open]);

  useLayoutEffect(() => {
    if (!open || !environment) return;

    const dialog = dialogRef.current;
    if (!dialog || dialog.ownerDocument !== environment.ownerDocument) return;

    const { ownerDocument } = environment;
    const trigger = triggerRef.current;
    const entry: DialogStackEntry = {
      dialog,
      close: () => onCloseRef.current?.(),
    };
    lockScroll(ownerDocument);
    registerDialog(ownerDocument, entry);
    const initialFocus = requestedInitialFocusRef.current?.current;
    if (
      initialFocus?.ownerDocument === ownerDocument
      && dialog.contains(initialFocus)
    ) {
      initialFocus.focus();
    } else {
      dialog.focus();
    }

    return () => {
      const { wasTopmost, nextTopmost } = unregisterDialog(
        ownerDocument,
        entry,
      );
      unlockScroll(ownerDocument);
      if (wasTopmost) {
        if (nextTopmost) {
          if (
            canRestoreFocus(trigger, ownerDocument)
            && nextTopmost.dialog.contains(trigger)
          ) {
            trigger.focus();
          } else if (canRestoreFocus(nextTopmost.dialog, ownerDocument)) {
            nextTopmost.dialog.focus();
          }
        } else if (canRestoreFocus(trigger, ownerDocument)) {
          trigger.focus();
        }
      }
    };
  }, [environment, open]);

  if (!open) return null;
  // No document during SSR; the dialog is client-only by nature (focus trap,
  // scroll lock, Escape handling all need a live DOM).
  if (typeof document === "undefined") return null;

  // The first client commit leaves only a hidden render-site marker. Its ref
  // gives us the correct Document even when React is mounted in an iframe or
  // another same-origin document. useLayoutEffect resolves the portal before
  // paint, so the marker never becomes part of visible layout.
  if (!environment) {
    return <span ref={renderSiteRef} hidden aria-hidden="true" />;
  }

  // Portalling outside the caller's layout is load-bearing rather than
  // tidiness. A module mount remains the portal boundary when one exists so
  // its scoped Tailwind rules still apply; ordinary hosts fall back to the
  // owning document's body.
  //
  // Rendered inline, these two `fixed` divs are still LAYOUT CHILDREN of
  // whatever container happened to render the dialog. Under Tailwind v4,
  // `space-y-*` compiles to `:where(& > :not(:last-child)) { margin-block-end }`
  // — margin on every child EXCEPT the last. So opening a dialog inside a
  // `space-y-6` container appends two children, the element that used to be
  // last stops being last, and it silently GAINS 1.5rem of bottom margin. The
  // container grows and the page shifts, with nothing in the dialog's own
  // styles to blame.
  //
  // The `!m-0` these divs used to carry could not fix that: it zeroed THEIR
  // margin while v4 puts the margin on the sibling instead. It was written
  // against v3's `~`-combinator form, which put margin-top on later siblings,
  // and it has looked like it was working ever since.
  //
  // Portalling makes the whole class of bug structurally impossible for every
  // consumer: a modal is not part of any parent's flow, so no parent's spacing
  // selectors can see it.
  return createPortal(
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[60] bg-black/50"
        onClick={() => onClose?.()}
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          className={cn(
            "relative pointer-events-auto max-w-sm w-full mx-4 outline-none",
            className,
          )}
        >
          {onClose && !hideCloseButton && (
            <IconButton
              icon="close"
              variant="filled"
              size="sm"
              className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10 shadow-md"
              aria-label="Close"
              onClick={onClose}
            />
          )}
          <div
            className="bg-surface rounded-2xl border border-outline-variant p-6 shadow-xl outline-none max-h-[90vh] overflow-y-auto"
          >
            {title && (
              <h3
                id={titleId}
                className="text-lg font-semibold text-on-surface mb-3 pr-8"
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
      </div>
    </>,
    environment.portalTarget,
  );
}
