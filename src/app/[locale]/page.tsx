import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/site/About";
import { Advantages } from "@/components/site/Advantages";
import { Contact } from "@/components/site/Contact";
import { CtaBanner } from "@/components/site/CtaBanner";
import { FaqSection } from "@/components/site/FaqSection";
import { Hero } from "@/components/site/Hero";
import { JsonLd } from "@/components/site/JsonLd";
import { Process } from "@/components/site/Process";
import { Results } from "@/components/site/Results";
import { Reviews } from "@/components/site/Reviews";
import { Services } from "@/components/site/Services";
import type { Locale } from "@/i18n/routing";
import { getLocalizedExtras, getPublicServices, getSiteContent, localizeService } from "@/lib/content";
import { alternates, keywords, openGraph } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const { t, settings } = await getSiteContent(locale);
  return {
    title: { absolute: t["seo.home.title"] },
    description: t["seo.home.description"],
    keywords: keywords(t["seo.home.keywords"]),
    alternates: alternates(locale, ""),
    openGraph: openGraph(locale, "", { title: t["seo.home.title"], description: t["seo.home.description"], siteName: settings.brandName, image: settings.ogImage }),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [{ t, settings }, rawServices, extras, ta] = await Promise.all([getSiteContent(locale), getPublicServices(), getLocalizedExtras(locale), getTranslations("actions")]);
  const services = rawServices.map((s) => localizeService(s, locale));

  return (
    <>
      <JsonLd t={t} settings={settings} locale={locale} services={services} />
      <Hero
        eyebrow={t["hero.eyebrow"] ?? ""}
        title={t["hero.title"] ?? ""}
        subtitle={t["hero.subtitle"] ?? ""}
        features={[t["hero.feature1"], t["hero.feature2"], t["hero.feature3"]].filter((f): f is string => !!f)}
        badgeValue={t["hero.badge.value"] ?? ""}
        badgeLabel={t["hero.badge.label"] ?? ""}
        image={settings.heroImage}
        whatsapp={settings.whatsapp}
      />
      <About t={t} image={settings.aboutImage} />
      <Services t={t} services={services} />
      <Advantages t={t} />
      <Process t={t} image={settings.processImage} />
      <Results t={t} items={extras.results} />
      <Reviews t={t} items={extras.testimonials} />
      <FaqSection t={t} items={extras.faq} />
      <CtaBanner t={t} label={ta("book")} />
      <Contact t={t} settings={settings} />
    </>
  );
}
