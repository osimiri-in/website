import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/lib/product-schema";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE = "/icon.png";

function parentCategory(p: Product): string {
  return (p.categoryPath || p.category || "").split(" / ")[0].trim() || "Catalogue";
}

function ProductCard({ product }: { product: Product }) {
  const sub = (product.categoryPath || "").split(" / ")[1];
  return (
    <Link href={`/products/${product.slug}`} className="card-surface overflow-hidden">
      <Image
        src={product.mainImageLink || FALLBACK_IMAGE}
        alt={product.altTextMainImage || product.title}
        width={900}
        height={1100}
        className="h-[420px] w-full object-cover"
      />
      <div className="p-6">
        <p className="eyebrow">{sub || parentCategory(product)}</p>
        <h2 className="font-heading mt-3 text-3xl">{product.title}</h2>
        <p className="body-copy mt-3">{product.shortDescription}</p>
        <span className="mt-5 block text-sm text-[var(--color-mid)]">
          {product.priceNote || "Price on request"}
        </span>
        <span className="mt-4 inline-block text-sm uppercase tracking-[0.15em] text-[var(--color-gold)]">
          View Product Page
        </span>
      </div>
    </Link>
  );
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  // Group by top-level category, preserving first-seen order.
  const groups = new Map<string, Product[]>();
  for (const p of products) {
    const key = parentCategory(p);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }
  const sections = [...groups.entries()];
  const grouped = sections.length > 1;

  return (
    <>
      <PageHero
        label="Our Collections"
        title="Bespoke furniture, organised by the room it's made for."
        description="Browse the OSIMIRI catalogue across living, dining, bedroom, workspace, and more — each piece made to order and customisable to your space."
        image={products[0]?.mainImageLink || FALLBACK_IMAGE}
      />

      {grouped ? (
        <nav className="border-b border-black/10 bg-[var(--color-warm-white)]">
          <div className="container-shell flex flex-wrap gap-x-6 gap-y-2 py-5 text-sm uppercase tracking-[0.14em] text-[var(--color-mid)]">
            {sections.map(([name]) => (
              <a key={name} href={`#${slugify(name)}`} className="hover:text-[var(--color-black)]">
                {name}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      <section className="section-space">
        <div className="container-shell space-y-16">
          {grouped ? (
            sections.map(([name, items]) => (
              <div key={name} id={slugify(name)} className="scroll-mt-28">
                <h2 className="font-heading text-3xl md:text-4xl">{name}</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
