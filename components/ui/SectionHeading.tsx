import { SectionLabel } from "@/components/ui/SectionLabel";

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  inverse = false,
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const descColor = inverse
    ? "text-[color:color-mix(in_srgb,var(--color-warm-white)_84%,transparent)]"
    : "text-[var(--color-mid)]";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <SectionLabel>{label}</SectionLabel>
      <h2
        className={`font-heading text-4xl leading-tight md:text-5xl ${
          inverse ? "text-[var(--color-warm-white)]" : "text-[var(--color-black)]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`body-copy mt-6 ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
