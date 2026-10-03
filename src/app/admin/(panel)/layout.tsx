import type { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  const [{ settings }, newBookings] = await Promise.all([getSiteContent("en"), prisma.booking.count({ where: { status: "NEW" } })]);

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar brandName={settings.brandName} email={admin.email} newBookings={newBookings} />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
