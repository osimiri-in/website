import { PageHero } from "@/components/ui/PageHero";
import { EnquiryCTA } from "@/components/ui/EnquiryCTA";
import { architectBenefits, architectPartners } from "@/lib/site-data";

export default function ArchitectsPage() {
  return (
    <>
      <PageHero label="Architects & Designers" title="Your creative vision, our manufacturing precision." description="OSIMIRI collaborates with design teams to translate intent into durable, premium, buildable furniture outcomes." image="/site/architect-hero.jpg" />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {architectBenefits.map((benefit) => (
            <div key={benefit} className="card-surface p-6">
              <h2 className="font-heading text-3xl">{benefit}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[var(--color-warm-white)]">
        <div className="container-shell">
          <p className="eyebrow">Architects &amp; Interiors We&rsquo;ve Worked With</p>
          <h2 className="font-heading mt-5 max-w-3xl text-4xl md:text-5xl">
            Trusted by design practices across India.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {architectPartners.map((partner) => (
              <div key={partner.name} className="card-surface p-6">
                <h3 className="font-heading text-2xl">{partner.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                  Principal
                </p>
                <p className="body-copy mt-1">{partner.principal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EnquiryCTA
        title="Working on a project?"
        description="Share your drawings and requirements. We'll advise on materials, feasibility, and timelines, and support you from approvals to installation."
        requirement="I'm an architect / designer with a project to discuss."
        sourcePage="architects"
      />
    </>
  );
}
