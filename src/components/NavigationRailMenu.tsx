"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";

export interface NavigationRailMenuProps {
  /** Element that triggers the menu on hover */
  trigger: ReactNode;
  /** Menu panel content */
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Panel content width in px */
  panelWidth?: number;
  /** Min distance from viewport edges */
  viewportPadding?: number;
  className?: string;
}

/* ---- Shape constants ---- */
const R = 16; // panel corner radius (matches rounded-2xl)
const r = 12; // concave arc radius at notch junction
const nr = 18; // notch inner corner radius
const NOTCH_VERT_PAD = 12; // vertical padding around trigger within notch
const NOTCH_SIDE_PAD = 10; // horizontal padding left of trigger within notch
const NOTCH_GAP = 8; // gap between trigger right edge and panel body
const BUTTON_RADIUS = 12; // matches rounded-xl on the trigger button
const CLOSE_DELAY = 300; // ms before closing on mouse leave

/**
 * Builds the SVG path for a rounded rectangle with a notch on the left edge.
 * The notch depth and height are dynamic based on the trigger element.
 */
function buildNotchedPath(
  W: number,
  H: number,
  notchY: number,
  notchDepth: number,
  notchHeight: number,
): string {
  const ND = notchDepth;
  const nT = notchY;
  const nB = notchY + notchHeight;
  const topOk = nT >= R + r;
  const botOk = H - nB >= R + r;
  const hasEdge = ND - r > nr;

  if (topOk && botOk) {
    return [
      `M ${ND + R},0`,
      `H ${W - R}`,
      `A ${R},${R} 0 0,1 ${W},${R}`,
      `V ${H - R}`,
      `A ${R},${R} 0 0,1 ${W - R},${H}`,
      `H ${ND + R}`,
      `A ${R},${R} 0 0,1 ${ND},${H - R}`,
      `V ${nB + r}`,
      `A ${r},${r} 0 0,0 ${ND - r},${nB}`,
      ...(hasEdge ? [`H ${nr}`] : []),
      `A ${nr},${nr} 0 0,1 0,${nB - nr}`,
      `V ${nT + nr}`,
      `A ${nr},${nr} 0 0,1 ${nr},${nT}`,
      ...(hasEdge ? [`H ${ND - r}`] : []),
      `A ${r},${r} 0 0,0 ${ND},${nT - r}`,
      `V ${R}`,
      `A ${R},${R} 0 0,1 ${ND + R},0`,
      `Z`,
    ].join(" ");
  }

  if (!topOk && botOk) {
    return [
      `M ${nr},0`,
      `H ${W - R}`,
      `A ${R},${R} 0 0,1 ${W},${R}`,
      `V ${H - R}`,
      `A ${R},${R} 0 0,1 ${W - R},${H}`,
      `H ${ND + R}`,
      `A ${R},${R} 0 0,1 ${ND},${H - R}`,
      `V ${nB + r}`,
      `A ${r},${r} 0 0,0 ${ND - r},${nB}`,
      ...(hasEdge ? [`H ${nr}`] : []),
      `A ${nr},${nr} 0 0,1 0,${nB - nr}`,
      `V ${nr}`,
      `A ${nr},${nr} 0 0,1 ${nr},0`,
      `Z`,
    ].join(" ");
  }

  if (topOk && !botOk) {
    return [
      `M ${ND + R},0`,
      `H ${W - R}`,
      `A ${R},${R} 0 0,1 ${W},${R}`,
      `V ${H - R}`,
      `A ${R},${R} 0 0,1 ${W - R},${H}`,
      `H ${nr}`,
      `A ${nr},${nr} 0 0,1 0,${H - nr}`,
      `V ${nT + nr}`,
      `A ${nr},${nr} 0 0,1 ${nr},${nT}`,
      ...(hasEdge ? [`H ${ND - r}`] : []),
      `A ${r},${r} 0 0,0 ${ND},${nT - r}`,
      `V ${R}`,
      `A ${R},${R} 0 0,1 ${ND + R},0`,
      `Z`,
    ].join(" ");
  }

  return [
    `M ${nr},0`,
    `H ${W - R}`,
    `A ${R},${R} 0 0,1 ${W},${R}`,
    `V ${H - R}`,
    `A ${R},${R} 0 0,1 ${W - R},${H}`,
    `H ${nr}`,
    `A ${nr},${nr} 0 0,1 0,${H - nr}`,
    `V ${nr}`,
    `A ${nr},${nr} 0 0,1 ${nr},0`,
    `Z`,
  ].join(" ");
}

/** Builds a rounded-rect sub-path used as a cutout hole (even-odd) for the trigger button. */
function buildButtonHole(
  x: number,
  y: number,
  w: number,
  h: number,
): string {
  const br = BUTTON_RADIUS;
  return [
    `M ${x + br},${y}`,
    `H ${x + w - br}`,
    `A ${br},${br} 0 0,1 ${x + w},${y + br}`,
    `V ${y + h - br}`,
    `A ${br},${br} 0 0,1 ${x + w - br},${y + h}`,
    `H ${x + br}`,
    `A ${br},${br} 0 0,1 ${x},${y + h - br}`,
    `V ${y + br}`,
    `A ${br},${br} 0 0,1 ${x + br},${y}`,
    `Z`,
  ].join(" ");
}

