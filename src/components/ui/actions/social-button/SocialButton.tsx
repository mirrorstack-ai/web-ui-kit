import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { GoogleIcon, DiscordIcon, OpenIdIcon, LineIcon } from "./social-icons";

export const meta: ComponentMeta = {
  name: "SocialButton",
  description:
    "Social-login button with built-in brand icon for Google, Discord, OpenID, or LINE",
};

export type SocialProvider = "google" | "discord" | "openid" | "line";

const providerIcons: Record<SocialProvider, typeof GoogleIcon> = {
  google: GoogleIcon,
  discord: DiscordIcon,
  openid: OpenIdIcon,
  line: LineIcon,
};

export interface SocialIconProps {
  provider: SocialProvider;
  size?: number;
  className?: string;
}

export function SocialIcon({ provider, size = 20, className }: SocialIconProps) {
  const IconComponent = providerIcons[provider];
  if (!IconComponent) return null;
  return <IconComponent width={size} height={size} className={className} />;
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
      {children ?? (provider && <SocialIcon provider={provider} size={20} />)}
    </button>
  );
}
