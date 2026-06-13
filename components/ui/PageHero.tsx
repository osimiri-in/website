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
    <section className="relative overflow-hidden bg-[var(--color-black)] text-white">
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(28,28,28,0.65), rgba(28,28,28,0.65)), url(${image})`,
          }}
        />
      ) : null}
      <div className="container-shell relative py-28 md:py-36">
        <div className="max-w-3xl">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="font-heading text-5xl leading-[1.05] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
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
