"use client";

import type { ActionState } from "@/app/admin/_actions/types";
import { ImageUploader } from "./ImageUploader";
import { AdminField, Card, inputClass, LangFields, StickySave, VisibilityAndOrder } from "./ui";
import { useFormAction } from "./useFormAction";

export type ServiceFormValues = {
  nameKa: string;
  nameUk: string;
  nameEn: string;
  descriptionKa: string;
  descriptionUk: string;
  descriptionEn: string;
  category: "WOMEN" | "MEN";
  price: number | "";
  durationMin: number | "";
  image: string;
  isVisible: boolean;
  sortOrder: number;
};

type Props = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  initial: ServiceFormValues;
  submitLabel: string;
};

export function ServiceForm({ action, initial, submitLabel }: Props) {
  const { state, onSubmit, pending } = useFormAction(action);
  const e = state.errors ?? {};
  const text = initial as unknown as Record<string, string>;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Name & description" description="Fill all three languages — the site shows the version matching the visitor's language.">
        <div className="space-y-6">
          <LangFields base="name" label="Name" values={text} errors={e} required />
          <LangFields base="description" label="Description" values={text} errors={e} multiline />
        </div>
      </Card>

      <Card title="Price, duration & category">
        <div className="grid gap-5 sm:grid-cols-3">
          <AdminField label="Price *" error={e.price} hint="Whole number, currency is set in Settings">
            <input name="price" type="number" min={0} step={1} defaultValue={initial.price} className={inputClass} required />
          </AdminField>
          <AdminField label="Duration, min *" error={e.durationMin}>
            <input name="durationMin" type="number" min={5} max={600} step={5} defaultValue={initial.durationMin} className={inputClass} required />
          </AdminField>
          <AdminField label="Category" error={e.category}>
            <select name="category" defaultValue={initial.category} className={inputClass}>
              <option value="WOMEN">For women</option>
              <option value="MEN">For men</option>
            </select>
          </AdminField>
        </div>
        <div className="mt-6">
          <VisibilityAndOrder isVisible={initial.isVisible} sortOrder={initial.sortOrder} errors={e} />
        </div>
      </Card>

      <Card title="Photo">
        <ImageUploader name="image" defaultValue={initial.image ? [initial.image] : []} error={e.image} />
      </Card>

      <StickySave state={state} pending={pending} label={submitLabel} />
    </form>
  );
}