export function NavigationRailMenu({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  panelWidth = 280,
  viewportPadding = 16,
  className,
}: NavigationRailMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = useCallback(
    (v: boolean) => {
      if (onOpenChange) onOpenChange(v);
      else setInternalOpen(v);
    },
    [onOpenChange],
  );

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);

  const [layout, setLayout] = useState<{
    left: number;
    top: number;
    totalWidth: number;
    notchDepth: number;
    strokePath: string; // outer outline only (no hole)
    fillPath: string; // outer + button hole (even-odd)
  } | null>(null);

  /* ---- Hover handlers ---- */
  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }, []);

  const startCloseTimer = useCallback(() => {
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(
      () => setIsOpen(false),
      CLOSE_DELAY,
    );
  }, [setIsOpen, cancelCloseTimer]);

  const handleTriggerEnter = useCallback(() => {
    cancelCloseTimer();
    setIsOpen(true);
  }, [setIsOpen, cancelCloseTimer]);

  const handleTriggerLeave = useCallback(() => {
    startCloseTimer();
  }, [startCloseTimer]);

  const handlePanelEnter = useCallback(() => {
    cancelCloseTimer();
  }, [cancelCloseTimer]);

  const handlePanelLeave = useCallback(() => {
    startCloseTimer();
  }, [startCloseTimer]);

  useEffect(() => () => cancelCloseTimer(), [cancelCloseTimer]);

  /* ---- Layout calculation ---- */
  const updateLayout = useCallback(() => {
    const triggerEl = triggerRef.current;
    const panelEl = panelRef.current;
    if (!triggerEl || !panelEl) return;

    const rect = triggerEl.getBoundingClientRect();
    const panelH = panelEl.offsetHeight;

    // Dynamic notch dimensions based on trigger size
    const notchDepth = rect.width + NOTCH_SIDE_PAD + NOTCH_GAP;
    const notchHeight = rect.height + 2 * NOTCH_VERT_PAD;
    const totalWidth = notchDepth + panelWidth;

    // Position: notch starts slightly left of trigger
    const containerLeft = rect.left - NOTCH_SIDE_PAD;

    // Center panel vertically on trigger
    const triggerCenterY = rect.top + rect.height / 2;
    const idealTop = triggerCenterY - panelH / 2;
    const clampedTop = Math.max(
      viewportPadding,
      Math.min(idealTop, window.innerHeight - panelH - viewportPadding),
    );

    // Notch Y relative to panel top
    const rawNotchY = rect.top - clampedTop - NOTCH_VERT_PAD;
    let notchY = Math.max(0, Math.min(rawNotchY, panelH - notchHeight));

    // Snap to edges when too close for clean corner geometry
    if (notchY > 0 && notchY < R + r) notchY = 0;
    if (
      notchY < panelH - notchHeight &&
      panelH - notchHeight - notchY < R + r
    )
      notchY = panelH - notchHeight;

    // Outer shape path (for stroke)
    const strokePath = buildNotchedPath(
      totalWidth,
      panelH,
      notchY,
      notchDepth,
      notchHeight,
    );

    // Fill path = outer shape + button hole (even-odd creates transparency)
    const holePath = buildButtonHole(
      NOTCH_SIDE_PAD,
      notchY + NOTCH_VERT_PAD,
      rect.width,
      rect.height,
    );
    const fillPath = strokePath + " " + holePath;

    setLayout({
      left: containerLeft,
      top: clampedTop,
      totalWidth,
      notchDepth,
      strokePath,
      fillPath,
    });
  }, [panelWidth, viewportPadding]);

  useEffect(() => {
    if (!isOpen) {
      setLayout(null);
      return;
    }

    const rafId = requestAnimationFrame(updateLayout);

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (contentRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleResize = () => requestAnimationFrame(updateLayout);

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, updateLayout, setIsOpen]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleTriggerEnter}
        onMouseLeave={handleTriggerLeave}
      >
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={panelRef}
            className={cn(
              "fixed z-50 pointer-events-none transition-opacity duration-200",
              layout ? "opacity-100" : "opacity-0",
              className,
            )}
            style={{
              left: layout?.left ?? 0,
              top: layout?.top ?? 0,
              width: layout?.totalWidth ?? panelWidth + 50,
            }}
          >
            {/* SVG background with drop-shadow */}
            <div
              className="absolute inset-0"
              style={{
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
              }}
            >
              <svg className="w-full h-full" style={{ overflow: "visible" }}>
                {layout && (
                  <>
                    {/* Fill with even-odd hole so the trigger button shows through */}
                    <path
                      d={layout.fillPath}
                      fill="var(--color-surface-container)"
                      fillRule="evenodd"
                    />
                    {/* Stroke on outer outline only — no border around the hole */}
                    <path
                      d={layout.strokePath}
                      fill="none"
                      stroke="var(--color-outline-variant)"
                      strokeWidth="1"
                    />
                  </>
                )}
              </svg>
            </div>

            {/* Content — pointer-events-auto so it's interactive,
                notch area stays pointer-events-none so clicks reach the trigger underneath */}
            <div
              ref={contentRef}
              className="relative z-10 py-3 pointer-events-auto"
              style={{
                marginLeft: layout?.notchDepth ?? 50,
                width: panelWidth,
                minHeight: 68,
              }}
              onMouseEnter={handlePanelEnter}
              onMouseLeave={handlePanelLeave}
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
