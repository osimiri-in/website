import type { Metadata } from "next";
import { Inter, Marcellus } from "next/font/google";
import { SiteFrame } from "@/components/layout/SiteFrame";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osimiri.vercel.app"),
  title: {
    default: "OSIMIRI | Luxury Furniture Redefined",
    template: "%s | OSIMIRI",
  },
  description:
    "OSIMIRI builds bespoke luxury furniture for architects, designers, hospitality projects, and premium homes.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${marcellus.variable}`}>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
