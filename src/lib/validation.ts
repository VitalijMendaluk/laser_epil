import { z } from "zod";
import { isAllowedImageUrl, isAllowedMapUrl, parseTimeSlots } from "./utils";

/* Booking error messages are i18n keys (see messages/*.json → "errors"). */

function todayIso() {
  // Georgia is UTC+4; use it so "today" matches the studio's calendar.
  return new Date(Date.now() + 4 * 3_600_000).toISOString().slice(0, 10);
}

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "nameRequired").max(100, "tooLong"),
  phone: z
    .string()
    .trim()
    .min(6, "phoneInvalid")
    .max(25, "phoneInvalid")
    .regex(/^\+?[\d\s()-]{6,}$/, "phoneInvalid"),
  serviceId: z.string().trim().min(1, "serviceRequired").max(40, "serviceRequired"),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "dateRequired")
    .refine((d) => d >= todayIso(), "dateInPast")
    .refine((d) => d <= new Date(Date.now() + 366 * 86_400_000).toISOString().slice(0, 10), "dateTooFar"),
  time: z.string().trim().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "timeRequired"),
  message: z.string().trim().max(1000, "tooLong").optional(),
  locale: z.enum(["ka", "ru", "en"]).default("ka"),
  /** Honeypot: real users never fill this hidden field. */
  website: z.string().max(0).optional(),
  /** Cloudflare Turnstile token (verified on the server when configured). */
  captchaToken: z.string().max(4096).optional(),
});

export type BookingInput = z.input<typeof bookingSchema>;

export const loginSchema = z.object({
  login: z.string().trim().min(1, "Login is required").max(150),
  password: z.string().min(1, "Password is required").max(200),
});

const imageUrl = z.string().trim().refine(isAllowedImageUrl, "Image must be uploaded or come from Cloudinary/Unsplash");
const optionalImage = z.string().trim().refine((v) => v === "" || isAllowedImageUrl(v), "Image must be uploaded or come from Cloudinary/Unsplash");
const text = (max: number) => z.string().trim().max(max, `Maximum ${max} characters`);
const required = (max: number) => z.string().trim().min(1, "Required").max(max, `Maximum ${max} characters`);
const sortOrder = z.coerce.number().int().min(0).max(10_000).default(0);

export const serviceSchema = z.object({
  nameKa: required(100),
  nameRu: required(100),
  nameEn: required(100),
  descriptionKa: text(2000).default(""),
  descriptionRu: text(2000).default(""),
  descriptionEn: text(2000).default(""),
  category: z.enum(["HAIR", "NAILS", "MAKEUP", "BROWS_LASHES", "CARE"]),
  price: z.coerce.number().int("Whole number").min(0, "Must be ≥ 0").max(100_000),
  durationMin: z.coerce.number().int("Whole number").min(5, "At least 5 min").max(600, "Maximum 600 min"),
  image: optionalImage,
  isVisible: z.boolean(),
  sortOrder,
});

export const testimonialSchema = z
  .object({
    name: required(80),
    photo: optionalImage,
    textKa: text(1500),
    textRu: text(1500),
    textEn: text(1500),
    rating: z.coerce.number().int().min(1).max(5),
    isVisible: z.boolean(),
    sortOrder,
  })
  .refine((d) => d.textKa || d.textRu || d.textEn, { path: ["textKa"], message: "Write the review in at least one language" });

export const beforeAfterSchema = z.object({
  beforeImage: optionalImage,
  afterImage: imageUrl,
  captionKa: text(200),
  captionRu: text(200),
  captionEn: text(200),
  isVisible: z.boolean(),
  sortOrder,
});

export const faqSchema = z.object({
  questionKa: required(300),
  questionRu: required(300),
  questionEn: required(300),
  answerKa: required(3000),
  answerRu: required(3000),
  answerEn: required(3000),
  isVisible: z.boolean(),
  sortOrder,
});

export const bookingStatusSchema = z.enum(["NEW", "CONFIRMED", "COMPLETED", "CANCELLED"]);

export const settingValueSchema = {
  text: z.string().trim().max(200),
  email: z.email("Enter a valid email").or(z.literal("")),
  url: z
    .string()
    .trim()
    .max(300)
    .refine((v) => v === "" || /^https:\/\//.test(v), "Must start with https://"),
  image: z.string().trim().refine((v) => v === "" || isAllowedImageUrl(v), "Upload an image or use a Cloudinary URL"),
  map: z.string().trim().max(2000).refine((v) => v === "" || isAllowedMapUrl(v), "Must be a Google Maps embed link"),
  /* Tracking IDs are injected into inline scripts, so they are validated strictly. */
  pixel: z.string().trim().regex(/^(\d{8,20})?$/, "Pixel ID must be 8–20 digits"),
  ga: z.string().trim().toUpperCase().regex(/^(G-[A-Z0-9]{4,15})?$/, "Must look like G-XXXXXXXXXX"),
  times: z
    .string()
    .trim()
    .max(500)
    .transform((v) => parseTimeSlots(v).join(", "))
    .refine((v) => v.length > 0, "Add at least one time in HH:MM format"),
} as const;

export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
