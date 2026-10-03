import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteTestimonialAction, updateTestimonialAction } from "@/app/admin/_actions/testimonials";
import { DeleteButton } from "@/components/admin/RowActions";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit review" };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const r = await prisma.testimonial.findUnique({ where: { id } });
  if (!r) notFound();

  return (
    <>
      <Link href="/admin/testimonials" className="text-sm text-cocoa/60 hover:text-gold-dark">← All reviews</Link>
      <div className="mt-3">
        <PageHeader title={r.name} actions={<DeleteButton action={deleteTestimonialAction.bind(null, r.id)} confirm={`Delete review from ${r.name}?`} />} />
      </div>
      <TestimonialForm
        action={updateTestimonialAction.bind(null, r.id)}
        submitLabel="Save changes"
        initial={{ name: r.name, photo: r.photo, textKa: r.textKa, textUk: r.textUk, textEn: r.textEn, rating: r.rating, isVisible: r.isVisible, sortOrder: r.sortOrder }}
      />
    </>
  );
}
