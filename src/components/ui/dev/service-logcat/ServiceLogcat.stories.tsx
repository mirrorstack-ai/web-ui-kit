import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ServiceLogcat } from "./ServiceLogcat";
import type { LogEntry } from "./types";

// Chronological (oldest first) — the console reverses to newest-first.
const SAMPLE_LOGS: LogEntry[] = [
  { ts: "2026-06-30T16:23:40.118921000Z", level: "info", msg: "GET /api/modules 200 8ms", duration_ms: 8 },
  { ts: "2026-06-30T16:23:42.041204000Z", level: "info", msg: "POST /api/sessions 201 41ms", duration_ms: 41 },
  { ts: "2026-06-30T16:23:43.512876000Z", level: "warn", msg: "Rate limit approaching: 88% of quota" },
  { ts: "2026-06-30T16:23:44.220019000Z", level: "info", msg: "GET /api/items 200 22ms", duration_ms: 22 },
  {
    ts: "2026-06-30T16:23:45.225373081Z",
    level: "info",
    msg: "POST /api/users 201 84ms",
    method: "POST",
    path: "/api/users",
    status: 201,
    duration_ms: 84,
    req_body: '{"name":"Ada Lovelace","email":"ada@example.com","role":"admin"}',
    res_body: '{"id":"usr_8f2c","name":"Ada Lovelace","email":"ada@example.com","role":"admin","created_at":"2026-06-30T16:23:45Z"}',
  },
  { ts: "2026-06-30T16:23:46.882013000Z", level: "warn", msg: "Slow query: media.list took 412ms", duration_ms: 412 },
  {
    ts: "2026-06-30T16:23:48.014662000Z",
    level: "error",
    msg: "GET /api/items 500 — db connection refused",
    method: "GET",
    path: "/api/items",
    status: 500,
    duration_ms: 5021,
    res_body: '{"error":"db_connection_refused","detail":"dial tcp 10.0.1.4:5432: connect: connection refused"}',
  },
  { ts: "2026-06-30T16:23:49.330114000Z", level: "info", msg: "GET /api/users 200 12ms", duration_ms: 12 },
  // Status-driven severity: logged at "info" but a structured 500 — the badge +
  // row escalate to error, and the row is expandable (per-log copy demo).
  {
    ts: "2026-06-30T16:23:50.771244000Z",
    level: "info",
    msg: "POST /public/complete 500",
    method: "POST",
    path: "/public/complete",
    status: 500,
    duration_ms: 132,
    req_body: '{"code":"authz_grant_9f","state":"xR7"}',
    res_body: '{"error":"internal","detail":"token exchange failed: upstream 503"}',
  },
  // Status-driven severity: "info" line whose only status signal is a trailing
  // 4xx code in the message — escalates to warn.
  { ts: "2026-06-30T16:23:51.402990000Z", level: "info", msg: "GET /api/items/nope 404", duration_ms: 6 },
];

const meta: Meta<typeof ServiceLogcat> = {
  title: "UI/Dev/ServiceLogcat",
  component: ServiceLogcat,
  args: {
    logs: SAMPLE_LOGS,
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ServiceLogcat>;

export const Playground: Story = {};

export const WithRequestResponseDetail: Story = {
  args: { logs: SAMPLE_LOGS },
  render: (args) => (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs text-on-surface-variant">
        Click a row with request/response detail (the POST /api/users or the
        500 error) to expand its body.
      </p>
      <ServiceLogcat {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: { logs: [] },
};

/** Seeds the text filter box on mount — e.g. landing pre-filtered from a deep link. */
export const WithInitialQuery: Story = {
  args: { logs: SAMPLE_LOGS, initialQuery: "users" },
};

/** Every user-facing string overridden — e.g. for a non-English locale. */
export const Localized: Story = {
  args: {
    logs: SAMPLE_LOGS,
    labels: {
      title: "日誌",
      live: "即時",
      paused: "已暫停",
      floorAll: "全部",
      floorWarn: "警告以上",
      floorError: "錯誤",
      filterAriaLabel: "依層級篩選",
      filterPlaceholder: "篩選紀錄",
      clearFilterAriaLabel: "清除篩選",
      copyAriaLabel: "複製紀錄",
      copyEntryAriaLabel: "複製此紀錄",
      copiedAriaLabel: "已複製",
      noMatchingEntries: "沒有符合的紀錄。",
      request: "請求",
      response: "回應",
      noRequestResponseBody: "沒有請求或回應內容。",
      loadOlderEntries: "載入較舊的紀錄",
      entriesLabel: (filteredCount, total, query) => {
        const base =
          filteredCount === total ? `共 ${total} 筆` : `${total} 筆中的 ${filteredCount} 筆`;
        return query ? `${base} · "${query}"` : base;
      },
      tailingStatus: "即時追蹤中",
      pausedStatus: "已暫停",
    },
  },
};

// Older pages are generated on demand, seq-keyed, and appended at the OLD end
// (the bottom). Scroll near the bottom or click the row to load a page.
const PAGE_SIZE = 20;
const TOTAL_OLDER = 60;

function olderPage(before: number): LogEntry[] {
  return Array.from({ length: PAGE_SIZE }, (_, i): LogEntry => {
    const seq = before - PAGE_SIZE + i;
    const sec = String(seq % 60).padStart(2, "0");
    return {
      seq,
      ts: `2026-06-30T16:22:${sec}.000000000Z`,
      level: seq % 13 === 0 ? "warn" : "info",
      msg: `GET /api/items?page=${seq} 200 ${5 + (seq % 20)}ms`,
      duration_ms: 5 + (seq % 20),
    };
  });
}

function LoadOlderDemo() {
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    SAMPLE_LOGS.map((l, i) => ({ ...l, seq: TOTAL_OLDER + i })),
  );
  const [loadingOlder, setLoadingOlder] = useState(false);
  const oldestSeq = logs[0]?.seq ?? TOTAL_OLDER;

  const onLoadOlder = () => {
    setLoadingOlder(true);
    setTimeout(() => {
      setLogs((cur) => [...olderPage(oldestSeq), ...cur]);
      setLoadingOlder(false);
    }, 800);
  };

  return (
    <div className="h-96">
      <ServiceLogcat
        logs={logs}
        onLoadOlder={onLoadOlder}
        hasOlder={oldestSeq > 0}
        loadingOlder={loadingOlder}
      />
    </div>
  );
}

export const LoadOlder: Story = {
  render: () => <LoadOlderDemo />,
};
