"use client";

import { useMemo, useState } from "react";
import { Download, Inbox, Search } from "lucide-react";

type Column = { key: string; header: string; wide?: boolean };
type Group = {
  table: string;
  label: string;
  columns: Column[];
  rows: Record<string, unknown>[];
  error?: string;
};

function fmt(key: string, value: unknown): string {
  if (value == null || value === "") return "—";
  if (key === "created_at") {
    const d = new Date(String(value));
    return isNaN(d.getTime())
      ? String(value)
      : d.toLocaleString(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  }
  return String(value);
}

function toCsv(group: Group): string {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const head = group.columns.map((c) => esc(c.header)).join(",");
  const body = group.rows
    .map((row) =>
      group.columns.map((c) => esc(fmt(c.key, row[c.key]))).join(","),
    )
    .join("\n");
  return `${head}\n${body}`;
}

export function ResponsesView({
  groups,
  configured,
}: {
  groups: Group[];
  configured: boolean;
}) {
  const [active, setActive] = useState(groups[0]?.table ?? "");
  const [query, setQuery] = useState("");

  const group = groups.find((g) => g.table === active) ?? groups[0];

  const filtered = useMemo(() => {
    if (!group) return [];
    const q = query.trim().toLowerCase();
    if (!q) return group.rows;
    return group.rows.filter((row) =>
      group.columns.some((c) =>
        String(row[c.key] ?? "").toLowerCase().includes(q),
      ),
    );
  }, [group, query]);

  function exportCsv() {
    if (!group) return;
    const blob = new Blob([toCsv(group)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${group.table}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const total = groups.reduce((sum, g) => sum + g.rows.length, 0);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Responses</h1>
          <p className="mt-1 text-sm text-[#8a857c]">
            {total} submission{total === 1 ? "" : "s"} across all website forms.
          </p>
        </div>
      </div>

      {!configured ? (
        <div className="mb-4 rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
          Supabase isn&apos;t configured, so submissions can&apos;t be loaded.
        </div>
      ) : null}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#e7e3db]">
        {groups.map((g) => (
          <button
            key={g.table}
            type="button"
            onClick={() => {
              setActive(g.table);
              setQuery("");
            }}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition ${
              g.table === active
                ? "border-[#35347a] text-[#35347a]"
                : "border-transparent text-[#8a857c] hover:text-[#4a463f]"
            }`}
          >
            {g.label}
            <span
              className={`ml-2 rounded-full px-1.5 py-0.5 text-xs ${
                g.table === active
                  ? "bg-[#ecebf7] text-[#35347a]"
                  : "bg-[#f1ede6] text-[#8a857c]"
              }`}
            >
              {g.rows.length}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b6b1a8]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-64 rounded-lg border border-[#ddd9d1] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#35347a] focus:ring-2 focus:ring-[#35347a]/15"
          />
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={!group || group.rows.length === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#ddd9d1] bg-white px-3 py-2 text-sm font-medium text-[#4a463f] transition hover:bg-[#f6f4f0] disabled:opacity-40"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      {group?.error ? (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {group.error}
        </div>
      ) : null}

      <div className="mt-4 overflow-x-auto rounded-xl border border-[#e7e3db] bg-white">
        {group && filtered.length > 0 ? (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#e7e3db] bg-[#faf9f6] text-xs uppercase tracking-wide text-[#8a857c]">
                {group.columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-medium">
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr
                  key={(row.id as string) ?? i}
                  className="border-b border-[#f1ede6] last:border-0 hover:bg-[#faf9f6]"
                >
                  {group.columns.map((c) => (
                    <td
                      key={c.key}
                      className={`px-4 py-3 align-top text-[#4a463f] ${
                        c.wide ? "min-w-[240px] max-w-[380px]" : "whitespace-nowrap"
                      }`}
                    >
                      {c.key === "email" && row[c.key] ? (
                        <a
                          href={`mailto:${row[c.key]}`}
                          className="text-[#35347a] hover:underline"
                        >
                          {fmt(c.key, row[c.key])}
                        </a>
                      ) : c.key === "phone" && row[c.key] ? (
                        <a
                          href={`tel:${row[c.key]}`}
                          className="text-[#35347a] hover:underline"
                        >
                          {fmt(c.key, row[c.key])}
                        </a>
                      ) : (
                        fmt(c.key, row[c.key])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-16 text-center text-[#9a948b]">
            <Inbox className="h-8 w-8" />
            <p className="text-sm">
              {query
                ? "No results match your search."
                : "No submissions yet for this form."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
