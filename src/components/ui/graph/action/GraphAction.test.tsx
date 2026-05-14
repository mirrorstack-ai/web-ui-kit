import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { GraphAction } from "./GraphAction";

afterEach(cleanup);

describe("GraphAction", () => {
  it("fires onReplay and onFit when their buttons are clicked", () => {
    const onReplay = vi.fn();
    const onFit = vi.fn();
    const { getByRole } = render(
      <GraphAction onReplay={onReplay} onFit={onFit} />,
    );
    fireEvent.click(getByRole("button", { name: "Replay layout" }));
    fireEvent.click(getByRole("button", { name: "Fit content" }));
    expect(onReplay).toHaveBeenCalledTimes(1);
    expect(onFit).toHaveBeenCalledTimes(1);
  });

  it("toggles the play icon between motion_play and stop_circle on each click", () => {
    const { getByRole } = render(
      <GraphAction onReplay={() => {}} onFit={() => {}} />,
    );
    expect(getByRole("button", { name: "Replay layout" })).toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: "Replay layout" }));
    expect(getByRole("button", { name: "Stop layout" })).toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: "Stop layout" }));
    expect(getByRole("button", { name: "Replay layout" })).toBeInTheDocument();
  });

  it("hides the settings button when onSettings is not provided", () => {
    const { queryByRole } = render(
      <GraphAction onReplay={() => {}} onFit={() => {}} />,
    );
    expect(queryByRole("button", { name: "Graph settings" })).toBeNull();
  });

  it("renders the settings button when onSettings is provided", () => {
    const onSettings = vi.fn();
    const { getByRole } = render(
      <GraphAction
        onReplay={() => {}}
        onFit={() => {}}
        onSettings={onSettings}
      />,
    );
    fireEvent.click(getByRole("button", { name: "Graph settings" }));
    expect(onSettings).toHaveBeenCalledTimes(1);
  });
});
