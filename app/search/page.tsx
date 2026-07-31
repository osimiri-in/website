import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { collections, projects } from "@/lib/site-data";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE = "/icon.png";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q || "").trim();
  const q = query.toLowerCase();

  const products = q ? await getAllProducts() : [];
  const productResults = q
    ? products.filter((p) =>
        [
          p.title,
          p.subtitle,
          p.category,
          p.subCategory,
          p.collectionName,
          p.categoryPath,
          p.shortDescription,
          p.productId,
        ]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q)),
      )
    : [];
  const collectionResults = q
    ? collections.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q),
      )
    : [];
  const projectResults = q
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q),
      )
    : [];

  const total =
    productResults.length + collectionResults.length + projectResults.length;

  return (
    <>
      <PageHero
        label="Search"
        title="Find your piece."
        description="Search the OSIMIRI catalogue, collections, and projects."
        image={FALLBACK_IMAGE}
      />

      <section className="section-space">
        <div className="container-shell">
          {/* Search box */}
          <form action="/search" method="get" className="mx-auto flex max-w-2xl gap-3">
            <input
              type="search"
              name="q"
              defaultValue={query}
              autoFocus
              placeholder="Search sofas, dining tables, beds…"
              className="input-base min-h-[52px] flex-1"
            />
            <button
              type="submit"
              className="min-h-[52px] border border-[var(--color-black)] bg-[var(--color-gold-light)] px-8 text-xs uppercase tracking-[0.15em] text-black transition hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-warm-white)]"
            >
              Search
            </button>
          </form>

          {query ? (
            <p className="mt-6 text-center text-sm uppercase tracking-[0.14em] text-[var(--color-mid)]">
              {total} result{total === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <p className="mt-6 text-center text-sm text-[var(--color-mid)]">
              Type a product, material, or room to begin.
            </p>
          )}

          {/* Products */}
          {productResults.length ? (
            <div className="mt-12">
              <p className="eyebrow">Products</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {productResults.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="card-surface overflow-hidden"
                  >
                    <Image
                      src={p.mainImageLink || FALLBACK_IMAGE}
                      alt={p.altTextMainImage || p.title}
                      width={900}
                      height={700}
                      className="h-[260px] w-full object-cover"
                    />
                    <div className="p-6">
                      <p className="eyebrow">{p.categoryPath || p.category}</p>
                      <h2 className="font-heading mt-2 text-2xl">{p.title}</h2>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* Collections */}
          {collectionResults.length ? (
            <div className="mt-12">
              <p className="eyebrow">Collections</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {collectionResults.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products?category=${c.slug}`}
                    className="card-surface p-6"
                  >
                    <p className="eyebrow">{c.category}</p>
                    <h2 className="font-heading mt-2 text-2xl">{c.name}</h2>
                    <p className="body-copy mt-3">{c.descriptor}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* Projects */}
          {projectResults.length ? (
            <div className="mt-12">
              <p className="eyebrow">Projects</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {projectResults.map((p) => (
                  <div key={p.slug} className="card-surface p-6">
                    <h2 className="font-heading text-2xl">{p.title}</h2>
                    <p className="body-copy mt-3">
                      {[p.location, p.type].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {query && total === 0 ? (
            <p className="body-copy mt-12 text-center">
              No matches for &ldquo;{query}&rdquo;. Try a different term, or{" "}
              <Link href="/products" className="text-[var(--color-gold)] underline">
                browse all products
              </Link>
              .
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
