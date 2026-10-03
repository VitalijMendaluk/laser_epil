import { routing, type Locale } from "@/i18n/routing";
import { LOCALE_META } from "./locales";

/** Canonical + hreflang alternates for a localized path such as "/prices". */
export function alternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[LOCALE_META[l].hreflang] = `/${l}${path}`;
  languages["x-default"] = `/${routing.defaultLocale}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}

/** Full Open Graph block — page-level openGraph replaces the layout's, so it must be complete. */
export function openGraph(
  locale: Locale,
  path: string,
  { title, description, siteName, image }: { title?: string; description?: string; siteName: string; image?: string },
) {
  return {
    type: "website" as const,
    title,
    description,
    siteName,
    url: `/${locale}${path}`,
    locale: LOCALE_META[locale].og,
    alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => LOCALE_META[l].og),
    images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
  };
}

export function keywords(value: string | undefined) {
  return value?.split(",").map((k) => k.trim()).filter(Boolean);
}
