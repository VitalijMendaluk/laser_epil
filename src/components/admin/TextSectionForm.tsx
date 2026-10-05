"use client";

import { useFormAction } from "./useFormAction";
import type { ActionState } from "@/app/admin/_actions/types";
import type { TextSection } from "@/lib/content-schema";
import { AdminField, Card, FormMessage, inputClass, LANGS, SubmitButton } from "./ui";

type Props = {
  section: TextSection;
  values: Record<string, { ka: string; ru: string; en: string }>;
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
};

export function TextSectionForm({ section, values, action }: Props) {
  const { state, onSubmit, pending } = useFormAction(action);
  const e = state.errors ?? {};

  return (
    <form onSubmit={onSubmit} id={section.id} className="scroll-mt-24">
      <Card
        title={section.title}
        description={section.description}
        actions={
          <div className="flex items-center gap-4">
            <FormMessage state={state} />
            <SubmitButton pending={pending} className="px-5 py-2.5">Save</SubmitButton>
          </div>
        }
      >
        <div className="mb-3 hidden grid-cols-3 gap-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-dark lg:grid">
          {LANGS.map((l) => (
            <span key={l.code}>
              {l.flag} {l.label}
            </span>
          ))}
        </div>
        <div className="space-y-6">
          {section.fields.map((field) => {
            const v = values[field.key] ?? { ka: field.ka, ru: field.ru, en: field.en };
            const Input = field.multiline ? "textarea" : "input";
            return (
              <fieldset key={field.key}>
                <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa/60">{field.label}</legend>
                <div className="grid gap-3 lg:grid-cols-3 lg:gap-6">
                  {LANGS.map((l) => (
                    <AdminField key={l.code} label={`${l.flag} ${l.code.toUpperCase()}`} error={e[`${field.key}:${l.code}`]} className="[&>span:first-child]:lg:hidden">
                      <Input name={`${field.key}:${l.code}`} defaultValue={v[l.code]} rows={field.multiline ? 4 : undefined} className={inputClass} lang={l.code} />
                    </AdminField>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>
      </Card>
    </form>
  );
}
