import { PageHero } from "@/components/ui/PageHero";
import { EnquiryButton } from "@/components/forms/EnquiryButton";

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's talk about your next project."
        description="Reach OSIMIRI for custom furniture, project collaborations, showroom visits, and material consultations."
        image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"
      />
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="card-surface p-6 md:p-8">
            <p className="eyebrow">Contact Details</p>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-[var(--color-mid)]">
              <p>
                <span className="block text-xs uppercase tracking-[0.14em]">Phone / WhatsApp</span>
                <a href="tel:+918050434040" className="text-[var(--color-black)]">+91 80504 34040</a>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.14em]">Email</span>
                <a href="mailto:info@osimiri.in" className="text-[var(--color-black)]">info@osimiri.in</a>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.14em]">Instagram</span>
                <a href="https://instagram.com/osimiri.furniture" target="_blank" rel="noreferrer" className="text-[var(--color-black)]">@osimiri.furniture</a>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.14em]">Studio</span>
                <span className="text-[var(--color-black)]">
                  2nd Floor, Ranka Chamber, 167, Rashtriya Vidyalaya Rd,
                  Upparahalli, Mavalli, Bengaluru, Karnataka 560004
                </span>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.14em]">Hours</span>
                <span className="text-[var(--color-black)]">Mon–Sat, 10am–7pm</span>
              </p>
            </div>
          </div>

          <div className="card-surface flex flex-col justify-center p-8 md:p-10">
            <p className="eyebrow">Start an Enquiry</p>
            <h2 className="font-heading mt-3 text-4xl">
              Share your brief and we&apos;ll take it from there.
            </h2>
            <p className="body-copy mt-4 max-w-xl">
              Tell us about your project — space, timeline, materials, and the
              level of customisation you need. Our team responds within one
              business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EnquiryButton label="Send an Enquiry" sourcePage="contact-page" />
              <a
                href="https://wa.me/918050434040"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[var(--color-black)] px-8 py-3 text-[12px] uppercase tracking-[0.15em] text-[var(--color-black)] transition hover:bg-[var(--color-warm-white)]"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
