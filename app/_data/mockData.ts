/**
 * Central sample dataset for the Ajora frontend demo.
 * Monetary values are whole naira amounts (not kobo).
 */

export type NairaAmount = number;

export type PaymentStatus = "paid" | "pending" | "overdue";

export type MemberContributionStatus = PaymentStatus | "unrecorded";

export type PayoutStatus = "completed" | "upcoming";

export type CycleStatus = "completed" | "current" | "upcoming";

export type ContributionFrequency = "weekly" | "fortnightly" | "monthly";

export type AjoGroup = {
  id: string;
  name: string;
  currency: "NGN";
  contributionAmount: NairaAmount;
  frequency: ContributionFrequency;
  contributionDueDay: number;
  startDate: string;
  currentCycleId: string;
  memberIds: readonly string[];
};

export type AjoMember = {
  id: string;
  groupId: string;
  fullName: string;
  joinedAt: string;
  payoutOrder: number;
  isActive: boolean;
};

export type ContributionCycle = {
  id: string;
  groupId: string;
  label: string;
  contributionDueDate: string;
  status: CycleStatus;
};

export type ContributionRecord = {
  id: string;
  groupId: string;
  memberId: string;
  cycleId: string;
  amount: NairaAmount;
  dueDate: string;
  status: PaymentStatus;
  paidAt: string | null;
};

export type PayoutRecord = {
  id: string;
  groupId: string;
  cycleId: string;
  turn: number;
  recipientMemberId: string;
  payoutDate: string;
  status: PayoutStatus;
  completedAt: string | null;
};

export type CycleContributionSummary = {
  cycleId: string;
  memberCount: number;
  recordedMemberCount: number;
  expectedAmount: NairaAmount;
  paidAmount: NairaAmount;
  pendingAmount: NairaAmount;
  overdueAmount: NairaAmount;
  unrecordedAmount: NairaAmount;
  outstandingAmount: NairaAmount;
};

export const activeAjoGroup: AjoGroup = {
  id: "ajo-lagos-circle",
  name: "The Prosperity Group",
  currency: "NGN",
  contributionAmount: 50_000,
  frequency: "monthly",
  contributionDueDay: 10,
  startDate: "2026-06-01",
  currentCycleId: "2026-10",
  memberIds: [
    "member-001",
    "member-002",
    "member-003",
    "member-004",
    "member-005",
    "member-006",
  ],
};

export const ajoMembers: readonly AjoMember[] = [
  {
    id: "member-001",
    groupId: activeAjoGroup.id,
    fullName: "Amina Yusuf",
    joinedAt: "2026-05-25",
    payoutOrder: 1,
    isActive: true,
  },
  {
    id: "member-002",
    groupId: activeAjoGroup.id,
    fullName: "Chidi Okafor",
    joinedAt: "2026-05-25",
    payoutOrder: 2,
    isActive: true,
  },
  {
    id: "member-003",
    groupId: activeAjoGroup.id,
    fullName: "Tunde Adeyemi",
    joinedAt: "2026-05-26",
    payoutOrder: 3,
    isActive: true,
  },
  {
    id: "member-004",
    groupId: activeAjoGroup.id,
    fullName: "Ifeoma Nwosu",
    joinedAt: "2026-05-27",
    payoutOrder: 4,
    isActive: true,
  },
  {
    id: "member-005",
    groupId: activeAjoGroup.id,
    fullName: "Zainab Bello",
    joinedAt: "2026-05-28",
    payoutOrder: 5,
    isActive: true,
  },
  {
    id: "member-006",
    groupId: activeAjoGroup.id,
    fullName: "Kunle Adebayo",
    joinedAt: "2026-05-29",
    payoutOrder: 6,
    isActive: true,
  },
];

export const contributionCycles: readonly ContributionCycle[] = [
  {
    id: "2026-06",
    groupId: activeAjoGroup.id,
    label: "June 2026",
    contributionDueDate: "2026-06-10",
    status: "completed",
  },
  {
    id: "2026-07",
    groupId: activeAjoGroup.id,
    label: "July 2026",
    contributionDueDate: "2026-07-10",
    status: "completed",
  },
  {
    id: "2026-08",
    groupId: activeAjoGroup.id,
    label: "August 2026",
    contributionDueDate: "2026-08-10",
    status: "completed",
  },
  {
    id: "2026-09",
    groupId: activeAjoGroup.id,
    label: "September 2026",
    contributionDueDate: "2026-09-10",
    status: "completed",
  },
  {
    id: "2026-10",
    groupId: activeAjoGroup.id,
    label: "October 2026",
    contributionDueDate: "2026-10-10",
    status: "current",
  },
  {
    id: "2026-11",
    groupId: activeAjoGroup.id,
    label: "November 2026",
    contributionDueDate: "2026-11-10",
    status: "upcoming",
  },
];

const completedCycleIds = ["2026-06", "2026-07", "2026-08", "2026-09"] as const;

const historicalContributions: ContributionRecord[] = completedCycleIds.flatMap(
  (cycleId) =>
    ajoMembers.map((member, index) => ({
      id: `contribution-${cycleId}-${member.id}`,
      groupId: activeAjoGroup.id,
      memberId: member.id,
      cycleId,
      amount: activeAjoGroup.contributionAmount,
      dueDate: `${cycleId}-${String(activeAjoGroup.contributionDueDay).padStart(2, "0")}`,
      status: "paid",
      paidAt: `${cycleId}-${String(7 + (index % 4)).padStart(2, "0")}`,
    })),
);

