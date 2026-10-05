import { cn } from "@/lib/utils";

export function Logo({ name, className, tone = "dark" }: { name: string; className?: string; tone?: "dark" | "light" }) {
  const [first, ...rest] = name.trim().split(/\s+/);
  return (
    <span className={cn("inline-flex items-center gap-3 whitespace-nowrap", tone === "light" ? "text-white" : "text-cocoa", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-gold font-display text-lg leading-none text-gold-dark" aria-hidden>
        {first?.charAt(0).toUpperCase()}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-medium tracking-[0.04em]">{first}</span>
        {rest.length > 0 && <span className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.42em] text-gold-dark">{rest.join(" ")}</span>}
      </span>
    </span>
  );
}
