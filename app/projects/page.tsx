import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
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
