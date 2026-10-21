import Image from "next/image";

export default function AuthImagePanel() {
  return (
    <aside
      className="relative isolate min-h-[14rem] overflow-hidden bg-[#80654d] sm:min-h-[16rem] md:min-h-0"
      aria-label="A sunlit green plant, a reminder that small steps bring greater growth"
    >
      <Image
        src="/images/growing-plants.jpg"
        alt="Green leaves in warm afternoon sunlight and soft shadows"
        fill
        priority
        unoptimized
        sizes="(min-width: 768px) 45vw, 100vw"
        className="object-cover [object-position:42%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#251810]/65 via-[#38271c]/10 to-[#4a3026]/[0.04]"
      />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-16 text-white sm:px-9 sm:pb-8 md:px-7 md:pb-8 lg:px-10 lg:pb-11 xl:px-[4.5rem] xl:pb-[4.5rem]">
        <p className="mb-2 text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-white/75 sm:mb-3 sm:text-[0.625rem]">
          BETTER, TOGETHER
        </p>
        <h2 className="max-w-[29rem] font-sans text-[clamp(1.75rem,3.3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.07rem]">
          Small steps.
          <br />
          Greater growth.
        </h2>
        <p className="mt-2 max-w-[23rem] text-xs leading-5 text-white/80 sm:mt-4 sm:text-sm sm:leading-6">
          Good things take root when we grow them together.
        </p>
      </div>
    </aside>
  );
}
