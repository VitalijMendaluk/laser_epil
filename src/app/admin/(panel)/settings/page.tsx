import { saveSettingsAction } from "@/app/admin/_actions/content";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { SETTING_GROUPS } from "@/lib/content-schema";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Contacts & settings" };

export default async function SettingsPage() {
  await requireAdmin();
  const rows = await prisma.setting.findMany();
  const values = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <>
      <PageHeader title="Contacts & settings" description="Phone, WhatsApp, email, social networks, map and images. Analytics IDs, booking time slots and images are here too. The address and working hours are edited in Site texts → Contacts section (they are translated)." />
      <div className="space-y-6">
        {SETTING_GROUPS.map((group) => {
          const fields = group.id === "brand" ? group.fields.filter((f) => f.key !== "ogImage") : group.fields;
          return (
            <SettingsForm
              key={group.id}
              title={group.title}
              description={group.description}
              fields={fields}
              values={values}
              action={saveSettingsAction.bind(null, fields.map((f) => f.key))}
            />
          );
        })}
      </div>
    </>
  );
}
