import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import MembersOverview from "./MembersOverview";
import { ContributionDemoProvider } from "../_state/ContributionDemoProvider";

function renderMembersPage() {
  return render(
    <ContributionDemoProvider>
      <MembersOverview />
    </ContributionDemoProvider>,
  );
}

function hasInertAncestor(element: HTMLElement) {
  let current: HTMLElement | null = element;
  while (current) {
    if (current.inert) return true;
    current = current.parentElement;
  }
  return false;
}

describe("RecordContributionDialog keyboard accessibility", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("moves focus into the named modal and makes the page behind it inert", async () => {
    const user = userEvent.setup();
    renderMembersPage();

    const opener = screen.getByRole("button", { name: "Record Contribution" });
    await user.click(opener);

    const dialog = screen.getByRole("dialog", { name: "Record contribution" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute(
      "aria-describedby",
      "record-contribution-description",
    );
    expect(
      within(dialog).getByRole("combobox", { name: "Member" }),
    ).toHaveFocus();
    expect(hasInertAncestor(opener)).toBe(true);

    opener.focus();
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("wraps Tab and Shift+Tab within the dialog and restores focus after Escape", async () => {
    const user = userEvent.setup();
    renderMembersPage();

    const opener = screen.getByRole("button", { name: "Record Contribution" });
    await user.click(opener);
    const dialog = screen.getByRole("dialog", { name: "Record contribution" });
    const closeButton = within(dialog).getByRole("button", {
      name: "Close record contribution dialog",
    });
    const submitButton = within(dialog).getByRole("button", {
      name: "Record demo contribution",
    });

    submitButton.focus();
    await user.tab();
    expect(closeButton).toHaveFocus();
    await user.tab({ shift: true });
    expect(submitButton).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(hasInertAncestor(opener)).toBe(false);
  });

  it("restores focus after the close button and successful contribution flow", async () => {
    const user = userEvent.setup();
    renderMembersPage();

    const opener = screen.getByRole("button", { name: "Record Contribution" });
    await user.click(opener);
    let dialog = screen.getByRole("dialog", { name: "Record contribution" });
    await user.click(
      within(dialog).getByRole("button", {
        name: "Close record contribution dialog",
      }),
    );
    expect(opener).toHaveFocus();

    await user.click(opener);
    dialog = screen.getByRole("dialog", { name: "Record contribution" });
    await user.selectOptions(
      within(dialog).getByRole("combobox", { name: "Member" }),
      "member-006",
    );
    await user.click(
      within(dialog).getByRole("button", {
        name: "Record demo contribution",
      }),
    );

    const confirmation = screen.getByRole("heading", {
      name: "Demo contribution recorded. The existing unpaid record was marked paid.",
    });
    expect(confirmation).toHaveFocus();
    expect(confirmation.closest('[role="dialog"]')).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Done" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
