import { cn } from "../utils/cn";

export interface IconProps {
  /** Material Symbols Rounded icon name. See https://fonts.google.com/icons */
  name: string;
  /** Icon size in pixels (default: 24) */
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <span
      className={cn("material-symbols-rounded select-none", className)}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}
