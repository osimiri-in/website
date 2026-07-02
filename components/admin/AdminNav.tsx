"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Package,
  ListTree,
  Images,
  Activity,
} from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutGrid, exact: true, badge: undefined as number | undefined },
  { href: "/admin/products", label: "Products", icon: Package, badge: "products" as const },
  { href: "/admin/categories", label: "Categories", icon: ListTree, badge: "categories" as const },
  { href: "/admin/media", label: "Media Library", icon: Images },
  { href: "/admin/activity", label: "Activity Log", icon: Activity },
];

export function AdminNav({
  counts,
}: {
  counts: { products?: number; categories?: number };
}) {
  const pathname = usePathname() || "";

  return (
    <nav className="flex flex-col gap-0.5">
      <p className="font-plex-mono px-3 pb-2 pt-1 text-[11px] uppercase tracking-[0.14em] text-[#9a948b]">
        Workspace
      </p>
      {ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;
        const badge =
          item.badge === "products"
            ? counts.products
            : item.badge === "categories"
              ? counts.categories
              : undefined;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
              active
                ? "bg-[#e8f1ec] font-medium text-[#285a42]"
                : "text-[#56514a] hover:bg-[#f1ede6]"
            }`}
          >
            <Icon className={`h-[18px] w-[18px] ${active ? "text-[#2f6b4e]" : "text-[#8a857c]"}`} />
            <span className="flex-1">{item.label}</span>
            {typeof badge === "number" ? (
              <span className="font-plex-mono rounded-md bg-[#e7e3db] px-1.5 py-0.5 text-[11px] text-[#56514a]">
                {badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
