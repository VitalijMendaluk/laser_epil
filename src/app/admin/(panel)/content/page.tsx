import { saveTextSectionAction } from "@/app/admin/_actions/content";
import { TextSectionForm } from "@/components/admin/TextSectionForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { TEXT_SECTIONS } from "@/lib/content-schema";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Site texts" };

export default async function ContentPage() {
  await requireAdmin();
  const rows = await prisma.siteText.findMany();
  const values = Object.fromEntries(rows.map((r) => [r.key, { ka: r.ka, uk: r.uk, en: r.en }]));
  const sections = TEXT_SECTIONS.filter((s) => s.id !== "seo");

  return (
    <>
      <PageHeader title="Site texts" description="Edit every text on the website in Georgian, Ukrainian and English. Each section is saved separately." />
      <nav className="mb-8 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="rounded-full border border-cocoa/15 px-3.5 py-1.5 text-sm text-cocoa/65 hover:border-gold hover:text-gold-dark">
            {s.title}
          </a>
        ))}
      </nav>
      <div className="space-y-6">
        {sections.map((section) => (
          <TextSectionForm key={section.id} section={section} values={values} action={saveTextSectionAction.bind(null, section.id)} />
        ))}
      </div>
    </>
  );
}
