"use client";

import Image from "next/image";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition duration-300",
        scrolled
          ? "border-black/10 bg-[rgba(245,240,232,0.95)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex h-16 min-w-[170px] items-center justify-start lg:min-w-[210px]"
        >
          <Image
            src="/logo-removebg-preview.png"
            alt="OSIMIRI logo"
            width={260}
            height={180}
            className="h-[72px] w-auto max-w-[180px] object-contain object-left lg:h-[82px] lg:max-w-[210px]"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[var(--color-mid)] lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "text-[var(--color-black)]"
                  : "hover:text-[var(--color-black)]"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/search?q=" className={buttonClasses("ghost", "no-underline")}>
            <Search size={16} /> Search
          </Link>
          <EnquiryButton label="Enquire Now" />
        </div>
        <button type="button" className="lg:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-black/10 bg-[var(--color-warm-white)] lg:hidden">
          <div className="container-shell flex flex-col gap-4 py-6">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <EnquiryButton label="Enquire Now" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
