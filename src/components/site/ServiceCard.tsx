"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { LocalizedService } from "@/lib/content";
import { formatPrice } from "@/lib/utils";
import { useBooking } from "./BookingProvider";

export function ServiceCard({ service }: { service: LocalizedService }) {
  const t = useTranslations("service");
  const { openBooking, currency } = useBooking();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_50px_-35px_rgba(46,36,32,0.35)] ring-1 ring-cocoa/[0.06] transition-all duration-500 ease-lux hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-nude">
        {service.image && (
          <Image src={service.image} alt={service.name} fill sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-105" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cocoa/80 backdrop-blur">{t(service.category)}</span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-[1.7rem] leading-tight">{service.name}</h3>
        {service.description && <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-taupe">{service.description}</p>}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="font-display text-3xl leading-none text-gold-dark">{formatPrice(service.price, currency)}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-taupe">
              <Clock size={13} strokeWidth={1.5} /> {t("minutes", { count: service.durationMin })}
            </p>
          </div>
          <button type="button" className="btn-outline px-5 py-2.5" onClick={() => openBooking(service.id)}>
            {t("book")}
          </button>
        </div>
      </div>
    </article>
  );
}
