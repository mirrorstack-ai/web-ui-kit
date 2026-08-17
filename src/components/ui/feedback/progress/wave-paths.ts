import type { ProgressSize } from "./types";

/* ── linear wave geometry ── */

const WAVE_PW = 40;
export const WAVE_VB_H = 24;

function buildLinearWave(periods: number): string {
  const yTop = 7;
  const yBot = 17;
  const cp = WAVE_PW / 6;
  const hp = WAVE_PW / 2;
  let d = `M0,${yTop}`;
  for (let i = 0; i < periods; i++) {
    const x = i * WAVE_PW;
    d += ` C${x + cp},${yTop} ${x + hp - cp},${yBot} ${x + hp},${yBot}`;
    d += ` C${x + hp + cp},${yBot} ${x + WAVE_PW - cp},${yTop} ${x + WAVE_PW},${yTop}`;
  }
  return d;
}

const INDET_PERIODS: Record<ProgressSize, number> = { sm: 28, md: 20, lg: 14 };
const DET_PERIODS: Record<ProgressSize, number> = { sm: 14, md: 10, lg: 7 };

export type WaveConfig = { path: string; vbW: number };

export const indetWave: Record<ProgressSize, WaveConfig> = Object.fromEntries(
  (["sm", "md", "lg"] as const).map(s => [s, {
    path: buildLinearWave(INDET_PERIODS[s]),
    vbW: INDET_PERIODS[s] * WAVE_PW,
  }]),
) as Record<ProgressSize, WaveConfig>;

export const detWave: Record<ProgressSize, WaveConfig> = Object.fromEntries(
  (["sm", "md", "lg"] as const).map(s => [s, {
    path: buildLinearWave(DET_PERIODS[s]),
    vbW: DET_PERIODS[s] * WAVE_PW,
  }]),
) as Record<ProgressSize, WaveConfig>;

export const waveShift: Record<ProgressSize, string> = Object.fromEntries(
  (["sm", "md", "lg"] as const).map(s => [s, `-${(100 / INDET_PERIODS[s]).toFixed(4)}%`]),
) as Record<ProgressSize, string>;

// waveScale stretches the WAVELENGTH without touching the bar's height or
// stroke, which `size` cannot do — size drives period count, container height
// and default stroke together, so asking for a calmer wave also made a thicker
// slab of a bar.
//
// A scale of 2 draws half as many periods across the same width: sin(x) becomes
// sin(x/2). Below 1 it tightens them. Periods stay at least 1, because a wave
// with none is a straight line and callers would have quietly lost the variant
// they asked for.
export function scaledWave(base: number, scale: number): WaveConfig {
  const periods = Math.max(1, Math.round(base / scale));
  return { path: buildLinearWave(periods), vbW: periods * WAVE_PW };
}

// The indeterminate animation slides the SVG by exactly one period, so the shift
// has to be recomputed from the SCALED count or the loop visibly jumps.
export function scaledShift(base: number, scale: number): string {
  return `-${(100 / Math.max(1, Math.round(base / scale))).toFixed(4)}%`;
}

export const indetPeriods = INDET_PERIODS;
export const detPeriods = DET_PERIODS;

/* ── circular wave geometry ── */

const SVG_VIEWBOX = 48;
const SVG_RADIUS = 20;
const SVG_CENTER = SVG_VIEWBOX / 2;

function buildWavyCircle(
  cx: number, cy: number, r: number,
  amplitude: number, waves: number, segments = 120,
): string {
  const pts: string[] = [];
  for (let i = 0; i <= segments; i++) {
    const θ = (i / segments) * 2 * Math.PI;
    const wr = r + amplitude * Math.sin(waves * θ);
    const x = cx + wr * Math.cos(θ);
    const y = cy + wr * Math.sin(θ);
    pts.push(i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : `L${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export const WAVY_CIRCLE = buildWavyCircle(SVG_CENTER, SVG_CENTER, SVG_RADIUS, 1.5, 8);
export const CIRCUMFERENCE = 2 * Math.PI * SVG_RADIUS;
export { SVG_VIEWBOX, SVG_RADIUS, SVG_CENTER };
