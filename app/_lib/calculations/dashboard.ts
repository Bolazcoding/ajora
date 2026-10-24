import {
  activeAjoGroup,
  ajoMembers,
  calculatePayoutAmount,
  contributionCycles,
  getCycleContributionSummary,
  payoutSchedule,
  type ContributionRecord,
} from "../../_data/mockData";

export function getDashboardOverviewData(
  contributionRecords: readonly ContributionRecord[],
) {
  const cycle = contributionCycles.find(
    (item) => item.id === activeAjoGroup.currentCycleId,
  );
  const cycleSummary = getCycleContributionSummary(
    activeAjoGroup.currentCycleId,
    activeAjoGroup,
    ajoMembers,
    contributionRecords,
  );
  const activeMembers = ajoMembers.filter(
    (member) => member.groupId === activeAjoGroup.id && member.isActive,
  );
  const upcomingPayout = payoutSchedule.find(
    (payout) =>
      payout.groupId === activeAjoGroup.id &&
      payout.cycleId === activeAjoGroup.currentCycleId &&
      payout.status === "upcoming",
  );
  const payoutRecipient = ajoMembers.find(
    (member) => member.id === upcomingPayout?.recipientMemberId,
  );
  const currentContributions = contributionRecords.filter(
    (record) =>
      record.groupId === activeAjoGroup.id &&
      record.cycleId === activeAjoGroup.currentCycleId,
  );
  const recentContributions = currentContributions.map((record) => ({
    record,
    member: ajoMembers.find((item) => item.id === record.memberId),
  }));
  const contributionProgressPercent = cycleSummary.expectedAmount
    ? Math.min(
        100,
        Math.round(
          (cycleSummary.paidAmount / cycleSummary.expectedAmount) * 100,
        ),
      )
    : 0;

  return {
    activeMembers,
    contributionProgressPercent,
    cycle,
    cycleSummary,
    frequencyLabel:
      activeAjoGroup.frequency[0].toUpperCase() +
      activeAjoGroup.frequency.slice(1),
    payoutAmount: calculatePayoutAmount(),
    payoutRecipient,
    recentContributions,
    upcomingPayout,
  };
}
