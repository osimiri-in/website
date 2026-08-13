import "server-only";
import { z } from "zod";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
  isSupabaseSetupError,
} from "@/lib/supabase";
import { projects as staticProjects } from "@/lib/site-data";

export const PROJECTS_TABLE = "projects";

export type DbProject = {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  heroImage: string;
  slides: string[];
  featured: boolean;
  sortOrder: number;
};

export const projectInputSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z.string().min(1, "Slug is required."),
  location: z.string().optional().default(""),
  type: z.string().optional().default(""),
  description: z.string().optional().default(""),
  heroImage: z.string().optional().default(""),
  slides: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  sortOrder: z.coerce.number().optional().default(0),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

type Row = Record<string, unknown>;

export function rowToProject(row: Row): DbProject {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    location: String(row.location ?? ""),
    type: String(row.type ?? ""),
    description: String(row.description ?? ""),
    heroImage: String(row.hero_image ?? ""),
    slides: Array.isArray(row.slides) ? (row.slides as string[]) : [],
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order ?? 0),
  };
}

export function inputToRow(input: ProjectInput) {
  return {
    title: input.title,
    slug: input.slug,
    location: input.location,
    type: input.type,
    description: input.description,
    hero_image: input.heroImage,
    slides: input.slides,
    featured: input.featured,
    sort_order: input.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

/** Admin: list every project (DB only). Empty array if not configured. */
export async function listProjectsAdmin(): Promise<DbProject[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data as Row[]).map(rowToProject);
}

export async function getProjectById(id: string): Promise<DbProject | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return rowToProject(data as Row);
}

/**
 * Public: projects for the website. Uses the DB when it has entries, otherwise
 * falls back to the built-in sample projects so the page is never empty (e.g.
 * before the projects table is created or populated).
 */
export async function getPublicProjects() {
  if (isSupabaseConfigured()) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) {
      return (data as Row[]).map(rowToProject);
    }
    // Missing table / setup error / empty -> fall back to static.
    if (error && !isSupabaseSetupError(error)) {
      // A real query error still falls back, but is otherwise non-fatal.
    }
  }
  return staticProjects.map((p, i) => ({
    id: p.slug,
    title: p.title,
    slug: p.slug,
    location: p.location,
    type: p.type,
    description: p.description,
    heroImage: p.heroImage,
    slides: p.slides,
    featured: p.featured,
    sortOrder: i,
  }));
}

export async function getPublicProjectBySlug(slug: string) {
  const all = await getPublicProjects();
  return all.find((p) => p.slug === slug) ?? null;
}
