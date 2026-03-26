"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-wider text-on-surface-variant",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
