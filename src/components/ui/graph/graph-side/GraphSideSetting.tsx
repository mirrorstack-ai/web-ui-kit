import { cn } from "@/utils/cn";
import { Switch } from "@/components/ui/inputs/switch/Switch";
import { Slider } from "@/components/ui/inputs/slider/Slider";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphSideSetting",
  description:
    "Form for the Graph's display settings — node size, line thickness, and whether tags render on nodes.",
};

export interface GraphSideSettingValue {
  nodeSize: number;
  lineSize: number;
  showTags: boolean;
}

export interface GraphSideSettingProps {
  value: GraphSideSettingValue;
  onChange: (next: GraphSideSettingValue) => void;
  /** Range bounds for the node size slider. Default [4, 20]. */
  nodeSizeRange?: [number, number];
  /** Range bounds for the line size slider. Default [0.5, 3]. */
  lineSizeRange?: [number, number];
  className?: string;
}

export function GraphSideSetting({
  value,
  onChange,
  nodeSizeRange = [4, 20],
  lineSizeRange = [0.5, 3],
  className,
}: GraphSideSettingProps) {
  const set = <K extends keyof GraphSideSettingValue>(
    key: K,
    next: GraphSideSettingValue[K],
  ) => onChange({ ...value, [key]: next });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <SliderRow
        label="Node size"
        min={nodeSizeRange[0]}
        max={nodeSizeRange[1]}
        step={1}
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
      <label className="flex items-center justify-between gap-2 text-sm text-on-surface">
        <span>Show tags</span>
        <Switch
          checked={value.showTags}
          onChange={(checked) => set("showTags", checked)}
        />
      </label>
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
