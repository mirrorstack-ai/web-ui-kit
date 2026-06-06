import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Icon",
  description:
    "Renders a Material Symbols Rounded icon by name at a configurable pixel size.",
};

export interface IconProps {
  /** Material Symbols Rounded icon name (e.g. "edit", "delete", "settings") */
  name: string;
  /**
   * Icon size. A number is treated as pixels; a string is used as a raw CSS
   * font-size (e.g. "1em" to match the surrounding text exactly).
   */
  size?: number | string;
  className?: string;
  /** Accessible label. If omitted, icon is decorative (aria-hidden). */
  "aria-label"?: string;
}

export function Icon({
  name,
  size = 24,
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <span
      className={cn("material-symbols-rounded select-none shrink-0", className)}
      style={{ fontSize: size }}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}
