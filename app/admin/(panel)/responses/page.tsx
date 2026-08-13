import { getAllResponses } from "@/lib/responses";
import { ResponsesView } from "@/app/admin/_components/ResponsesView";

export const dynamic = "force-dynamic";

export default async function ResponsesPage() {
  const { configured, groups } = await getAllResponses();
  return <ResponsesView groups={groups} configured={configured} />;
}
