/**
 * Shared visual defaults applied to every cartesian chart in the kit so the
 * grid/axis treatment stays consistent across LineChart, BarChart,
 * CompareBarChart, and DualLineChart.
 */
export const CHART_MARGIN = {
  top: 8,
  right: 4,
  bottom: 0,
  left: 0,
} as const;

export const GRID_PROPS = {
  stroke: "currentColor",
  strokeOpacity: 0.07,
  vertical: false,
} as const;

export const AXIS_TICK = {
  fontSize: 9,
  fill: "currentColor",
  fillOpacity: 0.4,
} as const;

export const AXIS_PROPS = {
  stroke: "currentColor",
  strokeOpacity: 0.4,
  tickLine: false,
  axisLine: false,
} as const;

/**
 * Round to integer for values >= 1, two decimals otherwise. Matches the
 * formatting convention used by the original web-applications charts.
 */
export function formatChartValue(
  value: number,
  prefix = "",
  suffix = "",
): string {
  const formatted =
    Math.abs(value) >= 1 ? Math.round(value).toString() : value.toFixed(2);
  return `${prefix}${formatted}${suffix}`;
}
