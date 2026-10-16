import DashboardShell from "../_components/DashboardShell";
import { FiCalendar, FiClock, FiRepeat, FiUser } from "react-icons/fi";

export default function PayoutSchedulePage() {
  return (
    <DashboardShell activeItem="Payout Schedule">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Payout Schedule
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
            View the payout rotation for your Ajo group.
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
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-white/80">
                <FiClock aria-hidden="true" className="size-4" />
                Schedule unavailable
              </span>
            </div>

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
                      Not available
                    </p>
                  </div>
                </div>
                <p className="mt-7 text-xs font-medium text-white/55">
                  Expected payout amount
                </p>
                <p className="mt-1 font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  &mdash;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-6 rounded-2xl border border-white/10 bg-[#38231c]/35 p-5 sm:p-6">
                <div>
                  <div className="flex items-center gap-2 text-white/55">
                    <FiCalendar aria-hidden="true" className="size-4" />
                    <p className="text-xs font-medium">Scheduled date</p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">
                    &mdash;
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white/55">
                    <FiRepeat aria-hidden="true" className="size-4" />
                    <p className="text-xs font-medium">Payout turn</p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">
                    &mdash;
                  </p>
                </div>
                <div className="col-span-2 border-t border-white/10 pt-4">
                  <p className="text-xs font-medium text-white/55">
                    Cycle information
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    &mdash;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="payout-rotation-title"
          className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-card sm:mt-9"
        >
          <div className="border-b border-border px-5 py-5 sm:px-6">
            <h3
              id="payout-rotation-title"
              className="text-base font-semibold text-primary sm:text-lg"
            >
              Payout rotation
            </h3>
            <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm">
              Each turn will appear here when your group schedule is available.
            </p>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="bg-surface-soft text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
                  <th scope="col" className="px-6 py-4">
                    Turn
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Recipient
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Scheduled date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Payout status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <RotationEmptyState />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-5 py-14 text-center md:hidden">
            <RotationEmptyState />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function RotationEmptyState() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-light text-secondary">
        <FiRepeat aria-hidden="true" className="size-6" />
      </span>
      <p className="mt-4 text-base font-semibold text-primary">
        No payout schedule yet
      </p>
      <p className="mt-1.5 text-sm leading-6 text-text-secondary">
        Payout turns will appear here when your Ajo group schedule is connected.
      </p>
    </div>
  );
}
