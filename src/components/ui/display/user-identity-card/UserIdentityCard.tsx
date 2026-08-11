import type { ReactNode } from "react";

import { Avatar } from "@/components/ui/media/avatar/Avatar";
import { Popover } from "@/components/ui/surfaces/popover/Popover";
import type { ComponentMeta } from "@/types/component-meta";
import { cn } from "@/utils/cn";

export const meta: ComponentMeta = {
  name: "UserIdentityCard",
  description:
    "Hover/focus identity card with a component-owned profile link for both its trigger and display name, always showing the user's avatar, display name, and email. This identity card always renders the user's email, so it belongs on operator-facing surfaces and placing it where an end user can see another user's contact details is a deliberate choice.",
};

export interface UserIdentityCardProps {
  /** Destination for the trigger link and for the name inside the card. */
  href: string;
  /** Trigger link content. Defaults to the display name. */
  children?: ReactNode;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  /** Already-localized text shown when the user's name is unavailable. */
  missingNameLabel: string;
  /** Already-localized text shown when the user's email is unavailable. */
  missingEmailLabel: string;
  /** Applied to the trigger link. */
  triggerClassName?: string;
  /** Applied to the identity card surface. */
  className?: string;
}

/** This identity card always renders the user's email, so it belongs on operator-facing surfaces and placing it where an end user can see another user's contact details is a deliberate choice. */
export function UserIdentityCard({
  href,
  children,
  name,
  email,
  avatarUrl,
  missingNameLabel,
  missingEmailLabel,
  triggerClassName,
  className,
}: UserIdentityCardProps) {
  const displayName = name?.trim() || missingNameLabel;
  const displayEmail = email?.trim() || missingEmailLabel;

  return (
    <Popover
      trigger={
        <a
          href={href}
          className={cn(
            "font-medium text-primary underline underline-offset-2",
            triggerClassName,
          )}
        >
          {children ?? displayName}
        </a>
      }
      className={cn(
        "w-72 rounded-xl border border-outline-variant bg-surface-container-low p-3 shadow-lg",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar src={avatarUrl} fallback={displayName} size="lg" />
        {/* space-y-1: the name and email are two distinct facts, and stacking
            them flush reads as one wrapped line. A consumer cannot fix this
            from the outside — it needs a descendant selector, and arbitrary
            variants do not compile into the modules' scoped CSS bundles. */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <a
            href={href}
            className="block truncate text-sm font-semibold text-on-surface"
          >
            {displayName}
          </a>
          <p className="truncate text-xs text-on-surface-variant">
            {displayEmail}
          </p>
        </div>
      </div>
    </Popover>
  );
}
