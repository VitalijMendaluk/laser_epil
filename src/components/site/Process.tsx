import Image from "next/image";
import type { SiteTexts } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process({ t, image }: { t: SiteTexts; image: string }) {
  return (
    <section id="process" className="scroll-mt-20 bg-cocoa py-24 text-ivory sm:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <div className="[&_.eyebrow]:text-gold-light [&_p]:text-ivory/60">
            <SectionHeading eyebrow={t["process.eyebrow"]} title={t["process.title"] ?? ""} />
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] bg-ivory/10 sm:grid-cols-2">
            {[1, 2, 3, 4].map((n, i) => (
              <Reveal key={n} delay={i * 0.08} className="h-full bg-cocoa p-7 sm:p-8">
                <li className="list-none">
                  <span className="font-display text-5xl font-light italic text-gold">0{n}</span>
                  <h3 className="mt-4 font-display text-2xl">{t[`process.${n}.title`]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/60">{t[`process.${n}.text`]}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        {image && (
          <Reveal className="relative mx-auto hidden w-full max-w-[460px] lg:block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-b-full rounded-t-full">
              <Image src={image} alt="" fill sizes="460px" className="object-cover" />
            </div>
            <div className="pointer-events-none absolute -inset-4 rounded-full border border-gold/40" aria-hidden />
          </Reveal>
        )}
      </div>
    </section>
  );
}
