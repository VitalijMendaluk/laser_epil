import { cn } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left", as: Tag = "h2", className }: Props) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>}
      <Tag className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-light leading-[1.08] tracking-tight">{title}</Tag>
      {subtitle && <p className={cn("mt-5 text-base leading-relaxed text-taupe sm:text-lg", align === "center" && "mx-auto max-w-2xl")}>{subtitle}</p>}
    </Reveal>
  );
}
