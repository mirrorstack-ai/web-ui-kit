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

// HTTP status for an entry: the structured `status` field when present, else a
// standalone 3-digit 1xx–5xx token parsed from the message ("POST /x 500" ->
// 500). The `\s|$` guard skips embedded numbers like durations ("412ms").
export function statusOf(l: LogEntry): number | undefined {
  if (l.status != null) return l.status;
  const m = l.msg.match(/(?:^|\s)([1-5]\d{2})(?=\s|$)/);
  return m ? Number(m[1]) : undefined;
}

// Effective severity: an HTTP failure escalates the badge + colour (and the
// severity-floor filter) even when the line was recorded at "info" (a 500 is
// an error however it was logged). Status >=500 -> error, 400-499 -> warn,
// otherwise the entry's own level. Shared by ServiceLogcat (render) and
// useLogcat (filter) so both agree on an entry's severity.
export function effectiveLevel(l: LogEntry): LogLevel {
  const status = statusOf(l);
  if (status != null) {
    if (status >= 500) return "error";
    if (status >= 400) return "warn";
  }
  return l.level;
}
