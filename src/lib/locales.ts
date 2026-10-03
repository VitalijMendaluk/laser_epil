import type { Locale } from "@/i18n/routing";

/** Column suffix used for translated DB fields: nameKa / nameUk / nameEn. */
export const LOCALE_SUFFIX = { ka: "Ka", uk: "Uk", en: "En" } as const satisfies Record<Locale, string>;

export const LOCALE_META: Record<Locale, { label: string; short: string; flag: string; og: string; hreflang: string }> = {
  ka: { label: "ქართული", short: "ქარ", flag: "🇬🇪", og: "ka_GE", hreflang: "ka" },
  uk: { label: "Українська", short: "УКР", flag: "🇺🇦", og: "uk_UA", hreflang: "uk" },
  en: { label: "English", short: "EN", flag: "🇬🇧", og: "en_US", hreflang: "en" },
};

/** Order in which translations are tried when the requested one is empty. */
const FALLBACK: Record<Locale, Locale[]> = { ka: ["ka", "en", "uk"], uk: ["uk", "en", "ka"], en: ["en", "ka", "uk"] };

/** Reads `${base}Ka|Uk|En` from a record, falling back to another language if empty. */
export function pickLocalized<T extends Record<string, unknown>>(row: T, base: string, locale: Locale): string {
  for (const l of FALLBACK[locale]) {
    const v = row[`${base}${LOCALE_SUFFIX[l]}`];
    if (typeof v === "string" && v.trim()) return v;
  }
  return "";
}
