import { NextRequest, NextResponse } from "next/server";
import {
  PROJECTS_TABLE,
  inputToRow,
  listProjectsAdmin,
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

export async function GET() {
  const projects = await listProjectsAdmin();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) return notConfigured();

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
    .insert(inputToRow(result.data))
    .select("*")
    .single();

  if (error) {
    if (isSupabaseSetupError(error)) {
      return NextResponse.json(
        {
          error:
            "The projects table doesn't exist yet. Run supabase/projects.sql in Supabase, then try again.",
        },
        { status: 503 },
      );
    }
    const conflict = error.code === "23505";
    return NextResponse.json(
      { error: conflict ? "A project with this slug already exists." : error.message },
      { status: conflict ? 409 : 500 },
    );
  }

  const project = rowToProject(data);
  await logActivity("created", project.title, { entityId: project.id });
  return NextResponse.json({ project }, { status: 201 });
}
