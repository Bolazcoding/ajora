import {
  activeAjoGroup,
  ajoMembers,
  type ContributionRecord,
  type MemberContributionStatus,
  type PaymentStatus,
} from "../../_data/mockData";
import {
  getActiveGroupMembers,
  isContributionForMemberCycle,
} from "./shared";

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
  const memberRows: MemberOverviewRow[] = getActiveGroupMembers(
    ajoMembers,
    activeAjoGroup,
  ).map((member) => {
      const contribution = contributionRecords.find(
        (record) =>
          isContributionForMemberCycle(
            record,
            activeAjoGroup.id,
            member.id,
            activeAjoGroup.currentCycleId,
          ),
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
