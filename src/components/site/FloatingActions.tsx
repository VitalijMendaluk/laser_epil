"use client";

import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackContact } from "@/lib/track";
import { whatsappLink } from "@/lib/utils";
import { InstagramIcon, WhatsAppIcon } from "../ui/icons";
import { useBooking } from "./BookingProvider";

export function FloatingActions({ whatsapp, instagram }: { whatsapp: string; instagram: string }) {
  const t = useTranslations("actions");
  const { openBooking } = useBooking();

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-8 sm:right-8">
        {instagram && (
          <motion.a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            onClick={() => trackContact("instagram")}
            className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg shadow-cocoa/25"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 260, damping: 18 }}
          >
            <InstagramIcon size={20} />
          </motion.a>
        )}
        {whatsapp && (
          <motion.a
            href={whatsappLink(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("writeWhatsapp")}
            onClick={() => trackContact("whatsapp")}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-cocoa/25"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 18 }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" aria-hidden />
            <WhatsAppIcon size={28} className="relative" />
          </motion.a>
        )}
      </div>

      {/* Mobile: sticky booking button */}
      <motion.button
        type="button"
        onClick={() => openBooking()}
        className="btn-primary fixed bottom-5 left-5 z-40 h-14 px-6 shadow-lg shadow-cocoa/30 md:hidden"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <CalendarHeart size={17} strokeWidth={1.8} /> {t("bookShort")}
      </motion.button>
    </>
  );
}
