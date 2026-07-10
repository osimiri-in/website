"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Upload, Download, Loader2, Eye, Pencil, Trash2 } from "lucide-react";
import type { Product, ProductStatus } from "@/lib/product-schema";
import { productsToCsv } from "@/lib/product-csv";
import { formatINR, timeAgo } from "@/lib/format";

// Status colors are semantic (green/yellow/grey) and intentionally NOT the
// brand accent, so they stay put when the accent is re-themed.
const STATUS_META: Record<string, { label: string; cls: string }> = {
  Active: { label: "Published", cls: "bg-[#e7f4ec] text-[#1f7a4d]" },
  Draft: { label: "Draft", cls: "bg-[#fbf1d3] text-[#8a6d1f]" },
  Archived: { label: "Archived", cls: "bg-[#eceae4] text-[#8a857c]" },
};

const inputCls =
  "rounded-lg border border-[#ddd9d1] bg-white px-3 py-2 text-sm text-[#4a463f] outline-none focus:border-[#35347a]";

export function ProductsTable({
  initialProducts,
  configured,
}: {
  initialProducts: Product[];
  configured: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      const parent = (p.categoryPath || p.category || "").split(" / ")[0].trim();
      if (parent) set.add(parent);
    });
    return ["All", ...[...set].sort()];
  }, [initialProducts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialProducts.filter((p) => {
      if (status !== "All" && p.status !== status) return false;
      if (category !== "All") {
        const parent = (p.categoryPath || p.category || "").split(" / ")[0].trim();
        if (parent !== category) return false;
      }
      if (!q) return true;
      return [p.title, p.productId, p.categoryPath]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [initialProducts, query, category, status]);

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((p) => p.id && selected.has(p.id));

  function toggleAll() {
    setSelected(
      allVisibleSelected
        ? new Set()
        : new Set(filtered.map((p) => p.id!).filter(Boolean)),
    );
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
      if (!res.ok) setError(data.error || "Action failed.");
      else {
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
    if (!confirm(`Delete ${selected.size} product(s)? This cannot be undone.`)) return;
    runBulk({ action: "delete", ids: [...selected] });
  }

  async function deleteOne(id: string, title: string) {
    if (!confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Delete failed.");
      } else {
        router.refresh();
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }
  function bulkStatus(s: ProductStatus) {
    runBulk({ action: "setStatus", ids: [...selected], status: s });
  }

  function exportCsv() {
    const rows = (selected.size
      ? filtered.filter((p) => p.id && selected.has(p.id))
      : filtered) as unknown as Record<string, unknown>[];
    const blob = new Blob([productsToCsv(rows)], { type: "text/csv;charset=utf-8;" });
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
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#211f1b]">Products</h1>
          <p className="mt-1 text-sm text-[#8a857c]">
            {initialProducts.length} {initialProducts.length === 1 ? "product" : "products"} · manage your full catalog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#ddd9d1] bg-white px-3 py-2 text-sm font-medium text-[#56514a] transition hover:bg-[#f1ede6]"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          <Link
            href="/admin/products/import"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#ddd9d1] bg-white px-3 py-2 text-sm font-medium text-[#56514a] transition hover:bg-[#f1ede6]"
          >
            <Upload className="h-4 w-4" /> Import
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#35347a] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#292858]"
          >
            <Plus className="h-4 w-4" /> New product
          </Link>
        </div>
      </div>

      {!configured ? (
        <div className="mt-4 rounded-lg border border-[#e6d9b0] bg-[#f6efe0] px-4 py-3 text-sm text-[#8a6a2f]">
          You&apos;re viewing sample data. Saving isn&apos;t available until
          catalog setup is completed by your administrator.
        </div>
      ) : null}

      {/* Toolbar */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a948b]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or SKU…"
            className={`${inputCls} w-full pl-9`}
          />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All categories" : c}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
          <option value="All">All statuses</option>
          <option value="Active">Published</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
        <span className="ml-auto font-plex-mono text-sm text-[#9a948b]">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </span>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-[#ecebf7] px-4 py-2 text-sm text-[#292858]">
          <span className="font-medium">{selected.size} selected</span>
          <span className="text-[#b6b4d8]">·</span>
          <button disabled={busy} onClick={() => bulkStatus("Active")} className="rounded-md px-2 py-1 hover:bg-white/60">Publish</button>
          <button disabled={busy} onClick={() => bulkStatus("Draft")} className="rounded-md px-2 py-1 hover:bg-white/60">Set Draft</button>
          <button disabled={busy} onClick={() => bulkStatus("Archived")} className="rounded-md px-2 py-1 hover:bg-white/60">Archive</button>
          <button disabled={busy} onClick={bulkDelete} className="rounded-md px-2 py-1 text-[#b4493d] hover:bg-white/60">Delete</button>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        </div>
      ) : null}

      {error ? (
        <div className="mt-3 rounded-lg bg-[#fbf2f0] px-4 py-2 text-sm text-[#b4493d]">{error}</div>
      ) : null}

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-[#e7e3db] bg-white">
        {filtered.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-[#9a948b]">
            No products found.{" "}
            <Link href="/admin/products/new" className="text-[#35347a] underline">
              Add one
            </Link>
            .
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e7e3db] text-left font-plex-mono text-[11px] uppercase tracking-[0.08em] text-[#9a948b]">
                  <th className="w-10 py-2.5 pl-4">
                    <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} className="h-4 w-4 rounded border-[#ddd9d1] accent-[#35347a]" />
                  </th>
                  <th className="px-2 py-2.5 font-medium">Product</th>
                  <th className="hidden px-2 py-2.5 font-medium md:table-cell">Category</th>
                  <th className="px-2 py-2.5 font-medium">Price</th>
                  <th className="px-2 py-2.5 font-medium">Status</th>
                  <th className="hidden px-2 py-2.5 font-medium sm:table-cell">Images</th>
                  <th className="hidden px-2 py-2.5 font-medium lg:table-cell">Updated</th>
                  <th className="px-2 py-2.5 pr-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const meta = STATUS_META[p.status] ?? STATUS_META.Draft;
                  const [parent, sub] = (p.categoryPath || p.category || "").split(" / ");
                  const imgs = (p.galleryImageLinks?.length || (p.mainImageLink ? 1 : 0)) as number;
                  return (
                    <tr key={p.id ?? p.slug} className="border-b border-[#f1ede6] last:border-0 hover:bg-[#faf9f6]">
                      <td className="py-3 pl-4">
                        <input
                          type="checkbox"
                          disabled={!p.id}
                          checked={Boolean(p.id && selected.has(p.id))}
                          onChange={() => p.id && toggleOne(p.id)}
                          className="h-4 w-4 rounded border-[#ddd9d1] accent-[#35347a]"
                        />
                      </td>
                      <td className="px-2 py-3">
                        <Link href={p.id ? `/admin/products/${p.id}` : "#"} className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.mainImageLink || "/icon.png"} alt="" className="h-10 w-10 shrink-0 rounded-md border border-[#e7e3db] object-cover" />
                          <span className="min-w-0">
                            <span className="block truncate font-medium text-[#211f1b] hover:underline">{p.title}</span>
                            <span className="font-plex-mono block text-xs text-[#9a948b]">{p.productId}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="hidden px-2 py-3 md:table-cell">
                        <span className="block text-[#4a463f]">{parent || "—"}</span>
                        {sub ? <span className="block text-xs text-[#9a948b]">{sub}</span> : null}
                      </td>
                      <td className="font-plex-mono whitespace-nowrap px-2 py-3 text-[#4a463f]">{formatINR(p.price)}</td>
                      <td className="px-2 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${meta.cls}`}>{meta.label}</span>
                      </td>
                      <td className="font-plex-mono hidden px-2 py-3 text-[#8a857c] sm:table-cell">{imgs}</td>
                      <td className="hidden whitespace-nowrap px-2 py-3 text-xs text-[#9a948b] lg:table-cell">{timeAgo(p.updatedAt)}</td>
                      <td className="px-2 py-3 pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`/products/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            title="View on site"
                            className="rounded-md p-1.5 text-[#8a857c] hover:bg-[#f1ede6] hover:text-[#35347a]"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <Link
                            href={p.id ? `/admin/products/${p.id}` : "#"}
                            title="Edit"
                            className="rounded-md p-1.5 text-[#8a857c] hover:bg-[#f1ede6] hover:text-[#35347a]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            disabled={!p.id || busy}
                            onClick={() => p.id && deleteOne(p.id, p.title)}
                            title="Delete"
                            className="rounded-md p-1.5 text-[#8a857c] hover:bg-[#fbf2f0] hover:text-[#b4493d] disabled:opacity-40"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
