import Link from "next/link";
import { createServiceAction } from "@/app/admin/_actions/services";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Add service" };

export default async function NewServicePage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/services" className="text-sm text-cocoa/60 hover:text-gold-dark">← All services</Link>
      <div className="mt-3">
        <PageHeader title="Add service" />
      </div>
      <ServiceForm
        action={createServiceAction}
        submitLabel="Create service"
        initial={{ nameKa: "", nameUk: "", nameEn: "", descriptionKa: "", descriptionUk: "", descriptionEn: "", category: "WOMEN", price: "", durationMin: 30, image: "", isVisible: true, sortOrder: 0 }}
      />
    </>
  );
}
