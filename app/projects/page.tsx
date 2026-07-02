import Image from "next/image";
import { Download } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { buttonClasses } from "@/components/ui/Button";
import { projects } from "@/lib/site-data";

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Projects"
        title="Bespoke furniture, delivered project by project."
        description="A selection of customized furniture projects — each crafted in-house from material selection to final detailing, designed to align with the space's aesthetic."
        image="/projects/hero.jpg"
      />
      <section className="border-b border-black/10 bg-[var(--color-warm-white)] py-8">
        <div className="container-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-[var(--color-gold)]">Portfolio</p>
            <h2 className="font-heading mt-2 text-3xl text-[var(--color-black)]">
              OSIMIRI project portfolio
            </h2>
          </div>
          <a
            href="/osimiri-portfolio.pdf"
            download="OSIMIRI Portfolio.pdf"
            className={buttonClasses("primary", "w-full sm:w-auto")}
          >
            <Download size={16} />
            Download Portfolio
          </a>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <article key={project.slug} id={project.slug} className="scroll-mt-28">
              <header className="mx-auto max-w-3xl text-center">
                <p className="eyebrow text-[var(--color-gold)]">
                  {[`Project ${String(index + 1).padStart(2, "0")}`, project.location, project.type]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <h2 className="font-heading mt-3 text-4xl md:text-5xl">{project.title}</h2>
                {project.description ? (
                  <p className="body-copy mx-auto mt-4 max-w-2xl">{project.description}</p>
                ) : null}
              </header>

              <div className="mt-10 space-y-6">
                {project.slides.map((slide, slideIndex) => (
                  <div key={slide} className="card-surface overflow-hidden">
                    <Image
                      src={slide}
                      alt={`${project.title} — slide ${slideIndex + 1}`}
                      width={2000}
                      height={1125}
                      className="h-auto w-full"
                      priority={index === 0 && slideIndex === 0}
                    />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
