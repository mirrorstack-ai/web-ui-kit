// The dedicated react18 Vitest project runs this file against the real React 18
// renderer so Popover cannot silently regress to relying on React 19 ref props.
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { version } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "@/components/ui/actions/button/Button";

import { Popover } from "./Popover";

afterEach(cleanup);

function expectVisibleAndPositioned() {
  const content = document.querySelector<HTMLElement>("[data-popover-content]")!;
  expect(content.style.visibility).toBe("visible");
  expect(content.style.top).not.toBe("");
}

describe("Popover on React 18", () => {
  it("uses the React 18 renderer", () => {
    expect(version.startsWith("18.")).toBe(true);
  });

  it("positions from the kit's plain-function Button", () => {
    render(
      <Popover trigger={<Button variant="filled">Person</Button>}>
        <div>Identity details</div>
      </Popover>,
    );

    fireEvent.focus(screen.getByRole("button", { name: "Person" }));
    expectVisibleAndPositioned();
  });

  it("does not depend on the trigger accepting injected props", () => {
    function Plain() {
      return <button type="button">Person</button>;
    }

    render(
      <Popover trigger={<Plain />}>
        <div>Identity details</div>
      </Popover>,
    );

    fireEvent.focus(screen.getByRole("button", { name: "Person" }));
    expectVisibleAndPositioned();
  });
});
