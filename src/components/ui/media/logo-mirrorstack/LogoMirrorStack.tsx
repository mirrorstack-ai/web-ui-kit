import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import logoSvg from "@/assets/logo.svg";

export const meta: ComponentMeta = {
  name: "Logo",
  description: "MirrorStack logo rendered as a CSS-masked div colored by the primary theme token",
};

// Vite returns a string URL, Next.js returns { src, width, height }
const logoUrl =
  typeof logoSvg === "string"
    ? logoSvg
    : (logoSvg as unknown as { src: string }).src;

export interface LogoProps {
  className?: string;
}

const maskStyle: React.CSSProperties = {
  maskImage: `url(${logoUrl})`,
  WebkitMaskImage: `url(${logoUrl})`,
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
