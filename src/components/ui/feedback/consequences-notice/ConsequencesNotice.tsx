import type { ReactNode } from "react";

import { Alert, type AlertVariant } from "@/components/ui/feedback/alert/Alert";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "ConsequencesNotice",
  description:
    "Bulleted Alert used inside destructive confirm dialogs and danger-zone surfaces. Wraps Alert with hideIcon so the surrounding container's title carries the severity.",
};

export interface ConsequencesNoticeProps {
  /**
   * Visual tone. Defaults to "error" since the component's primary use is
   * destructive confirms; pass "warning" for reversible-but-noteworthy
   * actions (rotating a key, toggling beta).
   */
  variant?: AlertVariant;
  /** Heading. Default "Before you continue". */
  title?: string;
  /** One bullet per item. ReactNode so callers can mix in <strong>, links, etc. */
  items: ReactNode[];
  className?: string;
}

export function ConsequencesNotice({
  variant = "error",
  title = "Before you continue",
  items,
  className,
}: ConsequencesNoticeProps) {
  return (
    <Alert variant={variant} hideIcon title={title} className={className}>
      <ul className="list-disc pl-4 space-y-1.5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Alert>
  );
}
