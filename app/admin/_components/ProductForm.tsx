"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import type { Product } from "@/lib/product-schema";
import { PRODUCT_STATUSES } from "@/lib/product-schema";
import { slugify } from "@/lib/utils";
import { MediaUploader } from "./MediaUploader";

type Draft = Record<string, unknown>;

function buildDraft(p?: Product): Draft {
  return {
    productId: p?.productId ?? "",
    title: p?.title ?? "",
    subtitle: p?.subtitle ?? "",
    slug: p?.slug ?? "",
    collectionName: p?.collectionName ?? "",
    category: p?.category ?? "",
    subCategory: p?.subCategory ?? "",
    status: p?.status ?? "Draft",
    featuredProduct: p?.featuredProduct ?? false,
    shortDescription: p?.shortDescription ?? "",
    fullDescription: p?.fullDescription ?? "",
    customizationNote: p?.customizationNote ?? "",
    careInstructions: p?.careInstructions ?? "",
    installationNote: p?.installationNote ?? "",
    seoTitle: p?.seoTitle ?? "",
    seoDescription: p?.seoDescription ?? "",
    seoKeywords: p?.seoKeywords ?? [],
    focusKeyword: p?.focusKeyword ?? "",
    altTextMainImage: p?.altTextMainImage ?? "",
    primaryMaterial: p?.primaryMaterial ?? "",
    secondaryMaterials: p?.secondaryMaterials ?? [],
    finishOptions: p?.finishOptions ?? [],
    upholsteryOptions: p?.upholsteryOptions ?? [],
    swatchReferenceCodes: p?.swatchReferenceCodes ?? [],
    dimensionsOverall: p?.dimensionsOverall ?? "",
    dimensionsSeatHeight: p?.dimensionsSeatHeight ?? "",
    dimensionsSeatDepth: p?.dimensionsSeatDepth ?? "",
    dimensionsCustomizable: p?.dimensionsCustomizable ?? false,
    weight: p?.weight ?? "",
    assemblyRequired: p?.assemblyRequired ?? false,
    leadTime: p?.leadTime ?? "",
    warranty: p?.warranty ?? "",
    priceVisible: p?.priceVisible ?? false,
    priceNote: p?.priceNote ?? "",
    projectSuitability: p?.projectSuitability ?? [],
    availabilityRegion: p?.availabilityRegion ?? "",
    mainImageLink: p?.mainImageLink ?? "",
    galleryImageLinks: p?.galleryImageLinks ?? [],
    lifestyleImageLinks: p?.lifestyleImageLinks ?? [],
    detailCloseupLinks: p?.detailCloseupLinks ?? [],
    swatchImageLinks: p?.swatchImageLinks ?? [],
    videoLink: p?.videoLink ?? "",
    videoType: p?.videoType ?? "",
    cadFileLink: p?.cadFileLink ?? "",
    arOr3dModelLink: p?.arOr3dModelLink ?? "",
    searchKeywords: p?.searchKeywords ?? [],
    roomTags: p?.roomTags ?? [],
    styleTags: p?.styleTags ?? [],
    colorTags: p?.colorTags ?? [],
    materialTags: p?.materialTags ?? [],
    clientApprovalStatus: p?.clientApprovalStatus ?? "",
    contentSource: p?.contentSource ?? "",
    notesForOsimiriTeam: p?.notesForOsimiriTeam ?? "",
  };
}

const card = "rounded-xl border border-black/10 bg-white p-5";
const fieldLabel = "mb-1.5 block text-sm font-medium text-neutral-700";
const inputBase =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/15";

