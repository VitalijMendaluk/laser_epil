import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { SiteSettings, SiteTexts } from "@/lib/content";
import { isAllowedMapUrl, telLink, whatsappLink } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import { TrackedLink } from "./TrackedLink";

export async function Contact({ t, settings }: { t: SiteTexts; settings: SiteSettings }) {
  const tc = await getTranslations("contact");
  const ta = await getTranslations("actions");
  const address = t["contact.address"] ?? "";

  const items = [
    { icon: MapPin, label: tc("address"), value: address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, external: true },
    { icon: Phone, label: tc("phone"), value: settings.phone, href: telLink(settings.phone) },
    { icon: WhatsAppIcon, label: tc("whatsapp"), value: settings.whatsapp ? `+${settings.whatsapp.replace(/\D/g, "")}` : "", href: whatsappLink(settings.whatsapp), external: true },
    { icon: Mail, label: tc("email"), value: settings.email, href: `mailto:${settings.email}` },
    { icon: Clock, label: tc("hours"), value: t["contact.hours"] },
  ].filter((i) => i.value);

  return (
    <section id="contact" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={t["contact.eyebrow"]} title={t["contact.title"] ?? ""} subtitle={t["contact.subtitle"]} />

          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-cocoa/10 border-y border-cocoa/10">
              {items.map(({ icon: Icon, label, value, href, external }) => {
                const content = (
                  <>
                    <Icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <span className="w-28 shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe sm:w-36">{label}</span>
                    <span className="text-cocoa">{value}</span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-start gap-4 py-5 transition-colors hover:[&>span:last-child]:text-gold-dark">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 py-5">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            {settings.phone && (
              <TrackedLink method="phone" href={telLink(settings.phone)} className="btn-primary">
                <Phone size={15} strokeWidth={1.8} /> {ta("call")}
              </TrackedLink>
            )}
            {settings.whatsapp && (
              <TrackedLink method="whatsapp" href={whatsappLink(settings.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn border border-[#25D366]/40 text-cocoa hover:bg-[#25D366] hover:text-white">
                <WhatsAppIcon size={16} /> WhatsApp
              </TrackedLink>
            )}
            {settings.instagram && (
              <TrackedLink method="instagram" href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label={tc("instagram")} className="grid h-[46px] w-[46px] place-items-center rounded-full border border-cocoa/15 transition hover:border-gold hover:text-gold-dark">
                <InstagramIcon />
              </TrackedLink>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-[46px] w-[46px] place-items-center rounded-full border border-cocoa/15 transition hover:border-gold hover:text-gold-dark">
                <FacebookIcon />
              </a>
            )}
          </Reveal>
        </div>

        {settings.mapEmbedUrl && isAllowedMapUrl(settings.mapEmbedUrl) && (
          <Reveal delay={0.15} className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-cocoa/10 lg:min-h-full">
            <iframe
              src={settings.mapEmbedUrl}
              title={address}
              className="absolute inset-0 h-full w-full [filter:grayscale(0.6)_sepia(0.25)_contrast(0.95)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
