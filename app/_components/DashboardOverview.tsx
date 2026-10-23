"use client";

import Link from "next/link";
import DashboardShell from "./DashboardShell";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiInbox,
  FiUser,
} from "react-icons/fi";
import {
  activeAjoGroup,
  ajoMembers,
  calculatePayoutAmount,
  contributionCycles,
  getCycleContributionSummary,
  payoutSchedule,
} from "../_data/mockData";
import EmptyState from "../_ui/EmptyState";
import StatusBadge from "../_ui/StatusBadge";
import { formatDate, formatNaira } from "../_ui/formatters";
import { useContributionDemo } from "../_state/ContributionDemoProvider";

export default function DashboardOverview() {
  const { contributionRecords } = useContributionDemo();
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
  const contributionProgressPercent = cycleSummary.expectedAmount
    ? Math.min(
        100,
        Math.round(
          (cycleSummary.paidAmount / cycleSummary.expectedAmount) * 100,
        ),
      )
    : 0;

  return (
    <DashboardShell activeItem="Overview">
      <article className="relative isolate mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-primary text-[#f8f4ed] shadow-[0_1.5rem_4rem_rgb(74_48_38_/_16%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 size-[22rem] rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-20 -z-10 size-[18rem] rounded-full border border-white/[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 right-[12%] -z-10 size-2 rounded-full bg-[#e9ded0]/70 shadow-[0_0_0_0.5rem_rgb(233_222_208_/_8%)]"
        />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-[#e9ded0]/75">
                Your Ajo Group
              </p>
              <div className="mt-5">
                <p className="text-xs font-medium text-white/55">Group title</p>
                <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  {activeAjoGroup.name}
                </h2>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-white/85">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-[#e9ded0]"
              />
              <span>Group status</span>
              <span className="text-white/55">Active</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/15 pt-6 sm:mt-10 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-10">
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                Contribution amount
              </p>
              <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {formatNaira(activeAjoGroup.contributionAmount)}
              </p>
            </div>
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                Frequency
              </p>
              <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {activeAjoGroup.frequency[0].toUpperCase() +
                  activeAjoGroup.frequency.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                Total members
              </p>
              <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {activeMembers.length}
              </p>
            </div>
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                Current cycle
              </p>
              <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {cycle?.label ?? activeAjoGroup.currentCycleId}
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-white/12 bg-[#38231c]/35 p-4 sm:mt-8 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-white">
                Contribution progress
              </p>
              <span className="text-xs font-medium text-white/65">
                {contributionProgressPercent}% received
              </span>
            </div>
            <div
              role="img"
              aria-label={`Contribution progress: ${formatNaira(cycleSummary.paidAmount)} of ${formatNaira(cycleSummary.expectedAmount)} received`}
              className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"
            >
              <div
                className="h-full rounded-full bg-[#e9ded0]"
                style={{ width: `${contributionProgressPercent}%` }}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p>
                Received:{" "}
                <span className="text-white">
                  {formatNaira(cycleSummary.paidAmount)}
                </span>
              </p>
              <p>
                Outstanding:{" "}
                <span className="text-white">
                  {formatNaira(cycleSummary.outstandingAmount)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </article>

      <div className="mx-auto mt-5 pb-10 grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-text-primary">Paid</h2>
            <span className="grid size-9 place-items-center rounded-xl bg-success-bg text-success">
              <FiCheckCircle aria-hidden="true" className="size-[1.125rem]" />
            </span>
          </div>
          <p
            aria-label="Paid contributions in the current cycle"
            className="mt-5 text-3xl font-semibold tracking-tight text-text-primary"
          >
            {formatNaira(cycleSummary.paidAmount)}
          </p>
          <p className="mt-1.5 text-xs text-text-secondary sm:text-sm">
            Contributions received
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-text-primary">Pending</h2>
            <span className="grid size-9 place-items-center rounded-xl bg-warning-bg text-warning">
              <FiClock aria-hidden="true" className="size-[1.125rem]" />
            </span>
          </div>
          <p
            aria-label="Pending contributions in the current cycle"
            className="mt-5 text-3xl font-semibold tracking-tight text-text-primary"
          >
            {formatNaira(cycleSummary.pendingAmount)}
          </p>
          <p className="mt-1.5 text-xs text-text-secondary sm:text-sm">
            Awaiting payment
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-text-primary">Overdue</h2>
            <span className="grid size-9 place-items-center rounded-xl bg-danger-bg text-danger">
              <FiAlertCircle aria-hidden="true" className="size-[1.125rem]" />
            </span>
          </div>
          <p
            aria-label="Overdue contributions in the current cycle"
            className="mt-5 text-3xl font-semibold tracking-tight text-text-primary"
          >
            {formatNaira(cycleSummary.overdueAmount)}
          </p>
          <p className="mt-1.5 text-xs text-text-secondary sm:text-sm">
            Payment past due
          </p>
        </article>
      </div>

      <div className="mx-auto mt-5 grid w-full max-w-6xl grid-cols-1 gap-5 pb-10 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
        <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
              <FiCalendar aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-primary">
                Upcoming Payout
              </h2>
              <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm">
                Your next payout in the rotation
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl bg-surface-soft p-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-white text-text-muted">
              <FiUser aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-text-muted">
                Recipient
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-text-primary">
                {payoutRecipient?.fullName ?? "Not scheduled"}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-medium text-text-secondary">
              Expected payout amount
            </p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-primary">
              {formatNaira(calculatePayoutAmount())}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-text-secondary">
                Payout date
              </p>
              <p className="mt-1.5 text-sm font-semibold text-text-primary">
                {upcomingPayout
                  ? formatDate(upcomingPayout.payoutDate)
                  : "Not scheduled"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-text-secondary">
                Payout turn
              </p>
              <p className="mt-1.5 text-sm font-semibold text-text-primary">
                {upcomingPayout?.turn ?? "Not scheduled"}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-primary">
                Recent Contributions
              </h2>
              <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm">
                A snapshot of recent group activity
              </p>
            </div>
            <Link
              href="/contribution-history"
              className="inline-flex items-center gap-1.5 rounded-lg py-1 text-xs font-semibold text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 sm:text-sm"
            >
              View history
              <FiArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-[1.1fr_0.8fr_0.8fr_auto] gap-2 border-b border-border px-1 pb-3 text-[0.625rem] font-semibold uppercase tracking-wide text-text-muted sm:gap-4 sm:text-[0.6875rem]">
            <span>Member</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {currentContributions.length > 0 ? (
            <div className="divide-y divide-border">
              {currentContributions.map((record) => {
                const member = ajoMembers.find(
                  (item) => item.id === record.memberId,
                );

                return (
                  <div
                    key={record.id}
                    className="grid grid-cols-[1.1fr_0.8fr_0.8fr_auto] items-center gap-2 px-1 py-3 text-xs sm:gap-4 sm:text-sm"
                  >
                    <span className="truncate font-medium text-text-primary">
                      {member?.fullName ?? "Member"}
                    </span>
                    <span className="text-text-secondary">
                      {formatNaira(record.amount)}
                    </span>
                    <span className="text-text-secondary">
                      {formatDate(record.paidAt ?? record.dueDate)}
                    </span>
                    <StatusBadge status={record.status} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <EmptyState
                icon={FiInbox}
                title="No contributions to show yet"
                description="Contribution records will appear here once available."
              />
            </div>
          )}
        </article>
      </div>
    </DashboardShell>
  );
}
