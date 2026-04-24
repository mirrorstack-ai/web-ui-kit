import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { logoDataUrl } from "./logo-data";

export const meta: ComponentMeta = {
  name: "Logo",
  description: "MirrorStack logo rendered as a CSS-masked div colored by the primary theme token",
};

export interface LogoProps {
  className?: string;
}

const maskStyle: React.CSSProperties = {
  maskImage: `url(${logoDataUrl})`,
  WebkitMaskImage: `url(${logoDataUrl})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn("w-full h-full bg-primary", className)}
      style={maskStyle}
      role="img"
      aria-label="MirrorStack Logo"
    />
  );
}
