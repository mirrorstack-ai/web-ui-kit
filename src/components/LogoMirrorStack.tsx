"use client";

import { cn } from "../utils/cn";
import logoSvg from "../assets/logo.svg";

// Vite returns a string URL, Next.js returns { src, width, height }
const logoUrl =
  typeof logoSvg === "string"
    ? logoSvg
    : (logoSvg as unknown as { src: string }).src;

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn("w-full h-full bg-primary", className)}
      style={{
        maskImage: `url(${logoUrl})`,
        WebkitMaskImage: `url(${logoUrl})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      role="img"
      aria-label="MirrorStack Logo"
    />
  );
}
