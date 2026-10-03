import { MessageSquare, Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { deleteBookingAction } from "@/app/admin/_actions/bookings";
import { BookingStatusSelect } from "@/components/admin/BookingStatusSelect";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { STATUS_LABELS } from "@/lib/booking-status";
import { prisma } from "@/lib/prisma";
import { cn, whatsappLink } from "@/lib/utils";
import { bookingStatusSchema } from "@/lib/validation";

export const metadata = { title: "Bookings" };

const PAGE_SIZE = 25;

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string; page?: string; when?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const status = bookingStatusSchema.safeParse(sp.status).data;
  const upcoming = sp.when === "upcoming";
  const q = sp.q?.trim().slice(0, 100) ?? "";
  const page = Math.max(1, Number(sp.page) || 1);
  const today = new Date(new Date(Date.now() + 4 * 3_600_000).toISOString().slice(0, 10));

  const where: Prisma.BookingWhereInput = {
    ...(status ? { status } : {}),
    ...(upcoming ? { date: { gte: today }, ...(status ? {} : { status: { in: ["NEW", "CONFIRMED"] } }) } : {}),
    ...(q
      ? {
          OR: [
            { fullName: { contains: q, mode: "insensitive" } },
            { phone: { contains: q } },
            { serviceName: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [bookings, total, counts] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: upcoming ? [{ date: "asc" }, { time: "asc" }] : { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.booking.count({ where }),
    prisma.booking.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));
  const all = counts.reduce((s, c) => s + c._count._all, 0);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const href = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { status, q: q || undefined, when: upcoming ? "upcoming" : undefined, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v);
    const s = params.toString();
    return `/admin/bookings${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageHeader title="Bookings" description="Requests from the booking popup on the website. Change the status as you work with each client." />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[{ key: undefined, label: "All", count: all }, ...Object.entries(STATUS_LABELS).map(([key, label]) => ({ key, label, count: countMap[key] ?? 0 }))].map((tab) => (
            <Link
              key={tab.label}
              href={href({ status: tab.key, page: undefined })}
              className={cn("rounded-full border px-3.5 py-1.5 text-sm transition", status === tab.key ? "border-cocoa bg-cocoa text-ivory" : "border-cocoa/15 text-cocoa/70 hover:border-cocoa/35")}
            >
              {tab.label} <span className="ml-1 opacity-60">{tab.count}</span>
            </Link>
          ))}
          <Link
            href={href({ when: upcoming ? undefined : "upcoming", page: undefined })}
            className={cn("rounded-full border px-3.5 py-1.5 text-sm transition", upcoming ? "border-gold bg-gold/15 text-gold-dark" : "border-dashed border-cocoa/25 text-cocoa/70 hover:border-cocoa/45")}
          >
            {upcoming ? "✓ " : ""}Upcoming visits
          </Link>
        </div>
        <form className="flex gap-2" action="/admin/bookings">
          {status && <input type="hidden" name="status" value={status} />}
          {upcoming && <input type="hidden" name="when" value="upcoming" />}
          <input name="q" defaultValue={q} placeholder="Search name, phone, service…" className="w-60 rounded-full border border-cocoa/15 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none" />
        </form>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cocoa/20 p-16 text-center text-cocoa/60">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-cocoa/10 bg-white">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-cocoa/10 bg-cream text-[11px] uppercase tracking-[0.12em] text-cocoa/60">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Name</th>
                <th className="px-5 py-3.5 font-semibold">Phone</th>
                <th className="px-5 py-3.5 font-semibold">Service</th>
                <th className="px-5 py-3.5 font-semibold">Date & time</th>
                <th className="px-5 py-3.5 font-semibold">Received</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-cocoa/[0.07]">
              {bookings.map((b) => (
                <tr key={b.id} className={cn("align-top transition hover:bg-ivory", b.status === "NEW" && "bg-gold/[0.05]")}>
                  <td className="px-5 py-4">
                    <p className="font-medium">{b.fullName}</p>
                    <p className="mt-0.5 text-xs uppercase text-cocoa/50">{b.locale}</p>
                    {b.message && (
                      <p className="mt-2 flex max-w-xs gap-1.5 text-xs text-cocoa/65">
                        <MessageSquare size={12} className="mt-0.5 shrink-0" /> <span className="line-clamp-3 whitespace-pre-line">{b.message}</span>
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-1.5 whitespace-nowrap hover:text-gold-dark">
                      <Phone size={12} /> {b.phone}
                    </a>
                    <a href={whatsappLink(b.phone)} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs text-emerald-700 hover:underline">
                      WhatsApp
                    </a>
                  </td>
                  <td className="px-5 py-4">
                    {b.serviceId ? (
                      <Link href={`/admin/services/${b.serviceId}`} className="hover:text-gold-dark">{b.serviceName}</Link>
                    ) : (
                      <span className="text-cocoa/60">{b.serviceName}</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {fmtDate(b.date)}
                    <span className="block font-medium text-gold-dark">{b.time}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-cocoa/60">{b.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tbilisi" })}</td>
                  <td className="px-5 py-4">
                    <BookingStatusSelect id={b.id} status={b.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ConfirmButton action={deleteBookingAction.bind(null, b.id)} confirm={`Delete booking from ${b.fullName}?`} title="Delete booking" className="grid h-8 w-8 place-items-center rounded-md text-cocoa/50 hover:bg-red-500/10 hover:text-red-600">
                      <Trash2 size={15} />
                    </ConfirmButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          {page > 1 && <Link href={href({ page: String(page - 1) })} className="rounded-full border border-cocoa/15 px-3 py-1.5 hover:border-gold">← Prev</Link>}
          <span className="px-3 text-cocoa/60">Page {page} of {pages}</span>
          {page < pages && <Link href={href({ page: String(page + 1) })} className="rounded-full border border-cocoa/15 px-3 py-1.5 hover:border-gold">Next →</Link>}
        </div>
      )}
    </>
  );
}
