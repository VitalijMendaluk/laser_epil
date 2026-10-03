import Link from "next/link";
import { createFaqAction } from "@/app/admin/_actions/faq";
import { FaqForm } from "@/components/admin/FaqForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Add question" };

export default async function NewFaqPage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/faq" className="text-sm text-cocoa/60 hover:text-gold-dark">← All questions</Link>
      <div className="mt-3">
        <PageHeader title="Add question" />
      </div>
      <FaqForm action={createFaqAction} submitLabel="Add question" initial={{ questionKa: "", questionUk: "", questionEn: "", answerKa: "", answerUk: "", answerEn: "", isVisible: true, sortOrder: 0 }} />
    </>
  );
}
