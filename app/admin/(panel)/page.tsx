import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminProductsState } from "@/lib/products";
import { getCategoryTree } from "@/lib/categories";
import { getRecentActivity } from "@/lib/activity";
import { listMedia } from "@/lib/media";
import { timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

const ACTIVITY_DOT: Record<string, string> = {
  created: "bg-[#2f6b4e]",
  updated: "bg-[#b08d57]",
  published: "bg-[#2f6b4e]",
  uploaded: "bg-[#6f8a86]",
  deleted: "bg-[#b4493d]",
};

export default async function OverviewPage() {
  const [{ products }, tree, activity, media] = await Promise.all([
    getAdminProductsState(),
    getCategoryTree(),
    getRecentActivity(8),
    listMedia(),
  ]);

  const total = products.length;
  const published = products.filter((p) => p.status === "Active").length;
  const drafts = products.filter((p) => p.status === "Draft").length;
  const catCount = tree.length;
  const maxCount = Math.max(1, ...tree.map((c) => c.productCount));

  const stats = [
    { label: "Total products", value: total, sub: `across ${catCount} categories` },
    { label: "Published", value: published, sub: "live on osimiri.in" },
    { label: "Drafts", value: drafts, sub: "awaiting review" },
    { label: "Media files", value: media.length, sub: "images & assets" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#211f1b]">
            Catalog overview
          </h1>
          <p className="mt-1 text-sm text-[#8a857c]">
            Welcome back, Himanshu — here&apos;s what&apos;s happening across the
            product catalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2f6b4e] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#285a42]"
        >
          <Plus className="h-4 w-4" /> New product
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#e7e3db] bg-white p-5">
            <p className="text-sm text-[#8a857c]">{s.label}</p>
            <p className="font-plex-mono mt-2 text-4xl font-semibold text-[#211f1b]">
              {s.value}
            </p>
            <p className="mt-2 text-xs text-[#9a948b]">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Products by category */}
        <div className="rounded-xl border border-[#e7e3db] bg-white p-5">
          <h2 className="text-sm font-semibold text-[#211f1b]">Products by category</h2>
          <div className="mt-4 space-y-3">
            {tree.length === 0 ? (
              <p className="text-sm text-[#9a948b]">
                No categories yet. Run <code>supabase/catalog.sql</code>.
              </p>
            ) : (
              tree.map((c) => (
                <div key={c.id} className="flex items-center gap-3 text-sm">
                  <span className="w-24 shrink-0 text-[#56514a]">{c.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#f1ede6]">
                    <div
                      className="h-full rounded-full bg-[#2f6b4e]"
                      style={{ width: `${(c.productCount / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="font-plex-mono w-6 shrink-0 text-right text-[#8a857c]">
                    {c.productCount}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-[#e7e3db] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#211f1b]">Recent activity</h2>
            <Link href="/admin/activity" className="text-sm text-[#2f6b4e] hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3.5">
            {activity.length === 0 ? (
              <p className="text-sm text-[#9a948b]">No activity recorded yet.</p>
            ) : (
              activity.map((a) => (
                <div key={a.id} className="flex gap-3 text-sm">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${ACTIVITY_DOT[a.action] ?? "bg-[#8a857c]"}`}
                  />
                  <div className="min-w-0">
                    <p className="text-[#4a463f]">
                      <span className="font-medium capitalize">{a.action}</span>{" "}
                      {a.title}
                    </p>
                    <p className="text-xs text-[#9a948b]">{timeAgo(a.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
