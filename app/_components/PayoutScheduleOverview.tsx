"use client";

import { useState } from "react";
import DashboardShell from "./DashboardShell";
import { FiCalendar, FiClock, FiRepeat, FiUser } from "react-icons/fi";
import EmptyState from "../_ui/EmptyState";
import StatusBadge from "../_ui/StatusBadge";
import {
  activeAjoGroup,
  ajoMembers,
  calculatePayoutAmount,
  contributionCycles,
  payoutSchedule,
  type PayoutStatus,
} from "../_data/mockData";
import { formatDate, formatNaira } from "../_ui/formatters";

type StatusFilter = "all" | PayoutStatus;

export default function PayoutScheduleOverview() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [cycleFilter, setCycleFilter] = useState("all");

  const groupPayouts = payoutSchedule
    .filter((payout) => payout.groupId === activeAjoGroup.id)
    .slice()
    .sort((a, b) => a.turn - b.turn);
  const scheduledCycleIds = new Set(groupPayouts.map((payout) => payout.cycleId));
  const availableCycles = contributionCycles.filter(
    (cycle) =>
      cycle.groupId === activeAjoGroup.id && scheduledCycleIds.has(cycle.id),
  );
  const nextPayout = groupPayouts
    .filter((payout) => payout.status === "upcoming")
    .slice()
    .sort(
      (a, b) =>
        a.payoutDate.localeCompare(b.payoutDate) || a.turn - b.turn,
    )[0];
  const nextRecipient = ajoMembers.find(
    (member) => member.id === nextPayout?.recipientMemberId,
  );
  const nextCycle = contributionCycles.find(
    (cycle) => cycle.id === nextPayout?.cycleId,
  );
  const expectedPayoutAmount = calculatePayoutAmount();

  const visiblePayouts = groupPayouts.filter(
    (payout) =>
      (statusFilter === "all" || payout.status === statusFilter) &&
      (cycleFilter === "all" || payout.cycleId === cycleFilter),
  );
  const hasFilters = statusFilter !== "all" || cycleFilter !== "all";

  function clearFilters() {
    setStatusFilter("all");
    setCycleFilter("all");
  }

  return (
    <DashboardShell activeItem="Payout Schedule">
      <div className="mx-auto pb-10 w-full max-w-6xl">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Payout Schedule
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
            View the payout rotation for {activeAjoGroup.name}.
          </p>
        </div>

        <section
          aria-labelledby="upcoming-payout-title"
          className="relative isolate mt-7 overflow-hidden rounded-[1.75rem] bg-primary text-[#f8f4ed] shadow-[0_1.5rem_4rem_rgb(74_48_38_/_16%)] sm:mt-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-32 -z-10 size-80 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-20 -z-10 size-64 rounded-full border border-white/[0.07]"
          />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-[#e9ded0]/75">
                  Next in the rotation
                </p>
                <h3
                  id="upcoming-payout-title"
                  className="mt-2 font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl"
                >
                  Upcoming payout
                </h3>
              </div>
              {nextPayout ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-white/80">
                  <FiClock aria-hidden="true" className="size-4" />
                  Next scheduled
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-white/80">
                  <FiClock aria-hidden="true" className="size-4" />
                  No upcoming payout
                </span>
              )}
            </div>

            {nextPayout ? (
              <div className="mt-7 grid gap-6 border-t border-white/15 pt-6 sm:mt-8 sm:grid-cols-[minmax(0,1fr)_minmax(15rem,0.8fr)] sm:items-end sm:gap-10 sm:pt-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.08] text-[#e9ded0]">
                      <FiUser aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-white/55">
                        Next recipient
                      </p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {nextRecipient?.fullName ?? "Recipient unavailable"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-7 text-xs font-medium text-white/55">
                    Expected payout amount
                  </p>
                  <p className="mt-1 font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {formatNaira(expectedPayoutAmount)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-6 rounded-2xl border border-white/10 bg-[#38231c]/35 p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2 text-white/55">
                      <FiCalendar aria-hidden="true" className="size-4" />
                      <p className="text-xs font-medium">Scheduled date</p>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {formatDate(nextPayout.payoutDate)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-white/55">
                      <FiRepeat aria-hidden="true" className="size-4" />
                      <p className="text-xs font-medium">Payout turn</p>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {nextPayout.turn}
                    </p>
                  </div>
                  <div className="col-span-2 border-t border-white/10 pt-4">
                    <p className="text-xs font-medium text-white/55">
                      Cycle information
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {nextCycle?.label ?? nextPayout.cycleId}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-7 border-t border-white/15 pt-6">
                <p className="text-sm text-white/75">
                  There are no upcoming payouts in the current group schedule.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          aria-labelledby="payout-rotation-title"
          className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-card sm:mt-9"
        >
          <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <h3
                id="payout-rotation-title"
                className="text-base font-semibold text-primary sm:text-lg"
              >
                Payout rotation
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm">
                Each scheduled turn contributes to one group payout.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
              <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-text-secondary">
                Status
                <select
                  aria-label="Filter payouts by status"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  className="h-10 cursor-pointer rounded-lg border border-border bg-white px-3 text-sm text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 sm:min-w-36"
                >
                  <option value="all">All statuses</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </label>
              <label className="flex min-w-0 flex-col gap-1 text-xs font-medium text-text-secondary">
                Cycle
                <select
                  aria-label="Filter payouts by cycle"
                  value={cycleFilter}
                  onChange={(event) => setCycleFilter(event.target.value)}
                  className="h-10 cursor-pointer rounded-lg border border-border bg-white px-3 text-sm text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 sm:min-w-40"
                >
                  <option value="all">All cycles</option>
                  {availableCycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {visiblePayouts.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <EmptyState
                icon={FiRepeat}
                title="No payouts match these filters"
                description="Choose another status or cycle to view scheduled payouts."
              />
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
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
                      <th scope="col" className="px-6 py-4">Turn</th>
                      <th scope="col" className="px-6 py-4">Recipient</th>
                      <th scope="col" className="px-6 py-4">Cycle</th>
                      <th scope="col" className="px-6 py-4">Scheduled date</th>
                      <th scope="col" className="px-6 py-4">Expected amount</th>
                      <th scope="col" className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {visiblePayouts.map((payout) => {
                      const recipient = ajoMembers.find(
                        (member) => member.id === payout.recipientMemberId,
                      );
                      const cycle = contributionCycles.find(
                        (item) => item.id === payout.cycleId,
                      );
                      const isNext = payout.id === nextPayout?.id;

                      return (
                        <tr
                          key={payout.id}
                          className={isNext ? "bg-primary-light/40" : ""}
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-text-primary">
                            <span className="inline-flex items-center gap-2">
                              {payout.turn}
                              {isNext && (
                                <span className="rounded-full bg-primary px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-white">
                                  Next
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-text-primary">
                            {recipient?.fullName ?? "Recipient unavailable"}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-secondary">
                            {cycle?.label ?? payout.cycleId}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-secondary">
                            {formatDate(payout.payoutDate)}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-text-primary">
                            {formatNaira(expectedPayoutAmount)}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={payout.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <ol className="divide-y divide-border md:hidden">
                {visiblePayouts.map((payout) => {
                  const recipient = ajoMembers.find(
                    (member) => member.id === payout.recipientMemberId,
                  );
                  const cycle = contributionCycles.find(
                    (item) => item.id === payout.cycleId,
                  );
                  const isNext = payout.id === nextPayout?.id;

                  return (
                    <li
                      key={payout.id}
                      className={`p-4 sm:p-5 ${isNext ? "bg-primary-light/40" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            Turn {payout.turn}
                            {isNext && (
                              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-white">
                                Next
                              </span>
                            )}
                          </p>
                          <p className="mt-1 text-sm text-text-secondary">
                            {recipient?.fullName ?? "Recipient unavailable"}
                          </p>
                        </div>
                        <StatusBadge status={payout.status} />
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                        <div>
                          <dt className="text-text-muted">Cycle</dt>
                          <dd className="mt-1 font-semibold text-text-primary">
                            {cycle?.label ?? payout.cycleId}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-text-muted">Scheduled date</dt>
                          <dd className="mt-1 font-semibold text-text-primary">
                            {formatDate(payout.payoutDate)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-text-muted">Expected amount</dt>
                          <dd className="mt-1 font-semibold text-text-primary">
                            {formatNaira(expectedPayoutAmount)}
                          </dd>
                        </div>
                      </dl>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
