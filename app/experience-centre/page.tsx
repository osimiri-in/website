import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { showroomImages } from "@/lib/site-data";

export default function ExperienceCentrePage() {
  return (
    <>
      <PageHero label="Experience Centre" title="See it. Feel it. Live with it." description="Visit the OSIMIRI experience centre for a tactile preview of materials, silhouettes, detailing, and custom possibilities." image={showroomImages[0]} />
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="card-surface p-6 md:p-8">
            <p className="eyebrow">Visit</p>
            <h2 className="font-heading mt-4 text-4xl">Book a walkthrough.</h2>
            <p className="body-copy mt-4">Mon–Sat, 10am–7pm. Sunday by appointment.</p>
            <p className="body-copy mt-2">
              2nd Floor, Ranka Chamber, 167, Rashtriya Vidyalaya Rd,
              Upparahalli, Mavalli, Bengaluru, Karnataka 560004
            </p>
            <a
              href="https://www.osimiri.in"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm uppercase tracking-[0.14em] text-[var(--color-gold)]"
            >
              www.osimiri.in
            </a>
            <div className="mt-8">
              <EnquiryButton
                label="Book a Visit"
                requirement="I'd like to book a walkthrough at the OSIMIRI experience centre."
                sourcePage="experience-centre"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {showroomImages.map((image, index) => (
              <Image key={`${image}-${index}`} src={image} alt={`Showroom ${index + 1}`} width={600} height={600} className="aspect-square w-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
