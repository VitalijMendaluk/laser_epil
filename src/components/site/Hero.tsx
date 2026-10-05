"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { trackContact } from "@/lib/track";
import { cn, whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "../ui/icons";
import { useBooking } from "./BookingProvider";

type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: string[];
  badgeValue: string;
  badgeLabel: string;
  image: string;
  whatsapp: string;
};

export function Hero({ eyebrow, title, subtitle, features, badgeValue, badgeLabel, image, whatsapp }: HeroProps) {
  const t = useTranslations("actions");
  const locale = useLocale();
  const { openBooking } = useBooking();
  const words = title.split(" ");

  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* Soft nude glow */}
      {/* Soft glow as gradients — CSS blur filters make iOS Safari paint white boxes behind animated text. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgb(239_228_216/0.9),transparent_45%),radial-gradient(circle_at_0%_100%,rgb(247_241_234),transparent_40%)]" aria-hidden />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-36">
        <div className="relative z-10">
          <p className="eyebrow anim-rise">
            {eyebrow}
          </p>

          <h1
            className={cn(
              "mt-7 font-display font-light tracking-tight",
              locale === "ka" ? "text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.2]" : "text-[clamp(2.9rem,6.6vw,6.2rem)] leading-[1.02]",
            )}
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <span
                  className={cn("anim-word inline-block", i === words.length - 1 && "pr-[0.15em] italic text-gold-dark")}
                  style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                >
                  {word}
                  {i < words.length - 1 && " "}
                </span>
              </span>
            ))}
          </h1>

          <p className="anim-rise mt-7 max-w-xl text-base leading-relaxed text-taupe sm:text-lg" style={{ animationDelay: "0.35s" }}>
            {subtitle}
          </p>

          <div className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.45s" }}>
            <button type="button" className="btn-primary sm:min-w-52" onClick={() => openBooking()}>
              {t("book")}
            </button>
            {whatsapp && (
              <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-outline sm:min-w-52" onClick={() => trackContact("whatsapp")}>
                <WhatsAppIcon size={16} className="text-[#25D366]" /> {t("whatsapp")}
              </a>
            )}
          </div>

          <ul className="anim-rise mt-12 flex flex-wrap gap-x-8 gap-y-3" style={{ animationDelay: "0.55s" }}>
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-cocoa/70">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="anim-rise relative mx-auto w-full max-w-[520px]" style={{ animationDelay: "0.15s" }}>
          {/* Offset gold arch */}
          <div className="absolute -right-4 -top-4 bottom-8 left-8 rounded-t-full border border-gold/50 sm:-right-6 sm:-top-6" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-nude shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0 animate-[kenburns_14s_ease-out_forwards]">
              {image && <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 520px, 90vw" className="object-cover object-top" />}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/25 via-transparent to-transparent" />
          </div>

          {badgeValue && (
            <div className="anim-rise absolute -left-2 bottom-10 rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-soft)] sm:-left-10" style={{ animationDelay: "0.6s" }}>
              <div className="flex gap-0.5 text-gold" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-2 font-display text-3xl leading-none">{badgeValue}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-taupe">{badgeLabel}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
