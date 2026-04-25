import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Alert } from "./Alert";

afterEach(cleanup);

describe("Alert", () => {
  it("renders with role=alert", () => {
    render(<Alert variant="info">Test message</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("renders the correct variant icon", () => {
    render(<Alert variant="error">Error</Alert>);
    expect(screen.getByText("error")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <Alert variant="success" title="Success!">
        Done
      </Alert>,
    );
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("shows dismiss button when onDismiss provided", () => {
    const onDismiss = vi.fn();
    render(
      <Alert variant="warning" onDismiss={onDismiss}>
        Warning
      </Alert>,
    );
    const btn = screen.getByLabelText("Dismiss");
    fireEvent.click(btn);
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("does not show dismiss button without onDismiss", () => {
    render(<Alert variant="info">Info</Alert>);
    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Alert variant="info" className="mt-4">
        Test
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveClass("mt-4");
  });

  it("renders override icon when icon prop is provided", () => {
    render(
      <Alert variant="info" icon="passkey">
        Set up a passkey
      </Alert>,
    );
    expect(screen.getByText("passkey")).toBeInTheDocument();
    expect(screen.queryByText("info")).not.toBeInTheDocument();
  });

  it("respects iconSize override", () => {
    render(
      <Alert variant="info" icon="passkey" iconSize={28}>
        Big icon
      </Alert>,
    );
    expect(screen.getByText("passkey")).toHaveStyle({ fontSize: "28px" });
  });

  it("uses default icon size of 20 when iconSize not provided", () => {
    render(<Alert variant="info">Default size</Alert>);
    expect(screen.getByText("info")).toHaveStyle({ fontSize: "20px" });
  });
});
