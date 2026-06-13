import { PageHero } from "@/components/ui/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" title="Let's talk about your next project." description="Reach OSIMIRI for custom furniture, project collaborations, showroom visits, and material consultations." image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80" />
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="card-surface p-6 md:p-8">
            <p className="eyebrow">Contact Details</p>
            <div className="mt-6 space-y-3 text-sm uppercase tracking-[0.12em] text-[var(--color-mid)]">
              <p>Phone: +91 XXXXX XXXXX</p>
              <p>Email: hello@osimiri.com</p>
              <p>WhatsApp: +91 XXXXX XXXXX</p>
              <p>Address: Hyderabad, India</p>
            </div>
          </div>
          <div className="card-surface p-6 md:p-8">
            <p className="eyebrow">Form Setup</p>
            <p className="body-copy mt-4">The shared enquiry drawer is active now. In the next pass this page can host the dedicated validated contact form wired to `contact_leads`.</p>
          </div>
        </div>
      </section>
    </>
  );
}
