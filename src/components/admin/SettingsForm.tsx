"use client";

import { useFormAction } from "./useFormAction";
import type { ActionState } from "@/app/admin/_actions/types";
import type { SettingField } from "@/lib/content-schema";
import { ImageUploader } from "./ImageUploader";
import { AdminField, Card, FormMessage, inputClass, SubmitButton } from "./ui";

type Props = {
  title: string;
  description?: string;
  fields: SettingField[];
  values: Record<string, string>;
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
};

export function SettingsForm({ title, description, fields, values, action }: Props) {
  const { state, onSubmit, pending } = useFormAction(action);
  const e = state.errors ?? {};

  return (
    <form onSubmit={onSubmit}>
      <Card
        title={title}
        description={description}
        actions={
          <div className="flex items-center gap-4">
            <FormMessage state={state} />
            <SubmitButton pending={pending} className="px-5 py-2.5">Save</SubmitButton>
          </div>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((f) => {
            const value = values[f.key] ?? f.default;
            if (f.kind === "image") {
              return (
                <AdminField key={f.key} label={f.label} error={e[f.key]} hint={f.hint} className="md:col-span-2">
                  <ImageUploader name={f.key} defaultValue={value ? [value] : []} />
                </AdminField>
              );
            }
            if (f.kind === "map") {
              return (
                <AdminField key={f.key} label={f.label} error={e[f.key]} hint={f.hint} className="md:col-span-2">
                  <textarea name={f.key} defaultValue={value} rows={3} className={inputClass} />
                </AdminField>
              );
            }
            if (f.kind === "times") {
              return (
                <AdminField key={f.key} label={f.label} error={e[f.key]} hint={f.hint} className="md:col-span-2">
                  <textarea name={f.key} defaultValue={value} rows={2} className={inputClass} />
                </AdminField>
              );
            }
            return (
              <AdminField key={f.key} label={f.label} error={e[f.key]} hint={f.hint}>
                <input name={f.key} type={f.kind === "email" ? "email" : f.kind === "url" ? "url" : "text"} inputMode={f.kind === "pixel" ? "numeric" : undefined} defaultValue={value} className={inputClass} />
              </AdminField>
            );
          })}
        </div>
      </Card>
    </form>
  );
}
