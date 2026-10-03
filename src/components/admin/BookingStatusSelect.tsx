"use client";

import { useState, useTransition } from "react";
import { updateBookingStatusAction } from "@/app/admin/_actions/bookings";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/booking-status";
import { cn } from "@/lib/utils";

export function BookingStatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [pending, start] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      aria-label="Booking status"
      onChange={(e) => {
        const next = e.target.value;
        const prev = value;
        setValue(next);
        start(async () => {
          const res = await updateBookingStatusAction(id, next);
          if (!res.ok) setValue(prev);
        });
      }}
      className={cn("cursor-pointer rounded-full border px-3 py-1 text-xs font-medium focus:outline-none disabled:opacity-60", STATUS_STYLES[value])}
    >
      {Object.entries(STATUS_LABELS).map(([k, label]) => (
        <option key={k} value={k} className="bg-white text-cocoa">
          {label}
        </option>
      ))}
    </select>
  );
}
