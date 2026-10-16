"use client";

import { useEffect, useRef, useState } from "react";
import AjoMark from "../_ui/AjoMark";
import {
  FiAlertCircle,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiGrid,
  FiMenu,
  FiSettings,
  FiUsers,
  FiX,
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileNavOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileNavOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButtonRef.current?.focus();
    };
  }, [isMobileNavOpen]);

  return (
    <div className="h-svh overflow-hidden bg-background text-text-primary md:flex">
      {isMobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-primary/30 backdrop-blur-[2px] md:hidden"
        />
      )}

      <aside
        id="dashboard-navigation"
        className={`${isMobileNavOpen ? "fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)]" : "hidden"} shrink-0 flex-col border-r border-border bg-surface-soft px-5 py-6 shadow-xl md:static md:z-auto md:h-svh md:w-[16.5rem] md:items-stretch md:px-5 md:py-6 md:shadow-none ${isDesktopSidebarOpen ? "md:flex" : "md:hidden"}`}
      >
        <div className="flex w-full items-center justify-between">
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
            <span className="font-sans text-xl font-bold tracking-tight">
              Ajora
            </span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation"
            onClick={() => setIsMobileNavOpen(false)}
            className="grid size-10 place-items-center rounded-full border border-border bg-surface text-primary md:hidden"
          >
            <FiX aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Dashboard"
          className="mt-10 flex w-full flex-col gap-1.5"
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.label}
                aria-current={item.active ? "page" : undefined}
                title={item.label}
                onClick={() => setIsMobileNavOpen(false)}
                className={`group flex min-h-11 w-full items-center justify-start gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
                  item.active
                    ? "bg-primary-light text-primary"
                    : "text-text-secondary hover:bg-primary-light/65 hover:text-primary"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`size-5 shrink-0 ${item.active ? "text-primary" : "text-secondary"}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-5">
          <div className="flex items-center gap-3 rounded-xl px-1 py-2">
            <ProfileAvatar />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-primary">
                Mobolaji O.
              </span>
              <span className="mt-0.5 block text-xs text-text-secondary">
                Your profile
              </span>
            </span>
            <FiChevronDown
              aria-hidden="true"
              className="size-4 text-text-muted"
            />
          </div>
        </div>
      </aside>

      <main className="flex h-svh min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        <header className="border-b border-border px-5 pb-6 pt-5 sm:px-8 sm:pt-7 xl:px-10 xl:pb-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label={
                isDesktopSidebarOpen ? "Close sidebar" : "Open sidebar"
              }
              aria-controls="dashboard-navigation"
              aria-expanded={isDesktopSidebarOpen}
              onClick={() => setIsDesktopSidebarOpen((isOpen) => !isOpen)}
              className="hidden size-10 place-items-center rounded-full border border-border bg-surface text-primary transition-colors hover:bg-primary-light/50 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 md:grid"
            >
              <FiMenu aria-hidden="true" className="size-5" />
            </button>

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
              <button
                ref={menuButtonRef}
                type="button"
                aria-label="Open navigation"
                aria-controls="dashboard-navigation"
                aria-expanded={isMobileNavOpen}
                onClick={() => setIsMobileNavOpen(true)}
                className="grid size-10 place-items-center rounded-full border border-border bg-surface text-primary transition-colors hover:bg-primary-light/50 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 md:hidden"
              >
                <FiMenu aria-hidden="true" className="size-5" />
              </button>
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
        >
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
                    <p className="text-xs font-medium text-white/55">
                      Group title
                    </p>
                    <h2 className="mt-1 font-sans text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                      —
                    </h2>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-white/85">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-[#e9ded0]"
                  />
                  <span>Group status</span>
                  <span className="text-white/55">—</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/15 pt-6 sm:mt-10 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-10">
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                    Contribution amount
                  </p>
                  <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    —
                  </p>
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                    Frequency
                  </p>
                  <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    —
                  </p>
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                    Total members
                  </p>
                  <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    —
                  </p>
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[0.6875rem]">
                    Current cycle
                  </p>
                  <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    —
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-white/12 bg-[#38231c]/35 p-4 sm:mt-8 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-white">
                    Cycle progress
                  </p>
                  <span className="text-xs font-medium text-white/65">—</span>
                </div>
                <div
                  role="img"
                  aria-label="Cycle progress unavailable"
                  className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"
                >
                  <div className="h-full w-0 rounded-full bg-[#e9ded0]" />
                </div>
                <div className="mt-4 flex flex-col gap-2 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p>
                    Completed payout turns:{" "}
                    <span className="text-white">—</span>
                  </p>
                  <p>
                    Remaining payout turns:{" "}
                    <span className="text-white">—</span>
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="mx-auto mt-5 grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-text-primary">
                  Paid
                </h2>
                <span className="grid size-9 place-items-center rounded-xl bg-success-bg text-success">
                  <FiCheckCircle
                    aria-hidden="true"
                    className="size-[1.125rem]"
                  />
                </span>
              </div>
              <p
                aria-label="Value unavailable"
                className="mt-5 text-3xl font-semibold tracking-tight text-text-primary"
              >
                &mdash;
              </p>
              <p className="mt-1.5 text-xs text-text-secondary sm:text-sm">
                Contributions received
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-text-primary">
                  Pending
                </h2>
                <span className="grid size-9 place-items-center rounded-xl bg-warning-bg text-warning">
                  <FiClock aria-hidden="true" className="size-[1.125rem]" />
                </span>
              </div>
              <p
                aria-label="Value unavailable"
                className="mt-5 text-3xl font-semibold tracking-tight text-text-primary"
              >
                &mdash;
              </p>
              <p className="mt-1.5 text-xs text-text-secondary sm:text-sm">
                Awaiting payment
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-text-primary">
                  Overdue
                </h2>
                <span className="grid size-9 place-items-center rounded-xl bg-danger-bg text-danger">
                  <FiAlertCircle
                    aria-hidden="true"
                    className="size-[1.125rem]"
                  />
                </span>
              </div>
              <p
                aria-label="Value unavailable"
                className="mt-5 text-3xl font-semibold tracking-tight text-text-primary"
              >
                &mdash;
              </p>
              <p className="mt-1.5 text-xs text-text-secondary sm:text-sm">
                Payment past due
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
