import type { ReactNode } from "react";

import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { toneBorderClass, type Tone } from "@/types/tone";

export const meta: ComponentMeta = {
  name: "SettingRow",
  description:
    "Optional leading mark, title + optional description, control slot on the right. Used to compose settings forms; supports an optional Tone border accent (primary, secondary, tertiary, error, warning, or success).",
};

export interface SettingRowProps {
  /** Primary heading for the row. */
  title: string;
  /** Optional supporting copy, rendered below the title. */
  description?: string;
  /**
   * Optional mark, icon or badge rendered IN FRONT of the text.
   *
   * For a row whose subject is a thing rather than a setting — the recipient of
   * a pending transfer, the member a permission belongs to — where the mark
   * identifies what the row is about. `title` and `description` are plain
   * strings, so without this slot a caller has no way to put one there and ends
   * up either attaching it to `control` (where it reads as decoration on the
   * action) or rebuilding the row by hand and drifting out of step with this
   * one.
   *
   * Decorative by default: give it `aria-hidden` unless it carries meaning the
   * title does not already say in words.
   */
  leading?: ReactNode;
  /** Right-aligned control — typically a Switch, Button, or status pill. */
  control: ReactNode;
  /**
   * When set, applies a colored border accent matching the tone. Default
   * (omitted) renders with the neutral outline-variant border.
   */
  tone?: Tone;
  className?: string;
}

export function SettingRow({
  title,
  description,
  leading,
  control,
  tone,
  className,
}: SettingRowProps) {
  const border = tone ? toneBorderClass[tone] : "border-outline-variant";
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl border bg-surface-container",
        border,
        className,
      )}
    >
      {/* The row's own `gap-4` spaces this from the text, so the slot adds no
          margin of its own — a mark that carried one would sit differently here
          than the control does on the other end. */}
      {leading && <div className="shrink-0 flex items-center">{leading}</div>}
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
