import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { Button } from "@/components/ui/Button";

export function EnquiryCTA({
  title = "Have a project in mind?",
  description = "Tell us about your brief, timeline, and the level of customization your project needs. Our team responds within one business day.",
  requirement,
  sourcePage,
}: {
  title?: string;
  description?: string;
  requirement?: string;
  sourcePage?: string;
}) {
  return (
    <section className="section-space bg-[var(--color-warm-white)]">
      <div className="container-shell max-w-2xl text-center">
        <p className="eyebrow">Start a Conversation</p>
        <h2 className="font-heading mt-3 text-4xl md:text-5xl">{title}</h2>
        <p className="body-copy mt-5">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <EnquiryButton label="Send an Enquiry" requirement={requirement} sourcePage={sourcePage} />
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
