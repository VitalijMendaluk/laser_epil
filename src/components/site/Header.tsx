"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn, telLink } from "@/lib/utils";
import { useBooking } from "./BookingProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Header({ brandName, phone }: { brandName: string; phone: string }) {
  const t = useTranslations();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { href: "/#services", label: t("nav.services") },
    { href: "/prices", label: t("nav.prices") },
    { href: "/#about", label: t("nav.about") },
    { href: "/#results", label: t("nav.results") },
    { href: "/#faq", label: t("nav.faq") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-lux",
          scrolled || open ? "border-b border-cocoa/[0.07] bg-ivory/85 shadow-[0_10px_30px_-20px_rgba(46,36,32,0.25)] backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className={cn("mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 transition-all duration-700 sm:px-8", scrolled ? "h-16" : "h-20 sm:h-24")}>
          <Link href="/" className="relative z-10" onClick={() => setOpen(false)}>
            <Logo name={brandName} />
          </Link>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="group relative text-[11.5px] font-semibold uppercase tracking-[0.16em] text-cocoa/70 transition-colors hover:text-cocoa">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-lux group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LanguageSwitcher />
            <a href={telLink(phone)} className="hidden items-center gap-2 text-[12px] font-medium tracking-[0.06em] text-cocoa/75 transition hover:text-gold-dark 2xl:flex">
              <Phone size={14} strokeWidth={1.5} className="text-gold" />
              {phone}
            </a>
            <button type="button" className="btn-primary px-6 py-3" onClick={() => openBooking()}>
              {t("actions.bookShort")}
            </button>
          </div>

          <button
            type="button"
            className="relative z-10 grid h-11 w-11 place-items-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("nav.close") : t("nav.menu")}
          >
            {open ? <X size={24} strokeWidth={1.25} /> : <Menu size={24} strokeWidth={1.25} />}
          </button>
        </div>
        {/* Tablet: nav links under the bar (lg–xl) */}
        <nav className="hidden justify-center gap-7 pb-3 lg:flex xl:hidden" aria-label="Main (compact)">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa/65 hover:text-cocoa">
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-ivory px-6 pb-10 pt-28 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1, duration: 0.5 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-cocoa/10 py-4 font-display text-3xl font-light">
                    <span className="font-sans text-[11px] text-gold-dark">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto space-y-6 pt-10">
              <LanguageSwitcher className="text-sm" />
              <a href={telLink(phone)} className="flex items-center gap-3 text-lg">
                <Phone size={18} strokeWidth={1.5} className="text-gold" /> {phone}
              </a>
              <button
                type="button"
                className="btn-primary w-full"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
              >
                {t("actions.book")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
