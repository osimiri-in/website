"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, Pencil, Check, X } from "lucide-react";
import type { CategoryWithChildren } from "@/lib/categories";

const inputCls =
  "rounded-lg border border-[#ddd9d1] bg-white px-3 py-2 text-sm text-[#4a463f] outline-none focus:border-[#35347a]";

export function CategoriesManager({
  tree,
  configured,
}: {
  tree: CategoryWithChildren[];
  configured: boolean;
}) {
  const router = useRouter();
  const [newParent, setNewParent] = useState("");
  const [subInputs, setSubInputs] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function call(method: string, url: string, body?: unknown) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Action failed.");
        return false;
      }
      router.refresh();
      return true;
    } catch {
      setError("Network error.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function addParent() {
    if (!newParent.trim()) return;
    if (await call("POST", "/api/admin/categories", { name: newParent.trim() }))
      setNewParent("");
  }
  async function addSub(parentId: string) {
    const name = (subInputs[parentId] || "").trim();
    if (!name) return;
    if (await call("POST", "/api/admin/categories", { name, parentId }))
      setSubInputs((s) => ({ ...s, [parentId]: "" }));
  }
  async function rename(id: string) {
    if (!editValue.trim()) return;
    if (await call("PATCH", `/api/admin/categories/${id}`, { name: editValue.trim() }))
      setEditing(null);
  }
  function del(id: string, label: string, hasChildren: boolean) {
    if (
      !confirm(
        `Delete “${label}”?${hasChildren ? " Its subcategories will be removed too." : ""}`,
      )
    )
      return;
    call("DELETE", `/api/admin/categories/${id}`);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#211f1b]">Categories</h1>
          <p className="mt-1 text-sm text-[#8a857c]">
            Organize the catalog into categories and subcategories.
          </p>
        </div>
      </div>

      {!configured ? (
        <div className="mt-4 rounded-lg border border-[#e6d9b0] bg-[#f6efe0] px-4 py-3 text-sm text-[#8a6a2f]">
          Category management will be available once catalog setup is completed
          by your administrator.
        </div>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-lg bg-[#fbf2f0] px-4 py-2 text-sm text-[#b4493d]">{error}</div>
      ) : null}

      {/* Add top-level category */}
      <div className="mt-5 flex gap-2">
        <input
          value={newParent}
          onChange={(e) => setNewParent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addParent()}
          placeholder="New category name…"
          className={`${inputCls} flex-1`}
        />
        <button
          onClick={addParent}
          disabled={busy || !newParent.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#35347a] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#292858] disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {/* Category cards */}
      <div className="mt-5 space-y-3">
        {tree.length === 0 ? (
          <p className="rounded-xl border border-[#e7e3db] bg-white px-4 py-10 text-center text-sm text-[#9a948b]">
            No categories yet.
          </p>
        ) : (
          tree.map((cat) => (
            <div key={cat.id} className="rounded-xl border border-[#e7e3db] bg-white p-4">
              <div className="flex items-center gap-2">
                {editing === cat.id ? (
                  <>
                    <input
                      value={editValue}
                      autoFocus
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && rename(cat.id)}
                      className={`${inputCls} flex-1`}
                    />
                    <button onClick={() => rename(cat.id)} className="rounded-md p-1.5 text-[#35347a] hover:bg-[#ecebf7]"><Check className="h-4 w-4" /></button>
                    <button onClick={() => setEditing(null)} className="rounded-md p-1.5 text-[#8a857c] hover:bg-[#f1ede6]"><X className="h-4 w-4" /></button>
                  </>
                ) : (
                  <>
                    <h2 className="flex-1 font-medium text-[#211f1b]">{cat.name}</h2>
                    <span className="font-plex-mono rounded-md bg-[#f1ede6] px-2 py-0.5 text-xs text-[#8a857c]">
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </span>
                    <button onClick={() => { setEditing(cat.id); setEditValue(cat.name); }} className="rounded-md p-1.5 text-[#8a857c] hover:bg-[#f1ede6]"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => del(cat.id, cat.name, cat.children.length > 0)} className="rounded-md p-1.5 text-[#b4493d] hover:bg-[#fbf2f0]"><Trash2 className="h-4 w-4" /></button>
                  </>
                )}
              </div>

              {/* Subcategories */}
              <div className="mt-3 flex flex-wrap gap-2 border-t border-[#f1ede6] pt-3">
                {cat.children.map((sub) => (
                  <span key={sub.id} className="inline-flex items-center gap-1.5 rounded-full bg-[#f1ede6] py-1 pl-3 pr-1.5 text-sm text-[#56514a]">
                    {sub.name}
                    <button onClick={() => del(sub.id, sub.name, false)} className="rounded-full p-0.5 text-[#9a948b] hover:bg-white hover:text-[#b4493d]">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
                <span className="inline-flex items-center gap-1">
                  <input
                    value={subInputs[cat.id] || ""}
                    onChange={(e) => setSubInputs((s) => ({ ...s, [cat.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && addSub(cat.id)}
                    placeholder="Add subcategory…"
                    className="w-40 rounded-full border border-[#ddd9d1] bg-white px-3 py-1 text-sm outline-none focus:border-[#35347a]"
                  />
                  <button onClick={() => addSub(cat.id)} disabled={busy} className="rounded-full p-1 text-[#35347a] hover:bg-[#ecebf7]">
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  </button>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
