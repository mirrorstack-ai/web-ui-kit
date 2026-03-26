import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

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
