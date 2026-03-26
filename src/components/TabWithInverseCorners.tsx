"use client";

import { cn } from "../utils/cn";

interface TabWithInverseCornersProps {
  isActive: boolean;
  title: string;
  icon?: string;
  showIcon?: boolean;
  showClose: boolean;
  onClick: () => void;
  onClose?: (e: React.MouseEvent) => void;
}

export function TabWithInverseCorners({
  isActive,
  title,
  icon = "auto_awesome",
  showIcon = true,
  showClose,
  onClick,
  onClose,
}: TabWithInverseCornersProps) {
  return (
    <div className="group relative h-full flex">
      <div
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        className="relative h-full flex"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
          if (e.key === "Delete" && onClose) {
            e.preventDefault();
            onClose(e as unknown as React.MouseEvent);
          }
        }}
      >
        <div
          className={cn(
            "chrome-tab relative flex items-center gap-2 px-3 h-full max-w-[200px] cursor-pointer select-none",
            showIcon ? "min-w-[140px]" : "min-w-[100px]",
            isActive
              ? "rounded-t-xl bg-on-background text-inverse-on-surface z-10"
              : "h-7 m-auto rounded-lg bg-secondary-container text-on-surface/80 hover:bg-on-secondary-container/50 hover:text-inverse-on-surface/70"
          )}
        >
          {isActive && (
            <>
              <div
                className="absolute left-0 w-3 h-3 pointer-events-none"
                style={{
                  bottom: 0,
                  transform: "translateX(-100%)",
                  backgroundColor: "var(--color-on-background)",
                  WebkitMaskImage:
                    "radial-gradient(circle 12px at 0 0, transparent 12px, black 12px)",
                  maskImage:
                    "radial-gradient(circle 12px at 0 0, transparent 12px, black 12px)",
                }}
              />
              <div
                className="absolute right-0 w-3 h-3 pointer-events-none"
                style={{
                  bottom: 0,
                  transform: "translateX(100%)",
                  backgroundColor: "var(--color-on-background)",
                  WebkitMaskImage:
                    "radial-gradient(circle 12px at 12px 0, transparent 12px, black 12px)",
                  maskImage:
                    "radial-gradient(circle 12px at 12px 0, transparent 12px, black 12px)",
                }}
              />
            </>
          )}

          {showIcon && (
            <span className="material-symbols-rounded !text-[16px] flex-shrink-0">
              {icon}
            </span>
          )}

          <span className="text-[13px] font-normal truncate flex-1">
            {title}
          </span>

          {/* Spacer for close button positioning */}
          {showClose && onClose && <span className="w-5 h-5 shrink-0" />}
        </div>
      </div>

      {showClose && onClose && (
        <div
          role="none"
          aria-hidden="true"
          className={cn(
            "absolute right-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 flex items-center justify-center rounded-full hover:bg-inverse-on-surface/15 transition-opacity flex-shrink-0 cursor-pointer",
            isActive
              ? "opacity-70 hover:opacity-100"
              : "opacity-0 group-hover:opacity-70 group-hover:hover:opacity-100"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
        >
          <span className="material-symbols-rounded text-[16px]">
            close_small
          </span>
        </div>
      )}
    </div>
  );
}
