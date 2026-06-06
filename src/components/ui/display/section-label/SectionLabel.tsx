import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SectionLabel",
  description:
    "Small uppercase label for titling sections within a page or card",
};

export interface SectionLabelProps
  extends HTMLAttributes<HTMLParagraphElement> {
  readonly children: ReactNode;
}

export function SectionLabel({
  children,
  className,
  ...props
}: SectionLabelProps) {
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
