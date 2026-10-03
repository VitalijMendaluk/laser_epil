import { ArrowRight, CalendarClock, Inbox, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/booking-status";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

const fmtDay = (d: Date) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" });

export default async function DashboardPage() {
  await requireAdmin();
  const weekAgo = new Date(Date.now() - 7 * 86_400_000);
  const today = new Date(new Date(Date.now() + 4 * 3_600_000).toISOString().slice(0, 10)); // Georgia (UTC+4)

  const [total, fresh, week, upcoming, byStatus, popular, recent] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "NEW" } }),
    prisma.booking.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.booking.count({ where: { date: { gte: today }, status: { in: ["NEW", "CONFIRMED"] } } }),
    prisma.booking.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.booking.groupBy({ by: ["serviceName"], where: { status: { not: "CANCELLED" } }, _count: { _all: true }, orderBy: { _count: { serviceName: "desc" } }, take: 6 }),
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const stats = [
    { label: "Requests", value: total, sub: "all time", icon: Inbox, href: "/admin/bookings" },
    { label: "New requests", value: fresh, sub: "waiting for a call", icon: Sparkles, href: "/admin/bookings?status=NEW", accent: true },
    { label: "Upcoming visits", value: upcoming, sub: "new + confirmed, from today", icon: CalendarClock, href: "/admin/bookings?when=upcoming" },
    { label: "Last 7 days", value: week, sub: "requests received", icon: TrendingUp, href: "/admin/bookings" },
  ];
  const statusCount = Object.fromEntries(byStatus.map((s) => [s.status, s._count._all]));
  const maxPopular = Math.max(1, ...popular.map((p) => p._count._all));

  return (
    <>
      <PageHeader title="Dashboard" description="Overview of booking requests and popular services." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, sub, icon: Icon, href, accent }) => (
          <Link key={label} href={href} className={cn("group rounded-xl border p-5 transition", accent ? "border-gold/50 bg-gold/[0.08] hover:border-gold" : "border-cocoa/10 bg-white hover:border-cocoa/25")}>
            <div className="flex items-center justify-between text-cocoa/60">
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</span>
              <Icon size={18} strokeWidth={1.5} className={accent ? "text-gold-dark" : ""} />
            </div>
            <p className={cn("mt-4 font-display text-5xl", accent && "text-gold-dark")}>{value}</p>
            <p className="mt-1 text-xs text-cocoa/55">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Popular services" description="By number of requests (cancelled excluded).">
          {popular.length === 0 ? (
            <p className="text-sm text-cocoa/60">No data yet.</p>
          ) : (
            <ul className="space-y-4">
              {popular.map((p, i) => (
                <li key={p.serviceName}>
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="truncate">
                      <span className="mr-2 text-cocoa/45">{i + 1}.</span>
                      {p.serviceName}
                    </span>
                    <span className="font-medium">{p._count._all}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cocoa/[0.07]">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${(p._count._all / maxPopular) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="By status">
          <ul className="space-y-4">
            {Object.entries(STATUS_LABELS).map(([key, label]) => {
              const count = statusCount[key] ?? 0;
              const pct = total ? Math.round((count / total) * 100) : 0;
              return (
                <li key={key}>
                  <Link href={`/admin/bookings?status=${key}`} className="block">
                    <div className="flex justify-between text-sm">
                      <span className={cn("rounded-full border px-2.5 py-0.5 text-xs", STATUS_STYLES[key])}>{label}</span>
                      <span>
                        {count} <span className="text-cocoa/45">· {pct}%</span>
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cocoa/[0.07]">
                      <div className="h-full rounded-full bg-cocoa/70" style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card
        className="mt-6"
        title="Latest requests"
        actions={
          <Link href="/admin/bookings" className="flex items-center gap-1 text-sm text-gold-dark hover:underline">
            All requests <ArrowRight size={14} />
          </Link>
        }
      >
        {recent.length === 0 ? (
          <p className="text-sm text-cocoa/60">No requests yet.</p>
        ) : (
          <ul className="-my-3 divide-y divide-cocoa/10">
            {recent.map((b) => (
              <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{b.fullName}</p>
                  <p className="truncate text-sm text-cocoa/60">
                    {b.serviceName} · {fmtDay(b.date)} {b.time} ·{" "}
                    <a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold-dark">{b.phone}</a>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-cocoa/50">{b.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tbilisi" })}</span>
                  <span className={cn("rounded-full border px-2.5 py-0.5 text-xs", STATUS_STYLES[b.status])}>{STATUS_LABELS[b.status]}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
