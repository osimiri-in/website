import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-black)] py-16 text-white">
      <div className="container-shell grid gap-10 lg:grid-cols-4">
        <div>
          <p className="eyebrow">About OSIMIRI</p>
          <h3 className="font-heading text-3xl">Luxury furniture redefined.</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Bespoke furniture for architects, designers, and premium homeowners,
            crafted across wood, metal, marble, and upholstery.
          </p>
        </div>
        <div>
          <p className="eyebrow">Collections</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/collections">Seating</Link>
            <Link href="/collections">Storage</Link>
            <Link href="/collections">Tables</Link>
            <Link href="/collections">Beds</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Quick Links</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/projects">Projects</Link>
            <Link href="/manufacturing">Manufacturing</Link>
            <Link href="/architects">Architects</Link>
            <Link href="/experience-centre">Experience Centre</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Newsletter</p>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Get updates on projects, manufacturing stories, and new collection
            releases.
          </p>
          <div className="mt-4 flex gap-3">
            <input
              className="input-base border-white/20 bg-white/5 text-white placeholder:text-white/40"
              placeholder="Your email"
            />
            <button className="bg-white px-5 py-3 text-xs uppercase tracking-[0.15em] text-black">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container-shell mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
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
