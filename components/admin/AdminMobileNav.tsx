"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AdminNav } from "./AdminNav";

export function AdminMobileNav({
  counts,
}: {
  counts: { products?: number; categories?: number };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex items-center rounded-md p-1.5 text-[#4a463f] hover:bg-[#f1ede6]"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/30"
          />
          <aside className="admin-theme absolute left-0 top-0 flex h-full w-72 max-w-[82%] flex-col bg-white px-3 py-4 shadow-xl">
            <div className="flex items-center justify-between px-2 pb-4">
              <div>
                <Image
                  src="/logo-removebg-preview.png"
                  alt="OSIMIRI"
                  width={120}
                  height={120}
                  className="h-auto w-[100px]"
                />
                <p className="mt-1 text-xs text-[#8a857c]">Catalog Manager</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-1.5 text-[#8a857c] hover:bg-[#f1ede6]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Clicking any nav link closes the drawer */}
            <div onClick={() => setOpen(false)}>
              <AdminNav counts={counts} />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
