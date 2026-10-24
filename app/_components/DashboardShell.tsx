"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
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
  FiX,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type DashboardItem =
  | "Overview"
  | "Members"
  | "Payout Schedule"
  | "Contribution History"
  | "Settings";

const navigation: { label: DashboardItem; href: string; icon: IconType }[] = [
  { label: "Overview", href: "/dashboard", icon: FiGrid },
  { label: "Members", href: "/members", icon: FiUsers },
  { label: "Payout Schedule", href: "/payout-schedule", icon: FiCalendar },
  {
    label: "Contribution History",
    href: "/contribution-history",
    icon: FiClock,
  },
  { label: "Settings", href: "/settings", icon: FiSettings },
];

function ProfileAvatar({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-10 shrink-0 place-items-center rounded-full border border-border-strong bg-primary-light font-sans text-sm font-bold tracking-wide text-primary ${className}`}
    >
      MO
    </span>
  );
}

export default function DashboardShell({
  activeItem,
  children,
}: {
  activeItem: DashboardItem;
  children: ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileNavOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButton?.focus();
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
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = activeItem === label;
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsMobileNavOpen(false)}
                className={`group flex min-h-11 w-full items-center justify-start gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${active ? "bg-primary-light text-primary" : "text-text-secondary hover:bg-primary-light/65 hover:text-primary"}`}
              >
                <Icon
                  aria-hidden="true"
                  className={`size-5 shrink-0 ${active ? "text-primary" : "text-secondary"}`}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-5">
          <div className="flex items-center gap-3 rounded-xl px-1 py-2">
            <ProfileAvatar />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-primary">
                Mobolaji A.
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
              onClick={() => setIsDesktopSidebarOpen((open) => !open)}
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

          {activeItem === "Overview" && (
            <div className="mt-7 sm:mt-8">
              <h1 className="font-sans text-[1.625rem] font-bold leading-tight tracking-[-0.04em] text-primary sm:text-3xl">
                Good morning, Mobolaji <span aria-hidden="true">👋</span>
              </h1>
              <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base">
                Here&apos;s what&apos;s happening with your Ajo circle.
              </p>
            </div>
          )}
        </header>
        <section
          aria-label={`${activeItem} content`}
          className="min-h-0 flex-1 px-5 py-6 sm:px-8 xl:px-10"
        >
          {children}
        </section>
      </main>
    </div>
  );
}
