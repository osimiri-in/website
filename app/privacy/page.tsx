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
        <div className="container-shell body-copy max-w-3xl space-y-10">
          <p className="text-sm uppercase tracking-[0.14em] text-[var(--color-mid)]">
            Effective Date: July 31, 2026
          </p>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">Introduction</h2>
            <p>
              Welcome to Osimiri (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;). Your privacy is important to us, and we are
              committed to protecting the personal information you share with us.
              This Privacy Policy explains how we collect, use, store, and
              protect your information when you visit our website or contact us
              regarding our furniture products and services.
            </p>
            <p>
              By accessing or using our website, you acknowledge that you have
              read and understood this Privacy Policy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">1. Information We Collect</h2>
            <p>We may collect the following categories of information:</p>
            <h3 className="font-heading text-xl">Personal Information</h3>
            <p>
              When you submit an inquiry, request a quotation, download our
              catalogue, or contact us, we may collect:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Company or Organization Name (if applicable)</li>
              <li>Project Location</li>
              <li>Any information you voluntarily provide in your message</li>
            </ul>
            <h3 className="font-heading text-xl">Technical Information</h3>
            <p>When you browse our website, we may automatically collect:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>IP Address</li>
              <li>Browser and Device Information</li>
              <li>Operating System</li>
              <li>Pages Visited</li>
              <li>Date and Time of Access</li>
              <li>Website Usage Statistics</li>
            </ul>
            <h3 className="font-heading text-xl">Cookies</h3>
            <p>
              Our website may use cookies and similar technologies to improve
              website functionality, remember your preferences, and analyze
              visitor traffic.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">2. How We Use Your Information</h2>
            <p>We use the information collected to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Respond to product and business inquiries.</li>
              <li>Provide quotations, product details, catalogues, and specifications.</li>
              <li>Process requests for samples or consultations.</li>
              <li>Improve our products, website, and customer experience.</li>
              <li>Send updates about new collections, products, or promotional communications (where permitted by law).</li>
              <li>Monitor website performance and security.</li>
              <li>Comply with applicable legal and regulatory requirements.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">3. Sharing of Information</h2>
            <p>
              We respect your privacy and do not sell, trade, or rent your
              personal information.
            </p>
            <p>Your information may be shared only with:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Trusted service providers who assist in operating our website or business.</li>
              <li>Technology and hosting partners who support our digital services.</li>
              <li>Government authorities or law enforcement agencies when required under applicable law.</li>
              <li>Professional advisers where necessary for legal or regulatory compliance.</li>
            </ul>
            <p>All such parties are expected to protect your information appropriately.</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">4. Data Security</h2>
            <p>
              We take reasonable administrative, technical, and organizational
              measures to safeguard your personal information against
              unauthorized access, misuse, alteration, disclosure, or
              destruction.
            </p>
            <p>
              While we strive to use commercially acceptable security measures,
              no internet transmission or electronic storage system can be
              guaranteed to be completely secure.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">5. Your Rights</h2>
            <p>Subject to applicable laws, you may have the right to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Request access to the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request deletion of your personal information where legally permissible.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Object to or restrict certain types of processing, where applicable.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              contact details provided below.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">6. Cookies</h2>
            <p>
              Cookies help us improve website functionality and understand
              visitor preferences.
            </p>
            <p>
              You may choose to disable cookies through your browser settings.
              However, some features of our website may not function properly if
              cookies are disabled.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">7. Data Retention</h2>
            <p>We retain your personal information only for as long as necessary to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Respond to your inquiries.</li>
              <li>Maintain customer and business records.</li>
              <li>Fulfil contractual obligations.</li>
              <li>Comply with legal and regulatory requirements.</li>
              <li>Resolve disputes and enforce our legal rights.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">8. Third-Party Links</h2>
            <p>
              Our website may contain links to external websites for your
              convenience. We are not responsible for the privacy practices or
              content of those third-party websites. We encourage you to review
              their respective privacy policies before providing any personal
              information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">9. Updates to This Privacy Policy</h2>
            <p>
              We may revise this Privacy Policy from time to time to reflect
              changes in our business practices, technology, or legal
              obligations.
            </p>
            <p>
              Any updates will be published on this page along with the revised
              Effective Date.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-3xl">10. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to
              exercise your privacy rights, please contact us:
            </p>
            <div className="border-l-2 border-[var(--color-gold)] pl-5">
              <p className="font-medium text-[var(--color-black)]">Osimiri</p>
              <p className="mt-2">
                2nd Floor, Ranka Chamber, 167, Rashtriya Vidyalaya Rd,
                Upparahalli, Mavalli, Bengaluru, Karnataka 560004
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
            <p>
              We will make reasonable efforts to respond to your request promptly
              and in accordance with applicable Indian laws.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
