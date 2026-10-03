import type { LocalizedResult, SiteTexts } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { SectionHeading } from "./SectionHeading";

export function Results({ t, items }: { t: SiteTexts; items: LocalizedResult[] }) {
  if (items.length === 0) return null;
  return (
    <section id="results" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading eyebrow={t["results.eyebrow"]} title={t["results.title"] ?? ""} subtitle={t["results.subtitle"]} align="center" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.1}>
              <BeforeAfterSlider before={item.before} after={item.after} caption={item.caption} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
