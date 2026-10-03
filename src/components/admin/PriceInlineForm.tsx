"use client";

import { Check, Loader2 } from "lucide-react";
import type { ActionState } from "@/app/admin/_actions/types";
import { cn } from "@/lib/utils";
import { useFormAction } from "./useFormAction";

/** Quick price + duration edit right in the services list. */
export function PriceInlineForm({ action, price, durationMin, currency }: { action: (s: ActionState, f: FormData) => Promise<ActionState>; price: number; durationMin: number; currency: string }) {
  const { state, onSubmit, pending } = useFormAction(action);
  const field = "w-20 rounded-md border border-cocoa/15 bg-ivory px-2 py-1.5 text-right text-sm focus:border-gold focus:outline-none";
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <label className="flex items-center gap-1.5 text-xs text-cocoa/60">
        <input name="price" type="number" min={0} defaultValue={price} className={cn(field, state.errors?.price && "border-red-400")} aria-label="Price" />
        {currency}
      </label>
      <label className="flex items-center gap-1.5 text-xs text-cocoa/60">
        <input name="durationMin" type="number" min={5} max={600} step={5} defaultValue={durationMin} className={cn(field, "w-16", state.errors?.durationMin && "border-red-400")} aria-label="Duration in minutes" />
        min
      </label>
      <button type="submit" disabled={pending} title="Save price" aria-label="Save price" className={cn("grid h-8 w-8 place-items-center rounded-md border transition", state.ok ? "border-emerald-500/40 text-emerald-700" : "border-cocoa/15 text-cocoa/60 hover:border-gold hover:text-gold-dark")}>
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
      </button>
    </form>
  );
}
