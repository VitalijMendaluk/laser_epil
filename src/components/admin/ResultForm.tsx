"use client";

import type { ActionState } from "@/app/admin/_actions/types";
import { ImageUploader } from "./ImageUploader";
import { AdminField, Card, LangFields, StickySave, VisibilityAndOrder } from "./ui";
import { useFormAction } from "./useFormAction";

export type ResultFormValues = {
  beforeImage: string;
  afterImage: string;
  captionKa: string;
  captionRu: string;
  captionEn: string;
  isVisible: boolean;
  sortOrder: number;
};

type Props = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  initial: ResultFormValues;
  submitLabel: string;
};

export function ResultForm({ action, initial, submitLabel }: Props) {
  const { state, onSubmit, pending } = useFormAction(action);
  const e = state.errors ?? {};

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Photos" description="Add only the “After” photo for a regular portfolio picture. Add a “Before” photo too to show a before/after slider. Portrait (4:5) photos look best.">
        <div className="grid gap-6 md:grid-cols-2">
          <AdminField label="Before (optional)" error={e.beforeImage}>
            <ImageUploader name="beforeImage" defaultValue={initial.beforeImage ? [initial.beforeImage] : []} />
          </AdminField>
          <AdminField label="After / work photo *" error={e.afterImage}>
            <ImageUploader name="afterImage" defaultValue={initial.afterImage ? [initial.afterImage] : []} />
          </AdminField>
        </div>
      </Card>

      <Card title="Description">
        <LangFields base="caption" label="Caption (e.g. “Balayage”, “Bridal hairstyle”)" values={initial as unknown as Record<string, string>} errors={e} />
        <div className="mt-6">
          <VisibilityAndOrder isVisible={initial.isVisible} sortOrder={initial.sortOrder} errors={e} />
        </div>
      </Card>

      <StickySave state={state} pending={pending} label={submitLabel} />
    </form>
  );
}
