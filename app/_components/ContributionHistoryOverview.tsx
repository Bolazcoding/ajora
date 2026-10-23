"use client";

import { useState } from "react";
import DashboardShell from "./DashboardShell";
import { FiCalendar, FiClock, FiSearch } from "react-icons/fi";
import EmptyState from "../_ui/EmptyState";
import StatusBadge from "../_ui/StatusBadge";
import {
  activeAjoGroup,
  ajoMembers,
  contributionCycles,
  contributionRecords,
  type PaymentStatus,
} from "../_data/mockData";
import { formatDate, formatNaira } from "../_ui/formatters";

type StatusFilter = "all" | PaymentStatus;

const statusFilters = [
  { value: "all", label: "All statuses" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
] as const;

const summaryCards = [
  { key: "total", label: "Total value in view", icon: null },
  { key: "paid", label: "Paid in view", icon: FiCalendar },
  { key: "outstanding", label: "Outstanding in view", icon: FiClock },
] as const;

export default function ContributionHistoryOverview() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [cycleFilter, setCycleFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
  const query = search.trim().toLocaleLowerCase();

  const visibleRecords = groupRecords.filter((record) => {
    const member = ajoMembers.find((item) => item.id === record.memberId);
    const cycle = contributionCycles.find((item) => item.id === record.cycleId);
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

    return (
      searchableText.includes(query) &&
      (statusFilter === "all" || record.status === statusFilter) &&
      (cycleFilter === "all" || record.cycleId === cycleFilter) &&
      (!startDate || recordDate >= startDate) &&
      (!endDate || recordDate <= endDate)
    );
  });

  const visibleTotals = visibleRecords.reduce(
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

  const hasFilters =
    search.length > 0 ||
    statusFilter !== "all" ||
    cycleFilter !== "all" ||
    startDate !== "" ||
    endDate !== "";

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setCycleFilter("all");
    setStartDate("");
    setEndDate("");
  }

  return (
    <DashboardShell activeItem="Contribution History">
      <div className="mx-auto pb-10 w-full max-w-6xl">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Contribution History
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
            Review contribution records for {activeAjoGroup.name}.
          </p>
        </div>

        <section
          aria-label="Contribution summary for the current view"
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {summaryCards.map(({ key, label, icon: Icon }) => (
            <article
              key={key}
              className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="max-w-[13rem] text-sm font-medium leading-5 text-text-secondary">
                  {label}
                </h3>
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-light text-secondary">
                  {Icon ? (
                    <Icon aria-hidden="true" className="size-[1.125rem]" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="text-lg font-semibold leading-none"
                    >
                      ₦
                    </span>
                  )}
                </span>
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight text-primary">
                {formatNaira(visibleTotals[key])}
              </p>
              <p className="mt-1.5 text-xs text-text-muted">
                {visibleRecords.length} record
                {visibleRecords.length === 1 ? "" : "s"} in current view
              </p>
            </article>
          ))}
        </section>

        <section
          aria-label="Contribution records"
          className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-card sm:mt-7"
        >
          <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5">
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search contribution history</span>
              <FiSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-text-muted"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search member, period, or status..."
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 pl-10 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-secondary focus:ring-2 focus:ring-focus/20"
              />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <fieldset className="min-w-0">
                <legend className="mb-1.5 text-xs font-medium text-text-secondary">
                  Date range
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  <label>
                    <span className="sr-only">Start date</span>
                    <input
                      type="date"
                      aria-label="Start date"
                      value={startDate}
                      max={endDate || undefined}
                      onChange={(event) => setStartDate(event.target.value)}
                      className="h-11 w-full min-w-0 rounded-xl border border-border bg-white px-3 text-xs text-text-secondary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 sm:text-sm"
                    />
                  </label>
                  <label>
                    <span className="sr-only">End date</span>
                    <input
                      type="date"
                      aria-label="End date"
                      value={endDate}
                      min={startDate || undefined}
                      onChange={(event) => setEndDate(event.target.value)}
                      className="h-11 w-full min-w-0 rounded-xl border border-border bg-white px-3 text-xs text-text-secondary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 sm:text-sm"
                    />
                  </label>
                </div>
              </fieldset>

              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Contribution status
                </span>
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  aria-label="Filter by contribution status"
                  className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20"
                >
                  {statusFilters.map((filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Payment period
                </span>
                <select
                  value={cycleFilter}
                  onChange={(event) => setCycleFilter(event.target.value)}
                  aria-label="Filter by payment period"
                  className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20"
                >
                  <option value="all">All periods</option>
                  {availableCycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="text-xs text-text-muted" aria-live="polite">
              Showing {visibleRecords.length} of {groupRecords.length} records
            </p>
          </div>

          {visibleRecords.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <EmptyState
                icon={FiClock}
                title="No contributions match these filters"
                description="Try another search, status, period, or date range."
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
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[52rem] border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-soft text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                      <th scope="col" className="px-6 py-4">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Contribution amount
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Contribution date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Payment period
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {visibleRecords.map((record) => {
                      const member = ajoMembers.find(
                        (item) => item.id === record.memberId,
                      );
                      const cycle = contributionCycles.find(
                        (item) => item.id === record.cycleId,
                      );

                      return (
                        <tr key={record.id} className="text-sm">
                          <td className="px-6 py-4 font-medium text-text-primary">
                            {member?.fullName ?? "Member unavailable"}
                          </td>
                          <td className="px-6 py-4 font-medium text-text-primary">
                            {formatNaira(record.amount)}
                          </td>
                          <td className="px-6 py-4 text-text-secondary">
                            {formatDate(record.paidAt ?? record.dueDate)}
                          </td>
                          <td className="px-6 py-4 text-text-secondary">
                            {cycle?.label ?? record.cycleId}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={record.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <ul className="divide-y divide-border md:hidden">
                {visibleRecords.map((record) => {
                  const member = ajoMembers.find(
                    (item) => item.id === record.memberId,
                  );
                  const cycle = contributionCycles.find(
                    (item) => item.id === record.cycleId,
                  );

                  return (
                    <li key={record.id} className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-text-primary">
                            {member?.fullName ?? "Member unavailable"}
                          </p>
                          <p className="mt-1 text-xs text-text-secondary">
                            {cycle?.label ?? record.cycleId}
                          </p>
                        </div>
                        <StatusBadge status={record.status} />
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                        <div>
                          <dt className="text-text-muted">Amount</dt>
                          <dd className="mt-1 font-semibold text-text-primary">
                            {formatNaira(record.amount)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-text-muted">Contribution date</dt>
                          <dd className="mt-1 font-semibold text-text-primary">
                            {formatDate(record.paidAt ?? record.dueDate)}
                          </dd>
                        </div>
                      </dl>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
