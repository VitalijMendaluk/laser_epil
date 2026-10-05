import Link from "next/link";
import { createResultAction } from "@/app/admin/_actions/results";
import { ResultForm } from "@/components/admin/ResultForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Add portfolio photo" };

export default async function NewResultPage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/results" className="text-sm text-cocoa/60 hover:text-gold-dark">← Portfolio</Link>
      <div className="mt-3">
        <PageHeader title="Add portfolio photo" />
      </div>
      <ResultForm action={createResultAction} submitLabel="Add photos" initial={{ beforeImage: "", afterImage: "", captionKa: "", captionRu: "", captionEn: "", isVisible: true, sortOrder: 0 }} />
    </>
  );
}
