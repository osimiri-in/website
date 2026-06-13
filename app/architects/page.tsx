import { PageHero } from "@/components/ui/PageHero";
import { architectBenefits } from "@/lib/site-data";

export default function ArchitectsPage() {
  return (
    <>
      <PageHero label="Architects & Designers" title="Your creative vision, our manufacturing precision." description="OSIMIRI collaborates with design teams to translate intent into durable, premium, buildable furniture outcomes." image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80" />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {architectBenefits.map((benefit) => (
            <div key={benefit} className="card-surface p-6">
              <h2 className="font-heading text-3xl">{benefit}</h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
