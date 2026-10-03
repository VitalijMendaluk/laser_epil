import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteResultAction, toggleResultVisibilityAction } from "@/app/admin/_actions/results";
import { EmptyState, HiddenBadge, RowActions, SavedNotice } from "@/components/admin/RowActions";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const metadata = { title: "Before / After" };

export default async function ResultsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const rows = await prisma.beforeAfter.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <PageHeader
        title="Before / After"
        description={`${rows.length} pairs · ${rows.filter((r) => r.isVisible).length} visible. Visitors drag a slider to compare the two photos.`}
        actions={
          <Link href="/admin/results/new" className="btn-primary px-5 py-3">
            <Plus size={15} /> Add photos
          </Link>
        }
      />
      <SavedNotice show={!!saved} text="Photos added." />

      {rows.length === 0 ? (
        <EmptyState>
          No photos yet. <Link href="/admin/results/new" className="text-gold-dark hover:underline">Add the first pair</Link>.
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((r) => (
            <div key={r.id} className={cn("overflow-hidden rounded-xl border border-cocoa/10 bg-white", !r.isVisible && "opacity-60")}>
              <Link href={`/admin/results/${r.id}`} className="grid grid-cols-2 gap-px bg-cocoa/10">
                {[r.beforeImage, r.afterImage].map((src, i) => (
                  <div key={i} className="relative aspect-[4/5] bg-nude">
                    <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                    <span className="absolute left-2 top-2 rounded bg-white/85 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">{i === 0 ? "Before" : "After"}</span>
                  </div>
                ))}
              </Link>
              <div className="flex items-center justify-between gap-3 p-3 pl-4">
                <div className="min-w-0">
                  <p className="truncate text-sm">{r.captionEn || r.captionUk || r.captionKa || "No caption"}</p>
                  {!r.isVisible && <HiddenBadge />}
                </div>
                <RowActions
                  href={`/admin/results/${r.id}`}
                  isVisible={r.isVisible}
                  onToggle={toggleResultVisibilityAction.bind(null, r.id)}
                  onDelete={deleteResultAction.bind(null, r.id)}
                  confirm="Delete this before/after pair?"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
