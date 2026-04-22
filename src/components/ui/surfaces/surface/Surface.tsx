import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Surface",
  description:
    "Container with rounded corners, low-elevation background, and outline border",
};

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Surface({ children, className, ...props }: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-container-low border border-outline-variant",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
