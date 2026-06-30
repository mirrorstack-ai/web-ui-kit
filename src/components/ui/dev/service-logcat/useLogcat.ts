import { useMemo, useState } from "react";
import type {
  LogEntry,
  LogLevel,
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
export function useLogcat(logs: LogEntry[]): UseLogcatResult {
  const [query, setQuery] = useState("");
  const [floor, setFloor] = useState<LevelFloor>("all");
  const [tailing, setTailing] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const minRank = FLOOR_RANK[floor];
    // Source arrives chronological (oldest first); reverse to newest-first so
    // the latest line sits at the TOP and the console follows upward.
    return logs
      .filter((l) => {
        if (LEVEL_RANK[l.level] < minRank) return false;
        if (q && !l.msg.toLowerCase().includes(q) && !l.level.includes(q)) return false;
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
