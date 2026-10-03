import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function siteUrl(path = "") {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const base = (process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "http://localhost:3000")).replace(/\/$/, "");
  return `${base}${path}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 60);
}

/** Images must come from a trusted origin so next/image can optimise them. */
const IMAGE_PREFIXES = ["/media/", "/uploads/", "https://res.cloudinary.com/", "https://images.unsplash.com/"];

export function isAllowedImageUrl(url: string) {
  return IMAGE_PREFIXES.some((p) => url.startsWith(p)) && !url.includes("..");
}

export function isAllowedMapUrl(url: string) {
  return /^https:\/\/(www\.)?google\.[a-z.]+\/maps/.test(url);
}

export function whatsappLink(number: string, text?: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Parses the "10:00, 10:30" setting into a sorted list of valid HH:MM slots. */
export function parseTimeSlots(value: string) {
  const slots = value
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter((s) => /^([01]\d|2[0-3]):[0-5]\d$/.test(s));
  return [...new Set(slots)].sort();
}

export function formatPrice(price: number, currency: string) {
  return `${price.toLocaleString("en-US").replace(/,/g, " ")} ${currency}`.trim();
}
