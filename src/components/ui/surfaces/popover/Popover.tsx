import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";

import { useClickOutside } from "@/hooks/useClickOutside";
import type { ComponentMeta } from "@/types/component-meta";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";

export const meta: ComponentMeta = {
  name: "Popover",
  description:
    "Non-modal floating content anchored to a caller-provided trigger, with hover, focus, and viewport collision handling",
};

const VIEWPORT_PADDING = 8;
const TRIGGER_GAP = 8;
const CLOSE_DELAY_MS = 150;

type Placement = "top" | "bottom";

interface PopoverTriggerProps {
  ref?: Ref<HTMLElement>;
  "aria-describedby"?: string;
  onBlur?: FocusEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
}

export interface PopoverProps {
  /** The caller-owned interactive element that anchors the floating content. */
  trigger: ReactElement<PopoverTriggerProps>;
  /** Arbitrary content rendered in the floating layer. */
  children: ReactNode;
  /** Applied to the portaled floating content. */
  className?: string;
}

interface PopoverPosition {
  left: number;
  placement: Placement;
  top: number;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

function isInside(
  target: EventTarget | null,
  ...elements: Array<HTMLElement | null>
) {
  return target instanceof Node && elements.some((element) => element?.contains(target));
}

export function Popover({ trigger, children, className }: PopoverProps) {
  const contentId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const ignoreNextFocusRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition | null>(null);
  const hasContent = children != null;

  useEffect(() => {
    if (isDev && !hasContent) {
      console.warn("[Popover] children must contain the floating content.");
    }
  }, [hasContent]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openPopover = useCallback(() => {
    if (!hasContent) return;
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer, hasContent]);

  const closePopover = useCallback(
    (restoreFocus = false) => {
      clearCloseTimer();
      setOpen(false);
      setPosition(null);

      if (restoreFocus && contentRef.current?.contains(document.activeElement)) {
        ignoreNextFocusRef.current = true;
        triggerRef.current?.focus();
      }
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      closePopover();
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer, closePopover]);

  const updatePosition = useCallback(() => {
    const triggerElement = triggerRef.current;
    const contentElement = contentRef.current;
    if (!triggerElement || !contentElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const contentRect = contentElement.getBoundingClientRect();
    const maxLeft = Math.max(
      VIEWPORT_PADDING,
      window.innerWidth - contentRect.width - VIEWPORT_PADDING,
    );
    const centeredLeft =
      triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
    const left = Math.min(Math.max(centeredLeft, VIEWPORT_PADDING), maxLeft);
    const bottomTop = triggerRect.bottom + TRIGGER_GAP;
    const roomBelow = window.innerHeight - VIEWPORT_PADDING - bottomTop;
    const roomAbove = triggerRect.top - TRIGGER_GAP - VIEWPORT_PADDING;
    const placement: Placement =
      contentRect.height > roomBelow && roomAbove > roomBelow ? "top" : "bottom";
    const requestedTop =
      placement === "top"
        ? triggerRect.top - TRIGGER_GAP - contentRect.height
        : bottomTop;
    const maxTop = Math.max(
      VIEWPORT_PADDING,
      window.innerHeight - contentRect.height - VIEWPORT_PADDING,
    );
    const top = Math.min(Math.max(requestedTop, VIEWPORT_PADDING), maxTop);

    // Prefer below, flip above when it has more usable room, then clamp both
    // axes. This keeps the layer on-screen without a dependency and behaves
    // predictably even when neither side can fit the content at full height.
    setPosition({ left, placement, top });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, children, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const update = () => updatePosition();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => updatePosition());
    if (triggerRef.current) resizeObserver?.observe(triggerRef.current);
    if (contentRef.current) resizeObserver?.observe(contentRef.current);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      resizeObserver?.disconnect();
    };
  }, [open, updatePosition]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useClickOutside({
    refs: [triggerRef, contentRef],
    enabled: open,
    closeOnEscape: false,
    onDismiss: () => closePopover(),
  });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closePopover, open]);

  if (!isValidElement(trigger)) return null;

  const originalProps = trigger.props;
  const describedBy = [
    originalProps["aria-describedby"],
    hasContent ? contentId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const triggerElement = cloneElement(trigger, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      assignRef(originalProps.ref, node);
    },
    "aria-describedby": describedBy,
    onBlur: (event) => {
      originalProps.onBlur?.(event);
      if (
        !isInside(event.relatedTarget, triggerRef.current, contentRef.current)
      ) {
        closePopover();
      }
    },
    onClick: (event) => {
      originalProps.onClick?.(event);
      openPopover();
    },
    onFocus: (event) => {
      originalProps.onFocus?.(event);
      if (ignoreNextFocusRef.current) {
        ignoreNextFocusRef.current = false;
        return;
      }
      openPopover();
    },
    onMouseEnter: (event) => {
      originalProps.onMouseEnter?.(event);
      openPopover();
    },
    onMouseLeave: (event) => {
      originalProps.onMouseLeave?.(event);
      scheduleClose();
    },
  });

  const content =
    open && hasContent && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={contentRef}
            id={contentId}
            data-popover-content=""
            data-placement={position?.placement}
            className={cn(
              "fixed z-[70] max-h-[calc(100vh-1rem)] max-w-[calc(100vw-1rem)] overflow-auto",
              className,
            )}
            style={{
              left: position?.left ?? VIEWPORT_PADDING,
              top: position?.top ?? VIEWPORT_PADDING,
              visibility: position ? "visible" : "hidden",
            }}
            onBlur={(event) => {
              if (
                !isInside(
                  event.relatedTarget,
                  triggerRef.current,
                  contentRef.current,
                )
              ) {
                closePopover();
              }
            }}
            onFocus={clearCloseTimer}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            {children}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {triggerElement}
      {content}
    </>
  );
}
