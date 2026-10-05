"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SubmitButton({ children, className, pending, pendingLabel = "Saving…" }: { children: ReactNode; className?: string; pending: boolean; pendingLabel?: string }) {
  return (
    <button type="submit" disabled={pending} className={cn("btn-primary px-6 py-3", className)}>
      {pending ? (
        <>
          <Loader2 size={14} className="animate-spin" /> {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormMessage({ state }: { state: { ok?: boolean; message?: string } }) {
  if (!state.message) return null;
  return (
    <p role="status" className={cn("text-sm", state.ok ? "text-emerald-700" : "text-red-600")}>
      {state.message}
    </p>
  );
}

export function AdminField({
  label,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-cocoa/55">{label}</span>
      {children}
      {hint && !error && <span className="mt-1.5 block text-xs text-cocoa/50">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-md border border-cocoa/10 bg-ivory px-3.5 py-2.5 text-sm text-cocoa placeholder:text-cocoa/25 transition focus:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/15";

export function Card({ title, description, actions, children, className }: { title?: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-cocoa/10 bg-white", className)}>
      {(title || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-cocoa/10 px-6 py-5">
          <div>
            {title && <h2 className="text-base font-medium">{title}</h2>}
            {description && <p className="mt-1 text-sm text-cocoa/60">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 text-sm text-cocoa/60">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export const LANGS = [
  { code: "ka", label: "ქართული", flag: "🇬🇪" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;

const SUFFIX = { ka: "Ka", ru: "Ru", en: "En" } as const;

/** Three inputs (ka / ru / en) for a translated field, named `${base}Ka`, `${base}Ru`, `${base}En`. */
export function LangFields({
  base,
  label,
  values,
  errors,
  multiline,
  rows = 4,
  required,
}: {
  base: string;
  label: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}) {
  const Input = multiline ? "textarea" : "input";
  return (
    <fieldset>
      <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa/60">
        {label}
        {required && " *"}
      </legend>
      <div className="grid gap-3 lg:grid-cols-3 lg:gap-5">
        {LANGS.map((l) => {
          const name = `${base}${SUFFIX[l.code]}`;
          return (
            <AdminField key={l.code} label={`${l.flag} ${l.label}`} error={errors[name]}>
              <Input name={name} defaultValue={values[name] ?? ""} rows={multiline ? rows : undefined} className={inputClass} lang={l.code} required={required} />
            </AdminField>
          );
        })}
      </div>
    </fieldset>
  );
}

export function VisibilityAndOrder({ isVisible, sortOrder, errors }: { isVisible: boolean; sortOrder: number; errors: Record<string, string> }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <AdminField label="Sort order" error={errors.sortOrder} hint="Lower numbers are shown first">
        <input name="sortOrder" type="number" min={0} defaultValue={sortOrder} className={inputClass} />
      </AdminField>
      <div className="flex items-end pb-2.5">
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input name="isVisible" type="checkbox" defaultChecked={isVisible} className="h-4 w-4 accent-[#b8955a]" />
          Visible on website
        </label>
      </div>
    </div>
  );
}

export function StickySave({ state, pending, label }: { state: { ok?: boolean; message?: string }; pending: boolean; label: string }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 flex items-center justify-end gap-4 border-t border-cocoa/10 bg-ivory/90 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
      <FormMessage state={state} />
      <SubmitButton pending={pending}>{label}</SubmitButton>
    </div>
  );
}
