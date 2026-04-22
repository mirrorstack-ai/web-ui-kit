import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Combobox } from "./Combobox";

afterEach(cleanup);

const options = ["Apple", "Banana", "Cherry"];

describe("Combobox", () => {
  it("renders with label", () => {
    render(<Combobox label="Fruit" value="" onChange={() => {}} options={options} />);
    expect(screen.getByLabelText("Fruit")).toBeInTheDocument();
  });

  it("shows options on focus", () => {
    render(<Combobox label="Fruit" value="" onChange={() => {}} options={options} />);
    fireEvent.focus(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeVisible();
  });

  it("calls onChange when option clicked", () => {
    const onChange = vi.fn();
    render(<Combobox label="Fruit" value="" onChange={onChange} options={options} />);
    fireEvent.focus(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Banana"));
    expect(onChange).toHaveBeenCalledWith("Banana");
  });

  it("filters options when typing", () => {
    render(<Combobox label="Fruit" value="" onChange={() => {}} options={options} />);
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "ch" } });
    expect(screen.getByText("Cherry")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("supports keyboard navigation", () => {
    const onChange = vi.fn();
    render(<Combobox label="Fruit" value="" onChange={onChange} options={options} />);
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("Apple");
  });

  it("closes on Escape", () => {
    render(<Combobox label="Fruit" value="" onChange={() => {}} options={options} />);
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    expect(screen.getByRole("listbox")).toBeVisible();
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.getByRole("listbox", { hidden: true })).not.toBeVisible();
  });

  it("renders helper text", () => {
    render(
      <Combobox label="Fruit" value="" onChange={() => {}} options={options} helperText="Pick one" />,
    );
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <Combobox label="Fruit" value="" onChange={() => {}} options={options} error helperText="Required" />,
    );
    expect(screen.getByText("Required")).toHaveClass("text-error");
  });

  it("is disabled when disabled prop set", () => {
    render(<Combobox label="Fruit" value="" onChange={() => {}} options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
