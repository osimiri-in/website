import { z } from "zod";
import type { DemoProduct } from "@/lib/product-demo";

/**
 * The canonical product shape used across the app is the same rich shape as the
 * original static catalogue (`DemoProduct`). Managed products read from Supabase
 * are mapped into this exact type so every existing page keeps working.
 */
export type Product = DemoProduct & {
  id?: string;
  price?: number;
  categoryId?: string;
  /** "Living Room / Sofas" — derived from the categories table for display. */
  categoryPath?: string;
  updatedAt?: string;
};

export const PRODUCT_STATUSES = ["Active", "Draft", "Archived"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v === "" ? undefined : v));

const stringArray = z
  .array(z.string().trim().min(1))
  .optional()
  .default([]);

/**
 * Validation for create/update payloads coming from the admin form or CSV.
 * Only `title` is strictly required — everything else has a sensible default so
 * a product can be saved as a draft early and completed later (Shopify-style).
 */
export const productInputSchema = z.object({
  productId: optionalText,
  title: z.string().trim().min(2, "Title is required."),
  subtitle: optionalText,
  slug: optionalText,
  collectionName: z.string().trim().default(""),
  category: z.string().trim().default(""),
  subCategory: optionalText,
  status: z.enum(PRODUCT_STATUSES).default("Draft"),
  featuredProduct: z.boolean().default(false),

  shortDescription: z.string().trim().default(""),
  fullDescription: z.string().trim().default(""),
  customizationNote: z.string().trim().default(""),
  careInstructions: optionalText,
  installationNote: optionalText,

  seoTitle: optionalText,
  seoDescription: optionalText,
  seoKeywords: stringArray,
  focusKeyword: optionalText,
  altTextMainImage: z.string().trim().default(""),

  primaryMaterial: z.string().trim().default(""),
  secondaryMaterials: stringArray,
  finishOptions: stringArray,
  upholsteryOptions: stringArray,
  swatchReferenceCodes: stringArray,

  dimensionsOverall: z.string().trim().default(""),
  dimensionsSeatHeight: optionalText,
  dimensionsSeatDepth: optionalText,
  dimensionsCustomizable: z.boolean().default(false),
  weight: optionalText,
  assemblyRequired: z.boolean().optional(),
  leadTime: optionalText,
  warranty: optionalText,

  price: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z.number().nonnegative().optional(),
  ),
  categoryId: optionalText,
  priceVisible: z.boolean().optional(),
  priceNote: optionalText,
  projectSuitability: stringArray,
  availabilityRegion: optionalText,

  mainImageLink: z.string().trim().default(""),
  galleryImageLinks: stringArray,
  lifestyleImageLinks: stringArray,
  detailCloseupLinks: stringArray,
  swatchImageLinks: stringArray,
  videoLink: optionalText,
  videoType: optionalText,
  cadFileLink: optionalText,
  arOr3dModelLink: optionalText,

  searchKeywords: stringArray,
  roomTags: stringArray,
  styleTags: stringArray,
  colorTags: stringArray,
  materialTags: stringArray,

  clientApprovalStatus: optionalText,
  contentSource: optionalText,
  notesForOsimiriTeam: optionalText,
});

export type ProductInput = z.input<typeof productInputSchema>;
export type ProductParsed = z.output<typeof productInputSchema>;

/** Field map: camelCase (app/JSON) ↔ snake_case (Supabase column). */
export const PRODUCT_FIELD_MAP: Record<keyof ProductParsed, string> = {
  productId: "product_id",
  title: "title",
  subtitle: "subtitle",
  slug: "slug",
  collectionName: "collection_name",
  category: "category",
  subCategory: "sub_category",
  price: "price",
  categoryId: "category_id",
  status: "status",
  featuredProduct: "featured_product",
  shortDescription: "short_description",
  fullDescription: "full_description",
  customizationNote: "customization_note",
  careInstructions: "care_instructions",
  installationNote: "installation_note",
  seoTitle: "seo_title",
  seoDescription: "seo_description",
  seoKeywords: "seo_keywords",
  focusKeyword: "focus_keyword",
  altTextMainImage: "alt_text_main_image",
  primaryMaterial: "primary_material",
  secondaryMaterials: "secondary_materials",
  finishOptions: "finish_options",
  upholsteryOptions: "upholstery_options",
  swatchReferenceCodes: "swatch_reference_codes",
  dimensionsOverall: "dimensions_overall",
  dimensionsSeatHeight: "dimensions_seat_height",
  dimensionsSeatDepth: "dimensions_seat_depth",
  dimensionsCustomizable: "dimensions_customizable",
  weight: "weight",
  assemblyRequired: "assembly_required",
  leadTime: "lead_time",
  warranty: "warranty",
  priceVisible: "price_visible",
  priceNote: "price_note",
  projectSuitability: "project_suitability",
  availabilityRegion: "availability_region",
  mainImageLink: "main_image_link",
  galleryImageLinks: "gallery_image_links",
  lifestyleImageLinks: "lifestyle_image_links",
  detailCloseupLinks: "detail_closeup_links",
  swatchImageLinks: "swatch_image_links",
  videoLink: "video_link",
  videoType: "video_type",
  cadFileLink: "cad_file_link",
  arOr3dModelLink: "ar_or_3d_model_link",
  searchKeywords: "search_keywords",
  roomTags: "room_tags",
  styleTags: "style_tags",
  colorTags: "color_tags",
  materialTags: "material_tags",
  clientApprovalStatus: "client_approval_status",
  contentSource: "content_source",
  notesForOsimiriTeam: "notes_for_osimiri_team",
};
