import Link from "next/link";
import { Package, Eye } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f7] text-neutral-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-black/10 bg-white px-3 py-5 md:flex">
          <div className="px-3 pb-5">
            <p className="font-heading text-xl tracking-wide text-[var(--color-black)]">
              OSIMIRI
            </p>
            <p className="text-xs text-neutral-500">Product Manager</p>
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/admin/products"
              className="flex items-center gap-2.5 rounded-md bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-900"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Eye className="h-4 w-4" />
              View website
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-black/10 bg-white px-5">
            <span className="text-sm font-medium text-neutral-700 md:hidden">
              OSIMIRI Admin
            </span>
            <span className="hidden text-sm text-neutral-400 md:block">
              Manage your catalogue
            </span>
            <LogoutButton />
          </header>
          <main className="flex-1 px-5 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
