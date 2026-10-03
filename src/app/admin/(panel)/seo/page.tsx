import { saveSettingsAction, saveTextSectionAction } from "@/app/admin/_actions/content";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { TextSectionForm } from "@/components/admin/TextSectionForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { SETTING_FIELDS, TEXT_SECTIONS } from "@/lib/content-schema";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "SEO" };

export default async function SeoPage() {
  await requireAdmin();
  const section = TEXT_SECTIONS.find((s) => s.id === "seo")!;
  const [texts, settings] = await Promise.all([prisma.siteText.findMany({ where: { key: { startsWith: "seo." } } }), prisma.setting.findMany({ where: { key: "ogImage" } })]);
  const values = Object.fromEntries(texts.map((r) => [r.key, { ka: r.ka, uk: r.uk, en: r.en }]));
  const ogField = SETTING_FIELDS.filter((f) => f.key === "ogImage");

  return (
    <>
      <PageHeader title="SEO" description="Titles, descriptions and keywords (for each language) shown in Google and when links are shared on social networks. Sitemap and robots.txt are generated automatically." />
      <div className="space-y-6">
        <TextSectionForm section={section} values={values} action={saveTextSectionAction.bind(null, "seo")} />
        <SettingsForm
          title="Open Graph image"
          description="Preview image for Facebook, WhatsApp, Telegram etc."
          fields={ogField}
          values={Object.fromEntries(settings.map((s) => [s.key, s.value]))}
          action={saveSettingsAction.bind(null, ["ogImage"])}
        />
        <div className="rounded-xl border border-cocoa/10 bg-white p-6 text-sm text-cocoa/55">
          <p>
            Sitemap: <a href="/sitemap.xml" target="_blank" className="text-gold-dark hover:underline">/sitemap.xml</a> · Robots: <a href="/robots.txt" target="_blank" className="text-gold-dark hover:underline">/robots.txt</a>
          </p>
        </div>
      </div>
    </>
  );
}