export function ProductForm({
  product,
  id,
}: {
  product?: Product;
  id?: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(() => buildDraft(product));
  const [slugTouched, setSlugTouched] = useState(Boolean(product?.slug));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set<K extends string>(key: K, value: unknown) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function setTitle(value: string) {
    set("title", value);
    if (!slugTouched) set("slug", slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!String(draft.title).trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(
        id ? `/api/admin/products/${id}` : "/api/admin/products",
        {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed.");
        setSaving(false);
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Delete failed.");
      setDeleting(false);
    }
  }

  // helpers for fields
  const Text = (key: string, label: string, opts?: { placeholder?: string; type?: string }) => (
    <div>
      <label className={fieldLabel}>{label}</label>
      <input
        type={opts?.type ?? "text"}
        value={String(draft[key] ?? "")}
        placeholder={opts?.placeholder}
        onChange={(e) =>
          key === "title" ? setTitle(e.target.value) : set(key, e.target.value)
        }
        className={inputBase}
      />
    </div>
  );

  const Area = (key: string, label: string, rows = 3) => (
    <div>
      <label className={fieldLabel}>{label}</label>
      <textarea
        rows={rows}
        value={String(draft[key] ?? "")}
        onChange={(e) => set(key, e.target.value)}
        className={inputBase}
      />
    </div>
  );

  const List = (key: string, label: string, placeholder = "Comma separated") => (
    <div>
      <label className={fieldLabel}>{label}</label>
      <input
        value={(draft[key] as string[]).join(", ")}
        placeholder={placeholder}
        onChange={(e) =>
          set(
            key,
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        className={inputBase}
      />
    </div>
  );

  const Toggle = (key: string, label: string) => (
    <label className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-sm text-neutral-700">{label}</span>
      <input
        type="checkbox"
        checked={Boolean(draft[key])}
        onChange={(e) => set(key, e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300"
      />
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="pb-16">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="text-sm text-neutral-500 hover:text-neutral-800"
          >
            ← Products
          </button>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {id ? String(draft.title || "Edit product") : "Add product"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {id ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </button>
          ) : null}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-black)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {id ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* Main column */}
        <div className="space-y-5">
          <div className={card}>
            <div className="space-y-4">
              {Text("title", "Title")}
              <div onBlur={() => {}}>
                {Text("subtitle", "Subtitle")}
              </div>
              <div>
                <label className={fieldLabel}>Slug</label>
                <input
                  value={String(draft.slug ?? "")}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value);
                  }}
                  className={inputBase}
                  placeholder="auto-generated from title"
                />
              </div>
              {Area("shortDescription", "Short description", 2)}
              {Area("fullDescription", "Full description", 5)}
              {Area("customizationNote", "Customization note", 2)}
            </div>
          </div>

          <div className={card}>
            <h2 className="mb-4 text-sm font-semibold text-neutral-800">Media</h2>
            <div className="space-y-5">
              <MediaUploader
                label="Main image"
                value={draft.mainImageLink ? [draft.mainImageLink as string] : []}
                onChange={(urls) => set("mainImageLink", urls[0] ?? "")}
                multiple={false}
                hint="Shown on cards and as the hero"
              />
              <MediaUploader
                label="Gallery images"
                value={draft.galleryImageLinks as string[]}
                onChange={(urls) => set("galleryImageLinks", urls)}
              />
              <MediaUploader
                label="Lifestyle images"
                value={draft.lifestyleImageLinks as string[]}
                onChange={(urls) => set("lifestyleImageLinks", urls)}
              />
              <MediaUploader
                label="Detail close-ups"
                value={draft.detailCloseupLinks as string[]}
                onChange={(urls) => set("detailCloseupLinks", urls)}
              />
              <MediaUploader
                label="Swatch images"
                value={draft.swatchImageLinks as string[]}
                onChange={(urls) => set("swatchImageLinks", urls)}
              />
              {Text("altTextMainImage", "Main image alt text")}
            </div>
          </div>

          <div className={card}>
            <h2 className="mb-4 text-sm font-semibold text-neutral-800">
              Materials &amp; dimensions
            </h2>
            <div className="space-y-4">
              {Text("primaryMaterial", "Primary material")}
              {List("secondaryMaterials", "Secondary materials")}
              {List("finishOptions", "Finish options")}
              {List("upholsteryOptions", "Upholstery options")}
              {List("swatchReferenceCodes", "Swatch reference codes")}
              {Text("dimensionsOverall", "Overall dimensions", { placeholder: "W x D x H mm" })}
              <div className="grid grid-cols-2 gap-3">
                {Text("dimensionsSeatHeight", "Seat height")}
                {Text("dimensionsSeatDepth", "Seat depth")}
              </div>
              {Text("weight", "Weight")}
            </div>
          </div>

          <details className={card}>
            <summary className="cursor-pointer text-sm font-semibold text-neutral-800">
              SEO &amp; tags
            </summary>
            <div className="mt-4 space-y-4">
              {Text("seoTitle", "SEO title")}
              {Area("seoDescription", "SEO description", 2)}
              {List("seoKeywords", "SEO keywords")}
              {Text("focusKeyword", "Focus keyword")}
              {List("searchKeywords", "Search keywords")}
              {List("roomTags", "Room tags")}
              {List("styleTags", "Style tags")}
              {List("colorTags", "Color tags")}
              {List("materialTags", "Material tags")}
            </div>
          </details>

          <details className={card}>
            <summary className="cursor-pointer text-sm font-semibold text-neutral-800">
              Logistics, media links &amp; internal notes
            </summary>
            <div className="mt-4 space-y-4">
              {Text("leadTime", "Lead time")}
              {Text("warranty", "Warranty")}
              {Text("availabilityRegion", "Availability region")}
              {Area("careInstructions", "Care instructions", 2)}
              {Area("installationNote", "Installation note", 2)}
              {Text("videoLink", "Video link")}
              {Text("videoType", "Video type")}
              {Text("cadFileLink", "CAD file link")}
              {Text("arOr3dModelLink", "AR / 3D model link")}
              {List("projectSuitability", "Project suitability")}
              {Text("clientApprovalStatus", "Client approval status")}
              {Text("contentSource", "Content source")}
              {Area("notesForOsimiriTeam", "Notes for OSIMIRI team", 2)}
            </div>
          </details>
        </div>

        {/* Side column */}
        <div className="space-y-5">
          <div className={card}>
            <label className={fieldLabel}>Status</label>
            <select
              value={String(draft.status)}
              onChange={(e) => set("status", e.target.value)}
              className={inputBase}
            >
              {PRODUCT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="mt-3 border-t border-black/5 pt-2">
              {Toggle("featuredProduct", "Featured product")}
            </div>
          </div>

          <div className={card}>
            <h2 className="mb-3 text-sm font-semibold text-neutral-800">
              Organization
            </h2>
            <div className="space-y-4">
              {Text("productId", "Product ID / SKU", { placeholder: "auto if blank" })}
              {Text("collectionName", "Collection")}
              {Text("category", "Category")}
              {Text("subCategory", "Sub-category")}
            </div>
          </div>

          <div className={card}>
            <h2 className="mb-3 text-sm font-semibold text-neutral-800">Pricing</h2>
            <div className="space-y-2">
              {Toggle("priceVisible", "Show price")}
              {Text("priceNote", "Price note", { placeholder: "e.g. Price on request" })}
            </div>
          </div>

          <div className={card}>
            <h2 className="mb-3 text-sm font-semibold text-neutral-800">Options</h2>
            <div className="space-y-1">
              {Toggle("dimensionsCustomizable", "Dimensions customizable")}
              {Toggle("assemblyRequired", "Assembly required")}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
