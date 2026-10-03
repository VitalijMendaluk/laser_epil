"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { LocalizedFaq } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FaqList({ items }: { items: LocalizedFaq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className="divide-y divide-cocoa/10 border-y border-cocoa/10">
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span className="font-display text-xl leading-snug sm:text-2xl">{item.question}</span>
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500", isOpen ? "rotate-45 border-gold bg-gold text-cocoa" : "border-cocoa/15 text-gold-dark")}>
                  <Plus size={16} strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl whitespace-pre-line pb-7 pr-12 leading-relaxed text-taupe">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
