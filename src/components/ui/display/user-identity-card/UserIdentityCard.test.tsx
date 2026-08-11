import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { UserIdentityCard } from "./UserIdentityCard";

afterEach(cleanup);

function renderCard(
  props: Partial<React.ComponentProps<typeof UserIdentityCard>> = {},
) {
  return render(
    <UserIdentityCard
      href="/users/ada"
      name="Ada Lovelace"
      email="ada@example.com"
      avatarUrl="https://example.com/ada.jpg"
      missingNameLabel="Deleted user"
      missingEmailLabel="Email unavailable"
      {...props}
    />,
  );
}

function openCard(triggerName = "Ada Lovelace") {
  fireEvent.focus(screen.getByRole("link", { name: triggerName }));
  return document.querySelector<HTMLElement>("[data-popover-content]")!;
}

describe("UserIdentityCard", () => {
  it("renders its own trigger as a real link", () => {
    renderCard();

    expect(
      screen.getByRole("link", { name: "Ada Lovelace" }),
    ).toHaveAttribute("href", "/users/ada");
  });

  it("renders the name inside the card as a real link", () => {
    renderCard();
    const card = openCard();

    expect(
      within(card).getByRole("link", { name: "Ada Lovelace" }),
    ).toHaveAttribute("href", "/users/ada");
  });

  it.each([
    ["plain text", "Audit actor"],
    ["an element", <span key="actor">Audit actor</span>],
  ])("wraps %s children in its own trigger link", (_, children) => {
    renderCard({ children });

    expect(screen.getByRole("link", { name: "Audit actor" })).toHaveAttribute(
      "href",
      "/users/ada",
    );
  });

  it("always shows avatar, display name, and email", () => {
    renderCard();
    const card = openCard();

    expect(within(card).getByText("Ada Lovelace")).toBeInTheDocument();
    expect(within(card).getByText("ada@example.com")).toBeInTheDocument();
    expect(card.querySelector("img")).toHaveAttribute(
      "src",
      "https://example.com/ada.jpg",
    );
  });

  // A consumer cannot restore this from the outside: it needs a descendant
  // selector, and arbitrary variants do not compile into the app modules'
  // scoped CSS bundles. So the separation has to be owned here.
  it("separates the name from the email rather than stacking them flush", () => {
    renderCard();
    const card = openCard();

    const email = within(card).getByText("ada@example.com");
    expect(email.parentElement).toHaveClass("space-y-1");
  });

  it("falls back through Avatar when no avatar URL is available", () => {
    renderCard({ avatarUrl: null });
    const card = openCard();

    expect(within(card).getByText("ADA")).toBeInTheDocument();
    expect(card.querySelector("img")).not.toBeInTheDocument();
  });

  it("renders the caller-localized missing-email label when email is absent", () => {
    renderCard({ email: null, missingEmailLabel: "No email on record" });
    const card = openCard();

    expect(within(card).getByText("No email on record")).toBeInTheDocument();
  });

  it("renders an honest caller-localized identity when the name is missing", () => {
    renderCard({ name: null, avatarUrl: null, missingNameLabel: "Former user" });
    const card = openCard("Former user");

    expect(within(card).getByText("Former user")).toBeInTheDocument();
    expect(within(card).getByText("FOR")).toBeInTheDocument();
  });

  it("truncates long names and email addresses", () => {
    const longName = "A very long display name that should never widen the card";
    const longEmail = "a-very-long-email-address@an-extremely-long-domain.example";
    renderCard({ name: longName, email: longEmail });
    const card = openCard(longName);

    expect(within(card).getByText(longName)).toHaveClass("truncate");
    expect(within(card).getByText(longEmail)).toHaveClass("truncate");
    expect(card).toHaveClass("w-72");
  });
});
