"use client";

import type { ActionState } from "@/app/admin/_actions/types";
import { ImageUploader } from "./ImageUploader";
import { AdminField, Card, LangFields, StickySave, VisibilityAndOrder } from "./ui";
import { useFormAction } from "./useFormAction";

export type ResultFormValues = {
  beforeImage: string;
  afterImage: string;
  captionKa: string;
  captionUk: string;
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
      <Card title="Photos" description="Use photos of the same area, angle and lighting. Portrait (4:5) photos look best.">
        <div className="grid gap-6 md:grid-cols-2">
          <AdminField label="Before *" error={e.beforeImage}>
            <ImageUploader name="beforeImage" defaultValue={initial.beforeImage ? [initial.beforeImage] : []} />
          </AdminField>
          <AdminField label="After *" error={e.afterImage}>
            <ImageUploader name="afterImage" defaultValue={initial.afterImage ? [initial.afterImage] : []} />
          </AdminField>
        </div>
      </Card>

      <Card title="Description">
        <LangFields base="caption" label="Caption (e.g. “Underarms — after 5 sessions”)" values={initial as unknown as Record<string, string>} errors={e} />
        <div className="mt-6">
          <VisibilityAndOrder isVisible={initial.isVisible} sortOrder={initial.sortOrder} errors={e} />
        </div>
      </Card>

      <StickySave state={state} pending={pending} label={submitLabel} />
    </form>
  );
}
