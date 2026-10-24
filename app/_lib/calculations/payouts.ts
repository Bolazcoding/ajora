import {
  activeAjoGroup,
  ajoMembers,
  calculatePayoutAmount,
  contributionCycles,
  payoutSchedule,
  type PayoutStatus,
} from "../../_data/mockData";

export type PayoutScheduleStatusFilter = "all" | PayoutStatus;

export function getPayoutScheduleData(
  statusFilter: PayoutScheduleStatusFilter,
  cycleFilter: string,
) {
  const groupPayouts = payoutSchedule
    .filter((payout) => payout.groupId === activeAjoGroup.id)
    .slice()
    .sort((a, b) => a.turn - b.turn);
  const scheduledCycleIds = new Set(
    groupPayouts.map((payout) => payout.cycleId),
  );
  const availableCycles = contributionCycles.filter(
    (cycle) =>
      cycle.groupId === activeAjoGroup.id && scheduledCycleIds.has(cycle.id),
  );
  const nextPayout = groupPayouts
    .filter((payout) => payout.status === "upcoming")
    .slice()
    .sort(
      (a, b) => a.payoutDate.localeCompare(b.payoutDate) || a.turn - b.turn,
    )[0];
  const nextRecipient = ajoMembers.find(
    (member) => member.id === nextPayout?.recipientMemberId,
  );
  const nextCycle = contributionCycles.find(
    (cycle) => cycle.id === nextPayout?.cycleId,
  );
  const expectedPayoutAmount = calculatePayoutAmount();
  const visiblePayouts = groupPayouts
    .filter(
      (payout) =>
        (statusFilter === "all" || payout.status === statusFilter) &&
        (cycleFilter === "all" || payout.cycleId === cycleFilter),
    )
    .map((payout) => ({
      payout,
      recipient: ajoMembers.find(
        (member) => member.id === payout.recipientMemberId,
      ),
      cycle: contributionCycles.find((item) => item.id === payout.cycleId),
      isNext: payout.id === nextPayout?.id,
    }));

  return {
    availableCycles,
    expectedPayoutAmount,
    hasFilters: statusFilter !== "all" || cycleFilter !== "all",
    nextCycle,
    nextPayout,
    nextRecipient,
    visiblePayouts,
  };
}
