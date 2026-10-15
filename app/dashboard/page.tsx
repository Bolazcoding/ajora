import AjoMark from "../_ui/AjoMark";
import {
  FiBell,
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiGrid,
  FiMenu,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import Link from "next/link";

type NavigationItem = {
  label: string;
  icon: IconType;
  active?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "Overview", icon: FiGrid, active: true },
  { label: "Members", icon: FiUsers },
  { label: "Payout Schedule", icon: FiCalendar },
  { label: "Contribution History", icon: FiClock },
  { label: "Settings", icon: FiSettings },
];

function ProfileAvatar({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-10 shrink-0 place-items-center rounded-full border border-[#d7c6b5] bg-[#e9ded0] font-sans text-sm font-bold tracking-wide text-primary ${className}`}
    >
      MO
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-svh bg-background text-text-primary md:flex">
      <aside className="hidden shrink-0 border-r border-border bg-surface-soft md:flex md:w-[5rem] md:flex-col md:items-center md:px-3 md:py-6 xl:w-[16.5rem] xl:items-stretch xl:px-5">
        <Link
          href="/"
          aria-label="Ajora home"
          className="flex items-center gap-3 px-1 text-primary"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white shadow-sm">
            <span className="size-7">
              <AjoMark />
            </span>
          </span>
          <span className="hidden font-sans text-xl font-bold tracking-tight xl:inline">
            Ajora
          </span>
        </Link>

        <nav
          aria-label="Dashboard"
          className="mt-10 flex w-full flex-col gap-1.5"
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                aria-current={item.active ? "page" : undefined}
                title={item.label}
                className={`group flex min-h-11 items-center justify-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors xl:justify-start ${
                  item.active
                    ? "bg-primary-light text-primary"
                    : "text-text-secondary hover:bg-primary-light/65 hover:text-primary"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`size-5 shrink-0 ${item.active ? "text-primary" : "text-secondary"}`}
                />
                <span className="hidden xl:inline">{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-5">
          <div className="flex items-center gap-3 rounded-xl px-1 py-2 md:justify-center xl:justify-start">
            <ProfileAvatar />
            <span className="hidden min-w-0 flex-1 xl:block">
              <span className="block truncate text-sm font-semibold text-primary">
                Mobolaji O.
              </span>
              <span className="mt-0.5 block text-xs text-text-secondary">
                Your profile
              </span>
            </span>
            <FiChevronDown
              aria-hidden="true"
              className="hidden size-4 text-text-muted xl:inline-flex"
            />
          </div>
        </div>
      </aside>

      <main className="flex min-h-svh min-w-0 flex-1 flex-col">
        <header className="border-b border-border px-5 pb-6 pt-5 sm:px-8 sm:pt-7 xl:px-10 xl:pb-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="Ajora home"
              className="flex items-center gap-2.5 text-primary md:hidden"
            >
              <span className="grid size-9 place-items-center rounded-full bg-primary text-white">
                <span className="size-6">
                  <AjoMark />
                </span>
              </span>
              <span className="font-sans text-lg font-bold tracking-tight">
                Ajora
              </span>
            </Link>

            <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="grid size-10 place-items-center rounded-full border border-border bg-surface text-secondary transition-colors hover:bg-primary-light/50 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              >
                <FiBell aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Profile menu"
                className="flex items-center gap-2 rounded-full sm:pl-1"
              >
                <ProfileAvatar className="size-9 text-xs sm:size-10 sm:text-sm" />
                <span className="hidden text-sm font-semibold text-primary lg:inline">
                  Mobolaji
                </span>
                <FiChevronDown
                  aria-hidden="true"
                  className="hidden size-4 text-text-muted lg:inline-flex"
                />
              </button>
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full border border-border bg-surface text-primary md:hidden"
              >
                <FiMenu />
              </span>
            </div>
          </div>

          <div className="mt-7 sm:mt-8">
            <h1 className="font-sans text-[1.625rem] font-bold leading-tight tracking-[-0.04em] text-primary sm:text-3xl">
              Good morning, Mobolaji <span aria-hidden="true">👋</span>
            </h1>
            <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
              Here&apos;s what&apos;s happening with your Ajo circle.
            </p>
          </div>
        </header>

        <section
          aria-label="Dashboard content"
          className="min-h-0 flex-1 px-5 py-6 sm:px-8 xl:px-10"
        />
      </main>
    </div>
  );
}
