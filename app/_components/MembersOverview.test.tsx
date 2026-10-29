import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import MembersOverview from "./MembersOverview";
import { ContributionDemoProvider } from "../_state/ContributionDemoProvider";
import { activeAjoGroup, contributionRecords } from "../_data/mockData";
import { applyDemoContribution } from "../_state/ContributionDemoProvider";

function renderMembersOverview() {
  return render(
    <ContributionDemoProvider>
      <MembersOverview />
    </ContributionDemoProvider>,
  );
}

describe("MembersOverview", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders representative member payment data from the shared sample records", () => {
    renderMembersOverview();

    expect(
      screen.getByRole("heading", { name: "Members" }),
    ).toBeInTheDocument();

    const aminaRow = screen
      .getAllByRole("row")
      .find((row) => within(row).queryByText("Amina Yusuf"));

    expect(aminaRow).toBeDefined();
    expect(aminaRow).toHaveTextContent("₦50,000");
    expect(aminaRow).toHaveTextContent("Paid");
    expect(screen.getAllByText("Kunle Adebayo").length).toBeGreaterThan(0);
  });

  it("combines member search with status filtering and clears both filters", async () => {
    const user = userEvent.setup();
    renderMembersOverview();

    await user.type(
      screen.getByRole("searchbox", { name: "Search members" }),
      "Kunle",
    );
    expect(screen.getAllByText("Kunle Adebayo").length).toBeGreaterThan(0);
    expect(screen.queryByText("Amina Yusuf")).not.toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Filter members by status" }),
      "overdue",
    );

    expect(screen.getByText("No matching members")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(
      screen.getByRole("searchbox", { name: "Search members" }),
    ).toHaveValue("");
    expect(
      screen.getByRole("combobox", { name: "Filter members by status" }),
    ).toHaveValue("all");
    expect(screen.getAllByText("Amina Yusuf").length).toBeGreaterThan(0);
  });
});

describe("applyDemoContribution", () => {
  it("marks an existing pending demo contribution as paid without duplicating the record", () => {
    const input = {
      memberId: "member-006",
      cycleId: activeAjoGroup.currentCycleId,
      amount: activeAjoGroup.contributionAmount,
      paidAt: "2026-10-27",
    };

    const outcome = applyDemoContribution(contributionRecords, input);

    expect(outcome.result).toMatchObject({ ok: true, action: "updated" });
    expect(outcome.contributionRecords).toHaveLength(
      contributionRecords.length,
    );
    expect(
      outcome.contributionRecords.filter(
        (record) =>
          record.memberId === input.memberId &&
          record.cycleId === input.cycleId,
      ),
    ).toHaveLength(1);
    expect(
      outcome.contributionRecords.find(
        (record) =>
          record.memberId === input.memberId &&
          record.cycleId === input.cycleId,
      ),
    ).toMatchObject({
      status: "paid",
      amount: activeAjoGroup.contributionAmount,
      paidAt: input.paidAt,
    });
  });

  it("rejects an invalid contribution amount without changing the input records", () => {
    const outcome = applyDemoContribution(contributionRecords, {
      memberId: "member-006",
      cycleId: activeAjoGroup.currentCycleId,
      amount: 25_000,
      paidAt: "2026-10-27",
    });

    expect(outcome.result).toMatchObject({
      ok: false,
      error: "The contribution for this group is ₦50,000.",
    });
    expect(outcome.contributionRecords).toBe(contributionRecords);
  });
});
