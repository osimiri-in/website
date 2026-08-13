import "server-only";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase";

export type ResponseColumn = { key: string; header: string; wide?: boolean };
export type ResponseTable = {
  table: string;
  label: string;
  columns: ResponseColumn[];
};

/** The website forms and how to display their submissions. */
export const RESPONSE_TABLES: ResponseTable[] = [
  {
    table: "general_enquiries",
    label: "Enquiries",
    columns: [
      { key: "created_at", header: "Received" },
      { key: "name", header: "Name" },
      { key: "phone", header: "Phone" },
      { key: "email", header: "Email" },
      { key: "city", header: "City" },
      { key: "requirement", header: "Requirement", wide: true },
      { key: "source_page", header: "Source" },
    ],
  },
  {
    table: "custom_enquiries",
    label: "Custom Furniture",
    columns: [
      { key: "created_at", header: "Received" },
      { key: "name", header: "Name" },
      { key: "phone", header: "Phone" },
      { key: "email", header: "Email" },
      { key: "city", header: "City" },
      { key: "project_type", header: "Project type" },
      { key: "brief", header: "Brief", wide: true },
    ],
  },
  {
    table: "architect_enquiries",
    label: "Architects",
    columns: [
      { key: "created_at", header: "Received" },
      { key: "name", header: "Name" },
      { key: "firm_name", header: "Firm" },
      { key: "phone", header: "Phone" },
      { key: "email", header: "Email" },
      { key: "city", header: "City" },
      { key: "project_type", header: "Project type" },
      { key: "project_scale", header: "Scale" },
    ],
  },
  {
    table: "contact_leads",
    label: "Contact",
    columns: [
      { key: "created_at", header: "Received" },
      { key: "name", header: "Name" },
      { key: "phone", header: "Phone" },
      { key: "email", header: "Email" },
      { key: "city", header: "City" },
      { key: "message", header: "Message", wide: true },
    ],
  },
  {
    table: "experience_appointments",
    label: "Appointments",
    columns: [
      { key: "created_at", header: "Received" },
      { key: "name", header: "Name" },
      { key: "phone", header: "Phone" },
      { key: "email", header: "Email" },
      { key: "preferred_date", header: "Preferred date" },
      { key: "time_slot", header: "Slot" },
      { key: "message", header: "Message", wide: true },
    ],
  },
  {
    table: "newsletter",
    label: "Newsletter",
    columns: [
      { key: "created_at", header: "Subscribed" },
      { key: "email", header: "Email" },
    ],
  },
];

export type ResponseGroup = {
  table: string;
  label: string;
  columns: ResponseColumn[];
  rows: Record<string, unknown>[];
  error?: string;
};

export async function getAllResponses(): Promise<{
  configured: boolean;
  groups: ResponseGroup[];
}> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      groups: RESPONSE_TABLES.map((t) => ({ ...t, rows: [] })),
    };
  }

  const supabase = createSupabaseServerClient();
  const groups = await Promise.all(
    RESPONSE_TABLES.map(async (t): Promise<ResponseGroup> => {
      const { data, error } = await supabase
        .from(t.table)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      return {
        ...t,
        rows: (data as Record<string, unknown>[]) ?? [],
        error: error?.message,
      };
    }),
  );

  return { configured: true, groups };
}
