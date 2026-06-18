import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { demoProducts } from "@/lib/product-demo";

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Product Preview"
        title="Sample luxury product detail pages."
        description="This preview section demonstrates how a fully populated client content sheet turns into a polished product page on the website."
        image={demoProducts[0].mainImageLink}
      />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {demoProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card-surface overflow-hidden"
            >
              <Image
                src={product.mainImageLink}
                alt={product.altTextMainImage}
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
