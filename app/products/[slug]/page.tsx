import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedMedia = [
    ...(product.lifestyleImageLinks ?? []),
    ...(product.detailCloseupLinks ?? []),
  ];

  return (
    <>
      <section className="border-b border-black/10 bg-[var(--color-warm-white)]">
        <div className="container-shell py-6 text-sm uppercase tracking-[0.14em] text-[var(--color-mid)]">
          <Link href="/" className="hover:text-[var(--color-black)]">
            Home
          </Link>
          <span className="px-3">/</span>
          <Link href="/collections" className="hover:text-[var(--color-black)]">
            Collections
          </Link>
          <span className="px-3">/</span>
          <span>{product.collectionName}</span>
          <span className="px-3">/</span>
          <span className="text-[var(--color-black)]">{product.title}</span>
        </div>
      </section>

      <section className="section-space pb-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="overflow-hidden border border-black/10 bg-[var(--color-warm-white)]">
              <Image
                src={product.mainImageLink}
                alt={product.altTextMainImage}
                width={1400}
                height={1200}
                className="h-[560px] w-full object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {product.galleryImageLinks.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden border border-black/10 bg-[var(--color-warm-white)]"
                >
                  <Image
                    src={image}
                    alt={`${product.title} gallery ${index + 1}`}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">
              {product.collectionName} · {product.category}
            </p>
            <h1 className="font-heading mt-4 text-5xl leading-tight md:text-6xl">
              {product.title}
            </h1>
            {product.subtitle ? (
              <p className="mt-4 text-xl text-[var(--color-mid)]">
                {product.subtitle}
              </p>
            ) : null}
            <p className="body-copy mt-6">{product.shortDescription}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-mid)]">
                {product.subCategory}
              </span>
              {product.featuredProduct ? (
                <span className="border border-[var(--color-gold)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
                  Featured Product
                </span>
              ) : null}
              <span className="border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--color-mid)]">
                {product.status}
              </span>
            </div>

            <div className="mt-10 grid gap-4 border-y border-black/10 py-8 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
              <div className="flex items-center justify-between gap-4">
                <span>Product ID</span>
                <span className="text-right text-[var(--color-black)]">
                  {product.productId}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Primary Material</span>
                <span className="text-right text-[var(--color-black)]">
                  {product.primaryMaterial}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Dimensions</span>
                <span className="text-right text-[var(--color-black)]">
                  {product.dimensionsOverall}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Lead Time</span>
                <span className="text-right text-[var(--color-black)]">
                  {product.leadTime}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Price</span>
                <span className="text-right text-[var(--color-black)]">
                  {product.priceVisible ? "Visible" : product.priceNote}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <EnquiryButton
                label="Send Enquiry"
                requirement={`I want to enquire about ${product.title}.`}
                sourcePage={`product-${product.slug}`}
              />
              <Button
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX"}?text=${encodeURIComponent(
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

      <section className="pb-16">
        <div className="container-shell grid gap-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionHeading
                label="Product Story"
                title="How this product would look on the final website."
                description={product.fullDescription}
              />
            </div>
            <div className="card-surface p-8">
              <p className="eyebrow">Customization</p>
              <p className="body-copy mt-4">{product.customizationNote}</p>
              <div className="mt-6 grid gap-4 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                {product.dimensionsCustomizable ? (
                  <div>Dimensions can be customized</div>
                ) : null}
                {product.assemblyRequired !== undefined ? (
                  <div>
                    Assembly required:{" "}
                    <span className="text-[var(--color-black)]">
                      {product.assemblyRequired ? "Yes" : "No"}
                    </span>
                  </div>
                ) : null}
                {product.warranty ? (
                  <div>
                    Warranty:{" "}
                    <span className="text-[var(--color-black)]">
                      {product.warranty}
                    </span>
                  </div>
                ) : null}
                {product.availabilityRegion ? (
                  <div>
                    Region:{" "}
                    <span className="text-[var(--color-black)]">
                      {product.availabilityRegion}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="card-surface p-8">
              <p className="eyebrow">Technical Details</p>
              <div className="mt-6 grid gap-5 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                <div className="flex items-center justify-between gap-4">
                  <span>Overall</span>
                  <span className="text-right text-[var(--color-black)]">
                    {product.dimensionsOverall}
                  </span>
                </div>
              </div>
            </div>

            <div className="card-surface p-8">
              <p className="eyebrow">Aftercare & Delivery</p>
              {product.careInstructions ? (
                <div className="mt-5">
                  <h3 className="font-heading text-2xl">Care Instructions</h3>
                  <p className="body-copy mt-3">{product.careInstructions}</p>
                </div>
              ) : null}
              {product.installationNote ? (
                <div className="mt-6">
                  <h3 className="font-heading text-2xl">Installation Note</h3>
                  <p className="body-copy mt-3">{product.installationNote}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <SectionHeading
              label="Additional Media"
              title="Lifestyle, detail, swatch, and campaign imagery."
              description="This section shows how extra client media can expand the product story and improve the premium feel of the page."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {relatedMedia.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="overflow-hidden border border-black/10 bg-[var(--color-warm-white)]"
                >
                  <Image
                    src={image}
                    alt={`${product.title} supporting media ${index + 1}`}
                    width={800}
                    height={800}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
            {product.swatchImageLinks?.length ? (
              <div className="mt-10">
                <p className="eyebrow">Swatch References</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {product.swatchImageLinks.map((image, index) => (
                    <div
                      key={`${image}-swatch-${index}`}
                      className="overflow-hidden border border-black/10 bg-[var(--color-warm-white)]"
                    >
                      <Image
                        src={image}
                        alt={`${product.title} swatch ${index + 1}`}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="card-surface p-8">
              <p className="eyebrow">Video & Assets</p>
              <div className="mt-5 space-y-4 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                {product.videoLink ? (
                  <div className="flex items-center justify-between gap-4">
                    <span>{product.videoType || "Video"}</span>
                    <a
                      href={product.videoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--color-gold)]"
                    >
                      Open Link
                    </a>
                  </div>
                ) : null}
                {product.cadFileLink ? (
                  <div className="flex items-center justify-between gap-4">
                    <span>CAD / Technical File</span>
                    <a
                      href={product.cadFileLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--color-gold)]"
                    >
                      Open File
                    </a>
                  </div>
                ) : null}
                {product.arOr3dModelLink ? (
                  <div className="flex items-center justify-between gap-4">
                    <span>3D / AR Model</span>
                    <a
                      href={product.arOr3dModelLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--color-gold)]"
                    >
                      Open Asset
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="card-surface p-8">
              <p className="eyebrow">Search & Discovery Tags</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  ...(product.searchKeywords ?? []),
                  ...(product.roomTags ?? []),
                  ...(product.styleTags ?? []),
                  ...(product.colorTags ?? []),
                  ...(product.materialTags ?? []),
                ].map((item) => (
                  <span
                    key={item}
                    className="border border-black/10 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--color-mid)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="card-surface p-8">
              <p className="eyebrow">SEO Preview</p>
              <div className="mt-5 border border-black/10 bg-white p-6">
                <p className="text-xl text-[#1a0dab]">{product.seoTitle}</p>
                <p className="mt-2 text-sm text-[#006621]">
                  https://osimiri.com/products/{product.slug}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#4d5156]">
                  {product.seoDescription}
                </p>
              </div>
              {product.focusKeyword ? (
                <p className="mt-4 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                  Focus keyword:{" "}
                  <span className="text-[var(--color-black)]">
                    {product.focusKeyword}
                  </span>
                </p>
              ) : null}
              {product.seoKeywords?.length ? (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-mid)]">
                    SEO Keywords
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.seoKeywords.map((item) => (
                      <span
                        key={item}
                        className="border border-black/10 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--color-mid)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="card-surface border-dashed p-8">
              <p className="eyebrow">Internal CMS Mapping</p>
              <p className="body-copy mt-4">
                This block is included only to demonstrate how the remaining
                client-provided CSV fields can be stored and reviewed. It would
                usually live in the CMS or admin panel rather than on the public
                website.
              </p>
              <div className="mt-6 grid gap-4 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
                {product.clientApprovalStatus ? (
                  <div className="flex items-center justify-between gap-4">
                    <span>Approval</span>
                    <span className="text-right text-[var(--color-black)]">
                      {product.clientApprovalStatus}
                    </span>
                  </div>
                ) : null}
                {product.contentSource ? (
                  <div className="flex items-center justify-between gap-4">
                    <span>Content Source</span>
                    <span className="text-right text-[var(--color-black)]">
                      {product.contentSource}
                    </span>
                  </div>
                ) : null}
                {product.lastUpdated ? (
                  <div className="flex items-center justify-between gap-4">
                    <span>Last Updated</span>
                    <span className="text-right text-[var(--color-black)]">
                      {product.lastUpdated}
                    </span>
                  </div>
                ) : null}
                {product.notesForOsimiriTeam ? (
                  <div className="pt-2 normal-case tracking-normal">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-mid)]">
                      Team Note
                    </p>
                    <p className="body-copy mt-2">
                      {product.notesForOsimiriTeam}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
