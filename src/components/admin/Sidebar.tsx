"use client";

import { ExternalLink, FileText, HelpCircle, Images, Inbox, LayoutDashboard, LogOut, Menu, MessageSquareQuote, Search, Settings, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/admin/_actions/auth";
import { cn } from "@/lib/utils";
import { Logo } from "../site/Logo";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Inbox },
  { href: "/admin/services", label: "Services & prices", icon: Sparkles },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/results", label: "Before / After", icon: Images },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/content", label: "Site texts", icon: FileText },
  { href: "/admin/settings", label: "Contacts & settings", icon: Settings },
  { href: "/admin/seo", label: "SEO", icon: Search },
];

export function Sidebar({ brandName, email, newBookings }: { brandName: string; email: string; newBookings: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-cocoa/10 bg-white/95 px-4 backdrop-blur lg:hidden">
        <Logo name={brandName} className="scale-90" />
        <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center">
          <Menu size={20} />
        </button>
      </div>

      {open && <div className="fixed inset-0 z-40 bg-cocoa/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-cocoa/10 bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo name={brandName} className="scale-90 origin-left" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="lg:hidden">
            <X size={18} />
          </button>
        </div>
        <p className="px-5 pb-4 text-[10px] uppercase tracking-[0.3em] text-gold-dark/80">Admin panel</p>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition",
                isActive(href) ? "bg-gold/10 text-gold-dark" : "text-cocoa/65 hover:bg-cocoa/5 hover:text-cocoa",
              )}
            >
              <Icon size={17} strokeWidth={1.6} />
              <span className="flex-1">{label}</span>
              {href === "/admin/bookings" && newBookings > 0 && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-cocoa">{newBookings}</span>
              )}
            </Link>
          ))}
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cocoa/65 transition hover:bg-cocoa/5 hover:text-cocoa">
            <ExternalLink size={17} strokeWidth={1.6} /> View website
          </a>
        </nav>

        <div className="border-t border-cocoa/10 p-4">
          <p className="truncate text-xs text-cocoa/60">{email}</p>
          <form action={logoutAction}>
            <button type="submit" className="mt-3 flex items-center gap-2 text-sm text-cocoa/65 transition hover:text-red-600">
              <LogOut size={15} /> Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
