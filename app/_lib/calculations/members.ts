import {
  activeAjoGroup,
  ajoMembers,
  type ContributionRecord,
  type MemberContributionStatus,
  type PaymentStatus,
} from "../../_data/mockData";

export type MemberOverviewStatusFilter = "all" | PaymentStatus;

export type MemberOverviewRow = {
  id: string;
  fullName: string;
  amountDue: number;
  amountPaid: number;
  outstanding: number;
  status: MemberContributionStatus;
  dueDate: string | null;
  payoutOrder: number;
};

export function getMemberOverviewData(
  contributionRecords: readonly ContributionRecord[],
  search: string,
  statusFilter: MemberOverviewStatusFilter,
) {
  const memberRows: MemberOverviewRow[] = ajoMembers
    .filter(
      (member) =>
        member.groupId === activeAjoGroup.id &&
        member.isActive &&
        activeAjoGroup.memberIds.includes(member.id),
    )
    .map((member) => {
      const contribution = contributionRecords.find(
        (record) =>
          record.groupId === activeAjoGroup.id &&
          record.cycleId === activeAjoGroup.currentCycleId &&
          record.memberId === member.id,
      );
      const amountDue = activeAjoGroup.contributionAmount;
      const amountPaid =
        contribution?.status === "paid" ? contribution.amount : 0;

      return {
        id: member.id,
        fullName: member.fullName,
        amountDue,
        amountPaid,
        outstanding: Math.max(0, amountDue - amountPaid),
        status: contribution?.status ?? "unrecorded",
        dueDate: contribution?.dueDate ?? null,
        payoutOrder: member.payoutOrder,
      };
    });

  const query = search.trim().toLocaleLowerCase();
  const filteredMembers = memberRows.filter((member) => {
    const matchesSearch = member.fullName.toLocaleLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return {
    filteredMembers,
    hasFilters: search.length > 0 || statusFilter !== "all",
    memberRows,
  };
}
