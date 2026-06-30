import { PageHero } from "@/components/ui/PageHero";
import { companyValues, timeline } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <>
      <PageHero label="About Us" title="A furniture house built around craft, trust, and customization." description="OSIMIRI exists to serve ambitious interiors with a premium manufacturing mindset, refined detailing, and calm project execution." image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80" />
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Brand Story</p>
            <div className="body-copy mt-6 space-y-5">
              <p>OSIMIRI approaches furniture as architecture at a more intimate scale.</p>
              <p>The studio partners with premium homeowners, architects, and interior designers who expect more than catalogue furniture.</p>
              <p>Manufacturing depth stays close to the design process so the final execution remains intentional.</p>
            </div>
          </div>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.year} className="card-surface p-6">
                <div className="font-heading text-4xl text-[var(--color-gold)]">{item.year}</div>
                <p className="body-copy mt-3">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container-shell mt-20 grid gap-4 md:grid-cols-4">
          {companyValues.map((value) => (
            <div key={value} className="card-surface p-6 text-center">
              <h2 className="font-heading text-2xl">{value}</h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
