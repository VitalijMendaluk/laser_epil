import type { Locale } from "@/i18n/routing";
import type { LocalizedService, SiteSettings, SiteTexts } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export function JsonLd({ t, settings, locale, services }: { t: SiteTexts; settings: SiteSettings; locale: Locale; services: LocalizedService[] }) {
  const currency = /^[A-Z]{3}$/.test(settings.currency) ? settings.currency : "GEL";
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: settings.brandName,
    description: t["seo.home.description"],
    url: siteUrl(`/${locale}`),
    telephone: settings.phone,
    email: settings.email || undefined,
    image: settings.ogImage || undefined,
    priceRange: "$$",
    address: { "@type": "PostalAddress", streetAddress: t["contact.address"], addressLocality: "Kutaisi", addressCountry: "GE" },
    areaServed: { "@type": "City", name: "Kutaisi" },
    sameAs: [settings.instagram, settings.facebook].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t["services.title"],
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        price: s.price,
        priceCurrency: currency,
        itemOffered: { "@type": "Service", name: s.name, description: s.description || undefined },
      })),
    },
  };
  // JSON.stringify output is escaped for "<" to prevent script injection from CMS values.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
