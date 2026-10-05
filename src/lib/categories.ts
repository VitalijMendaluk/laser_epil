/** Service categories in display order (matches the Prisma ServiceCategory enum). */
export const CATEGORIES = ["HAIR", "NAILS", "MAKEUP", "BROWS_LASHES", "CARE"] as const;
export type Category = (typeof CATEGORIES)[number];

/** English labels for the admin panel (the site uses messages/*.json → service.<CATEGORY>). */
export const CATEGORY_LABELS: Record<Category, string> = {
  HAIR: "Hair",
  NAILS: "Nails",
  MAKEUP: "Makeup",
  BROWS_LASHES: "Brows & lashes",
  CARE: "Skin & body care",
};
