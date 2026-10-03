import "server-only";
import { unstable_cache } from "next/cache";
import type { Locale } from "@/i18n/routing";
import { SETTING_FIELDS, TEXT_FIELDS, type SettingKey } from "./content-schema";
import { pickLocalized } from "./locales";
import { prisma } from "./prisma";

export const CONTENT_TAG = "content";
export const SERVICES_TAG = "services";
export const TESTIMONIALS_TAG = "testimonials";
export const RESULTS_TAG = "results";
export const FAQ_TAG = "faq";

const loadContent = unstable_cache(
  async () => {
    const [texts, settings] = await Promise.all([prisma.siteText.findMany(), prisma.setting.findMany()]);
    return { texts, settings };
  },
  ["site-content"],
  { tags: [CONTENT_TAG], revalidate: 3600 },
);

export type SiteSettings = Record<SettingKey, string>;
export type SiteTexts = Record<string, string>;

/** Merged CMS content for a locale, with schema defaults as a fallback. */
export async function getSiteContent(locale: Locale) {
  const { texts, settings } = await loadContent();
  const textMap = new Map(texts.map((t) => [t.key, t]));
  const settingMap = new Map(settings.map((s) => [s.key, s.value]));

  const t: SiteTexts = {};
  for (const field of TEXT_FIELDS) {
    const row = textMap.get(field.key);
    const value = row?.[locale]?.trim();
    t[field.key] = value || field[locale];
  }

  const s = {} as SiteSettings;
  for (const field of SETTING_FIELDS) {
    s[field.key] = settingMap.get(field.key) ?? field.default;
  }

  return { t, settings: s };
}

/* ── Services ─────────────────────────────────────────── */

export const getPublicServices = unstable_cache(
  async () =>
    prisma.service.findMany({
      where: { isVisible: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        slug: true,
        nameKa: true,
        nameUk: true,
        nameEn: true,
        descriptionKa: true,
        descriptionUk: true,
        descriptionEn: true,
        category: true,
        price: true,
        durationMin: true,
        image: true,
      },
    }),
  ["public-services"],
  { tags: [SERVICES_TAG], revalidate: 3600 },
);

export type PublicService = Awaited<ReturnType<typeof getPublicServices>>[number];

export function localizeService(s: PublicService, locale: Locale) {
  return {
    id: s.id,
    slug: s.slug,
    category: s.category,
    price: s.price,
    durationMin: s.durationMin,
    image: s.image,
    name: pickLocalized(s, "name", locale),
    description: pickLocalized(s, "description", locale),
  };
}

export type LocalizedService = ReturnType<typeof localizeService>;

/* ── Testimonials, Before/After, FAQ ──────────────────── */

export const getPublicTestimonials = unstable_cache(
  async () => prisma.testimonial.findMany({ where: { isVisible: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
  ["public-testimonials"],
  { tags: [TESTIMONIALS_TAG], revalidate: 3600 },
);

export const getPublicResults = unstable_cache(
  async () => prisma.beforeAfter.findMany({ where: { isVisible: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
  ["public-results"],
  { tags: [RESULTS_TAG], revalidate: 3600 },
);

export const getPublicFaq = unstable_cache(
  async () => prisma.faqItem.findMany({ where: { isVisible: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
  ["public-faq"],
  { tags: [FAQ_TAG], revalidate: 3600 },
);

export async function getLocalizedExtras(locale: Locale) {
  const [testimonials, results, faq] = await Promise.all([getPublicTestimonials(), getPublicResults(), getPublicFaq()]);
  return {
    testimonials: testimonials
      .map((r) => ({ id: r.id, name: r.name, photo: r.photo, rating: r.rating, text: pickLocalized(r, "text", locale) }))
      .filter((r) => r.text),
    results: results.map((r) => ({ id: r.id, before: r.beforeImage, after: r.afterImage, caption: pickLocalized(r, "caption", locale) })),
    faq: faq.map((r) => ({ id: r.id, question: pickLocalized(r, "question", locale), answer: pickLocalized(r, "answer", locale) })),
  };
}

export type LocalizedTestimonial = Awaited<ReturnType<typeof getLocalizedExtras>>["testimonials"][number];
export type LocalizedResult = Awaited<ReturnType<typeof getLocalizedExtras>>["results"][number];
export type LocalizedFaq = Awaited<ReturnType<typeof getLocalizedExtras>>["faq"][number];
