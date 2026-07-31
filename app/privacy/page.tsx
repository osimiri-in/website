import { PageHero } from "@/components/ui/PageHero";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="How OSIMIRI collects, uses, and protects the information you share with us."
        image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="section-space">
        <div className="container-shell body-copy max-w-3xl space-y-8">
          <div>
            <h2 className="font-heading text-3xl">Information we collect</h2>
            <p className="mt-3">
              When you submit an enquiry, contact form, appointment request, or
              newsletter sign-up, we collect the details you provide — typically
              your name, phone number, email, city, and your message. We do not
              collect payment information; OSIMIRI does not sell online.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">How we use it</h2>
            <p className="mt-3">
              We use your information solely to respond to your enquiry, discuss
              your project, arrange consultations or showroom visits, and — if
              you subscribe — to share occasional updates. We do not sell or rent
              your data to third parties.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">Cookies</h2>
            <p className="mt-3">
              The public website does not use tracking or advertising cookies. A
              secure session cookie is used only for authenticated staff in the
              product-management area.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">Data retention &amp; your rights</h2>
            <p className="mt-3">
              We keep enquiry records only as long as needed to serve you and for
              our legitimate business records. To access, correct, or delete your
              information, email{" "}
              <a href="mailto:info@osimiri.in" className="text-[var(--color-gold)] underline">
                info@osimiri.in
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="font-heading text-3xl">Contact</h2>
            <p className="mt-3">
              OSIMIRI, 2nd Floor, Ranka Chamber, 167, Rashtriya Vidyalaya Rd,
              Upparahalli, Mavalli, Bengaluru, Karnataka 560004 ·{" "}
              <a href="mailto:info@osimiri.in" className="text-[var(--color-gold)] underline">
                info@osimiri.in
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
