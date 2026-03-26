import type { ComponentMeta } from "@/types/component-meta";
import type { ProgressProps } from "./types";
import { LinearProgress } from "./LinearProgress";
import { CircularProgress } from "./CircularProgress";

export type { ProgressProps, ProgressType, ProgressColor, ProgressVariant, ProgressSize } from "./types";

export const meta: ComponentMeta = {
  name: "Progress",
  description: "Linear and circular progress indicators with normal and wave variants",
};

export function Progress(props: ProgressProps) {
  const { type = "linear", ...rest } = props;
  return type === "circular" ? (
    <CircularProgress {...rest} />
  ) : (
    <LinearProgress {...rest} />
  );
}
