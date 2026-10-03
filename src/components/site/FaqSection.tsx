import type { LocalizedFaq, SiteTexts } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { FaqList } from "./Faq";
import { SectionHeading } from "./SectionHeading";

export function FaqSection({ t, items }: { t: SiteTexts; items: LocalizedFaq[] }) {
  if (items.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
  };
  return (
    <section id="faq" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow={t["faq.eyebrow"]} title={t["faq.title"] ?? ""} subtitle={t["faq.subtitle"]} className="lg:sticky lg:top-32 lg:self-start" />
        <Reveal delay={0.1}>
          <FaqList items={items} />
        </Reveal>
      </div>
    </section>
  );
}
