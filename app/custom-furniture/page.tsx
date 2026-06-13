import { PageHero } from "@/components/ui/PageHero";
import { customProcess } from "@/lib/site-data";

export default function CustomFurniturePage() {
  return (
    <>
      <PageHero label="Custom Furniture" title="Built for your vision, not a catalogue." description="From first brief to installation, OSIMIRI develops furniture around your space, dimensions, material story, and performance expectations." image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80" />
      <section className="section-space">
        <div className="container-shell grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {customProcess.map((step, index) => (
            <div key={step} className="card-surface p-6">
              <div className="font-heading text-4xl text-black/20">0{index + 1}</div>
              <h2 className="mt-3 font-heading text-2xl">{step}</h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
