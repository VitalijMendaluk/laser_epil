import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteServiceAction, updateServiceAction } from "@/app/admin/_actions/services";
import { DeleteButton } from "@/components/admin/RowActions";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit service" };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const s = await prisma.service.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <>
      <Link href="/admin/services" className="text-sm text-cocoa/60 hover:text-gold-dark">← All services</Link>
      <div className="mt-3">
        <PageHeader
          title={s.nameEn}
          description={`Last updated ${s.updatedAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`}
          actions={<DeleteButton action={deleteServiceAction.bind(null, s.id)} confirm={`Delete "${s.nameEn}"? This cannot be undone.`} />}
        />
      </div>
      <ServiceForm
        action={updateServiceAction.bind(null, s.id)}
        submitLabel="Save changes"
        initial={{
          nameKa: s.nameKa,
          nameUk: s.nameUk,
          nameEn: s.nameEn,
          descriptionKa: s.descriptionKa,
          descriptionUk: s.descriptionUk,
          descriptionEn: s.descriptionEn,
          category: s.category,
          price: s.price,
          durationMin: s.durationMin,
          image: s.image,
          isVisible: s.isVisible,
          sortOrder: s.sortOrder,
        }}
      />
    </>
  );
}
