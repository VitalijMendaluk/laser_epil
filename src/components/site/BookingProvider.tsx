"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { trackBookingOpen } from "@/lib/track";
import { BookingModal } from "./BookingModal";

export type BookingServiceOption = { id: string; name: string; price: number; durationMin: number; image: string };

type BookingContextValue = {
  openBooking: (serviceId?: string) => void;
  currency: string;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

type Props = {
  services: BookingServiceOption[];
  currency: string;
  timeSlots: string[];
  captchaSiteKey?: string;
  children: ReactNode;
};

export function BookingProvider({ services, currency, timeSlots, captchaSiteKey, children }: Props) {
  const [booking, setBooking] = useState<{ open: boolean; serviceId: string }>({ open: false, serviceId: "" });

  const openBooking = useCallback((serviceId?: string) => {
    setBooking({ open: true, serviceId: serviceId ?? "" });
    trackBookingOpen();
  }, []);
  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, open: false })), []);

  const value = useMemo(() => ({ openBooking, currency }), [openBooking, currency]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal
        open={booking.open}
        initialServiceId={booking.serviceId}
        services={services}
        currency={currency}
        timeSlots={timeSlots}
        captchaSiteKey={captchaSiteKey}
        onClose={closeBooking}
      />
    </BookingContext.Provider>
  );
}

export function BookButton({ serviceId, className, children }: { serviceId?: string; className?: string; children: ReactNode }) {
  const { openBooking } = useBooking();
  return (
    <button type="button" className={className} onClick={() => openBooking(serviceId)}>
      {children}
    </button>
  );
}
