import { Plus } from "lucide-react";
import Link from "next/link";
import { deleteFaqAction, toggleFaqVisibilityAction } from "@/app/admin/_actions/faq";
import { EmptyState, HiddenBadge, RowActions, SavedNotice } from "@/components/admin/RowActions";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const metadata = { title: "FAQ" };

export default async function FaqAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const rows = await prisma.faqItem.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader
        title="FAQ"
        description={`${rows.length} questions · ${rows.filter((r) => r.isVisible).length} visible on the website`}
        actions={
          <Link href="/admin/faq/new" className="btn-primary px-5 py-3">
            <Plus size={15} /> Add question
          </Link>
        }
      />
      <SavedNotice show={!!saved} text="Question added." />

      {rows.length === 0 ? (
        <EmptyState>
          No questions yet. <Link href="/admin/faq/new" className="text-gold-dark hover:underline">Add the first one</Link>.
        </EmptyState>
      ) : (
        <div className="grid gap-3">
          {rows.map((r, i) => (
            <div key={r.id} className={cn("flex items-center gap-4 rounded-xl border border-cocoa/10 bg-white p-4 pr-5", !r.isVisible && "opacity-60")}>
              <span className="w-8 shrink-0 font-display text-2xl text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/faq/${r.id}`} className="font-medium hover:text-gold-dark">{r.questionEn}</Link>
                  {!r.isVisible && <HiddenBadge />}
                </div>
                <p className="mt-1 truncate text-sm text-cocoa/60">{r.questionRu}</p>
              </div>
              <RowActions href={`/admin/faq/${r.id}`} isVisible={r.isVisible} onToggle={toggleFaqVisibilityAction.bind(null, r.id)} onDelete={deleteFaqAction.bind(null, r.id)} confirm="Delete this question?" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
