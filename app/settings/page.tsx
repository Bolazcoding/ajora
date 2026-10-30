import { activeAjoGroup, ajoMembers } from "../_data/mockData";
import DashboardShell from "../_components/DashboardShell";
import { formatNaira } from "../_ui/formatters";

export default function SettingsPage() {
  const activeMemberCount = ajoMembers.filter(
    (member) => member.groupId === activeAjoGroup.id && member.isActive,
  ).length;

  return (
    <DashboardShell activeItem="Settings">
      <div className="mx-auto w-full max-w-6xl pb-10">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Settings
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
          Account and group information.
        </p>
        <div className="mt-7 grid gap-5 sm:mt-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
            <h3 className="font-sans text-lg font-semibold text-primary">
              Account
            </h3>
            <dl className="mt-5 divide-y divide-border">
              <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
                <dt className="text-sm text-text-secondary">Profile</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  Mobolaji A.
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm text-text-secondary">Country</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  Nigeria
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
                <dt className="text-sm text-text-secondary">Time zone</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  West Africa Time (WAT)
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
            <h3 className="font-sans text-lg font-semibold text-primary">
              Active group
            </h3>
            <dl className="mt-5 divide-y divide-border">
              <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
                <dt className="text-sm text-text-secondary">Group name</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  {activeAjoGroup.name}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-sm text-text-secondary">Contribution</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  {formatNaira(activeAjoGroup.contributionAmount)} /{" "}
                  {activeAjoGroup.frequency}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
                <dt className="text-sm text-text-secondary">Active members</dt>
                <dd className="text-right text-sm font-medium text-text-primary">
                  {activeMemberCount}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
