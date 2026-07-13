import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getAllProducts } from "@/lib/products";
import { collections } from "@/lib/site-data";
import type { Product } from "@/lib/product-schema";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE = "/icon.png";

function parentCategory(p: Product): string {
  return (p.categoryPath || p.category || "").split(" / ")[0].trim() || "Catalogue";
}

/** Lowercase, singularised word tokens used for loose category matching. */
function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2)
    .map((w) => (w.endsWith("s") ? w.slice(0, -1) : w));
}

/** Does a product belong to the collection identified by this slug? */
function matchesCategory(p: Product, categorySlug: string): boolean {
  const want = new Set(tokens(categorySlug.replace(/-/g, " ")));
  if (want.size === 0) return true;
  const have = new Set(
    tokens(
      [p.categoryPath, p.category, p.subCategory, p.collectionName, p.title]
        .filter(Boolean)
        .join(" "),
    ),
  );
  for (const w of want) if (have.has(w)) return true;
  return false;
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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await getAllProducts();

  // ── Filtered view: a single collection/category was selected ──────────
  if (category) {
    const collection = collections.find((c) => c.slug === category);
    const title = collection?.name ?? category.replace(/-/g, " ");
    const items = products.filter((p) => matchesCategory(p, category));

    return (
      <>
        <PageHero
          label="Collection"
          title={title}
          description={
            collection?.descriptor ??
            "Explore this collection — every piece is made to order and fully customisable."
          }
          image={items[0]?.mainImageLink || products[0]?.mainImageLink || FALLBACK_IMAGE}
        />
        <section className="section-space">
          <div className="container-shell">
            <Link
              href="/products"
              className="text-sm uppercase tracking-[0.14em] text-[var(--color-mid)] hover:text-[var(--color-black)]"
            >
              ← All products
            </Link>
            {items.length === 0 ? (
              <p className="body-copy mt-10 text-center">
                No products in this collection yet. Please{" "}
                <Link href="/contact" className="text-[var(--color-gold)] underline">
                  enquire
                </Link>{" "}
                or{" "}
                <Link href="/products" className="text-[var(--color-gold)] underline">
                  browse all products
                </Link>
                .
              </p>
            ) : (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </>
    );
  }

  // ── Default view: grouped by top-level category ───────────────────────
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
        label="Our Products"
        title="Bespoke furniture, organised by the room it's made for."
        description="Browse the OSIMIRI catalogue across living, dining, bedroom, workspace, and more. Every piece is made to order and customisable to your space."
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
