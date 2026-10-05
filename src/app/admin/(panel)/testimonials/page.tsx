import { Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteTestimonialAction, toggleTestimonialVisibilityAction } from "@/app/admin/_actions/testimonials";
import { EmptyState, HiddenBadge, RowActions, SavedNotice } from "@/components/admin/RowActions";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const rows = await prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <PageHeader
        title="Testimonials"
        description={`${rows.length} reviews · ${rows.filter((r) => r.isVisible).length} visible on the website`}
        actions={
          <Link href="/admin/testimonials/new" className="btn-primary px-5 py-3">
            <Plus size={15} /> Add review
          </Link>
        }
      />
      <SavedNotice show={!!saved} text="Review added." />

      {rows.length === 0 ? (
        <EmptyState>
          No reviews yet. <Link href="/admin/testimonials/new" className="text-gold-dark hover:underline">Add the first one</Link>.
        </EmptyState>
      ) : (
        <div className="grid gap-3">
          {rows.map((r) => (
            <div key={r.id} className={cn("flex flex-wrap items-center gap-4 rounded-xl border border-cocoa/10 bg-white p-4 pr-5 sm:flex-nowrap", !r.isVisible && "opacity-60")}>
              <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-nude font-display text-xl text-gold-dark">
                {r.photo ? <Image src={r.photo} alt="" fill sizes="56px" className="object-cover" /> : r.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/testimonials/${r.id}`} className="font-medium hover:text-gold-dark">{r.name}</Link>
                  <span className="flex text-gold" aria-label={`${r.rating} of 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={12} strokeWidth={1.2} fill={i < r.rating ? "currentColor" : "none"} />
                    ))}
                  </span>
                  {!r.isVisible && <HiddenBadge />}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-cocoa/60">{r.textRu || r.textEn || r.textKa}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-cocoa/45">
                  {[r.textKa && "KA", r.textRu && "RU", r.textEn && "EN"].filter(Boolean).join(" · ")}
                </p>
              </div>
              <RowActions
                href={`/admin/testimonials/${r.id}`}
                isVisible={r.isVisible}
                onToggle={toggleTestimonialVisibilityAction.bind(null, r.id)}
                onDelete={deleteTestimonialAction.bind(null, r.id)}
                confirm={`Delete review from ${r.name}?`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
