import type { ComponentMeta } from "@/types/component-meta";
import type { ProgressProps } from "./types";
import { LinearProgress } from "./LinearProgress";
import { CircularProgress } from "./CircularProgress";
import { ENV } from "@/utils/env";
declare const process: any;

export type { ProgressProps, ProgressType, ProgressColor, ProgressVariant, ProgressSize } from "./types";

const isDev =
  typeof process !== "undefined" &&
  process?.env?.NODE_ENV === ENV.DEV;

export const meta: ComponentMeta = {
  name: "Progress",
  description: "Linear and circular progress indicators with normal and wave variants",
};

export function Progress(props: ProgressProps) {
  const { type = "linear", ...rest } = props;

  if (isDev) {
    const { value, variant } = props;

    if (value !== undefined && (value < 0 || value > 100)) {
      console.warn("[Progress] value must be between 0-100, got:", value);
    }

    const isValidType = type === "linear" || type === "circular";
    const isValidVariant = variant === undefined || variant === "normal" || variant === "wave";

    if (!isValidType || !isValidVariant) {
      console.warn("[Progress] invalid type/variant combination");
    }

    console.log("[Progress props]", { value, type, variant });
  }

  return type === "circular" ? (
    <CircularProgress {...rest} />
  ) : (
    <LinearProgress {...rest} />
  );
}
