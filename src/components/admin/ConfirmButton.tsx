"use client";

import { useTransition, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Runs a server action after a native confirm dialog. */
export function ConfirmButton({
  action,
  confirm,
  className,
  children,
  title,
}: {
  action: () => Promise<unknown>;
  confirm: string;
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={pending}
      className={cn("disabled:opacity-50", className)}
      onClick={() => {
        if (window.confirm(confirm)) start(() => void action());
      }}
    >
      {children}
    </button>
  );
}
