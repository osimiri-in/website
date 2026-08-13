"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { MediaUploader } from "./MediaUploader";

export type ProjectDraft = {
  id?: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  heroImage: string;
  slides: string[];
  featured: boolean;
  sortOrder: number;
};

const card = "rounded-xl border border-[#e7e3db] bg-white p-5";
const fieldLabel = "mb-1.5 block text-sm font-medium text-[#56514a]";
const inputBase =
  "w-full rounded-lg border border-[#ddd9d1] px-3 py-2 text-sm text-[#4a463f] outline-none focus:border-[#35347a] focus:ring-2 focus:ring-[#35347a]/15";

export function ProjectForm({ project }: { project?: ProjectDraft }) {
  const router = useRouter();
  const id = project?.id;
  const [draft, setDraft] = useState<ProjectDraft>(
    () =>
      project ?? {
        title: "",
        slug: "",
        location: "",
        type: "",
        description: "",
        heroImage: "",
        slides: [],
        featured: false,
        sortOrder: 0,
      },
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(project?.slug));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function setTitle(value: string) {
    set("title", value);
    if (!slugTouched) set("slug", slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title.trim()) return setError("Title is required.");
    if (!draft.slug.trim()) return setError("Slug is required.");
    setSaving(true);
    setError("");
    try {
      const res = await fetch(
        id ? `/api/admin/projects/${id}` : "/api/admin/projects",
        {
          method: id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Save failed.");
        setSaving(false);
        return;
      }
      window.location.assign("/admin/projects");
    } catch {
      setError("Network error.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      window.location.assign("/admin/projects");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed.");
      setDeleting(false);
    }
  }

  function guardEnter(e: React.KeyboardEvent<HTMLFormElement>) {
    const el = e.target as HTMLElement;
    if (e.key === "Enter" && el.tagName === "INPUT") e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={guardEnter} className="pb-16">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="text-sm text-neutral-500 hover:text-neutral-800"
          >
            ← Projects
          </button>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {id ? draft.title || "Edit project" : "Add project"}
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
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#35347a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#292858] disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {id ? "Save changes" : "Create project"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <div className={card}>
            <div className="space-y-4">
              <div>
                <label className={fieldLabel}>
                  Title <span className="text-[#b4493d]">*</span>
                </label>
                <input
                  value={draft.title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Eira Residence"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={fieldLabel}>Slug</label>
                <input
                  value={draft.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value);
                  }}
                  placeholder="auto-generated from title"
                  className={inputBase}
                />
                <p className="mt-1 text-xs text-[#9a948b]">
                  Web address: /projects/{draft.slug || "…"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={fieldLabel}>Location</label>
                  <input
                    value={draft.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className={fieldLabel}>Type</label>
                  <input
                    value={draft.type}
                    onChange={(e) => set("type", e.target.value)}
                    placeholder="e.g. Bespoke Luxury"
                    className={inputBase}
                  />
                </div>
              </div>
              <div>
                <label className={fieldLabel}>Description</label>
                <textarea
                  rows={4}
                  value={draft.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={inputBase}
                />
              </div>
            </div>
          </div>

          <div className={card}>
            <h2 className="mb-4 text-sm font-semibold text-neutral-800">Images</h2>
            <div className="space-y-5">
              <MediaUploader
                label="Hero image"
                value={draft.heroImage ? [draft.heroImage] : []}
                onChange={(urls) => set("heroImage", urls[0] ?? "")}
                multiple={false}
                hint="Used on the projects listing card"
              />
              <MediaUploader
                label="Project slides"
                value={draft.slides}
                onChange={(urls) => set("slides", urls)}
                hint="Shown in order on the project's page"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className={card}>
            <h2 className="mb-3 text-sm font-semibold text-[#211f1b]">Display</h2>
            <label className="flex cursor-pointer items-start justify-between gap-3 py-1.5">
              <span>
                <span className="block text-sm text-[#4a463f]">Featured</span>
                <span className="block text-xs text-[#9a948b]">
                  Featured projects can be highlighted on the homepage.
                </span>
              </span>
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 accent-[#35347a]"
              />
            </label>
            <div className="mt-3 border-t border-black/5 pt-3">
              <label className={fieldLabel}>Sort order</label>
              <input
                type="number"
                value={String(draft.sortOrder)}
                onChange={(e) => set("sortOrder", Number(e.target.value) || 0)}
                className={`${inputBase} font-plex-mono`}
              />
              <p className="mt-1 text-xs text-[#9a948b]">
                Lower numbers appear first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
