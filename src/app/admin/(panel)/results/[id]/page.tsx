import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteResultAction, updateResultAction } from "@/app/admin/_actions/results";
import { ResultForm } from "@/components/admin/ResultForm";
import { DeleteButton } from "@/components/admin/RowActions";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit before / after" };

export default async function EditResultPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const r = await prisma.beforeAfter.findUnique({ where: { id } });
  if (!r) notFound();

  return (
    <>
      <Link href="/admin/results" className="text-sm text-cocoa/60 hover:text-gold-dark">← Before / After</Link>
      <div className="mt-3">
        <PageHeader title={r.captionEn || "Before / After"} actions={<DeleteButton action={deleteResultAction.bind(null, r.id)} confirm="Delete this before/after pair?" />} />
      </div>
      <ResultForm
        action={updateResultAction.bind(null, r.id)}
        submitLabel="Save changes"
        initial={{ beforeImage: r.beforeImage, afterImage: r.afterImage, captionKa: r.captionKa, captionUk: r.captionUk, captionEn: r.captionEn, isVisible: r.isVisible, sortOrder: r.sortOrder }}
      />
    </>
  );
}
