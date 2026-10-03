import Image from "next/image";
import type { SiteTexts } from "@/lib/content";
import { Reveal } from "../ui/Reveal";

export function About({ t, image }: { t: SiteTexts; image: string }) {
  const stats = [1, 2, 3].map((n) => ({ value: t[`about.stat${n}.value`], label: t[`about.stat${n}.label`] }));

  return (
    <section id="about" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[560px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-nude">
            {image && <Image src={image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />}
          </div>
          <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-full w-full rounded-[2rem] border border-gold/45 sm:block" aria-hidden />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">{t["about.eyebrow"]}</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-light leading-[1.08] tracking-tight">{t["about.title"]}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-taupe sm:text-lg">
              {t["about.text"]?.split(/\n{2,}/).map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-cocoa/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl text-gold-dark sm:text-5xl">{s.value}</dd>
                  <dd className="mt-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-taupe sm:text-[11px]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
