import type { PrimitiveRegistry } from "../NotchGrid";
import { MetricBlock } from "@/components/ui/data/metric-block/MetricBlock";
import { Sparkline } from "@/components/ui/chart/sparkline/Sparkline";
import { DataList } from "@/components/ui/data/data-list/DataList";
import { DataTable } from "@/components/ui/data/data-table/DataTable";
import { StatusIndicator } from "@/components/ui/feedback/status-indicator/StatusIndicator";
import { StarRating } from "@/components/ui/data/star-rating/StarRating";
import { Timeline } from "@/components/ui/data/timeline/Timeline";
import { Gauge } from "@/components/ui/chart/gauge/Gauge";

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
