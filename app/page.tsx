import Image from "next/image";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  collections,
  homeUsps,
  manufacturingCapabilities,
  processSteps,
  projects,
  testimonials,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--color-black)] text-[var(--color-warm-white)]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(111,77,56,0.32), rgba(111,77,56,0.88)), url(${projects[0].heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(111,77,56,0.62)_0%,rgba(111,77,56,0.30)_48%,rgba(111,77,56,0.40)_100%)]" />
        <div className="container-shell relative py-16">
          <div className="max-w-4xl pb-16 md:pb-24">
            <p className="eyebrow !text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Luxury Furniture Partner</p>
            <h1 className="font-heading mt-5 text-5xl leading-[1.03] md:text-7xl xl:text-[84px]">
              Bespoke furniture shaped by material, craft, and spatial intent.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-warm-white)_84%,transparent)]">
              OSIMIRI works with architects, interior designers, and homeowners
              to build custom pieces entirely in-house.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/collections">Explore Collections</Button>
              <EnquiryButton
                label="Book A Visit"
                variant="outline"
                className="border-[var(--color-warm-white)] text-[var(--color-warm-white)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-warm-white)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell text-center">
          <Reveal>
            <p className="eyebrow">
              Crafted In India. Designed For The World.
            </p>
            <h2 className="font-heading mx-auto mt-6 max-w-5xl text-4xl leading-tight md:text-6xl">
              Every piece is a conversation between material, form, and the
              space it inhabits.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-[var(--color-warm-white)]">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {homeUsps.map((usp, index) => (
            <Reveal key={usp.title} delay={index * 0.05} className="card-surface overflow-hidden">
              <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                <div className="p-8 md:p-10">
                  <p className="eyebrow">OSIMIRI Advantage</p>
                  <h3 className="font-heading mt-4 text-3xl">{usp.title}</h3>
                  <p className="body-copy mt-4">{usp.description}</p>
                </div>
                <Image
                  src={usp.image}
                  alt={usp.title}
                  width={800}
                  height={900}
                  className="h-full min-h-[300px] w-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            label="Our Collections"
            title="Curated for every space."
            description="An adaptable collection system for living rooms, bedrooms, dining spaces, lounges, and project-specific applications."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {collections.slice(0, 8).map((collection, index) => (
              <Reveal
                key={collection.slug}
                delay={index * 0.04}
                className={index === 0 ? "xl:col-span-2 xl:row-span-2" : ""}
              >
                <div className="group relative block overflow-hidden">
                  <Image
                    src={collection.heroImage}
                    alt={collection.name}
                    width={900}
                    height={1100}
                    className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.04] xl:h-full xl:min-h-[420px]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-6 text-white">
                    <p className="eyebrow !text-white font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">{collection.category}</p>
                    <h3 className="font-heading mt-3 text-3xl">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/collections">View All Collections</Button>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-warm-white)] text-[var(--color-black)]">
        <div className="container-shell">
          <SectionHeading
            label="Portfolio"
            title="Spaces we've brought to life."
            description="Large-format residential and hospitality execution with tailored furniture packages."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.04}>
                <div className="card-surface overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    width={900}
                    height={620}
                    className="h-[320px] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-3xl">{project.title}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.15em] text-[var(--color-mid)]">
                      {project.location} · {project.type}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/projects" variant="outline">
              See All Projects
            </Button>
          </div>
        </div>
      </section>

      <section className="section-space bg-[color:color-mix(in_srgb,var(--color-gold-light)_30%,white)]">
        <div className="container-shell">
          <SectionHeading
            label="How We Work"
            title="A clear, premium process from brief to installation."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <Reveal key={step} delay={index * 0.04} className="border-t border-black/20 pt-6">
                <div className="font-heading text-5xl text-black/20">0{index + 1}</div>
                <h3 className="mt-5 font-heading text-2xl">{step}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <Image
              src={manufacturingCapabilities[0].image}
              alt="OSIMIRI manufacturing"
              width={1200}
              height={950}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </Reveal>
          <Reveal>
            <SectionHeading
              label="Manufacturing"
              title="Built entirely under one roof."
              description="OSIMIRI integrates solid wood joinery, metal fabrication, marble cutting, and upholstery to deliver higher quality and smoother project coordination."
            />
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-[color:color-mix(in_srgb,var(--color-gold-light)_18%,white)]">
        <div className="container-shell">
          <SectionHeading
            label="Testimonials"
            title="Trusted by design-led clients and project teams."
          />
          <div className="mt-12 card-surface p-8 md:p-12">
            <p className="text-6xl leading-none text-[var(--color-gold)]">“</p>
            <p className="mt-5 max-w-4xl font-heading text-3xl leading-snug md:text-4xl">
              {testimonials[0].quote}
            </p>
            <div className="mt-6 text-sm uppercase tracking-[0.15em] text-[var(--color-mid)]">
              {testimonials[0].name} · {testimonials[0].city} ·{" "}
              {testimonials[0].projectType}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-black)] text-[var(--color-warm-white)]">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-[color:color-mix(in_srgb,var(--color-warm-white)_72%,transparent)]">Start A Conversation</p>
            <h2 className="font-heading mt-5 text-4xl md:text-6xl">
              Have a project in mind?
            </h2>
            <p className="mt-5 text-lg leading-8 text-[color:color-mix(in_srgb,var(--color-warm-white)_84%,transparent)]">
              Let&apos;s talk about your brief, timeline, material direction,
              and the level of customization your project needs.
            </p>
          </div>
          <EnquiryButton
            label="Start A Conversation"
            className="border border-[var(--color-gold-light)] bg-[var(--color-gold-light)] text-black hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-warm-white)]"
          />
        </div>
      </section>
    </>
  );
}
