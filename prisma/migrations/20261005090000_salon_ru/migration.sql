-- Ukrainian → Russian: rename translated columns (data is replaced by the content reset in the seed).
ALTER TABLE "SiteText" RENAME COLUMN "uk" TO "ru";
ALTER TABLE "Service" RENAME COLUMN "nameUk" TO "nameRu";
ALTER TABLE "Service" RENAME COLUMN "descriptionUk" TO "descriptionRu";
ALTER TABLE "Testimonial" RENAME COLUMN "textUk" TO "textRu";
ALTER TABLE "BeforeAfter" RENAME COLUMN "captionUk" TO "captionRu";
ALTER TABLE "FaqItem" RENAME COLUMN "questionUk" TO "questionRu";
ALTER TABLE "FaqItem" RENAME COLUMN "answerUk" TO "answerRu";

-- Portfolio items may have only an "after" photo.
ALTER TABLE "BeforeAfter" ALTER COLUMN "beforeImage" SET DEFAULT '';

-- Laser categories (WOMEN/MEN) → beauty salon categories.
ALTER TYPE "ServiceCategory" RENAME TO "ServiceCategory_old";
CREATE TYPE "ServiceCategory" AS ENUM ('HAIR', 'NAILS', 'MAKEUP', 'BROWS_LASHES', 'CARE');
ALTER TABLE "Service" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Service" ALTER COLUMN "category" TYPE "ServiceCategory" USING ('CARE'::"ServiceCategory");
ALTER TABLE "Service" ALTER COLUMN "category" SET DEFAULT 'HAIR';
DROP TYPE "ServiceCategory_old";
