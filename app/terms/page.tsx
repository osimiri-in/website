import { PageHero } from "@/components/ui/PageHero";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms & Conditions"
        description="The terms that govern your access to and use of the OSIMIRI website, products, and services."
        image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="section-space">
        <div className="container-shell body-copy max-w-3xl space-y-10">
          <p className="text-sm uppercase tracking-[0.14em] text-[var(--color-mid)]">
            Effective Date: July 31, 2026
          </p>

          <p>
            Welcome to Osimiri (&ldquo;Company&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;, or &ldquo;us&rdquo;). These Terms &amp; Conditions
            govern your access to and use of our website, products, and services.
            By accessing our website, requesting a quotation, placing an order, or
            purchasing any product from Osimiri, you agree to be bound by these
            Terms &amp; Conditions.
          </p>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">1. General</h2>
            <p>
              These Terms &amp; Conditions apply to all inquiries, quotations,
              orders, purchases, and services provided by Osimiri unless
              otherwise agreed in writing.
            </p>
            <p>
              We reserve the right to revise these Terms &amp; Conditions at any
              time. The latest version published on our website shall apply to
              future transactions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">2. Product Information</h2>
            <p>
              We make every effort to ensure that product descriptions,
              dimensions, specifications, images, finishes, and materials
              displayed on our website are accurate. However:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Product images are for illustration purposes only.</li>
              <li>Colours and finishes may appear different depending on your screen settings.</li>
              <li>Natural materials including wood, stone, leather, brass, copper, and fabrics may exhibit variations in grain, texture, veining, colour, or patina.</li>
              <li>Handcrafted furniture may have minor variations that are a natural result of the manufacturing process.</li>
            </ul>
            <p>These variations are not considered manufacturing defects.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">3. Product Customization</h2>
            <p>Osimiri specializes in custom-made furniture. For customized products:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Final production begins only after written approval of drawings, dimensions, materials, finishes, and fabrics.</li>
              <li>Any modifications requested after approval may result in additional charges and revised delivery timelines.</li>
              <li>Slight dimensional or aesthetic variations may occur due to handcrafted production techniques.</li>
              <li>Custom-made products cannot be cancelled or returned once production has commenced.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">4. Quotations and Pricing</h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>All quotations are valid only for the period mentioned in the quotation.</li>
              <li>Prices are quoted in Indian Rupees (INR) unless otherwise specified.</li>
              <li>Transportation, installation, taxes, duties, or special packaging charges may be additional unless specifically included in the quotation.</li>
              <li>We reserve the right to revise pricing before order confirmation due to changes in raw material or manufacturing costs.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">5. Payment Terms</h2>
            <p>
              Production will commence only after receipt of the agreed advance
              payment. Unless otherwise agreed in writing:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Advance payment is required before manufacturing begins.</li>
              <li>The remaining balance must be cleared before dispatch of goods.</li>
              <li>Delayed payments may delay manufacturing or delivery schedules.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">6. Manufacturing &amp; Delivery</h2>
            <p>
              Estimated production and delivery schedules are provided in good
              faith. Delivery dates are estimates and may change due to factors
              beyond our reasonable control, including:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Material shortages</li>
              <li>Supplier delays</li>
              <li>Transportation disruptions</li>
              <li>Labour shortages</li>
              <li>Government restrictions</li>
              <li>Natural disasters</li>
              <li>Other force majeure events</li>
            </ul>
            <p>
              We will make reasonable efforts to keep customers informed regarding
              significant delays.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">7. Shipping &amp; Installation</h2>
            <p>Unless otherwise agreed:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Shipping charges are additional.</li>
              <li>Installation services may be chargeable depending on project location.</li>
              <li>Customers must ensure that delivery access, lifts, staircases, and site conditions are suitable before delivery.</li>
              <li>Osimiri is not responsible for delays caused by site readiness, building restrictions, or local regulations.</li>
            </ul>
            <p>Risk in the products passes to the customer upon successful delivery.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">8. Inspection of Goods</h2>
            <p>
              Customers are requested to inspect all products immediately upon
              delivery. Any visible damage, shortages, or manufacturing concerns
              should be reported within 48 hours of delivery, along with
              photographs and supporting details.
            </p>
            <p>
              Claims submitted after installation or prolonged use may not be
              accepted where permitted by law.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">9. Returns, Cancellation &amp; Refunds</h2>
            <p>
              Because most Osimiri products are manufactured specifically for each
              customer:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Customized or made-to-order products are generally non-returnable and non-refundable once production has begun.</li>
              <li>Orders cannot be cancelled after manufacturing has commenced.</li>
              <li>If a product is delivered with a verified manufacturing defect, Osimiri may, at its discretion, repair, replace, or provide an appropriate remedy.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">10. Warranty</h2>
            <p>Our warranty covers manufacturing defects only. The warranty does not cover:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Normal wear and tear</li>
              <li>Misuse or improper handling</li>
              <li>Damage during relocation after installation</li>
              <li>Exposure to excessive moisture, sunlight, chemicals, or improper cleaning methods</li>
              <li>Natural variations in wood, stone, leather, metal, fabrics, or other natural materials</li>
              <li>Changes caused by humidity, temperature, oxidation, or ageing</li>
            </ul>
            <p>
              Unauthorized repairs or modifications by third parties may void the
              warranty.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">11. Intellectual Property</h2>
            <p>
              All website content, furniture designs, drawings, product images,
              catalogues, branding, logos, and related materials are the
              intellectual property of Osimiri unless otherwise stated.
            </p>
            <p>
              No content may be copied, reproduced, distributed, modified, or used
              without prior written permission. We may photograph completed
              projects for our portfolio and marketing purposes unless otherwise
              agreed with the customer in writing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">12. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Osimiri shall not
              be liable for any indirect, incidental, special, or consequential
              damages arising from the use of our website, products, or services.
            </p>
            <p>
              Our total liability shall not exceed the amount paid by the customer
              for the specific order giving rise to the claim.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">13. Privacy</h2>
            <p>
              Your use of our website is also governed by our{" "}
              <a href="/privacy" className="text-[var(--color-gold)] underline">
                Privacy Policy
              </a>
              , which explains how we collect, use, and protect your personal
              information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">14. Governing Law</h2>
            <p>
              These Terms &amp; Conditions shall be governed by and interpreted in
              accordance with the laws of India. Any disputes arising from these
              Terms or any transaction with Osimiri shall be subject to the
              exclusive jurisdiction of the competent courts in Bengaluru,
              Karnataka.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">15. Contact Us</h2>
            <p>For any questions regarding these Terms &amp; Conditions, please contact us:</p>
            <div className="border-l-2 border-[var(--color-gold)] pl-5">
              <p className="font-medium text-[var(--color-black)]">Osimiri</p>
              <p className="mt-2">
                2nd Floor, Ranka Chamber, 167, Rashtriya Vidyalaya Road,
                Upparahalli, Mavalli, Bengaluru, Karnataka – 560004
              </p>
              <p className="mt-2">
                Email:{" "}
                <a href="mailto:info@osimiri.in" className="text-[var(--color-gold)] underline">
                  info@osimiri.in
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+918050434040" className="text-[var(--color-gold)] underline">
                  8050434040
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
