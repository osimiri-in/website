import Link from "next/link";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Eye } from "lucide-react";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { getAdminProductsState } from "@/lib/products";
import { getCategories } from "@/lib/categories";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ products }, categories] = await Promise.all([
    getAdminProductsState(),
    getCategories(),
  ]);
  const counts = {
    products: products.length,
    categories: categories.filter((c) => c.parentId).length || categories.length,
  };

  return (
    <div
      className={`admin-theme ${plexSans.variable} ${plexMono.variable} min-h-screen bg-[#faf9f6]`}
    >
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[#e7e3db] bg-white px-3 py-4 lg:flex">
          <div className="flex items-center gap-2.5 px-2 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f6b4e] font-semibold text-white">
              O
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-[#211f1b]">OSIMIRI</p>
              <p className="text-xs text-[#8a857c]">Catalog Manager</p>
            </div>
          </div>

          <AdminNav counts={counts} />

          <div className="mt-auto space-y-3 px-1">
            <div className="rounded-lg bg-[#f1ede6] px-3 py-2.5">
              <p className="font-plex-mono text-[10px] uppercase tracking-[0.12em] text-[#9a948b]">
                Live site
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-[#56514a]">
                <span className="h-2 w-2 rounded-full bg-[#2f6b4e]" />
                osimiri.in · synced
              </p>
            </div>
            <div className="flex items-center gap-2.5 px-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7e3db] text-sm font-medium text-[#56514a]">
                H
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-medium text-[#211f1b]">
                  Himanshu Jain
                </p>
                <p className="text-xs text-[#8a857c]">Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-[#e7e3db] bg-[#faf9f6]/90 px-5 backdrop-blur">
            <span className="text-sm font-semibold text-[#211f1b] lg:hidden">
              OSIMIRI Catalog
            </span>
            <span className="hidden text-sm text-[#9a948b] lg:block">
              Manage your product catalog
            </span>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-[#56514a] transition hover:bg-[#f1ede6]"
              >
                <Eye className="h-4 w-4" /> View site
              </Link>
              <LogoutButton />
            </div>
          </header>
          <main className="flex-1 px-5 py-7 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
