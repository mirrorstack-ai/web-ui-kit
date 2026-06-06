import type { PrimitiveRegistry } from "@/components/ui/surfaces/notch-grid/types";
import { MetricBlock } from "@/components/ui/blocks/metric-block/MetricBlock";
import { Sparkline } from "@/components/ui/blocks/sparkline/Sparkline";
import { DataList } from "@/components/ui/blocks/data-list/DataList";
import { DataTable } from "@/components/ui/blocks/data-table/DataTable";
import { StatusIndicator } from "@/components/ui/blocks/status-indicator/StatusIndicator";
import { StarRating } from "@/components/ui/blocks/star-rating/StarRating";
import { Timeline } from "@/components/ui/blocks/timeline/Timeline";
import { Gauge } from "@/components/ui/blocks/gauge/Gauge";

/**
 * Batteries-included primitive set for {@link NotchGrid}. Opt in explicitly:
 * `<NotchGrid items={...} primitives={defaultPrimitives} />`.
 *
 * Kept OUT of NotchGrid's own module graph (NotchGrid defaults `primitives` to
 * `{}`) so grid-only consumers don't statically pull all eight block components
 * into their bundle.
 */
export const defaultPrimitives: PrimitiveRegistry = {
  Metric: MetricBlock as unknown as PrimitiveRegistry[string],
  Sparkline: Sparkline as unknown as PrimitiveRegistry[string],
  List: DataList as unknown as PrimitiveRegistry[string],
  Table: DataTable as unknown as PrimitiveRegistry[string],
  Status: StatusIndicator as unknown as PrimitiveRegistry[string],
  Rating: StarRating as unknown as PrimitiveRegistry[string],
  Timeline: Timeline as unknown as PrimitiveRegistry[string],
  Gauge: Gauge as unknown as PrimitiveRegistry[string],
};
