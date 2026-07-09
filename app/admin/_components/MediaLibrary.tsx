"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Copy, Check, Trash2, Loader2 } from "lucide-react";
import type { MediaItem } from "@/lib/media";

function fmtSize(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibrary({
  items,
  configured,
}: {
  items: MediaItem[];
  configured: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      Array.from(files).forEach((f) => form.append("files", f));
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Upload failed.");
      else router.refresh();
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(name: string) {
    if (!confirm("Delete this file? Products using it will lose the image.")) return;
    const res = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) router.refresh();
    else setError((await res.json().catch(() => ({}))).error || "Delete failed.");
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#211f1b]">Media Library</h1>
          <p className="mt-1 text-sm text-[#8a857c]">
            {items.length} file{items.length === 1 ? "" : "s"} in storage
          </p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f6b4e] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#285a42] disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
          Upload
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
      </div>

      {!configured ? (
        <div className="mt-4 rounded-lg border border-[#e6d9b0] bg-[#f6efe0] px-4 py-3 text-sm text-[#8a6a2f]">
          Supabase storage isn&apos;t configured yet.
        </div>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-lg bg-[#fbf2f0] px-4 py-2 text-sm text-[#b4493d]">{error}</div>
      ) : null}

      {items.length === 0 ? (
        <p className="mt-5 rounded-xl border border-[#e7e3db] bg-white px-4 py-16 text-center text-sm text-[#9a948b]">
          No media yet. Upload images or add them from a product.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.name} className="group overflow-hidden rounded-xl border border-[#e7e3db] bg-white">
              <div className="relative aspect-square bg-[#f1ede6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                  <button onClick={() => copy(m.url)} title="Copy URL" className="rounded-md bg-white/90 p-1.5 text-[#4a463f] hover:bg-white">
                    {copied === m.url ? <Check className="h-4 w-4 text-[#2f6b4e]" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button onClick={() => remove(m.name)} title="Delete" className="rounded-md bg-white/90 p-1.5 text-[#b4493d] hover:bg-white">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="px-2.5 py-2">
                <p className="truncate text-xs text-[#56514a]" title={m.name}>{m.name}</p>
                <p className="font-plex-mono text-[11px] text-[#9a948b]">{fmtSize(m.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
