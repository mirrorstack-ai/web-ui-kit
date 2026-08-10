import type { ReactElement } from "react";

import { Avatar } from "@/components/ui/media/avatar/Avatar";
import {
  Popover,
  type PopoverProps,
} from "@/components/ui/surfaces/popover/Popover";
import type { ComponentMeta } from "@/types/component-meta";
import { cn } from "@/utils/cn";

export const meta: ComponentMeta = {
  name: "UserIdentityCard",
  description:
    "Hover/focus identity card on a caller-owned trigger, always showing the user's avatar, display name, and email. This identity card always renders the user's email, so it belongs on operator-facing surfaces and placing it where an end user can see another user's contact details is a deliberate choice.",
};

export interface UserIdentityCardProps {
  /** The caller-owned trigger, normally a link to the user's full profile. */
  children: ReactElement;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  /** Already-localized text shown when the user's name is unavailable. */
  missingNameLabel: string;
  /** Already-localized text shown when the user's email is unavailable. */
  missingEmailLabel: string;
  /** Applied to the identity card surface. */
  className?: string;
}

/** This identity card always renders the user's email, so it belongs on operator-facing surfaces and placing it where an end user can see another user's contact details is a deliberate choice. */
export function UserIdentityCard({
  children,
  name,
  email,
  avatarUrl,
  missingNameLabel,
  missingEmailLabel,
  className,
}: UserIdentityCardProps) {
  const displayName = name?.trim() || missingNameLabel;
  const displayEmail = email?.trim() || missingEmailLabel;

  return (
    <Popover
      trigger={children as PopoverProps["trigger"]}
      className={cn(
        "w-72 rounded-xl border border-outline-variant bg-surface-container-low p-3 shadow-lg",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar src={avatarUrl} fallback={displayName} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">
            {displayName}
          </p>
          <p className="truncate text-xs text-on-surface-variant">
            {displayEmail}
          </p>
        </div>
      </div>
    </Popover>
  );
}
