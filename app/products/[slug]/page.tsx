import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { Button } from "@/components/ui/Button";
import { ProductGallery } from "@/components/products/ProductGallery";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE = "/icon.png";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const gallery = [
    product.mainImageLink,
    ...(product.galleryImageLinks ?? []),
    ...(product.lifestyleImageLinks ?? []),
    ...(product.detailCloseupLinks ?? []),
  ].filter((v, i, a) => v && a.indexOf(v) === i);

  const specs = [
    ["Material", product.primaryMaterial],
    ["Dimensions", product.dimensionsOverall],
    ["Lead time", product.leadTime],
    ["Warranty", product.warranty],
    ["Price", product.priceNote || "Price on request"],
  ].filter(([, v]) => v);

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-black/10 bg-[var(--color-warm-white)]">
        <div className="container-shell py-6 text-sm uppercase tracking-[0.14em] text-[var(--color-mid)]">
          <Link href="/" className="hover:text-[var(--color-black)]">
            Home
          </Link>
          <span className="px-3">/</span>
          <Link href="/products" className="hover:text-[var(--color-black)]">
            Products
          </Link>
          <span className="px-3">/</span>
          <span className="text-[var(--color-black)]">{product.title}</span>
        </div>
      </section>

      {/* Main */}
      <section className="section-space pb-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery
            images={gallery.length ? gallery : [FALLBACK_IMAGE]}
            title={product.title}
            mainAlt={product.altTextMainImage || product.title}
          />

          <div className="lg:sticky lg:top-28 lg:self-start">
            {(product.collectionName || product.category) ? (
              <p className="eyebrow">
                {[product.collectionName, product.subCategory || product.category]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
            <h1 className="font-heading mt-4 text-5xl leading-tight md:text-6xl">
              {product.title}
            </h1>
            {product.subtitle ? (
              <p className="mt-4 text-xl text-[var(--color-mid)]">
                {product.subtitle}
              </p>
            ) : null}
            {product.shortDescription ? (
              <p className="body-copy mt-6">{product.shortDescription}</p>
            ) : null}

            {product.featuredProduct ? (
              <div className="mt-8">
                <span className="border border-[var(--color-gold)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
                  Featured Piece
                </span>
              </div>
            ) : null}

            {specs.length ? (
              <div className="mt-10 grid gap-4 border-y border-black/10 py-8 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span>{label}</span>
                    <span className="text-right text-[var(--color-black)]">{value}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-4">
              <EnquiryButton
                label="Send Enquiry"
                requirement={`I want to enquire about ${product.title}.`}
                sourcePage={`product-${product.slug}`}
              />
              <Button
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918050434040"}?text=${encodeURIComponent(
                  `Hi, I'm interested in ${product.title}.`,
                )}`}
                variant="outline"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      {(product.fullDescription ||
        product.customizationNote ||
        product.careInstructions ||
        product.installationNote) ? (
        <section className="pb-16">
          <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            {product.fullDescription ? (
              <div>
                <p className="eyebrow">The Piece</p>
                <p className="body-copy mt-5 whitespace-pre-line">
                  {product.fullDescription}
                </p>
              </div>
            ) : (
              <div />
            )}

            <div className="space-y-6">
              {product.customizationNote ? (
                <div className="card-surface p-8">
                  <p className="eyebrow">Made to Order</p>
                  <p className="body-copy mt-4">{product.customizationNote}</p>
                  <div className="mt-6 grid gap-3 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                    {product.dimensionsCustomizable ? (
                      <div>Dimensions can be customised</div>
                    ) : null}
                    {product.assemblyRequired ? (
                      <div>Assembly on delivery</div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {(product.careInstructions || product.installationNote) ? (
                <div className="card-surface p-8">
                  <p className="eyebrow">Care &amp; Delivery</p>
                  {product.careInstructions ? (
                    <p className="body-copy mt-4">{product.careInstructions}</p>
                  ) : null}
                  {product.installationNote ? (
                    <p className="body-copy mt-4">{product.installationNote}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <section className="section-space bg-[var(--color-warm-white)]">
        <div className="container-shell max-w-2xl text-center">
          <p className="eyebrow">Start a Conversation</p>
          <h2 className="font-heading mt-3 text-4xl md:text-5xl">
            Make {product.title} yours.
          </h2>
          <p className="body-copy mt-5">
            Every OSIMIRI piece is built to order and customised to your space,
            materials, and finish. Tell us about your project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <EnquiryButton
              label="Enquire Now"
              requirement={`I want to enquire about ${product.title}.`}
              sourcePage={`product-cta-${product.slug}`}
            />
            <Button href="/products" variant="outline">
              Browse More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
