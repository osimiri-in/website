import { NextRequest, NextResponse } from "next/server";
import {
  PROJECTS_TABLE,
  getProjectById,
  inputToRow,
  projectInputSchema,
  rowToProject,
} from "@/lib/projects-db";
import {
  SUPABASE_SETUP_MESSAGE,
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";
import { logActivity } from "@/lib/activity";

function notConfigured() {
  return NextResponse.json({ error: SUPABASE_SETUP_MESSAGE }, { status: 503 });
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const project = await getProjectById(id);
  if (!project) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSupabaseConfigured()) return notConfigured();
  const { id } = await context.params;

  const payload = await request.json().catch(() => null);
  const result = projectInputSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid project.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .update(inputToRow(result.data))
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    const conflict = error.code === "23505";
    return NextResponse.json(
      { error: conflict ? "A project with this slug already exists." : error.message },
      { status: conflict ? 409 : 500 },
    );
  }

  const project = rowToProject(data);
  await logActivity("updated", project.title, { entityId: project.id });
  return NextResponse.json({ project });
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSupabaseConfigured()) return notConfigured();
  const { id } = await context.params;

  const supabase = createSupabaseServerClient();
  const existing = await getProjectById(id);
  const { error } = await supabase.from(PROJECTS_TABLE).delete().eq("id", id);

  if (error) {
    if (isSupabaseSetupError(error)) return notConfigured();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logActivity("deleted", existing?.title ?? "Project", { entityId: id });
  return NextResponse.json({ ok: true });
}
