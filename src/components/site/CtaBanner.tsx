import type { SiteTexts } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { BookButton } from "./BookingProvider";

export function CtaBanner({ t, label }: { t: SiteTexts; label: string }) {
  return (
    <section className="px-5 pt-24 sm:px-8 sm:pt-32">
      <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.25rem] bg-nude px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-gold/40" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full border border-gold/30" aria-hidden />
        <h2 className="relative font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight">{t["cta.title"]}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-taupe sm:text-lg">{t["cta.text"]}</p>
        <BookButton className="btn-primary relative mt-9 sm:min-w-56">{label}</BookButton>
      </Reveal>
    </section>
  );
}
