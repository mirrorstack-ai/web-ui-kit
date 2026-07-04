/**
 * A single log line rendered by {@link ServiceLogcat}.
 *
 * Entries arrive chronological (oldest first); the console reverses them
 * internally so the newest line sits at the top. The optional request/response
 * detail fields are present on access-log lines (captured by the dev-proxy /
 * dispatch ring) and absent on plain log lines. Detail keys are snake_case to
 * match the dispatch ring Entry JSON.
 */
export type LogLevel = "info" | "warn" | "error";

export interface LogEntry {
  ts: string;
  level: LogLevel;
  msg: string;
  /** Monotonic sequence number from the log source; used as a stable row key when present. */
  seq?: number;
  // Optional request/response detail — present on access-log lines captured by
  // the dev-proxy, absent on plain log lines. Keys match the dispatch ring
  // Entry JSON (snake_case).
  method?: string;
  path?: string;
  status?: number;
  req_body?: string;
  res_body?: string;
  duration_ms?: number;
}
