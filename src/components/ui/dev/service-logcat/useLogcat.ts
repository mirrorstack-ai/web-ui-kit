import { useMemo, useState } from "react";
import {
  effectiveLevel,
  type LogEntry,
  type LogLevel,
} from "@/components/ui/dev/service-logcat/types";

/**
 * Severity floor for the Logcat filter — show this level "and above".
 * `all` = info+warn+error, `warn` = warn+error, `error` = error only.
 */
export type LevelFloor = "all" | "warn" | "error";

const FLOOR_RANK: Record<LevelFloor, number> = { all: 0, warn: 1, error: 2 };
const LEVEL_RANK: Record<LogLevel, number> = { info: 0, warn: 1, error: 2 };

export interface UseLogcatResult {
  query: string;
  setQuery: (v: string) => void;
  floor: LevelFloor;
  setFloor: (v: LevelFloor) => void;
  tailing: boolean;
  setTailing: (v: boolean) => void;
  /** Filtered entries newest-first (reversed), so the latest line sits at the top. */
  filtered: LogEntry[];
  total: number;
}

/**
 * State + derivation for the service Logcat console. The caller passes the raw
 * entries (a mock array, or a live stream — this hook is the swap seam); the
 * component stays presentational. Source entries arrive chronological (oldest
 * first); the hook reverses them to newest-first so the console shows the
 * latest line at the top.
 */
export function useLogcat(logs: LogEntry[], initialQuery = ""): UseLogcatResult {
  const [query, setQuery] = useState(initialQuery);
  const [floor, setFloor] = useState<LevelFloor>("all");
  const [tailing, setTailing] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const minRank = FLOOR_RANK[floor];
    // Source arrives chronological (oldest first); reverse to newest-first so
    // the latest line sits at the TOP and the console follows upward.
    return logs
      .filter((l) => {
        // Rank and match on the EFFECTIVE severity (escalated by HTTP status),
        // not the raw level — otherwise an "info" line carrying a 500 renders
        // a red error badge yet vanishes under the "Errors" floor.
        const level = effectiveLevel(l);
        if (LEVEL_RANK[level] < minRank) return false;
        if (q && !l.msg.toLowerCase().includes(q) && !level.includes(q)) return false;
        return true;
      })
      .reverse();
  }, [logs, query, floor]);

  return {
    query,
    setQuery,
    floor,
    setFloor,
    tailing,
    setTailing,
    filtered,
    total: logs.length,
  };
}
