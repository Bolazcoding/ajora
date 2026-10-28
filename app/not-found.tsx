import Link from "next/link";
import AjoMark from "./_ui/AjoMark";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-background [background-image:radial-gradient(ellipse_at_50%_42%,rgb(233_222_208_/_48%)_0%,rgb(248_244_237_/_0%)_54%)] px-6 py-6 sm:px-10 sm:py-8 lg:px-16">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          aria-label="Ajora home"
          className="inline-flex items-center gap-2.5 rounded-lg text-primary focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-4"
        >
          <span className="grid size-10 place-items-center rounded-full border border-primary/10 bg-white/70 sm:size-11">
            <span className="size-6">
              <AjoMark />
            </span>
          </span>
          <span className="font-sans text-xl font-bold tracking-tight sm:text-[1.375rem]">
            Ajora
          </span>
        </Link>
        <span className="hidden text-xs font-semibold tracking-[0.12em] text-secondary sm:block">
          OUR AJO, OUR GROWTH
        </span>
      </header>

      <section
        aria-labelledby="not-found-heading"
        className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 py-12 md:grid-cols-[1fr_1fr] md:gap-12 lg:gap-20"
      >
        <div
          aria-hidden="true"
          className="relative mx-auto grid aspect-square w-[min(76vw,22rem)] place-items-center animate-[hero-arrive_700ms_ease-out_both] sm:w-[min(62vw,25rem)] md:w-full motion-reduce:animate-none"
        >
          <div className="absolute inset-[3%] rounded-full border border-secondary/20" />
          <div className="absolute inset-[9%] rounded-full border border-secondary/15" />
          <div className="absolute inset-[16%] rounded-full bg-[#e9ded0] shadow-[0_1.25rem_3.125rem_rgb(74_48_38_/_8%)]" />
          <span className="absolute right-[14%] top-[20%] size-2 rounded-full bg-secondary shadow-[0_0_0_0.375rem_rgb(139_104_84_/_9%)]" />
          <span className="absolute bottom-[18%] left-[14%] size-1.5 rounded-full bg-[#c49b71] shadow-[0_0_0_0.375rem_rgb(139_104_84_/_9%)]" />
          <span className="absolute left-[18%] top-[21%] text-secondary/75">
            <svg viewBox="0 0 20 20" fill="none" className="size-5">
              <path
                d="M10 2.5 11.7 8.3 17.5 10l-5.8 1.7L10 17.5l-1.7-5.8L2.5 10l5.8-1.7L10 2.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <div className="relative grid size-[58%] place-items-center rounded-full border-[0.375rem] border-white/80 bg-white/60 shadow-[0_0.875rem_2.375rem_rgb(74_48_38_/_10%)]">
            <span className="font-sans text-[clamp(4.5rem,16vw,7.5rem)] font-bold leading-none tracking-[-0.1em] text-primary">
              404
            </span>
          </div>
          <div className="absolute bottom-[12%] right-[1%] flex items-center gap-2.5 rounded-2xl border border-primary/5 bg-white px-3.5 py-3 shadow-[0_0.625rem_1.75rem_rgb(74_48_38_/_13%),0_0.125rem_0.3125rem_rgb(74_48_38_/_5%)] sm:right-[3%] sm:px-4">
            <span className="grid size-9 place-items-center rounded-xl bg-[#f5eee5] text-secondary">
              <span className="size-6">
                <AjoMark />
              </span>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[0.5625rem] font-bold tracking-[0.12em] text-[#9a8474]">
                GOOD THINGS GROW
              </span>
              <span className="text-xs font-bold text-primary">
                Together, always
              </span>
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-[31rem] text-center md:mx-0 md:text-left">
          <p className="mb-3 text-[0.625rem] font-bold tracking-[0.16em] text-secondary sm:text-xs">
            A LITTLE DETOUR
          </p>
          <h1
            id="not-found-heading"
            className="font-sans text-[clamp(2.25rem,7vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.09rem] text-primary sm:tracking-[-0.12rem]"
          >
            Looks like this page took a wrong turn.
          </h1>
          <p className="mx-auto mt-4 max-w-[27rem] text-sm leading-6 text-text-secondary sm:mt-5 sm:text-base sm:leading-7 md:mx-0">
            The page may have moved, or the link may be out of date. Let&apos;s
            get you back to your Ajo.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="/"
              className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.9375rem] bg-button-primary px-6 text-sm font-bold text-button-primary-text shadow-[0_0.5rem_1.125rem_rgb(74_48_38_/_15%)] transition duration-200 hover:-translate-y-0.5 hover:bg-button-primary-hover hover:shadow-[0_0.6875rem_1.375rem_rgb(74_48_38_/_19%)] focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-4 active:translate-y-0"
            >
              Back to home
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5"
              >
                <path
                  d="M16.5 10h-13m5 5-5-5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/signup"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[0.9375rem] border border-border-strong bg-white/60 px-6 text-sm font-bold text-primary transition-colors hover:border-secondary/50 hover:bg-white focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-4"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-7xl border-t border-border/70 pt-4 text-center text-xs text-text-muted sm:pt-5">
        Save together. Grow together.
      </footer>
    </main>
  );
}
