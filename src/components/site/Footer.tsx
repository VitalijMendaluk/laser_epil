import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SiteSettings, SiteTexts } from "@/lib/content";
import { telLink, whatsappLink } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../ui/icons";
import { Logo } from "./Logo";

export async function Footer({ t, settings }: { t: SiteTexts; settings: SiteSettings }) {
  const tr = await getTranslations();
  const year = new Date().getFullYear();
  const social = [
    { href: settings.instagram, label: "Instagram", icon: InstagramIcon },
    { href: settings.facebook, label: "Facebook", icon: FacebookIcon },
    { href: settings.whatsapp ? whatsappLink(settings.whatsapp) : "", label: "WhatsApp", icon: WhatsAppIcon },
  ].filter((s) => s.href);

  return (
    <footer className="mt-8 border-t border-cocoa/10 bg-cream">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo name={settings.brandName} />
          <p className="mt-6 max-w-sm leading-relaxed text-taupe">{t["footer.tagline"]}</p>
          <div className="mt-8 flex gap-3">
            {social.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-cocoa/15 transition hover:border-gold hover:text-gold-dark">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-dark">{tr("footer.navigation")}</p>
          <ul className="mt-6 space-y-3 text-cocoa/75">
            <li><Link href="/#services" className="hover:text-gold-dark">{tr("nav.services")}</Link></li>
            <li><Link href="/prices" className="hover:text-gold-dark">{tr("nav.prices")}</Link></li>
            <li><Link href="/#about" className="hover:text-gold-dark">{tr("nav.about")}</Link></li>
            <li><Link href="/#faq" className="hover:text-gold-dark">{tr("nav.faq")}</Link></li>
            <li><Link href="/#contact" className="hover:text-gold-dark">{tr("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-dark">{tr("footer.contacts")}</p>
          <ul className="mt-6 space-y-3 text-cocoa/75">
            {settings.phone && <li><a href={telLink(settings.phone)} className="hover:text-gold-dark">{settings.phone}</a></li>}
            {settings.email && <li><a href={`mailto:${settings.email}`} className="hover:text-gold-dark">{settings.email}</a></li>}
            <li className="text-taupe">{t["contact.address"]}</li>
            <li className="text-taupe">{t["contact.hours"]}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cocoa/10">
        <p className="mx-auto max-w-[1400px] px-5 py-6 text-[11px] tracking-[0.1em] text-taupe sm:px-8">
          © {year} {settings.brandName}. {t["footer.copyright"]}
        </p>
      </div>
    </footer>
  );
}
