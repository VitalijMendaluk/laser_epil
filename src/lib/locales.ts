import type { Locale } from "@/i18n/routing";

/** Column suffix used for translated DB fields: nameKa / nameRu / nameEn. */
export const LOCALE_SUFFIX = { ka: "Ka", ru: "Ru", en: "En" } as const satisfies Record<Locale, string>;

export const LOCALE_META: Record<Locale, { label: string; short: string; flag: string; og: string; hreflang: string }> = {
  ka: { label: "ქართული", short: "ქარ", flag: "🇬🇪", og: "ka_GE", hreflang: "ka" },
  ru: { label: "Русский", short: "РУС", flag: "🇷🇺", og: "ru_RU", hreflang: "ru" },
  en: { label: "English", short: "EN", flag: "🇬🇧", og: "en_US", hreflang: "en" },
};

/** Order in which translations are tried when the requested one is empty. */
const FALLBACK: Record<Locale, Locale[]> = { ka: ["ka", "ru", "en"], ru: ["ru", "en", "ka"], en: ["en", "ru", "ka"] };

/** Reads `${base}Ka|Ru|En` from a record, falling back to another language if empty. */
export function pickLocalized<T extends Record<string, unknown>>(row: T, base: string, locale: Locale): string {
  for (const l of FALLBACK[locale]) {
    const v = row[`${base}${LOCALE_SUFFIX[l]}`];
    if (typeof v === "string" && v.trim()) return v;
  }
  return "";
}
