import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EditableField } from "./EditableField";

afterEach(cleanup);

describe("EditableField", () => {
  function setup(over: Partial<React.ComponentProps<typeof EditableField>> = {}) {
    const onEditToggle = vi.fn();
    const onChange = vi.fn();
    const utils = render(
      <EditableField
        id="name"
        label="Name"
        value="Alice"
        editing={false}
        onEditToggle={onEditToggle}
        onChange={onChange}
        {...over}
      />,
    );
    return { ...utils, onEditToggle, onChange };
  }

  it("read mode renders the value", () => {
    const { getByText } = setup();
    expect(getByText("Alice")).toBeInTheDocument();
  });

  it("read mode shows em-dash for empty value", () => {
    const { getByText } = setup({ value: "" });
    expect(getByText("—")).toBeInTheDocument();
  });

  it("read mode edit button calls onEditToggle", () => {
    const { getByLabelText, onEditToggle } = setup();
    fireEvent.click(getByLabelText("Edit Name"));
    expect(onEditToggle).toHaveBeenCalledOnce();
  });

  it("edit mode renders an input with the value", () => {
    const { getByLabelText } = setup({ editing: true });
    const input = getByLabelText("Name") as HTMLInputElement;
    expect(input.value).toBe("Alice");
  });

  it("edit mode typing fires onChange with the new value", () => {
    const { getByLabelText, onChange } = setup({ editing: true });
    const input = getByLabelText("Name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Bob" } });
    expect(onChange).toHaveBeenCalledWith("Bob");
  });

  it("edit mode check button calls onEditToggle", () => {
    const { getByLabelText, onEditToggle } = setup({ editing: true });
    fireEvent.click(getByLabelText("Done editing Name"));
    expect(onEditToggle).toHaveBeenCalledOnce();
  });

  it("edit mode shows error text when error is provided", () => {
    const { getByText } = setup({ editing: true, error: "Required" });
    expect(getByText("Required")).toBeInTheDocument();
  });

  it("edit mode hides error text when error is null", () => {
    const { queryByText } = setup({ editing: true, error: null });
    expect(queryByText("Required")).not.toBeInTheDocument();
  });
});
