/** Client-side marketing events. Safe to call when Pixel / GA are not configured. */

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

function w() {
  return typeof window === "undefined" ? undefined : (window as unknown as { fbq?: Fbq; gtag?: Gtag });
}

export function trackLead(serviceName: string, value?: number, currency?: string) {
  const win = w();
  const iso = currency && /^[A-Z]{3}$/.test(currency) ? currency : "GEL";
  win?.fbq?.("track", "Lead", { content_name: serviceName, ...(value ? { value, currency: iso } : {}) });
  win?.gtag?.("event", "generate_lead", { item_name: serviceName, ...(value ? { value, currency: iso } : {}) });
}

export function trackContact(method: "whatsapp" | "phone" | "instagram") {
  const win = w();
  win?.fbq?.("track", "Contact", { method });
  win?.gtag?.("event", "contact", { method });
}

export function trackBookingOpen() {
  const win = w();
  win?.fbq?.("trackCustom", "BookingOpen");
  win?.gtag?.("event", "booking_open");
}
