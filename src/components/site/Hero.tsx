"use client";

import { motion } from "framer-motion";
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

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ eyebrow, title, subtitle, features, badgeValue, badgeLabel, image, whatsapp }: HeroProps) {
  const t = useTranslations("actions");
  const locale = useLocale();
  const { openBooking } = useBooking();
  const words = title.split(" ");

  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* Soft nude glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[680px] w-[680px] rounded-full bg-nude/70 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-60 -left-40 h-[520px] w-[520px] rounded-full bg-cream blur-3xl" aria-hidden />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-36">
        <div className="relative z-10">
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2, ease }}>
            {eyebrow}
          </motion.p>

          <h1
            className={cn(
              "mt-7 font-display font-light tracking-tight",
              locale === "ka" ? "text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.2]" : "text-[clamp(2.9rem,6.6vw,6.2rem)] leading-[1.02]",
            )}
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={cn("inline-block", i === words.length - 1 && "pr-[0.15em] italic text-gold-dark")}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.08, ease }}
                >
                  {word}
                  {i < words.length - 1 && " "}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="mt-7 max-w-xl text-base leading-relaxed text-taupe sm:text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.85, ease }}>
            {subtitle}
          </motion.p>

          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.05, ease }}>
            <button type="button" className="btn-primary sm:min-w-52" onClick={() => openBooking()}>
              {t("book")}
            </button>
            {whatsapp && (
              <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-outline sm:min-w-52" onClick={() => trackContact("whatsapp")}>
                <WhatsAppIcon size={16} className="text-[#25D366]" /> {t("whatsapp")}
              </a>
            )}
          </motion.div>

          <motion.ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.3 }}>
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-cocoa/70">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                {f}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div className="relative mx-auto w-full max-w-[520px]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.3, ease }}>
          {/* Offset gold arch */}
          <div className="absolute -right-4 -top-4 bottom-8 left-8 rounded-t-full border border-gold/50 sm:-right-6 sm:-top-6" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-nude shadow-[var(--shadow-soft)]">
            <div className="absolute inset-0 animate-[kenburns_14s_ease-out_forwards]">
              {image && <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 520px, 90vw" className="object-cover object-top" />}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/25 via-transparent to-transparent" />
          </div>

          {badgeValue && (
            <motion.div
              className="absolute -left-2 bottom-10 rounded-2xl bg-white/90 px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur sm:-left-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4, ease }}
            >
              <div className="flex gap-0.5 text-gold" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-2 font-display text-3xl leading-none">{badgeValue}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-taupe">{badgeLabel}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
