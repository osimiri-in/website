import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryCTA } from "@/components/ui/EnquiryCTA";
import { manufacturingCapabilities, manufacturingMachinery } from "@/lib/site-data";

export default function ManufacturingPage() {
  return (
    <>
      <PageHero label="Manufacturing" title="Every piece, made here." description="A tightly controlled production system built for premium furniture quality and custom project delivery." video="/site/factory.mp4" poster="/site/factory-poster.jpg" />
      <section className="section-space">
        <div className="container-shell space-y-8">
          {manufacturingCapabilities.map((capability) => (
            <div key={capability.title} className="grid gap-6 card-surface p-6 md:p-8 lg:grid-cols-2 lg:items-center">
              <Image src={capability.image} alt={capability.alt} width={1000} height={800} className="h-[360px] w-full object-cover" />
              <div>
                <p className="eyebrow">Capability</p>
                <h2 className="font-heading text-4xl">{capability.title}</h2>
                <p className="body-copy mt-5">{capability.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[var(--color-warm-white)]">
        <div className="container-shell">
          <p className="eyebrow">In-House Machinery</p>
          <h2 className="font-heading mt-5 max-w-3xl text-4xl md:text-5xl">
            Our production floor, end to end.
          </h2>
          <p className="body-copy mt-5 max-w-2xl">
            Woodworking, metal fabrication, marble finishing, and upholstery —
            every stage runs on our own machinery under one roof, giving us full
            control over quality, accuracy, and timelines.
          </p>

          <div className="mt-14 space-y-16">
            {manufacturingMachinery.map((group) => (
              <div key={group.department}>
                <h3 className="font-heading border-b border-[color:color-mix(in_srgb,var(--color-mid)_28%,transparent)] pb-4 text-2xl md:text-3xl">
                  {group.department}
                </h3>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((machine, index) => (
                    <figure
                      key={`${machine.name}-${index}`}
                      className="card-surface overflow-hidden"
                    >
                      <Image
                        src={machine.image}
                        alt={`${machine.name} — OSIMIRI in-house ${group.department.toLowerCase()}`}
                        width={640}
                        height={420}
                        className="h-52 w-full object-cover"
                      />
                      <figcaption className="p-4 text-sm uppercase tracking-[0.1em] text-[var(--color-mid)]">
                        {machine.name}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryCTA
        title="Planning a custom production run?"
        description="From a single bespoke piece to a full project package, our in-house facility delivers with control over quality and timelines."
        requirement="I'd like to discuss a manufacturing / production requirement."
        sourcePage="manufacturing"
      />
    </>
  );
}
