import { useState } from "react";
import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "GraphAction",
  description:
    "Vertical action stack for Graph — fit content, play/pause replay toggle, and an optional settings button. Position it absolutely over a Graph container.",
};

export interface GraphActionProps {
  onReplay: () => void;
  onFit: () => void;
  /** Optional settings entry. Button is hidden when omitted. */
  onSettings?: () => void;
  /** Controlled play/pause icon. When omitted, the button manages its own toggle state. */
  playing?: boolean;
  className?: string;
}

export function GraphAction({
  onReplay,
  onFit,
  onSettings,
  playing,
  className,
}: GraphActionProps) {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const isPlaying = playing ?? internalPlaying;

  const handlePlayClick = () => {
    if (playing === undefined) setInternalPlaying((p) => !p);
    onReplay();
  };

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-1 rounded-xl bg-surface-container/80 backdrop-blur p-1 border border-outline-variant",
        className,
      )}
    >
      <IconButton
        icon="fit_screen"
        aria-label="Fit content"
        tooltip="Fit content"
        size="sm"
        variant="text"
        onClick={onFit}
      />
      <IconButton
        icon={isPlaying ? "stop_circle" : "motion_play"}
        aria-label={isPlaying ? "Stop layout" : "Replay layout"}
        tooltip={isPlaying ? "Stop layout" : "Replay layout"}
        size="sm"
        variant="text"
        onClick={handlePlayClick}
      />
      {onSettings && (
        <IconButton
          icon="tune"
          aria-label="Graph settings"
          tooltip="Graph settings"
          size="sm"
          variant="text"
          onClick={onSettings}
        />
      )}
    </div>
  );
}
