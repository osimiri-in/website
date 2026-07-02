import { PRODUCT_FIELD_MAP, type ProductInput } from "@/lib/product-schema";

/** Ordered list of camelCase product fields used as CSV columns. */
export const PRODUCT_CSV_FIELDS = Object.keys(
  PRODUCT_FIELD_MAP,
) as (keyof typeof PRODUCT_FIELD_MAP)[];

const ARRAY_FIELDS = new Set([
  "seoKeywords",
  "secondaryMaterials",
  "finishOptions",
  "upholsteryOptions",
  "swatchReferenceCodes",
  "projectSuitability",
  "galleryImageLinks",
  "lifestyleImageLinks",
  "detailCloseupLinks",
  "swatchImageLinks",
  "searchKeywords",
  "roomTags",
  "styleTags",
  "colorTags",
  "materialTags",
]);

const BOOLEAN_FIELDS = new Set([
  "featuredProduct",
  "dimensionsCustomizable",
  "assemblyRequired",
  "priceVisible",
]);

function escapeCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function productsToCsv(
  products: Record<string, unknown>[],
): string {
  const header = PRODUCT_CSV_FIELDS.join(",");
  const lines = products.map((p) =>
    PRODUCT_CSV_FIELDS.map((field) => {
      const raw = p[field];
      let cell = "";
      if (Array.isArray(raw)) cell = raw.join("|");
      else if (typeof raw === "boolean") cell = raw ? "true" : "false";
      else if (raw == null) cell = "";
      else cell = String(raw);
      return escapeCell(cell);
    }).join(","),
  );
  return [header, ...lines].join("\r\n");
}

/** A minimal RFC-4180-ish CSV parser that handles quotes, commas, newlines. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

export type CsvParseResult = {
  products: ProductInput[];
  errors: string[];
};

/** Parse CSV text into ProductInput rows (validation happens server-side). */
export function csvToProductInputs(text: string): CsvParseResult {
  const rows = parseCsv(text).filter((r) => r.some((c) => c.trim() !== ""));
  const errors: string[] = [];
  if (rows.length < 2) {
    return { products: [], errors: ["CSV needs a header row and at least one product."] };
  }

  const header = rows[0].map((h) => h.trim());
  const products: ProductInput[] = [];

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const obj: Record<string, unknown> = {};
    header.forEach((key, idx) => {
      if (!(PRODUCT_CSV_FIELDS as string[]).includes(key)) return;
      const value = (cells[idx] ?? "").trim();
      if (ARRAY_FIELDS.has(key)) {
        obj[key] = value ? value.split("|").map((s) => s.trim()).filter(Boolean) : [];
      } else if (BOOLEAN_FIELDS.has(key)) {
        obj[key] = value.toLowerCase() === "true";
      } else if (value !== "") {
        obj[key] = value;
      }
    });
    if (!obj.title) {
      errors.push(`Row ${r + 1}: missing title — skipped.`);
      continue;
    }
    products.push(obj as ProductInput);
  }

  return { products, errors };
}
