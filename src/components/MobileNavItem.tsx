"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface MobileNavItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: string;
  label: string;
  active?: boolean;
}

export function MobileNavItem({
  icon,
  label,
  active = false,
  className,
  ...props
}: MobileNavItemProps) {
  return (
    <button
      className={cn(
        "flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[64px] transition-colors cursor-pointer",
        active
          ? "text-primary"
          : "text-on-surface-variant hover:text-on-surface",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "material-symbols-rounded text-[24px]",
          active && "fill-1",
        )}
      >
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
