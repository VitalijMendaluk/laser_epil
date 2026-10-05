import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteResultAction, toggleResultVisibilityAction } from "@/app/admin/_actions/results";
import { EmptyState, HiddenBadge, RowActions, SavedNotice } from "@/components/admin/RowActions";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const metadata = { title: "Portfolio" };

export default async function ResultsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const rows = await prisma.beforeAfter.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <PageHeader
        title="Portfolio"
        description={`${rows.length} items · ${rows.filter((r) => r.isVisible).length} visible. A single photo shows as a portfolio picture; with a “Before” photo visitors get a compare slider.`}
        actions={
          <Link href="/admin/results/new" className="btn-primary px-5 py-3">
            <Plus size={15} /> Add photos
          </Link>
        }
      />
      <SavedNotice show={!!saved} text="Photos added." />

      {rows.length === 0 ? (
        <EmptyState>
          No photos yet. <Link href="/admin/results/new" className="text-gold-dark hover:underline">Add the first one</Link>.
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((r) => (
            <div key={r.id} className={cn("overflow-hidden rounded-xl border border-cocoa/10 bg-white", !r.isVisible && "opacity-60")}>
              <Link href={`/admin/results/${r.id}`} className={cn("grid gap-px bg-cocoa/10", r.beforeImage ? "grid-cols-2" : "grid-cols-2 [&>div]:col-span-2 [&>div]:aspect-[8/5]")}>
                {(r.beforeImage ? [r.beforeImage, r.afterImage] : [r.afterImage]).map((src, i, arr) => (
                  <div key={i} className="relative aspect-[4/5] bg-nude">
                    <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                    {arr.length > 1 && <span className="absolute left-2 top-2 rounded bg-white/85 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">{i === 0 ? "Before" : "After"}</span>}
                  </div>
                ))}
              </Link>
              <div className="flex items-center justify-between gap-3 p-3 pl-4">
                <div className="min-w-0">
                  <p className="truncate text-sm">{r.captionEn || r.captionRu || r.captionKa || "No caption"}</p>
                  {!r.isVisible && <HiddenBadge />}
                </div>
                <RowActions
                  href={`/admin/results/${r.id}`}
                  isVisible={r.isVisible}
                  onToggle={toggleResultVisibilityAction.bind(null, r.id)}
                  onDelete={deleteResultAction.bind(null, r.id)}
                  confirm="Delete this portfolio item?"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
