import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { LocalizedService, SiteTexts } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServicesGrid } from "./ServicesGrid";

export async function Services({ t, services }: { t: SiteTexts; services: LocalizedService[] }) {
  const ta = await getTranslations("actions");
  if (services.length === 0) return null;

  return (
    <section id="services" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading eyebrow={t["services.eyebrow"]} title={t["services.title"] ?? ""} subtitle={t["services.subtitle"]} />
        <Reveal>
          <Link href="/prices" className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            {ta("viewPrices")}
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
      <ServicesGrid services={services} />
    </section>
  );
}
