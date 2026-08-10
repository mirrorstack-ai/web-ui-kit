import type { ReactNode } from "react";

import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SkeletonRegion",
  description:
    "Accessible wrapper announcing a loading region while hiding its placeholders from assistive technology",
};

export interface SkeletonRegionProps {
  /** Visual skeleton elements to hide from assistive technology. */
  children: ReactNode;
  /** Already-localized text announcing what is loading. */
  label: string;
}

/**
 * Announces a loading region once while hiding its decorative placeholders
 * from assistive technology. The required label is supplied by the host so the
 * kit does not own module locale catalogs or silently fall back to English.
 */
export function SkeletonRegion({ children, label }: SkeletonRegionProps) {
  return (
    <div role="status" aria-busy="true" aria-label={label}>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}
