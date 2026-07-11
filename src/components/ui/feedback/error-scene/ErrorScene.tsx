import type { ComponentMeta } from "@/types/component-meta";
import {
  FireScene,
  DEFAULT_MEMBERS,
  NOT_FOUND_STRINGS,
  type FireSceneMember,
  type NotFoundSceneStrings,
} from "./FireScene";

export const meta: ComponentMeta = {
  name: "ErrorScene",
  description:
    "Playful full-page error scene: blame the dev team and pick an AI engineer to \"fire\" (local state only), with optional retry action and error digest footer",
};

export type { FireSceneMember, NotFoundSceneStrings };

/** English defaults — same scene as the 404, but production is on fire. */
const ERROR_STRINGS: NotFoundSceneStrings = {
  ...NOT_FOUND_STRINGS,
  title: "Oops! Something Went Wrong!",
  blame: "One of our Development Team just broke production!",
};

export interface ErrorSceneProps {
  /** Partial overrides merged over the English defaults. */
  strings?: Partial<NotFoundSceneStrings>;
  /** Destination of the home link. Defaults to "/". */
  homeHref?: string;
  /** The team roster. Defaults to the built-in AI roster. */
  members?: FireSceneMember[];
  className?: string;
  /** Renders a filled retry button; the home link demotes to a text button. */
  onRetry?: () => void;
  /** Retry button label. Defaults to "Try Again". */
  retryLabel?: string;
  /** Opaque error id (e.g. a Next.js error digest), shown in a muted mono footer. */
  digest?: string;
  /** Formats the digest footer line. Defaults to `Error ID: ${digest}`. */
  digestLabel?: (digest: string) => string;
  /** Big status code. Defaults to "500". */
  code?: string;
}

export function ErrorScene({
  strings,
  homeHref = "/",
  members = DEFAULT_MEMBERS,
  className,
  onRetry,
  retryLabel = "Try Again",
  digest,
  digestLabel = (d) => `Error ID: ${d}`,
  code = "500",
}: ErrorSceneProps) {
  return (
    <FireScene
      code={code}
      strings={{ ...ERROR_STRINGS, ...strings }}
      homeHref={homeHref}
      members={members}
      className={className}
      onRetry={onRetry}
      retryLabel={retryLabel}
      footer={
        digest !== undefined && (
          <p className="mt-6 font-mono text-sm text-on-surface-variant">
            {digestLabel(digest)}
          </p>
        )
      }
    />
  );
}
