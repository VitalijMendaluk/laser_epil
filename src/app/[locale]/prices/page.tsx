import { setRequestLocale } from "next-intl/server";
import { BookButton } from "@/components/site/BookingProvider";
import { PriceTable } from "@/components/site/PriceTable";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPublicServices, getSiteContent, localizeService } from "@/lib/content";
import { alternates, keywords, openGraph } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const { t, settings } = await getSiteContent(locale);
  return {
    title: { absolute: t["seo.prices.title"] },
    description: t["seo.prices.description"],
    keywords: keywords(t["seo.prices.keywords"]),
    alternates: alternates(locale, "/prices"),
    openGraph: openGraph(locale, "/prices", { title: t["seo.prices.title"], description: t["seo.prices.description"], siteName: settings.brandName, image: settings.ogImage }),
  };
}

export default async function PricesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [{ t, settings }, services, ta] = await Promise.all([getSiteContent(locale), getPublicServices(), getTranslations("actions")]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgb(239_228_216/0.9),transparent_40%)]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
        <SectionHeading as="h1" eyebrow={t["prices.eyebrow"]} title={t["prices.title"] ?? ""} subtitle={t["prices.subtitle"]} className="mb-14" />
        <PriceTable services={services.map((s) => localizeService(s, locale))} currency={settings.currency} />
        {t["prices.note"] && (
          <Reveal className="mt-10 rounded-[1.5rem] border border-gold/30 bg-cream px-6 py-5 text-sm leading-relaxed text-cocoa-2 sm:px-8">{t["prices.note"]}</Reveal>
        )}
        <Reveal className="mt-12 text-center">
          <BookButton className="btn-primary sm:min-w-56">{ta("book")}</BookButton>
        </Reveal>
      </div>
    </div>
  );
}
