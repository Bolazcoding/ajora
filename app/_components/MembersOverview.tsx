"use client";

import { useState } from "react";
import DashboardShell from "./DashboardShell";
import { FiSearch, FiUsers } from "react-icons/fi";
import EmptyState from "../_ui/EmptyState";
import StatusBadge from "../_ui/StatusBadge";
import {
  activeAjoGroup,
  ajoMembers,
  contributionRecords,
  type MemberContributionStatus,
} from "../_data/mockData";
import { formatDate, formatNaira } from "../_ui/formatters";

type MemberRow = {
  id: string;
  fullName: string;
  amountDue: number;
  amountPaid: number;
  outstanding: number;
  status: MemberContributionStatus;
  dueDate: string | null;
  payoutOrder: number;
};

const statusFilters = [
  { value: "all", label: "All Members" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
] as const;
type StatusFilter = (typeof statusFilters)[number]["value"];

function MemberStatus({ status }: { status: MemberContributionStatus }) {
  if (status === "unrecorded") {
    return (
      <span className="inline-flex items-center rounded-full bg-surface-soft px-2.5 py-1 text-xs font-semibold text-text-secondary">
        Not recorded
      </span>
    );
  }

  return <StatusBadge status={status} />;
}

export default function MembersOverview() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const memberRows: MemberRow[] = ajoMembers
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
  const hasFilters = search.length > 0 || statusFilter !== "all";

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
  }

  return (
    <DashboardShell activeItem="Members">
      <div className="mx-auto pb-10 w-full max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Members
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
              View group members and track their contribution status.
            </p>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Record Contribution
          </button>
        </div>

        <section
          aria-label="Member list"
          className="mt-7 overflow-hidden rounded-2xl border border-border bg-white shadow-card sm:mt-8"
        >
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search members</span>
              <FiSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-text-muted"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search members..."
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 pl-10 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-secondary focus:ring-2 focus:ring-focus/20"
              />
            </label>

            <label className="flex w-full items-center gap-3 sm:w-auto">
              <span className="shrink-0 text-xs font-medium text-text-secondary sm:text-sm">
                Status
              </span>
              <select
                aria-label="Filter members by status"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
                className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-white px-3 text-sm font-medium text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 sm:w-44 sm:flex-none"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <EmptyState
                icon={FiUsers}
                title={hasFilters ? "No matching members" : "No members yet"}
                description={
                  hasFilters
                    ? "Try a different name or payment status."
                    : "Members added to your Ajo group will appear here."
                }
              />
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg px-3 py-2 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[54rem] border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-soft text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                      <th scope="col" className="px-6 py-4">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Amount Due
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Amount Paid
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Outstanding
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Due Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="text-sm">
                        <td className="px-6 py-4 font-semibold text-text-primary">
                          {member.fullName}
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {formatNaira(member.amountDue)}
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {formatNaira(member.amountPaid)}
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {formatNaira(member.outstanding)}
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {member.dueDate ? formatDate(member.dueDate) : "—"}
                        </td>
                        <td className="px-6 py-4">
                          <MemberStatus status={member.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="divide-y divide-border lg:hidden">
                {filteredMembers.map((member) => (
                  <li key={member.id} className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-text-primary">
                          {member.fullName}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                          Payout turn {member.payoutOrder}
                        </p>
                      </div>
                      <MemberStatus status={member.status} />
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                      <div>
                        <dt className="text-text-muted">Amount due</dt>
                        <dd className="mt-1 font-semibold text-text-primary">
                          {formatNaira(member.amountDue)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-text-muted">Amount paid</dt>
                        <dd className="mt-1 font-semibold text-text-primary">
                          {formatNaira(member.amountPaid)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-text-muted">Outstanding</dt>
                        <dd className="mt-1 font-semibold text-text-primary">
                          {formatNaira(member.outstanding)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-text-muted">Due date</dt>
                        <dd className="mt-1 font-semibold text-text-primary">
                          {member.dueDate ? formatDate(member.dueDate) : "—"}
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
