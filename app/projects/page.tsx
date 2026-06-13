import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/lib/site-data";

export default function ProjectsPage() {
  return (
    <>
      <PageHero label="Projects" title="Furniture packages delivered with detail and discipline." description="Browse a selection of residences, villas, hospitality spaces, apartments, and commercial environments." image={projects[0].heroImage} />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div key={project.slug} className="card-surface overflow-hidden">
              <Image src={project.heroImage} alt={project.title} width={900} height={620} className="h-[300px] w-full object-cover" />
              <div className="p-6">
                <h2 className="font-heading text-3xl">{project.title}</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.15em] text-[var(--color-gold)]">{project.location} · {project.type}</p>
                <p className="body-copy mt-3">{project.scope}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
