import {
  type AjoGroup,
  type ContributionCycle,
  type ContributionRecord,
} from "../../_data/mockData";
import {
  isContributionForMemberCycle,
  isDateInContributionCycle,
  isPositiveWholeNairaAmount,
  isValidIsoDate,
} from "./shared";

export type RecordContributionFormErrors = Partial<
  Record<"member" | "cycle" | "amount" | "date", string>
>;

export function getAvailableContributionCycles(
  cycles: readonly ContributionCycle[],
  group: AjoGroup,
) {
  return cycles.filter(
    (cycle) => cycle.groupId === group.id && cycle.status !== "completed",
  );
}

export function getContributionCycleDateRange(cycleId: string) {
  const [cycleYear, cycleMonth] = cycleId.split("-").map(Number);
  const lastDate = new Date(Date.UTC(cycleYear, cycleMonth, 0))
    .toISOString()
    .slice(0, 10);

  return { min: `${cycleId}-01`, max: lastDate };
}

export function hasPaidContributionRecord(
  records: readonly ContributionRecord[],
  groupId: string,
  memberId: string,
  cycleId: string,
) {
  return records.some(
    (record) =>
      isContributionForMemberCycle(record, groupId, memberId, cycleId) &&
      record.status === "paid",
  );
}

export function validateRecordContributionForm(input: {
  memberId: string;
  cycleId: string;
  amount: string;
  paidAt: string;
  selectedCycle: ContributionCycle | undefined;
  contributionAmount: number;
  formattedContributionAmount: string;
  groupId: string;
  contributionRecords: readonly ContributionRecord[];
}) {
  const errors: RecordContributionFormErrors = {};
  const parsedAmount = Number(input.amount);

  if (!input.memberId) errors.member = "Choose a group member.";
  if (!input.cycleId || !input.selectedCycle) {
    errors.cycle = "Choose a contribution period.";
  }
  if (
    !input.amount.trim() ||
    !isPositiveWholeNairaAmount(parsedAmount)
  ) {
    errors.amount = "Enter a valid whole-naira contribution amount.";
  } else if (parsedAmount !== input.contributionAmount) {
    errors.amount = `The contribution for this group is ${input.formattedContributionAmount}.`;
  }

  const isValidPaidAt = isValidIsoDate(input.paidAt);
  if (!input.paidAt || !isValidPaidAt) {
    errors.date = "Choose the date the contribution was recorded.";
  } else if (
    !input.selectedCycle ||
    !isDateInContributionCycle(input.paidAt, input.selectedCycle.id)
  ) {
    errors.date = "Choose a date within the selected contribution period.";
  }

  if (
    input.memberId &&
    hasPaidContributionRecord(
      input.contributionRecords,
      input.groupId,
      input.memberId,
      input.cycleId,
    )
  ) {
    errors.member = "This member is already paid for that period.";
  }

  return { errors, parsedAmount };
}
