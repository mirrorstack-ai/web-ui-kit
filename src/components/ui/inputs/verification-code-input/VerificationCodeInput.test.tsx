import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { VerificationCodeInput } from "./VerificationCodeInput";

afterEach(cleanup);

describe("VerificationCodeInput", () => {
  it("renders 6 input boxes by default", () => {
    render(<VerificationCodeInput value="" onChange={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  it("displays value in individual boxes", () => {
    render(<VerificationCodeInput value="123" onChange={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("3");
    expect(inputs[3]).toHaveValue("");
  });

  it("calls onChange on digit input", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput value="" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledWith("5");
  });

  it("calls onComplete when all digits entered", () => {
    const onComplete = vi.fn();
    const onChange = vi.fn();
    render(
      <VerificationCodeInput value="12345" onChange={onChange} onComplete={onComplete} />,
    );
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[5], { target: { value: "6" } });
    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("handles paste", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput value="" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => "123456" },
    });
    expect(onChange).toHaveBeenCalledWith("123456");
  });

  it("ignores non-digit input", () => {
    const onChange = vi.fn();
    render(<VerificationCodeInput value="" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "a" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("is disabled when disabled prop set", () => {
    render(<VerificationCodeInput value="" onChange={() => {}} disabled />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => expect(input).toBeDisabled());
  });

  it("applies error styling", () => {
    render(<VerificationCodeInput value="" onChange={() => {}} error />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => expect(input).toHaveClass("border-error"));
  });
});
