import Link from "next/link";
import { Plus, FolderKanban } from "lucide-react";
import { listProjectsAdmin } from "@/lib/projects-db";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await listProjectsAdmin();
  const configured = isSupabaseConfigured();

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-[#8a857c]">
            {projects.length} project{projects.length === 1 ? "" : "s"} shown on the website.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#35347a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#292858]"
        >
          <Plus className="h-4 w-4" />
          Add project
        </Link>
      </div>

      {!configured ? (
        <div className="mb-4 rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
          Supabase isn&apos;t configured, so projects can&apos;t be saved yet.
        </div>
      ) : null}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#e7e3db] bg-white px-4 py-16 text-center">
          <FolderKanban className="h-8 w-8 text-[#b6b1a8]" />
          <p className="max-w-md text-sm text-[#8a857c]">
            No projects yet. If this is the first time, run{" "}
            <code className="rounded bg-[#f1ede6] px-1 py-0.5 font-plex-mono text-xs">
              supabase/projects.sql
            </code>{" "}
            in Supabase, then add your first project. Until you do, the website shows the
            built-in sample projects.
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#35347a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#292858]"
          >
            <Plus className="h-4 w-4" />
            Add project
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#e7e3db] bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#e7e3db] bg-[#faf9f6] text-xs uppercase tracking-wide text-[#8a857c]">
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Slides</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Featured</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#f1ede6] last:border-0 hover:bg-[#faf9f6]"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="flex items-center gap-3 font-medium text-[#35347a] hover:underline"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {p.heroImage ? (
                        <img
                          src={p.heroImage}
                          alt=""
                          className="h-9 w-12 rounded object-cover"
                        />
                      ) : (
                        <span className="flex h-9 w-12 items-center justify-center rounded bg-[#f1ede6] text-[#b6b1a8]">
                          <FolderKanban className="h-4 w-4" />
                        </span>
                      )}
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#4a463f]">{p.location || "—"}</td>
                  <td className="px-4 py-3 text-[#4a463f]">{p.type || "—"}</td>
                  <td className="px-4 py-3 text-[#4a463f]">{p.slides.length}</td>
                  <td className="px-4 py-3 text-[#4a463f]">{p.sortOrder}</td>
                  <td className="px-4 py-3">
                    {p.featured ? (
                      <span className="rounded-md bg-[#ecebf7] px-2 py-0.5 text-xs font-medium text-[#35347a]">
                        Featured
                      </span>
                    ) : (
                      <span className="text-[#b6b1a8]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
