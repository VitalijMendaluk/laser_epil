import { Gem, HeartHandshake, ShieldCheck, Sofa, Zap } from "lucide-react";
import type { SiteTexts } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";

const ICONS = [Zap, ShieldCheck, Gem, HeartHandshake, Sofa];

export function Advantages({ t }: { t: SiteTexts }) {
  return (
    <section id="why-us" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading eyebrow={t["advantages.eyebrow"]} title={t["advantages.title"] ?? ""} align="center" />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ICONS.map((Icon, i) => (
            <Reveal key={i} delay={i * 0.08} className="group relative h-full rounded-[1.75rem] border border-cocoa/[0.07] bg-white p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-soft)]">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-gold-dark transition-colors duration-500 group-hover:bg-nude">
                <Icon size={26} strokeWidth={1.2} />
              </span>
              <h3 className="mt-6 font-display text-[1.45rem] leading-tight">{t[`advantages.${i + 1}.title`]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe">{t[`advantages.${i + 1}.text`]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
