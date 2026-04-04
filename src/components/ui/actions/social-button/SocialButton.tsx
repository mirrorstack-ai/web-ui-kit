import { type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { isDev } from "@/utils/env";

export const meta: ComponentMeta = {
  name: "SocialButton",
  description:
    "Social-login button with built-in brand icon for Google, Discord, OpenID, or LINE",
};

export type SocialProvider = "google" | "discord" | "openid" | "line";

export interface SocialIconProps {
  readonly provider: SocialProvider;
  readonly size?: number;
  readonly className?: string;
}

export interface SocialButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly provider: SocialProvider;
  readonly children?: ReactNode;
}

const providerLabels: Record<SocialProvider, string> = {
  google: "Google",
  discord: "Discord",
  openid: "OpenID",
  line: "LINE",
};

const providerColors: Record<SocialProvider, string> = {
  google:
    "bg-white text-[#1f1f1f] border border-[#747775] hover:bg-[#f8f8f8] dark:bg-[#131314] dark:text-[#e3e3e3] dark:border-[#8e918f] dark:hover:bg-[#1f1f1f]",
  discord:
    "bg-[#5865F2] text-white hover:bg-[#4752c4] dark:hover:bg-[#6d79f5]",
  openid:
    "bg-[#f5821f] text-white hover:bg-[#d96f1a] dark:hover:bg-[#f9943f]",
  line: "bg-[#06C755] text-white hover:bg-[#05a847] dark:hover:bg-[#1fd566]",
};

function GoogleIcon({ size = 20, className }: Omit<SocialIconProps, "provider">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function DiscordIcon({ size = 20, className }: Omit<SocialIconProps, "provider">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function OpenIDIcon({ size = 20, className }: Omit<SocialIconProps, "provider">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.54.889l-3.63 1.773v18.17c-4.15-.52-7.27-2.78-7.27-5.5 0-2.58 2.8-4.75 6.63-5.41v-2.31C4.42 8.322 0 11.502 0 15.332c0 3.96 4.74 7.24 10.91 7.78l3.63-1.71V.888m.64 6.724v2.31c1.43.25 2.71.7 3.76 1.31l-1.97 1.11 7.03 1.53-.5-5.21-1.87 1.06c-1.74-1.06-3.96-1.81-6.45-2.11z" />
    </svg>
  );
}

function LineIcon({ size = 20, className }: Omit<SocialIconProps, "provider">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.63.63 0 0 1-.63-.629V8.108a.63.63 0 0 1 .63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016a.63.63 0 0 1-.63.629.626.626 0 0 1-.51-.262l-2.418-3.294v2.927a.63.63 0 0 1-1.26 0V8.108a.63.63 0 0 1 .63-.63c.2 0 .383.096.51.262l2.418 3.294V8.108a.63.63 0 0 1 1.26 0v4.771zm-5.741 0a.63.63 0 0 1-1.26 0V8.108a.63.63 0 0 1 1.26 0v4.771zm-2.527.629H4.856a.63.63 0 0 1-.63-.629V8.108a.63.63 0 0 1 1.26 0v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

const iconComponents: Record<
  SocialProvider,
  (props: Omit<SocialIconProps, "provider">) => ReactElement
> = {
  google: GoogleIcon,
  discord: DiscordIcon,
  openid: OpenIDIcon,
  line: LineIcon,
};

export function SocialIcon({ provider, size = 20, className }: SocialIconProps) {
  const IconComponent = iconComponents[provider];
  return <IconComponent size={size} className={className} />;
}

export function SocialButton({
  provider,
  children,
  className,
  ...props
}: SocialButtonProps) {
  if (isDev) {
    if (
      !children &&
      !props["aria-label"] &&
      !props["aria-labelledby"]
    ) {
      // Will auto-set aria-label below, but warn if explicitly overridden to empty
    }
  }

  const label = `Sign in with ${providerLabels[provider]}`;
  const ariaLabel =
    children != null ? undefined : props["aria-label"] ?? label;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center gap-3 rounded-lg px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]",
        providerColors[provider],
        className,
      )}
      {...props}
    >
      <SocialIcon provider={provider} size={20} />
      {children ?? <span>{label}</span>}
    </button>
  );
}
