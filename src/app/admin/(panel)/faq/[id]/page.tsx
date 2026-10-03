import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteFaqAction, updateFaqAction } from "@/app/admin/_actions/faq";
import { FaqForm } from "@/components/admin/FaqForm";
import { DeleteButton } from "@/components/admin/RowActions";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit question" };

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const r = await prisma.faqItem.findUnique({ where: { id } });
  if (!r) notFound();

  return (
    <>
      <Link href="/admin/faq" className="text-sm text-cocoa/60 hover:text-gold-dark">← All questions</Link>
      <div className="mt-3">
        <PageHeader title={r.questionEn} actions={<DeleteButton action={deleteFaqAction.bind(null, r.id)} confirm="Delete this question?" />} />
      </div>
      <FaqForm
        action={updateFaqAction.bind(null, r.id)}
        submitLabel="Save changes"
        initial={{ questionKa: r.questionKa, questionUk: r.questionUk, questionEn: r.questionEn, answerKa: r.answerKa, answerUk: r.answerUk, answerEn: r.answerEn, isVisible: r.isVisible, sortOrder: r.sortOrder }}
      />
    </>
  );
}
