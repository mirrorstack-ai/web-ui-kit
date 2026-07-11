import type { ComponentMeta } from "@/types/component-meta";
import {
  FireScene,
  DEFAULT_MEMBERS,
  NOT_FOUND_STRINGS,
  type FireSceneMember,
  type NotFoundSceneStrings,
} from "@/components/ui/feedback/error-scene/FireScene";

export const meta: ComponentMeta = {
  name: "NotFoundScene",
  description:
    "Playful full-page 404 scene: blame the dev team and pick an AI engineer to \"fire\" (local state only), with a return-home action",
};

export type { FireSceneMember, NotFoundSceneStrings };

export interface NotFoundSceneProps {
  /** Partial overrides merged over the English defaults. */
  strings?: Partial<NotFoundSceneStrings>;
  /** Destination of the home link. Defaults to "/". */
  homeHref?: string;
  /** The team roster. Defaults to the built-in AI roster. */
  members?: FireSceneMember[];
  className?: string;
}

export function NotFoundScene({
  strings,
  homeHref = "/",
  members = DEFAULT_MEMBERS,
  className,
}: NotFoundSceneProps) {
  return (
    <FireScene
      code="404"
      strings={{ ...NOT_FOUND_STRINGS, ...strings }}
      homeHref={homeHref}
      members={members}
      className={className}
    />
  );
}
