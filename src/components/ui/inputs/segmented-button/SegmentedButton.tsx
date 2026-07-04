import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import { Icon } from "@/components/ui/media/icon/Icon";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SegmentedButton",
  description:
    "Horizontal group of toggle buttons where exactly one option is selected at a time. Renders as gapped pills (default) or a boxed/connected track with an inset selected pill.",
};

/** Visual layout: gapped standalone pills, or a boxed connected track. */
export type SegmentedButtonVariant = "pills" | "boxed";

export type SegmentedButtonOptionTone = "default" | "warning" | "muted";

export interface SegmentedButtonOption<T extends string = string> {
  readonly value: T;
  readonly label: string;
  /** Optional leading Material Symbols icon name. */
  readonly icon?: string;
  /** Visual tone for the unselected state. Defaults to "default". */
  readonly tone?: SegmentedButtonOptionTone;
  /** Small red count badge anchored to the option's top-right corner (e.g. an
   *  open-items count). Omit for no badge. */
  readonly badge?: string | number;
}

export type SegmentedButtonSize = "sm" | "md";

export interface SegmentedButtonProps<T extends string = string> {
  options: readonly SegmentedButtonOption<T>[];
  value: T;
  onChange: (value: T) => void;
  "aria-label"?: string;
  disabled?: boolean;
  className?: string;
  size?: SegmentedButtonSize;
  /**
   * Visual layout. "pills" (default) renders gapped standalone buttons;
   * "boxed" renders a bordered connected track with an inset selected pill.
   * Per-option `tone` is honored only in "pills" mode.
   */
  variant?: SegmentedButtonVariant;
  /** Use inverse-themed tokens (for placement on inverse surfaces such as
   *  the agent sidebar where the surrounding bg is `on-background`). */
  inverse?: boolean;
}

const sizeStyles: Record<SegmentedButtonSize, string> = {
  sm: "px-3 py-1.5 rounded-md text-xs",
  md: "px-4 py-2 rounded-xl text-sm",
};

function buttonStyle(
  selected: boolean,
  tone: SegmentedButtonOptionTone | undefined,
  inverse: boolean,
): string {
  if (selected) {
    return inverse
      ? "bg-inverse-primary text-inverse-surface"
      : "bg-primary text-on-primary";
  }
  if (tone === "warning") {
    return inverse
      ? "bg-warning-container/90 text-on-warning-container hover:bg-warning-container"
      : "bg-warning-container text-on-warning-container hover:bg-warning/20";
  }
  if (tone === "muted") {
    return inverse
      ? "bg-inverse-on-surface/[0.04] text-inverse-on-surface/45 hover:bg-inverse-on-surface/[0.08] hover:text-inverse-on-surface/70"
      : "bg-surface-container/40 text-on-surface-variant/70 hover:bg-surface-container hover:text-on-surface-variant";
  }
  return inverse
    ? "bg-inverse-on-surface/[0.06] text-inverse-on-surface/70 hover:bg-inverse-on-surface/[0.12] hover:text-inverse-on-surface"
    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high";
}

// Boxed variant: segments sit inside a bordered track, so they're tighter
// than pills and the unselected state is transparent (the track supplies
// the background) rather than carrying its own surface fill.
const boxedSizeStyles: Record<SegmentedButtonSize, string> = {
  sm: "px-3 py-1 rounded-md text-xs",
  md: "px-4 py-1.5 rounded-md text-sm",
};

function boxedButtonStyle(selected: boolean, inverse: boolean): string {
  if (selected) {
    return inverse
      ? "bg-inverse-primary text-inverse-surface shadow-sm"
      : "bg-primary text-on-primary shadow-sm";
  }
  return inverse
    ? "text-inverse-on-surface/70 hover:bg-inverse-on-surface/[0.12] hover:text-inverse-on-surface"
    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface";
}

export function SegmentedButton<T extends string = string>({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  disabled = false,
  className,
  size = "md",
  variant = "pills",
  inverse = false,
}: SegmentedButtonProps<T>) {
  if (isDev) {
    if (options.length === 0) {
      console.warn("[SegmentedButton] options array should not be empty");
    }
    if (!ariaLabel) {
      console.warn(
        "[SegmentedButton] aria-label is recommended for accessibility",
      );
    }
  }

  const isBoxed = variant === "boxed";
  const trackClass = isBoxed
    ? cn(
        "inline-flex items-center gap-0.5 rounded-lg border p-0.5",
        inverse
          ? "border-inverse-on-surface/20 bg-inverse-on-surface/[0.06]"
          : "border-outline-variant/50 bg-surface-container",
      )
    : "flex gap-2";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(trackClass, className)}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          disabled={disabled}
          aria-pressed={value === opt.value}
          className={cn(
            "relative font-medium transition-colors inline-flex items-center justify-center gap-1.5",
            isBoxed ? boxedSizeStyles[size] : sizeStyles[size],
            isBoxed
              ? boxedButtonStyle(value === opt.value, inverse)
              : buttonStyle(value === opt.value, opt.tone, inverse),
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer",
          )}
        >
          {opt.icon && <Icon name={opt.icon} size={size === "sm" ? 16 : 18} />}
          {opt.label}
          {opt.badge != null && (
            <span
              aria-hidden="true"
              className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-semibold leading-none text-on-error"
            >
              {opt.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
