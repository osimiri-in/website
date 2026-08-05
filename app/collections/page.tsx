import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { collections } from "@/lib/site-data";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/lib/product-schema";

export const dynamic = "force-dynamic";

function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2)
    .map((w) => (w.endsWith("s") ? w.slice(0, -1) : w));
}

/** First product image matching this collection, if any. */
function imageForCollection(slug: string, products: Product[]): string | null {
  const want = new Set(tokens(slug.replace(/-/g, " ")));
  const hit = products.find((p) => {
    const have = new Set(
      tokens(
        [p.categoryPath, p.category, p.subCategory, p.collectionName, p.title]
          .filter(Boolean)
          .join(" "),
      ),
    );
    for (const w of want) if (have.has(w)) return true;
    return false;
  });
  return hit?.mainImageLink || null;
}

/**
 * Prefer a curated local hero photo (real OSIMIRI product shot) when one is
 * assigned; otherwise fall back to a matching catalogue product image.
 */
function resolveImage(
  collection: { slug: string; heroImage: string },
  products: Product[],
): string {
  if (collection.heroImage.startsWith("/")) return collection.heroImage;
  return imageForCollection(collection.slug, products) || collection.heroImage;
}

export default async function CollectionsPage() {
  const products = await getAllProducts();

  return (
    <>
      <PageHero
        label="Our Collections"
        title="Furniture systems curated for every space."
        description="Explore OSIMIRI's collection categories and start with a piece, then customize scale, finish, and detail to suit the project."
        image={resolveImage(collections[0], products)}
      />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/products?category=${collection.slug}`}
              className="card-surface group overflow-hidden"
            >
              <div className="overflow-hidden">
                <Image
                  src={resolveImage(collection, products)}
                  alt={`${collection.name} — ${collection.descriptor}`}
                  width={900}
                  height={1100}
                  className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <p className="eyebrow">{collection.category}</p>
                <h2 className="font-heading mt-3 text-3xl">{collection.name}</h2>
                <p className="body-copy mt-3">{collection.descriptor}</p>
                <span className="mt-6 inline-block text-sm uppercase tracking-[0.15em] text-[var(--color-gold)]">
                  View Products
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
