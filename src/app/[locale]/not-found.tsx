import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[8rem] font-light leading-none text-gold">404</p>
      <h1 className="mt-6 font-display text-4xl">{t("title")}</h1>
      <p className="mt-4 text-taupe">{t("text")}</p>
      <Link href="/" className="btn-outline mt-10">
        {t("back")}
      </Link>
    </section>
  );
}
