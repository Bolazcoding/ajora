import Image from "next/image";
import Link from "next/link";
import AjoMark from "./_ui/AjoMark";
import Sparkle from "./_ui/Sparkle";

export default function Onboarding() {
  return (
    <main className="relative flex min-h-svh justify-center overflow-hidden bg-background [background-image:radial-gradient(ellipse_at_50%_33%,rgb(233_222_208_/_43%)_0%,rgb(248_244_237_/_0%)_42%)] px-[1.375rem] pb-[1.125rem] pt-[1.4375rem] [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:px-[1.375rem] [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:pb-3 [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:pt-[0.875rem] sm:px-12 sm:pb-[1.375rem] sm:pt-[2.1875rem]">
      <div className="flex w-full max-w-[67.5rem] flex-col items-center">
        <header
          className="z-10 flex items-center gap-[0.5625rem] self-start text-primary"
          aria-label="Ajora"
        >
          <span className="grid size-[2.125rem] place-items-center rounded-full border border-primary/10 bg-white/65 sm:size-[2.375rem]">
            <span className="size-[1.4375rem]">
              <AjoMark />
            </span>
          </span>
          <span className="font-serif text-[1.25rem] font-bold tracking-[-0.04375rem] sm:text-[1.375rem]">
            Ajora
          </span>
        </header>

        <section
          className="flex w-full flex-1 flex-col items-center justify-center pb-[0.875rem] pt-2 text-center"
          aria-labelledby="welcome-heading"
        >
          <div className="relative isolate mb-[0.875rem] grid aspect-square w-[min(78vw,20.625rem)] flex-none place-items-center animate-[hero-arrive_700ms_ease-out_both] sm:mb-[1.0625rem] sm:w-[20.625rem] [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:mb-[0.4375rem] [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:w-[min(66vw,15.625rem)] motion-reduce:animate-none">
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
                sizes="(max-width: 40rem) 15.5rem, 18.75rem"
                className="object-cover [object-position:center_23%]"
              />
            </div>
            <div className="absolute -left-[14%] bottom-[10%] z-10 flex min-h-[3.5625rem] animate-[card-arrive_650ms_ease-out_160ms_both] items-center gap-2.5 rounded-[0.9375rem] border border-primary/5 bg-white px-[0.8125rem] py-[0.5625rem] pl-2.5 text-left shadow-[0_0.625rem_1.75rem_rgb(74_48_38_/_13%),0_0.125rem_0.3125rem_rgb(74_48_38_/_5%)] motion-reduce:animate-none">
              <span className="grid size-9 flex-none place-items-center rounded-xl bg-[#f5eee5] text-secondary">
                <span className="size-[1.4375rem]">
                  <AjoMark />
                </span>
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[0.5rem] font-bold tracking-[0.071875rem] text-[#9a8474]">
                  GOOD THINGS GROW
                </span>
                <span className="whitespace-nowrap font-serif text-[0.8125rem] font-bold text-primary">
                  Our Ajo, Our Growth
                </span>
              </span>
              <span
                aria-hidden="true"
                className="mb-auto ml-[0.1875rem] mt-0.5 size-[0.4375rem] rounded-full bg-[#6b9877] shadow-[0_0_0_0.1875rem_#eef5ef]"
              />
            </div>
          </div>

          <div className="max-w-[30.625rem]">
            <p className="mb-2.5 text-[0.5625rem] font-bold tracking-[0.1125rem] text-secondary">
              A LITTLE TOGETHER GOES A LONG WAY
            </p>
            <h1
              id="welcome-heading"
              className="m-0 font-serif text-[clamp(2.0625rem,9vw,2.6875rem)] font-bold leading-[1.09] tracking-[-0.1063rem] text-primary sm:text-5xl sm:tracking-[-0.125rem] [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:text-[clamp(1.875rem,8vw,2.25rem)]"
            >
              Save together.
              <br className="sm:hidden" /> Grow together.
            </h1>
            <p className="mx-auto mt-3 max-w-[26.25rem] text-sm leading-[1.62] text-text-secondary [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:mt-2 [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:text-[0.8125rem] sm:text-[0.9375rem]">
              Turn small contributions into big possibilities. Save with your
              people, stay on track, and grow together.
            </p>
          </div>

          <div className="mt-[1.375rem] w-full max-w-[22.5rem] [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:mt-[0.9375rem] sm:mt-[1.5625rem]">
            <Link
              className="group flex min-h-[3.375rem] items-center justify-center gap-3 rounded-[0.9375rem] border border-white/10 bg-button-primary text-[0.9375rem] font-bold text-button-primary-text shadow-[0_0.5rem_1.125rem_rgb(74_48_38_/_15%)] transition duration-200 hover:-translate-y-0.5 hover:bg-button-primary-hover hover:shadow-[0_0.6875rem_1.375rem_rgb(74_48_38_/_19%)] active:translate-y-0 focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-4 [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:min-h-[3.0625rem]"
              href="/signup"
            >
              Get Started
              <span
                aria-hidden="true"
                className="text-xl font-normal leading-none transition-transform duration-200 group-hover:translate-x-[0.1875rem]"
              >
                â†’
              </span>
            </Link>
            <p className="mt-[0.9375rem] text-[0.8125rem] text-text-secondary [@media(max-height:46.25rem)_and_(max-width:43.6875rem)]:mt-[0.6875rem]">
              Already have an account?{" "}
              <Link
                className="font-bold text-primary underline decoration-primary/40 underline-offset-[0.1875rem] hover:text-secondary-hover hover:decoration-2 focus-visible:outline-3 focus-visible:outline-focus focus-visible:outline-offset-4"
                href="/login"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>

        <footer className="flex items-center gap-2.5 pt-[0.5625rem] text-[0.625rem] tracking-[0.009375rem] text-[#9a8c80]">
          <span className="h-px w-6 bg-[#dfd2c4]" />
          <span>Better together, every step of the way</span>
          <span className="h-px w-6 bg-[#dfd2c4]" />
        </footer>
      </div>
    </main>
  );
}
