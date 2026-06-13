import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { collections } from "@/lib/site-data";

export default function CollectionsPage() {
  return (
    <>
      <PageHero label="Our Collections" title="Furniture systems curated for every space." description="Explore OSIMIRI's collection categories and start with a piece, then customize scale, finish, and detail to suit the project." image={collections[0].heroImage} />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <div key={collection.slug} className="card-surface overflow-hidden">
              <Image src={collection.heroImage} alt={collection.name} width={900} height={1100} className="h-[420px] w-full object-cover" />
              <div className="p-6">
                <p className="eyebrow">{collection.category}</p>
                <h2 className="font-heading mt-3 text-3xl">{collection.name}</h2>
                <p className="body-copy mt-3">{collection.descriptor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
