import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE = "/icon.png";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <PageHero
        label="Product Preview"
        title="Sample luxury product detail pages."
        description="This preview section demonstrates how a fully populated client content sheet turns into a polished product page on the website."
        image={products[0]?.mainImageLink || FALLBACK_IMAGE}
      />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card-surface overflow-hidden"
            >
              <Image
                src={product.mainImageLink || FALLBACK_IMAGE}
                alt={product.altTextMainImage || product.title}
                width={900}
                height={1100}
                className="h-[420px] w-full object-cover"
              />
              <div className="p-6">
                <p className="eyebrow">
                  {product.collectionName} · {product.category}
                </p>
                <h2 className="font-heading mt-3 text-3xl">{product.title}</h2>
                <p className="body-copy mt-3">{product.shortDescription}</p>
                <span className="mt-6 inline-block text-sm uppercase tracking-[0.15em] text-[var(--color-gold)]">
                  View Product Page
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
