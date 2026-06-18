import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PageHero({
  label,
  title,
  description,
  image,
  children,
}: {
  label: string;
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-black)] text-[var(--color-warm-white)]">
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(111,77,56,0.45), rgba(111,77,56,0.78)), url(${image})`,
          }}
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(111,77,56,0.42)_0%,rgba(111,77,56,0.08)_55%,rgba(111,77,56,0.24)_100%)]" />
      <div className="container-shell relative py-28 md:py-36">
        <div className="max-w-3xl">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="font-heading text-5xl leading-[1.05] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-warm-white)_84%,transparent)]">
            {description}
          </p>
          {children ? (
            <div className="mt-10 flex flex-wrap gap-4">{children}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
