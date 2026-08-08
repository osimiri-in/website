import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "About Us",
  description:
    "Osimiri crafts timeless, bespoke luxury furniture with fully in-house manufacturing — founded in 2024 and built around craftsmanship, customization, and quality.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Crafting timeless spaces, one piece at a time."
        description="At Osimiri, furniture is more than an object — it is an expression of personality, a reflection of lifestyle, and the foundation of every thoughtfully designed space."
        image="/site/experience-centre-poster.jpg"
      />

      {/* Intro + founders */}
      <section className="section-space">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow">About Osimiri</p>
          <div className="body-copy mt-6 space-y-5">
            <p>
              Every piece we create is designed to combine timeless aesthetics,
              exceptional craftsmanship, and lasting functionality — transforming
              everyday environments into spaces that inspire.
            </p>
            <p>
              Founded in 2024 by{" "}
              <span className="font-medium text-[var(--color-black)]">
                Raju Kothari, Sumit Jain, and Himanshu Jain
              </span>
              , Osimiri was born from a vision to redefine luxury furniture through
              uncompromising quality, thoughtful customization, and complete
              manufacturing excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-space bg-[var(--color-warm-white)]">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow">Our Story</p>
          <div className="body-copy mt-6 space-y-5">
            <p>
              Osimiri was founded with a simple belief: furniture should do more
              than serve a purpose — it should tell a story.
            </p>
            <p>
              We recognized a growing need for furniture that could be tailored to
              individual lifestyles while maintaining the highest standards of
              quality and design. Our goal was to create pieces that not only
              enhance interiors but also become a meaningful part of the lives
              lived around them.
            </p>
            <p>
              Built on years of manufacturing expertise and supported by our
              state-of-the-art production facility in Jodhpur, Rajasthan, Osimiri
              brings together traditional craftsmanship and modern manufacturing
              techniques. This unique combination enables us to deliver luxury
              furniture that is meticulously crafted, highly customizable, and
              built to stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-space">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow">What Sets Us Apart</p>
          <div className="body-copy mt-6 space-y-5">
            <p>
              Our greatest strength is our fully integrated in-house manufacturing.
            </p>
            <p>
              Unlike many furniture brands, every stage of production is managed
              under one roof — from woodworking, metal fabrication, marble
              processing, and upholstery to final finishing and quality
              inspection. This complete control allows us to maintain exceptional
              quality standards, ensure design accuracy, and offer extensive
              customization with shorter production timelines.
            </p>
            <p>
              By overseeing every detail internally, we create furniture that
              reflects our commitment to craftsmanship, consistency, and
              excellence.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Woodworking",
              "Metal Fabrication",
              "Marble Processing",
              "Upholstery",
              "Finishing",
              "Quality Inspection",
            ].map((stage) => (
              <span
                key={stage}
                className="rounded-full border border-[var(--color-gold)] px-4 py-2 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]"
              >
                {stage}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-space bg-[var(--color-warm-white)]">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          <div className="card-surface p-8 md:p-10">
            <p className="eyebrow">Our Mission</p>
            <p className="body-copy mt-5">
              To craft timeless, high-quality furniture that seamlessly blends
              design, functionality, and craftsmanship while offering personalized
              solutions that transform every space into a reflection of its
              owner&rsquo;s lifestyle and vision.
            </p>
          </div>
          <div className="card-surface p-8 md:p-10">
            <p className="eyebrow">Our Vision</p>
            <p className="body-copy mt-5">
              To become a globally trusted luxury furniture brand, recognized for
              exceptional craftsmanship, innovative customization, and creating
              enduring spaces that inspire generations.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration + closing */}
      <section className="section-space">
        <div className="container-shell max-w-3xl">
          <div className="body-copy space-y-5">
            <p>
              Osimiri proudly collaborates with architects, interior designers,
              developers, and homeowners across India, helping bring design
              concepts to life with precision and reliability. With{" "}
              <span className="font-medium text-[var(--color-black)]">
                50+ successfully completed projects
              </span>
              , we continue to build spaces where exceptional design meets enduring
              craftsmanship.
            </p>
            <p>
              Every Osimiri creation is more than furniture — it is an investment
              in quality, comfort, and timeless design. From concept to
              completion, we are committed to creating pieces that become an
              integral part of the spaces where people live, work, and create
              memories.
            </p>
          </div>
          <div className="mt-12 border-t border-[color:color-mix(in_srgb,var(--color-mid)_30%,transparent)] pt-10">
            <p className="font-heading text-3xl md:text-4xl">
              Designed for Today. Crafted for Generations.
            </p>
            <p className="mt-4 text-lg uppercase tracking-[0.16em] text-[var(--color-gold)]">
              Osimiri — Where Luxury Meets Craftsmanship.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
