import { FiSettings } from "react-icons/fi";
import DashboardShell from "../_components/DashboardShell";
import EmptyState from "../_ui/EmptyState";

export default function SettingsPage() {
  return (
    <DashboardShell activeItem="Settings">
      <div className="mx-auto w-full max-w-6xl pb-10">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Settings
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
          Manage your Ajora group and account preferences.
        </p>
        <section className="mt-7 rounded-2xl border border-border bg-white px-5 py-14 text-center shadow-card sm:mt-8">
          <EmptyState
            icon={FiSettings}
            title="Settings page not available yet"
            description="Your group details and contribution schedule are available from the dashboard overview."
          />
        </section>
      </div>
    </DashboardShell>
  );
}
