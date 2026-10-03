import "server-only";

/** Reads form fields into a plain object; checkboxes become booleans. */
export function readForm(formData: FormData, keys: string[], checkboxes: string[] = []) {
  const out: Record<string, unknown> = {};
  for (const k of keys) out[k] = formData.get(k) ?? "";
  for (const k of checkboxes) out[k] = formData.get(k) === "on";
  return out;
}

export const FIX_FIELDS = "Please fix the highlighted fields";
