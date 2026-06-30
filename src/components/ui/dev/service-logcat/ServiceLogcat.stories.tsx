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
