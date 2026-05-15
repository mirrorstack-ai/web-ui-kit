import { cn } from "@/utils/cn";
import { Switch } from "@/components/ui/inputs/switch/Switch";
import { Slider } from "@/components/ui/inputs/slider/Slider";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideSetting",
  description:
    "Form for the Graph's display settings — node size, line thickness, label visibility, repulsion strength, and link distance.",
};

export interface GraphSideSettingValue {
  /** Multiplier on node radii. */
  nodeSize: number;
  /** Multiplier on edge stroke width. */
  lineSize: number;
  /** Show the text label under each node. */
  showLabels: boolean;
  /** Force-sim pairwise repulsion strength. */
  repulsion: number;
  /** Force-sim edge spring rest length. */
  linkDistance: number;
}

export interface GraphSideSettingProps {
  value: GraphSideSettingValue;
  onChange: (next: GraphSideSettingValue) => void;
  /** Range bounds for the node size multiplier slider. Default [0.5, 2]. */
  nodeSizeRange?: [number, number];
  /** Range bounds for the line size multiplier slider. Default [0.5, 2]. */
  lineSizeRange?: [number, number];
  /** Range bounds for the repulsion slider. Default [500, 3000]. */
  repulsionRange?: [number, number];
  /** Range bounds for the link distance slider. Default [30, 150]. */
  linkDistanceRange?: [number, number];
  className?: string;
}

export function GraphSideSetting({
  value,
  onChange,
  nodeSizeRange = [0.5, 2],
  lineSizeRange = [0.5, 2],
  repulsionRange = [500, 3000],
  linkDistanceRange = [30, 150],
  className,
}: GraphSideSettingProps) {
  const set = <K extends keyof GraphSideSettingValue>(
    key: K,
    next: GraphSideSettingValue[K],
  ) => onChange({ ...value, [key]: next });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="flex items-center justify-between gap-2 py-2 text-sm text-on-surface">
        <span>Show labels</span>
        <Switch
          size="sm"
          checked={value.showLabels}
          onChange={(checked) => set("showLabels", checked)}
          aria-label="Show labels"
        />
      </label>
      <SliderRow
        label="Node size"
        min={nodeSizeRange[0]}
        max={nodeSizeRange[1]}
        step={0.1}
        value={value.nodeSize}
        onChange={(v) => set("nodeSize", v)}
      />
      <SliderRow
        label="Line size"
        min={lineSizeRange[0]}
        max={lineSizeRange[1]}
        step={0.1}
        value={value.lineSize}
        onChange={(v) => set("lineSize", v)}
      />
      <SliderRow
        label="Repulsion"
        min={repulsionRange[0]}
        max={repulsionRange[1]}
        step={50}
        value={value.repulsion}
        onChange={(v) => set("repulsion", v)}
      />
      <SliderRow
        label="Link distance"
        min={linkDistanceRange[0]}
        max={linkDistanceRange[1]}
        step={5}
        value={value.linkDistance}
        onChange={(v) => set("linkDistance", v)}
      />
    </div>
  );
}

function SliderRow({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-on-surface">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-on-surface-variant tabular-nums">{value}</span>
      </span>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        aria-label={label}
      />
    </label>
  );
}
