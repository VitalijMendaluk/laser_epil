import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { LOCALE_META } from "@/lib/locales";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/prices"];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: siteUrl(`/${locale}${path}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [LOCALE_META[l].hreflang, siteUrl(`/${l}${path}`)])),
      },
    })),
  );
}
