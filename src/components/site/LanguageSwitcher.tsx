"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LOCALE_META } from "@/lib/locales";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("language")} className={cn("flex items-center text-[11px] font-semibold tracking-[0.14em]", className)}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-2.5 h-3 w-px bg-cocoa/20" aria-hidden />}
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            title={LOCALE_META[l].label}
            aria-current={l === locale ? "true" : undefined}
            className={cn("transition-colors", l === locale ? "text-gold-dark" : "text-cocoa/45 hover:text-cocoa")}
          >
            {LOCALE_META[l].short}
          </Link>
        </span>
      ))}
    </nav>
  );
}
