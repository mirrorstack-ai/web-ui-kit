import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import googleSvg from "@/assets/social/google.svg";
import discordSvg from "@/assets/social/discord.svg";
import openidSvg from "@/assets/social/openid.svg";
import lineSvg from "@/assets/social/line.svg";

export const meta: ComponentMeta = {
  name: "SocialButton",
  description:
    "Social-login button with built-in brand icon for Google, Discord, OpenID, or LINE",
};

type SvgImport = string | { src: string };

function resolveUrl(svg: SvgImport): string {
  return typeof svg === "string" ? svg : svg.src;
}

const providerAssets: Record<string, SvgImport> = {
  google: googleSvg,
  discord: discordSvg,
  openid: openidSvg,
  line: lineSvg,
};

export type SocialProvider = keyof typeof providerAssets;

export interface SocialIconProps {
  provider: string;
  size?: number;
  className?: string;
}

export function SocialIcon({ provider, size = 20, className }: SocialIconProps) {
  const svg = providerAssets[provider];
  if (!svg) return null;
  return (
    <img
      src={resolveUrl(svg)}
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
}

export interface SocialButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider?: SocialProvider;
  children?: ReactNode;
}

export function SocialButton({
  provider,
  children,
  className,
  ...props
}: SocialButtonProps) {
  return (
    <button
      type="button"
      aria-label={!children && provider ? `Sign in with ${provider}` : undefined}
      className={cn(
        "flex-1 min-h-12 min-w-12 px-4 py-3 gap-2 flex items-center justify-center rounded-lg",
        "border border-outline-variant bg-surface-container-low",
        "hover:bg-surface-container transition-colors cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children ??
        (provider && (
          <img
            src={resolveUrl(providerAssets[provider])}
            alt=""
            style={{ width: 20, height: 20 }}
          />
        ))}
    </button>
  );
}
