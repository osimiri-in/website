"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Star, Upload, Download, Loader2 } from "lucide-react";
import type { Product, ProductStatus } from "@/lib/product-schema";
import { PRODUCT_STATUSES } from "@/lib/product-schema";
import { productsToCsv } from "@/lib/product-csv";

const TABS = ["All", ...PRODUCT_STATUSES] as const;
type Tab = (typeof TABS)[number];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Draft: "bg-amber-100 text-amber-800",
  Archived: "bg-neutral-200 text-neutral-600",
};

export function ProductsTable({
  initialProducts,
  configured,
}: {
  initialProducts: Product[];
  configured: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialProducts.filter((p) => {
      if (tab !== "All" && p.status !== tab) return false;
      if (!q) return true;
      return [p.title, p.productId, p.category, p.collectionName]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [initialProducts, tab, query]);

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((p) => p.id && selected.has(p.id));

  function toggleAll() {
    if (allVisibleSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id!).filter(Boolean)));
    }
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  async function runBulk(body: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Action failed.");
      } else {
        setSelected(new Set());
        router.refresh();
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  function bulkDelete() {
    if (
      !confirm(`Delete ${selected.size} product(s)? This cannot be undone.`)
    )
      return;
    runBulk({ action: "delete", ids: [...selected] });
  }

  function bulkStatus(status: ProductStatus) {
    runBulk({ action: "setStatus", ids: [...selected], status });
  }

  function exportCsv() {
    const csv = productsToCsv(
      (selected.size ? filtered.filter((p) => p.id && selected.has(p.id)) : filtered) as unknown as Record<string, unknown>[],
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "osimiri-products.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          <Link
            href="/admin/products/import"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            <Upload className="h-4 w-4" /> Import
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-black)] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add product
          </Link>
        </div>
      </div>

      {!configured ? (
        <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase isn&apos;t configured yet, so you&apos;re seeing read-only
          sample data. Add the env keys and run <code>supabase/products.sql</code>{" "}
          to enable saving.
        </div>
      ) : null}

      {/* Card */}
      <div className="mt-5 overflow-hidden rounded-xl border border-black/10 bg-white">
        {/* Tabs + search */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-3 py-2.5">
          <div className="flex items-center gap-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  tab === t
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-56 rounded-md border border-neutral-300 py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[var(--color-gold)]"
            />
          </div>
        </div>

        {/* Bulk bar */}
        {selected.size > 0 ? (
          <div className="flex flex-wrap items-center gap-2 border-b border-black/10 bg-neutral-50 px-4 py-2 text-sm">
            <span className="font-medium">{selected.size} selected</span>
            <span className="text-neutral-300">·</span>
            <button
              disabled={busy}
              onClick={() => bulkStatus("Active")}
              className="rounded-md px-2 py-1 text-neutral-700 hover:bg-neutral-200"
            >
              Set Active
            </button>
            <button
              disabled={busy}
              onClick={() => bulkStatus("Draft")}
              className="rounded-md px-2 py-1 text-neutral-700 hover:bg-neutral-200"
            >
              Set Draft
            </button>
            <button
              disabled={busy}
              onClick={() => bulkStatus("Archived")}
              className="rounded-md px-2 py-1 text-neutral-700 hover:bg-neutral-200"
            >
              Archive
            </button>
            <button
              disabled={busy}
              onClick={bulkDelete}
              className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
            {busy ? <Loader2 className="h-4 w-4 animate-spin text-neutral-400" /> : null}
          </div>
        ) : null}

        {error ? (
          <div className="border-b border-black/10 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-neutral-500">
            No products{tab !== "All" ? ` in ${tab}` : ""}.{" "}
            <Link href="/admin/products/new" className="text-[var(--color-gold)] underline">
              Add your first product
            </Link>
            .
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-neutral-400">
                <th className="w-10 px-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-neutral-300"
                  />
                </th>
                <th className="px-2 py-2.5 font-medium">Product</th>
                <th className="px-2 py-2.5 font-medium">Status</th>
                <th className="hidden px-2 py-2.5 font-medium md:table-cell">Collection</th>
                <th className="hidden px-2 py-2.5 font-medium md:table-cell">Category</th>
                <th className="px-2 py-2.5 font-medium">Featured</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id ?? p.slug}
                  className="border-b border-black/5 last:border-0 hover:bg-neutral-50/60"
                >
                  <td className="px-4 py-2.5">
                    <input
                      type="checkbox"
                      disabled={!p.id}
                      checked={Boolean(p.id && selected.has(p.id))}
                      onChange={() => p.id && toggleOne(p.id)}
                      className="h-4 w-4 rounded border-neutral-300"
                    />
                  </td>
                  <td className="px-2 py-2.5">
                    <Link
                      href={p.id ? `/admin/products/${p.id}` : "#"}
                      className="flex items-center gap-3"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.mainImageLink || "/icon.png"}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-md border border-black/10 object-cover"
                      />
                      <span>
                        <span className="block font-medium text-neutral-900 hover:underline">
                          {p.title}
                        </span>
                        {p.subtitle ? (
                          <span className="block text-xs text-neutral-400">
                            {p.subtitle}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </td>
                  <td className="px-2 py-2.5">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[p.status] ?? "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="hidden px-2 py-2.5 text-neutral-600 md:table-cell">
                    {p.collectionName || "—"}
                  </td>
                  <td className="hidden px-2 py-2.5 text-neutral-600 md:table-cell">
                    {p.category || "—"}
                  </td>
                  <td className="px-2 py-2.5">
                    {p.featuredProduct ? (
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-neutral-400">
        {filtered.length} product{filtered.length === 1 ? "" : "s"}
      </p>
    </div>
  );
}
