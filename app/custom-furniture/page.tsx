import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { customProcess } from "@/lib/site-data";

// Reference → Final Product showcase slides rendered from the custom furniture deck.
const showcaseSlides = Array.from({ length: 54 }, (_, i) =>
  `/custom-furniture/showcase-${String(i + 7).padStart(2, "0")}.jpg`,
);

export default function CustomFurniturePage() {
  return (
    <>
      <PageHero
        label="Custom Furniture"
        title="Built for your vision, not a catalogue."
        description="From first brief to installation, OSIMIRI develops furniture around your space, dimensions, material story, and performance expectations."
        image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
      />

      {/* Customization philosophy */}
      <section className="section-space">
        <div className="container-shell max-w-3xl text-center">
          <p className="eyebrow">Customization Philosophy</p>
          <h2 className="font-heading mt-3 text-4xl md:text-5xl">
            Transforming visions into luxurious realities.
          </h2>
          <p className="body-copy mt-5">
            At the heart of our brand lies a commitment to client-centric
            customization. Our streamlined process begins with a personal
            consultation, where we collaborate closely to understand your unique
            preferences — continuing through design, material selection,
            craftsmanship, and delivery, so every piece is a true reflection of
            individual style and luxury.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="section-space pt-0">
        <div className="container-shell">
          <p className="eyebrow text-center">Customization Workflow</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {customProcess.map((step, index) => (
              <div key={step} className="card-surface p-6">
                <div className="font-heading text-4xl text-black/20">
                  0{index + 1}
                </div>
                <h3 className="mt-3 font-heading text-2xl">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reference → Final Product showcase */}
      <section className="section-space bg-[var(--color-warm-white)]">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Custom Furniture Showcase</p>
            <h2 className="font-heading mt-3 text-4xl md:text-5xl">
              From reference to final product.
            </h2>
            <p className="body-copy mt-5">
              This collection highlights bespoke pieces created in response to
              client inspirations — showcasing the seamless transition from an
              initial idea to a beautifully crafted final product.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {showcaseSlides.map((src, index) => (
              <div key={src} className="card-surface overflow-hidden">
                <Image
                  src={src}
                  alt={`Custom furniture reference and final product ${index + 1}`}
                  width={1400}
                  height={788}
                  className="h-auto w-full"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality assurance */}
      <section className="section-space">
        <div className="container-shell max-w-3xl text-center">
          <p className="eyebrow">Quality Assurance</p>
          <h2 className="font-heading mt-3 text-4xl md:text-5xl">
            Handcrafted with unwavering attention to detail.
          </h2>
          <p className="body-copy mt-5">
            Every piece is built in-house and inspected at each stage — from
            material selection and sampling to finishing — so the final product
            matches the design intent and the standard our clients expect.
          </p>
        </div>
      </section>
    </>
  );
}
