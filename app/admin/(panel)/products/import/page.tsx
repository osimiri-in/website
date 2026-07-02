"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud, FileDown } from "lucide-react";
import {
  PRODUCT_CSV_FIELDS,
  csvToProductInputs,
  productsToCsv,
} from "@/lib/product-csv";
import type { ProductInput } from "@/lib/product-schema";

export default function ImportPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ProductInput[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    setResult("");
    setError("");
    const text = await file.text();
    const { products, errors } = csvToProductInputs(text);
    setRows(products);
    setParseErrors(errors);
  }

  function downloadTemplate() {
    const csv = productsToCsv([
      {
        title: "Sample Product",
        slug: "sample-product",
        collectionName: "Sofa",
        category: "Seating",
        status: "Draft",
        featuredProduct: false,
        shortDescription: "A short description.",
        finishOptions: ["Walnut", "Oak"],
        mainImageLink: "https://...",
      },
    ]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "osimiri-products-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function runImport() {
    if (rows.length === 0) return;
    setImporting(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upsert", products: rows }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Import failed.");
      } else {
        setResult(`Imported ${data.upserted} product(s).`);
        setRows([]);
        setFileName("");
        router.refresh();
      }
    } catch {
      setError("Network error.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/products"
        className="text-sm text-neutral-500 hover:text-neutral-800"
      >
        ← Products
      </Link>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Import products</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Upload a CSV to create or update products in bulk. Rows are matched to
        existing products by <code>slug</code>. Array fields (tags, finishes,
        image links) use <code>|</code> to separate values.
      </p>

      <button
        onClick={downloadTemplate}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
      >
        <FileDown className="h-4 w-4" /> Download template
      </button>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-10 text-center transition hover:border-[var(--color-gold)]">
        <UploadCloud className="h-7 w-7 text-neutral-400" />
        <span className="text-sm font-medium text-neutral-700">
          {fileName || "Choose a CSV file"}
        </span>
        <span className="text-xs text-neutral-400">
          Columns: {PRODUCT_CSV_FIELDS.slice(0, 6).join(", ")}…
        </span>
        <input
          type="file"
          accept=".csv,text/csv"
          hidden
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>

      {parseErrors.length > 0 ? (
        <ul className="mt-3 space-y-1 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
          {parseErrors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      ) : null}

      {rows.length > 0 ? (
        <div className="mt-4 rounded-xl border border-black/10 bg-white">
          <div className="border-b border-black/10 px-4 py-2.5 text-sm font-medium">
            {rows.length} product(s) ready to import
          </div>
          <ul className="max-h-64 divide-y divide-black/5 overflow-auto text-sm">
            {rows.slice(0, 50).map((r, i) => (
              <li key={i} className="flex items-center justify-between px-4 py-2">
                <span className="font-medium text-neutral-800">{r.title}</span>
                <span className="text-xs text-neutral-400">
                  {r.status ?? "Draft"} · {r.category || "—"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {error ? (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
      {result ? (
        <p className="mt-3 rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          {result}
        </p>
      ) : null}

      <button
        onClick={runImport}
        disabled={importing || rows.length === 0}
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-black)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Import {rows.length > 0 ? `${rows.length} product(s)` : ""}
      </button>
    </div>
  );
}
