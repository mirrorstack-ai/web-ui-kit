import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ServiceLogcat } from "./ServiceLogcat";
import type { LogEntry } from "./types";

afterEach(cleanup);

// Chronological (oldest first), matching the component contract.
const LOGS: LogEntry[] = [
  { ts: "2026-06-30T16:23:40.000000000Z", level: "info", msg: "GET /api/a 200 8ms" },
  { ts: "2026-06-30T16:23:41.000000000Z", level: "warn", msg: "Rate limit approaching" },
  { ts: "2026-06-30T16:23:42.000000000Z", level: "error", msg: "GET /api/b 500" },
];

// The mono scroll surface inside the Surface card.
function scrollEl(container: HTMLElement): HTMLElement {
  return container.querySelector(".overflow-y-auto") as HTMLElement;
}

// jsdom reports zero layout; stub the metrics the scroll handler reads.
function stubMetrics(el: HTMLElement, metrics: { scrollHeight: number; clientHeight: number }) {
  Object.defineProperty(el, "scrollHeight", {
    get: () => metrics.scrollHeight,
    configurable: true,
  });
  Object.defineProperty(el, "clientHeight", {
    get: () => metrics.clientHeight,
    configurable: true,
  });
}

describe("ServiceLogcat load-older", () => {
  it("fires onLoadOlder from the button row", () => {
    const onLoadOlder = vi.fn();
    render(<ServiceLogcat logs={LOGS} onLoadOlder={onLoadOlder} hasOlder />);
    fireEvent.click(screen.getByText("Load older entries"));
    expect(onLoadOlder).toHaveBeenCalledTimes(1);
  });

  it("renders no affordance when hasOlder is false or onLoadOlder is absent", () => {
    const { rerender } = render(
      <ServiceLogcat logs={LOGS} onLoadOlder={() => {}} hasOlder={false} />,
    );
    expect(screen.queryByText("Load older entries")).not.toBeInTheDocument();
    rerender(<ServiceLogcat logs={LOGS} hasOlder />);
    expect(screen.queryByText("Load older entries")).not.toBeInTheDocument();
  });

  it("shows the loading state and suppresses re-fire while loadingOlder", () => {
    const onLoadOlder = vi.fn();
    const { container } = render(
      <ServiceLogcat logs={LOGS} onLoadOlder={onLoadOlder} hasOlder loadingOlder />,
    );
    const row = screen.getByText("Load older entries");
    expect(row.closest("button")).toBeDisabled();
    fireEvent.click(row);
    // Near-bottom scroll must not fire either while a page is in flight.
    // (Twice: the first event is consumed by the programmatic-scroll guard.)
    const el = scrollEl(container);
    stubMetrics(el, { scrollHeight: 1000, clientHeight: 200 });
    el.scrollTop = 790;
    fireEvent.scroll(el);
    fireEvent.scroll(el);
    expect(onLoadOlder).not.toHaveBeenCalled();
  });

  it("auto-fires once when scrolled near the bottom", () => {
    const onLoadOlder = vi.fn();
    const { container } = render(
      <ServiceLogcat logs={LOGS} onLoadOlder={onLoadOlder} hasOlder />,
    );
    const el = scrollEl(container);
    stubMetrics(el, { scrollHeight: 1000, clientHeight: 200 });
    el.scrollTop = 400; // far from the bottom
    fireEvent.scroll(el); // consumed by the programmatic-scroll guard
    fireEvent.scroll(el);
    expect(onLoadOlder).not.toHaveBeenCalled();
    el.scrollTop = 790; // 10px from the bottom
    fireEvent.scroll(el);
    fireEvent.scroll(el); // burst of events fires once
    expect(onLoadOlder).toHaveBeenCalledTimes(1);
  });

  it("keeps scrollTop when older rows append at the bottom, still offsets prepends", () => {
    const metrics = { scrollHeight: 400, clientHeight: 200 };
    const withSeq = (l: LogEntry, seq: number): LogEntry => ({ ...l, seq });
    const logs = LOGS.map((l, i) => withSeq(l, 10 + i));
    const { container, rerender } = render(
      <ServiceLogcat logs={logs} onLoadOlder={() => {}} hasOlder />,
    );
    const el = scrollEl(container);
    stubMetrics(el, metrics);
    fireEvent.click(screen.getByText("Live")); // stop tail-follow
    el.scrollTop = 150;
    fireEvent.scroll(el); // unpin from the top

    // Older page appended at the bottom: height grows below, scrollTop holds.
    metrics.scrollHeight = 600;
    const older: LogEntry[] = [
      withSeq({ ts: "2026-06-30T16:22:00.000000000Z", level: "info", msg: "older line" }, 1),
    ];
    rerender(<ServiceLogcat logs={[...older, ...logs]} onLoadOlder={() => {}} hasOlder />);
    expect(el.scrollTop).toBe(150);

    // Newer line prepended above: scrollTop offsets by the added height.
    metrics.scrollHeight = 800;
    const newer: LogEntry[] = [
      withSeq({ ts: "2026-06-30T16:24:00.000000000Z", level: "info", msg: "newer line" }, 99),
    ];
    rerender(
      <ServiceLogcat logs={[...older, ...logs, ...newer]} onLoadOlder={() => {}} hasOlder />,
    );
    expect(el.scrollTop).toBe(350);
  });

  it("renders seq-keyed rows, including repeated ts+msg lines", () => {
    const dup: LogEntry[] = [
      { seq: 1, ts: "2026-06-30T16:23:40.000000000Z", level: "info", msg: "retrying" },
      { seq: 2, ts: "2026-06-30T16:23:40.000000000Z", level: "info", msg: "retrying" },
    ];
    render(<ServiceLogcat logs={dup} />);
    expect(screen.getAllByText("retrying")).toHaveLength(2);
  });
});
