"use client";

import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { EnquiryModal } from "@/components/layout/EnquiryModal";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

/**
 * Renders the public marketing chrome (navbar, footer, cursor, modals) for the
 * site, but NOT on `/admin` routes — the product manager runs in its own shell.
 */
export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <EnquiryModal />
      <WhatsAppButton />
    </>
  );
}
