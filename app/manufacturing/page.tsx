import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { manufacturingCapabilities } from "@/lib/site-data";

export default function ManufacturingPage() {
  return (
    <>
      <PageHero label="Manufacturing" title="Every piece, made here." description="A tightly controlled production system built for premium furniture quality and custom project delivery." image={manufacturingCapabilities[0].image} />
      <section className="section-space">
        <div className="container-shell space-y-8">
          {manufacturingCapabilities.map((capability) => (
            <div key={capability.title} className="grid gap-6 card-surface p-6 md:p-8 lg:grid-cols-2 lg:items-center">
              <Image src={capability.image} alt={capability.title} width={1000} height={800} className="h-[360px] w-full object-cover" />
              <div>
                <p className="eyebrow">Capability</p>
                <h2 className="font-heading text-4xl">{capability.title}</h2>
                <p className="body-copy mt-5">{capability.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
