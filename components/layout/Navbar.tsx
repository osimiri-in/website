"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  ["Collections", "/collections"],
  ["Projects", "/projects"],
  ["Custom Furniture", "/custom-furniture"],
  ["Manufacturing", "/manufacturing"],
  ["Architects", "/architects"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[color:color-mix(in_srgb,var(--color-black)_12%,transparent)] bg-white/96 backdrop-blur-md transition duration-300",
      )}
    >
      <div className="container-shell flex h-24 items-center justify-between gap-4 px-2 xl:gap-6">
        <Link href="/" className="flex min-w-[128px] flex-col justify-center lg:min-w-[150px] xl:min-w-[170px]">
          <span className="font-heading text-[28px] tracking-[0.14em] text-[var(--color-black)] lg:text-[34px] xl:text-[38px]">
            OSIMIRI
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] lg:text-[11px]">
            Luxury Redefined
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-[var(--color-mid)] xl:gap-2 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-[2px] px-3 py-2 transition-colors duration-200",
                pathname === href
                  ? "bg-[color:color-mix(in_srgb,var(--color-gold-light)_45%,transparent)] text-[var(--color-black)]"
                  : "hover:bg-[color:color-mix(in_srgb,var(--color-gold-light)_35%,transparent)] hover:text-[var(--color-black)]",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/search?q=" className={buttonClasses("ghost", "no-underline hover:text-[var(--color-black)]")}>
            <Search size={16} /> Search
          </Link>
          <EnquiryButton
            label="Enquire Now"
            className="min-w-[154px] shrink-0 rounded-[2px] border border-[var(--color-black)] bg-[var(--color-gold-light)] px-6 py-3 font-medium text-[11px] tracking-[0.18em] text-black shadow-none hover:border-[var(--color-gold)] hover:bg-[var(--color-warm-white)] hover:text-black"
          />
        </div>
        <button
          type="button"
          className="text-[var(--color-black)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[color:color-mix(in_srgb,var(--color-black)_12%,transparent)] bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-4 py-6">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="text-[var(--color-black)]">
                {label}
              </Link>
            ))}
            <EnquiryButton
              label="Enquire Now"
              className="w-full rounded-[2px] border border-[var(--color-black)] bg-[var(--color-gold-light)] text-black shadow-none hover:border-[var(--color-gold)] hover:bg-[var(--color-warm-white)] hover:text-black"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
