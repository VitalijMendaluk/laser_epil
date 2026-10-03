import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { ConfirmButton } from "./ConfirmButton";

/** Show/hide, edit and delete buttons used by every CRUD list. */
export function RowActions({ href, isVisible, onToggle, onDelete, confirm }: { href: string; isVisible: boolean; onToggle: () => Promise<void>; onDelete: () => Promise<void>; confirm: string }) {
  return (
    <div className="flex items-center gap-1">
      <form action={onToggle}>
        <button type="submit" title={isVisible ? "Hide from website" : "Show on website"} aria-label={isVisible ? "Hide from website" : "Show on website"} className="grid h-9 w-9 place-items-center rounded-md text-cocoa/60 hover:bg-cocoa/5 hover:text-cocoa">
          {isVisible ? <Eye size={17} /> : <EyeOff size={17} />}
        </button>
      </form>
      <Link href={href} title="Edit" aria-label="Edit" className="grid h-9 w-9 place-items-center rounded-md text-cocoa/60 hover:bg-cocoa/5 hover:text-gold-dark">
        <Pencil size={16} />
      </Link>
      <ConfirmButton action={onDelete} confirm={confirm} title="Delete" className="grid h-9 w-9 place-items-center rounded-md text-cocoa/60 hover:bg-red-500/10 hover:text-red-600">
        <Trash2 size={16} />
      </ConfirmButton>
    </div>
  );
}

export function HiddenBadge() {
  return <span className="rounded bg-cocoa/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-cocoa/60">Hidden</span>;
}

export function SavedNotice({ show, text }: { show: boolean; text: string }) {
  if (!show) return null;
  return <p className="mb-6 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">{text}</p>;
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-dashed border-cocoa/20 p-16 text-center text-cocoa/60">{children}</div>;
}

export function DeleteButton({ action, confirm }: { action: () => Promise<void>; confirm: string }) {
  return (
    <ConfirmButton action={action} confirm={confirm} className="flex items-center gap-2 rounded-full border border-red-400/40 px-4 py-2.5 text-sm text-red-600 hover:bg-red-500/10">
      <Trash2 size={15} /> Delete
    </ConfirmButton>
  );
}
