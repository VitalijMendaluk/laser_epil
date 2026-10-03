"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackContact } from "@/lib/track";

/** <a> that reports a Contact event (Meta Pixel / GA4) when clicked. */
export function TrackedLink({ method, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { method: "whatsapp" | "phone" | "instagram" }) {
  return <a {...props} onClick={() => trackContact(method)} />;
}