const currentCyclePayments: ReadonlyArray<{
  memberId: string;
  status: PaymentStatus;
  dueDate: string;
  paidAt: string | null;
}> = [
  {
    memberId: "member-001",
    status: "paid",
    dueDate: "2026-10-10",
    paidAt: "2026-10-08",
  },
  {
    memberId: "member-002",
    status: "paid",
    dueDate: "2026-10-10",
    paidAt: "2026-10-09",
  },
  {
    memberId: "member-003",
    status: "paid",
    dueDate: "2026-10-10",
    paidAt: "2026-10-09",
  },
  {
    memberId: "member-004",
    status: "paid",
    dueDate: "2026-10-10",
    paidAt: "2026-10-10",
  },
  {
    memberId: "member-005",
    status: "overdue",
    dueDate: "2026-10-10",
    paidAt: null,
  },
  // This member has an agreed extension through October 28.
  {
    memberId: "member-006",
    status: "pending",
    dueDate: "2026-10-28",
    paidAt: null,
  },
];

const currentCycleContributions: ContributionRecord[] =
  currentCyclePayments.map(({ memberId, status, dueDate, paidAt }) => ({
    id: `contribution-2026-10-${memberId}`,
    groupId: activeAjoGroup.id,
    memberId,
    cycleId: "2026-10",
    amount: activeAjoGroup.contributionAmount,
    dueDate,
    status,
    paidAt,
  }));

const upcomingCycleContributions: ContributionRecord[] = ajoMembers.map(
  (member) => ({
    id: `contribution-2026-11-${member.id}`,
    groupId: activeAjoGroup.id,
    memberId: member.id,
    cycleId: "2026-11",
    amount: activeAjoGroup.contributionAmount,
    dueDate: "2026-11-10",
    status: "pending",
    paidAt: null,
  }),
);

export const contributionRecords: readonly ContributionRecord[] = [
  ...historicalContributions,
  ...currentCycleContributions,
  ...upcomingCycleContributions,
];

export const payoutSchedule: readonly PayoutRecord[] = [
  {
    id: "payout-2026-06",
    groupId: activeAjoGroup.id,
    cycleId: "2026-06",
    turn: 1,
    recipientMemberId: "member-001",
    payoutDate: "2026-06-15",
    status: "completed",
    completedAt: "2026-06-15",
  },
  {
    id: "payout-2026-07",
    groupId: activeAjoGroup.id,
    cycleId: "2026-07",
    turn: 2,
    recipientMemberId: "member-002",
    payoutDate: "2026-07-15",
    status: "completed",
    completedAt: "2026-07-15",
  },
  {
    id: "payout-2026-08",
    groupId: activeAjoGroup.id,
    cycleId: "2026-08",
    turn: 3,
    recipientMemberId: "member-003",
    payoutDate: "2026-08-15",
    status: "completed",
    completedAt: "2026-08-15",
  },
  {
    id: "payout-2026-09",
    groupId: activeAjoGroup.id,
    cycleId: "2026-09",
    turn: 4,
    recipientMemberId: "member-004",
    payoutDate: "2026-09-15",
    status: "completed",
    completedAt: "2026-09-15",
  },
  {
    id: "payout-2026-10",
    groupId: activeAjoGroup.id,
    cycleId: "2026-10",
    turn: 5,
    recipientMemberId: "member-005",
    payoutDate: "2026-10-30",
    status: "upcoming",
    completedAt: null,
  },
  {
    id: "payout-2026-11",
    groupId: activeAjoGroup.id,
    cycleId: "2026-11",
    turn: 6,
    recipientMemberId: "member-006",
    payoutDate: "2026-11-30",
    status: "upcoming",
    completedAt: null,
  },
];

export function getMemberContributionStatus(
  memberId: string,
  cycleId: string,
): MemberContributionStatus {
  return (
    contributionRecords.find(
      (record) => record.memberId === memberId && record.cycleId === cycleId,
    )?.status ?? "unrecorded"
  );
}

export function getCycleContributionSummary(
  cycleId: string,
  group: AjoGroup = activeAjoGroup,
  members: readonly AjoMember[] = ajoMembers,
  records: readonly ContributionRecord[] = contributionRecords,
): CycleContributionSummary {
  const memberIds = new Set(
    members
      .filter((member) => member.groupId === group.id && member.isActive)
      .map((member) => member.id),
  );
  const cycleRecords = records.filter(
    (record) =>
      record.groupId === group.id &&
      record.cycleId === cycleId &&
      memberIds.has(record.memberId),
  );
  const sumByStatus = (status: PaymentStatus) =>
    cycleRecords
      .filter((record) => record.status === status)
      .reduce((total, record) => total + record.amount, 0);

  const paidAmount = sumByStatus("paid");
  const pendingAmount = sumByStatus("pending");
  const overdueAmount = sumByStatus("overdue");
  const expectedAmount = group.contributionAmount * memberIds.size;
  const recordedAmount = cycleRecords.reduce(
    (total, record) => total + record.amount,
    0,
  );

  return {
    cycleId,
    memberCount: memberIds.size,
    recordedMemberCount: new Set(cycleRecords.map((record) => record.memberId))
      .size,
    expectedAmount,
    paidAmount,
    pendingAmount,
    overdueAmount,
    unrecordedAmount: Math.max(0, expectedAmount - recordedAmount),
    outstandingAmount: Math.max(0, expectedAmount - paidAmount),
  };
}

export function calculatePayoutAmount(
  group: AjoGroup = activeAjoGroup,
  members: readonly AjoMember[] = ajoMembers,
): NairaAmount {
  const activeMemberCount = members.filter(
    (member) =>
      member.groupId === group.id &&
      member.isActive &&
      group.memberIds.includes(member.id),
  ).length;

  return group.contributionAmount * activeMemberCount;
}
