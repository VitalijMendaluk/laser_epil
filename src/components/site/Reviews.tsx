import type { LocalizedTestimonial, SiteTexts } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { TestimonialsCarousel } from "./Testimonials";

export function Reviews({ t, items }: { t: SiteTexts; items: LocalizedTestimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section id="reviews" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading eyebrow={t["testimonials.eyebrow"]} title={t["testimonials.title"] ?? ""} align="center" />
        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
