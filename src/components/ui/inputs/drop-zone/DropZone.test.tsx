import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropZone } from "./DropZone";

function renderDropZone(
  props: Partial<Parameters<typeof DropZone>[0]> = {},
) {
  const onFiles = props.onFiles ?? vi.fn();
  return {
    onFiles,
    ...render(<DropZone onFiles={onFiles} {...props} />),
  };
}

describe("DropZone", () => {
  it("renders with default content", () => {
    const { getByText } = renderDropZone();
    expect(getByText("Drag and drop files here")).toBeInTheDocument();
    expect(getByText("or click to browse")).toBeInTheDocument();
  });

  it("calls onFiles when file input changes", () => {
    const onFiles = vi.fn();
    const { container } = renderDropZone({ onFiles });
    const input = container.querySelector(
      "input[type='file']",
    ) as HTMLInputElement;
    const file = new File(["hello"], "test.txt", { type: "text/plain" });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it("respects disabled state", () => {
    const { container } = renderDropZone({ disabled: true });
    const zone = container.firstChild as HTMLElement;
    expect(zone.getAttribute("aria-disabled")).toBe("true");
    expect(zone.getAttribute("class")).toContain("opacity-50");
  });
});
