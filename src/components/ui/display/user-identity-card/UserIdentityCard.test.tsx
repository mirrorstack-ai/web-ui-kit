import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { UserIdentityCard } from "./UserIdentityCard";

afterEach(cleanup);

function renderCard(
  props: Partial<React.ComponentProps<typeof UserIdentityCard>> = {},
) {
  return render(
    <UserIdentityCard
      name="Ada Lovelace"
      email="ada@example.com"
      avatarUrl="https://example.com/ada.jpg"
      missingNameLabel="Deleted user"
      missingEmailLabel="Email unavailable"
      {...props}
    >
      <a href="/users/ada">Ada profile</a>
    </UserIdentityCard>,
  );
}

function openCard() {
  fireEvent.focus(screen.getByRole("link", { name: "Ada profile" }));
  return document.querySelector<HTMLElement>("[data-popover-content]")!;
}

describe("UserIdentityCard", () => {
  it("uses the caller's children as the real profile trigger", () => {
    renderCard();
    const trigger = screen.getByRole("link", { name: "Ada profile" });

    expect(trigger).toHaveAttribute("href", "/users/ada");
    expect(screen.getAllByRole("link")).toHaveLength(1);
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
    const card = openCard();

    expect(within(card).getByText("Former user")).toBeInTheDocument();
    expect(within(card).getByText("FOR")).toBeInTheDocument();
  });

  it("truncates long names and email addresses", () => {
    const longName = "A very long display name that should never widen the card";
    const longEmail = "a-very-long-email-address@an-extremely-long-domain.example";
    renderCard({ name: longName, email: longEmail });
    const card = openCard();

    expect(within(card).getByText(longName)).toHaveClass("truncate");
    expect(within(card).getByText(longEmail)).toHaveClass("truncate");
    expect(card).toHaveClass("w-72");
  });
});
