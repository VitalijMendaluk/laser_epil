import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { LocalizedService } from "@/lib/content";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";
import { BookButton } from "./BookingProvider";

export async function PriceTable({ services, currency }: { services: LocalizedService[]; currency: string }) {
  const t = await getTranslations();
  if (services.length === 0) return <p className="py-24 text-center text-taupe">{t("prices.empty")}</p>;

  const groups = (["WOMEN", "MEN"] as const).map((c) => ({ category: c, items: services.filter((s) => s.category === c) })).filter((g) => g.items.length);

  return (
    <div className="space-y-14">
      {groups.map((g) => (
        <Reveal key={g.category}>
          {groups.length > 1 && <h2 className="mb-5 font-display text-3xl font-light">{t(`service.${g.category}`)}</h2>}
          <div className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-cocoa/[0.07]">
            <table className="w-full text-left">
              <thead className="bg-cream text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe">
                <tr>
                  <th scope="col" className="px-5 py-4 sm:px-8">{t("prices.service")}</th>
                  <th scope="col" className="hidden px-5 py-4 sm:table-cell">{t("prices.duration")}</th>
                  <th scope="col" className="px-5 py-4 text-right">{t("prices.price")}</th>
                  <th scope="col" className="hidden w-px px-5 py-4 md:table-cell sm:pr-8"><span className="sr-only">{t("service.book")}</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cocoa/[0.07]">
                {g.items.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-ivory">
                    <th scope="row" className="px-5 py-5 font-normal sm:px-8">
                      <span className="block font-display text-xl leading-tight sm:text-2xl">{s.name}</span>
                      <span className="mt-1 flex items-center gap-1.5 text-xs text-taupe sm:hidden">
                        <Clock size={12} strokeWidth={1.5} /> {t("service.minutes", { count: s.durationMin })}
                      </span>
                    </th>
                    <td className="hidden whitespace-nowrap px-5 py-5 text-taupe sm:table-cell">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} strokeWidth={1.5} className="text-gold" /> {t("service.minutes", { count: s.durationMin })}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 text-right font-display text-2xl text-gold-dark">{formatPrice(s.price, currency)}</td>
                    <td className="hidden px-5 py-5 text-right md:table-cell sm:pr-8">
                      <BookButton serviceId={s.id} className="btn-outline px-5 py-2.5">
                        {t("service.book")}
                      </BookButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
