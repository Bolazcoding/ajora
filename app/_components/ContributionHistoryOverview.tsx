import DashboardShell from "./DashboardShell";
import { FiCalendar, FiClock, FiSearch } from "react-icons/fi";
import EmptyState from "../_ui/EmptyState";

const summaryItems = [
  {
    label: "Total contributions recorded",
    // icon: "₦",
  },
  {
    label: "Contributions this period",
    icon: FiCalendar,
  },
  {
    label: "Outstanding contributions",
    icon: FiClock,
  },
];

export default function ContributionHistoryOverview() {
  return (
    <DashboardShell activeItem="Contribution History">
      <div className="mx-auto pb-10 w-full max-w-6xl">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Contribution History
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
            Review contribution records for your Ajo group.
          </p>
        </div>

        <section
          aria-label="Contribution summary"
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {summaryItems.map(({ label, icon }) => {
            const Icon = typeof icon === "string" ? null : icon;

            return (
              <article
                key={label}
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
                <p
                  aria-label="Value unavailable"
                  className="mt-5 text-3xl font-semibold tracking-tight text-primary"
                >
                  &mdash;
                </p>
              </article>
            );
          })}
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
                placeholder="Search contributions..."
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
                      className="h-11 w-full min-w-0 rounded-xl border border-border bg-white px-3 text-xs text-text-secondary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 sm:text-sm"
                    />
                  </label>
                  <label>
                    <span className="sr-only">End date</span>
                    <input
                      type="date"
                      aria-label="End date"
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
                  defaultValue="all"
                  aria-label="Filter by contribution status"
                  className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20"
                >
                  <option value="all">All statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Member
                </span>
                <select
                  defaultValue="all"
                  aria-label="Filter by member"
                  className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20"
                >
                  <option value="all">All members</option>
                </select>
              </label>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[48rem] border-collapse text-left">
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
                    Reference or note
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <EmptyState
                      icon={FiClock}
                      title="No contribution history yet"
                      description="Recorded contributions will appear here once contribution data is connected."
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-5 py-14 text-center md:hidden">
            <EmptyState
              icon={FiClock}
              title="No contribution history yet"
              description="Recorded contributions will appear here once contribution data is connected."
            />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
