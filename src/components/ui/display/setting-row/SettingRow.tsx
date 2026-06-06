import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { toneBorderClass, type Tone } from "@/types/tone";

export const meta: ComponentMeta = {
  name: "SettingRow",
  description:
    "Title + optional description on the left, control slot on the right. Used to compose settings forms; supports an optional Tone border accent (primary, secondary, tertiary, error, warning, or success) and a muted surface variant for lighter, lower-emphasis rows.",
};

export interface SettingRowProps {
  /** Primary heading for the row. */
  title: string;
  /** Optional supporting copy, rendered below the title. */
  description?: string;
  /** Right-aligned control — typically a Switch, Button, or status pill. */
  control: ReactNode;
  /**
   * When set, applies a colored border accent matching the tone. Default
   * (omitted) renders with the neutral outline-variant border.
   */
  tone?: Tone;
  /**
   * Surface emphasis. "default" uses bg-surface-container with a solid
   * outline-variant border; "muted" uses the lower bg-surface-container-low
   * with a faint (/40) border for lighter, lower-emphasis rows. A `tone`
   * border accent still takes precedence over the muted neutral border.
   */
  surface?: "default" | "muted";
  className?: string;
}

export function SettingRow({
  title,
  description,
  control,
  tone,
  surface = "default",
  className,
}: SettingRowProps) {
  const muted = surface === "muted";
  const bg = muted ? "bg-surface-container-low" : "bg-surface-container";
  const border = tone
    ? toneBorderClass[tone]
    : muted
      ? "border-outline-variant/40"
      : "border-outline-variant";
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl border",
        bg,
        border,
        className,
      )}
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="text-sm font-medium text-on-surface">{title}</p>
        {description && (
          <p className="text-xs text-on-surface-variant">{description}</p>
        )}
      </div>
      <div className="shrink-0 flex items-center">{control}</div>
    </div>
  );
}
