"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import type { ActionState } from "@/app/admin/_actions/types";

/**
 * Like useActionState, but submits via onSubmit so React 19 does not
 * auto-reset the form — users keep their input when validation fails.
 */
export function useFormAction(action: (state: ActionState, formData: FormData) => Promise<ActionState>) {
  const [state, dispatch, pending] = useActionState(action, {});
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => dispatch(formData));
  };
  return { state, onSubmit, pending };
}
