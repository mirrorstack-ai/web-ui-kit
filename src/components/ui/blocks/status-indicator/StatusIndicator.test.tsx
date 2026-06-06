import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { StatusIndicator } from "./StatusIndicator";

afterEach(cleanup);

describe("StatusIndicator", () => {
  it("renders the dot (no icon) by default", () => {
    const { container } = render(
      <StatusIndicator status="online" label="API" />,
    );
    // Icon renders its name as text; absent in dot mode.
    expect(screen.queryByText("cloud")).not.toBeInTheDocument();
    // The dot is a rounded-full span.
    expect(
      container.querySelector("[class*='rounded-full']"),
    ).toBeInTheDocument();
  });

  it("renders an icon when icon prop is provided", () => {
    render(<StatusIndicator status="online" label="API" icon="cloud" />);
    expect(screen.getByText("cloud")).toBeInTheDocument();
  });

  it("pulses by default for online", () => {
    const { container } = render(
      <StatusIndicator status="online" label="API" />,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("pulses by default for warning", () => {
    const { container } = render(
      <StatusIndicator status="warning" label="API" />,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("does not pulse by default for offline, error, and unknown", () => {
    for (const status of ["offline", "error", "unknown"] as const) {
      const { container } = render(
        <StatusIndicator status={status} label="API" />,
      );
      expect(container.querySelector(".animate-pulse")).not.toBeInTheDocument();
      cleanup();
    }
  });

  it("honors an explicit pulse override", () => {
    const { container } = render(
      <StatusIndicator status="offline" label="API" pulse />,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders offline and unknown dots at different opacities", () => {
    const offline = render(
      <StatusIndicator status="offline" label="API" />,
    ).container.querySelector("[class*='opacity-30']");
    expect(offline).toBeInTheDocument();
    cleanup();
    const unknown = render(
      <StatusIndicator status="unknown" label="API" />,
    ).container.querySelector("[class*='opacity-20']");
    expect(unknown).toBeInTheDocument();
  });

  it("exposes an sr-only status name for each status", () => {
    const cases: [Parameters<typeof StatusIndicator>[0]["status"], string][] = [
      ["online", "Status: Online"],
      ["offline", "Status: Offline"],
      ["warning", "Status: Warning"],
      ["error", "Status: Error"],
      ["unknown", "Status: Unknown"],
    ];
    for (const [status, text] of cases) {
      render(<StatusIndicator status={status} label="API" />);
      expect(screen.getByText(text)).toBeInTheDocument();
      cleanup();
    }
  });

  it("threads an aria-label onto the icon branch", () => {
    render(<StatusIndicator status="offline" label="API" icon="cloud_off" />);
    expect(screen.getByLabelText("Offline")).toBeInTheDocument();
  });

  it("exposes role=status on the root", () => {
    render(<StatusIndicator status="online" label="API" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders label and sub", () => {
    render(<StatusIndicator status="online" label="API" sub="us-east-1" />);
    expect(screen.getByText("API")).toBeInTheDocument();
    expect(screen.getByText("us-east-1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatusIndicator status="online" label="API" className="mt-4" />,
    );
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
