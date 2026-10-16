import DashboardShell from "../_components/DashboardShell";
import { FiSearch, FiUsers } from "react-icons/fi";

export default function MembersPage() {
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
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
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
                defaultValue="all"
                className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-white px-3 text-sm font-medium text-text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-focus/20 sm:w-44 sm:flex-none"
              >
                <option value="all">All Members</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </label>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="bg-surface-soft text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                  <th scope="col" className="px-6 py-4">
                    Member
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Amount Due
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Contribution Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <EmptyState />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-5 py-14 text-center lg:hidden">
            <EmptyState />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-light text-secondary">
        <FiUsers aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-primary">
        No members yet
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-text-secondary">
        Members added to your Ajo group will appear here.
      </p>
    </div>
  );
}
