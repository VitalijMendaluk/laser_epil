"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Loader2 } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { trackLead } from "@/lib/track";
import { cn, formatPrice } from "@/lib/utils";
import { bookingSchema } from "@/lib/validation";
import type { BookingServiceOption } from "./BookingProvider";
import { Modal } from "./Modal";
import { Turnstile, type TurnstileHandle } from "./Turnstile";

type Props = {
  open: boolean;
  initialServiceId: string;
  services: BookingServiceOption[];
  currency: string;
  timeSlots: string[];
  captchaSiteKey?: string;
  onClose: () => void;
};

const EMPTY = { fullName: "", phone: "", serviceId: "", date: "", time: "", message: "", website: "" };
type FormState = typeof EMPTY;

const SELECT_ARROW = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%238a6a32' stroke-width='1.5'/%3E%3C/svg%3E\")",
};

function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function BookingModal({ open, initialServiceId, services, currency, timeSlots, captchaSiteKey, onClose }: Props) {
  const t = useTranslations("booking");
  const te = useTranslations("errors");
  const ts = useTranslations("service");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const titleId = useId();
  const captchaRef = useRef<TurnstileHandle>(null);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [captchaToken, setCaptchaToken] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY, serviceId: initialServiceId });
      setStatus("idle");
      setErrors({});
      setFormError("");
      setCaptchaToken("");
    }
  }, [open, initialServiceId]);

  const selected = services.find((s) => s.id === form.serviceId);
  const msg = (code: string) => (te.has(code as never) ? te(code as never) : te("generic"));

  const update = (key: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(({ [key]: _removed, ...rest }) => rest);
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    const payload = { ...form, locale, captchaToken: captchaToken || undefined };
    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0] ?? "_form")] ??= issue.message;
      setErrors(next);
      return;
    }
    if (captchaSiteKey && !captchaToken) {
      setFormError(te("captcha"));
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { errors?: Record<string, string>; error?: string };
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(res.status === 429 ? te("rateLimited") : data.error === "captcha" ? te("captcha") : data.errors ? "" : te("server"));
        setStatus("idle");
        captchaRef.current?.reset();
        return;
      }
      trackLead(selected?.name ?? "", selected?.price, currency);
      setStatus("done");
    } catch {
      setFormError(te("server"));
      setStatus("idle");
      captchaRef.current?.reset();
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} closeLabel={tn("close")} className="max-w-4xl">
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        <aside className="relative hidden min-h-full overflow-hidden bg-nude md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected?.id ?? "none"}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {selected?.image ? (
                <Image src={selected.image} alt={selected.name} fill sizes="360px" className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#fff_0%,transparent_55%)]" />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            {selected ? (
              <>
                <p className="font-display text-3xl leading-tight">{selected.name}</p>
                <p className="mt-3 flex items-center gap-4 text-sm text-white/80">
                  <span className="font-display text-2xl text-gold-light">{formatPrice(selected.price, currency)}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} strokeWidth={1.5} /> {ts("minutes", { count: selected.durationMin })}
                  </span>
                </p>
              </>
            ) : (
              <p className="font-display text-3xl italic leading-tight">{t("chooseService")}</p>
            )}
          </div>
        </aside>

        <div className="p-6 pt-14 sm:p-10">
          {status === "done" ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[460px] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-gold text-gold-dark">
                <Check size={28} strokeWidth={1.25} />
              </span>
              <h2 id={titleId} className="mt-8 font-display text-3xl">
                {t("thanksTitle")}
              </h2>
              <p className="mt-3 max-w-xs text-taupe">{t("thanks")}</p>
              <button type="button" onClick={onClose} className="btn-outline mt-10" data-autofocus>
                {t("done")}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h2 id={titleId} className="font-display text-3xl font-light sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-2 text-sm text-taupe">{t("subtitle")}</p>

              <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                <Field label={`${t("fullName")} *`} error={errors.fullName && msg(errors.fullName)}>
                  <input className="field" value={form.fullName} onChange={update("fullName")} autoComplete="name" required data-autofocus aria-invalid={!!errors.fullName} />
                </Field>
                <Field label={`${t("phone")} *`} error={errors.phone && msg(errors.phone)}>
                  <input className="field" type="tel" inputMode="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" placeholder="+995" required aria-invalid={!!errors.phone} />
                </Field>
                <Field label={`${t("service")} *`} error={errors.serviceId && msg(errors.serviceId)} className="sm:col-span-2">
                  <select className="field cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat" style={SELECT_ARROW} value={form.serviceId} onChange={update("serviceId")} required aria-invalid={!!errors.serviceId}>
                    <option value="">{t("chooseService")}</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {formatPrice(s.price, currency)}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={`${t("date")} *`} error={errors.date && msg(errors.date)}>
                  <input className="field" type="date" min={today()} value={form.date} onChange={update("date")} required aria-invalid={!!errors.date} />
                </Field>
                <Field label={`${t("time")} *`} error={errors.time && msg(errors.time)}>
                  <select className="field cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat" style={SELECT_ARROW} value={form.time} onChange={update("time")} required aria-invalid={!!errors.time}>
                    <option value="">{t("chooseTime")}</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("message")} error={errors.message && msg(errors.message)} className="sm:col-span-2">
                  <textarea className="field min-h-[72px] resize-none" rows={2} value={form.message} onChange={update("message")} placeholder={t("messagePlaceholder")} maxLength={1000} />
                </Field>
                {/* Honeypot */}
                <input type="text" name="website" value={form.website} onChange={update("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              </div>

              {captchaSiteKey && (
                <div className="mt-6">
                  <Turnstile ref={captchaRef} siteKey={captchaSiteKey} locale={locale} onToken={setCaptchaToken} />
                </div>
              )}

              {formError && (
                <p className="mt-6 border-l-2 border-red-500 pl-3 text-sm text-red-700" role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" className="btn-primary mt-8 w-full" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {t("sending")}
                  </>
                ) : (
                  t("submit")
                )}
              </button>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-taupe/80">{t("privacy")}</p>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}

function Field({ label, error, className, children }: { label: string; error?: string | false; className?: string; children: ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-700">{error}</span>}
    </label>
  );
}
