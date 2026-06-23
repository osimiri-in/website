import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[color:color-mix(in_srgb,var(--color-black)_10%,transparent)] bg-[var(--color-warm-white)] py-20 text-[var(--color-black)] md:py-24">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <Image
            src="/logo-removebg-preview.png"
            alt="OSIMIRI logo"
            width={260}
            height={260}
            className="h-auto w-[126px] object-contain"
          />
          <p className="eyebrow mt-6">About OSIMIRI</p>
          <h3 className="font-heading mt-4 text-3xl leading-tight md:text-4xl">
            Luxury redefined.
          </h3>
          <p className="mt-5 max-w-sm text-[15px] leading-8 text-[var(--color-mid)]">
            Bespoke furniture for architects, designers, and homeowners, crafted
            across wood, metal, marble, and upholstery.
          </p>
        </div>
        <div>
          <p className="eyebrow">Collections</p>
          <div className="mt-5 grid gap-3 text-[15px] leading-7 text-[var(--color-mid)]">
            <Link href="/collections">Seating</Link>
            <Link href="/collections">Storage</Link>
            <Link href="/collections">Tables</Link>
            <Link href="/collections">Beds</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Quick Links</p>
          <div className="mt-5 grid gap-3 text-[15px] leading-7 text-[var(--color-mid)]">
            <Link href="/projects">Projects</Link>
            <Link href="/manufacturing">Manufacturing</Link>
            <Link href="/architects">Architects</Link>
            <Link href="/experience-centre">Experience Centre</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Newsletter</p>
          <p className="mt-5 text-[15px] leading-8 text-[var(--color-mid)]">
            Get updates on projects, manufacturing stories, and new collection
            releases.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              className="input-base min-h-[50px]"
              placeholder="Your email"
            />
            <button className="min-h-[50px] border border-[var(--color-black)] bg-[var(--color-gold-light)] px-6 py-3 text-xs uppercase tracking-[0.15em] text-black transition hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-warm-white)]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container-shell mt-16 border-t border-[color:color-mix(in_srgb,var(--color-black)_10%,transparent)] pt-8 text-sm text-[var(--color-light-text)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>© OSIMIRI</span>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
