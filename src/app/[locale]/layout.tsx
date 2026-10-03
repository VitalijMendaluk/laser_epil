import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { BookingProvider } from "@/components/site/BookingProvider";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Tracking } from "@/components/site/Tracking";
import { routing, type Locale } from "@/i18n/routing";
import { getPublicServices, getSiteContent, localizeService } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { LOCALE_META } from "@/lib/locales";
import { keywords } from "@/lib/seo";
import { turnstileSiteKey } from "@/lib/turnstile";
import { parseTimeSlots, siteUrl } from "@/lib/utils";
import "../globals.css";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#fdfbf8",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { t, settings } = await getSiteContent(locale);

  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t["seo.home.title"] ?? settings.brandName, template: `%s | ${settings.brandName}` },
    description: t["seo.home.description"],
    keywords: keywords(t["seo.home.keywords"]),
    applicationName: settings.brandName,
    openGraph: {
      type: "website",
      siteName: settings.brandName,
      locale: LOCALE_META[locale].og,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => LOCALE_META[l].og),
      images: settings.ogImage ? [{ url: settings.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [{ t, settings }, services] = await Promise.all([getSiteContent(locale as Locale), getPublicServices()]);
  const bookingServices = services.map((s) => {
    const l = localizeService(s, locale as Locale);
    return { id: l.id, name: l.name, price: l.price, durationMin: l.durationMin, image: l.image };
  });

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <Tracking pixelId={settings.metaPixelId} gaId={settings.gaId} />
        <NextIntlClientProvider>
          <BookingProvider
            services={bookingServices}
            currency={settings.currency}
            timeSlots={parseTimeSlots(settings.timeSlots)}
            captchaSiteKey={turnstileSiteKey()}
          >
            <Header brandName={settings.brandName} phone={settings.phone} />
            <main>{children}</main>
            <Footer t={t} settings={settings} />
            <FloatingActions whatsapp={settings.whatsapp} instagram={settings.instagram} />
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
