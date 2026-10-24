import {
  activeAjoGroup,
  ajoMembers,
  contributionCycles,
  type ContributionRecord,
  type PaymentStatus,
} from "../../_data/mockData";

export type ContributionHistoryStatusFilter = "all" | PaymentStatus;

export type ContributionHistoryFilters = {
  search: string;
  statusFilter: ContributionHistoryStatusFilter;
  cycleFilter: string;
  startDate: string;
  endDate: string;
};

export function calculateContributionHistoryTotals(
  records: readonly ContributionRecord[],
) {
  return records.reduce(
    (totals, record) => {
      totals.total += record.amount;
      if (record.status === "paid") totals.paid += record.amount;
      if (record.status === "pending" || record.status === "overdue") {
        totals.outstanding += record.amount;
      }
      return totals;
    },
    { total: 0, paid: 0, outstanding: 0 },
  );
}

export function getContributionHistoryData(
  contributionRecords: readonly ContributionRecord[],
  filters: ContributionHistoryFilters,
) {
  const groupRecords = contributionRecords
    .filter((record) => record.groupId === activeAjoGroup.id)
    .slice()
    .sort((a, b) => {
      const dateOrder = (b.paidAt ?? b.dueDate).localeCompare(
        a.paidAt ?? a.dueDate,
      );
      return dateOrder || a.id.localeCompare(b.id);
    });
  const availableCycleIds = new Set(
    groupRecords.map((record) => record.cycleId),
  );
  const availableCycles = contributionCycles.filter(
    (cycle) =>
      cycle.groupId === activeAjoGroup.id && availableCycleIds.has(cycle.id),
  );
  const query = filters.search.trim().toLocaleLowerCase();

  const visibleRecords = groupRecords
    .map((record) => {
      const member = ajoMembers.find((item) => item.id === record.memberId);
      const cycle = contributionCycles.find(
        (item) => item.id === record.cycleId,
      );
      const recordDate = record.paidAt ?? record.dueDate;
      const searchableText = [
        member?.fullName ?? "",
        cycle?.label ?? record.cycleId,
        record.status,
        recordDate,
        record.id,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return { record, member, cycle, recordDate, searchableText };
    })
    .filter(
      ({ record, recordDate, searchableText }) =>
        searchableText.includes(query) &&
        (filters.statusFilter === "all" ||
          record.status === filters.statusFilter) &&
        (filters.cycleFilter === "all" ||
          record.cycleId === filters.cycleFilter) &&
        (!filters.startDate || recordDate >= filters.startDate) &&
        (!filters.endDate || recordDate <= filters.endDate),
    );
  const visibleTotals = calculateContributionHistoryTotals(
    visibleRecords.map(({ record }) => record),
  );
  const hasFilters =
    filters.search.length > 0 ||
    filters.statusFilter !== "all" ||
    filters.cycleFilter !== "all" ||
    filters.startDate !== "" ||
    filters.endDate !== "";

  return {
    availableCycles,
    groupRecords,
    hasFilters,
    visibleRecords,
    visibleTotals,
  };
}
