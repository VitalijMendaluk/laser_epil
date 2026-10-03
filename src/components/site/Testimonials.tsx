"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { LocalizedTestimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel({ items }: { items: LocalizedTestimonial[] }) {
  const t = useTranslations("reviews");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const item = items[index];
  if (!item) return null;

  return (
    <div className="relative mx-auto mt-14 max-w-4xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative min-h-[340px] rounded-[2rem] bg-white px-6 py-12 text-center shadow-[var(--shadow-soft)] ring-1 ring-cocoa/[0.05] sm:px-16">
        <Quote size={40} strokeWidth={1} className="mx-auto text-gold" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.figure key={item.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <blockquote className="mt-6 font-display text-[clamp(1.35rem,2.4vw,1.9rem)] font-light italic leading-snug text-cocoa-2">“{item.text}”</blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-3">
              {item.photo ? (
                <span className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold/40 ring-offset-2 ring-offset-white">
                  <Image src={item.photo} alt={item.name} fill sizes="64px" className="object-cover" />
                </span>
              ) : (
                <span className="grid h-16 w-16 place-items-center rounded-full bg-nude font-display text-2xl text-gold-dark">{item.name.charAt(0)}</span>
              )}
              <span className="font-semibold">{item.name}</span>
              <span className="flex gap-0.5 text-gold" role="img" aria-label={t("rating", { rating: item.rating })}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} strokeWidth={1.2} fill={i < item.rating ? "currentColor" : "none"} />
                ))}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/15 transition hover:border-gold hover:text-gold-dark">
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <div className="flex gap-2">
            {items.map((r, i) => (
              <button key={r.id} type="button" onClick={() => setIndex(i)} aria-label={`${i + 1} / ${items.length}`} aria-current={i === index} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-8 bg-gold" : "w-1.5 bg-cocoa/20 hover:bg-cocoa/40")} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label={t("next")} className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/15 transition hover:border-gold hover:text-gold-dark">
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
