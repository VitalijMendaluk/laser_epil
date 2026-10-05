"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { CATEGORIES, type Category } from "@/lib/categories";
import type { LocalizedService } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";

type Filter = "ALL" | Category;

export function ServicesGrid({ services }: { services: LocalizedService[] }) {
  const t = useTranslations("service");
  const [filter, setFilter] = useState<Filter>("ALL");
  const present = CATEGORIES.filter((c) => services.some((s) => s.category === c));
  const visible = useMemo(() => (filter === "ALL" ? services : services.filter((s) => s.category === filter)), [services, filter]);

  return (
    <div>
      {present.length > 1 && (
        <div className="mt-10 flex flex-wrap gap-2" role="group">
          {(["ALL", ...present] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition",
                filter === f ? "border-cocoa bg-cocoa text-ivory" : "border-cocoa/15 text-cocoa/70 hover:border-cocoa/40",
              )}
            >
              {f === "ALL" ? t("all") : t(f)}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((s, i) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
