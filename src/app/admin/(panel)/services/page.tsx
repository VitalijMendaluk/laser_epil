import { Clock, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteServiceAction, toggleServiceVisibilityAction, updateServicePriceAction } from "@/app/admin/_actions/services";
import { PriceInlineForm } from "@/components/admin/PriceInlineForm";
import { EmptyState, HiddenBadge, RowActions, SavedNotice } from "@/components/admin/RowActions";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const metadata = { title: "Services & prices" };

export default async function ServicesAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const [services, { settings }] = await Promise.all([
    prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], include: { _count: { select: { bookings: true } } } }),
    getSiteContent("en"),
  ]);

  return (
    <>
      <PageHeader
        title="Services & prices"
        description={`${services.length} services · ${services.filter((s) => s.isVisible).length} visible. Change a price right in the list and press ✓, or open a service to edit everything.`}
        actions={
          <Link href="/admin/services/new" className="btn-primary px-5 py-3">
            <Plus size={15} /> Add service
          </Link>
        }
      />
      <SavedNotice show={!!saved} text="Service created." />

      {services.length === 0 ? (
        <EmptyState>
          No services yet. <Link href="/admin/services/new" className="text-gold-dark hover:underline">Add the first one</Link>.
        </EmptyState>
      ) : (
        <div className="grid gap-3">
          {services.map((s) => (
            <div key={s.id} className={cn("flex flex-wrap items-center gap-4 rounded-xl border border-cocoa/10 bg-white p-3 pr-5 transition hover:border-cocoa/20 lg:flex-nowrap", !s.isVisible && "opacity-60")}>
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-nude">
                {s.image && <Image src={s.image} alt="" fill sizes="112px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/services/${s.id}`} className="truncate font-medium hover:text-gold-dark">{s.nameEn}</Link>
                  {!s.isVisible && <HiddenBadge />}
                  <span className="rounded-full bg-nude px-2 py-0.5 text-[10px] uppercase tracking-wider text-cocoa/70">{s.category === "MEN" ? "Men" : "Women"}</span>
                </div>
                <p className="truncate text-sm text-cocoa/60">
                  <span lang="ka">{s.nameKa}</span> · {s.nameUk}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-cocoa/55">
                  <Clock size={12} /> {s.durationMin} min · {s._count.bookings} bookings
                </p>
              </div>
              <PriceInlineForm action={updateServicePriceAction.bind(null, s.id)} price={s.price} durationMin={s.durationMin} currency={settings.currency} />
              <RowActions
                href={`/admin/services/${s.id}`}
                isVisible={s.isVisible}
                onToggle={toggleServiceVisibilityAction.bind(null, s.id)}
                onDelete={deleteServiceAction.bind(null, s.id)}
                confirm={`Delete "${s.nameEn}"? This cannot be undone.`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
