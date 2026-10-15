import Image from "next/image";
import Link from "next/link";
import AjoMark from "./_ui/AjoMark";
import Sparkle from "./_ui/Sparkle";

export default function Onboarding() {
  return (
    <main className="relative flex min-h-svh justify-center overflow-hidden bg-background [background-image:radial-gradient(ellipse_at_50%_33%,rgb(233_222_208_/_43%)_0%,rgb(248_244_237_/_0%)_42%)] px-[1.375rem] pb-[1.125rem] pt-[1.4375rem] sm:px-12 sm:pb-[1.375rem] sm:pt-[2.1875rem] md:px-8 md:py-7 lg:px-20 lg:py-8">
      <div className="flex w-full max-w-[80rem] flex-col items-center md:items-stretch">
        <header className="z-10 flex w-full items-center justify-between text-primary">
          <Link
            href="/"
            aria-label="Ajora home"
            className="flex items-center gap-[0.5625rem]"
          >
            <span className="grid size-[2.125rem] place-items-center rounded-full border border-primary/10 bg-white/65 sm:size-[2.375rem]">
              <span className="size-[1.4375rem]">
                <AjoMark />
              </span>
            </span>
            <span className="font-sans text-[1.25rem] font-bold tracking-[-0.04375rem] sm:text-[1.375rem]">
              Ajora
            </span>
          </Link>
          <Link
            href="/login"
            className="hidden items-center gap-1.5 rounded-full border border-primary/10 bg-white/55 px-5 py-3 text-sm text-text-secondary transition hover:border-primary/20 hover:bg-white md:inline-flex"
          >
            Already a member?{" "}
            <span className="font-bold text-primary">Log in</span>
          </Link>
        </header>

        <section
          className="flex w-full flex-1 flex-col items-center justify-center pb-[0.875rem] pt-2 text-center md:grid md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-8 md:py-8 md:text-left lg:grid-cols-[45fr_55fr] lg:gap-12 lg:py-0"
          aria-labelledby="welcome-heading"
        >
          <div className="relative isolate mb-[0.875rem] grid aspect-square w-[min(78vw,20.625rem)] flex-none place-items-center animate-[hero-arrive_700ms_ease-out_both] sm:mb-[1.0625rem] sm:w-[20.625rem] md:col-start-2 md:row-start-1 md:mb-0 md:w-[min(40vw,24rem)] md:justify-self-end lg:w-[min(44vw,34rem)] motion-reduce:animate-none">
            <div className="absolute -z-30 inset-[9%] rounded-full bg-[#e9ded0] shadow-[0_1.25rem_3.125rem_rgb(74_48_38_/_8%)]" />
            <div className="absolute -z-20 inset-[1%] rounded-full border border-secondary/30" />
            <div className="absolute -z-20 inset-[5%] rounded-full border border-secondary/15" />
            <span className="absolute -z-10 right-[6%] top-[19%] size-2 rounded-full bg-secondary shadow-[0_0_0_0.375rem_rgb(139_104_84_/_9%)]" />
            <span className="absolute -z-10 bottom-[18%] left-[5%] size-1.5 rounded-full bg-[#c49b71] shadow-[0_0_0_0.375rem_rgb(139_104_84_/_9%)]" />
            <span className="absolute left-[13%] top-[13%] size-5 animate-[sparkle-arrive_800ms_ease-out_180ms_both] text-[#b38a61] motion-reduce:animate-none">
              <Sparkle />
            </span>
            <div className="absolute inset-[12%] overflow-hidden rounded-full border-[0.3125rem] border-white/85 bg-[#e8e3dc] shadow-[0_0.875rem_2.375rem_rgb(74_48_38_/_14%)]">
              <Image
                src="/images/onboarding-image.jpg"
                alt="A smiling young Nigerian man looking at his phone"
                fill
                priority
                sizes="(min-width: 64rem) 34rem, (min-width: 48rem) 24rem, (min-width: 40rem) 20.625rem, 78vw"
                className="object-cover [object-position:center_23%]"
              />
            </div>

            <div className="absolute -left-[14%] bottom-[10%] z-10 flex min-h-[3.5625rem] animate-[card-arrive_650ms_ease-out_160ms_both] items-center gap-2 rounded-[0.9375rem] border border-primary/5 bg-white px-3 py-2.5 text-left shadow-[0_0.625rem_1.75rem_rgb(74_48_38_/_13%),0_0.125rem_0.3125rem_rgb(74_48_38_/_5%)] motion-reduce:animate-none md:-left-[10%] md:bottom-[12%]">
              <span className="grid size-8 flex-none place-items-center rounded-[0.625rem] bg-[#f5eee5] text-secondary sm:size-9">
                <span className="size-6">
                  <AjoMark />
                </span>
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[0.5rem] font-bold tracking-[0.071875rem] text-[#9a8474]">
                  GOOD THINGS GROW
                </span>
                <span className="whitespace-nowrap font-sans text-[0.75rem] font-bold text-primary sm:text-[0.8125rem]">
                  Our Ajo, Our Growth
                </span>
              </span>
              <span
                aria-hidden="true"
                className="mb-auto ml-0.5 mt-1 size-[0.4375rem] flex-none rounded-full bg-[#6b9877] shadow-[0_0_0_0.1875rem_#eef5ef]"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center md:col-start-1 md:row-start-1 md:items-start">
            <div className="max-w-[30.625rem]">
              <p className="mb-2.5 text-[0.5625rem] font-bold tracking-[0.1125rem] text-secondary sm:text-[0.625rem] md:mb-4">
                A LITTLE TOGETHER GOES A LONG WAY
              </p>
              <h1
                id="welcome-heading"
                className="m-0 font-sans text-[clamp(2.0625rem,9vw,2.6875rem)] font-bold leading-[1.09] tracking-[-0.1063rem] text-primary sm:text-5xl sm:tracking-[-0.125rem] md:text-[clamp(2.5rem,5vw,3.5rem)] md:leading-[1.05] lg:text-[clamp(3.5rem,5vw,4.5rem)] lg:tracking-[-0.15rem]"
              >
                Save together.
                <br />
                Grow together.
              </h1>
              <p className="mx-auto mt-3 max-w-[26.25rem] text-sm leading-[1.62] text-text-secondary sm:text-[0.9375rem] md:mx-0 md:mt-5 md:text-base lg:mt-6">
                Turn small contributions into big possibilities. Save with your
                people, stay on track, and grow together.
              </p>
            </div>

            <div className="mt-[1.375rem] w-full max-w-[22.5rem] sm:mt-[1.5625rem] md:mt-7">
              <Link
                className="group flex min-h-[3.375rem] items-center justify-center gap-3 rounded-[0.9375rem] border border-white/10 bg-button-primary text-[0.9375rem] font-bold text-button-primary-text shadow-[0_0.5rem_1.125rem_rgb(74_48_38_/_15%)] transition duration-200 hover:-translate-y-0.5 hover:bg-button-primary-hover hover:shadow-[0_0.6875rem_1.375rem_rgb(74_48_38_/_19%)] active:translate-y-0 focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-4 md:justify-center"
                href="/signup"
              >
                Get Started
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="size-5 transition-transform duration-200 group-hover:translate-x-[0.1875rem]"
                >
                  <path
                    d="M3.5 10h13m-5-5 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <p className="mt-[0.9375rem] text-[0.8125rem] text-text-secondary md:hidden">
                Already have an account?{" "}
                <Link
                  className="font-bold text-primary underline decoration-primary/40 underline-offset-[0.1875rem] hover:text-secondary-hover hover:decoration-2 focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-4"
                  href="/login"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* <footer className="flex items-center gap-2.5 pt-[0.5625rem] text-[0.625rem] tracking-[0.009375rem] text-[#9a8c80] md:justify-center">
          <span className="h-px w-6 bg-[#dfd2c4]" />
          <span>Better together, every step of the way</span>
          <span className="h-px w-6 bg-[#dfd2c4]" />
        </footer> */}
      </div>
    </main>
  );
}
