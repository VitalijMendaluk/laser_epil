import Link from "next/link";
import { createTestimonialAction } from "@/app/admin/_actions/testimonials";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Add review" };

export default async function NewTestimonialPage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/testimonials" className="text-sm text-cocoa/60 hover:text-gold-dark">← All reviews</Link>
      <div className="mt-3">
        <PageHeader title="Add review" />
      </div>
      <TestimonialForm action={createTestimonialAction} submitLabel="Add review" initial={{ name: "", photo: "", textKa: "", textRu: "", textEn: "", rating: 5, isVisible: true, sortOrder: 0 }} />
    </>
  );
}
