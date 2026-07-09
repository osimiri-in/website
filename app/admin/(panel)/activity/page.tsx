import { getRecentActivity } from "@/lib/activity";
import { timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

const DOT: Record<string, string> = {
  created: "bg-[#2f6b4e]",
  updated: "bg-[#b08d57]",
  published: "bg-[#2f6b4e]",
  uploaded: "bg-[#6f8a86]",
  deleted: "bg-[#b4493d]",
};

export default async function ActivityPage() {
  const activity = await getRecentActivity(100);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight text-[#211f1b]">Activity Log</h1>
      <p className="mt-1 text-sm text-[#8a857c]">
        A running record of changes across the catalog.
      </p>

      <div className="mt-6 rounded-xl border border-[#e7e3db] bg-white">
        {activity.length === 0 ? (
          <p className="px-4 py-16 text-center text-sm text-[#9a948b]">
            No activity recorded yet. Create or edit a product to see it here.
          </p>
        ) : (
          <ul className="divide-y divide-[#f1ede6]">
            {activity.map((a) => (
              <li key={a.id} className="flex items-start gap-3 px-4 py-3.5 text-sm">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[a.action] ?? "bg-[#8a857c]"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[#4a463f]">
                    <span className="font-medium capitalize">{a.action}</span> {a.title}
                  </p>
                </div>
                <span className="font-plex-mono shrink-0 text-xs text-[#9a948b]">
                  {timeAgo(a.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
