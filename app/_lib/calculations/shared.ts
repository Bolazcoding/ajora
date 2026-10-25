import type {
  AjoGroup,
  AjoMember,
  ContributionRecord,
} from "../../_data/mockData";

export function getActiveGroupMembers(
  members: readonly AjoMember[],
  group: AjoGroup,
) {
  return members.filter(
    (member) =>
      member.groupId === group.id &&
      member.isActive &&
      group.memberIds.includes(member.id),
  );
}

export function isContributionForMemberCycle(
  record: ContributionRecord,
  groupId: string,
  memberId: string,
  cycleId: string,
) {
  return (
    record.groupId === groupId &&
    record.memberId === memberId &&
    record.cycleId === cycleId
  );
}

export function isPositiveWholeNairaAmount(amount: number) {
  return Number.isSafeInteger(amount) && amount > 0;
}

export function isValidIsoDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
}

export function isDateInContributionCycle(date: string, cycleId: string) {
  return date.startsWith(`${cycleId}-`);
}
