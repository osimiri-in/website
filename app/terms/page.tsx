import { PageHero } from "@/components/ui/PageHero";

export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms of Use"
        description="The terms that apply when you use the OSIMIRI website."
        image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="section-space">
        <div className="container-shell body-copy max-w-3xl space-y-8">
          <div>
            <h2 className="font-heading text-3xl">About this site</h2>
            <p className="mt-3">
              This website presents OSIMIRI&apos;s furniture, collections, and
              projects. It is a showcase and enquiry platform — it does not sell
              products online or process payments. Prices are shared on request.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">Product information</h2>
            <p className="mt-3">
              As every piece is made to order, images, materials, finishes, and
              dimensions shown are indicative. Final specifications are confirmed
              in writing during your project consultation.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">Intellectual property</h2>
            <p className="mt-3">
              All content on this site — designs, images, text, and the OSIMIRI
              name and marks — belongs to OSIMIRI and may not be reproduced
              without permission.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">Enquiries</h2>
            <p className="mt-3">
              Submitting an enquiry does not create a binding contract. A project
              begins only once scope, pricing, and timelines are mutually agreed
              in writing.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">Contact</h2>
            <p className="mt-3">
              Questions about these terms? Email{" "}
              <a href="mailto:info@osimiri.in" className="text-[var(--color-gold)] underline">
                info@osimiri.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
