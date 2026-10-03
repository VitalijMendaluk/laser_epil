"use client";

import { useFormAction } from "./useFormAction";
import { loginAction } from "@/app/admin/_actions/auth";
import { AdminField, inputClass, SubmitButton } from "./ui";

export function LoginForm() {
  const { state, onSubmit, pending } = useFormAction(loginAction);
  const e = state.errors ?? {};

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <AdminField label="Login" error={e.login}>
        <input name="login" type="text" autoComplete="username" autoCapitalize="none" required autoFocus className={inputClass} />
      </AdminField>
      <AdminField label="Password" error={e.password}>
        <input name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </AdminField>
      {state.message && (
        <p role="alert" className="rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-600">
          {state.message}
        </p>
      )}
      <SubmitButton pending={pending} className="w-full" pendingLabel="Signing in…">
        Sign in
      </SubmitButton>
    </form>
  );
}
