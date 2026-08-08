import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Alert } from "./Alert";

afterEach(cleanup);

describe("Alert", () => {
  it("renders with role=alert", () => {
    render(<Alert variant="success">Test message</Alert>);
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
    render(<Alert variant="success">Info</Alert>);
    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
  });

  it("renders the action node when provided", () => {
    render(
      <Alert variant="warning" title="Update available" action={<button>Update</button>}>
        Version 1.4.0 is ready.
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("renders the reload control when onReload is set", () => {
    render(
      <Alert variant="error" onReload={() => {}}>
        Could not load data
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Reload" })).toBeInTheDocument();
    expect(screen.getByText("refresh")).toBeInTheDocument();
  });

  it("does not render the reload control when onReload is absent", () => {
    render(<Alert variant="error">Could not load data</Alert>);
    expect(screen.queryByRole("button", { name: "Reload" })).not.toBeInTheDocument();
  });

  it("fires onReload once when the reload control is clicked", () => {
    const onReload = vi.fn();
    render(
      <Alert variant="error" onReload={onReload}>
        Could not load data
      </Alert>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Reload" }));
    expect(onReload).toHaveBeenCalledOnce();
  });

  it("disables the reload control and does not fire onReload when reloadPending", () => {
    const onReload = vi.fn();
    render(
      <Alert variant="error" onReload={onReload} reloadPending>
        Could not load data
      </Alert>,
    );
    const reload = screen.getByRole("button", { name: "Reload" });
    expect(reload).toBeDisabled();
    expect(screen.queryByText("refresh")).not.toBeInTheDocument();
    fireEvent.click(reload);
    expect(onReload).not.toHaveBeenCalled();
  });

  it("uses the default reload accessible name and supports a custom reloadLabel", () => {
    const { rerender } = render(
      <Alert variant="error" onReload={() => {}}>
        Could not load data
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Reload" })).toBeInTheDocument();

    rerender(
      <Alert variant="error" onReload={() => {}} reloadLabel="Try again">
        Could not load data
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Reload" })).not.toBeInTheDocument();
  });

  it("keeps action, reload, and dismiss controls individually addressable", () => {
    const onAction = vi.fn();
    const onReload = vi.fn();
    const onDismiss = vi.fn();
    render(
      <Alert
        variant="error"
        action={<button onClick={onAction}>View details</button>}
        onReload={onReload}
        reloadLabel="Try again"
        onDismiss={onDismiss}
      >
        Could not load data
      </Alert>,
    );

    const buttons = within(screen.getByRole("alert")).getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveAccessibleName("View details");
    expect(buttons[1]).toHaveAccessibleName("Try again");
    expect(buttons[2]).toHaveAccessibleName("Dismiss");

    fireEvent.click(screen.getByRole("button", { name: "View details" }));
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(onAction).toHaveBeenCalledOnce();
    expect(onReload).toHaveBeenCalledOnce();
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("applies custom className", () => {
    render(
      <Alert variant="success" className="mt-4">
        Test
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveClass("mt-4");
  });

  it("renders override icon when icon prop is provided", () => {
    render(
      <Alert variant="success" icon="passkey">
        Set up a passkey
      </Alert>,
    );
    expect(screen.getByText("passkey")).toBeInTheDocument();
    expect(screen.queryByText("check_circle")).not.toBeInTheDocument();
  });

  it("respects iconSize override", () => {
    render(
      <Alert variant="success" icon="passkey" iconSize={28}>
        Big icon
      </Alert>,
    );
    expect(screen.getByText("passkey")).toHaveStyle({ fontSize: "28px" });
  });

  it("uses default icon size of 20 when iconSize not provided", () => {
    render(<Alert variant="success">Default size</Alert>);
    expect(screen.getByText("check_circle")).toHaveStyle({ fontSize: "20px" });
  });

  it("hides leading icon and drops content margin when hideIcon is set", () => {
    render(
      <Alert variant="error" hideIcon>
        Hidden icon
      </Alert>,
    );
    // The variant-default icon name "error" should not render as a child.
    expect(screen.queryByText("error")).not.toBeInTheDocument();
    const text = screen.getByText("Hidden icon");
    // Without an icon there's nothing to offset, so the content container
    // must drop its ml-3 — otherwise the alert sits with phantom left padding.
    expect(text.parentElement).not.toHaveClass("ml-3");
  });
});
