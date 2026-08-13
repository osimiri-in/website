import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects-db";
import { ProjectForm } from "@/app/admin/_components/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();
  return <ProjectForm project={project} />;
}
