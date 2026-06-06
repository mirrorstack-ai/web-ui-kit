import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { ReadOnlyField } from "./ReadOnlyField";

afterEach(cleanup);

describe("ReadOnlyField", () => {
  it("renders label and value", () => {
    render(<ReadOnlyField label="Email" value="test@example.com" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("applies mono font when mono=true", () => {
    render(<ReadOnlyField label="ID" value="abc-123" mono />);
    expect(screen.getByText("abc-123")).toHaveClass("font-mono");
  });

  it("shows copy button when copyable", () => {
    render(<ReadOnlyField label="Key" value="secret" copyable />);
    expect(screen.getByLabelText("Copy Key")).toBeInTheDocument();
  });

  it("does not show copy button by default", () => {
    render(<ReadOnlyField label="Key" value="secret" />);
    expect(screen.queryByLabelText("Copy Key")).not.toBeInTheDocument();
  });

  it("calls navigator.clipboard.writeText on copy click", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const onCopy = vi.fn();
    render(<ReadOnlyField label="Key" value="secret" copyable onCopy={onCopy} />);
    fireEvent.click(screen.getByLabelText("Copy Key"));

    await vi.waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("secret");
      expect(onCopy).toHaveBeenCalledOnce();
    });
  });

  it("renders suffix content", () => {
    render(
      <ReadOnlyField label="Status" value="Active" suffix={<span data-testid="badge">Live</span>} />,
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ReadOnlyField label="Test" value="val" className="mt-4" />,
    );
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("renders the prefix slot before the value", () => {
    render(
      <ReadOnlyField
        label="Status"
        value="Connected"
        prefix={<span data-testid="dot">●</span>}
      />,
    );
    expect(screen.getByTestId("dot")).toBeInTheDocument();
  });

  it("renders stacked layout by default (label above value)", () => {
    const { container } = render(<ReadOnlyField label="Email" value="a@b.c" />);
    // The outer element does not get the inline flex wrapper.
    expect(container.firstChild).not.toHaveClass("flex");
  });

  it("renders inline layout when layout='inline' (label beside value)", () => {
    const { container } = render(
      <ReadOnlyField label="Email" value="a@b.c" layout="inline" />,
    );
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("supports copyable + prefix together in inline layout", () => {
    render(
      <ReadOnlyField
        label="Key"
        value="abc-123"
        layout="inline"
        copyable
        prefix={<span data-testid="dot">●</span>}
      />,
    );
    expect(screen.getByTestId("dot")).toBeInTheDocument();
    expect(screen.getByLabelText("Copy Key")).toBeInTheDocument();
  });
});
