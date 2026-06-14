import { useId, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Logo",
  description:
    "MirrorStack aperture logomark as inline SVG: two interleaved triangles of rounded petals in the fixed brand teal/cyan, around a punched-out (transparent) centre that lets the background show through. Set `loading` to counter-rotate the triangles as a busy indicator.",
};

export interface LogoProps {
  /** Counter-rotate the two blade triangles as a loading / busy indicator. */
  loading?: boolean;
  /** Accessible label for the mark. Defaults to "MirrorStack Logo". */
  title?: string;
  /** Sizing / layout classes. Defaults to filling its container. */
  className?: string;
  style?: CSSProperties;
}

/** One rounded petal — a slim swept triangle pointing out from the centre.
 *  Scaled ~1.2x around (32,32) vs. the base shape so the mark fills the
 *  64×64 box with roughly 8px of padding instead of ~12px. */
const BLADE = "M32 32 L30.8 11.6 L42.8 17.6 Z";
/** Two interleaved triangles, 60° offset. Teal triangle vs. cyan triangle. */
const TEAL_ANGLES = [0, 120, 240];
const CYAN_ANGLES = [60, 180, 300];

/** Fixed brand colours — the mark stays on-brand in every theme. */
const TEAL = "#006973";
const CYAN = "#28bdce";

/**
 * Logo-specific animation. Lives here rather than in the shared theme tokens
 * because each logo can carry its own motion. The two triangles each have
 * 3-fold symmetry, so a 120° step loops seamlessly; the snappy curve gives it
 * energy. Spin is centred on the viewBox (50% of the 0 0 64 64 box = 32,32),
 * so the viewBox must stay 0 0 64 64 for the rotation to stay centred, and it
 * is disabled under prefers-reduced-motion.
 */
const LOGO_CSS = `
.ms-logo__tri { transform-box: view-box; transform-origin: 50% 50%; }
.ms-logo--loading .ms-logo__tri--cw {
  animation: ms-logo-spin 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
.ms-logo--loading .ms-logo__tri--ccw {
  animation: ms-logo-spin-reverse 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
@keyframes ms-logo-spin {
  from { transform: rotate(0); } to { transform: rotate(120deg); }
}
@keyframes ms-logo-spin-reverse {
  from { transform: rotate(0); } to { transform: rotate(-120deg); }
}
@media (prefers-reduced-motion: reduce) {
  .ms-logo--loading .ms-logo__tri--cw,
  .ms-logo--loading .ms-logo__tri--ccw { animation: none; }
}
`;

function BladeTriangle({
  angles,
  color,
  dir,
}: {
  angles: number[];
  color: string;
  dir: "cw" | "ccw";
}) {
  return (
    <g className={`ms-logo__tri ms-logo__tri--${dir}`}>
      {angles.map((deg) => (
        <path key={deg} d={BLADE} transform={`rotate(${deg} 32 32)`} fill={color} stroke={color} />
      ))}
    </g>
  );
}

export function Logo({
  loading = false,
  title = "MirrorStack Logo",
  className,
  style,
}: LogoProps) {
  // Unique, selector-safe id so the centre cut-out works with many Logos.
  const holeId = `ms-logo-hole-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      aria-busy={loading || undefined}
      style={style}
      className={cn("ms-logo h-full w-full", loading && "ms-logo--loading", className)}
    >
      <title>{title}</title>
      <style>{LOGO_CSS}</style>
      {/* Transparent core — punched out so the background shows through. */}
      <mask id={holeId}>
        <rect x="0" y="0" width="64" height="64" fill="white" />
        <circle cx="32" cy="32" r="3" fill="black" />
      </mask>
      <g
        mask={`url(#${holeId})`}
        strokeWidth={7.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <BladeTriangle angles={TEAL_ANGLES} color={TEAL} dir="cw" />
        <BladeTriangle angles={CYAN_ANGLES} color={CYAN} dir="ccw" />
      </g>
    </svg>
  );
}
