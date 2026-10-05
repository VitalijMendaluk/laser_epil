"use client";

import type { ActionState } from "@/app/admin/_actions/types";
import { ImageUploader } from "./ImageUploader";
import { AdminField, Card, inputClass, LangFields, StickySave, VisibilityAndOrder } from "./ui";
import { useFormAction } from "./useFormAction";

export type TestimonialFormValues = {
  name: string;
  photo: string;
  textKa: string;
  textRu: string;
  textEn: string;
  rating: number;
  isVisible: boolean;
  sortOrder: number;
};

type Props = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  initial: TestimonialFormValues;
  submitLabel: string;
};

export function TestimonialForm({ action, initial, submitLabel }: Props) {
  const { state, onSubmit, pending } = useFormAction(action);
  const e = state.errors ?? {};

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Client">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Name *" error={e.name}>
            <input name="name" defaultValue={initial.name} className={inputClass} required maxLength={80} />
          </AdminField>
          <AdminField label="Rating" error={e.rating}>
            <select name="rating" defaultValue={initial.rating} className={inputClass}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {"★".repeat(n)}
                  {"☆".repeat(5 - n)} ({n})
                </option>
              ))}
            </select>
          </AdminField>
        </div>
        <div className="mt-6">
          <AdminField label="Photo (optional)" error={e.photo} hint="Square photos look best. Without a photo the first letter of the name is shown.">
            <ImageUploader name="photo" defaultValue={initial.photo ? [initial.photo] : []} />
          </AdminField>
        </div>
      </Card>

      <Card title="Review text" description="Fill at least one language. If a translation is empty, the site shows another language instead.">
        <LangFields base="text" label="Text" values={initial as unknown as Record<string, string>} errors={e} multiline rows={6} />
        <div className="mt-6">
          <VisibilityAndOrder isVisible={initial.isVisible} sortOrder={initial.sortOrder} errors={e} />
        </div>
      </Card>

      <StickySave state={state} pending={pending} label={submitLabel} />
    </form>
  );
}
