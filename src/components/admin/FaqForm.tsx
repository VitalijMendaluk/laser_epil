"use client";

import type { ActionState } from "@/app/admin/_actions/types";
import { Card, LangFields, StickySave, VisibilityAndOrder } from "./ui";
import { useFormAction } from "./useFormAction";

export type FaqFormValues = {
  questionKa: string;
  questionUk: string;
  questionEn: string;
  answerKa: string;
  answerUk: string;
  answerEn: string;
  isVisible: boolean;
  sortOrder: number;
};

type Props = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  initial: FaqFormValues;
  submitLabel: string;
};

export function FaqForm({ action, initial, submitLabel }: Props) {
  const { state, onSubmit, pending } = useFormAction(action);
  const e = state.errors ?? {};
  const values = initial as unknown as Record<string, string>;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Question & answer" description="All three languages are required.">
        <div className="space-y-6">
          <LangFields base="question" label="Question" values={values} errors={e} required />
          <LangFields base="answer" label="Answer" values={values} errors={e} multiline rows={6} required />
          <VisibilityAndOrder isVisible={initial.isVisible} sortOrder={initial.sortOrder} errors={e} />
        </div>
      </Card>
      <StickySave state={state} pending={pending} label={submitLabel} />
    </form>
  );
}
