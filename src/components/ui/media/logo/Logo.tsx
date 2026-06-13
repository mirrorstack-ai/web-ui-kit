import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Logo",
  description:
    "MirrorStack aperture logomark as inline SVG: two interleaved triangles of rounded petals in the fixed brand teal/cyan, around a forced-white core. Set `loading` to counter-rotate the triangles as a busy indicator.",
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

/** One rounded petal — a slim swept triangle pointing out from the centre. */
const BLADE = "M32 32 L31 15 L41 20 Z";
/** Two interleaved triangles, 60° offset. Teal triangle vs. cyan triangle. */
const TEAL_ANGLES = [0, 120, 240];
const CYAN_ANGLES = [60, 180, 300];

/** Fixed brand colours — the mark stays on-brand in every theme. */
const TEAL = "#006973";
const CYAN = "#28bdce";
const CORE = "#ffffff";

/**
 * Logo-specific animation. Lives here rather than in the shared theme tokens
 * because each logo can carry its own motion. The two triangles each have
 * 3-fold symmetry, so a 120° step loops seamlessly; the snappy curve gives it
 * energy. Spin is centred on the viewBox (not each triangle's bounding box)
 * and disabled under prefers-reduced-motion.
 */
const LOGO_CSS = `
.ms-logo__tri { transform-box: view-box; transform-origin: 50% 50%; }
.ms-logo--loading .ms-logo__tri--cw {
  animation: ms-logo-spin 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
.ms-logo--loading .ms-logo__tri--ccw {
  animation: ms-logo-spin-reverse 1s cubic-bezier(0.85, 0, 0.15, 1) infinite;
}
@keyframes ms-logo-spin { from { transform: rotate(0); } to { transform: rotate(120deg); } }
@keyframes ms-logo-spin-reverse { from { transform: rotate(0); } to { transform: rotate(-120deg); } }
@media (prefers-reduced-motion: reduce) {
  .ms-logo--loading .ms-logo__tri--cw,
  .ms-logo--loading .ms-logo__tri--ccw { animation: none; }
}
`;

export function Logo({
  loading = false,
  title = "MirrorStack Logo",
  className,
  style,
}: LogoProps) {
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
      <g strokeWidth={6} strokeLinejoin="round" strokeLinecap="round">
        <g className="ms-logo__tri ms-logo__tri--cw">
          {TEAL_ANGLES.map((deg) => (
            <path key={deg} d={BLADE} transform={`rotate(${deg} 32 32)`} fill={TEAL} stroke={TEAL} />
          ))}
        </g>
        <g className="ms-logo__tri ms-logo__tri--ccw">
          {CYAN_ANGLES.map((deg) => (
            <path key={deg} d={BLADE} transform={`rotate(${deg} 32 32)`} fill={CYAN} stroke={CYAN} />
          ))}
        </g>
      </g>
      {/* Forced-white core — punched on top so it reads on any background. */}
      <circle cx="32" cy="32" r="3" fill={CORE} />
    </svg>
  );
}
